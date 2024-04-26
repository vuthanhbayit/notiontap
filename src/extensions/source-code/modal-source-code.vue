<template>
  <base-modal v-model="visible" title="Source code">
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
  </base-modal>
</template>

<script lang="ts" setup>
import type { Editor } from '@tiptap/core'
import { computed, ref, watch } from 'vue'
import BaseModal from '@/components/base-modal.vue'

interface Props {
  editor: Editor
}

defineOptions({
  name: 'ModalSourceCode',
})

const props = defineProps<Props>()

const visible = computed({
  get() {
    return props.editor.extensionStorage.sourceCode.visibleSourceCode
  },
  set(val) {
    // eslint-disable-next-line vue/no-mutating-props
    props.editor.extensionStorage.sourceCode.visibleSourceCode = val
  },
})

const modelValue = ref(props.editor.getHTML())

watch(visible, () => {
  if (visible.value) {
    modelValue.value = props.editor.getHTML()
  }
})

const onUpdate = () => {
  props.editor.commands.setContent(modelValue.value, true)
  visible.value = false
}
</script>
