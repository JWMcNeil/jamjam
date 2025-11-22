import React from 'react'
import { BreadcrumbSetter } from './BreadcrumbSetter'

export default async function WebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const override = {
    label: 'Web',
    href: '/web',
    segmentIndex: 0,
  }

  return (
    <>
      <BreadcrumbSetter override={override} />
      {children}
    </>
  )
}

