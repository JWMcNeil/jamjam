import { ImageMedia } from '@/components/Media/ImageMedia'
import { StatusDot } from '@/components/StatusDot'
import type { Media, SiteSetting } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'

export type AboutProps = Pick<
  SiteSetting,
  | 'name'
  | 'aboutSectionLabel'
  | 'aboutHeadline'
  | 'aboutBio'
  | 'aboutPhoto'
  | 'statusText'
  | 'email'
  | 'statusNote'
>

function resolvePhoto(resource: SiteSetting['aboutPhoto']): Media | null {
  if (resource && typeof resource === 'object') return resource
  return null
}

export const About: React.FC<AboutProps> = ({
  name,
  aboutSectionLabel,
  aboutHeadline,
  aboutBio,
  aboutPhoto,
  statusText,
  email,
  statusNote,
}) => {
  const photo = resolvePhoto(aboutPhoto)
  const displayHandle = `// ${name.trim().toLowerCase()}`
  const mailHref = `mailto:${email}`

  return (
    <section className="py-10 lg:py-14 mb-6" aria-labelledby="about-heading">
      <p className="mb-8 font-mono text-xs text-text-muted lg:text-sm">{aboutSectionLabel}</p>
      <div className="overflow-hidden border border-border bg-background">
        <div className="flex flex-col md:flex-row md:min-h-[min(28rem,70vh)]">
          <div
            className={cn(
              'relative w-full shrink-0 border-border bg-black md:w-[42%] md:max-w-xl md:border-r',
              'aspect-4/5 md:aspect-auto md:min-h-80',
            )}
          >
            {photo ? (
              <ImageMedia
                resource={photo}
                fill
                pictureClassName="absolute inset-0 block h-full w-full"
                imgClassName="object-cover object-top grayscale contrast-[1.02]"
                alt={photo.alt || `Portrait of ${name}`}
                size="(max-width: 768px) 100vw, 42vw"
                priority={false}
              />
            ) : null}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-5 p-6 md:gap-6 md:p-8 lg:p-10">
            <div>
              <p className="font-mono text-xs text-text-dim md:text-sm ">{displayHandle}</p>
              <h2
                id="about-heading"
                className="mt-3 text-2xl font-bold leading-tight text-text-heading md:text-3xl lg:text-4xl"
              >
                {aboutHeadline}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">
              {renderBioWithLineBreaks(aboutBio)}
            </p>
            {statusNote ? (
              <p className="text-xs text-text-muted md:text-sm">{statusNote}</p>
            ) : null}
            <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <p className="flex flex-wrap items-center gap-x-1 font-mono text-xs text-accent md:text-sm">
                <span>{statusText}</span>
                <StatusDot />
              </p>
              <a
                href={mailHref}
                className="font-mono text-xs text-text-dim break-all underline-offset-4 hover:underline md:text-sm"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Preserve line breaks from CMS textarea without using dangerouslySetInnerHTML */
function renderBioWithLineBreaks(bio: string): React.ReactNode {
  const lines = bio.split('\n')
  if (lines.length === 1) return bio
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </React.Fragment>
  ))
}
