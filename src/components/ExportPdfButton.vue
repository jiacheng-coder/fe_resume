<template>
  <div class="no-print fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1">
    <button
      type="button"
      class="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 active:scale-[0.98]"
      :style="{ backgroundColor: resume.ui.theme.headerBackground }"
      :title="resume.ui.exportPdf.hint"
      @click="openPrintForPdf"
    >
      <v-icon name="bi-download" scale="1.15" class="shrink-0" />
      <span>{{ resume.ui.exportPdf.button }}</span>
    </button>
    <p class="max-w-[14rem] text-right text-xs text-slate-500">{{ resume.ui.exportPdf.hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ResumeData } from '@/types/resume'

const resume = inject<ResumeData>('resume')!

/** 使用浏览器原生排版打印；在对话框中选「存储为 PDF」，分页由引擎处理（html2canvas 截图方案无法可靠分页）。 */
function openPrintForPdf() {
  window.print()
}
</script>
