import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/frontend-resume/',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@views/': `${path.resolve(__dirname, 'src/views/')}/`,
    },
  },
})
