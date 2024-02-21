import type { Editor } from '@tiptap/core'

export const useCommands = (editor: Editor) => {
  return {
    onBold: () => editor.chain().focus().toggleBold().run(),
    onItalic: () => editor.chain().focus().toggleItalic().run(),
    onUnderline: () => editor.chain().focus().toggleUnderline().run(),
    onStrike: () => editor.chain().focus().toggleStrike().run(),
    onCode: () => editor.chain().focus().toggleCode().run(),
    onCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    onLink: (state: { url: string; inNewTab: boolean }) =>
      editor
        .chain()
        .focus()
        .setLink({ href: state.url, target: state.inNewTab ? '_blank' : '' })
        .run(),
  }
}
