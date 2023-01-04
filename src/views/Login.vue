<template>
  <div class="login">
    <LoginForm @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDark, useTitle } from "@vueuse/core";
import LoginForm from "../components/LoginForm.vue";
import type { userInfo } from "../types/userInfo";
import { useUserStore } from "../store/userInfoStore";
import { useRouter } from "vue-router";

const router = useRouter()

const userInfo = ref({})
function handleSubmit({ username, password }: userInfo) {
  console.log("login-view", username, password);
  userInfo.value = {
    username,
    password,
  };
  localStorage.setItem('userInfo_resume',JSON.stringify(userInfo.value))
  router.push('/')
}

const isDark = useDark();
useTitle(() => (isDark.value ? "🌙 Login" : "☀️ Login"));
console.log("userStore", useUserStore().username);
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
