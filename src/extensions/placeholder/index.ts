import TiptapPlaceholder from '@tiptap/extension-placeholder'

const Placeholder = TiptapPlaceholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === 'heading') {
      return 'What’s the title?'
    }

    return "Press '/' for commands"
  },
  includeChildren: true,
})

export default Placeholder
