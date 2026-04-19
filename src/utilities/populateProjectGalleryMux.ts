import type { Payload } from 'payload'

import type { Project } from '@/payload-types'

/**
 * Gallery `muxVideo` relations do not populate for anonymous users because the
 * mux-video collection defaults to admin-only read. Upload endpoints share the
 * plugin `access` callback with collection read, so we must not open read to
 * everyone via the plugin. Instead, load linked Mux docs here for the public
 * project page only.
 */
export async function populateProjectGalleryMuxVideos(
  project: Project | null,
  payload: Payload,
  draft: boolean,
): Promise<Project | null> {
  if (!project?.gallery?.length) {
    return project
  }

  let changed = false
  const gallery = await Promise.all(
    project.gallery.map(async (row) => {
      if (!row || row.slideType !== 'mux' || row.muxVideo == null) {
        return row
      }

      if (typeof row.muxVideo === 'object') {
        const opts = row.muxVideo.playbackOptions
        if (Array.isArray(opts) && opts.length > 0 && opts[0]?.playbackId) {
          return row
        }
      }

      const id =
        typeof row.muxVideo === 'object' && row.muxVideo !== null
          ? row.muxVideo.id
          : row.muxVideo

      try {
        const doc = await payload.findByID({
          collection: 'mux-video',
          id,
          depth: 0,
          draft,
          overrideAccess: true,
        })
        if (doc) {
          changed = true
          return { ...row, muxVideo: doc }
        }
      } catch {
        /* keep row as-is */
      }

      return row
    }),
  )

  if (!changed) {
    return project
  }

  return { ...project, gallery }
}
