import type { CommandProps } from '@/extensions/slash-command/types.ts'
import { reactive } from 'vue'
import { Extension } from '@tiptap/core'

export default Extension.create<any, { visibleSourceCode: boolean }>({
  name: 'sourceCode',

  addStorage() {
    return reactive({
      visibleSourceCode: false,
    })
  },
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Source code',
            searchTerms: ['source', 'code'],
            icon: 'i-ri-code-view',
            group: 'format',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).run()
              editor.extensionStorage.sourceCode.visibleSourceCode = true
            },
          },
        ],
      },
    }
  },
})
