<template>
  <div ref="mainRef" class="resume-main pt-4 h-full">
    <component
      :is="sectionComponentMap[key]"
      v-for="key in orderedSections"
      :key="key"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick, watch, type Component } from 'vue'
import { animate, stagger } from 'animejs'
import Features from './components/Features/index.vue'
import Education from './components/Education/index.vue'
import Skills from './components/Skills/index.vue'
import Prizes from './components/Prizes/index.vue'
import Projects from './components/Projects/index.vue'
import Internship from './components/Internship/index.vue'
import { useResume } from '@/composables/useResume'
import { DEFAULT_SECTION_ORDER, type SectionKey } from '@/types/resume'

const resume = useResume()

const sectionComponentMap: Record<SectionKey, Component> = {
  features: Features,
  projects: Projects,
  internship: Internship,
  education: Education,
  skills: Skills,
  prizes: Prizes,
}

const mainRef = ref<HTMLElement | null>(null)

const orderedSections = computed<SectionKey[]>(() => {
  const order = resume.value.sectionOrder
  if (!order || !order.length) return DEFAULT_SECTION_ORDER
  const valid = order.filter((k) => k in sectionComponentMap)
  const missing = DEFAULT_SECTION_ORDER.filter((k) => !valid.includes(k))
  return [...valid, ...missing]
})

// ── Section 入场动画 ──────────────────────────────────────

function playSectionEntrance() {
  nextTick(() => {
    const sections = mainRef.value?.children
    if (sections && sections.length > 0) {
      // 设置初始隐藏状态
      Array.from(sections).forEach((el) => {
        ;(el as HTMLElement).style.opacity = '0'
      })
      // 交错淡入上滑
      animate(sections, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: stagger(100, { start: 300 }),
        ease: 'outExpo',
      })
    }
  })
}

onMounted(() => {
  playSectionEntrance()
})

// 当 section 顺序变化时重新播放动画
watch(orderedSections, () => {
  playSectionEntrance()
})
</script>
