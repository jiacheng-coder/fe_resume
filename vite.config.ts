/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// gzip压缩
import viteCompression from 'vite-plugin-compression'
// 路径别名
import { resolve } from 'path/posix'

export default defineConfig({
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
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (!id.includes('node_modules')) return undefined
          // Vue 核心：vue + vue-router + @vueuse
          if (id.includes('vue') || id.includes('@vueuse')) return 'vue-vendor'
          // 数据层：dexie
          if (id.includes('dexie')) return 'db-vendor'
          // 动画：animejs
          if (id.includes('animejs')) return 'anime-vendor'
          // 其余 node_modules
          return 'vendor'
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
