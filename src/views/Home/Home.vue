<template>
  <div id="home" style="background-color: #FAFAFA;">
    <div class="max-w-screen-lg mx-auto md:flex">
      <!-- LeftSideBar -->
      <div class="md:w-1/3 p-4 relative">
        <LeftSideBar :userInfo="userInfo" />
      </div>
      <!-- RightSideBar -->
      <div class="md:w-2/3 p-4 w-full">
        <RightSideBar :skills="skills" :features="features" :experience="experience" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import LeftSideBar from "../../components/LeftSideBar.vue";
import RightSideBar from "../../components/RightSideBar.vue";
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
  "熟悉Vue2, Vue3.2以及VueRouter, Pinia, Vitepress等生态, 能够结合已有基础设施快速研发项目",
  "熟悉微信小程序的开发与上线流程, 有单日累计打开次数8万+项目的开发与维护经验, 能够根据后端接口快速完成页面搭建, 利用调试工具快速定位问题",
  "有一定的前端调试与优化能力, 例如利用节流减轻服务端压力",
  "熟悉ColorUI, GraceUI等组件库, 能够针对具体业务对组件库进行简单的二次开发",
  "有写博客的习惯, 注重技术积累与新技术的探索",
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
        introduce: "面向大学生的课表查询一体化小程序, 单日累计打开次数10万+",
        myContribution: ["使用GraceUI组件库重构页面UI",
          "对组件库中的轮播图组件进行二次封装, 实现点击跳转webview页面的功能",
          "使用promise封装wx.request和wx.showModal请求",
          "通过节流防止发起二次请求,减轻服务端压力",
          "通过storage实现数据持久化,包括用户头像与课表数据的存取等"],
        skills: "微信小程序, ColorUI, GraceUI3",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/Wecqu.html"
      },
      {
        name: "生态圈校园论坛",
        job: "前端开发工程师",
        time: "2022年12月 - 至今",
        introduce: "基于Uniapp开发的论坛类H5网页",
        myContribution: ["基于GraceUI组件库结合设计稿进行页面UI的绘制",
          "使用component组件提升渲染效率",
          "基于单例模式的思想, 使用Vuex进行全局状态管理, 统一暴露接口对全局数据进行CRUD",
          "通过单个Vue组件的watch与Vuex的getters解决了消息提醒的红点逻辑问题"
        ],
        skills: "Uniapp, GraceUI5",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/ecosystem.html"
      },
      // {
      //   name: "校园生态圈",
      //   job: "前端开发工程师",
      //   time: "2022年11月 - 至今",

      //   highlight: "",
      //   situation: "由于现有的点击复制功能不符合使用用户的使用习惯",
      //   target: "经反馈决定将其更换为长按复制的操作方法",
      //   action:
      //     "在查阅相关解决办法后, 我决定采用@longpress方法得到复制后的内容",
      //   result: "实现了用户的需求, 受到了多位用户的好评",

      //   skills: "uniapp, vue2, graceUI5",
      // },
    ],
  },
  // {
  //   company: "啊对对对对队",
  //   projects: [
  //     {
  //       name: "仿掘金首页",
  //       job: "前端开发工程师",
  //       time: "2022年7月 - 2022年9月",
  //       introduce: "仿照掘金的设计实现首页和文章详情页的功能",
  //       myContribution: ["1", "2"],
  //       skills: "Vue, Apifox",
  //     },
  //   ],
  // },
];
</script>

<style>
</style>
