<template>
  <!-- Header -->
  <NavBar />
  <!-- Main -->
  <div class="max-w-screen-lg mx-auto my-10 container md:flex">
    <!-- LeftSideBar -->
    <div class="md:w-1/3 p-4 relative">
      <LeftSideBarVue :name="name"/>
    </div>
    <!-- RightSideBar -->
    <div class="md:w-2/3 p-4 w-full">
      <RightSideBarVue :skills="skills" :features="features" :experience="experience"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import LeftSideBarVue from '../components/LeftSideBar.vue';
import RightSideBarVue from '../components/RightSideBar.vue'
import {project,projects} from '../../config'
// Person Info
const name = '诸嘉诚'
const skills = ['Vue2', 'Vue3', 'Vue Router', 'Pinia', 'React', 'Mobx', '微信小程序', 'uniapp', 'ElementPlus', 'GraceUI']
const features = [
  '熟悉HTML,CSS,JS; 了解TypeScript;',
  '熟悉Vue2, Vue3.2以及VueRouter, Pinia, Element-Plus等生态;',
  '熟悉微信小程序的开发与上线流程, 有线上项目的开发与维护经验;',
  '熟悉ColorUI, GraceUI等组件库, 能够针对具体业务, 对组件进行二次开发;'
]
// experience[]->projects[]->project
const experience: Array<projects> = [
  {
    company: '重庆电覆者科技有限公司',
    projects: [
      {
        name: 'Wecqu',
        job: '前端开发工程师',
        time: '2022年9月 - 至今',

        highlight: '',
        situation: '由于用户反馈现有的课表栏目不能满足研究生课表的多变性',
        target: '我们讨论后决定在原有功能上实现自定义课表的二次开发',
        action: '在查阅相关解决办法后, 我决定采用将表单数据存入小程序缓存, 之后同后端返回的课程数据一起渲染到页面中的解决办法',
        result: '实现了用户需求, 得到了多位用户的一致好评',

        skills: '微信小程序, colorUI, graceUI3'
      },
      {
        name: '校园生态圈',
        job: '前端开发工程师',
        time: '2022年11月 - 至今',

        highlight: '',
        situation: '由于现有的点击复制功能不符合使用用户的使用习惯',
        target: '经反馈决定将其更换为长按复制的操作方法',
        action: '在查阅相关解决办法后, 我决定采用@longpress方法得到复制后的内容',
        result: '实现了用户的需求, 受到了用户的好评',

        skills: 'uniapp, vue2, graceUI5'
      },
    ]
  },
  {
    company: '啊对对对对队',
    projects: [
      {
        name: '仿掘金首页',
        job: '前端开发工程师',
        time: '2022年7月 - 2022年9月',

        highlight: '页面无限滚动, 基于Markdown数据自动生成目录',
        situation: '在字节跳动第四届前端青训营中, 我们选择了仿掘金首页项目作为结业项目',
        target: '实现掘金首页与文章详情页',
        action: '查阅资料, 整合并实现相应功能',
        result: '获得"码如磐石"奖项, 队伍总评第五',

        skills: 'Vue, Apifox'
      },
    ]
  }
]
</script>

<style scoped lang="scss">
.container {
  background-color: #f8f8f8;
}
</style>