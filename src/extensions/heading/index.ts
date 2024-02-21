import { Heading } from '@tiptap/extension-heading'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default Heading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Heading 1',
            searchTerms: ['title', 'h1'],
            icon: 'i-ri-h-1',
            group: 'hierarchy',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
            },
          },
          {
            title: 'Heading 2',
            searchTerms: ['subtitle', 'medium', 'h2'],
            icon: 'i-ri-h-2',
            group: 'hierarchy',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
            },
          },
          {
            title: 'Heading 3',
            searchTerms: ['subtitle', 'small', 'h3'],
            icon: 'i-ri-h-3',
            group: 'hierarchy',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
            },
          },
        ],
      },
    }
  },
})
