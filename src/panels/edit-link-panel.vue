<template>
  <surface class="p-1" with-border>
    <form class="flex flex-col px-2 py-1" @submit.prevent="handleSubmit">
      <div class="flex items-center space-x-2">
        <label class="flex-1 flex items-center gap-2 p-2 rounded-lg bg-neutral-100 cursor-text">
          <i class="w-4 h-4 i-ri-link"></i>

          <input
            v-model="state.url"
            class="flex-1 bg-transparent outline-none min-w-[12rem] text-black text-sm"
            placeholder="Enter URL"
            type="url"
          />
        </label>

        <base-button :disabled="!isValidUrl" type="submit">Set Link</base-button>
      </div>

      <div class="mt-4 flex items-center space-x-2">
        <span class="text-sm">Open in new tab</span>

        <Switch
          v-model="state.inNewTab"
          :class="state.inNewTab ? 'bg-neutral-900' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 items-center rounded-full"
        >
          <span
            :class="state.inNewTab ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition"
          />
        </Switch>
      </div>

      <div class="mt-4 flex space-x-2">
        <div v-for="item in rels" :key="item.id" class="flex items-center mb-4">
          <input
            :id="'rel-' + item.id"
            v-model="state.rel"
            :value="item.id"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded outline-0"
            type="checkbox"
          />
          <label :for="'rel-' + item.id" class="ms-2 text-sm text-gray-900">
            {{ item.name }}
          </label>
        </div>
      </div>
    </form>
  </surface>
</template>

<script lang="ts" setup>
import { Switch } from '@headlessui/vue'
import { computed, reactive } from 'vue'

import Surface from '@/components/surface.vue'
import BaseButton from '@/components/base-button.vue'

interface Props {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  initialRel?: string
  onSetLink: (state: { url: string; inNewTab: boolean }) => void
}

const props = withDefaults(defineProps<Props>(), {
  initialUrl: '',
  initialOpenInNewTab: false,
  initialRel: '',
})

const emit = defineEmits(['on-set-link'])

const state = reactive({
  url: props.initialUrl,
  inNewTab: props.initialOpenInNewTab,
  rel: props.initialRel.split(' '),
})

const rels = [
  { name: 'NoFollow', id: 'nofollow' },
  { name: 'NoOpener', id: 'noopener' },
  { name: 'NoReferrer', id: 'noreferrer' },
]

const REGEX_VALID_URL = /^(\S+):(\/\/)?\S+$/
const isValidUrl = computed(() => REGEX_VALID_URL.test(state.url))

const handleSubmit = () => {
  if (isValidUrl.value) {
    props.onSetLink(state)
  }
}
</script>
