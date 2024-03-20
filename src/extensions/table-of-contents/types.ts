import { Editor } from '@tiptap/core'
import { Node as ProseMirrorNode } from '@tiptap/pm/model'

export interface TocItem {
  itemIndex: number
  id: string
  originalLevel: number
  level: number
  textContent: string
  pos: number
  editor: Editor // Type according to your actual editor type
  isActive: boolean
  isScrolledOver: boolean
  node: ProseMirrorNode // Type according to your actual node type
  dom: HTMLElement // Type according to your actual dom type
}

export interface Options {
  HTMLAttributes: Record<string, any>
  onUpdate: (content: TocItem[], isFirstUpdate: boolean) => void
  getId: (content: string) => string
  getIndex: (anchor: TocItem, previousAnchors: TocItem[], level: number) => number
  getLevel: (anchor: TocItem, previousAnchors: TocItem[] | null) => number
  scrollParent: HTMLElement | Window | null
  anchorTypes: string[]
}

export interface Storage {
  contents: TocItem[]
  anchors: []
  scrollHandler: () => void
  scrollPosition: number
}

export interface TocProps {
  editor: Editor
  onUpdate: Options['onUpdate']
  storage: Storage
  anchorTypes: string[]
  getLevelFn: Options['getLevel']
  getIndexFn: Options['getIndex']
}
