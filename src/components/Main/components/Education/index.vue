<template>
  <div ref="rootRef" class="mb-6">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.education }}</h1>
    <div
      ref="rowRefs"
      class="edu-row flex justify-between text-xl flex-wrap gap-y-1"
      v-for="(row, i) in resume.education"
      :key="row.id || i"
    >
      <span>{{ row.school }}</span>
      <span>{{ row.major }}</span>
      <span>{{ row.period }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { animate, stagger } from 'animejs'
import { useResume } from '@/composables/useResume'

const resume = useResume()

const rootRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    const items = rootRef.value?.querySelectorAll('.edu-row')
    if (items && items.length) {
      items.forEach((el) => { ;(el as HTMLElement).style.opacity = '0' })
      animate(items, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 400,
        delay: stagger(80, { start: 500 }),
        ease: 'outExpo',
      })
    }
  })
})
</script>
