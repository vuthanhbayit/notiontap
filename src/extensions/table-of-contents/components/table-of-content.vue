<template>
  <node-view-wrapper>
    <div data-type="tableOfContents">
      <span class="text-xs">Table of contents</span>

      <template v-if="contents.length">
        <span
          v-for="content in contents"
          :id="content.id"
          :key="content.id"
          :style="{ 'margin-left': content.originalLevel * 16 + 'px' }"
          class="toc-anchor"
          @click="scrollTo(content)"
        >
          <span class="text-gray-600">{{ content.textContent }}</span>
        </span>
      </template>

      <span v-else class="italic text-sm">Add headings to create a table of contents</span>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { NodeViewProps } from '@/types'
import { Options, Storage, TocItem } from '../types.ts'

const props = defineProps<NodeViewProps<Options, Storage>>()

const contents = computed(() => props.extension.storage.contents)

const scrollTo = (content: TocItem) => {
  content.dom.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>
