import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { InputRule } from '@tiptap/core'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default HorizontalRule.extend({
  textMenu: false,

  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Horizontal Rule',
            searchTerms: ['horizontal rule'],
            icon: 'i-ri-subtract-line',
            group: 'insert',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setHorizontalRule().run()
            },
          },
        ],
      },
    }
  },
  addInputRules() {
    return [
      new InputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        handler: ({ state, range }) => {
          const attributes = {}

          const { tr } = state
          const start = range.from
          const end = range.to

          tr.insert(start - 1, this.type.create(attributes)).delete(tr.mapping.map(start), tr.mapping.map(end))
        },
      }),
    ]
  },
})
