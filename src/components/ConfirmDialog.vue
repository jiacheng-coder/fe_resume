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
        <div ref="dialogRef" class="modal-box relative max-w-md" tabindex="-1">
          <h3 class="text-lg font-bold text-slate-800">{{ title }}</h3>
          <p v-if="message" class="mt-2 text-sm text-slate-600">{{ message }}</p>
          <!-- 输入框模式 -->
          <input
            v-if="inputMode"
            ref="inputRef"
            v-model="inputValue"
            type="text"
            :placeholder="inputPlaceholder"
            class="input input-bordered mt-4 w-full"
            @keydown.enter="onConfirm"
          />
          <div class="mt-6 flex justify-end gap-2">
            <button ref="cancelBtnRef" class="btn btn-ghost btn-sm" @click="onCancel">{{ cancelText }}</button>
            <button
              ref="confirmBtnRef"
              class="btn btn-sm"
              :class="confirmClass"
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

const props = withDefaults(defineProps<{
  modelValue: boolean
  title: string
  message?: string
  /** 是否为输入框模式（替代 prompt） */
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
/** 保存打开对话框前的焦点元素，关闭后恢复 */
let savedFocus: HTMLElement | null = null

watch(() => props.modelValue, (open) => {
  if (open) {
    // 保存当前焦点
    savedFocus = document.activeElement as HTMLElement | null
    inputValue.value = props.inputValue || ''
    nextTick(() => {
      if (props.inputMode) {
        inputRef.value?.focus()
        inputRef.value?.select()
      } else {
        // 非输入模式下，聚焦确认按钮以便键盘操作
        confirmBtnRef.value?.focus()
      }
    })
  } else {
    // 关闭时恢复焦点
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

// 组件卸载时也恢复焦点
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
  transition: opacity 0.2s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
