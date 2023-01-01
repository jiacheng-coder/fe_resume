<template>
  <div class="blog" ref="blog">
    <h1>This is my blog!</h1>
    <div v-if="loading">loading</div>
    <div class="article" v-else>
      <p>title: {{ info.title }}</p>
      <p>content: {{ info.content }}</p>
    </div>
    <div class="mousemove">
      <h2>x: {{ x }}</h2>
      <h2>y: {{ y }}</h2>
    </div>
    <button @click="jump">click and jump</button>
    <!-- <router-link to="/blog/1#section3">link</router-link> -->
    <div id="section1" style="height: 500px;width:100%;background-color:blueviolet"></div>
    <div id="section2" style="height: 500px;width:100%;background-color:red"></div>
    <div id="section3" style="height: 500px;width:100%;background-color:yellowgreen"></div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted, watch } from 'vue';
import { useRoute} from 'vue-router'
import {apiPost} from '../api'

import type { Ref } from 'vue';
import type { articleInfo } from "../type/article"

import {useMouseMove} from '../utils/mouseMove'

// 1.mousemove
const {x, y} = useMouseMove()
// 2.article
const route = useRoute()
// console.log('router: ',$router);
// console.log('route',route.params);
let info:Ref<articleInfo> = ref({
  title: '',
  content: ''
})
let loading = ref(true)
function getArticleInfo(){
  apiPost(route.params.id, false).then(res=>{
    console.log('res: ',res);
    info.value = res
    console.log('info',info);
    loading.value = false
  }).catch((err)=>{
    console.log('error');
  })
}
onMounted(()=>{
  getArticleInfo()
})
watch(route, ()=>{
  getArticleInfo()
})
// 3.锚点跳转
const blog = ref(null)
const jump = ()=>{
  const target = blog.value.querySelector(route.hash);
  console.log("blog jump", target);
  // const target = showContainer.querySelector(this.$route.hash);
  target.scrollIntoView({
    behavior: 'smooth'//平滑滚动
  });
}
// onMounted(()=>{

// })
</script>