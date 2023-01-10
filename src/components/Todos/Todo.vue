<template>
  <div class="card px-20 pt-10">
    <div>
      <input type="text" placeholder="请在此输入你的待办事项" class="mb-4 input input-success w-2/3" v-model="newItem"
        @keyup.enter="todoStore.addItem" />
      <button class="mb-4 btn w-1/3" @click="todoStore.addItem">添加</button>
    </div>

    <div class="overflow-x-auto" v-show="itemCount !== 0">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>Context</th>
            <th>Delete</th>
          </tr>
        </thead>
        <!-- body -->
        <tbody>
          <tr v-for="item in todoStore.items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.context }}</td>
            <td><button class="btn btn-outline" @click="todoStore.removeItem(item)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="chat chat-start mt-4">
      <div class="chat-bubble">请问现在有多少待办事项呢？</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-bubble" v-if="itemCount !== 0">现在您还有{{ itemCount }}个待办事项。</div>
      <div class="chat-bubble" v-else>恭喜您！所有待办事项已完成。</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../../store/todoStore';
const todoStore = useTodoStore()
const { newItem, itemCount } = storeToRefs(todoStore)
</script>

<style scoped>

</style>
