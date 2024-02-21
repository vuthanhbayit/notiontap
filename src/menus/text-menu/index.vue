<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :should-show="states.shouldShow"
    :tippy-options="{ duration: 100 }"
    plugin-key="text-menu"
  >
    <toolbar-wrapper>
      <toolbar-button
        :command="commands.onBold"
        :is-active="states.isBold()"
        :shortcuts="['Mod', 'B']"
        icon="i-ri-bold"
        title="Bold"
      ></toolbar-button>
      <toolbar-button
        :command="commands.onItalic"
        :is-active="states.isItalic()"
        :shortcuts="['Mod', 'I']"
        icon="i-ri-italic"
        title="Italic"
      ></toolbar-button>
      <toolbar-button
        :command="commands.onUnderline"
        :is-active="states.isUnderline()"
        :shortcuts="['Mod', 'U']"
        icon="i-ri-underline"
        title="Underline"
      ></toolbar-button>
      <toolbar-button
        :command="commands.onStrike"
        :is-active="states.isStrike()"
        :shortcuts="['Mod', 'Shift', 'S']"
        icon="i-ri-strikethrough"
        title="Strikethrough"
      ></toolbar-button>
      <toolbar-button
        :command="commands.onCode"
        :is-active="states.isCode()"
        :shortcuts="['Mod', 'E']"
        icon="i-ri-code-line"
        title="Code"
      ></toolbar-button>
      <toolbar-button
        :command="commands.onCodeBlock"
        :is-active="states.isCodeBlock()"
        :shortcuts="['Mod', 'Alt', 'c']"
        icon="i-ri-code-box-line"
        title="Code Block"
      ></toolbar-button>
      <link-command :on-set-link="commands.onLink"></link-command>
    </toolbar-wrapper>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import type { Editor } from '@tiptap/core'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'
import ToolbarButton from '@/components/toolbar-button.vue'

import LinkCommand from './components/link-command.vue'
import { useStates, useCommands } from './composables'

interface Props {
  editor: Editor
}

const props = defineProps<Props>()

const states = useStates(props.editor)
const commands = useCommands(props.editor)
</script>
