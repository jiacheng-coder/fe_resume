<template>
  <div class="mx-4 mb-6 ">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">个人优势</h1>
    <p class="text-md" v-for="feature in features" :key="feature">
      <span class="iconfont icon-pointer mr-2"></span>
      {{ feature }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { features } = defineProps({
  features: {
    type: Array<string>,
  },
})
</script>
