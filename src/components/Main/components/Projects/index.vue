<template>
  <div class="mx-4 mb-6">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">项目经历</h1>
    <ul>
      <li class="mb-4" v-for="item in experience" :key="JSON.stringify(item)">
        <text class="text-3xl font-medium text-gray-800">{{ item.company }}</text>
        <div class="mb-2" v-for="project in item.projects" :key="project.name">
          <div class="flex text-xl font-medium text-gray-800 justify-between" style="align-items: center;">
            <text>{{ project.name }}</text>
            <text>{{ project.job }}</text>
            <text>{{ project.time }}</text>
          </div>
          <div class="text-md">
            <div class="mt-1">
              <text class="mr-4 font-semibold">项目介绍:</text>
              <text>{{ project.introduce }}</text>
            </div>
            <div>
              <p class="mr-4 font-semibold">我的工作:</p>
              <div v-for="item in project.myContribution" :key="item">
                <span class="iconfont icon-pointer mr-2"></span>
                <text>{{ item }}</text>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <text class="mr-4 font-semibold">技术栈:</text>
                <text>{{ project.skills }}</text>
              </div>
              <a :href="project.more" target="_blank">
                <span
                  class="font-semibold border-b-2 border-solid border-gray-800 shadow-sm hover:font-bold  hover:cursor-pointer">
                  了解更多
                </span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { projects } from '../../../../types/projectsType'
const { experience } = defineProps({
  experience: {
    type: Array<projects>,
  },
})
</script>
