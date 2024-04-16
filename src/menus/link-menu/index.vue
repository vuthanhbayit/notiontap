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
      :key="state.link"
      :initial-open-in-new-tab="state.target === '_blank'"
      :initial-rel="state.rel"
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

defineOptions({
  name: 'LinkMenu',
})

const props = defineProps<Props>()

const showEdit = ref(false)

const shouldShow = () => {
  return props.editor.isActive('link')
}

const state = ref({
  link: '',
  target: '',
  rel: '',
})

props.editor.on('selectionUpdate', () => {
  if (props.editor.isActive('link')) {
    const { href, target, rel } = props.editor.getAttributes('link')

    state.value = {
      link: href,
      target,
      rel,
    }
  } else {
    showEdit.value = false
  }
})

const onUnsetLink = () => {
  props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
  showEdit.value = false
}

const handleEdit = () => {
  showEdit.value = true
}

const onSetLink = (state: { url: string; inNewTab: boolean; rel: string[] }) => {
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: state.url, target: state.inNewTab ? '_blank' : '', rel: state.rel.join(' ') })
    .run()
  showEdit.value = false
}
</script>
