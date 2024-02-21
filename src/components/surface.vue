<template>
  <div
    :class="{ 'shadow-sm': withShadow, 'border border-neutral-200': withBorder }"
    class="inline-flex bg-white rounded-lg border border-neutral-200"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  withShadow?: boolean
  withBorder?: boolean
}

defineProps<Props>()
</script>
