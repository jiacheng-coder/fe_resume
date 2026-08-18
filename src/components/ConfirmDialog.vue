<template>
  <Teleport to="body">
    <transition name="dialog-fade">
      <div
        v-if="modelValue"
        class="modal modal-open"
        role="alertdialog"
        aria-modal="true"
        :aria-label="title"
        @click.self="onBackdrop"
        @keydown.esc="onCancel"
      >
        <div ref="dialogRef" class="dialog-box relative w-full max-w-md overflow-hidden bg-white" tabindex="-1">
          <!-- 顶部渐变装饰条 -->
          <div class="h-1 w-full bg-gradient-to-r from-[#0f62fe] to-[#6f8fff]"></div>

          <!-- 头部 -->
          <div class="px-6 pb-4 pt-5">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-bold text-[#161616]">{{ title }}</h3>
              <button
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#6f6f6f] transition-all hover:bg-[#f4f4f4] hover:text-[#161616]"
                @click="onCancel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <p v-if="message" class="mt-2 text-sm leading-relaxed text-[#525252]">{{ message }}</p>
          </div>

          <!-- 输入框模式 -->
          <div v-if="inputMode" class="px-6">
            <input
              ref="inputRef"
              v-model="inputValue"
              type="text"
              :placeholder="inputPlaceholder"
              class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-2.5 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20"
              @keydown.enter="onConfirm"
            />
          </div>

          <!-- 底部操作 -->
          <div class="mt-6 flex items-center justify-end gap-3 border-t border-[#e8e8e8] bg-[#fafafa] px-6 py-4">
            <button
              ref="cancelBtnRef"
              class="rounded-lg border border-[#e0e0e0] bg-white px-5 py-2 text-xs font-medium text-[#525252] transition-all duration-200 hover:border-[#0f62fe]/50 hover:text-[#0f62fe] hover:shadow-sm"
              @click="onCancel"
            >{{ cancelText }}</button>
            <button
              ref="confirmBtnRef"
              class="rounded-lg px-5 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(15,98,254,0.3)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(15,98,254,0.4)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              :class="confirmClass === 'btn-warning'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.4)]'
                : 'bg-gradient-to-r from-[#0f62fe] to-[#4589ff]'"
              :disabled="inputMode && !inputValue.trim()"
              @click="onConfirm"
            >{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { animate } from 'animejs'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title: string
  message?: string
  inputMode?: boolean
  inputValue?: string
  inputPlaceholder?: string
  confirmText?: string
  cancelText?: string
  confirmClass?: string
}>(), {
  confirmText: '确认',
  cancelText: '取消',
  confirmClass: 'btn-primary',
})

const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'cancel',
])

const inputValue = ref(props.inputValue || '')
const inputRef = ref<HTMLInputElement | null>(null)
const dialogRef = ref<HTMLElement | null>(null)
const cancelBtnRef = ref<HTMLButtonElement | null>(null)
const confirmBtnRef = ref<HTMLButtonElement | null>(null)
let savedFocus: HTMLElement | null = null

watch(() => props.modelValue, (open) => {
  if (open) {
    savedFocus = document.activeElement as HTMLElement | null
    inputValue.value = props.inputValue || ''
    nextTick(() => {
      if (dialogRef.value) {
        animate(dialogRef.value, {
          opacity: [0, 1],
          scale: [0.95, 1],
          translateY: [12, 0],
          duration: 350,
          ease: 'outExpo',
        })
      }
      if (props.inputMode) {
        inputRef.value?.focus()
        inputRef.value?.select()
      } else {
        confirmBtnRef.value?.focus()
      }
    })
  } else {
    if (savedFocus) {
      nextTick(() => savedFocus?.focus())
      savedFocus = null
    }
  }
})

watch(() => props.inputValue, (v) => {
  if (v !== undefined) inputValue.value = v
})

function onConfirm() {
  emit('confirm', inputValue.value)
  emit('update:modelValue', false)
}

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function onBackdrop() {
  onCancel()
}

onBeforeUnmount(() => {
  if (savedFocus) {
    savedFocus.focus()
    savedFocus = null
  }
})
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.25s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-box {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
}
</style>
