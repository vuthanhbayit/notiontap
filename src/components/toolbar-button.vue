<template>
  <base-tooltip :shortcuts="shortcuts" :title="title">
    <button
      :class="{ 'bg-black text-white hover:bg-black hover:text-white': isActive }"
      :disabled="disabled"
      class="flex group items-center justify-center text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap text-neutral-500 hover:bg-black/5 hover:text-neutral-700 w-8 h-8 gap-1 min-w-[2rem] px-2"
      @click="command && command()"
    >
      <i :class="icon" class="w-4 h-4"></i>
    </button>
  </base-tooltip>
</template>

<script lang="ts" setup>
import BaseTooltip from '@/components/base-tooltip.vue'

interface Props {
  title: string
  icon: string
  shortcuts?: string[]
  command?: () => void
  isActive?: boolean
  disabled?: boolean
}

defineProps<Props>()
</script>
