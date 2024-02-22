import { TableHeader } from '@tiptap/extension-table-header'
import { Plugin, Decoration, DecorationSet } from '@/tiptap/pm'

import { getCellsInRow, isColumnSelected, selectColumn } from './utils'

export default TableHeader.extend({
  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      colwidth: {
        default: null,
        parseHTML: (element: Element) => {
          const colwidth = element.getAttribute('colwidth')
          const value = colwidth ? colwidth.split(',').map(item => parseInt(item, 10)) : null

          return value
        },
      },
      style: {
        default: null,
      },
    }
  },

  addProseMirrorPlugins() {
    const { isEditable } = this.editor

    return [
      new Plugin({
        props: {
          decorations: state => {
            if (!isEditable) return DecorationSet.empty

            const { doc, selection } = state
            const decorations: Decoration[] = []
            const cells = getCellsInRow(0)(selection)

            if (cells) {
              cells.forEach(({ pos }: { pos: number }, index: number) => {
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const colSelected = isColumnSelected(index)(selection)
                    let className = 'grip-column'

                    if (colSelected) {
                      className += ' selected'
                    }

                    if (index === 0) {
                      className += ' first'
                    }

                    if (index === cells.length - 1) {
                      className += ' last'
                    }

                    const grip = document.createElement('a')

                    grip.className = className
                    grip.addEventListener('mousedown', event => {
                      event.preventDefault()
                      event.stopImmediatePropagation()

                      this.editor.view.dispatch(selectColumn(index)(this.editor.state.tr))
                    })

                    return grip
                  }),
                )
              })
            }

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
