<template>
  <div ref="rootRef">
    <h1 class="mb-8 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.skills }}</h1>
    <ul ref="listRef" class="flex flex-wrap">
      <li class="mb-6" v-for="skill in resume.skills" :key="skill">
        <div>
          <span
            class="skill-item mr-2 my-1 rounded-full border border-[#e0e0e0] bg-[#f4f4f4] px-4 py-2 text-sm font-medium text-[#161616] duration-300 hover:cursor-pointer hover:border-[#0f62fe] hover:bg-[#0f62fe] hover:text-white hover:shadow-[0_2px_8px_rgba(15,98,254,0.25)] skill">
            {{ skill }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { animate, stagger } from 'animejs'
import { useResume } from '@/composables/useResume'

const resume = useResume()

const rootRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    const items = listRef.value?.querySelectorAll('.skill-item')
    if (items && items.length > 0) {
      // 初始隐藏
      items.forEach((el) => {
        ;(el as HTMLElement).style.opacity = '0'
      })
      // 弹跳入场
      animate(items, {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 600,
        delay: stagger(60, { start: 500 }),
        ease: 'outBack',
      })
    }
  })
})
</script>
