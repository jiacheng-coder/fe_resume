<template>
    <slotTestVue>
      <template #header>
        我是标题
      </template>
      <template #main>
        我是内容
      </template>
    </slotTestVue>
    <input type="text" v-focus>
</template>

<script setup lang="ts">
import slotTestVue from '../components/slot-test.vue';
</script>

<style lang="scss" scoped>

</style>