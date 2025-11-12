import { SidebarClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Sidebar } from '@/payload-types'

export async function Sidebar() {
  const sidebarData: Sidebar = await getCachedGlobal('sidebar', 1)()

  return <SidebarClient data={sidebarData} />
}

