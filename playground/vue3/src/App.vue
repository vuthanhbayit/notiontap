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
import {
  ImageUpload,
  ImageBlock,
  Figure,
  Figcaption,
  Bookmark,
  BookmarkInput,
  WebComponent,
  simpleExtensions,
} from '../../../src/extensions'
import { BookmarkAttribute } from '../../../src/extensions/bookmark'

const content = ref(
  '<p></p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/"><div data-type="imageBlock"><img src="https://media-api-staging.thinkpro.vn/media/core/products/2024/4/8/38-536x354.jpeg" data-width="100%" data-align="center" loading="lazy"></div></a></p><p></p><p></p>',
)

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
  ...simpleExtensions,

  ImageBlock,
  Figure,
  Figcaption,
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
  WebComponent,
]
</script>
