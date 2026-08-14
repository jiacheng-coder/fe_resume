<template>
  <div class="ai-template">
    <!-- 顶部 Banner -->
    <div class="ai-header px-6 py-5 text-white" :style="{ backgroundColor: headerColor }">
      <div class="flex items-center gap-4">
        <img class="h-16 w-16 rounded-full object-cover ring-2 ring-white/30" :src="avatarSrc" alt="" />
        <div class="flex-1">
          <h1 class="text-xl font-bold">{{ resume.userInfo.name }}</h1>
          <p class="text-sm opacity-90">{{ resume.userInfo.job }}</p>
        </div>
        <!-- 联系方式横排 -->
        <div class="hidden sm:flex flex-col gap-0.5 text-xs opacity-90">
          <span v-if="resume.userInfo.phone" class="flex items-center gap-1">
            <v-icon name="bi-telephone-fill" scale="0.9" />
            {{ resume.userInfo.phone }}
          </span>
          <span v-if="resume.userInfo.email" class="flex items-center gap-1">
            <v-icon name="md-markemailread-round" scale="0.9" />
            {{ resume.userInfo.email }}
          </span>
          <span v-if="resume.userInfo.wechat" class="flex items-center gap-1">
            <v-icon name="co-wechat" scale="0.9" />
            {{ resume.userInfo.wechat }}
          </span>
        </div>
      </div>
      <!-- 移动端联系方式 -->
      <div class="flex sm:hidden flex-col gap-0.5 mt-3 text-xs opacity-90">
        <span v-if="resume.userInfo.phone" class="flex items-center gap-1">
          <v-icon name="bi-telephone-fill" scale="0.9" />{{ resume.userInfo.phone }}
        </span>
        <span v-if="resume.userInfo.email" class="flex items-center gap-1">
          <v-icon name="md-markemailread-round" scale="0.9" />{{ resume.userInfo.email }}
        </span>
        <span v-if="resume.userInfo.wechat" class="flex items-center gap-1">
          <v-icon name="co-wechat" scale="0.9" />{{ resume.userInfo.wechat }}
        </span>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="ai-body">
      <!-- 核心优势 -->
      <component :is="sectionComponentMap.features" v-if="resume.features?.length" />

      <!-- 技能标签 -->
      <section v-if="resume.skills?.length" class="ai-section px-6 py-4">
        <h2 class="ai-section-title" :style="{ color: headerColor }">专业技能</h2>
        <div class="flex flex-wrap gap-1.5 mt-2">
          <span
            v-for="(skill, i) in resume.skills"
            :key="i"
            class="px-2.5 py-1 rounded-full text-xs font-medium"
            :style="{
              backgroundColor: headerColor + '15',
              color: headerColor,
              border: `1px solid ${headerColor}30`,
            }"
          >
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- 工作与项目经历 -->
      <component :is="sectionComponentMap.projects" v-if="resume.experience?.length" />

      <!-- 教育背景 -->
      <component :is="sectionComponentMap.education" v-if="resume.education?.length" />

      <!-- 荣誉与获奖 -->
      <component :is="sectionComponentMap.prizes" v-if="resume.prizes?.length" />

      <!-- 其他实习 -->
      <component :is="sectionComponentMap.internship" v-if="resume.internship?.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useResume } from '@/composables/useResume'
import { publicAssetUrl } from '@/utils/publicAsset'
import defaultAvatarUrl from '@/assets/images/default-avatar.svg?url'
import type { SectionKey } from '@/types/resume'
import Features from '@/components/Main/components/Features/index.vue'
import Education from '@/components/Main/components/Education/index.vue'
import Skills from '@/components/Main/components/Skills/index.vue'
import Prizes from '@/components/Main/components/Prizes/index.vue'
import Projects from '@/components/Main/components/Projects/index.vue'
import Internship from '@/components/Main/components/Internship/index.vue'

const resume = useResume()

const sectionComponentMap: Record<SectionKey, Component> = {
  features: Features,
  projects: Projects,
  internship: Internship,
  education: Education,
  skills: Skills,
  prizes: Prizes,
}

const headerColor = computed(() => resume.value.ui?.theme?.headerBackground || '#059669')

const avatarSrc = computed(() => {
  const raw = resume.value.userInfo?.avatar?.trim()
  if (!raw) return defaultAvatarUrl
  return publicAssetUrl(raw)
})
</script>

<style scoped>
.ai-template {
  font-family: inherit;
}

.ai-header {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
}

.ai-section {
  border-bottom: 1px solid #e5e7eb;
}

.ai-section:last-child {
  border-bottom: none;
}

.ai-section-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 0.25rem;
}
</style>
