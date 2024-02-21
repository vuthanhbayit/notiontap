import { TaskList } from '@tiptap/extension-task-list'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default TaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      suggestion: {
        items: [
          {
            title: 'Task List',
            searchTerms: ['task', 'list', 'todo'],
            icon: 'i-ri-list-check-3',
            group: 'format',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).toggleTaskList().run()
            },
          },
        ],
      },
    }
  },
})
