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

    <div
      class="resume-contact-row mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:mt-4 sm:grid-cols-3 sm:items-center sm:justify-between"
    >
      <section class="flex min-w-0 items-center gap-1" @click="copyText(resume.userInfo?.wechat)">
        <v-icon name="co-wechat" scale="1.2" class="shrink-0" />
        <label for="my-modal" class="min-w-0 break-words">{{ resume.userInfo?.wechat }}</label>
      </section>
      <section class="flex min-w-0 items-center gap-1" @click="copyText(resume.userInfo?.phone)">
        <v-icon name="bi-telephone-fill" scale="1.2" class="shrink-0" />
        <label for="my-modal" class="min-w-0">{{ resume.userInfo?.phone }}</label>
      </section>
      <section
        class="flex min-w-0 items-center gap-1 sm:justify-end"
        @click="copyText(resume.userInfo?.email)"
      >
        <v-icon name="md-markemailread-round" scale="1.2" class="shrink-0" />
        <label for="my-modal" class="min-w-0 break-all text-right sm:text-right">{{ resume.userInfo?.email }}</label>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import copy from 'copy-to-clipboard'
import { useResume } from '@/composables/useResume'
import defaultAvatarUrl from '@/assets/images/avatar.jpg?url'

const resume = useResume()

function publicAssetUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = import.meta.env.BASE_URL
  const rel = path.startsWith('/') ? path.slice(1) : path
  return `${base}${rel}`
}

const avatarSrc = computed(() => {
  const raw = resume.value.userInfo?.avatar?.trim()
  if (!raw) return defaultAvatarUrl
  return publicAssetUrl(raw)
})

const copyText = (text: string | undefined) => {
  if (text) copy(text)
}
</script>
