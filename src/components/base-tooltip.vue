<template>
  <tippy>
    <slot></slot>

    <template #content>
      <toolbar-wrapper>
        <div class="inline-flex items-center space-x-1">
          <span class="text-xs">{{ title }}</span>

          <template v-if="shortcuts && shortcuts.length">
            <base-kbd v-for="(shortcut, index) in shortcuts" :key="index" :shortcut="shortcut"></base-kbd>
          </template>
        </div>
      </toolbar-wrapper>
    </template>
  </tippy>
</template>

<script lang="ts" setup>
import { Tippy } from 'vue-tippy'
import BaseKbd from '@/components/base-kbd.vue'
import ToolbarWrapper from '@/components/toolbar-wrapper.vue'

interface Props {
  title: string
  shortcuts?: string[]
}

defineProps<Props>()
</script>
