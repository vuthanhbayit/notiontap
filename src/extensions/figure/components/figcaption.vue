<template>
  <node-view-wrapper>
    <figcaption
      ref="target"
      :class="{ [extension.options.emptyNodeClass]: isEmpty }"
      :placeholder="extension.options.placeholder"
    >
      <node-view-content></node-view-content>
    </figcaption>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { NodeViewProps } from '@/types'

const props = defineProps<
  NodeViewProps<{
    placeholder: string
    emptyNodeClass: string
  }>
>()

const isEmpty = computed(() => props.node.content.size === 0)
</script>
