<template>
  <div ref="rootRef" class="mb-6">
    <h1 class="mb-4 text-3xl text-gray-700 font-bold">{{ resume.ui.sections.projects }}</h1>
    <ul>
      <li class="proj-company mb-4" v-for="item in resume.experience" :key="item.id || item.company">
        <div class="mb-2 flex items-center">
          <span class="text-2xl font-medium text-gray-800">{{ item.company }}</span>
          <img v-if="item.icon" :src="publicAssetUrl(item.icon)" alt="" class="ml-2 w-9" />
        </div>
        <div class="proj-block resume-project-block mb-2" v-for="project in item.projects" :key="project.id || project.name">
          <div class="flex text-xl font-medium text-gray-800 justify-between" style="align-items: center;">
            <span>{{ project.name }}</span>
            <span>{{ project.job }}</span>
            <span>{{ project.time }}</span>
          </div>
          <div class="text-md">
            <div class="mt-1">
              <span class="mr-4 font-semibold">{{ resume.ui.labels.projectDescription }}</span>
              <span>{{ project.introduce }}</span>
            </div>
            <div>
              <p class="mr-4 font-semibold">{{ resume.ui.labels.projectDuty }}</p>
              <div v-for="line in project.myContribution" :key="line">
                <span class="iconfont icon-pointer mr-2"></span>
                <span>{{ line }}</span>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <span class="mr-4 font-semibold">{{ resume.ui.labels.techStack }}</span>
                <span>{{ project.skills }}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { animate, stagger } from 'animejs'
import { useResume } from '@/composables/useResume'
import { publicAssetUrl } from '@/utils/publicAsset'

const resume = useResume()

const rootRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    // 公司整体淡入
    const companies = rootRef.value?.querySelectorAll('.proj-company')
    if (companies && companies.length) {
      companies.forEach((el) => { ;(el as HTMLElement).style.opacity = '0' })
      animate(companies, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: stagger(100, { start: 500 }),
        ease: 'outExpo',
      })
    }
    // 项目块淡入
    const blocks = rootRef.value?.querySelectorAll('.proj-block')
    if (blocks && blocks.length) {
      blocks.forEach((el) => { ;(el as HTMLElement).style.opacity = '0' })
      animate(blocks, {
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        delay: stagger(60, { start: 700 }),
        ease: 'outExpo',
      })
    }
  })
})
</script>
