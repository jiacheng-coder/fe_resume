<template>
  <div class="mb-6 ">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">获奖经历</h1>
    <div v-for="item in prizes" :key="item">
      <span class="iconfont icon-pointer mr-2"></span>
      <text>{{ item }}</text>
    </div>
  </div>
</template>

<script setup lang="ts">
const { prizes } = defineProps({
  prizes: {
    type: Array<string>,
  },
})
</script>
