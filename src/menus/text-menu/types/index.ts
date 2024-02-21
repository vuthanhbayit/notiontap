export type TypographyOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: string
}

export type TypographyCategory = {
  label: string
  id: string
  type: 'category'
}

export type TypographyOptions = Array<TypographyOption | TypographyCategory>
