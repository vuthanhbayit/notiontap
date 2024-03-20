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
  '<div data-type="tableOfContents"><a href="#zeGrb" class="zeGrb" data-type="toc-anchor" data-level="1" data-origin-level="1" data-index="0">heading 1</a><a href="#hO9eZ" class="hO9eZ" data-type="toc-anchor" data-level="2" data-origin-level="3" data-index="1">heading 3</a><a href="#iy2A7" class="iy2A7" data-type="toc-anchor" data-level="2" data-origin-level="2" data-index="2">heading 2</a></div><h1 id="zeGrb" data-toc-id="zeGrb">heading 1</h1><h3 id="hO9eZ" data-toc-id="hO9eZ">heading 3</h3><h2 id="iy2A7" data-toc-id="iy2A7">heading 2</h2><p></p>',
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
