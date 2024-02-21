import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import { isCustomNodeSelected, isTextSelected } from '@/utils'

interface ShouldShow {
  view: EditorView
  from: number
  to: number
}
export const useStates = (editor: Editor) => {
  const shouldShow = ({ view, from }: ShouldShow): boolean => {
    if (!view) return false

    const domAtPos = view.domAtPos(from || 0).node as HTMLElement
    const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
    const node = nodeDOM || domAtPos

    if (isCustomNodeSelected(editor, node)) return false

    return isTextSelected({ editor })
  }

  return {
    shouldShow,
    isBold: () => editor.isActive('bold'),
    isItalic: () => editor.isActive('italic'),
    isStrike: () => editor.isActive('strike'),
    isUnderline: () => editor.isActive('underline'),
    isCode: () => editor.isActive('code'),
    isCodeBlock: () => editor.isActive('codeBlock'),
    isLink: () => editor.isActive('link'),
    isSubscript: () => editor.isActive('subscript'),
    isSuperscript: () => editor.isActive('superscript'),
    isAlignLeft: () => editor.isActive({ textAlign: 'left' }),
    isAlignCenter: () => editor.isActive({ textAlign: 'center' }),
    isAlignRight: () => editor.isActive({ textAlign: 'right' }),
    isAlignJustify: () => editor.isActive({ textAlign: 'justify' }),
    currentColor: () => editor.getAttributes('textStyle')?.color || undefined,
    currentHighlight: () => editor.getAttributes('highlight')?.color || undefined,
    currentFont: () => editor.getAttributes('textStyle')?.fontFamily || undefined,
    currentSize: () => editor.getAttributes('textStyle')?.fontSize || undefined,
  }
}
