<template>
  <div id="home" class="max-w-screen-lg mx-auto p-4 shadow-2xl">
    <Header :userInfo="userInfo" />
    <Main :skills="skills" :features="features" :experience="experience" :prizes="prizes" :internship="internship" />
  </div>
</template>

<script setup lang="ts">
import Header from '@components/Header/index.vue'
import Main from "@components/Main/index.vue";
import type { projects } from "../../types/projectsType";

// 1.个人信息
const userInfo = {
  name: "诸嘉诚",
  job: "前端开发工程师",
  email: "2253541907@qq.com",
  phone: "15023092023",
  wechat: "zaqwertyuioplm7412",
  blogUrl: "https://jiacheng-coder.github.io/my-blog", // 个人博客
  githubUrl: "https://github.com/jiacheng-coder", // Github
}

// 2.技术栈
const skills = [
  "Vue 2/3",
  "React 18",
  "Vue Router / React Router",
  "Pinia / Mobx",
  "Miniprogram",
  "Uniapp",
  "Roo UI / Antd Design",
  "TailwindCSS / DaisyUI",
  "Color UI / Grace UI",
];

// 3.自我介绍
const features = [
  // 基础
  "精通 HTML5, CSS3, ES6, Typescript, 熟悉常规的 W3C 标准与 ECMA 规范;",
  "具备 Vue 3 和 React 18 等 MVVM 框架开发经验，能够结合已有基建快速完成需求;",
  "熟悉微信小程序的开发流程, 拥有单日累计打开次数10万+小程序的开发与维护经验, 能够根据后端接口快速完成页面搭建;",
  // 前端工程化
  "熟练使用 Webpack, Vite 等打包构建工具, 对打包构建流程有一定了解;",
  // 性能优化
  "对前端性能优化有一定了解, 落地实现过 首屏加载优化 及 长列表优化 等优化手段;",
  // 组件库
  "熟悉 ColorUI, TailwindCSS, RooUI / Antd Design 等组件库, 能够针对具体业务对组件库进行简单的二次开发;",
  // 软技能
  "有写博客的习惯, 关注用户体验, 注重技术积累与新技术的探索，具有良好的沟通和团队协作能力;",
]

// 4. 项目经历 experience[]->projects[]->project
const experience: Array<projects> = [
  {
    company: "重庆电覆者科技有限公司",
    projects: [
      {
        name: "WeCQU小程序",
        job: "前端开发工程师",
        time: "2022.9 - 2023.8",
        introduce: "面向大学生开发的校园一体化查询小程序, 单日累计打开次数10万+",
        myContribution: [
          "重构页面 UI , 简化原有 JS 逻辑, 总重构率约达50%",
          "对组件库中的轮播图组件进行二次封装, 实现点击跳转 webview 公众号推文的功能",
          "使用 promise 封装 wx.request 和 wx.showModal 请求",
          "通过防抖节流防止发起二次登录请求,减轻服务器压力",
          "通过 setStorage 实现数据持久化,包括用户头像与课表信息的存储等"
        ],
        skills: "ES6 + 微信小程序 + ColorUI + GraceUI3",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/Wecqu.html"
      },
      {
        name: "生态圈校园论坛",
        job: "前端开发工程师",
        time: "2022年12月 - 至今",
        introduce: "基于 Uniapp 开发的高校论坛类H5应用, 影响力涵盖川大、重大等多所高校",
        myContribution: [
          "结合 PRD 和原型图, 基于 GraceUI 组件库进行页面的搭建",
          "使用 Vue 的 component 组件提升页面渲染效率",
          "使用 vue-virtual-scroller 虚拟滚动方案进行首屏渲染优化",
          "使用 Vue3.2 的 v-memo, v-once Hooks 进行长列表优化",
          "基于单例模式的思想, 使用Vuex进行全局状态管理, 统一暴露接口对数据进行CRUD",
          "基于 watch 侦听器与 Vuex 的 getters 搭建系统的消息提醒模块"
        ],
        skills: "ES6 + Vue3 + Uniapp + GraceUI5",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/ecosystem.html"
      },
    ],
  },
];

// 5.实习经历
// 项目描述：千万不要把项目介绍搞成产品代言人
// 项目职责：
// 1、项目所用的技术栈
// 2、项目中所负责的功能模块（行业的核心模块）
// 3、项目亮点（封装，提升用户体验，别人没解决，你解决的）
// 4、在项目中做过哪些优化
// 5、项目中封装过哪些可复用组件(项目亮点)
// 6、与后端配合
// 7、适配 兼容
const internship = [
  {
    company: "美团",
    icon: '@assets/icons/favicon-mt.ico',
    projects: [
      {
        name: '韦恩系统',
        job: "前端开发工程师",
        time: "2023.6 - 至今",
        introduce: '用于运营提效的 M 端系统, 为用户提供优质的供给资源的同时, 也为 B 端商家引流',
        myContribution: [
          '参与原有 韦恩系统 的迭代升级, 封装业务组件并抽离自定义 Hooks, 对 UI 和逻辑拆分抽离',
          '在理解 PRD 的前提下, 优化原有提报活动的业务逻辑, 打通新神价活动的提报流程, 同时做到对老神价活动的兼容, 进行运营提效',
          '基于 NineJs 打包构建工具, 对原有项目进行打包配置优化, 进行开发提效',
          '学习公司的开发规范, 走通需求评审 - 开发 - 联调 - 测试 - 预发 - 上线的整套流程'
        ],
        skills: 'Typescript + React 16.8 + React Hooks + Webpack 5 + Nine.js',
      },
      {
        name: '统一招商平台',
        job: "前端开发工程师",
        time: "2023.6 - 至今",
        introduce: '基于 Formily 表单解决方案 和 微前端架构 搭建的统一招商系统, 提供一体化招商解决方案',
        myContribution: [
          '学习 Formily 表单解决方案并应用到招商系统的业务流程中, 同时对 M 端和 B 端进行提效',
          '抽离 招商系统 中的业务逻辑, 优化原有的网络请求流程, 提高系统的开发效率',
          '结合 PRD 重构原有招商逻辑, 配合后端 RD 进行联调, 提高 招商活动 的提报效率',
          '加强 Git 实战能力, 包括处理冲突、版本回退、分支合并等, 增强代码书写的可读性和规范性',
        ],
        skills: 'Typescript + React 18 + Webpack 5 + Vite + Monorepo',
      }
    ]
  }
]
// 5. 荣誉奖项
const prizes = [
  "第四届 - 字节跳动 - 前端青训营 - 码如磐石奖",
  "2021年全国大学生数学竞赛 - 重庆赛区 - 省级三等奖"
]
</script>

<style>
</style>
