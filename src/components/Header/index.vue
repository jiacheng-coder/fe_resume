<template>
  <!-- Modal -->
  <div>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <label for="my-modal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">提示!</h3>
        <p class="py-4">内容已复制到剪贴板</p>
      </label>
    </label>
  </div>
  <!-- 主要内容 -->
  <div class="p-4 h-full text-white duration-300 rounded-sm bg-my-green flex items-center gap-4">
    <div class="flex items-center">
      <img class="h-40 rounded-lg" src="@/assets/images/avatar.jpg" />
    </div>
    <div class="h-40 flex flex-col justify-evenly">
      <h1 class="text-2xl font-bold">{{ userInfo?.name }}</h1>
      <h1 class="text-xl font-bold">{{ userInfo?.job }}</h1>
      <!-- 联系方式 -->
      <div class="flex gap-6 cursor-pointer">
        <section>
          <h1>联系方式:</h1>
        </section>
        <!-- 微信 -->
        <section class="flex gap-1" @click="copyText(userInfo?.wechat || '')">
          <img src="@/assets/icons/wechat.svg" alt="">
          <label for="my-modal">{{ userInfo?.wechat }}</label>
        </section>
        <!-- 电话 -->
        <section class="flex gap-1" @click="copyText(userInfo?.phone || '')">
          <img src="@/assets/icons/phone.svg" alt="">
          <label for="my-modal">{{ userInfo?.phone }}</label>
        </section>
        <!-- 邮箱 -->
        <section class="flex gap-1" @click="copyText(userInfo?.email || '')">
          <img src="@/assets/icons/email.svg" alt="">
          <label for="my-modal">{{ userInfo?.email }}</label>
        </section>
      </div>
      <!-- 链接 -->
      <div class="flex gap-6 cursor-pointer">
        <section>
          <h1>链接:</h1>
        </section>
        <!-- Resume -->
        <a :href="userInfo?.resumeUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/link.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Resume</span>
        </a>
        <!-- Blog -->
        <a :href="userInfo?.blogUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/introduce.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Blog</span>
        </a>
        <!-- Github -->
        <a :href="userInfo?.githubUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/github-fill.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Github</span>
        </a>
        <!-- Notion -->
        <a :href="userInfo?.notionUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/Notion.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Notion</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import type { userInfoType } from "../../types/userInfo"
import copy from "copy-to-clipboard";
const props = defineProps({
  userInfo: {
    type: Object as PropType<userInfoType>
  }
})
const { userInfo } = props
let copyText = (text: string) => [
  copy(text)
]
const linkTo = (url: string) => {
  window.open(url, '_blank');
}
</script>
