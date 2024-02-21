import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@/extensions/horizontal'
import Link from '@/extensions/link'
import { isTextSelection } from '@tiptap/core'
import type { Editor } from '@tiptap/core'

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected')
  const gripRow = container && container.querySelector && container.querySelector('a.grip-row.selected')

  return !!(gripColumn || gripRow)
}

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [HorizontalRule.name, CodeBlock.name, Link.name]

  return customNodes.some(type => editor.isActive(type)) || isTableGripSelected(node)
}

export const isTextSelected = ({ editor }: { editor: Editor }) => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor

  // Sometime check for `empty` is not enough.
  // Doubleclick an empty paragraph returns a node size of 2.
  // So we check also for an empty text size.
  const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(selection)

  return !(empty || isEmptyTextBlock || !editor.isEditable)
}