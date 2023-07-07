<template>
  <div id="home" style="background-color: #FFF;">
    <div class="max-w-screen-lg mx-auto md:flex">
      <!-- LeftSideBar -->
      <div class="md:w-1/3 p-4 relative">
        <LeftSideBar :userInfo="userInfo" />
      </div>
      <!-- RightSideBar -->
      <div class="md:w-2/3 p-4 w-full">
        <RightSideBar :skills="skills" :features="features" :experience="experience" :prizes="prizes" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// import LeftSideBar from "../../components/LeftSideBar.vue";
import LeftSideBar from "../../components/LeftSideBar/index.vue"
import RightSideBar from "../../components/RightSideBar/index.vue";
import type { projects } from "../../types/projectsType";

// 1.个人信息
const name = "诸嘉诚";
const job = "前端开发工程师"
const email = "2253541907@qq.com"
const phone = "15023092023"
const wechat = "zaqwertyuioplm7412"
const blogUrl = "https://zhujiacheng612.gitee.io/blog/"
const repositoryUrl = "https://gitee.com/zhujiacheng612/frontend-resume"
const userInfo = {
  name,
  job,
  email,
  phone,
  wechat,
  blogUrl,
  repositoryUrl,
}
// 2.技术栈
const skills = [
  "Vue2",
  "Vue3",
  "Vue Router",
  "Pinia",
  "React",
  "Mobx",
  "微信小程序",
  "Uniapp",
  "TailwindCSS",
  "DaisyUI",
  "GraceUI",
];
// 3.自我介绍
const features = [
  "熟悉HTML,CSS,JS, 熟悉W3C标准与ECMA规范, 对Typescript有一定了解",
  "熟悉Vue, VueRouter, Pinia, Vitepress等Vue生态, 了解前端工程化, 能够结合已有基础设施快速研发项目",
  "熟悉微信小程序的开发上线流程, 拥有单日累计打开次数10万+小程序的开发维护经验, 能够根据后端接口快速完成页面搭建",
  "有一定的前端调试与优化能力, 例如利用调试工具快速定位问题, 以及通过变量加锁防止多次请求减轻服务端压力等",
  "熟悉ColorUI, GraceUI, TailwindCSS等组件库, 并能够针对具体业务对组件库进行简单的二次开发",
  "有写博客的习惯, 关注用户体验, 注重技术积累与新技术的探索",
];
// 4. 项目经历 experience[]->projects[]->project
const experience: Array<projects> = [
  {
    company: "重庆电覆者科技有限公司",
    projects: [
      {
        name: "WeCQU小程序",
        job: "前端开发工程师",
        time: "2022年9月 - 至今",
        introduce: "面向大学生开发的校园一体化查询小程序, 单日累计打开次数10万+",
        myContribution: ["结合后端接口数据, 使用GraceUI组件库进行数据渲染",
          "利用组件库重新页面设计UI, 简化原有JS逻辑, 页面重构率约50%",
          "对组件库中的轮播图组件进行二次封装, 实现点击跳转webview公众号推文的功能",
          "使用promise封装wx.request和wx.showModal请求",
          "通过变量加锁的方式防止发起二次登录请求,减轻服务器压力",
          "通过setStorage实现数据持久化,包括用户头像与课表信息的存储等"],
        skills: "微信小程序, ColorUI, GraceUI3",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/Wecqu.html"
      },
      {
        name: "生态圈校园论坛",
        job: "前端开发工程师",
        time: "2022年12月 - 至今",
        introduce: "基于Uniapp开发的高校论坛类H5网页, 影响力涵盖多所高校",
        myContribution: ["基于GraceUI组件库结合设计稿进行页面UI的绘制",
          "使用vue的component组件提升页面渲染效率",
          "基于单例模式的思想, 使用Vuex进行全局状态管理, 统一暴露接口对全局数据进行CRUD",
          "通过watch监听器与Vuex的getters解决了消息提醒的红点逻辑问题"
        ],
        skills: "Uniapp, GraceUI5",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/ecosystem.html"
      },
    ],
  },
];
// 5. 荣誉奖项
const prizes = [
  "字节跳动前端青训营-码如磐石奖"
]
</script>

<style>
</style>
