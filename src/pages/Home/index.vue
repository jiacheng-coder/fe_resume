<template>
  <div id="home" class="max-w-screen-lg mx-auto p-4 hover:shadow-2xl">
    <Header :userInfo="userInfo" />
    <Main :skills="skills" :features="features" :experience="experience" :prizes="prizes" :internship="internship" />
    <!-- <Upload /> -->
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import Main from "@/components/Main/index.vue";
// import Upload from "@/components/Upload/index.vue"
import Info from '@/config/info_bytedance.json'

const { userInfo, skills, features, experience, prizes, internship } = Info
</script>

<style>
.home {
  background-color: #fff;
}
</style>
