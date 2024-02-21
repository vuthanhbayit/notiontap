<template>
  <div style="padding: 50px">
    <notion-tap :model-value="content" @update:modelValue="onUpdate"></notion-tap>

    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')

const onUpdate = (event: CustomEvent) => {
  content.value = event.detail[0]
}
</script>
