<template>
  <div class="p-4 h-full shadow-2xl" style="border-radius: 1rem;">
    <!-- 个人优势 -->
    <div class="mx-4 mb-6 ">
      <h1 class="mb-4 text-3xl text-gray-700 font-bold">个人优势</h1>
      <p class="text-md" v-for="feature in props.features">
        <span class="iconfont icon-pointer mr-2"></span>
        {{ feature }}
      </p>
    </div>
    <!-- 教育经历 -->
    <div class="mx-4 mb-6 ">
      <h1 class="mb-4 text-3xl text-gray-700 font-bold">教育经历</h1>
      <div class="flex justify-between text-xl">
        <text>重庆大学</text>
        <text>信息与计算科学</text>
        <text>2020-2024</text>
      </div>
    </div>
    <!-- 项目经历 -->
    <div class="mx-4 mb-6">
      <h1 class="mb-4 text-3xl text-gray-700 font-bold">项目经历</h1>
      <ul>
        <li class="mb-4" v-for="item in props.experience">

          <!-- <text class="text-3xl font-medium text-gray-800">{{ item.company }}</text> -->
          <!-- 项目 -->
          <div class="mb-2" v-for="project in item.projects">
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
                <div v-for="item in project.myContribution">
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
    <!-- 获奖经历 -->
    <div class="mx-4 mb-6 ">
      <h1 class="mb-4 text-3xl text-gray-700 font-bold">获奖经历</h1>
      <div v-for="item in prizes">
        <span class="iconfont icon-pointer mr-2"></span>
        <text>{{ item }}</text>
      </div>
    </div>
    <!-- 标签 -->
    <div class="mx-4">
      <h1 class="mb-8 text-3xl text-gray-700 font-bold">技术栈</h1>
      <ul class="flex flex-wrap">
        <li class="mb-6" v-for="skill in props.skills">
          <div>
            <span
              class="mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200 hover:text-white hover:bg-gray-700 duration-300 hover:cursor-pointer">
              {{ skill }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { projects } from '../types/projectsType';

const props = defineProps({
  skills: {
    type: Array<string>,
  },
  prizes: {
    type: Array<string>,
  },
  features: {
    type: Array<string>
  },
  experience: {
    type: Array<projects>
  }
})
</script>

<style lang="scss" scoped>
@import "//at.alicdn.com/t/c/font_3811182_hr25k59bz2.css"
</style>
