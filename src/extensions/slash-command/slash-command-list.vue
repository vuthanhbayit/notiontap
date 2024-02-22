<template>
  <div
    v-if="items.length > 0"
    ref="commandListContainer"
    class="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
  >
    <div class="flex flex-col space-y-4">
      <div v-for="(items, key) in groupByItems" :key="key">
        <div class="px-1">
          <span class="text-xs text-stone-500 font-semibold capitalize">{{ key }}</span>
        </div>

        <div class="mt-1 flex flex-col space-y-1">
          <button
            v-for="item in items"
            :id="'slash-command-' + item.index"
            :key="item.index"
            :class="item.index === selectedIndex ? 'bg-stone-100 text-stone-900' : ''"
            class="flex items-center w-full px-2 py-1 space-x-2 text-sm text-left rounded-md text-stone-900 hover:bg-stone-100"
            @click="selectItem(item)"
          >
            <span class="flex items-center justify-center w-6 h-6 bg-white border rounded-md border-stone-200">
              <i :class="item.icon" class="w-4 h-4"></i>
            </span>

            <span class="font-medium">{{ item.title }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref, watch } from 'vue'
import { Editor, Range } from '@tiptap/core'
import { groupBy } from '@vt7/utils'
import type { SuggestionItem } from './types'

const props = defineProps({
  items: {
    type: Array as PropType<SuggestionItem[]>,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
  range: {
    type: Object as PropType<Range>,
    required: true,
  },
})

const selectedIndex = ref(0)
const commandListContainer = ref<HTMLDivElement>()

const groupByItems = computed(() => {
  const _group = groupBy(props.items, item => item.group)

  let index = 0
  for (const key in _group) {
    if (Object.prototype.hasOwnProperty.call(_group, key)) {
      const arr = _group[key]
      arr.forEach(item => {
        item.index = index++
      })
    }
  }

  return _group
})

const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
function onKeyDown(e: KeyboardEvent) {
  if (navigationKeys.includes(e.key)) {
    e.preventDefault()
    if (e.key === 'ArrowUp') {
      selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length
      scrollToSelected()
      return true
    }
    if (e.key === 'ArrowDown') {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length
      scrollToSelected()
      return true
    }
    if (e.key === 'Enter') {
      const _item = props.items?.find(item => item.index === selectedIndex.value)
      if (_item) {
        selectItem(_item)
        return true
      }
      return false
    }
    return false
  }
}

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0
  },
)

defineExpose({
  onKeyDown,
})

function selectItem(item: SuggestionItem) {
  if (item) {
    props.command(item)
  }
}

function updateScrollView(container: HTMLElement, item: HTMLElement) {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0

  const top = item.offsetTop
  const bottom = top + itemHeight

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5
  }
}

function scrollToSelected() {
  const container = commandListContainer.value
  const item = container?.querySelector('#slash-command-' + selectedIndex.value) as HTMLElement

  if (container && item) {
    updateScrollView(container, item)
  }
}
</script>
