<template>
  <node-view-wrapper>
    <div contenteditable="true" data-type="webComponent" @input="onInput">{{ content }}</div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { NodeViewProps } from '@/types'

const props = defineProps<NodeViewProps>()

const attrs = computed(() => props.node.attrs)
const content = ref(attrs.value.content)
const onInput = (e: InputEvent) => {
  const target = e.target as HTMLElement

  content.value = target ? target.textContent : ''

  props.updateAttributes({
    content: content.value,
  })
}
</script>
