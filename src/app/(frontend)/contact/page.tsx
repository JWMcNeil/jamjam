/**
 * Contact wiring:
 * - Forms: title must be exactly `Contact` (see getCachedContactForm).
 * - Field order recommended: text (name), email, select (subject), textarea (message).
 * - Set name + email blocks to width 50% in the CMS for a two-column row.
 * - Submit label e.g. `send message` — shell adds `$` and `->` via TerminalButton.
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { SiteSetting } from '@/payload-types'

import { FormBlock } from '@/components/blocks/Form/Component'
import { StatusDot } from '@/components/StatusDot'
import React from 'react'

import { getCachedContactForm } from '@/utilities/getContactForm'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ContactPage() {
  const getSiteSettings = getCachedGlobal('site-settings', 0)
  const [siteSettingsRaw, contactForm] = await Promise.all([
    getSiteSettings(),
    getCachedContactForm(),
  ])
  const siteSettings = siteSettingsRaw as SiteSetting

  if (!contactForm) {
    notFound()
  }

  const contactHeadline =
    siteSettings.contactHeadline ?? "Let's work together."
  const contactIntro =
    siteSettings.contactIntro ??
    "Whether it's a new project, a job opportunity, or just a question — my inbox is open."
  const contactResponseTime = siteSettings.contactResponseTime ?? 'usually within 24hrs'
  const { email, location, statusText } = siteSettings

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-10">
      <p className="mb-2 font-mono text-sm text-text-prompt">
        jamjam:~$ cat contact.md | <span className="text-accent">head</span>
      </p>

      <div className="mt-8 rounded-sm border border-border md:grid md:grid-cols-2 md:gap-0">
        <div className="border-border p-6 md:border-r md:p-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {contactHeadline}
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">{contactIntro}</p>

          <dl className="mt-10 space-y-4 font-mono text-sm">
            <div>
              <dt className="text-text-dim">// direct email</dt>
              <dd>
                <a className="text-foreground underline-offset-4 hover:underline" href={`mailto:${email}`}>
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-text-dim">// based in</dt>
              <dd className="text-foreground">{location}</dd>
            </div>
            <div>
              <dt className="text-text-dim">// status</dt>
              <dd className="flex items-center gap-2 text-foreground">
                {statusText}
                <StatusDot />
              </dd>
            </div>
            <div>
              <dt className="text-text-dim">// response time</dt>
              <dd className="text-foreground">{contactResponseTime}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-border p-6 md:border-t-0 md:p-10">
          <p className="mb-6 font-mono text-sm text-text-dim">// send a message</p>
          <FormBlock
            enableIntro={false}
            form={contactForm as unknown as FormType}
            variant="contact"
          />
          <p className="mt-6 font-mono text-xs text-muted-foreground">no spam, ever.</p>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact — jamjam.dev',
    description: 'Get in touch for projects, opportunities, or questions.',
  }
}
