<template>
  <surface class="px-2 py-1" with-border>
    <div class="flex items-center space-x-2">
      <a :href="url" class="text-sm underline" target="_blank">
        {{ url }}
      </a>

      <toolbar-divider></toolbar-divider>

      <toolbar-button icon="i-ri-pencil-line" title="Edit link" @click="$emit('onEdit')"></toolbar-button>

      <toolbar-button icon="i-ri-link-unlink" title="Remove link" @click="$emit('onClear')"></toolbar-button>
    </div>
  </surface>
</template>

<script lang="ts" setup>
import Surface from '@/components/surface.vue'
import ToolbarDivider from '@/components/toolbar-divider.vue'
import ToolbarButton from '@/components/toolbar-button.vue'

interface Props {
  url: string
}

defineProps<Props>()

defineEmits(['onClear', 'onEdit'])
</script>
