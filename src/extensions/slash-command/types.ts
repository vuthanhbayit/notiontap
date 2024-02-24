import type { Editor, Range } from '@tiptap/core'

export interface CommandProps {
  editor: Editor
  range: Range
}

export interface SuggestionItem {
  title: string
  icon: string
  searchTerms: string[]
  group: 'hierarchy' | 'format' | 'insert' | 'other' | string
  index?: number
  command: (props: CommandProps) => void
}

export interface SuggestionOptions {
  suggestion: {
    items: SuggestionItem[]
  }
}
