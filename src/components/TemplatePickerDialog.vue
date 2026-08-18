<template>
  <Teleport to="body">
    <transition name="tpl-fade">
      <div
        v-if="modelValue"
        class="modal modal-open"
        role="dialog"
        aria-modal="true"
        aria-label="选择模板"
        @click.self="onCancel"
        @keydown.esc="onCancel"
      >
        <div ref="dialogRef" class="modal-box relative max-w-2xl overflow-hidden rounded-xl p-0" tabindex="-1">
          <!-- 顶部渐变装饰条 -->
          <div class="h-1 w-full bg-gradient-to-r from-[#0f62fe] to-[#6f8fff]"></div>

          <!-- 头部 -->
          <div class="flex items-center justify-between px-6 pb-4 pt-5">
            <div>
              <h3 class="text-lg font-bold text-[#161616]">新建简历</h3>
              <p class="mt-1 text-xs text-[#6f6f6f]">选择角色与布局，快速开始你的简历</p>
            </div>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-[#6f6f6f] transition-all hover:bg-[#f4f4f4] hover:text-[#161616]"
              @click="onCancel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <!-- 内容区 -->
          <div class="max-h-[60vh] overflow-y-auto px-6 pb-5">
            <!-- ── 角色选择 ─────────────────────────────── -->
            <div class="mb-6">
              <div class="mb-3 flex items-center gap-2">
                <span class="text-sm font-semibold text-[#161616]">选择角色</span>
                <span class="rounded-md bg-[#0f62fe]/8 px-2 py-0.5 text-[11px] font-medium text-[#0f62fe]">决定预填内容</span>
              </div>
              <div class="grid gap-3 sm:grid-cols-3">
                <button
                  v-for="role in roles"
                  :key="role.id"
                  class="role-card group relative flex flex-col items-start gap-2 overflow-hidden border p-4 text-left transition-all duration-200"
                  :class="selectedRoleId === role.id
                    ? 'border-[#0f62fe] bg-gradient-to-br from-[#0f62fe]/5 to-[#6f8fff]/5 shadow-[0_2px_12px_rgba(15,98,254,0.12)]'
                    : 'border-[#e0e0e0] bg-white hover:border-[#0f62fe]/40 hover:shadow-[0_2px_12px_rgba(15,98,254,0.08)]'"
                  @click="selectedRoleId = role.id"
                >
                  <!-- 顶部渐变条 (选中态) -->
                  <div
                    class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#0f62fe] to-[#6f8fff] transition-transform duration-300 origin-left"
                    :class="selectedRoleId === role.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
                  ></div>
                  <div class="flex items-center gap-2.5">
                    <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f4f4] text-lg transition-colors group-hover:bg-[#0f62fe]/8">{{ role.icon }}</span>
                    <span class="text-sm font-semibold text-[#161616]">{{ role.name }}</span>
                  </div>
                  <p class="text-xs leading-relaxed text-[#525252]">{{ role.description }}</p>
                  <!-- 选中标记 -->
                  <div
                    v-if="selectedRoleId === role.id"
                    class="absolute right-2.5 top-3 flex h-5 w-5 items-center justify-center rounded-md bg-[#0f62fe] shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- ── 布局选择 ─────────────────────────────── -->
            <div class="mb-6">
              <div class="mb-3 flex items-center gap-2">
                <span class="text-sm font-semibold text-[#161616]">选择布局</span>
                <span class="rounded-md bg-[#0f62fe]/8 px-2 py-0.5 text-[11px] font-medium text-[#0f62fe]">视觉排版</span>
              </div>
              <div class="grid gap-3 sm:grid-cols-3">
                <button
                  v-for="tpl in templates"
                  :key="tpl.id"
                  class="layout-card group relative flex flex-col gap-2.5 overflow-hidden border p-4 text-left transition-all duration-200"
                  :class="selectedTemplateId === tpl.id
                    ? 'border-[#0f62fe] bg-gradient-to-br from-[#0f62fe]/5 to-[#6f8fff]/5 shadow-[0_2px_12px_rgba(15,98,254,0.12)]'
                    : 'border-[#e0e0e0] bg-white hover:border-[#0f62fe]/40 hover:shadow-[0_2px_12px_rgba(15,98,254,0.08)]'"
                  @click="selectedTemplateId = tpl.id"
                >
                  <!-- 顶部渐变条 -->
                  <div
                    class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#0f62fe] to-[#6f8fff] transition-transform duration-300 origin-left"
                    :class="selectedTemplateId === tpl.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
                  ></div>
                  <!-- 迷你预览 -->
                  <div
                    class="flex h-[4.5rem] w-full overflow-hidden rounded-lg border border-[#e0e0e0]/60 bg-white"
                  >
                    <template v-if="tpl.id === 'classic'">
                      <div class="flex w-full flex-col gap-1.5 p-2">
                        <div class="h-2 w-14 rounded" :style="{ background: tpl.thumbnailColor }"></div>
                        <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                        <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                        <div class="h-1.5 w-3/4 rounded bg-[#e0e0e0]/70"></div>
                      </div>
                    </template>
                    <template v-else-if="tpl.id === 'modern'">
                      <div class="flex w-full gap-1.5 p-2">
                        <div class="flex w-1/3 flex-col gap-1.5">
                          <div class="h-2.5 w-full rounded" :style="{ background: tpl.thumbnailColor }"></div>
                          <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                          <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                        </div>
                        <div class="flex flex-1 flex-col gap-1.5">
                          <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                          <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                          <div class="h-1.5 w-2/3 rounded bg-[#e0e0e0]/70"></div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="flex w-full flex-col gap-1.5 p-2">
                        <div class="flex gap-1.5">
                          <div class="h-2 w-9 rounded" :style="{ background: tpl.thumbnailColor }"></div>
                          <div class="h-2 w-9 rounded" :style="{ background: tpl.thumbnailColor + '80' }"></div>
                          <div class="h-2 w-9 rounded" :style="{ background: tpl.thumbnailColor + '50' }"></div>
                        </div>
                        <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                        <div class="h-1.5 w-full rounded bg-[#e0e0e0]/70"></div>
                        <div class="h-1.5 w-3/4 rounded bg-[#e0e0e0]/70"></div>
                      </div>
                    </template>
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-[#161616]">{{ tpl.name }}</div>
                    <p class="mt-0.5 text-xs leading-relaxed text-[#525252]">{{ tpl.description }}</p>
                  </div>
                  <!-- 选中标记 -->
                  <div
                    v-if="selectedTemplateId === tpl.id"
                    class="absolute right-2.5 top-3 flex h-5 w-5 items-center justify-center rounded-md bg-[#0f62fe] shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- ── 标题输入 ─────────────────────────────── -->
            <div>
              <label class="mb-2 block text-sm font-semibold text-[#161616]">简历标题</label>
              <input
                ref="titleInputRef"
                v-model="title"
                type="text"
                placeholder="例如：社招版 / 校招版 / 英文版"
                class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-2.5 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20"
                @keydown.enter="onConfirm"
              />
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="flex items-center justify-between border-t border-[#e8e8e8] bg-[#fafafa] px-6 py-4">
            <div class="text-xs text-[#6f6f6f]">
              已选择：<span class="font-medium text-[#161616]">{{ selectedRole?.name }}</span>
              · <span class="font-medium text-[#161616]">{{ selectedTemplate?.name }}</span>
            </div>
            <div class="flex gap-3">
              <button
                class="rounded-lg border border-[#e0e0e0] bg-white px-5 py-2 text-xs font-medium text-[#525252] transition-all duration-200 hover:border-[#0f62fe]/50 hover:text-[#0f62fe] hover:shadow-sm"
                @click="onCancel"
              >取消</button>
              <button
                class="rounded-lg bg-gradient-to-r from-[#0f62fe] to-[#4589ff] px-5 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(15,98,254,0.3)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(15,98,254,0.4)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                :disabled="!title.trim()"
                @click="onConfirm"
              >创建简历</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { animate, stagger } from 'animejs'
import { templates, roles, defaultTemplateId, defaultRoleId, getTemplate, getRole } from '@/templates/registry'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', payload: { title: string; templateId: string; roleId: string }): void
}>()

const dialogRef = ref<HTMLElement | null>(null)
const titleInputRef = ref<HTMLInputElement | null>(null)
const title = ref('')
const selectedRoleId = ref(defaultRoleId)
const selectedTemplateId = ref(defaultTemplateId)

const selectedRole = computed(() => getRole(selectedRoleId.value))
const selectedTemplate = computed(() => getTemplate(selectedTemplateId.value))

watch(() => props.modelValue, (open) => {
  if (open) {
    title.value = ''
    selectedRoleId.value = defaultRoleId
    selectedTemplateId.value = defaultTemplateId
    nextTick(() => {
      titleInputRef.value?.focus()
      // 入场动画
      if (dialogRef.value) {
        animate(dialogRef.value, {
          opacity: [0, 1],
          scale: [0.95, 1],
          translateY: [12, 0],
          duration: 350,
          ease: 'outExpo',
        })
        // 卡片交错入场
        const cards = dialogRef.value.querySelectorAll('.role-card, .layout-card')
        animate(cards, {
          opacity: [0, 1],
          translateY: [16, 0],
          delay: stagger(50, { start: 80 }),
          duration: 400,
          ease: 'outExpo',
        })
      }
    })
  }
})

function onConfirm() {
  const trimmed = title.value.trim()
  if (!trimmed) return
  emit('confirm', {
    title: trimmed,
    templateId: selectedTemplateId.value,
    roleId: selectedRoleId.value,
  })
  emit('update:modelValue', false)
}

function onCancel() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.tpl-fade-enter-active,
.tpl-fade-leave-active {
  transition: opacity 0.25s ease;
}
.tpl-fade-enter-from,
.tpl-fade-leave-to {
  opacity: 0;
}

.role-card,
.layout-card {
  border-radius: 12px;
}

.modal-box {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03) !important;
  border-radius: 16px !important;
}
</style>
