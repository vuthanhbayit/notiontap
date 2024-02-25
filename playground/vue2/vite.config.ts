import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../../src', import.meta.url)),
    },
  },

  plugins: [
    dts(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => {
            return ['notion-tap'].includes(tag)
          },
        },
      },
    }),
  ],
})
