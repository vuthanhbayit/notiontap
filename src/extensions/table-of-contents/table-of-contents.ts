import { mergeAttributes, Node } from '@tiptap/core'
import { randomString } from '@vt7/utils'
import { getIndexFn, getLevelFn, updateToc, tocPlugin, tidyTocContent } from './utils.ts'
import type { Options, Storage } from './types.ts'
import type { CommandProps } from '@/extensions/slash-command/types.ts'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TableOfContentComponent from './components/table-of-content.vue'
import { reactive } from 'vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContents: {
      setTableOfContents: () => ReturnType
    }
  }
}

export const TableOfContents = Node.create<Partial<Options>, Storage>({
  name: 'tableOfContents',

  group: 'block',

  defining: true,

  isolating: true,

  addStorage: () =>
    reactive({
      contents: [],
      anchors: [],
      scrollHandler: () => null,
      scrollPosition: 0,
    }),

  addGlobalAttributes() {
    return [
      {
        types: this.options.anchorTypes || ['headline'],
        attributes: {
          id: {
            default: null,
            renderHTML: element => ({ id: element.id }),
            parseHTML: element => element.id || null,
          },
          'data-toc-id': {
            default: null,
            renderHTML: element => ({ 'data-toc-id': element['data-toc-id'] }),
            parseHTML: element => element.dataset.tocId || null,
          },
        },
      },
    ]
  },

  addOptions: () => ({
    HTMLAttributes: {},
    onUpdate: () => {},
    getId: () => randomString(),
    scrollParent: typeof window !== 'undefined' ? window : null,
    anchorTypes: ['heading'],
    suggestion: {
      items: [
        {
          title: 'Table of Contents',
          searchTerms: ['table', 'content'],
          icon: 'i-ri-list-view',
          group: 'insert',
          command: ({ editor, range }: CommandProps) => {
            editor.chain().focus().deleteRange(range).setTableOfContents().run()
          },
        },
      ],
    },
  }),

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    const contents = this.storage.contents

    const items = contents.map(content => {
      return [
        'a',
        {
          href: `#${content.id}`,
          class: content.id,
          'data-type': 'toc-anchor',
          'data-level': content.level,
          'data-origin-level': content.originalLevel,
          'data-index': content.itemIndex,
        },
        content.textContent,
      ]
    })

    return [
      'div',
      mergeAttributes(this.options?.HTMLAttributes || {}, HTMLAttributes, { 'data-type': this.name }),
      ...items,
    ]
  },

  addCommands() {
    return {
      setTableOfContents:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(TableOfContentComponent)
  },

  onUpdate() {
    updateToc({
      editor: this.editor,
      storage: this.storage,
      onUpdate: this.options.onUpdate ? this.options.onUpdate.bind(this) : () => {},
      getIndexFn: this.options.getIndex || getIndexFn,
      getLevelFn: this.options.getLevel || getLevelFn,
      anchorTypes: this.options.anchorTypes || [],
    })
  },
  onCreate() {
    const { tr } = this.editor.state
    const usedIds: string[] = []

    this.editor.state.doc.descendants((node, pos) => {
      const tocId = node.attrs['data-toc-id']
      if (this.options.anchorTypes?.includes(node.type.name)) {
        if (tocId == null || usedIds.includes(tocId)) {
          const newId = this.options.getId!(node.textContent)
          tr.setNodeMarkup(pos, undefined, { ...node.attrs, 'data-toc-id': newId, id: newId })
        }
        usedIds.push(tocId)
      }
    })

    this.editor.view.dispatch(tr)
    updateToc({
      editor: this.editor,
      storage: this.storage,
      onUpdate: this.options.onUpdate ? this.options.onUpdate.bind(this) : () => {},
      getIndexFn: this.options.getIndex || getIndexFn,
      getLevelFn: this.options.getLevel || getLevelFn,
      anchorTypes: this.options.anchorTypes || [],
    })

    this.storage.scrollHandler = () => {
      const scrollPosition =
        this.options.scrollParent instanceof HTMLElement
          ? this.options.scrollParent.scrollTop
          : this.options.scrollParent?.scrollY || 0
      this.storage.scrollPosition = scrollPosition

      const newContents = tidyTocContent(this.storage.contents, {
        editor: this.editor,
        anchorTypes: this.options.anchorTypes!,
        storage: this.storage,
        onUpdate: this.options.onUpdate.bind(this),
      })

      this.storage.contents = newContents
    }

    if (this.options.scrollParent) {
      this.options.scrollParent.addEventListener('scroll', this.storage.scrollHandler)
    }
  },
  onDestroy() {
    if (this.options.scrollParent) {
      this.options.scrollParent.removeEventListener('scroll', this.storage.scrollHandler)
    }
  },
  addProseMirrorPlugins() {
    return [tocPlugin({ getId: this.options.getId!, anchorTypes: this.options.anchorTypes! })]
  },
})
