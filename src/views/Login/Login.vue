<template>
  <div class="login">
    <LoginForm @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDark, useTitle } from "@vueuse/core";
import LoginForm from "../../components/LoginForm.vue";
import type { userInfo } from "../../types/userInfo";
import { useUserStore } from "../../store/userInfoStore";
import { useRouter } from "vue-router";

const router = useRouter()

function handleSubmit({ username, password }: userInfo) {
  console.log("login-view", username, password);
  const userInfo = {
    username,
    password,
  };
  if (userInfo.username && userInfo.password) {
    localStorage.setItem('userInfo_resume', JSON.stringify(userInfo))
    router.push('/')
  } else {
    console.warn('账号或密码为空')
  }
}

const isDark = useDark();
useTitle(() => (isDark.value ? "Login🌙 " : "Login☀️ "));
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}
</style>
