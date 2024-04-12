import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes } from '@tiptap/core'
import BookmarkComponent from './components/bookmark.vue'

export interface BookmarkAttribute {
  src: string
  title: string
  description: string
  img: string
  favicon: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bookmark: {
      setBookmark: (state: BookmarkAttribute) => ReturnType
    }
  }
}

export const Bookmark = Node.create({
  name: 'bookmark',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  textMenu: false,

  addAttributes() {
    return {
      src: {
        default: '',
        parseHTML: (element: Element) => element.querySelector('.notiontap-bookmark__src')?.textContent,
        renderHTML: attributes => ({ src: attributes.src }),
      },
      title: {
        default: '',
        parseHTML: (element: Element) => element.querySelector('.notiontap-bookmark__title')?.textContent,
        renderHTML: attributes => ({ title: attributes.title }),
      },
      description: {
        default: '',
        parseHTML: (element: Element) => element.querySelector('.notiontap-bookmark__desc')?.textContent,
        renderHTML: attributes => ({ description: attributes.description }),
      },
      img: {
        default: '',
        parseHTML: (element: Element) => element.querySelector('.notiontap-bookmark__img')?.src,
        renderHTML: attributes => ({ img: attributes.img }),
      },
      favicon: {
        default: '',
        parseHTML: (element: Element) => element.querySelector('.notiontap-bookmark__favicon')?.src,
        renderHTML: attributes => ({ favicon: attributes.favicon }),
      },
    }
  },

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)

    return [
      'div',
      { 'data-type': this.name, class: 'notiontap-bookmark not-prose' },
      [
        'a',
        {
          href: attrs.src,
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
        },
        [
          'div',
          { class: 'notiontap-bookmark__item' },
          ['div', { class: 'notiontap-bookmark__title' }, attrs.title],
          ['div', { class: 'notiontap-bookmark__desc' }, attrs.description],
          [
            'div',
            {
              class: 'notiontap-bookmark__url-wrapper',
            },
            [
              'div',
              { class: 'notiontap-bookmark__favicon-wrapper' },
              ['img', { src: attrs.favicon, class: 'notiontap-bookmark__favicon', loading: 'lazy' }],
            ],
            ['div', { class: 'notiontap-bookmark__src' }, attrs.src],
          ],
        ],
        [
          'div',
          { class: 'notiontap-bookmark__item' },
          ['img', { class: 'notiontap-bookmark__img', src: attrs.img, loading: 'lazy' }],
        ],
      ],
    ]
  },

  addCommands() {
    return {
      setBookmark:
        attrs =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: attrs,
          }),
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(BookmarkComponent)
  },
})
