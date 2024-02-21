<template>
  <div :class="{ 'shadow-sm': withShadow, 'border border-neutral-200': withBorder }" class="bg-white rounded-lg">
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
