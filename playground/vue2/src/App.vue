<template>
  <div style="padding: 50px">
    <notion-tap :extensions.prop="extensions" :model-value="content" @update:modelValue="onUpdate"></notion-tap>

    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Bookmark, BookmarkInput, BookmarkAttribute, ImageUpload, WebComponent } from '../../../'

const content = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')

const onUpdate = (event: CustomEvent) => {
  content.value = event.detail[0]
}

const loadUrlPreviewData = (url: string): Promise<BookmarkAttribute> => {
  return new Promise((resolve, reject) => {
    fetch('https://lpdg-server.azurewebsites.net/parse/link', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
      .catch(error => reject(error))
  })
}

const extensions = [
  WebComponent,

  BookmarkInput.configure({
    async getLinkPreview(url) {
      const state = await loadUrlPreviewData(url)

      return {
        ...state,
        src: url,
      }
    },
  }),
  Bookmark,

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
