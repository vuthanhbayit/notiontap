<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :should-show="states.shouldShow"
    :tippy-options="{ duration: 100 }"
    plugin-key="text-menu"
  >
    <toolbar-wrapper>
      <typography-command :options="typographyOptions"></typography-command>

      <toolbar-button
        v-for="(command, index) in toolbarCommands"
        :key="index"
        :command="command.command"
        :icon="command.icon"
        :is-active="command.isActive()"
        :shortcuts="command.shortcuts"
        :title="command.title"
      ></toolbar-button>

      <link-command :on-set-link="commands.onLink"></link-command>

      <color-command
        :current-background="states.currentHighlight()"
        :current-color="states.currentColor()"
        :on-set-background="commands.onSetBackgroundColor"
        :on-set-color="commands.onSetColor"
      ></color-command>

      <toolbar-button
        :command="commands.onSetSearchAndReplace"
        :shortcuts="['Mod', 'F', '&', 'Mod', 'R']"
        icon="i-ri-search-line"
        title="Search and Replace"
      ></toolbar-button>
    </toolbar-wrapper>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/core'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'
import ToolbarButton from '@/components/toolbar-button.vue'

import LinkCommand from './components/link-command.vue'
import TypographyCommand from './components/typography-command.vue'
import ColorCommand from './components/color-command.vue'
import { useStates, useCommands, useTypographyConfig, useToolbarCommandConfig } from './composables'

interface Props {
  editor: Editor
}

defineOptions({
  name: 'TextMenu',
})

const props = defineProps<Props>()

const states = useStates(props.editor)
const commands = useCommands(props.editor)
const { typographyOptions } = useTypographyConfig(props.editor)
const { toolbarCommands } = useToolbarCommandConfig(props.editor)
</script>
