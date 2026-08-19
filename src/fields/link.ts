import type { Field, GroupField } from 'payload'

import { SITE_PAGE_OPTIONS } from '@/constants/sitePageRoutes'
import deepMerge from '@/utilities/deepMerge'
import { iconOptions } from '@/utilities/icons'

export type LinkAppearances = 'default' | 'outline' | 'secondary' | 'miniOutline' | 'link' | 'white'
export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  miniOutline: {
    label: 'Mini Outline',
    value: 'miniOutline',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
  white: {
    label: 'White',
    value: 'white',
  },
}

type LinkSize = 'clear' | 'default' | 'icon' | 'lg' | 'sm'

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  /** Default selected appearance for new links (header often uses `link`). */
  appearanceDefault?: LinkAppearances
  disableLabel?: boolean
  /** Adds “Site page” (home, posts, projects, board, lab, contact) as an internal link target. */
  enableSitePages?: boolean
  sizes?: LinkSize[] | false
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  appearances,
  appearanceDefault = 'default',
  disableLabel = false,
  enableSitePages = false,
  sizes,
  overrides = {},
} = {}) => {
  const typeRadioOptions = [
    {
      label: 'Internal link',
      value: 'reference',
    },
    ...(enableSitePages
      ? [
          {
            label: 'Site page',
            value: 'sitePage',
          },
        ]
      : []),
    {
      label: 'Custom URL',
      value: 'custom',
    },
  ]

  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: typeRadioOptions,
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['posts', 'projects'],
      required: true,
    },
    ...(enableSitePages
      ? [
          {
            name: 'sitePage',
            type: 'select',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'sitePage',
            },
            label: 'Site page',
            options: [...SITE_PAGE_OPTIONS],
            required: true,
          } as Field,
        ]
      : []),
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.size !== 'icon',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: appearanceDefault,
      options: appearanceOptionsToUse,
    })
  }

  if (sizes !== false) {
    const sizeOptions: Record<LinkSize, { label: string; value: string }> = {
      clear: { label: 'Clear', value: 'clear' },
      default: { label: 'Default', value: 'default' },
      icon: { label: 'Icon Only', value: 'icon' },
      lg: { label: 'Large', value: 'lg' },
      sm: { label: 'Small', value: 'sm' },
    }

    let sizeOptionsToUse = [sizeOptions.default]

    if (sizes) {
      sizeOptionsToUse = sizes.map((size) => sizeOptions[size])
    }

    linkResult.fields.push({
      name: 'size',
      type: 'select',
      admin: {
        description: 'Choose the size of the link button.',
      },
      defaultValue: 'default',
      options: sizeOptionsToUse,
    })

    // Add icon field only when 'icon' size option is available
    const hasIconSize = sizes && sizes.includes('icon')
    if (hasIconSize) {
      linkResult.fields.push({
        name: 'icon',
        type: 'select',
        admin: {
          condition: (_, siblingData) => siblingData?.size === 'icon',
          description: 'Select an icon to display for icon-only links.',
        },
        label: 'Icon',
        options: [...iconOptions],
        validate: (
          value: string | null | undefined,
          { siblingData }: { siblingData?: { size?: string } },
        ) => {
          // Icon is required when size is 'icon'
          if (siblingData?.size === 'icon' && !value) {
            return 'Icon is required when size is set to Icon Only'
          }
          return true
        },
        required: false, // Not required at schema level to prevent DB errors, but validated above
      })
    }
  }

  return deepMerge(linkResult, overrides)
}
