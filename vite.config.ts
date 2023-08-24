/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  base: '/fe_resume/',
  resolve: {
    alias: { // 路径别名
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components') 
    }
  },
  plugins: [
    vue(),
    viteCompression()
  ],
  server: {
    hmr: true,
    open: true,
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) return 'node-modules'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.tsx$/]
    }
  },
})
