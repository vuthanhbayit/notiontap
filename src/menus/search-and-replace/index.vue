<template>
  <div v-if="shouldShow" class="search-and-replace">
    <div class="flex items-center">
      <div class="px-4 py-2 border-r border-neutral-300 relative">
        <input
          v-model="searchTerm"
          placeholder="Find in text ..."
          tabindex="1"
          type="text"
          @keydown.enter.prevent="next"
        />

        <div class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex">
          <base-tooltip title="Case sensitive">
            <button
              :class="{ 'bg-neutral-300 hover:bg-neutral-300': isCaseSensitive }"
              class="w-5 h-5 rounded outline-0 hover:bg-neutral-200"
              @click="isCaseSensitive = !isCaseSensitive"
            >
              <i class="w-4 h-4 i-ri-font-size"></i>
            </button>
          </base-tooltip>
        </div>
      </div>

      <div class="flex items-center space-x-2 px-4">
        <span class="text-xs text-neutral-800">
          <span v-if="store.results.length">{{ store.resultIndex + 1 }}/{{ store.results.length }}</span>
          <span v-else>{{ store.results.length }} results</span>
        </span>

        <button
          :class="{ 'hover:bg-neutral-200': store.results.length }"
          :disabled="!store.results.length"
          class="w-5 h-5 rounded outline-0 disabled:text-neutral-400"
          @click="previous"
        >
          <i class="w-4 h-4 i-ri-arrow-up-line"></i>
        </button>

        <button
          :class="{ 'hover:bg-neutral-200': store.results.length }"
          :disabled="!store.results.length"
          class="w-5 h-5 rounded outline-0 disabled:text-neutral-400"
          @click="next"
        >
          <i class="w-4 h-4 i-ri-arrow-down-line"></i>
        </button>
      </div>
    </div>

    <div v-if="isReplace" class="flex items-center">
      <div class="px-4 py-2 border-t border-r border-neutral-300">
        <input
          v-model="replaceTerm"
          placeholder="Replace with ..."
          tabindex="2"
          type="text"
          @keydown.enter.prevent="replace"
        />
      </div>

      <div class="flex items-center space-x-2 px-4">
        <button
          :class="{ 'hover:text-gray-900 hover:border-neutral-400': store.results.length }"
          :disabled="!store.results.length"
          class="px-1 py-0.5 rounded border border-neutral-200 inline-flex text-gray-800 disabled:text-gray-400"
          @click="replace"
        >
          <span class="text-sm">Replace</span>
        </button>

        <button
          :class="{ 'hover:text-gray-900 hover:border-neutral-400': store.results.length }"
          :disabled="!store.results.length"
          class="px-1 py-0.5 rounded border border-neutral-200 inline-flex text-gray-800 disabled:text-gray-400"
          @click="replaceAll"
        >
          <span class="text-sm">Replace all</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Editor, isMacOS } from '@tiptap/core'
import { onKeyStroke } from '@vueuse/core'
import BaseTooltip from '@/components/base-tooltip.vue'
import { SearchAndReplaceStorage } from '@/extensions/search-and-replace/types.ts'

interface Props {
  editor: Editor
  target: HTMLElement
}

defineOptions({
  name: 'SearchAndReplace',
})

const props = defineProps<Props>()

const isFind = ref(false)
const isReplace = ref(false)
const isCaseSensitive = ref(false)

const store = computed(() => props.editor.extensionStorage.searchAndReplace as SearchAndReplaceStorage)

const searchTerm = computed({
  get() {
    return store.value.searchTerm
  },
  set(value) {
    props.editor.commands.resetIndex()
    props.editor.commands.setSearchTerm(value)
  },
})
const replaceTerm = computed({
  get() {
    return store.value.replaceTerm
  },
  set(value) {
    props.editor.commands.setReplaceTerm(value)
  },
})

watch(isCaseSensitive, value => {
  props.editor.commands.setCaseSensitive(value)
})

const clear = () => {
  searchTerm.value = replaceTerm.value = ''
  props.editor.commands.resetIndex()
}

const goToSelection = () => {
  const { results, resultIndex } = store.value
  const position = results[resultIndex]

  if (!position) return

  props.editor.commands.setTextSelection(position)

  const { node } = props.editor.view.domAtPos(props.editor.state.selection.anchor)
  node instanceof HTMLElement && node.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const next = () => {
  props.editor.commands.nextSearchResult()
  goToSelection()
}

const previous = () => {
  props.editor.commands.previousSearchResult()
  goToSelection()
}

const replace = () => {
  props.editor.commands.replace()

  if (store.value.resultIndex + 1 > store.value.results.length) {
    props.editor.commands.setIndex(store.value.results.length - 1)
  }

  goToSelection()
}

const replaceAll = () => {
  props.editor.commands.replaceAll()
}

const shouldShow = computed(() => isFind.value || isReplace.value || searchTerm.value)

watch(shouldShow, (newValue, oldValue) => {
  if (!oldValue && newValue) {
    setTimeout(onFocus)
  }
})

const onFocus = () => {
  const document = props.editor.view.root
  const inputRef = document.querySelector('.search-and-replace input') as HTMLInputElement

  inputRef.focus()
}

onMounted(() => {
  const KEY_F = 70
  const KEY_R = 82

  const _target = props.target

  if (!_target) return
  _target.onkeydown = function (event) {
    const meta = isMacOS() ? event.metaKey : event.ctrlKey

    if (meta && event.keyCode == KEY_F) {
      event.preventDefault()

      isFind.value = true
      isReplace.value = false
    }

    if (meta && event.keyCode == KEY_R) {
      event.preventDefault()

      isFind.value = true
      isReplace.value = true

      setTimeout(onFocus)
    }
  }
})

onKeyStroke(
  'Escape',
  e => {
    e.preventDefault()

    isFind.value = false
    isReplace.value = false
    clear()
  },
  {
    target: props.target,
  },
)
</script>
