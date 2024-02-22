<template>
  <component
    :is="tag"
    class="cursor-pointer flex group items-center border text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap bg-transparent border-transparent text-neutral-500 hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 h-8 gap-1 min-w-[2rem] px-2 w-auto"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
interface Props {
  tag?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'button',
  disabled: false,
})
</script>
