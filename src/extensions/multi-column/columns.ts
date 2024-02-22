import { Node } from '@tiptap/core'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export enum ColumnLayout {
  SidebarLeft = 'sidebar-left',
  SidebarRight = 'sidebar-right',
  TwoColumn = 'two-column',
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    columns: {
      setColumns: () => ReturnType
      setLayout: (layout: ColumnLayout) => ReturnType
    }
  }
}

export const Columns = Node.create({
  name: 'columns',

  group: 'columns',

  content: 'column column',

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn,
      },
    }
  },

  addOptions() {
    return {
      suggestion: {
        items: [
          {
            title: 'Columns',
            searchTerms: ['column'],
            icon: 'i-ri-layout-column-line',
            group: 'insert',
            command: ({ editor, range }: CommandProps) => {
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .setColumns()
                .focus(editor.state.selection.head - 1)
                .run()
            },
          },
        ],
      },
    }
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }) => {
          return commands.insertContent(
            `<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`,
          )
        },
      setLayout:
        (layout: ColumnLayout) =>
        ({ commands }) => {
          return commands.updateAttributes('columns', { layout })
        },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'columns', class: `layout-${HTMLAttributes.layout}` }, 0]
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ]
  },
})
