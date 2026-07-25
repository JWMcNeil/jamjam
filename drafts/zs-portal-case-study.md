# Building the Zero Saints portal

> **DRAFT — for jamjam.dev /projects. `[FILL]` = Jamie to complete. `[SCREENSHOT]` = capture needed.**
>
> **⚠️ PUBLISH GATE: do not publish until the Convex authorisation hardening (FABLE report §3.1 in the zs-app repo) has actually shipped.** The auth section below describes that work in the past tense, and publishing it early would both be untrue and point at a live gap in a pre-launch app.

---

## tl;dr

```
project   : Zero Saints client portal
what      : multi-tenant portal tracking a web-design engagement
            Setup → Design → Build → Live
stack     : Next.js · Payload 3 · Convex · Better Auth · Stripe
            Resend · Vercel · Neon · Uploadthing
role      : solo build — architecture, implementation, orchestration
process   : 26 ADRs · Linear · Cursor + Claude + Codex
status    : pre-launch — MVP bar is one real client completing
            the full flow
```

[SCREENSHOT: portal Overview page, dark theme]

## What it is

Zero Saints is the two-person web studio I run with my partner. When you build websites for non-technical clients, the actual product is half the job — the other half is answering "what's happening, what's next, what do you need from me?" without a status email or a call. The portal is that answer: a client logs in and sees exactly where their engagement stands, reviews work, approves phases, pays their deposit, and messages us — all in one place.

Every client only ever sees their own project — the walls between clients are enforced on the server, not just hidden in the UI. Staff use the same portal the client sees, with studio-side controls layered on top. Phases are locked properly too: a client who guesses the URL for a phase they haven't reached gets redirected, not a greyed-out link they can poke at.

It's the most substantial thing I've built, and because it's our own product, every architectural decision was mine to get right or wrong. Here are the ones worth talking about.

## Decision 1: a CMS as the backend

I chose Payload as the backend, which raises eyebrows — it's marketed as a CMS. But Payload's own pitch is "build enterprise apps on your terms," and that framing stuck with me. Some Python frameworks give you an admin dashboard for free; the JS world mostly doesn't, and I'd already used Payload for a client marketing site and knew the collection/access-control/hooks model well.

I looked at Supabase and similar backends-as-a-service, but they felt locked down in the ways that mattered to me. Payload is open-source, self-hostable, and configurable down to the field level — and it gave me the studio-side admin UI for free, which for a two-person studio is a real feature, not a bonus. Heavy management lives in Payload admin; the portal is the client-facing surface over the same data.

Today that's 20 collections — projects, clients, brand boards, reviews, support tickets, store content and more — with role-based access enforced at the collection level.

One small example of why owning the backend earns its keep. Two changes in the admin fire off emails to the client the moment you hit save: moving their project into the Design phase, and marking their site as Live. You do not want to send "your new site is live" by accident because you fat-fingered a dropdown. So I added a speed bump: on exactly those two changes, Payload refuses to save until you tick a box confirming you meant it. Edit anything else, no box. Roll a phase back, no box. And the checkbox is wired to the same logic that decides whether the email sends, so the warning and the email can never fall out of sync. In Payload that's a bit of config in a file I own. On a locked-down platform, that's a feature request and a wait.

## Decision 2: real-time without wrecking the budget

Messaging started life as a Payload collection. It worked, in the sense that rows were written to Postgres. The experience was bad: you refreshed the page to see if a reply had arrived, or I polled — which on metered compute meant paying for a heartbeat.

The obvious grown-up answer was a messaging API like GetStream. It looks great, and it's built for scale I will never have: at any given moment this portal might have a handful of users online. Signing up for another third-party service to serve five concurrent users didn't pass the sniff test — I was already developing what I can only call service fatigue.

So the entire comments domain moved to Convex: threads, messages, read receipts, typing indicators, unread counts. Convex owns everything real-time; Payload keeps everything else, including notifications. The boundary is clean — one system owns a domain outright, rather than two systems sharing tables. Threads pin to where the conversation happens: a review thread lives on the prototype page it's about, not in a generic inbox.

Honest note: I first reached for Convex on an earlier experiment because it was the shiny new thing (I used it to add likes to cards on a social-style marketing demo — total overkill). The difference here is that the portal actually has a real-time problem, and Convex is the right size for it.

[SCREENSHOT: messages inbox with typing indicator]

## Decision 3: auth across three systems

Payload ships with role-based auth, but it's email-and-password only, which in 2026 feels bare — I wanted at least Google sign-in for MVP. Clerk and WorkOS both do this well and I've used them before, but the free-tier maths didn't justify adding another service dependency to an app that will never leave their free tiers anyway. Same service-fatigue instinct as messaging.

I paired Payload with Better Auth instead. The short version: Better Auth handles the actual logging in — Google, passwords, sessions — and a small bridge I wrote tells Payload who the signed-in person is on every request. Payload's users collection just holds the profile; it doesn't do auth at all.

A few choices along the way I'm glad I made:

- **Nobody can sign themselves up.** Before an account gets created — Google or password, doesn't matter — the system checks whether we actually invited that email. If we didn't, no account. It's a client portal, not a signup page.
- **Magic links: cut, then brought back for exactly one job.** Early on I cut magic links entirely — for a portal you visit regularly, a round trip through your inbox on every sign-in is worse than a password. Then the invitation flow needed a way to get a brand-new client through the door that also proves they own the email address we invited. So magic links came back for that one job: the invite email is a one-time link that signs you in and has you set a password (or connect Google) on arrival. Everyday sign-in stays password or Google. Cutting a feature and later readmitting it for a narrower job felt like a loss at the time; I now think it's just what deciding looks like.
- **I skipped the plugin that does this for you.** There's a community package that wraps Payload and Better Auth together. When I looked at it, its build was failing, and it sits between two libraries that both move fast. For the login layer of all things, I'd rather own a couple hundred lines I fully understand than wait on a third maintainer when something breaks.

The last job before launch was tightening up the Convex side of this. Knowing someone is logged in isn't the same as knowing what they're allowed to see — and all my carefully-built access rules live in Payload, which Convex knows nothing about. So the messaging layer could tell a user was signed in, but not whether they actually belonged to the project they were asking about. Fixing it meant two things: the login token now carries who you are and which client you belong to, so Convex can check that directly, and every messaging function now confirms you belong to the project before returning anything — backed by tests that sign in as client A and make sure client B's messages never show up. Lesson learned the useful way: if you split your data across two backends, the access rules have to come along for the ride.

## Decision 4: boring infrastructure, chosen the hard way

The portal runs on Vercel with Postgres on Neon, and that choice was made for me by a mistake on a different project. My own site was self-hosted — Hetzner box, Dokploy on top — and I lost its Postgres database to a container recreation I didn't understand well enough to prevent. Not Hetzner's fault, not Dokploy's fault — mine. My DevOps understanding was stretched past its limit and I found the limit the hard way. I wrote that one up separately: [Containers Are Disposable. I Learned This the Hard Way.](/posts/containers-are-disposable)

So when it came to the database that would hold real client work, I didn't relitigate it. I'm honest with myself about the split: partly the right call, partly a retreat to safety. But it has been genuinely smooth, and for a two-person studio, boring infrastructure is correct. Self-hosting is a skill I still want — just not one I want to practice on client data.

## How it was built

This is the part I'd want to read in someone else's case study, so here's mine, including the bit I debated leaving out.

**It started with v0.** We had no Figma file and no time to make one. Instead of designing from scratch, I wrote markdown requirement docs — what the portal does, what it must not do, explicitly no business logic, frontend UX only — and let v0 generate an opinionated starting point. What came back had every AI-generation tell you'd expect (status dots on everything), but it was a clean Next.js codebase and a fast start. I wouldn't do it that way today — the tooling has moved on — but I'd rather admit the real starting point than pretend there was a design phase that never happened.

**Then a week of grilling.** Before building on that foundation, I spent the better part of a week interrogating every architectural decision — auth, tenancy, phase model, comments — and turning the conclusions into ADRs. There are 26 of them now. ADRs became PRDs, PRDs became Linear issues, and only then did implementation start.

**Then orchestration.** I'll be straight about how I work: I don't write most of the code by hand anymore. I run Cursor, Claude, and Codex against the issue queue and orchestrate — every feature on a branch, every branch through a PR, currently moving to git worktrees so agents can work features in parallel without stepping on each other. What I don't do is vibe it. I want to know what the hell is going on: I choose the tech, I set the architecture, I read the diffs, and when a generation contradicts an ADR, the ADR wins. The de-slopping pass matters too — I use design-review tooling to strip the AI-common patterns back out of the UI so the portal looks like ours, not like everyone's.

The honest summary: I'm the architect and the editor. The agents are fast hands.

## Where it stands

Pre-launch, on the last leg — which is the hardest leg, because I keep finding things I want better and feeding them back into Linear. The launch bar is deliberately narrow: one real client completes the entire flow, Setup through Live. No building for client two until client one is shipping.

The recent work has been shaping the portal around ecommerce clients specifically, since that's what client one will be. A generic "web project" flow doesn't fit a store build, so the engagement now has first-class ecommerce surfaces: a catalog collaboration workspace where the client and studio work through products together, a store setup surface for the operational pieces (with a hard rule that secrets never pass through the portal), and a proposal system that's type-aware — an ecommerce proposal seeds the intake with the right questions from day one. It's the difference between a portal that tracks *a* project and one that understands *this kind* of project.

[FILL: after launch — update with the real outcome]

---

*Stack: Next.js, Payload 3, Convex, Better Auth, Stripe, Resend, Sentry, Uploadthing, Vercel, Neon. Tooling: Linear, Cursor, Claude Code, Codex, Biome, Lefthook, mise.*
