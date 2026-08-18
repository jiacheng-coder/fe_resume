<template>
  <div class="min-h-screen bg-[#f0f4ff]">
    <!-- 加载中 -->
    <div v-if="loading" class="flex justify-center py-32">
      <span class="loading loading-spinner loading-lg text-[#002FA7]"></span>
    </div>

    <!-- 未找到 -->
    <div v-else-if="!profile" class="flex flex-col items-center gap-4 py-32">
      <div class="text-6xl">😮</div>
      <p class="text-[#5a6a8a]">简历不存在或已被删除</p>
      <router-link to="/" class="rounded-lg bg-gradient-to-r from-[#002FA7] to-[#3366cc] px-5 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(0,47,167,0.3)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,47,167,0.4)] hover:brightness-110">返回列表</router-link>
    </div>

    <!-- 编辑器布局 -->
    <div
      v-else
      ref="splitRef"
      class="resume-page-wrap relative flex h-screen min-h-0 flex-col md:flex-row"
    >
      <!-- 顶部工具栏 -->
      <header class="absolute left-0 right-0 top-0 z-30 flex h-11 items-center border-b border-[#002FA7]/10 bg-white/80 px-4 backdrop-blur-md md:hidden">
        <router-link
          to="/"
          class="flex items-center gap-1.5 text-sm font-medium text-[#002FA7] transition-colors hover:text-[#002FA7]/70"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          返回列表
        </router-link>
        <span class="ml-3 truncate text-xs text-[#5a6a8a]">{{ profile?.title || '编辑简历' }}</span>
      </header>

      <!-- 左侧：预览 -->
      <div
        ref="leftPaneRef"
        class="preview-pane flex min-h-0 flex-col overflow-hidden bg-gradient-to-br from-[#e8f0ff] to-[#f0f4ff] pt-11 md:min-h-0 md:border-r md:border-[#002FA7]/10 md:pt-0"
        :class="{ 'flex-1': !isMd }"
        :style="leftPaneStyle"
      >
        <!-- 桌面端内嵌返回 -->
        <div class="hidden items-center gap-2 border-b border-[#002FA7]/8 bg-white/60 px-4 py-2.5 backdrop-blur-sm md:flex">
          <router-link
            to="/"
            class="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-[#002FA7] transition-all hover:bg-[#002FA7]/8"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            列表
          </router-link>
          <span class="mx-1 text-[#002FA7]/20">|</span>
          <span class="truncate text-xs text-[#5a6a8a]">{{ profile?.title }}</span>
        </div>

        <div class="preview-scroll min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          <div id="resume-print-root" class="mx-auto max-w-screen-lg rounded-2xl bg-white/90 p-4 shadow-[0_4px_24px_rgba(0,47,167,0.08)] ring-1 ring-[#002FA7]/6 backdrop-blur transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,47,167,0.14)]">
            <ResumeRenderer :template-id="profile?.templateId" />
          </div>
        </div>
      </div>

      <!-- 拖拽分隔条（仅桌面） -->
      <div
        class="split-resizer no-print hidden h-1 shrink-0 cursor-row-resize touch-none bg-[#002FA7]/15 transition-colors hover:bg-[#002FA7] md:block md:h-auto md:w-1.5 md:cursor-col-resize"
        :class="{ 'bg-[#002FA7]': dragging }"
        title="拖拽调整左右宽度"
        @mousedown.prevent="onStartDrag"
      />

      <!-- 右侧：编辑器 -->
      <aside
        ref="rightPaneRef"
        class="no-print flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-t border-[#002FA7]/10 bg-white pt-11 md:min-h-0 md:border-t-0 md:pt-0"
        :style="rightPaneStyle"
      >
        <ResumeEditor />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import { animate } from 'animejs'
import ResumeRenderer from '@/templates/ResumeRenderer.vue'
import ResumeEditor from '@/components/ResumeEditor/ResumeEditor.vue'
import { getResumeStore } from '@/store'
import { getProfile } from '@/db/crud'
import { RESUME_INJECTION_KEY } from '@/composables/useResume'
import type { ResumeData, ResumeProfile } from '@/types/resume'

const route = useRoute()
const router = useRouter()
const store = getResumeStore()

const SPLIT_KEY = 'fe_resume_split_left_pct'

const loading = ref(true)
const profile = ref<ResumeProfile | null>(null)

const leftPaneRef = ref<HTMLElement | null>(null)
const rightPaneRef = ref<HTMLElement | null>(null)

// 为子组件提供 resume 数据
const resumeComputed = computed<ResumeData>(() => {
  if (profile.value) return profile.value.data
  return store.resume.value
})

provide(RESUME_INJECTION_KEY, resumeComputed)

// 同步 profile 到 store（让 ResumeEditor 组件能通过 store 拿到当前数据）
watch(profile, (p) => {
  if (p) {
    store.currentProfile.value = p
  }
}, { immediate: true })

async function loadProfile() {
  const id = route.params.id as string
  if (!id) {
    if (store.currentProfile.value) {
      profile.value = store.currentProfile.value
    } else {
      router.replace('/')
      return
    }
    loading.value = false
    return
  }

  loading.value = true
  try {
    const data = await getProfile(id)
    if (!data) {
      loading.value = false
      return
    }
    profile.value = data
  } catch (e) {
    console.error('[Editor] 加载简历失败：', e)
    loading.value = false
    return
  }
  loading.value = false
}

// ── 分栏滑入动画 ──────────────────────────────────────────

watch(loading, (isLoading) => {
  if (!isLoading && profile.value) {
    nextTick(() => {
      if (leftPaneRef.value) {
        animate(leftPaneRef.value, {
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 500,
          ease: 'outExpo',
        })
      }
      if (rightPaneRef.value) {
        animate(rightPaneRef.value, {
          opacity: [0, 1],
          translateX: [30, 0],
          duration: 500,
          delay: 100,
          ease: 'outExpo',
        })
      }
    })
  }
})

onMounted(loadProfile)
watch(() => route.params.id, loadProfile)

// 动态页面标题
watch(profile, (p) => {
  if (p) {
    document.title = `编辑「${p.title}」· 简站`
  } else {
    document.title = '编辑简历 · 简站'
  }
})

// ── 分栏拖拽逻辑（从原 Home 移植） ──────────────────────

const splitRef = ref<HTMLElement | null>(null)
const leftPct = ref(50)
const dragging = ref(false)
const isMd = useMediaQuery('(min-width: 768px)')

const leftPaneStyle = computed(() => {
  if (!isMd.value) return {}
  return {
    width: `${leftPct.value}%`,
    flexShrink: 0,
    minWidth: 0,
  }
})

const rightPaneStyle = computed(() => {
  if (!isMd.value) return {}
  return {
    flex: '1 1 0%',
    minWidth: 0,
  }
})

// 分栏拖动相关 — 提升到组件作用域以便卸载时清理
let _move: ((ev: MouseEvent) => void) | null = null
let _up: (() => void) | null = null

function onStartDrag() {
  if (!isMd.value || !splitRef.value) return
  dragging.value = true
  const el = splitRef.value
  _move = (ev: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const pct = (x / rect.width) * 100
    leftPct.value = Math.min(82, Math.max(18, pct))
  }
  _up = () => {
    dragging.value = false
    localStorage.setItem(SPLIT_KEY, String(leftPct.value))
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    if (_move) document.removeEventListener('mousemove', _move)
    if (_up) document.removeEventListener('mouseup', _up)
    _move = null
    _up = null
  }
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', _move)
  document.addEventListener('mouseup', _up)
}

function cleanupDrag() {
  if (_move) document.removeEventListener('mousemove', _move)
  if (_up) document.removeEventListener('mouseup', _up)
  _move = null
  _up = null
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

onMounted(() => {
  const s = localStorage.getItem(SPLIT_KEY)
  if (s) {
    const n = parseFloat(s)
    if (!Number.isNaN(n) && n >= 18 && n <= 82) {
      leftPct.value = n
    }
  }
})

onUnmounted(cleanupDrag)
</script>
