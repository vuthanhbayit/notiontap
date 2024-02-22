<template>
  <div style="padding: 50px">
    <div class="flex">
      <notion-tap v-model="content" class="w-2/3"></notion-tap>
      <div class="w-1/3">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NotionTap from '../../../src/notion-tap.vue'

const content = ref('')
</script>
