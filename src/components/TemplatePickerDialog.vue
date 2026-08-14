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
        <div ref="dialogRef" class="modal-box relative max-w-2xl rounded-sm p-0" tabindex="-1">
          <!-- 头部 -->
          <div class="flex items-center justify-between border-b border-[#e0e0e0] px-6 py-4">
            <div>
              <h3 class="text-base font-semibold text-[#161616]">新建简历</h3>
              <p class="mt-0.5 text-xs text-[#8c8c8c]">选择角色与布局，快速开始你的简历</p>
            </div>
            <button class="btn btn-ghost btn-xs btn-circle" @click="onCancel">✕</button>
          </div>

          <!-- 内容区 -->
          <div class="max-h-[60vh] overflow-y-auto px-6 py-5">
            <!-- ── 角色选择 ─────────────────────────────── -->
            <div class="mb-5">
              <div class="mb-2.5 flex items-center gap-2">
                <span class="text-sm font-medium text-[#161616]">选择角色</span>
                <span class="text-xs text-[#8c8c8c]">决定预填的技能、优势等内容</span>
              </div>
              <div class="grid gap-2.5 sm:grid-cols-3">
                <button
                  v-for="role in roles"
                  :key="role.id"
                  class="role-card group relative flex flex-col items-start gap-1.5 border p-3 text-left transition-all"
                  :class="selectedRoleId === role.id
                    ? 'border-[#0f62fe] bg-[#0f62fe]/5 ring-1 ring-[#0f62fe]'
                    : 'border-[#e0e0e0] bg-white hover:border-[#0f62fe]/50'"
                  @click="selectedRoleId = role.id"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-xl">{{ role.icon }}</span>
                    <span class="text-sm font-medium text-[#161616]">{{ role.name }}</span>
                  </div>
                  <p class="text-xs leading-relaxed text-[#525252]">{{ role.description }}</p>
                  <div
                    v-if="selectedRoleId === role.id"
                    class="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0f62fe] text-[10px] text-white"
                  >✓</div>
                </button>
              </div>
            </div>

            <!-- ── 布局选择 ─────────────────────────────── -->
            <div class="mb-5">
              <div class="mb-2.5 flex items-center gap-2">
                <span class="text-sm font-medium text-[#161616]">选择布局</span>
                <span class="text-xs text-[#8c8c8c]">决定简历的视觉排版风格</span>
              </div>
              <div class="grid gap-2.5 sm:grid-cols-3">
                <button
                  v-for="tpl in templates"
                  :key="tpl.id"
                  class="layout-card group relative flex flex-col gap-2 border p-3 text-left transition-all"
                  :class="selectedTemplateId === tpl.id
                    ? 'border-[#0f62fe] bg-[#0f62fe]/5 ring-1 ring-[#0f62fe]'
                    : 'border-[#e0e0e0] bg-white hover:border-[#0f62fe]/50'"
                  @click="selectedTemplateId = tpl.id"
                >
                  <!-- 迷你预览 -->
                  <div
                    class="flex h-16 w-full overflow-hidden rounded-sm border border-[#e0e0e0]"
                    :style="{ background: tpl.thumbnailColor + '10' }"
                  >
                    <!-- 根据布局类型渲染不同迷你预览 -->
                    <template v-if="tpl.id === 'classic'">
                      <div class="flex w-full flex-col gap-1 p-1.5">
                        <div class="h-2 w-12 rounded-sm" :style="{ background: tpl.thumbnailColor }"></div>
                        <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                        <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                        <div class="h-1 w-3/4 rounded-sm bg-[#e0e0e0]"></div>
                      </div>
                    </template>
                    <template v-else-if="tpl.id === 'modern'">
                      <div class="flex w-full gap-1 p-1.5">
                        <div class="flex w-1/3 flex-col gap-1">
                          <div class="h-2 w-full rounded-sm" :style="{ background: tpl.thumbnailColor }"></div>
                          <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                          <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                        </div>
                        <div class="flex flex-1 flex-col gap-1">
                          <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                          <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                          <div class="h-1 w-2/3 rounded-sm bg-[#e0e0e0]"></div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="flex w-full flex-col gap-1 p-1.5">
                        <div class="flex gap-1">
                          <div class="h-1.5 w-8 rounded-sm" :style="{ background: tpl.thumbnailColor }"></div>
                          <div class="h-1.5 w-8 rounded-sm" :style="{ background: tpl.thumbnailColor + '80' }"></div>
                          <div class="h-1.5 w-8 rounded-sm" :style="{ background: tpl.thumbnailColor + '50' }"></div>
                        </div>
                        <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                        <div class="h-1 w-full rounded-sm bg-[#e0e0e0]"></div>
                        <div class="h-1 w-3/4 rounded-sm bg-[#e0e0e0]"></div>
                      </div>
                    </template>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-[#161616]">{{ tpl.name }}</div>
                    <p class="mt-0.5 text-xs leading-relaxed text-[#525252]">{{ tpl.description }}</p>
                  </div>
                  <div
                    v-if="selectedTemplateId === tpl.id"
                    class="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0f62fe] text-[10px] text-white"
                  >✓</div>
                </button>
              </div>
            </div>

            <!-- ── 标题输入 ─────────────────────────────── -->
            <div>
              <label class="mb-1.5 block text-sm font-medium text-[#161616]">简历标题</label>
              <input
                ref="titleInputRef"
                v-model="title"
                type="text"
                placeholder="例如：社招版 / 校招版 / 英文版"
                class="w-full rounded-sm border border-[#e0e0e0] px-3 py-2 text-sm text-[#161616] outline-none transition-colors focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe]"
                @keydown.enter="onConfirm"
              />
            </div>
          </div>

          <!-- 底部操作 -->
          <div class="flex items-center justify-between border-t border-[#e0e0e0] px-6 py-3">
            <div class="text-xs text-[#8c8c8c]">
              已选择：<span class="text-[#161616]">{{ selectedRole?.name }}</span>
              · <span class="text-[#161616]">{{ selectedTemplate?.name }}</span>
            </div>
            <div class="flex gap-2">
              <button
                class="rounded-sm border border-[#e0e0e0] bg-white px-4 py-1.5 text-xs font-medium text-[#525252] transition-colors hover:border-[#0f62fe] hover:text-[#0f62fe]"
                @click="onCancel"
              >取消</button>
              <button
                class="rounded-sm bg-[#0f62fe] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0043ce] disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!title.trim()"
                @click="onConfirm"
              >创建</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
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
  transition: opacity 0.2s ease;
}
.tpl-fade-enter-from,
.tpl-fade-leave-to {
  opacity: 0;
}

.role-card,
.layout-card {
  border-radius: 2px;
}

.modal-box {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
}
</style>
