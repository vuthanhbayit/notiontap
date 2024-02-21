import { Link } from '@tiptap/extension-link'

export default Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
    }
  },
})
