<template>
  <div>
    <span
      class="mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200 hover:text-white hover:bg-gray-700 duration-300 hover:cursor-pointer">
      {{ props.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String
  }
})
</script>

<style scoped>
</style>
