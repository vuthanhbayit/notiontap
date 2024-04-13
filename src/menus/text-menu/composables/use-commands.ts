import type { Editor } from '@tiptap/core'

export const useCommands = (editor: Editor) => {
  return {
    onBold: () => editor.chain().focus().toggleBold().run(),
    onItalic: () => editor.chain().focus().toggleItalic().run(),
    onUnderline: () => editor.chain().focus().toggleUnderline().run(),
    onStrike: () => editor.chain().focus().toggleStrike().run(),
    onCode: () => editor.chain().focus().toggleCode().run(),
    onCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    onLink: (state: { url: string; inNewTab: boolean; rel: string[] }) =>
      editor
        .chain()
        .focus()
        .setLink({ href: state.url, target: state.inNewTab ? '_blank' : '', rel: state.rel.join(' ') })
        .run(),
    onSetColor: (color: string) => {
      editor.chain().focus().unsetHighlight().run()

      if (color) {
        return editor.chain().focus().setColor(color).run()
      }

      editor.chain().focus().unsetColor().run()
    },
    onSetBackgroundColor: (color: string) => {
      editor.chain().focus().unsetColor().run()

      if (color) {
        return editor.chain().setHighlight({ color }).run()
      }

      editor.chain().focus().unsetHighlight().run()
    },
    onSetSearchAndReplace: () => {
      const { selection, doc } = editor.state
      const text = doc.textBetween(selection.from, selection.to, ' ')
      editor.commands.setSearchTerm(text)
    },
  }
}
