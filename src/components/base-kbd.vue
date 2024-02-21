<template>
  <kbd
    class="inline-flex items-center justify-center text-gray-900 h-5 min-w-[20px] text-[11px] px-1 rounded font-medium bg-gray-100 ring-1 ring-gray-300 ring-inset"
  >
    {{ children }}
  </kbd>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  shortcut: string
}

const props = defineProps<Props>()

const isMacOS = computed(() => window && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

const children = computed(() => {
  if (props.shortcut === 'Mod') {
    return isMacOS.value ? '⌘' : 'Ctrl'
  }

  if (props.shortcut === 'Shift') {
    return '⇧'
  }

  if (props.shortcut === 'Alt') {
    return isMacOS.value ? '⌥' : 'Alt'
  }

  return props.shortcut
})
</script>
