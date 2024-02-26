<template>
  <div class="notion-tap">
    <editor-content v-if="editor" :editor="editor" class="notion-tap__content"></editor-content>

    <text-menu v-if="editor" :editor="editor"></text-menu>
    <link-menu v-if="editor" :editor="editor"></link-menu>

    <table-column-menu v-if="editor" :editor="editor"></table-column-menu>
    <table-row-menu v-if="editor" :editor="editor"></table-row-menu>
    <columns-menu v-if="editor" :editor="editor"></columns-menu>
    <search-and-replace v-if="editor" :editor="editor"></search-and-replace>
  </div>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import type { Extensions } from '@tiptap/core'
import { simpleExtensions } from '@/extensions'
import TextMenu from '@/menus/text-menu/index.vue'
import LinkMenu from '@/menus/link-menu/index.vue'
import TableColumnMenu from '@/menus/table-column/index.vue'
import TableRowMenu from '@/menus/table-row/index.vue'
import ColumnsMenu from '@/menus/columns-menu/index.vue'
import SearchAndReplace from '@/menus/search-and-replace/index.vue'

interface Props {
  extensions?: Extensions
}

const props = withDefaults(defineProps<Props>(), {
  extensions: [],
})

const modelValue = defineModel<string>({ required: true })

console.log('props.extensions', props.extensions)

const editor = useEditor({
  content: modelValue.value,

  extensions: [...simpleExtensions, ...props.extensions],

  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML()
  },

  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
})
</script>

<style>
.notion-tap {
  @apply relative;
}
</style>
