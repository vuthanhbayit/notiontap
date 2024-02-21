import { CodeBlock } from '@tiptap/extension-code-block'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default CodeBlock.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Code Block',
            searchTerms: ['codeBlock', 'code', 'block'],
            icon: 'i-ri-code-box-line',
            group: 'format',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setCodeBlock().run()
            },
          },
        ],
      },
    }
  },
})
