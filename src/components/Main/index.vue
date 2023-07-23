<template>
  <div class="pt-4 h-full">
    <Features :features="features" />
    <Education />
    <Internship :internship="internship" />
    <Projects :experience="experience" />
    <Prizes :prizes="prizes" />
    <Skills :skills="skills" />
  </div>
</template>

<script setup lang="ts">
import type { projects } from '../../types/projectsType';
import Features from './components/Features/index.vue';
import Education from './components/Education/index.vue'
import Skills from './components/Skills/index.vue'
import Prizes from './components/Prizes/index.vue'
import Projects from './components/Projects/index.vue'
import Internship from './components/Internship/index.vue'

const { skills, prizes, features, experience, internship } = defineProps({
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
  },
  internship: {
    type: [] as any
  },
})
</script>

<style lang="scss" scoped>
@import "//at.alicdn.com/t/c/font_3811182_hr25k59bz2.css"
</style>
