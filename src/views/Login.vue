<template>
  <div class="login">
    <LoginForm @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import type { userInfo } from "../types/userInfo";
import { useUserStore } from "../store/userInfoStore";

const userInfo_resume = ref({});
function handleSubmit({ username, password }: userInfo) {
  console.log("login-view", username, password);
  userInfo_resume.value = {
    username,
    password,
  };
}

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
