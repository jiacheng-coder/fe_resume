<template>
	<router-view></router-view>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()
let username = localStorage.getItem("username") || '';
let password = localStorage.getItem("password") || '';
if (username === '2253541907@qq.com' && password === '123456') {
	// router.push('/')
} else {
	router.push('/login')
}
const vFocus = {
	mounted(el: HTMLElement) {
		el.focus()
	},
}
</script>
