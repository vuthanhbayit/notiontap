<template>
  <div
    :class="isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center'"
    class="inline-flex bg-white rounded-lg border border-neutral-200"
  >
    <div class="px-1 inline-flex h-full leading-none gap-0.5">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  isVertical?: boolean
}

withDefaults(defineProps<Props>(), {
  isVertical: false,
})
</script>
