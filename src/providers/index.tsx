import React from 'react'

import { BreadcrumbProvider } from './Breadcrumb'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <BreadcrumbProvider>{children}</BreadcrumbProvider>
}
