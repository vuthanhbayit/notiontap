import { mergeAttributes, Range } from '@tiptap/core'
import { Image } from '@tiptap/extension-image'

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

const findImage = (element: Element): Element | null => {
  if (element.tagName === 'IMG') {
    return element
  }

  const _images = element.getElementsByTagName('img')

  return _images && _images.length ? _images[0] : null
}

export const ImageBlock = Image.extend({
  name: 'imageBlock',

  group: 'block',

  defining: true,

  isolating: true,

  addAttributes() {
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
    return [
      { tag: `div[data-type="${this.name}"]` },
      { tag: this.options.allowBase64 ? 'img[src]' : 'img[src]:not([src^="data:"])' },
    ]
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
    return ({ HTMLAttributes, editor }) => {
      const wrapper = document.createElement('div')
      wrapper.setAttribute('data-type', this.name)

      const image = document.createElement('img')
      const imageAttrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)

      for (const key in imageAttrs) {
        image.setAttribute(key, imageAttrs[key])
      }

      const addCaptionBtn = document.createElement('a')
      addCaptionBtn.innerText = 'Add caption'
      addCaptionBtn.className = 'add-caption-image'
      addCaptionBtn.addEventListener('click', () => {
        editor.chain().focus().imageToFigure().run()
      })

      wrapper.append(image)
      wrapper.append(addCaptionBtn)

      return {
        dom: wrapper,
        contentDOM: image,
        update: updatedNode => {
          if (updatedNode.type !== this.type) return false

          return true
        },
      }
    }
  },
})
