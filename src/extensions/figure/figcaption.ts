import { mergeAttributes, Node } from '@tiptap/core'
import FigcaptionComponent from './components/figcaption.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

export const Figcaption = Node.create({
  name: 'figcaption',

  addOptions() {
    return {
      HTMLAttributes: {},
      emptyNodeClass: 'is-empty',
      placeholder: 'Write a caption ...',
    }
  },

  content: 'text*',

  selectable: true,

  draggable: false,

  parseHTML() {
    return [{ tag: 'figcaption' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figcaption', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView: () => {
    return VueNodeViewRenderer(FigcaptionComponent)
  },
})
