<template>
  <TransitionRoot :show="visible" appear as="template">
    <Dialog as="div" class="relative z-10" @close="onClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Source code</DialogTitle>

              <div class="mt-6">
                <textarea v-model="modelValue" class="border rounded w-full" cols="30" rows="10"></textarea>
              </div>

              <div class="mt-6">
                <button
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  type="button"
                  @click="onUpdate"
                >
                  Update
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import type { Editor } from '@tiptap/core'
import { computed, ref, watch } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

interface Props {
  editor: Editor
}

defineOptions({
  name: 'ModalSourceCode',
})

const props = defineProps<Props>()

const visible = computed(() => props.editor.extensionStorage.sourceCode.visibleSourceCode)

const modelValue = ref(props.editor.getHTML())

watch(visible, () => {
  if (visible.value) {
    modelValue.value = props.editor.getHTML()
  }
})

const onClose = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.editor.extensionStorage.sourceCode.visibleSourceCode = false
}

const onUpdate = () => {
  props.editor.commands.setContent(modelValue.value, true)
  onClose()
}
</script>
