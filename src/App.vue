<template>
  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { animate } from 'animejs'

function onEnter(el: Element, done: () => void) {
  animate(el, {
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 400,
    ease: 'outExpo',
    onComplete: done,
  })
}

function onLeave(el: Element, done: () => void) {
  animate(el, {
    opacity: [1, 0],
    translateY: [0, -12],
    duration: 250,
    ease: 'inExpo',
    onComplete: done,
  })
}
</script>
