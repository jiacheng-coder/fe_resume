<template>
  <div id="home" class="max-w-screen-lg mx-auto p-4 hover:shadow-2xl">
    <Header />
    <Main />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import Header from '@/components/Header/index.vue'
import Main from '@/components/Main/index.vue'
import resumeJson from '@/config/resume.json'
import type { ResumeData } from '@/types/resume'

const resume = resumeJson as ResumeData
provide('resume', resume)
</script>

<style>
.home {
  background-color: #fff;
}
</style>
