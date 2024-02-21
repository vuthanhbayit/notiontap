import { defineCustomElement } from 'vue'
import NotionTap from './notion-tap.vue'
import tailwindCss from './assets/tailwind.css'

NotionTap.styles = [tailwindCss]

const NotionTapConstructor = defineCustomElement(NotionTap)

const register = () => {
  customElements.define('notion-tap', NotionTapConstructor)
}

export { NotionTap, register }
