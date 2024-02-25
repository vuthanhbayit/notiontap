<template>
  <div style="padding: 50px">
    <div class="flex">
      <notion-tap v-model="content" :extensions="extensions" class="w-2/3"></notion-tap>
      <div class="w-1/3">{{ content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import NotionTap from '../../../src/notion-tap.vue'
import { Bookmark, BookmarkInput, ImageUpload } from '../../../src/extensions'
import { BookmarkAttribute } from '../../../src/extensions/bookmark'

const content = ref('')

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
