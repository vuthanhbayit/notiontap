<template>
  <node-view-wrapper>
    <input ref="inputRef" data-max-file-size="1MB" type="file" />
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { create, registerPlugin } from 'filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor'

import {
  openEditor,
  createDefaultImageReader,
  createDefaultImageWriter,
  processImage,
  getEditorDefaults,
} from '@vt7/pintura'
import { NodeViewProps } from '@/types'

import { ImageUploadOptions } from '@/extensions/image-upload/types'
import { isFunction, isObject } from '@vt7/utils'

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImageEditor,
  FilePondPluginFilePoster,
)

const props = defineProps<NodeViewProps<ImageUploadOptions>>()

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inputRef.value) {
    const { filepondOptions, onUploaded } = props.extension.options

    const onLoadProcess = (response: string) => {
      onUploaded(response, onSetImage)
    }

    if (isObject(filepondOptions.server) && isObject(filepondOptions.server.process)) {
      filepondOptions.server.process.onload = onLoadProcess
    }

    create(inputRef.value, {
      credits: false,
      allowReorder: true,
      filePosterMaxHeight: 256,
      imageEditor: {
        createEditor: openEditor,
        imageReader: [createDefaultImageReader],
        imageWriter: [createDefaultImageWriter, { targetSize: {} }],
        imageProcessor: processImage,
        editorOptions: getEditorDefaults({}),
      },
      ...filepondOptions,
    })
  }
})

const onSetImage = (url: string) => {
  if (url) {
    props.editor
      .chain()
      .setImageBlock({ src: url, loading: 'lazy' })
      .deleteRange({ from: props.getPos(), to: props.getPos() })
      .focus()
      .run()
  }
}
</script>
