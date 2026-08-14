<template>
  <!-- 复制提示 Modal（Vue 响应式控制，避免 ID 碰撞） -->
  <transition name="fade">
    <div
      v-if="showCopyTip"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click="showCopyTip = false"
    >
      <div class="modal-box relative rounded-lg bg-base-100 p-6 shadow-xl" @click.stop>
        <h3 class="text-lg font-bold">{{ resume.ui.copy.title }}</h3>
        <p class="py-4">{{ resume.ui.copy.message }}</p>
        <div class="text-right">
          <button class="btn btn-sm btn-primary" @click="showCopyTip = false">确定</button>
        </div>
      </div>
    </div>
  </transition>

  <div
    ref="headerRef"
    class="resume-header p-4 text-white duration-300 rounded-sm flex flex-col"
    :style="{ backgroundColor: resume.ui.theme.headerBackground }"
  >
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <section class="flex sm:gap-[0] flex-col sm:flex-row sm:items-center">
        <img ref="avatarRef" class="h-36 sm:h-24 object-cover rounded-xl" :src="avatarSrc" alt="" style="opacity: 0" />
        <h1 ref="nameRef" class="text-center mt-2 sm:ml-4 text-2xl font-bold" style="opacity: 0">{{ resume.userInfo?.name }}</h1>
      </section>
      <h1 ref="jobRef" class="mt-1 sm:mt-0 text-xl font-bold" style="opacity: 0">{{ resume.userInfo?.job }}</h1>
    </div>

    <div
      class="resume-contact-row mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:mt-4 sm:grid-cols-3 sm:items-center sm:justify-between"
    >
      <section ref="contact1Ref" class="flex min-w-0 items-center gap-1 cursor-pointer" style="opacity: 0" @click="onContactClick(resume.userInfo?.wechat)">
        <v-icon name="co-wechat" scale="1.2" class="shrink-0" />
        <span class="min-w-0 break-words">{{ resume.userInfo?.wechat }}</span>
      </section>
      <section ref="contact2Ref" class="flex min-w-0 items-center gap-1 cursor-pointer" style="opacity: 0" @click="onContactClick(resume.userInfo?.phone)">
        <v-icon name="bi-telephone-fill" scale="1.2" class="shrink-0" />
        <span class="min-w-0">{{ resume.userInfo?.phone }}</span>
      </section>
      <section
        ref="contact3Ref"
        class="flex min-w-0 items-center gap-1 sm:justify-end cursor-pointer"
        style="opacity: 0"
        @click="onContactClick(resume.userInfo?.email)"
      >
        <v-icon name="md-markemailread-round" scale="1.2" class="shrink-0" />
        <span class="min-w-0 break-all text-right sm:text-right">{{ resume.userInfo?.email }}</span>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { animate, stagger } from 'animejs'
import copy from 'copy-to-clipboard'
import { useResume } from '@/composables/useResume'
import { publicAssetUrl } from '@/utils/publicAsset'
import defaultAvatarUrl from '@/assets/images/default-avatar.svg?url'

const resume = useResume()

const avatarRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const jobRef = ref<HTMLElement | null>(null)
const contact1Ref = ref<HTMLElement | null>(null)
const contact2Ref = ref<HTMLElement | null>(null)
const contact3Ref = ref<HTMLElement | null>(null)

const showCopyTip = ref(false)

const avatarSrc = computed(() => {
  const raw = resume.value.userInfo?.avatar?.trim()
  if (!raw) return defaultAvatarUrl
  return publicAssetUrl(raw)
})

/** 点击联系方式：复制内容并显示提示 */
function onContactClick(text: string | undefined) {
  if (text) {
    copy(text)
    showCopyTip.value = true
    // 3 秒后自动关闭
    setTimeout(() => { showCopyTip.value = false }, 3000)
  }
}

onMounted(() => {
  nextTick(() => {
    // 头像弹入
    if (avatarRef.value) {
      animate(avatarRef.value, {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 700,
        ease: 'outBack',
      })
    }
    // 姓名淡入上滑
    if (nameRef.value) {
      animate(nameRef.value, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
        delay: 200,
        ease: 'outExpo',
      })
    }
    // 职位淡入
    if (jobRef.value) {
      animate(jobRef.value, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
        delay: 300,
        ease: 'outExpo',
      })
    }
    // 联系方式交错入场
    const contacts = [contact1Ref.value, contact2Ref.value, contact3Ref.value].filter(Boolean)
    if (contacts.length > 0) {
      animate(contacts, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 400,
        delay: stagger(100, { start: 400 }),
        ease: 'outExpo',
      })
    }
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
