import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import { SuggestionOptions } from '@/extensions/slash-command/types.ts'
import WebComponentInputComponent from './components/web-component-input.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    webComponent: {
      setWebComponentInput: () => ReturnType
    }
  }
}
export const WebComponent = Node.create<SuggestionOptions>({
  name: 'webComponent',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  textMenu: false,

  addAttributes() {
    return {
      content: {
        default: '',
        parseHTML: element => element.innerText,
        renderHTML: attributes => ({ content: attributes.content }),
      },
    }
  },

  addOptions() {
    return {
      suggestion: {
        items: [
          {
            title: 'Web component',
            searchTerms: ['component', 'custom'],
            icon: 'i-ri-html5-line',
            group: 'insert',
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setWebComponentInput().run()
            },
          },
        ],
      },
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': this.name }, HTMLAttributes.content]
  },

  addCommands() {
    return {
      setWebComponentInput:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(WebComponentInputComponent)
  },
})
