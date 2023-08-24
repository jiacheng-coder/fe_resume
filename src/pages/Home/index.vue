<template>
  <div id="home" class="max-w-screen-lg mx-auto p-4 hover:shadow-2xl">
    <Header :userInfo="userInfo" />
    <Main :skills="skills" :features="features" :experience="experience" :prizes="prizes" :internship="internship" />
  </div>
</template>

<script setup lang="ts">
// import type { projects } from "../../types/projectsType";
import Header from '@components/Header/index.vue'
import Main from "@components/Main/index.vue";
import Info from '../../config/info_bytedance.json'

const { userInfo, skills, features, experience, prizes, internship } = Info
// const internship = [
//   {
//     company: "美团",
//     icon: '@assets/icons/favicon-mt.ico',
//     projects: [
//       {
//         name: '韦恩系统',
//         job: "前端开发工程师",
//         time: "2023.6 - 至今",
//         introduce: '用于运营提效的 M 端系统, 为用户提供优质供给资源的同时也为 B 端商家引流',
//         myContribution: [
//           '参与原有 韦恩系统 的迭代升级, 抽离自定义 Hooks, 优化网络请求逻辑, 增强系统可维护性',
//           '基于 Roo Plus 重构部分业务组件, 优化代码组织方式, 减少了 30% 左右的代码量',
//           '结合 PRD 简化原有提报活动的业务逻辑, 打通新神价活动的提报流程, 同时做到对老神价活动的兼容, 提高运营效率',
//           '基于 Vite 打包构建工具对原有项目进行打包配置优化, 包括配置别名、分包和 gzip 压缩等等, 进行开发提效',
//           '按照公司的开发规范, 走通需求评审 - 开发 - 联调 - 测试 - 预发 - 上线的整套流程, 产出技术文档、持续维护并加以推广'
//         ],
//         skills: 'Typescript + React + React Hooks + Vite',
//       },
//       // {
//       //   name: '统一招商平台',
//       //   job: "前端开发工程师",
//       //   time: "2023.6 - 至今",
//       //   introduce: '基于 Formily 表单解决方案 和 微前端架构 搭建的统一招商系统, 提供一体化招商解决方案',
//       //   myContribution: [
//       //     '学习 Formily 表单解决方案并应用到招商系统的业务流程中, 同时对 M 端和 B 端进行提效',
//       //     '抽离 招商系统 中的业务逻辑, 优化原有的网络请求流程, 提高系统的开发效率',
//       //     '结合 PRD 重构原有招商逻辑, 配合后端 RD 进行联调, 提高 招商活动 的提报效率',
//       //     // '加强 Git 实战能力, 包括处理冲突、版本回退、分支合并等, 增强代码书写的可读性和规范性',
//       //   ],
//       //   skills: 'Typescript + React 18 + Webpack 5 + Vite + Monorepo',
//       // }
//     ]
//   }
// ]
</script>

<style>
.home {
  background-color: #fff;
}
</style>
