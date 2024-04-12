import { computed } from 'vue'
import type { Editor } from '@tiptap/core'

export interface AlignConfig {
  icon: string
  onClick: () => void
  id: string
  isActive: () => void
  label: string
  shortcuts: string[]
}

export const useAlignConfig = (editor: Editor) => {
  const alignOptions = computed(() => {
    return [
      {
        icon: 'i-ri-align-left',
        onClick: () => editor.chain().focus().setTextAlign('left').run(),
        id: 'left',
        isActive: () => editor.isActive({ textAlign: 'left' }),
        label: 'Align left',
        shortcuts: ['Mod', 'Shift', 'L'],
      },
      {
        icon: 'i-ri-align-center',
        onClick: () => editor.chain().focus().setTextAlign('center').run(),
        id: 'center',
        isActive: () => editor.isActive({ textAlign: 'center' }),
        label: 'Align center',
        shortcuts: ['Mod', 'Shift', 'E'],
      },
      {
        icon: 'i-ri-align-right',
        onClick: () => editor.chain().focus().setTextAlign('right').run(),
        id: 'right',
        isActive: () => editor.isActive({ textAlign: 'right' }),
        label: 'Align right',
        shortcuts: ['Mod', 'Shift', 'R'],
      },
      {
        icon: 'i-ri-align-justify',
        onClick: () => editor.chain().focus().setTextAlign('justify').run(),
        id: 'justify',
        isActive: () => editor.isActive({ textAlign: 'justify' }),
        label: 'Justify',
        shortcuts: ['Mod', 'Shift', 'J'],
      },
    ]
  })

  return {
    alignOptions,
  }
}
