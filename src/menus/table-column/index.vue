<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :should-show="shouldShow"
    :tippyOptions="{
      duration: 100,
      offset: [0, 15],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
    }"
    plugin-key="table-column-menu"
  >
    <toolbar-wrapper is-vertical>
      <base-button class="inline-flex space-x-2 items-center" @click="onAddColumnBefore">
        <i class="w-4 h-4 i-ri-insert-column-left"></i>

        <span>Add column before</span>
      </base-button>
      <base-button class="inline-flex space-x-2 items-center" @click="onAddColumnAfter">
        <i class="w-4 h-4 i-ri-insert-column-right"></i>

        <span>Add column after</span>
      </base-button>
      <base-button class="inline-flex space-x-2 items-center" @click="onDeleteColumn">
        <i class="w-4 h-4 i-ri-delete-column"></i>

        <span>Delete column</span>
      </base-button>
    </toolbar-wrapper>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import type { EditorState } from 'prosemirror-state'
import { isColumnGripSelected } from './utils.ts'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'
import BaseButton from '@/components/base-button.vue'

interface Props {
  editor: Editor
}

const props = defineProps<Props>()

const shouldShow = ({ view, state, from }: { view: EditorView; from: number; state: EditorState }): boolean => {
  if (!state) return false

  return isColumnGripSelected({ editor: props.editor, view, state, from: from || 0 })
}

const onAddColumnBefore = () => {
  props.editor.chain().focus().addColumnBefore().run()
}

const onAddColumnAfter = () => {
  props.editor.chain().focus().addColumnAfter().run()
}

const onDeleteColumn = () => {
  props.editor.chain().focus().deleteColumn().run()
}
</script>
