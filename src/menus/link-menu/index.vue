<template>
  <bubble-menu
    v-if="editor"
    :editor="editor"
    :should-show="shouldShow"
    :tippy-options="{ duration: 100 }"
    plugin-key="link-menu"
  >
    <edit-link-panel
      v-if="showEdit"
      :initial-open-in-new-tab="state.target === '_blank'"
      :initial-url="state.link"
      :on-set-link="onSetLink"
    ></edit-link-panel>
    <preview-link-panel
      v-else-if="state.link"
      :url="state.link"
      @on-clear="onUnsetLink"
      @on-edit="handleEdit"
    ></preview-link-panel>
  </bubble-menu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import { computed, reactive, ref } from 'vue'
import type { Editor } from '@tiptap/core'
import PreviewLinkPanel from '@/panels/preview-link-panel.vue'
import EditLinkPanel from '@/panels/edit-link-panel.vue'

interface Props {
  editor: Editor
}

const props = defineProps<Props>()

const showEdit = ref(false)

const shouldShow = () => {
  return props.editor.isActive('link')
}

const state = computed(() => {
  const { href, target } = props.editor.getAttributes('link')

  return {
    link: href,
    target,
  }
})

const onUnsetLink = () => {
  props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
  showEdit.value = false
}

const handleEdit = () => {
  showEdit.value = true
}

const onSetLink = (state: { url: string; inNewTab: boolean }) => {
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: state.url, target: state.inNewTab ? '_blank' : '' })
    .run()
  showEdit.value = false
}
</script>
