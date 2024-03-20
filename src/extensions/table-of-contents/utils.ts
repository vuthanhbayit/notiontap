import { PluginKey } from '@tiptap/pm/state'
import { Plugin } from '@/tiptap/pm.ts'
import type { Options, TocItem, TocProps } from './types.ts'

export const tocPluginKey = new PluginKey('tableOfContent')

export const tocPlugin = (props: { getId: Options['getId']; anchorTypes: Options['anchorTypes'] }) => {
  return new Plugin({
    key: tocPluginKey,
    appendTransaction(transactions, _, newState) {
      const tr = newState.tr
      let hasChanged = false

      if (transactions.some(({ docChanged }) => docChanged)) {
        const usedIds: string[] = []

        newState.doc.descendants((node, pos) => {
          const tocId = node.attrs['data-toc-id']
          if (props.anchorTypes.includes(node.type.name)) {
            if (tocId == null || usedIds.includes(tocId)) {
              const newId = props.getId(node.textContent)
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, 'data-toc-id': newId, id: newId })
              hasChanged = true
            }
            usedIds.push(tocId)
          }
        })
      }

      return hasChanged ? tr : null
    },
  })
}

export const getIndexFn = (_: TocItem, tocContent: TocItem[]) => {
  const previousItem = tocContent.at(-1)
  return previousItem ? (previousItem.itemIndex || 1) + 1 : 1
}

export const getLevelFn = (item: TocItem, tocContent: TocItem[] | null) => {
  const previousItem = tocContent ? tocContent.at(-1) : undefined
  return item.node.attrs.level > (previousItem ? previousItem.originalLevel : 1)
    ? (previousItem ? previousItem.level : 1) + 1
    : item.node.attrs.level < (previousItem ? previousItem.originalLevel : 1)
      ? previousItem
        ? previousItem.level
        : 1
      : previousItem
        ? previousItem.level
        : 1
}

export const updateToc = (props: TocProps) => {
  const { editor, onUpdate } = props
  const anchors: TocItem[] = []
  let tocContents: TocItem[] = []
  let previousAnchor: TocItem | null = null

  editor.state.doc.descendants((node, pos) => {
    if (props.anchorTypes?.includes(node.type.name)) {
      anchors.push({
        node: node,
        pos: pos,
        textContent: node.textContent,
        ...node.attrs,
      })
    }
  })

  anchors.forEach((anchor, index) => {
    const domNode = editor.view.domAtPos(anchor.pos + 1).node as HTMLElement
    const isScrolledOver = props.storage.scrollPosition >= domNode.offsetTop
    tocContents.push({
      itemIndex: index,
      id: anchor.id,
      originalLevel: anchor.node.attrs.level,
      level: props.getLevelFn(anchor, tocContents),
      textContent: anchor.textContent,
      pos: anchor.pos,
      editor: editor,
      isActive: false,
      isScrolledOver: previousAnchor ? false : isScrolledOver,
      node: anchor.node,
      dom: domNode,
    })
    previousAnchor = anchor
  })

  tocContents = tidyTocContent(tocContents, props)

  if (onUpdate) {
    onUpdate(tocContents, props.storage.contents.length === 0)
  }

  props.storage.contents = tocContents
  editor.state.tr.setMeta('toc', tocContents)
  editor.view.dispatch(editor.state.tr)
}

export const tidyTocContent = (content: TocItem[], props: TocProps): TocItem[] => {
  const { editor } = props
  let activeId: string | null = null
  const scrolledOverIds: string[] = []

  const anchors: TocItem[] = []
  const activeIds: string[] = []

  editor.state.doc.descendants((node, pos) => {
    if (props.anchorTypes?.includes(node.type.name)) {
      anchors.push({
        node: node,
        pos: pos,
        ...node.attrs,
      })
    }
  })

  anchors.forEach(anchor => {
    const domNode = editor.view.domAtPos(anchor.pos + 1).node as HTMLElement
    if (props.storage.scrollPosition >= domNode.offsetTop) {
      activeId = anchor.id
      activeIds.push(anchor.id)
    }
    scrolledOverIds.push(anchor.id)
  })

  content = content.map(item => ({
    ...item,
    isActive: item.id === activeId,
    isScrolledOver: scrolledOverIds.includes(item.id),
  }))

  if (props.onUpdate) {
    props.onUpdate(content, props.storage.contents.length === 0)
  }

  return content
}
