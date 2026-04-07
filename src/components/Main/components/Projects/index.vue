<template>
  <div class="mb-6">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.projects }}</h1>
    <ul>
      <li class="mb-4" v-for="item in resume.experience" :key="item.company">
        <text class="text-2xl font-medium text-gray-800">{{ item.company }}</text>
        <div class="mb-2" v-for="project in item.projects" :key="project.name">
          <div
            class="resume-project-block"
          >
            <div class="flex text-xl font-medium text-gray-800 justify-between" style="align-items: center;">
              <text>{{ project.name }}</text>
              <text>{{ project.job }}</text>
              <text>{{ project.time }}</text>
            </div>
            <div class="text-md">
              <div class="mt-1">
                <text class="mr-4 font-semibold">{{ resume.ui.labels.projectDescription }}</text>
                <text>{{ project.introduce }}</text>
              </div>
              <div>
                <p class="mr-4 font-semibold">{{ resume.ui.labels.projectDuty }}</p>
                <div v-for="line in project.myContribution" :key="line">
                  <span class="iconfont icon-pointer mr-2"></span>
                  <text>{{ line }}</text>
                </div>
              </div>
              <div class="flex justify-between">
                <div>
                  <text class="mr-4 font-semibold">{{ resume.ui.labels.techStack }}</text>
                  <text>{{ project.skills }}</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ResumeData } from '@/types/resume'

const resume = inject<ResumeData>('resume')!
</script>
