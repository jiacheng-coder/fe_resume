<template>
  <div class="modern-template">
    <!-- 顶部信息条 -->
    <div
      class="modern-header p-5 text-white"
      :style="{ backgroundColor: resume.ui.theme.headerBackground }"
    >
      <div class="flex items-center gap-4">
        <img class="h-20 w-20 rounded-full object-cover ring-2 ring-white/40" :src="avatarSrc" alt="" />
        <div>
          <h1 class="text-2xl font-bold">{{ resume.userInfo.name }}</h1>
          <p class="text-sm opacity-90">{{ resume.userInfo.job }}</p>
        </div>
      </div>
    </div>

    <!-- 双栏内容 -->
    <div class="flex flex-col md:flex-row">
      <!-- 左侧边栏 -->
      <aside class="modern-sidebar w-full bg-slate-50 p-4 md:w-1/3">
        <!-- 联系方式 -->
        <section class="mb-5">
          <h2 class="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide text-slate-500">联系方式</h2>
          <div class="space-y-1 text-xs text-slate-700">
            <div v-if="resume.userInfo.phone" class="flex items-center gap-1.5">
              <v-icon name="bi-telephone-fill" scale="1.0" class="shrink-0 text-slate-400" />
              <span>{{ resume.userInfo.phone }}</span>
            </div>
            <div v-if="resume.userInfo.email" class="flex items-center gap-1.5">
              <v-icon name="md-markemailread-round" scale="1.0" class="shrink-0 text-slate-400" />
              <span class="break-all">{{ resume.userInfo.email }}</span>
            </div>
            <div v-if="resume.userInfo.wechat" class="flex items-center gap-1.5">
              <v-icon name="co-wechat" scale="1.0" class="shrink-0 text-slate-400" />
              <span>{{ resume.userInfo.wechat }}</span>
            </div>
            <div v-if="resume.userInfo.githubUrl" class="truncate text-slate-500">
              <a :href="resume.userInfo.githubUrl" target="_blank" class="hover:underline">{{ resume.userInfo.githubUrl }}</a>
            </div>
            <div v-if="resume.userInfo.blogUrl" class="truncate text-slate-500">
              <a :href="resume.userInfo.blogUrl" target="_blank" class="hover:underline">{{ resume.userInfo.blogUrl }}</a>
            </div>
          </div>
        </section>

        <!-- 左侧区块（技能/教育/荣誉） -->
        <template v-for="key in leftSections" :key="key">
          <component :is="sectionComponentMap[key]" />
        </template>
      </aside>

      <!-- 右侧主体 -->
      <main class="modern-main flex-1 p-4">
        <template v-for="key in rightSections" :key="key">
          <component :is="sectionComponentMap[key]" />
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useResume } from '@/composables/useResume'
import { publicAssetUrl } from '@/utils/publicAsset'
import defaultAvatarUrl from '@/assets/images/default-avatar.svg?url'
import { DEFAULT_SECTION_ORDER, type SectionKey } from '@/types/resume'
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

// ModernTemplate 把区块分为左右两栏
// 左栏：skills, education, prizes
// 右栏：features, projects, internship
const LEFT_DEFAULT: SectionKey[] = ['skills', 'education', 'prizes']
const RIGHT_DEFAULT: SectionKey[] = ['features', 'projects', 'internship']

const orderedSections = computed<SectionKey[]>(() => {
  const order = resume.value.sectionOrder
  if (!order || !order.length) return DEFAULT_SECTION_ORDER
  const valid = order.filter((k) => k in sectionComponentMap)
  const missing = DEFAULT_SECTION_ORDER.filter((k) => !valid.includes(k))
  return [...valid, ...missing]
})

const leftSections = computed(() =>
  orderedSections.value.filter((k) => LEFT_DEFAULT.includes(k)),
)
const rightSections = computed(() =>
  orderedSections.value.filter((k) => RIGHT_DEFAULT.includes(k)),
)

const avatarSrc = computed(() => {
  const raw = resume.value.userInfo?.avatar?.trim()
  if (!raw) return defaultAvatarUrl
  return publicAssetUrl(raw)
})
</script>
