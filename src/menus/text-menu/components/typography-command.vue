<template>
  <menu-wrapper as="div" class="relative inline-block text-left">
    <base-tooltip title="Turn into">
      <menu-button
        class="flex items-center justify-center text-sm font-semibold rounded-md whitespace-nowrap disabled:opacity-50 text-neutral-500 hover:bg-black/5 hover:text-neutral-700 h-8 gap-1 min-w-[2rem] px-2 w-auto"
      >
        <span class="text-sm font-medium">
          <span v-if="activatedOption">{{ activatedOption.label }}</span>
          <span v-else>Text</span>
        </span>

        <i class="w-4 h-4 i-ri-arrow-drop-down-line"></i>
      </menu-button>
    </base-tooltip>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <menu-items
        class="absolute right-0 mt-2 py-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <template v-for="option in options">
          <div v-if="option.type === 'category'" :key="option.id" class="my-2 first:mt-0">
            <span class="text-[.65rem] font-semibold uppercase text-neutral-500 px-1.5">
              {{ option.label }}
            </span>
          </div>

          <div v-if="option.type === 'option'" :key="option.id" class="px-1 py-0.5">
            <menu-item v-slot="{ active }">
              <button
                :class="{
                  'bg-neutral-100': active,
                  'bg-neutral-100 font-bold': activatedOption && activatedOption.id === option.id,
                }"
                class="group flex w-full items-center space-x-2 rounded-md p-2 text-neutral-900"
                @click="option.onClick"
              >
                <i :class="option.icon" class="w-4 h-4"></i>

                <span class="text-sm">
                  {{ option.label }}
                </span>
              </button>
            </menu-item>
          </div>
        </template>
      </menu-items>
    </transition>
  </menu-wrapper>
</template>

<script lang="ts" setup>
import { Menu as MenuWrapper, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { computed } from 'vue'
import type { TypographyOptions } from '../types'
import BaseTooltip from '@/components/base-tooltip.vue'

interface Props {
  options: TypographyOptions
}

const props = defineProps<Props>()

const activatedOption = computed(() => {
  return props.options.find(option => option.type === 'option' && option.isActive())
})
</script>
