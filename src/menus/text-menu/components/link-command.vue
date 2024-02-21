<template>
  <Popover class="relative">
    <PopoverButton
      class="flex group items-center justify-center text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap text-neutral-500 hover:bg-black/5 hover:text-neutral-700 w-8 h-8 gap-1 min-w-[2rem] px-2 outline-none"
    >
      <i class="w-4 h-4 i-ri-link"></i>
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute left-1/2 z-10 mt-3 max-w-md -translate-x-1/2 transform px-4 sm:px-0">
        <edit-link-panel :on-set-link="onSetLink"></edit-link-panel>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import EditLinkPanel from '@/panels/edit-link-panel.vue'

interface Props {
  onSetLink: (state: { url: string; inNewTab: boolean }) => void
}

defineProps<Props>()
</script>
