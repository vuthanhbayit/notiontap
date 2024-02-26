<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :should-show="shouldShow"
    :tippy-options="{
      duration: 100,
      plugins: [sticky],
      sticky: 'popper',
      getReferenceClientRect,
    }"
    plugin-key="columns-menu"
  >
    <toolbar-wrapper>
      <toolbar-button
        v-for="(command, index) in commands"
        :key="index"
        :command="command.command"
        :icon="command.icon"
        :is-active="command.isActive()"
        :title="command.title"
      ></toolbar-button>
    </toolbar-wrapper>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import { computed } from 'vue'
import { sticky } from 'tippy.js'
import type { Editor } from '@tiptap/core'
import ToolbarButton from '@/components/toolbar-button.vue'
import { ColumnLayout } from '@/extensions/multi-column'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'
import getRenderContainer from '@/utils/getRenderContainer.ts'

interface Props {
  editor: Editor
}

defineOptions({
  name: 'ColumnsMenu',
})

const props = defineProps<Props>()

const shouldShow = () => {
  return props.editor.isActive('columns')
}

const getReferenceClientRect = () => {
  const renderContainer = getRenderContainer(props.editor, 'columns')
  return renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
}

const commands = computed(() => [
  {
    command: () => props.editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run(),
    isActive: () => props.editor.isActive('columns', { layout: ColumnLayout.SidebarRight }),
    icon: 'i-ri-layout-right-line',
    title: 'Sidebar left',
  },
  {
    command: () => props.editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run(),
    isActive: () => props.editor.isActive('columns', { layout: ColumnLayout.TwoColumn }),
    icon: 'i-ri-layout-column-line',
    title: 'Two columns',
  },
  {
    command: () => props.editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run(),
    isActive: () => props.editor.isActive('columns', { layout: ColumnLayout.SidebarLeft }),
    icon: 'i-ri-layout-left-line',
    title: 'Sidebar right',
  },
])
</script>
