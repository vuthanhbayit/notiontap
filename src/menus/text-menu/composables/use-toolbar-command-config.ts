import { computed } from 'vue'
import type { Editor } from '@tiptap/core'
import { useCommands, useStates } from './index.ts'

export const useToolbarCommandConfig = (editor: Editor) => {
  const states = useStates(editor)
  const commands = useCommands(editor)

  const toolbarCommands = computed(() => {
    return [
      {
        command: commands.onBold,
        isActive: states.isBold,
        shortcuts: ['Mod', 'B'],
        icon: 'i-ri-bold',
        title: 'Bold',
      },
      {
        command: commands.onItalic,
        isActive: states.isItalic,
        shortcuts: ['Mod', 'I'],
        icon: 'i-ri-italic',
        title: 'Italic',
      },
      {
        command: commands.onUnderline,
        isActive: states.isUnderline,
        shortcuts: ['Mod', 'U'],
        icon: 'i-ri-underline',
        title: 'Underline',
      },
      {
        command: commands.onStrike,
        isActive: states.isStrike,
        shortcuts: ['Mod', 'Shift', 'S'],
        icon: 'i-ri-strikethrough',
        title: 'Strikethrough',
      },
      {
        command: commands.onCode,
        isActive: states.isCode,
        shortcuts: ['Mod', 'E'],
        icon: 'i-ri-code-line',
        title: 'Code',
      },
      {
        command: commands.onCodeBlock,
        isActive: states.isCodeBlock,
        shortcuts: ['Mod', 'Alt', 'c'],
        icon: 'i-ri-code-box-line',
        title: 'Code Block',
      },
      {
        command: commands.onCodeBlock,
        isActive: states.isCodeBlock,
        shortcuts: ['Mod', 'Alt', 'c'],
        icon: 'i-ri-code-box-line',
        title: 'Code Block',
      },
    ]
  })

  return {
    toolbarCommands,
  }
}
