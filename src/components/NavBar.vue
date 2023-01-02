<template>
  <div class="navbar bg-gray-600 text-white">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-600 text-white rounded-box w-52"
        >
          <li v-for="link in links">
            <a :href="link.href">{{ link.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl">前端小屋🛖</a>
    </div>
    <div class="navbar-end" @click="showModal = true">
      <button class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
    <Teleport to="body">
      <!-- 使用这个 modal 组件，传入 prop -->
      <Modal :show="showModal" @close="showModal = false">
        <template #header>
          <h3>了解我</h3>
        </template>
        <template #body>
          <p>一个前端开发小白</p>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/Modal.vue";

const showModal = ref(false);
const links = [
  {
    name: "Resume Project",
    href: "https://gitee.com/zhujiacheng612/frontend-resume",
  },
  { name: "Blog", href: "/frontend-resume/blog/1" },
  { name: "Gitee Link", href: "https://gitee.com/zhujiacheng612" },
  {
    name: "Juejin Link",
    href: "https://juejin.cn/user/2538135637997560/posts",
  },
  { name: "Email Me", href: "mailto:2253541907@qq.com" },
];
</script>

<style lang="scss" scoped></style>
