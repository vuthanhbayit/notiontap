import * as cheerio from 'cheerio'

export const fixInlineImage = (content: string) => {
  const $ = cheerio.load(content, null, false)

  $('p').each((_, element) => {
    const paragraph = $(element)

    // Tìm tất cả các thẻ img trong thẻ p
    paragraph.find('img').each(() => {
      // Tạo một thẻ div mới với thuộc tính data-type="imageBlock"
      const newDiv = $('<div>').attr('data-type', 'imageBlock')

      // Di chuyển tất cả các nội dung bên trong thẻ p vào thẻ div mới
      paragraph.contents().appendTo(newDiv)

      // Thay thế thẻ p bằng thẻ div mới
      paragraph.replaceWith(newDiv)
    })
  })

  return $.html()
}
