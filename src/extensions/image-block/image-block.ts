import { mergeAttributes, Range } from '@tiptap/core'
import { Image } from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageBlockComponent from './components/image-block.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlock: (attributes: { src: string; alt?: string; loading?: 'lazy' | 'eager' }) => ReturnType
      setImageBlockAt: (attributes: { src: string; pos: number | Range }) => ReturnType
      setImageBlockAlign: (align: 'left' | 'center' | 'right') => ReturnType
      setImageBlockWidth: (width: number) => ReturnType
    }
  }
}

interface Options {
  HTMLAttributes: Record<string, any>
  findImage: (element: Element) => Element | null
}

export const ImageBlock = Image.extend<Options>({
  name: 'imageBlock',

  group: 'block',

  defining: true,

  isolating: true,

  textMenu: false,

  addOptions() {
    return {
      HTMLAttributes: {},
      findImage: (element: Element): Element | null => {
        if (element.getAttribute('data-type') === 'imageBlock') {
          return element.getElementsByTagName('img')?.[0]
        }

        return element
      },
    }
  },

  addAttributes() {
    const findImage = this.options.findImage

    return {
      src: {
        default: '',
        parseHTML: (element: Element) => findImage(element)?.getAttribute('src'),
        renderHTML: attributes => ({ src: attributes.src }),
      },
      width: {
        default: '100%',
        parseHTML: (element: Element) => findImage(element)?.getAttribute('data-width'),
        renderHTML: attributes => ({ 'data-width': attributes.width }),
      },
      align: {
        default: 'center',
        parseHTML: (element: Element) => findImage(element)?.getAttribute('data-align'),
        renderHTML: attributes => ({ 'data-align': attributes.align }),
      },
      alt: {
        default: undefined,
        parseHTML: (element: Element) => findImage(element)?.getAttribute('alt'),
        renderHTML: attributes => ({ alt: attributes.alt }),
      },
      loading: {
        default: 'lazy',
        parseHTML: (element: Element) => findImage(element)?.getAttribute('loading'),
        renderHTML: attributes => ({ loading: attributes.loading }),
      },
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }, { tag: 'img[src]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': this.name }, ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]]
  },

  addCommands() {
    return {
      setImageBlock:
        attrs =>
        ({ commands }) => {
          return commands.insertContent({
            type: 'imageBlock',
            attrs: attrs,
          })
        },

      setImageBlockAt:
        attrs =>
        ({ commands }) => {
          return commands.insertContentAt(attrs.pos, { type: 'imageBlock', attrs: { src: attrs.src } })
        },

      setImageBlockAlign:
        align =>
        ({ commands }) =>
          commands.updateAttributes('imageBlock', { align }),

      setImageBlockWidth:
        width =>
        ({ commands }) =>
          commands.updateAttributes('imageBlock', { width: `${Math.max(0, Math.min(100, width))}%` }),
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageBlockComponent)
  },
})
