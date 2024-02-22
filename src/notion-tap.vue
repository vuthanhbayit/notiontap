<template>
  <div class="notion-tap">
    <editor-content v-if="editor" :editor="editor" class="notion-tap__content"></editor-content>
    <text-menu v-if="editor" :editor="editor"></text-menu>
    <link-menu v-if="editor" :editor="editor"></link-menu>

    <table-column-menu v-if="editor" :editor="editor"></table-column-menu>
    <table-row-menu v-if="editor" :editor="editor"></table-row-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { simpleExtensions } from '@/extensions'
import TextMenu from '@/menus/text-menu/index.vue'
import LinkMenu from '@/menus/link-menu/index.vue'
import TableColumnMenu from '@/menus/table-column/index.vue'
import TableRowMenu from '@/menus/table-row/index.vue'

const modelValue = defineModel<string>({ required: true })

const editor = ref<Editor>()

onMounted(() => {
  editor.value = new Editor({
    content: modelValue.value,

    extensions: [...simpleExtensions],

    onUpdate: ({ editor }) => {
      modelValue.value = editor.getHTML()
    },

    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })
})

onUnmounted(() => {
  if (editor.value) {
    editor.value?.destroy()
  }
})
</script>
