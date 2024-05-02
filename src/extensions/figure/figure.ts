import { findChildrenInRange, mergeAttributes, Node, nodeInputRule, Tracker } from '@tiptap/core'

export interface FigureOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: { src: string; alt?: string; caption?: string }) => ReturnType

      /**
       * Converts an image to a figure
       */
      imageToFigure: () => ReturnType
    }
  }
}

export const Figure = Node.create<FigureOptions>({
  name: 'figure',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  content: 'block figcaption',

  draggable: true,

  isolating: true,

  parseHTML() {
    return [{ tag: `figure[data-type="${this.name}"]` }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': this.name }), 0]
  },

  addCommands() {
    return {
      setFigure:
        ({ caption, ...attrs }) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              content: [
                {
                  type: 'imageBlock',
                  attrs: attrs,
                },
                {
                  type: 'figcaption',
                  content: [
                    {
                      type: 'paragraph',
                      content: caption ? [{ type: 'text', text: caption }] : [],
                    },
                  ],
                },
              ],
            })
            .command(({ tr, commands }) => {
              const { doc, selection } = tr
              const position = doc.resolve(selection.to - 2).end()

              return commands.setTextSelection(position)
            })
            .run()
        },
      imageToFigure:
        () =>
        ({ tr, commands }) => {
          const { doc, selection } = tr
          const { from, to } = selection
          const images = findChildrenInRange(doc, { from, to }, node => node.type.name === 'imageBlock')

          if (!images.length) {
            return false
          }

          const tracker = new Tracker(tr)

          return commands.forEach(images, ({ node, pos }) => {
            const mapResult = tracker.map(pos)

            if (mapResult.deleted) {
              return false
            }

            return commands.insertContent({
              type: this.name,
              content: [
                {
                  type: 'imageBlock',
                  attrs: node.attrs,
                },
                {
                  type: 'figcaption',
                  content: [{ type: 'paragraph' }],
                },
              ],
            })
          })
        },
    }
  },
})
