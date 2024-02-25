<template>
  <node-view-wrapper>
    <div class="notiontap-bookmark not-prose" data-type="bookmark">
      <div>
        <div class="notiontap-bookmark__item">
          <div class="notiontap-bookmark__title">{{ attrs.title }}</div>
          <div class="notiontap-bookmark__desc">
            {{ attrs.description }}
          </div>

          <div class="notiontap-bookmark__url-wrapper">
            <div class="notiontap-bookmark__favicon-wrapper">
              <i v-if="isFetching" class="w-4 h-4 i-ri-restart-line animate-spin"></i>
              <img v-else :src="attrs.favicon" class="notiontap-bookmark__favicon" loading="lazy" />
            </div>

            <div class="notiontap-bookmark__src" :contenteditable="isFetching ? 'false' : 'true'" @input="onInput">
              {{ url }}
            </div>
          </div>
        </div>

        <div v-if="attrs.img" class="notiontap-bookmark__item">
          <img :src="attrs.img" class="notiontap-bookmark__img" loading="lazy" />
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { NodeViewWrapper } from '@tiptap/vue-3'
import { NodeViewProps } from '@/types'
import { BookmarkInputOptions } from '../bookmark-input'
import { computed, ref, watch } from 'vue'
import { Input } from 'postcss'
import { debouncedWatch } from '@vueuse/core'
import { isValidUrl } from '@/extensions/bookmark/utils'

const props = defineProps<NodeViewProps<BookmarkInputOptions>>()

const BookmarkInputExtension = props.editor.extensionManager.extensions.find(
  extension => extension.name === 'bookmarkInput',
)
const getLinkPreview = BookmarkInputExtension ? BookmarkInputExtension.options.getLinkPreview : null

const attrs = computed(() => props.node.attrs)
const isFetching = ref(false)
const url = ref(attrs.value.src)
const onInput = (e: InputEvent) => {
  const target = e.target as HTMLElement

  url.value = target ? target.textContent : ''
}

debouncedWatch(
  url,
  async value => {
    if (getLinkPreview && value && isValidUrl(value)) {
      try {
        isFetching.value = true

        const state = await getLinkPreview(value)

        if (state.src && state.title) {
          props.updateAttributes(state)
        }
      } catch (e) {
        console.log('getLinkPreview', { e })
      } finally {
        isFetching.value = false
      }
    }
  },
  {
    debounce() {
      return 300
    },
  },
)
</script>
