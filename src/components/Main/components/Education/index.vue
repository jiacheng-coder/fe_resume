<template>
  <div class="mb-6 ">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.education }}</h1>
    <div
      v-for="(row, i) in resume.education"
      :key="i"
      class="flex justify-between text-xl flex-wrap gap-y-1"
    >
      <text>{{ row.school }}</text>
      <text>{{ row.major }}</text>
      <text>{{ row.period }}</text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ResumeData } from '@/types/resume'

const resume = inject<ResumeData>('resume')!
</script>
