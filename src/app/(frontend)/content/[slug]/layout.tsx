import React from 'react'
import { BreadcrumbSetter } from './BreadcrumbSetter'

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const override = {
    label: 'Content',
    href: '/content',
    segmentIndex: 0,
  }

  return (
    <>
      <BreadcrumbSetter override={override} />
      {children}
    </>
  )
}

