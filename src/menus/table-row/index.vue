<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :should-show="shouldShow"
    :tippyOptions="{
      duration: 100,
      offset: [0, 15],
      placement: 'left',
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
    }"
    plugin-key="table-row-menu"
  >
    <toolbar-wrapper is-vertical>
      <base-button class="inline-flex space-x-2 items-center" @click="onAddRowBefore">
        <i class="w-4 h-4 i-ri-insert-row-top"></i>

        <span>Add row before</span>
      </base-button>
      <base-button class="inline-flex space-x-2 items-center" @click="onAddRowAfter">
        <i class="w-4 h-4 i-ri-insert-row-bottom"></i>

        <span>Add row after</span>
      </base-button>
      <base-button class="inline-flex space-x-2 items-center" @click="onDeleteRow">
        <i class="w-4 h-4 i-ri-delete-row"></i>

        <span>Delete row</span>
      </base-button>
    </toolbar-wrapper>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import type { EditorState } from 'prosemirror-state'
import { isRowGripSelected } from './utils.ts'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'
import BaseButton from '@/components/base-button.vue'

interface Props {
  editor: Editor
}

defineOptions({
  name: 'TableRowMenu',
})

const props = defineProps<Props>()

const shouldShow = ({ view, state, from }: { view: EditorView; from: number; state: EditorState }): boolean => {
  if (!state) return false

  return isRowGripSelected({ editor: props.editor, view, state, from: from || 0 })
}

const onAddRowBefore = () => {
  props.editor.chain().focus().addRowBefore().run()
}

const onAddRowAfter = () => {
  props.editor.chain().focus().addRowAfter().run()
}

const onDeleteRow = () => {
  props.editor.chain().focus().deleteRow().run()
}
</script>
