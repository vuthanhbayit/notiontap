import { BulletList } from '@tiptap/extension-bullet-list'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default BulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Bullet List',
            searchTerms: ['unordered', 'point'],
            icon: 'i-ri-list-unordered',
            group: 'format',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).toggleBulletList().run()
            },
          },
        ],
      },
    }
  },
})
