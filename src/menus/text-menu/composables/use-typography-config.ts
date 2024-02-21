import { computed } from 'vue'
import type { Editor } from '@tiptap/core'
import type { TypographyOptions } from '../types'

export const useTypographyConfig = (editor: Editor) => {
  const typographyOptions = computed(() => {
    return [
      {
        type: 'category',
        label: 'Hierarchy',
        id: 'hierarchy',
      },
      {
        icon: 'i-ri-paragraph',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setParagraph().run(),
        id: 'paragraph',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        label: 'Paragraph',
        type: 'option',
      },
      {
        icon: 'i-ri-h-1',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({ level: 2 }).run(),
        id: 'heading1',
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive('heading', { level: 2 }),
        label: 'Heading 1',
        type: 'option',
      },
      {
        icon: 'i-ri-h-2',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({ level: 3 }).run(),
        id: 'heading2',
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive('heading', { level: 3 }),
        label: 'Heading 2',
        type: 'option',
      },
      {
        icon: 'i-ri-h-3',
        onClick: () => editor.chain().focus().lift('taskItem').liftListItem('listItem').setHeading({ level: 4 }).run(),
        id: 'heading3',
        disabled: () => !editor.can().setHeading({ level: 4 }),
        isActive: () => editor.isActive('heading', { level: 4 }),
        label: 'Heading 3',
        type: 'option',
      },
      {
        type: 'category',
        label: 'Lists',
        id: 'lists',
      },
      {
        icon: 'i-ri-list-unordered',
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        id: 'bulletList',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        label: 'Bullet list',
        type: 'option',
      },
      {
        icon: 'i-ri-list-ordered',
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        id: 'orderedList',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        label: 'Numbered list',
        type: 'option',
      },
    ] as TypographyOptions
  })

  return {
    typographyOptions,
  }
}
