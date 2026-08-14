<template>
  <div ref="rootRef" class="mb-6">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.features }}</h1>
    <p ref="featureItems" class="feature-item text-md" v-for="feature in resume.features" :key="feature">
      <span class="iconfont icon-pointer mr-2"></span>
      {{ feature }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { animate, stagger } from 'animejs'
import { useResume } from '@/composables/useResume'

const resume = useResume()

const rootRef = ref<HTMLElement | null>(null)
const featureItems = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    const items = rootRef.value?.querySelectorAll('.feature-item')
    if (items && items.length) {
      items.forEach((el) => { ;(el as HTMLElement).style.opacity = '0' })
      animate(items, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 400,
        delay: stagger(50, { start: 500 }),
        ease: 'outExpo',
      })
    }
  })
})
</script>
