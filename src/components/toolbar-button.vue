<template>
  <base-tooltip :shortcuts="shortcuts" :title="title">
    <button
      :class="{ 'is-active': isActive }"
      :disabled="disabled"
      class="toolbar-button"
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

<style lang="postcss">
.toolbar-button {
  @apply flex items-center justify-center;
  @apply text-sm font-semibold rounded-md whitespace-nowrap;
  @apply disabled:opacity-50;
  @apply text-neutral-500 hover:bg-black/5 hover:text-neutral-700;
  @apply w-8 h-8 gap-1 min-w-[2rem] px-2;
}

.toolbar-button.is-active {
  @apply bg-black text-white hover:bg-black hover:text-white;
}
</style>
