<template>
  <div class="mb-6 ">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.features }}</h1>
    <p class="text-md" v-for="feature in resume.features" :key="feature">
      <span class="iconfont icon-pointer mr-2"></span>
      {{ feature }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ResumeData } from '@/types/resume'

const resume = inject<ResumeData>('resume')!
</script>
