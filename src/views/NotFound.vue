<template>
  <div class="notFound">
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure><img src="../assets/fire.png" alt="Fire" /></figure>
      <div class="card-body">
        <h2 class="card-title">抱歉!</h2>
        <p>您访问的页面不存在</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="jumpHome">跳转首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notFound {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}
</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function jumpHome() {
  router.push('/')
}
</script>
