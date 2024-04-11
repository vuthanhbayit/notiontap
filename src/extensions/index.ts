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
import Fullscreen from './fullscreen'
import SourceCode from './source-code'

import { ImageUpload } from './image-upload'
import { ImageBlock } from './image-block'
import { Figure, Figcaption } from './figure'
import { Bookmark, BookmarkInput, type BookmarkInputOptions, type BookmarkAttribute } from './bookmark'
import { WebComponent } from './web-component'
import { SearchAndReplace } from './search-and-replace'
import { TableOfContents } from './table-of-contents'

const simpleExtensions = [
  Document,
  Focus,
  Draggable,
  HorizontalRule,
  Placeholder,
  SlashCommand,
  TextStyle,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Columns,
  Column,
  TrailingNode,
  SearchAndReplace,
  Fullscreen,
  Blockquote,
  BulletList,
  CodeBlock,
  Heading,
  OrderedList,
  Link,
  Underline,
  TaskList,
  TaskItem,
  Color,
  Youtube,
  TableOfContents,
  SourceCode,
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
  Draggable,
  HorizontalRule,
  Placeholder,
  SlashCommand,
  TextStyle,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Columns,
  Column,
  TrailingNode,
  SearchAndReplace,
  Fullscreen,
  Blockquote,
  BulletList,
  CodeBlock,
  Heading,
  OrderedList,
  Link,
  Underline,
  TaskList,
  TaskItem,
  Color,
  Highlight,
  Youtube,
  ImageUpload,
  ImageBlock,
  Figure,
  Figcaption,
  Bookmark,
  BookmarkInput,
  WebComponent,
  type BookmarkInputOptions,
  type BookmarkAttribute,
}
