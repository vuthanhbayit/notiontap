<template>
  <base-tooltip :shortcuts="shortcuts" :title="title">
    <button
      :class="{ 'bg-black text-white hover:bg-black hover:text-white': isActive }"
      :disabled="disabled"
      class="flex items-center justify-center text-sm font-semibold rounded-md whitespace-nowrap disabled:opacity-50 text-neutral-500 hover:bg-black/5 hover:text-neutral-700 w-8 h-8 gap-1 min-w-[2rem] px-2"
      @click="command && command()"
    >
      <i v-if="typeof icon === 'string'" :class="icon" class="w-4 h-4"></i>

      <component :is="icon" v-else class="w-4 h-4"></component>
    </button>
  </base-tooltip>
</template>

<script lang="ts" setup>
import BaseTooltip from '@/components/base-tooltip.vue'

interface Props {
  title: string
  icon: any
  shortcuts?: string[]
  command?: () => void
  isActive?: boolean
  disabled?: boolean
}

defineProps<Props>()
</script>
