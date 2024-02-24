<template>
  <div style="padding: 50px">
    <div class="flex">
      <notion-tap v-model="content" :extensions="extensions" class="w-2/3"></notion-tap>
      <div class="w-1/3">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NotionTap from '../../../src/notion-tap.vue'
import { ImageUpload } from '../../../src/extensions'

const content = ref('')

const extensions = [
  ImageUpload.configure({
    filepondOptions: {
      name: 'file',
      instantUpload: false,
      server: {
        url: 'https://media-api-staging.thinkpro.vn',
        timeout: 7000,
        process: {
          url: '/v3/upload',
          method: 'POST',
          withCredentials: false,
          ondata: formData => {
            formData.append('folder', 'core/products')
            return formData
          },
        },
      },
    },
    onUploaded(response, onSetImage) {
      onSetImage('https://media-api-staging.thinkpro.vn/' + JSON.parse(response).data)
    },
  }),
]
</script>
