import { mergeAttributes, Node } from '@tiptap/core'
import FigcaptionComponent from './components/figcaption.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

export const Figcaption = Node.create({
  name: 'figcaption',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'not-prose',
      },
      emptyNodeClass: 'is-empty',
      placeholder: 'Write a caption ...',
    }
  },

  content: 'block',

  selectable: true,

  draggable: false,

  parseHTML() {
    return [{ tag: 'figcaption' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figcaption', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addNodeView: () => {
    return VueNodeViewRenderer(FigcaptionComponent)
  },
})
