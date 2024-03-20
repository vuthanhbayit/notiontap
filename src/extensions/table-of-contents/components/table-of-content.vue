<template>
  <node-view-wrapper>
    <div data-type="tableOfContents">
      <a
        v-for="content in contents"
        :id="content.id"
        :key="content.id"
        :href="`#${content.id}`"
        :style="{ 'margin-left': content.originalLevel * 16 + 'px' }"
      >
        {{ content.itemIndex + 1 }}. {{ content.textContent }}
      </a>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { NodeViewProps } from '@/types'
import { Options, Storage } from '../types.ts'

const props = defineProps<NodeViewProps<Options, Storage>>()

const contents = computed(() => props.extension.storage.contents)
</script>
