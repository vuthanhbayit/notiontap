<template>
  <div style="padding: 50px">
    <notion-tap v-model="content"></notion-tap>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NotionTap from '../../../src/notion-tap.vue'

const content = ref('')
</script>
