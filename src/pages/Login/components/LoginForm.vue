<template>
  <div class="main shadow-2xl">
    <div class="w-8 imgContent">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div class="loginContent">
      <!-- title -->
      <div class="form-title w-full text-center my-8">
        <h2 class="title text-white">登录</h2>
      </div>
      <!-- control -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-white">账户</span>
        </label>
        <input type="text" placeholder="输入用户名(我的邮箱号)" class="input input-bordered w-full text-black" v-model="username" />
        <label class="label">
          <span class="label-text text-white">密码</span>
        </label>
        <input type="password" placeholder="输入密码(123456)" class="input w-full text-black" v-model="password" />
        <!-- <input type="checkbox" class="input"> -->
        <button class="loginBtn mt-6 btn w-full btn-md" @click="login">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../../../store/userInfoStore";
import { useRouter } from "vue-router";
const router = useRouter()
const userStore = useUserStore();
const { username, password } = storeToRefs(userStore);

const login = () => {
  if (username.value === '2253541907@qq.com' && password.value === '123456') {
    router.push('/')
  }
  localStorage.setItem("username", username.value)
  localStorage.setItem("password", password.value)
}
</script>

<style lang="scss" scoped>
$width: 500px;

.main {
  display: flex;
  background-image: linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%);
  padding: 2rem;
  border-radius: 2rem;

  .imgContent {
    width: $width;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .loginContent {
    color: #fff;
    padding: 2rem;
    width: $width;

    .title {
      text-transform: uppercase;
      margin: 15px 0;
      font-size: 2rem;
    }

    .loginBtn {
      background-color: #3F3D54;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
