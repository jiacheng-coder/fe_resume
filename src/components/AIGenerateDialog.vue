<template>
  <Teleport to="body">
    <transition name="ai-fade">
      <div
        v-if="modelValue"
        class="modal modal-open"
        role="dialog"
        aria-modal="true"
        aria-label="AI 生成简历"
        @click.self="onCancel"
        @keydown.esc="onCancel"
      >
        <div ref="dialogRef" class="modal-box relative max-w-2xl overflow-hidden rounded-xl p-0" tabindex="-1">
          <!-- 顶部渐变装饰条 -->
          <div class="h-1 w-full bg-gradient-to-r from-[#0f62fe] to-[#6f8fff]"></div>

          <!-- 头部 -->
          <div class="flex items-center justify-between px-6 pb-4 pt-5">
            <div>
              <h3 class="flex items-center gap-2 text-lg font-bold text-[#161616]">
                AI 生成简历
                <span class="rounded-md bg-[#0f62fe]/8 px-2 py-0.5 text-[11px] font-medium text-[#0f62fe]">GLM</span>
              </h3>
              <p class="mt-1 text-xs text-[#6f6f6f]">输入一段自我描述，AI 自动生成结构化简历</p>
            </div>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-[#6f6f6f] transition-all hover:bg-[#f4f4f4] hover:text-[#161616] disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="generating"
              @click="onCancel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <!-- 内容区 -->
          <div class="max-h-[60vh] overflow-y-auto px-6 pb-5">
            <!-- ── 布局选择 ─────────────────────────────── -->
            <div class="mb-5">
              <div class="mb-3 flex items-center gap-2">
                <span class="text-sm font-semibold text-[#161616]">选择布局</span>
                <span class="rounded-md bg-[#0f62fe]/8 px-2 py-0.5 text-[11px] font-medium text-[#0f62fe]">决定简历结构</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="tpl in templates"
                  :key="tpl.id"
                  class="group relative flex flex-col gap-2 overflow-hidden border p-3 text-left transition-all duration-200 disabled:cursor-not-allowed"
                  :class="selectedTemplateId === tpl.id
                    ? 'border-[#0f62fe] bg-gradient-to-br from-[#0f62fe]/5 to-[#6f8fff]/5 shadow-[0_2px_12px_rgba(15,98,254,0.12)]'
                    : 'border-[#e0e0e0] bg-white hover:border-[#0f62fe]/40 hover:shadow-[0_2px_12px_rgba(15,98,254,0.08)]'"
                  :disabled="generating"
                  @click="selectedTemplateId = tpl.id"
                >
                  <div
                    class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#0f62fe] to-[#6f8fff] transition-transform duration-300 origin-left"
                    :class="selectedTemplateId === tpl.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
                  ></div>
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded" :style="{ background: tpl.thumbnailColor }"></span>
                    <span class="text-sm font-semibold text-[#161616]">{{ tpl.name }}</span>
                  </div>
                  <p class="text-xs leading-relaxed text-[#525252]">{{ tpl.tags.join(' · ') }}</p>
                  <div
                    v-if="selectedTemplateId === tpl.id"
                    class="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded bg-[#0f62fe] shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- ── 自述描述 ─────────────────────────────── -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <label class="text-sm font-semibold text-[#161616]">自我描述</label>
                <span class="text-[11px] text-[#a8a8a8]">{{ description.length }} / 2000</span>
              </div>
              <textarea
                ref="textareaRef"
                v-model="description"
                rows="6"
                maxlength="2000"
                placeholder="例如：我叫张三，本科北邮计算机专业，毕业后在美团做前端开发 3 年，主要负责营销活动 H5 搭建平台（Vue3 + TypeScript），做过首屏性能优化（3 秒降到 1.2 秒），带过 3 人小组。会 Vue、React、Vite、Node.js。"
                class="w-full resize-none rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-3 text-sm leading-relaxed text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20 disabled:opacity-60"
                :disabled="generating"
                @keydown.ctrl.enter="onGenerate"
                @keydown.meta.enter="onGenerate"
              ></textarea>
              <p class="mt-2 text-xs text-[#a8a8a8]">提示：写得越具体（公司、项目、数据、技术栈），生成效果越好；AI 不会编造你没提供的信息。</p>
            </div>

            <!-- ── 错误提示 ─────────────────────────────── -->
            <div
              v-if="errorMsg"
              class="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600"
            >
              <svg class="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              <span>{{ errorMsg }}</span>
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="flex items-center justify-between border-t border-[#e8e8e8] bg-[#fafafa] px-6 py-4">
            <div class="text-xs text-[#6f6f6f]">
              {{ generating ? 'AI 正在生成，约需 10~30 秒，请勿关闭窗口' : '快捷键 ⌘/Ctrl + Enter 快速生成' }}
            </div>
            <div class="flex gap-3">
              <button
                class="rounded-lg border border-[#e0e0e0] bg-white px-5 py-2 text-xs font-medium text-[#525252] transition-all duration-200 hover:border-[#0f62fe]/50 hover:text-[#0f62fe] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="generating"
                @click="onCancel"
              >取消</button>
              <button
                class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0f62fe] to-[#4589ff] px-5 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(15,98,254,0.3)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(15,98,254,0.4)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                :disabled="generating || !isValid"
                @click="onGenerate"
              >
                <svg
                  v-if="generating"
                  class="h-3.5 w-3.5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                ><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <svg
                  v-else
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
                <span>{{ generating ? '生成中…' : '开始生成' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { animate } from 'animejs'
import { templates, defaultTemplateId } from '@/templates/registry'
import { generateResumeFromDescription } from '@/services/ai/generateResume'
import type { ResumeData } from '@/types/resume'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'success', payload: { data: ResumeData; templateId: string }): void
}>()

const dialogRef = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const description = ref('')
const selectedTemplateId = ref(defaultTemplateId)
const generating = ref(false)
const errorMsg = ref('')

const DESCRIPTION_MIN = 10

const isValid = computed(() => description.value.trim().length >= DESCRIPTION_MIN)

watch(() => props.modelValue, (open) => {
  if (open) {
    description.value = ''
    selectedTemplateId.value = defaultTemplateId
    errorMsg.value = ''
    generating.value = false
    nextTick(() => {
      textareaRef.value?.focus()
      if (dialogRef.value) {
        animate(dialogRef.value, {
          opacity: [0, 1],
          scale: [0.95, 1],
          translateY: [12, 0],
          duration: 350,
          ease: 'outExpo',
        })
      }
    })
  }
})

async function onGenerate() {
  const trimmed = description.value.trim()
  if (generating.value || trimmed.length < DESCRIPTION_MIN) return

  generating.value = true
  errorMsg.value = ''
  try {
    const data = await generateResumeFromDescription(trimmed, selectedTemplateId.value)
    emit('success', { data, templateId: selectedTemplateId.value })
    emit('update:modelValue', false)
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : '生成失败，请稍后重试'
  } finally {
    generating.value = false
  }
}

function onCancel() {
  if (generating.value) return
  emit('update:modelValue', false)
}
</script>

<style scoped>
.ai-fade-enter-active,
.ai-fade-leave-active {
  transition: opacity 0.25s ease;
}
.ai-fade-enter-from,
.ai-fade-leave-to {
  opacity: 0;
}

.modal-box {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03) !important;
  border-radius: 16px !important;
}
</style>
