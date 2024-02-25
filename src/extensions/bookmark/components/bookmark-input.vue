<template>
  <node-view-wrapper>
    <button
      :disabled="isFetching"
      class="rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 disabled:text-neutral-400 disabled:bg-neutral-50 disabled:hover:bg-neutral-50 px-6 py-4 flex items-center space-x-2 w-full"
      @click="onSetBookmark"
    >
      <template v-if="isFetching">
        <i class="w-6 h-6 i-ri-git-repository-line"></i>

        <span class="text-sm font-semibold">Fetching web bookmark ...</span>
      </template>

      <template v-else>
        <i class="w-6 h-6 i-ri-git-repository-line"></i>

        <span class="text-sm font-semibold">Add a web bookmark</span>
      </template>
    </button>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { NodeViewProps } from '@/types'
import { BookmarkInputOptions } from '../bookmark-input'
import { isValidUrl } from '@/extensions/bookmark/utils'

const props = defineProps<NodeViewProps<BookmarkInputOptions>>()

const { getLinkPreview } = props.extension.options

const isFetching = ref(false)
const onSetBookmark = async () => {
  const url = window.prompt('Input web bookmark')

  if (url && isValidUrl(url) && getLinkPreview) {
    isFetching.value = true

    const state = await getLinkPreview(url)

    if (state.src && state.title) {
      props.editor.chain().setBookmark(state).deleteRange({ from: props.getPos(), to: props.getPos() }).focus().run()
    }

    isFetching.value = false
  }
}
</script>
