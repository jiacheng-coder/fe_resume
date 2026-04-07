<template>
  <div>
    <h1 class="mb-8 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.skills }}</h1>
    <ul class="flex flex-wrap">
      <li class="mb-6" v-for="skill in resume.skills" :key="skill">
        <div>
          <span
            class="mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200 hover:text-white duration-300 hover:bg-my-blue hover:cursor-pointer skill">
            {{ skill }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useResume } from '@/composables/useResume'

const resume = useResume()
</script>
