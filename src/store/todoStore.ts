import { defineStore } from 'pinia'
import { computed, reactive, ref } from "vue";
import type { Item } from '../types/item'

let id = 1
const generateId = () => id++
export const useTodoStore = defineStore('todos', () => {
  const newItem = ref('')
  const items = reactive<Item[]>([])
  const itemCount = computed(() => items.length)
  function addItem() {
    items.push({
      id: generateId(),
      context: newItem.value
    })
    newItem.value = ''
  }
  function removeItem(item: Item) {
    const index = items.indexOf(item)
    items.splice(index, 1)
  }
  return {
    newItem,
    items,
    itemCount,

    addItem,
    removeItem,
  }
})
