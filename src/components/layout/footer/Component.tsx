import { StatusDot } from '@/components/StatusDot'
import type { Footer as FooterGlobal, SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Github, Linkedin } from 'lucide-react'
import React from 'react'

/** Shared vertical rhythm + horizontal gutter inside each footer segment */
const cell = 'px-4 py-1.5'

export async function Footer() {
  const year = new Date().getFullYear()

  const [footerData, siteSettings] = await Promise.all([
    getCachedGlobal('footer', 1)() as Promise<FooterGlobal>,
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
  ])

  const githubUrl = footerData?.githubUrl?.trim() ?? ''
  const linkedinUrl = footerData?.linkedinUrl?.trim() ?? ''
  const { statusText, name } = siteSettings

  return (
    <footer className="mt-auto w-full pb-4 pt-6">
      <div className="flex justify-center px-4">
        <div className="flex w-fit max-w-full flex-col overflow-hidden rounded-sm border border-border bg-card md:flex-row md:items-stretch md:divide-x md:divide-border">
          <div
            className={`flex shrink-0 items-center gap-x-2 border-b border-border font-mono text-xs lowercase text-text-nav md:border-b-0 ${cell}`}
          >
            <span>{statusText}</span>
            <StatusDot className="ml-0.5 origin-center scale-[0.85]" />
          </div>

          <div
            className={`flex shrink-0 items-center justify-center gap-2 border-b border-border md:border-b-0 ${cell}`}
          >
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-8 items-center justify-center rounded text-text-nav transition-colors hover:text-text-hover"
                aria-label="GitHub"
              >
                <Github className="size-3.5 shrink-0" strokeWidth={2} />
              </a>
            ) : null}
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-8 items-center justify-center rounded text-text-nav transition-colors hover:text-text-hover"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-3.5 shrink-0" strokeWidth={2} />
              </a>
            ) : null}
          </div>

          <div
            className={`flex shrink-0 items-center text-xs italic text-text-nav ${cell}`}
          >
            © {name} {'>'} {year}
          </div>
        </div>
      </div>
    </footer>
  )
}
