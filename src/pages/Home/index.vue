<template>
  <div
    ref="splitRef"
    class="resume-page-wrap flex h-screen min-h-0 flex-col bg-slate-100 md:flex-row"
  >
    <!-- 左侧：桌面用 width% + flex-shrink-0，避免与分隔条叠加后右侧宽度为 0 -->
    <div
      class="preview-pane flex min-h-0 flex-col overflow-hidden md:min-h-0 md:border-r md:border-slate-200"
      :class="{ 'flex-1': !isMd }"
      :style="leftPaneStyle"
    >
      <div class="preview-scroll min-h-0 flex-1 overflow-y-auto p-3 md:p-4">
        <div id="resume-print-root" class="max-w-screen-lg mx-auto bg-white p-4 shadow-sm hover:shadow-2xl">
          <Header />
          <Main />
        </div>
      </div>
    </div>

    <!-- 拖拽分隔条（仅桌面） -->
    <div
      class="split-resizer no-print hidden h-1 shrink-0 cursor-row-resize touch-none bg-slate-200 hover:bg-sky-400 md:block md:h-auto md:w-1.5 md:cursor-col-resize"
      :class="{ 'bg-sky-500': dragging }"
      title="拖拽调整左右宽度"
      @mousedown.prevent="onStartDrag"
    />

    <!-- 右侧表单：桌面用 flex:1 吃掉剩余宽度 -->
    <aside
      class="no-print flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-t border-slate-200 md:min-h-0 md:border-t-0"
      :style="rightPaneStyle"
    >
      <ResumeEditor />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import Header from '@/components/Header/index.vue'
import Main from '@/components/Main/index.vue'
import ResumeEditor from '@/components/ResumeEditor/ResumeEditor.vue'
import { useResumeEditorStore } from '@/store/resumeEditorStore'

const SPLIT_KEY = 'fe_resume_split_left_pct'

const store = useResumeEditorStore()
provide('resume', computed(() => store.resume))

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

function onStartDrag() {
  if (!isMd.value || !splitRef.value) return
  dragging.value = true
  const el = splitRef.value
  const move = (ev: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const pct = (x / rect.width) * 100
    leftPct.value = Math.min(82, Math.max(18, pct))
  }
  const up = () => {
    dragging.value = false
    localStorage.setItem(SPLIT_KEY, String(leftPct.value))
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
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
</script>
