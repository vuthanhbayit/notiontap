<template>
  <div
    :class="
      horizontal
        ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
        : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0'
    "
    class="bg-neutral-200"
  ></div>
</template>

<script lang="ts" setup>
interface Props {
  horizontal?: boolean
}

defineProps<Props>()
</script>
