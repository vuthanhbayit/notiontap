import { OrderedList } from '@tiptap/extension-ordered-list'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default OrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Numbered List',
            searchTerms: ['ordered'],
            icon: 'i-ri-list-ordered',
            group: 'format',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).toggleOrderedList().run()
            },
          },
        ],
      },
    }
  },
})
