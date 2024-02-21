<template>
  <surface :class="isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center'" with-border>
    <div class="px-1 inline-flex h-full leading-none gap-0.5">
      <slot></slot>
    </div>
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
