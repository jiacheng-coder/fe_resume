<template>
  <div class="bg-white shadow-lg p-4 h-full">
    <!-- 图片,姓名,职位 -->
    <div class="md:block">
      <div class="flex justify-center">
        <img
          class="h-40 rounded-full mx-4"
          src="../assets/me.jpg"
        />
      </div>
      <div class="text-center mt-10 justify-center items-center">
        <h1 class="text-xl text-gray-800 font-bold">{{props.name}}</h1>
        <div class="md:text-lg text-gray-600 mt-4">前端工程师</div>
      </div>
    </div>
    <!-- 联系方式, 小于md时隐藏 -->
    <div class="my-10 md:block ml-8 mr-4">
      <div class="my-5 text-lg text-gray-600 flex">
        <div class="mr-2">
          <span class="iconfont icon-wechat"></span>
        </div>
        zaqwertyuioplm7412
      </div>
      <div class="my-5 text-lg text-gray-600 flex">
        <div class="mr-2">
          <span class="iconfont icon-telephone"></span>
        </div>
        15023092023
      </div>
      <div class="my-5 text-lg text-gray-600 flex">
        <div class="mr-2">
          <span class="iconfont icon-email"></span>
        </div>
        2253541907@qq.com
      </div>
      <div class="my-5 text-lg text-gray-600 flex">
        <div class="mr-2">
          <span class="iconfont icon-location"></span>
        </div>
        中国 重庆
      </div>
      <!-- <a
        href="https://gitee.com/zhujiacheng612"
        class="my-5 flex"
        target="_blank"
      >
        <div class="mr-2">
          <span class="iconfont icon-gitee-fill-round"></span>
        </div>
        <span class="text-grey-200">Gitee</span>
      </a> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
  }
})
</script>

<style scoped>

</style>