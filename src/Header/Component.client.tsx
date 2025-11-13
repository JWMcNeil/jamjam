'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { BreadcrumbCollapsed } from './Breadcrumbs'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header {...(theme ? { 'data-theme': theme } : {})}>
      <div className="w-[90vw] max-w-[120rem] mx-auto z-[150] fixed top-0 left-0 right-0">
        <div className="bg-background h-full w-full p-4"></div>
        <div className="flex border border-border h-14 rounded-t-lg backdrop-blur-lg ">
          <Link
            className="flex items-center px-8 md:px-16 border-r border-border flex-shrink-0"
            href="/"
          >
            <span className="text-md md:text-xl font-black">jamjam.dev</span>
          </Link>
          <div className="flex items-center px-4 border-r border-border flex-shrink min-w-0">
            <BreadcrumbCollapsed />
          </div>
          <div className="bg-[repeating-linear-gradient(45deg,#303030,#303030_3.5px,#080808_3.5px,#080808_17.5px)] flex-1 min-w-0 border-r border-border"></div>
          <div className="flex-shrink-0 flex items-center justify-center">
            <HeaderNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
