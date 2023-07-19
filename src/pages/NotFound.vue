<template>
  <div class="notFound">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">很抱歉!</h2>
        <p>您访问的页面不存在, 将在{{ second }}s后自动为您跳转到首页</p>
        <div class="card-actions justify-end">
          <button class="btn" @click="jumpHome">首页</button>
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const second = ref(5)

let timer = setInterval(() => {
  second.value--
}, 1000)

watch(second, () => {
  if (second.value <= 0) {
    clearInterval(timer)
    router.push('/')
  }
})

function jumpHome() {
  router.push('/')
}
</script>
