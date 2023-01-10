import { defineStore } from 'pinia'
import { ref } from "vue";

export const useUserStore = defineStore('userInfo', () => {
  const username = ref('')
  const password = ref('')
  function setUsername(val: string) {
    username.value = val
  }
  function setPassword(val: string) {
    password.value = val
  }
  return {
    username,
    password,
    setUsername,
    setPassword,
  }
})
