import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { BreadcrumbProvider } from './Breadcrumb'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <BreadcrumbProvider>{children}</BreadcrumbProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
