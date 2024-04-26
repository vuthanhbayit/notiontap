<template>
  <node-view-wrapper>
    <div class="rounded border p-4">
      <input type="text" />
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { NodeViewWrapper } from '@tiptap/vue-3'

import { NodeViewProps } from '@/types'

const props = defineProps<NodeViewProps>()

const onSetImage = (url: string) => {
  if (url) {
    props.editor
      .chain()
      .setImageBlock({ src: url, loading: 'lazy' })
      .deleteRange({ from: props.getPos(), to: props.getPos() })
      .focus()
      .run()
  }
}
</script>
