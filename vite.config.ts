/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'), // 路径别名
      '@components': path.resolve(__dirname, './src/components') // 路径别名
    }
  },
  plugins: [
    vue(),
  ],
  base: '/fe_resume/',
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.tsx$/]
    }
  },
  server: {
    hmr: true,
  },
})
