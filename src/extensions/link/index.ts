import { Link } from '@tiptap/extension-link'

export default Link.extend({
  textMenu: false,

  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
    }
  },
})
