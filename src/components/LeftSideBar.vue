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
  <div class="p-4 h-full text-white bg-gray-700 shadow-2xl duration-300" style="border-radius: 2rem;box-shadow: ;">
    <!-- 头像,姓名,职位 -->
    <div class="md:block ">
      <div class="flex justify-center">
        <img class="h-40 rounded-full mx-4" src="../assets/images/me.jpg" />
      </div>
      <div class="text-center mt-10 justify-center items-center">
        <h1 class="text-xl  font-bold">{{ userInfo?.name }}</h1>
        <!-- <div class="md:text-lg  mt-4">前端工程师</div> -->
        <div class="md:text-lg  mt-4">{{ userInfo?.job }}</div>
      </div>
    </div>
    <!-- 联系方式, 小于md时隐藏 -->
    <div class="my-10 ml-8 mr-4 md:block" style="cursor: pointer;">
      <div class="my-5 text-lg  flex" @click="copyText(userInfo?.wechat as string)">
        <div class="mr-2">
          <span class="iconfont icon-wechat"></span>
        </div>
        <label for="my-modal" style="cursor: pointer;">{{ userInfo?.wechat }}</label>
      </div>
      <div class="my-5 text-lg  flex" @click="copyText(userInfo?.phone as string)">
        <div class="mr-2">
          <span class="iconfont icon-telephone"></span>
        </div>
        <label for="my-modal" style="cursor: pointer;">{{ userInfo?.phone }}</label>
      </div>
      <div class="my-5 text-lg  flex" @click="copyText(userInfo?.email as string)">
        <div class="mr-2">
          <span class="iconfont icon-email"></span>
        </div>
        <label for="my-modal" style="cursor: pointer;">{{ userInfo?.email }}</label>
      </div>
      <a :href="userInfo?.blogUrl" class="my-5 flex" target="_blank">
        <div class="mr-2">
          <span class="iconfont icon-gitee-fill-round"></span>
        </div>
        <span class="text-grey-200">博客链接</span>
      </a>
      <a :href="userInfo?.repositoryUrl" class="my-5 flex" target="_blank">
        <div class="mr-2">
          <span class="iconfont icon-gitee-fill-round"></span>
        </div>
        <span class="text-grey-200">仓库链接</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import type { userInfoType } from "../types/userInfo"
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
</script>

<style scoped>
</style>
