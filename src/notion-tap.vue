<template>
  <div ref="notionTapRef" class="notion-tap">
    <editor-content v-if="editor" :editor="editor" class="notion-tap__content"></editor-content>

    <text-menu v-if="editor" :editor="editor"></text-menu>
    <link-menu v-if="editor" :editor="editor"></link-menu>

    <table-menu v-if="editor" :editor="editor"></table-menu>
    <table-column-menu v-if="editor" :editor="editor"></table-column-menu>
    <table-row-menu v-if="editor" :editor="editor"></table-row-menu>
    <columns-menu v-if="editor" :editor="editor"></columns-menu>
    <search-and-replace v-if="editor" :editor="editor" :target="notionTapRef"></search-and-replace>

    <modal-source-code v-if="editor" :editor="editor"></modal-source-code>

    <slot name="append" v-bind="{ editor }"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import type { Extensions } from '@tiptap/core'
import TextMenu from '@/menus/text-menu/index.vue'
import LinkMenu from '@/menus/link-menu/index.vue'
import TableMenu from '@/menus/table/index.vue'
import TableColumnMenu from '@/menus/table-column/index.vue'
import TableRowMenu from '@/menus/table-row/index.vue'
import ColumnsMenu from '@/menus/columns-menu/index.vue'
import SearchAndReplace from '@/menus/search-and-replace/index.vue'
import ModalSourceCode from '@/extensions/source-code/modal-source-code.vue'
import { fixInlineImage } from '@/utils'

interface Props {
  extensions?: Extensions
}

const props = withDefaults(defineProps<Props>(), {
  extensions: [],
})

const modelValue = defineModel<string>({
  required: true,
  get(value) {
    try {
      return fixInlineImage(value)
    } catch (e) {
      console.error('fixInlineImage', e)

      return value
    }
  },
})

const editor = useEditor({
  content: modelValue.value,

  extensions: props.extensions,

  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML()
  },

  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
})

const notionTapRef = ref<HTMLElement | null>(null)

defineExpose({
  editor,
})
</script>
