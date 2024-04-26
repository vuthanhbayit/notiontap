import { Node } from '@tiptap/vue-3'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export const ImageURL = Node.create({
  name: 'imageURL',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  inline: false,

  textMenu: false,

  addOptions() {
    return {
      suggestion: {
        items: [
          {
            title: 'Image URL',
            searchTerms: ['image', 'url'],
            icon: 'i-ri-image-add-line',
            group: 'insert',
            command: ({ editor, range }: CommandProps) => {
              const url = window.prompt('URL')

              if (url) {
                editor.chain().focus().deleteRange(range).setImageBlock({ src: url, loading: 'lazy' }).run()
              }
            },
          },
        ],
      },
    }
  },
})
