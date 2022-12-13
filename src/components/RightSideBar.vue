<template>
  <div class="bg-white p-4 shadow-lg h-full">
    <!-- 个人优势 -->
    <div class="mx-4 mb-6 ">
      <h1 class="mb-4 text-3xl text-gray-700 font-bold">个人优势</h1>
      <p class="text-lg" v-for="feature in props.features">
        <span class="iconfont icon-pointer mr-2"></span>
        {{feature}}
      </p>
    </div>
    <!-- 教育经历 -->
    <div class="mx-4 mb-6 ">
      <h1 class="mb-4 text-3xl text-gray-700 font-bold">教育经历</h1>
      <div class="flex justify-between">
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
          <!-- <span class="iconfont icon-pointer mr-2"></span> -->
          <text class="text-2xl font-medium text-gray-800">{{item.company}}</text>
          <!-- 项目 -->
          <div class="mt-1" v-for="project in item.projects">
            <div class="flex text-md font-medium text-gray-800 justify-between">
              <text class="font-bold">{{project.name}}</text>
              <text>{{project.job}}</text>
              <text>{{project.time}}</text>
            </div>
            <div>
              <p class="mr-4">项目内容:</p>
              <text>{{project.situation}}</text>,
              <text>{{project.target}}</text>,
              <text>{{project.action}}</text>,
              <text>{{project.result}}</text>
            </div>
            <div>
              <text class="mr-4">技术栈:</text>
              <text>{{project.skills}}</text>
            </div>
            
          </div>
        </li>
      </ul>
    </div>  
    <!-- 标签 -->
    <div class="mx-4">
      <h1 class="mb-8 text-3xl text-gray-700 font-bold">技术栈</h1>
      <ul class="flex flex-wrap">
        <li class="mb-6" v-for="skill in props.skills">
          <Skill :name="skill"></Skill>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skill from '../components/Skill.vue';
import { project, projects } from '../../config';
const props = defineProps({
  skills: {
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