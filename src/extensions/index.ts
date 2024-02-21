import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'

import Blockquote from './blockquote'
import BulletList from './bullet-list'
import CodeBlock from './code-block'
import Draggable from './draggable'
import Heading from './heading'
import HorizontalRule from './horizontal'
import Link from './link'
import OrderedList from './ordered-list'
import Placeholder from './placeholder'
import SlashCommand from './slash-command'

const simpleExtensions = [
  Blockquote,
  BulletList,
  CodeBlock,
  Draggable,
  Heading,
  HorizontalRule,
  OrderedList,
  Placeholder,
  SlashCommand,
  Link,
  Underline,
  TaskList,
  TaskItem,
  StarterKit.configure({
    dropcursor: {
      class: 'dropcusor',
      width: 4,
      color: '#DBEAFE',
    },
    heading: false,
    orderedList: false,
    bulletList: false,
    blockquote: false,
    horizontalRule: false,
    codeBlock: false,
  }),
] as const

export {
  simpleExtensions,
  StarterKit,
  Blockquote,
  BulletList,
  Draggable,
  Heading,
  HorizontalRule,
  OrderedList,
  Placeholder,
  SlashCommand,
}
