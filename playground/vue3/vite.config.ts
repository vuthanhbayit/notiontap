import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },

  plugins: [
    dts(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => {
            return ['sku-view'].includes(tag)
          },
        },
      },
    }),
  ],
})
