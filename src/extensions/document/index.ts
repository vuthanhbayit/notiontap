import { Document } from '@tiptap/extension-document'
import type { CommandProps } from '@/extensions/slash-command/types.ts'

export default Document.extend({
  content: '(block|columns)+',
})
