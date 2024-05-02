<template>
  <node-view-wrapper>
    <div data-type="imageBlock">
      <img v-bind="node.attrs" />

      <div class="absolute bottom-3 right-3">
        <Popover class="relative">
          <PopoverButton class="rounded bg-gray-800 h-6 inline-flex items-center justify-center px-2" @click="onOpen">
            <span :class="altText ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">ALT</span>
          </PopoverButton>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <PopoverPanel class="absolute left-1/2 z-10 -translate-x-1/2 transform bg-white rounded border w-[300px]">
              <div class="not-prose p-4">
                <p class="text-xs text-gray-600">
                  Add alt text to describe this image. This makes your page more accessible to people who are
                  vision-impaired or blind
                </p>

                <div class="mt-2">
                  <textarea ref="inputRef" v-model="altText" class="border p-2 rounded text-xs w-full" type="text" />
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>

      <a class="add-caption-image" @click="onAddCaption">Add caption</a>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

import { NodeViewProps } from '@/types'

const props = defineProps<NodeViewProps>()

const visibleAlt = ref(false)
const altText = computed({
  get() {
    return props.node.attrs.alt
  },
  set(value) {
    props.updateAttributes({
      alt: value,
    })
  },
})

const inputRef = ref<HTMLTextAreaElement | null>(null)
const onOpen = () => {
  nextTick(() => {
    setTimeout(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  })
}

const onAddCaption = () => {
  props.editor.chain().focus().imageToFigure().run()
}
</script>
