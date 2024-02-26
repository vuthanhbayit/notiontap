import type { Range } from '@tiptap/core'
import type { DecorationSet } from '@tiptap/pm/view'

export interface TextNodesWithPosition {
  text: string
  pos: number
}

export interface ProcessedSearches {
  decorationsToReturn: DecorationSet
  results: Range[]
}

export interface SearchAndReplaceOptions {
  searchResultClass: string
  disableRegex: boolean
}

export interface SearchAndReplaceStorage {
  searchTerm: string
  replaceTerm: string
  results: Range[]
  lastSearchTerm: string
  caseSensitive: boolean
  lastCaseSensitive: boolean
  resultIndex: number
  lastResultIndex: number
}
