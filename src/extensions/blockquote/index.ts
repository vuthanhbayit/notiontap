import { Blockquote } from '@tiptap/extension-blockquote'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default Blockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Blockquote',
            searchTerms: ['blockquote'],
            icon: 'i-ri-double-quotes-r',
            group: 'format',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setBlockquote().run()
            },
          },
        ],
      },
    }
  },
})
