import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Tag } from '@/payload-types'
import type { NextRequest } from 'next/server'
import type { ComponentType } from 'react'

export type LabRuntimeKind = 'ai' | 'app'
export type LabCatalogKind = 'tool' | 'app' | 'ai'
export type LabSidebarGroup = 'ai' | 'apps' | 'tools'

export type LabUiLoader = () => Promise<{ default: ComponentType }>
export type LabHandler = (req: NextRequest) => Promise<Response>
export type LabHandlerLoader = () => Promise<{ handler: LabHandler }>

export interface LabToolMeta {
  slug: string
  name: string
  description: string
  model?: string
  writeUp?: DefaultTypedEditorState | null
  blogPostUrl?: string | null
}

export interface LabCodeTool extends LabToolMeta {
  runtime: LabRuntimeKind
  catalogKind: LabCatalogKind
  defaultGroup: LabSidebarGroup
  defaultOrder: number
  loadUi: LabUiLoader
  loadHandler?: LabHandlerLoader
}

export interface LabOverlayEntry {
  toolKey: string
  title?: string | null
  slug?: string | null
  description?: string | null
  model?: string | null
  writeUp?: DefaultTypedEditorState | null
  blogPostUrl?: string | null
  kind?: LabCatalogKind | null
  group?: LabSidebarGroup | null
  enabled?: boolean | null
  order?: number | null
  primaryTag?: LabPrimaryTag | null
}

export interface LabPrimaryTag {
  id: Tag['id']
  label: Tag['label']
  colour: Tag['colour']
}

export interface LabResolvedTool extends LabCodeTool {
  toolKey: string
  enabled: boolean
  order: number
  group: LabSidebarGroup
  kind: LabCatalogKind
  primaryTag: LabPrimaryTag | null
}
