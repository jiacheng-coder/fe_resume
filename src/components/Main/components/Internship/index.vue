<template>
  <div class="mb-6">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.internship }}</h1>
    <ul>
      <li class="mb-4" v-for="item in resume.internship" :key="item.company">
        <div class="mb-2 flex items-center">
          <text class="text-2xl font-medium text-gray-800">{{ item.company }}</text>
          <img v-if="item.icon" :src="iconSrc(item.icon)" alt="" class="ml-2 w-9" />
        </div>
        <div class="mb-2" v-for="project in item.projects" :key="project.name">
          <div class="resume-project-block">
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
import { useResume } from '@/composables/useResume'

const resume = useResume()

function iconSrc(icon: string) {
  if (icon.startsWith('http://') || icon.startsWith('https://')) return icon
  const base = import.meta.env.BASE_URL
  const path = icon.startsWith('/') ? icon.slice(1) : icon
  return `${base}${path}`
}
</script>
