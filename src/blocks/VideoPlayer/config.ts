import type { Block } from 'payload'

export const VideoPlayer: Block = {
  slug: 'videoPlayer',
  interfaceName: 'VideoPlayerBlock',
  fields: [
    {
      name: 'videoType',
      type: 'select',
      defaultValue: 'mux',
      options: [
        {
          label: 'Mux Video',
          value: 'mux',
        },
        {
          label: 'External URL (YouTube/Vimeo)',
          value: 'external',
        },
      ],
      required: true,
      admin: {
        description: 'Choose between Mux video asset or external video URL',
      },
    },
    {
      name: 'muxAssetId',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'mux',
        description: 'Mux asset playback ID',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'external',
        description: 'YouTube or Vimeo video URL',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Poster image shown before video plays',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically play video when page loads',
      },
    },
    {
      name: 'controls',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show video player controls',
      },
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Loop video playback',
      },
    },
    {
      name: 'muted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Start video muted',
      },
    },
  ],
  graphQL: {
    singularName: 'VideoPlayerBlock',
  },
  labels: {
    plural: 'Video Players',
    singular: 'Video Player',
  },
}

