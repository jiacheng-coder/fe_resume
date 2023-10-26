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
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <section class="flex sm:gap-[0] flex-col sm:flex-row sm:items-center">
        <img class="h-36 sm:h-24 object-fill rounded-xl" src="@/assets/images/avatar.jpg" />
        <h1 class="text-center mt-2 sm:ml-4 text-2xl font-bold">{{ userInfo?.name }}</h1>
      </section>
      <h1 class="mt-1 sm:mt-0 text-xl font-bold">{{ userInfo?.job }}</h1>
    </div>

    <!-- 联系方式 -->
    <div class="flex flex-col sm:flex-row items-center justify-between mt-2 gap-1 sm:mt-4">
      <!-- 微信 -->
      <section class="w-1/2 sm:w-1/3 flex items-center gap-1" @click="copyText(userInfo?.wechat)">
        <v-icon name="co-wechat" scale="1.2" />
        <label for="my-modal">{{ userInfo?.wechat }}</label>
      </section>
      <!-- 电话 -->
      <section class="w-1/2 sm:w-1/3 flex items-center gap-1" @click="copyText(userInfo?.phone)">
        <v-icon name="bi-telephone-fill" scale="1.2" />
        <label for="my-modal">{{ userInfo?.phone }}</label>
      </section>
      <!-- 邮箱 -->
      <section class="w-1/2 sm:w-1/3 flex sm:justify-end items-center gap-1" @click="copyText(userInfo?.email)">
        <v-icon name="md-markemailread-round" scale="1.2" />
        <label for="my-modal">{{ userInfo?.email }}</label>
      </section>
    </div>

    <!-- 链接 -->
    <!-- <div class="flex justify-between text-lg" v-if="ifShowLinks">
      <a :href="userInfo?.resumeUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
        <v-icon name="ai-ideas-repec" scale="1.5" />
        <span>Resume</span>
      </a>
      <a :href="userInfo?.blogUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
        <v-icon name="si-microdotblog" scale="1.5" />
        <span>Blog</span>
      </a>
      <a :href="userInfo?.githubUrl" target="_blank" rel="noopener noreferrer" class="flex gap-1 items-center">
        <v-icon name="bi-github" scale="1.5" />
        <span>Github</span>
      </a>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, watchEffect } from "vue"
import type { userInfoType } from "../../types/userInfo"
import copy from "copy-to-clipboard";
import { BiGithub } from "oh-vue-icons/icons";

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
watchEffect(() => {
  ifShowLinks.value = true;
})
</script>
