<template>
  <div class="no-print flex flex-col gap-1">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110 active:scale-[0.98]"
      :style="{ backgroundColor: resume.ui.theme.headerBackground }"
      :title="resume.ui.exportPdf.hint"
      @click="openPrintForPdf"
    >
      <v-icon name="bi-download" scale="1.15" class="shrink-0" />
      <span>{{ resume.ui.exportPdf.button }}</span>
    </button>
    <p class="max-w-xs text-xs text-slate-500">{{ resume.ui.exportPdf.hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { useResume } from '@/composables/useResume'

const resume = useResume()

function openPrintForPdf() {
  window.print()
}
</script>
