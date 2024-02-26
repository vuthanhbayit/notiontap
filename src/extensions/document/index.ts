import { Document } from '@tiptap/extension-document'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default Document.extend({
  content: '(block|columns)+',

  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Fullscreen',
            searchTerms: ['fullscreen'],
            icon: 'i-ri-fullscreen-line',
            group: 'other',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).run()
              const root = document.querySelector('.notion-tap')

              if (root) {
                root.requestFullscreen()
              }
            },
          },
        ],
      },
    }
  },
})
