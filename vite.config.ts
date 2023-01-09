/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/frontend-resume/',
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
