import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { DecorationWithType, Editor, Node } from '@tiptap/core'

export interface NodeViewProps<Options = any, Storage = any> {
  editor: Editor
  node: ProseMirrorNode
  decorations: DecorationWithType[]
  selected: boolean
  extension: Node<Options, Storage>
  getPos: () => number
  updateAttributes: (attributes: Record<string, any>) => void
  deleteNode: () => void
}
