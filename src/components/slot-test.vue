<template>
  <div class="header">
    <slot name="header">Header</slot>
  </div>
  <div class="main">
    <slot name="main">Main</slot>
  </div>
  <div class="footer">
    <slot name="footer">Footer</slot>
  </div>
</template>

<script setup lang="ts">
import { useSlots, onMounted } from 'vue';
const slots = useSlots()
onMounted(()=>{
  console.log(slots);
  if(slots?.default) {
    console.log('使用了默认插槽');
  }
  if(slots?.header) {
    console.log('使用了header插槽');
  }
})
</script>

<style lang="scss" scoped>

</style>