import { Youtube } from '@tiptap/extension-youtube'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default Youtube.extend({
  textMenu: false,

  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Youtube',
            searchTerms: ['youtube', 'iframe', 'embed'],
            icon: 'i-ri-youtube-line',
            group: 'insert',
            command: ({ editor, range }: CommandProps) => {
              const src = window.prompt('Input Youtube URL')

              if (src) {
                editor.chain().focus().deleteRange(range).setYoutubeVideo({ src }).run()
              }
            },
          },
        ],
      },
    }
  },
})
