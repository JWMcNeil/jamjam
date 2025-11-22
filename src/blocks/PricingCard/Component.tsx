'use client'

import React from 'react'

import type { PricingCardBlock as PricingCardBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { getIcon } from '@/utilities/icons'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMediaQuery } from '@/hooks/use-media-query'

type CardData = NonNullable<PricingCardBlockProps['cards']>[0]

// Internal component to render a single card
const PricingCardContent: React.FC<CardData> = ({
  costIndicator,
  icon,
  title,
  description,
  startingPrice,
  includes,
  link,
  linkButtonText = 'Ask for Quote',
}) => {
  const IconComponent = icon ? getIcon(icon) : null

  // Build link props for CMSLink
  const linkProps = link
    ? {
        type: link.type || null,
        reference:
          link.type === 'reference' && link.reference
            ? {
                relationTo: link.reference.relationTo,
                value: link.reference.value,
              }
            : null,
        url: link.type === 'custom' ? link.url || null : null,
        newTab: link.newTab || null,
        appearance: link.appearance || 'outline',
        size: link.size || 'default',
        label: linkButtonText,
      }
    : null

  return (
    <div className="bg-card rounded-lg border border-border flex flex-col gap-6 min-w-[320px]">
      {/* Top bar with Prices label and cost indicator */}
      <div className="flex items-center justify-between px-6 py-1 border-b border-border">
        <span className="text-muted-foreground text-sm font-medium font-mono">Prices</span>
        {costIndicator && (
          <span className="text-primary text-lg font-semibold">{costIndicator}</span>
        )}
      </div>

      <div className="flex flex-col gap-6 py-4 px-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-4">
          {IconComponent && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center border border-border">
              <IconComponent className="w-6 h-6 text-foreground" />
            </div>
          )}
          {title && <h3 className="text-foreground text-xl font-bold leading-tight">{title}</h3>}
        </div>

        {/* Description */}
        {description && <p className="text-foreground/80 text-sm leading-relaxed">{description}</p>}

        {/* Separator */}
        <div className="border-t border-border" />

        {/* Price Section */}
        <div className="flex flex-col gap-2">
          <span className="text-foreground text-sm">Prices start from -</span>
          {startingPrice && (
            <span className="text-primary text-2xl font-semibold">{startingPrice}</span>
          )}
        </div>

        {/* Includes Section */}
        {includes && (
          <div className="flex flex-col gap-2">
            <span className="text-foreground text-sm font-medium">Includes</span>
            <div className="text-foreground text-sm [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1 [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-1 [&_ol]:ml-4 [&_li]:ml-2">
              <RichText data={includes} enableGutter={false} enableProse={false} />
            </div>
          </div>
        )}

        {/* Link Button */}
        {linkProps && (
          <div className="pt-2">
            <CMSLink {...linkProps} />
          </div>
        )}
      </div>
    </div>
  )
}

export const PricingCardBlock: React.FC<PricingCardBlockProps> = (props) => {
  const { cards } = props
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [selectedTab, setSelectedTab] = React.useState<string>('tab-0')

  // If no cards or empty array, render nothing
  if (!cards || cards.length === 0) {
    return null
  }

  // Single card - render without tabs
  if (cards.length === 1) {
    const card = cards[0] as CardData
    return <PricingCardContent {...card} />
  }

  // Multiple cards - render with responsive tabs/select
  return (
    <div className="w-full">
      {isDesktop ? (
        // Desktop: Tabs
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-4 bg-muted/50 border border-border">
            {cards.map((card: CardData, index: number) => {
              return (
                <TabsTrigger
                  key={card.id || index}
                  value={`tab-${index}`}
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {card.tabLabel || `Tab ${index + 1}`}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {cards.map((card: CardData, index: number) => {
            return (
              <TabsContent key={card.id || index} value={`tab-${index}`}>
                <PricingCardContent {...card} />
              </TabsContent>
            )
          })}
        </Tabs>
      ) : (
        // Mobile: Select dropdown
        <>
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="mb-4 w-full">
              <SelectValue placeholder="Select a card" />
            </SelectTrigger>
            <SelectContent>
              {cards.map((card: CardData, index: number) => {
                return (
                  <SelectItem key={card.id || index} value={`tab-${index}`}>
                    {card.tabLabel || `Tab ${index + 1}`}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {cards.map((card: CardData, index: number) => {
            if (`tab-${index}` === selectedTab) {
              return <PricingCardContent key={card.id || index} {...card} />
            }
            return null
          })}
        </>
      )}
    </div>
  )
}
