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
  <div class="p-4 h-full text-white duration-300 rounded-sm bg-my-green">
    <!-- 头像,姓名,职位 -->
    <div class="flex items-center">
      <div class="flex justify-center items-center h-40">
        <img class="h-40 mx-4 rounded-lg" src="@assets/images/avatar.jpg" />
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
            <img src="@assets/icons/wechat.svg" alt="">
            <label for="my-modal">{{ userInfo?.wechat }}</label>
          </section>
          <!-- 电话 -->
          <section class="flex gap-1" @click="copyText(userInfo?.phone || '')">
            <img src="@assets/icons/phone.svg" alt="">
            <label for="my-modal">{{ userInfo?.phone }}</label>
          </section>
          <!-- 邮箱 -->
          <section class="flex gap-1" @click="copyText(userInfo?.email || '')">
            <img src="@assets/icons/email.svg" alt="">
            <label for="my-modal">{{ userInfo?.email }}</label>
          </section>
        </div>
        <!-- 链接 -->
        <div class="flex gap-6 cursor-pointer">
          <section>
            <h1>链接:</h1>
          </section>
          <!-- Blog -->
          <section class="flex gap-1" @click="linkTo(userInfo?.blogUrl || '')">
            <img src="@assets/icons/link.svg" alt="">
            <span class="border-b-2 border-white">Blog</span>
          </section>
          <!-- Github -->
          <section class="flex gap-1">
            <img src="@assets/icons/github.svg" alt="">
            <span class="border-b-2 border-white" @click="linkTo(userInfo?.githubUrl || '')">Github</span>
          </section>
        </div>
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
