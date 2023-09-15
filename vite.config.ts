/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression' // gzip压缩
// import { fileURLToPath, URL } from 'node:url' // 配置路径别名
import { resolve } from 'path/posix'

export default defineConfig({
  base: '/fe_resume/',
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
