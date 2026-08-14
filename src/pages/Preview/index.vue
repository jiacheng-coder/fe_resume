<template>
  <div class="min-h-screen bg-slate-100">
    <!-- 顶部工具栏 -->
    <div ref="toolbarRef" class="no-print fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white/90 px-6 py-3 shadow-sm backdrop-blur" style="opacity: 0">
      <div class="flex items-center gap-3">
        <router-link to="/" class="btn btn-ghost btn-sm">← 返回列表</router-link>
        <span v-if="profile" class="text-sm font-medium text-slate-600">{{ profile.title }}</span>
      </div>
      <ExportPdfButton />
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="flex justify-center py-32">
      <span class="loading loading-spinner loading-lg text-slate-400"></span>
    </div>

    <!-- 未找到 -->
    <div v-else-if="!profile" class="flex flex-col items-center gap-4 py-32">
      <div class="text-6xl">😮</div>
      <p class="text-slate-500">简历不存在或已被删除</p>
      <router-link to="/" class="btn btn-primary btn-sm">返回列表</router-link>
    </div>

    <!-- 简历预览 -->
    <div v-else ref="contentRef" class="pt-16" style="opacity: 0">
      <div id="resume-print-root" class="mx-auto max-w-screen-lg bg-white p-4 shadow-sm">
        <ResumeRenderer :template-id="profile?.templateId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, provide, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { animate } from 'animejs'
import ResumeRenderer from '@/templates/ResumeRenderer.vue'
import ExportPdfButton from '@/components/ExportPdfButton.vue'
import { getProfile } from '@/db/crud'
import { RESUME_INJECTION_KEY } from '@/composables/useResume'
import type { ResumeData, ResumeProfile } from '@/types/resume'

const route = useRoute()
const profile = ref<ResumeProfile | null>(null)
const loading = ref(true)

const toolbarRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// 为子组件提供 resume 数据（与 Editor 模式一致的 provide 契约）
const resumeComputed = computed<ResumeData>(() => {
  if (profile.value) return profile.value.data
  // fallback 空壳，避免子组件 undefined 报错
  return {
    userInfo: { name: '', job: '', email: '', phone: '', wechat: '', resumeUrl: '', blogUrl: '', githubUrl: '' },
    ui: {
      theme: { headerBackground: '#0284C7' },
      copy: { title: '', message: '' },
      exportPdf: { button: '导出 PDF', hint: '' },
      sections: { features: '', education: '', internship: '', projects: '', prizes: '', skills: '' },
      labels: { projectDescription: '', projectDuty: '', techStack: '' },
    },
    education: [],
    skills: [],
    prizes: [],
    features: [],
    experience: [],
    internship: [],
  }
})

provide(RESUME_INJECTION_KEY, resumeComputed)

// ── 入场动画 ──────────────────────────────────────────────

function playEntrance() {
  if (toolbarRef.value) {
    animate(toolbarRef.value, {
      opacity: [0, 1],
      translateY: [-15, 0],
      duration: 400,
      ease: 'outExpo',
    })
  }
  if (contentRef.value) {
    animate(contentRef.value, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      delay: 200,
      ease: 'outExpo',
    })
  }
}

async function loadProfile() {
  const id = route.params.id as string
  if (!id) return
  loading.value = true
  try {
    const data = await getProfile(id)
    profile.value = data ?? null
  } catch (e) {
    console.error('[Preview] 加载简历失败：', e)
    profile.value = null
  } finally {
    loading.value = false
  }

  if (!loading.value && profile.value) {
    await nextTick()
    playEntrance()
  }
}

onMounted(loadProfile)
watch(() => route.params.id, loadProfile)

// 动态页面标题
watch(profile, (p) => {
  if (p) {
    document.title = `预览「${p.title}」· 简站`
  } else {
    document.title = '预览简历 · 简站'
  }
})
</script>
