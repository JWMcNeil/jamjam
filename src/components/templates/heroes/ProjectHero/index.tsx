import React from 'react'

import type { Project, Tag } from '@/payload-types'

import { Media } from '@/components/Media'
import { projectTypeHeroLabel } from '@/utilities/projectLabels'

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const { tags, heroImage, title, type } = project

  return (
    <div className="relative -mt-[4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6 flex items-center gap-4">
            {type && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                {projectTypeHeroLabel[type]}
              </span>
            )}
            {tags?.map((tag: number | Tag, index: number) => {
              if (typeof tag === 'object' && tag !== null) {
                const { label: tagLabel } = tag

                const titleToUse = tagLabel || 'Untitled tag'

                const isLast = index === tags.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          {/* <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div> */}
        </div>
      </div>
      <div className="min-h-[80vh] select-none ">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover border-l md:border-l-0 border-b  border-r border-border"
            resource={heroImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent " />
      </div>
    </div>
  )
}
