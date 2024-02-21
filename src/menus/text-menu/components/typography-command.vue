<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="toolbar-button w-auto">
        <span class="text-sm font-medium">
          <span v-if="activatedOption">{{ activatedOption.label }}</span>
          <span v-else>Text</span>
        </span>

        <i class="w-4 h-4 i-ri-arrow-drop-down-line"></i>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 py-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <template v-for="option in options">
          <div v-if="option.type === 'category'" :key="option.id" class="my-2 first:mt-0">
            <span class="text-[.65rem] font-semibold uppercase text-neutral-500 dark:text-neutral-400 px-1.5">
              {{ option.label }}
            </span>
          </div>

          <div v-if="option.type === 'option'" :key="option.id" class="px-1 py-0.5">
            <MenuItem v-slot="{ active }">
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
            </MenuItem>
          </div>
        </template>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import type { TypographyOptions } from '../types'
import { computed } from 'vue'

interface Props {
  options: TypographyOptions
}

const props = defineProps<Props>()

const activatedOption = computed(() => {
  return props.options.find(option => option.type === 'option' && option.isActive())
})
</script>
