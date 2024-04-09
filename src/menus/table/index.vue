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
    plugin-key="table-menu"
  >
    <toolbar-wrapper>
      <base-tooltip title="Toggle table header row">
        <base-button class="inline-flex space-x-2 items-center" @click="toggleHeaderRow">
          <i class="w-4 h-4 i-ri-layout-top-line"></i>
        </base-button>
      </base-tooltip>
      <base-tooltip title="Toggle table header column">
        <base-button class="inline-flex space-x-2 items-center" @click="toggleHeaderColumn">
          <i class="w-4 h-4 i-ri-layout-left-line"></i>
        </base-button>
      </base-tooltip>
      <base-tooltip title="Delete this table">
        <base-button class="inline-flex space-x-2 items-center" @click="onDeleteTable">
          <i class="w-4 h-4 i-ri-delete-bin-line text-red-500"></i>
        </base-button>
      </base-tooltip>
    </toolbar-wrapper>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/core'
import type { EditorState } from 'prosemirror-state'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'
import BaseTooltip from '@/components/base-tooltip.vue'
import { Table } from '@/extensions'
import { isTableSelected } from '@/extensions/table/utils.ts'
import BaseButton from '@/components/base-button.vue'

interface Props {
  editor: Editor
}

defineOptions({
  name: 'TableMenu',
})

const props = defineProps<Props>()

const shouldShow = ({ state }: { state: EditorState }): boolean => {
  if (!state) return false

  return props.editor.isActive(Table.name) && isTableSelected(state.selection)
}

const onDeleteTable = () => {
  props.editor.commands.deleteTable()
}

const toggleHeaderRow = () => {
  props.editor.commands.toggleHeaderRow()
}
const toggleHeaderColumn = () => {
  props.editor.commands.toggleHeaderColumn()
}
</script>
