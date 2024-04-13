import { Table } from '@tiptap/extension-table'
import type { CommandProps } from '@/extensions/slash-command/types'

export default Table.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Table',
            searchTerms: ['table'],
            icon: 'i-ri-table-line',
            group: 'insert',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
            },
          },
        ],
      },
    }
  },
}).configure({
  resizable: true,
  lastColumnResizable: false,
  allowTableNodeSelection: true,
})
