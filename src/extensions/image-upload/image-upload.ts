import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageUploadComponent from './components/image-upload.vue'
import type { CommandProps } from '@/extensions/slash-command/types.ts'
import { ImageUploadOptions } from '@/extensions/image-upload/types'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType
    }
  }
}

export const ImageUpload = Node.create<ImageUploadOptions, any>({
  name: 'imageUpload',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  inline: false,

  addOptions() {
    return {
      suggestion: {
        items: [
          {
            title: 'Upload image',
            searchTerms: ['upload', 'image'],
            icon: 'i-ri-image-line',
            group: 'insert',
            command: ({ editor, range }: CommandProps) => {
              editor.chain().focus().deleteRange(range).setImageUpload().run()
            },
          },
        ],
      },
      filepondOptions: {},
      onUploaded(url, onSetImage) {
        onSetImage(url)
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ]
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }]
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ commands }) =>
          commands.insertContent(`<div data-type="${this.name}"></div>`),
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageUploadComponent)
  },
})
