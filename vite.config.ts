/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// gzip压缩
import viteCompression from 'vite-plugin-compression'
// 路径别名
import { resolve } from 'path/posix'

export default defineConfig({
  // base: '/fe_resume/',
  optimizeDeps: {
    exclude: ['oh-vue-icons/icons'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), viteCompression()],
  server: {
    hmr: true,
    open: true,
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) return 'node-modules'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.tsx$/],
    },
  },
})
