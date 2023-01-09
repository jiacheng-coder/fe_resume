<template>
  <div class="loginForm w-1/4">
    <!-- title -->
    <div class="form-title w-full text-center">
      <h2 class="title">Easy Admin</h2>
    </div>
    <!-- control -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">账户</span>
      </label>
      <input
        type="text"
        placeholder="输入用户名"
        class="input input-bordered w-full"
        v-model="username"
      />
      <label class="label">
        <span class="label-text">密码</span>
      </label>
      <input
        type="password"
        placeholder="输入密码"
        class="input input-bordered w-full"
        v-model="password"
      />
      <div class="mt-6 flex px-4">
        <button
          class="btn w-1/3 btn-primary btn-md"
          @click="emit('submit', { username, password })"
        >
          登陆
        </button>
        <div class=" w-1/3"></div>
        <!-- <div class="w-2/8"></div> -->
        <button class="btn w-1/3 btn-md" @click="reset">重置</button>
      </div>
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
    if (username && password) {
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
