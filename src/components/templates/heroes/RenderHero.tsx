import React from 'react'

import { HighImpactHero } from '@/components/templates/heroes/HighImpact'
import { LowImpactHero } from '@/components/templates/heroes/LowImpact'
import { MediumImpactHero } from '@/components/templates/heroes/MediumImpact'
import { CustomHero } from '@/components/templates/heroes/CustomHero'
import { AnimatedHero } from '@/components/templates/heroes/AnimatedHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  custom: CustomHero,
  animated: AnimatedHero,
}

type HeroProps = {
  type?: keyof typeof heroes | 'none' | null
  [key: string]: unknown
}

export const RenderHero: React.FC<HeroProps> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type as keyof typeof heroes]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
