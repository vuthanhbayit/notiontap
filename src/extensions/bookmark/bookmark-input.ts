import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import type { SuggestionOptions } from '@/extensions/slash-command/types.ts'
import BookmarkInputComponent from './components/bookmark-input.vue'
import { BookmarkAttribute } from './bookmark'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bookmarkInput: {
      setBookmarkInput: () => ReturnType
    }
  }
}

export interface BookmarkInputOptions extends SuggestionOptions {
  getLinkPreview?: (url: string) => Promise<BookmarkAttribute> | BookmarkAttribute
}

export const BookmarkInput = Node.create<BookmarkInputOptions>({
  name: 'bookmarkInput',

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
            title: 'Web bookmark',
            searchTerms: ['bookmark', 'rick', 'link', 'rick link'],
            icon: 'i-ri-git-repository-line',
            group: 'insert',
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setBookmarkInput().run()
            },
          },
        ],
      },
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }]
  },

  addCommands() {
    return {
      setBookmarkInput:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(BookmarkInputComponent)
  },
})
