<template>
  <node-view-wrapper>
    <figcaption
      ref="target"
      :class="{ [extension.options.emptyNodeClass]: isEmpty }"
      :placeholder="extension.options.placeholder"
      v-bind="extension.options.HTMLAttributes"
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
    HTMLAttributes: any
  }>
>()

const isEmpty = computed(() => props.node.content.size === 0)
</script>
