import type { CommandProps } from '@/extensions/slash-command/types.ts'
import { Node } from '@tiptap/core'

export default Node.create({
  name: 'Fullscreen',
  addOptions() {
    return {
      suggestion: {
        items: [
          {
            title: 'Fullscreen',
            searchTerms: ['fullscreen'],
            icon: 'i-ri-fullscreen-line',
            group: 'other',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).run()
              const document = editor.view.root
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
