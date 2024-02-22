<template>
  <surface
    with-border
    class="px-1 inline-flex h-full leading-none gap-0.5"
    :class="isVertical ? 'flex-col items-stretch p-2' : 'flex-row p-1 items-center'"
  >
    <slot></slot>
  </surface>
</template>

<script lang="ts" setup>
import Surface from '@/components/surface.vue'

interface Props {
  isVertical?: boolean
}

withDefaults(defineProps<Props>(), {
  isVertical: false,
})
</script>
