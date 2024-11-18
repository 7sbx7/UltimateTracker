import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/ultimate-tracker/',
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11', 'Safari >= 10'],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/functions.scss";
        `,
      },
    },
  },
})
