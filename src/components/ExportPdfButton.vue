<template>
  <div ref="wrapRef" class="no-print flex flex-col gap-1" style="opacity: 0">
    <button
      ref="btnRef"
      type="button"
      class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition"
      :style="{ backgroundColor: resume.ui.theme.headerBackground }"
      :title="resume.ui.exportPdf.hint"
      @click="openPrintForPdf"
      @mouseenter="onHover"
      @mouseleave="onLeave"
    >
      <v-icon name="bi-download" scale="1.15" class="shrink-0" />
      <span>{{ resume.ui.exportPdf.button }}</span>
    </button>
    <p class="max-w-xs text-xs text-slate-500">{{ resume.ui.exportPdf.hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { animate } from 'animejs'
import { useResume } from '@/composables/useResume'

const resume = useResume()

const wrapRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)

function openPrintForPdf() {
  // 点击脉冲动画后再打印
  if (btnRef.value) {
    animate(btnRef.value, {
      scale: [1, 0.92, 1],
      duration: 300,
      ease: 'outQuad',
      onComplete: () => window.print(),
    })
  } else {
    window.print()
  }
}

function onHover() {
  if (btnRef.value) {
    animate(btnRef.value, {
      scale: 1.05,
      duration: 200,
      ease: 'outQuad',
    })
  }
}

function onLeave() {
  if (btnRef.value) {
    animate(btnRef.value, {
      scale: 1,
      duration: 200,
      ease: 'outQuad',
    })
  }
}

onMounted(() => {
  nextTick(() => {
    if (wrapRef.value) {
      animate(wrapRef.value, {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        delay: 300,
        ease: 'outBack',
      })
    }
  })
})
</script>
