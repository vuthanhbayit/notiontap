import { defineCustomElement } from 'vue'
import NotionTap from './notion-tap.vue'
import tailwindCss from './assets/tailwind.css'
import draggableCss from './assets/draggable.css'
import tableCss from './assets/table.css'
import taskListCss from './assets/task-list.css'
import columnCss from './assets/column.css'
import uploadImageCss from './assets/upload-image.css'

NotionTap.styles = [tailwindCss, draggableCss, tableCss, taskListCss, columnCss, uploadImageCss]

const NotionTapConstructor = defineCustomElement(NotionTap)

const register = () => {
  customElements.define('notion-tap', NotionTapConstructor)
}

export { NotionTap, register }
export * from './extensions'
