<template>
  <div class="mb-6 ">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.prizes }}</h1>
    <div v-for="item in resume.prizes" :key="item">
      <span class="iconfont icon-pointer mr-2"></span>
      <text>{{ item }}</text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ResumeData } from '@/types/resume'

const resume = inject<ResumeData>('resume')!
</script>
