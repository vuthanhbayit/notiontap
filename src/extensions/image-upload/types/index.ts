import { FilePondOptions } from 'filepond'
import { SuggestionOptions } from '@/extensions/slash-command/types.ts'

export interface ImageUploadOptions extends SuggestionOptions {
  filepondOptions: FilePondOptions
  onUploaded: (response: string, onSetImage: (url: string) => void) => void
}
