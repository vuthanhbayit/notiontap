<template>
  <menu-wrapper as="div" class="relative inline-block text-left">
    <base-tooltip title="Text color">
      <menu-button class="toolbar-button w-auto">
        <i class="w-4 h-4 i-ri-font-color"></i>

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
        class="absolute right-0 mt-2 py-1 w-56 max-h-72 overflow-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <template v-for="option in options">
          <div v-if="option.type === 'category'" :key="option.id" class="my-2 first:mt-0">
            <span class="text-[.65rem] font-semibold uppercase text-neutral-500 px-1.5">
              {{ option.label }}
            </span>
          </div>

          <div v-else :key="option.label" class="px-1 py-0.5">
            <menu-item v-slot="{ active }">
              <button
                :class="{
                  'bg-neutral-100': active,
                  'bg-neutral-100 font-bold':
                    (currentColor === option.color && option.type === 'color') ||
                    (currentBackground === option.color && option.type === 'backgroundColor'),
                }"
                class="group flex w-full items-center space-x-2 rounded-md p-2 text-neutral-900"
                @click="onSelectOption(option)"
              >
                <span
                  :style="{ [option.type === 'color' ? 'color' : 'background']: option.color }"
                  class="w-5 h-5 flex items-center justify-center border rounded"
                >
                  <i class="w-4 h-4 i-ri-font-color"></i>
                </span>

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
import BaseTooltip from '@/components/base-tooltip.vue'

interface Color {
  type: 'color' | 'backgroundColor'
  label: string
  color: string
}

interface Category {
  type: 'category'
  label: string
  id: string
}

interface Props {
  currentColor?: string
  currentBackground?: string
  onSetColor: (color: string) => void
  onSetBackground: (color: string) => void
}

const props = defineProps<Props>()

const options = computed(() => {
  return [
    { type: 'category', label: 'Color', id: 'color' },
    { type: 'color', label: 'Default', color: '' },
    { type: 'color', label: 'Gray', color: 'rgba(120, 119, 116, 1)' },
    { type: 'color', label: 'Brown', color: 'rgba(159, 107, 83, 1)' },
    { type: 'color', label: 'Orange', color: 'rgba(217, 115, 13, 1)' },
    { type: 'color', label: 'Yellow', color: 'rgba(203, 145, 47, 1)' },
    { type: 'color', label: 'Green', color: 'rgba(68, 131, 97, 1)' },
    { type: 'color', label: 'Blue', color: 'rgba(51, 126, 169, 1)' },
    { type: 'color', label: 'Purple', color: 'rgba(144, 101, 176, 1)' },
    { type: 'color', label: 'Pink', color: 'rgba(193, 76, 138, 1)' },
    { type: 'color', label: 'Red', color: 'rgba(212, 76, 71, 1)' },
    { type: 'category', label: 'Background color', id: 'backgroundColor' },
    { type: 'backgroundColor', label: 'Default background', color: '' },
    { type: 'backgroundColor', label: 'Gray background', color: 'rgb(241, 241, 239)' },
    { type: 'backgroundColor', label: 'Brown background', color: 'rgb(244, 238, 238)' },
    { type: 'backgroundColor', label: 'Orange background', color: 'rgb(251, 236, 221)' },
    { type: 'backgroundColor', label: 'Yellow background', color: 'rgb(251, 243, 219)' },
    { type: 'backgroundColor', label: 'Green background', color: 'rgb(237, 243, 236)' },
    { type: 'backgroundColor', label: 'Blue background', color: 'rgb(231, 243, 248)' },
    { type: 'backgroundColor', label: 'Purple background', color: 'rgba(244, 240, 247, 0.8)' },
    { type: 'backgroundColor', label: 'Pink background', color: 'rgba(249, 238, 243, 0.8)' },
    { type: 'backgroundColor', label: 'Red background', color: 'rgb(253, 235, 236)' },
  ] as Array<Color | Category>
})

const onSelectOption = (option: Color) => {
  if (option.type === 'color') {
    return props.onSetColor(option.color)
  }

  return props.onSetBackground(option.color)
}
</script>
