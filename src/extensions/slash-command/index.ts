import { type Editor, Extension, type Range } from '@tiptap/core'
import { VueRenderer } from '@tiptap/vue-3'
import type { Instance as TippyInstance } from 'tippy.js'
import tippy from 'tippy.js'
import Suggestion from '@tiptap/suggestion'

import SlashCommandList from './slash-command-list.vue'
import type { CommandProps } from './types.ts'
import type { SuggestionItem } from './types.ts'
import { isArray, uniq } from '@vt7/utils'

const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: Range
          props: { command: (opts: CommandProps) => void }
        }) => {
          props.command({ editor, range })
        },
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const getSuggestionItems = ({ query, editor }: { query: string; editor: Editor }): SuggestionItem[] => {
  const suggestionItemsInExtensions = () => {
    const _extensions = editor?.extensionManager.extensions
    return _extensions?.reduce((acc, extension) => {
      const _suggestion = extension.options.suggestion
      if (_suggestion && isArray(_suggestion.items)) {
        acc = acc.concat(_suggestion.items)
      }

      return acc
    }, [] as SuggestionItem[])
  }

  const suggestionItems = uniq(suggestionItemsInExtensions(), item => item.title)

  return suggestionItems.filter(item => {
    if (query && query.length > 0) {
      const search = query.toLowerCase()
      return (
        item.title.toLowerCase().includes(search) ||
        (item.searchTerms && item.searchTerms.some((term: string) => term.includes(search)))
      )
    }

    return true
  })
}

const renderItems = () => {
  let component: VueRenderer | null = null
  let popup: TippyInstance[] = []

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new VueRenderer(SlashCommandList, {
        props,
        editor: props.editor,
      })

      if (!props.clientRect) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props)

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide()

        return true
      }

      return component?.ref?.onKeyDown(props.event)
    },
    onExit: () => {
      popup?.[0].destroy()
      component?.destroy()
    },
  }
}

const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
})

export default SlashCommand
