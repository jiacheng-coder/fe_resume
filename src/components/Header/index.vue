<template>
  <!-- Modal -->
  <section>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <label for="my-modal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">{{ resume.ui.copy.title }}</h3>
        <p class="py-4">{{ resume.ui.copy.message }}</p>
      </label>
    </label>
  </section>

  <div
    class="resume-header p-4 text-white duration-300 rounded-sm flex flex-col"
    :style="{ backgroundColor: resume.ui.theme.headerBackground }"
  >
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <section class="flex sm:gap-[0] flex-col sm:flex-row sm:items-center">
        <img class="h-36 sm:h-24 object-cover rounded-xl" :src="avatarSrc" alt="" />
        <h1 class="text-center mt-2 sm:ml-4 text-2xl font-bold">{{ resume.userInfo?.name }}</h1>
      </section>
      <h1 class="mt-1 sm:mt-0 text-xl font-bold">{{ resume.userInfo?.job }}</h1>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between mt-2 gap-1 sm:mt-4">
      <section class="w-1/2 sm:w-1/3 flex items-center gap-1" @click="copyText(resume.userInfo?.wechat)">
        <v-icon name="co-wechat" scale="1.2" />
        <label for="my-modal">{{ resume.userInfo?.wechat }}</label>
      </section>
      <section class="w-1/2 sm:w-1/3 flex items-center gap-1" @click="copyText(resume.userInfo?.phone)">
        <v-icon name="bi-telephone-fill" scale="1.2" />
        <label for="my-modal">{{ resume.userInfo?.phone }}</label>
      </section>
      <section class="w-1/2 sm:w-1/3 flex sm:justify-end items-center gap-1" @click="copyText(resume.userInfo?.email)">
        <v-icon name="md-markemailread-round" scale="1.2" />
        <label for="my-modal">{{ resume.userInfo?.email }}</label>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ResumeData } from '@/types/resume'
import copy from 'copy-to-clipboard'
import defaultAvatarUrl from '@/assets/images/avatar.jpg?url'

const resume = inject<ResumeData>('resume')!

function publicAssetUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = import.meta.env.BASE_URL
  const rel = path.startsWith('/') ? path.slice(1) : path
  return `${base}${rel}`
}

const avatarSrc = computed(() => {
  const raw = resume.userInfo.avatar?.trim()
  if (!raw) return defaultAvatarUrl
  return publicAssetUrl(raw)
})

const copyText = (text: string | undefined) => {
  if (text) copy(text)
}
</script>
