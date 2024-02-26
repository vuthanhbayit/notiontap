import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { FocusClasses as Focus } from '@tiptap/extension-focus'

import TaskList from './task-list'
import { TaskItem } from '@tiptap/extension-task-item'

import Document from './document'
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
import Youtube from './youtube'
import { Columns, Column } from './multi-column'
import { Table, TableCell, TableHeader, TableRow } from './table'
import { TrailingNode } from './trailing-node'

import { ImageUpload } from './image-upload'
import { ImageBlock } from './image-block'
import { Figure, Figcaption } from './figure'
import { Bookmark, BookmarkInput, type BookmarkInputOptions, type BookmarkAttribute } from './bookmark'
import { WebComponent } from './web-component'
import { SearchAndReplace } from '@/extensions/search-and-replace'

const simpleExtensions = [
  Document,
  Focus,
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
  TextStyle,
  Color,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Columns,
  Column,
  ImageBlock,
  Figure,
  Figcaption,
  TrailingNode,
  Youtube,
  SearchAndReplace,
  Highlight.configure({
    multicolor: true,
  }),
  StarterKit.configure({
    dropcursor: {
      class: 'dropcusor',
      width: 4,
      color: '#DBEAFE',
    },
    document: false,
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
  Document,
  Focus,
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
  TextStyle,
  Color,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Columns,
  Column,
  Highlight,
  StarterKit,
  ImageUpload,
  ImageBlock,
  Figure,
  Figcaption,
  TrailingNode,
  Youtube,
  Bookmark,
  BookmarkInput,
  BookmarkInputOptions,
  BookmarkAttribute,
  WebComponent,
  SearchAndReplace,
}
