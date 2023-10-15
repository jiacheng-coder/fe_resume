<template>
  <!-- Modal -->
  <section>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <label for="my-modal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">提示!</h3>
        <p class="py-4">内容已复制到剪贴板</p>
      </label>
    </label>
  </section>
  <!-- 主要内容 -->
  <div class="p-4 text-white duration-300 rounded-sm flex flex-col" style="background-color: #0284C7;">
    <!-- 头像、姓名、职位 -->
    <div class="flex justify-between items-center">
      <section class="flex items-center">
        <img class="h-24 object-fill rounded-xl" src="@/assets/images/avatar.jpg" />
        <h1 class="ml-4 text-2xl font-bold">{{ userInfo?.name }}</h1>
      </section>
      <h1 class="text-xl font-bold">{{ userInfo?.job }}</h1>
    </div>
    <!-- 联系方式 -->
    <div class="flex justify-between mt-4">
      <!-- 微信 -->
      <section class="flex items-center gap-1" @click="copyText(userInfo?.wechat)">
        <img src="@/assets/icons/wechat.svg" alt="">
        <label for="my-modal">{{ userInfo?.wechat }}</label>
      </section>
      <!-- 电话 -->
      <section class="flex items-center gap-1" @click="copyText(userInfo?.phone)">
        <img src="@/assets/icons/phone.svg" alt="">
        <label for="my-modal">{{ userInfo?.phone }}</label>
      </section>
      <!-- 邮箱 -->
      <section class="flex items-center gap-1" @click="copyText(userInfo?.email)">
        <img src="@/assets/icons/email.svg" alt="">
        <label for="my-modal">{{ userInfo?.email }}</label>
      </section>
    </div>
    <!-- 链接 -->
    <!-- <div class="flex flex-col" v-if="ifShowLinks">
        <a :href="userInfo?.resumeUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/link.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Resume</span>
        </a>
        <a :href="userInfo?.blogUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/introduce.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Blog</span>
        </a>
        <a :href="userInfo?.githubUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/github-fill.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Github</span>
        </a>
        <a :href="userInfo?.notionUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
          <img src="@/assets/icons/Notion.svg" alt="" class="header-icon">
          <span class="border-b-2 border-white">Notion</span>
        </a>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue"
import type { userInfoType } from "../../types/userInfo"
import copy from "copy-to-clipboard";
const props = defineProps({
  userInfo: {
    type: Object as PropType<userInfoType>
  }
})
const { userInfo } = props
let copyText = (text: string = '') => [
  copy(text)
]
const linkTo = (url: string) => {
  window.open(url, '_blank');
}

const ifShowLinks = ref(false)
</script>
