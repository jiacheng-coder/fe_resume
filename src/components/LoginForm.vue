<template>
  <div class="loginForm w-1/4">
    <!-- title -->
    <div class="form-title w-full text-center">
      <h2 class="title">炬火</h2>
    </div>
    <!-- control -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">账户</span>
      </label>
      <input type="text" placeholder="输入用户名" class="input input-bordered w-full" v-model="username" />
      <label class="label">
        <span class="label-text">密码</span>
      </label>
      <input type="password" placeholder="输入密码" class="input input-bordered w-full" v-model="password" />
      <button class="mt-6 btn w-full btn-md" @click="emit('submit', { username, password })">
        登陆
      </button>
      <button class="mt-2 btn w-full btn-md" @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/userInfoStore";

const userStore = useUserStore();
const { username, password } = storeToRefs(userStore);

const emit = defineEmits({
  // 校验 submit 事件
  submit: ({ username, password }) => {
    if (username.value && password.value) {
      return true;
    } else {
      console.warn("Invalid submit event payload!");
      return false;
    }
  },
});

function reset() {
  userStore.$reset();
}
</script>

<style lang="scss" scoped>
.title {
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
  font: 700 200% Consolas, Monaco, monospace;
}
</style>
