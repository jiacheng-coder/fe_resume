import { ref, type Ref } from 'vue'

/**
 * 原生 HTML5 拖拽排序 composable。
 * 支持传入可写 Ref 或 computed ReadonlyRef：
 *   - 对可写 Ref 直接 in-place splice
 *   - 对 computed ReadonlyRef 通过 onReorder 回调通知调用方
 *
 * 用法（可写 ref）：
 * ```ts
 * const arr = ref([1, 2, 3])
 * const { dragIndex, onDragStart, onDragOver, onDrop, onDragEnd } = useDragSort(arr)
 * ```
 *
 * 用法（computed / 只读，需传 onReorder）：
 * ```ts
 * const sort = useDragSort(computed(() => store.data.items), {
 *   onReorder: (from, to) => {
 *     const list = [...store.data.items]
 *     const [item] = list.splice(from, 1)
 *     list.splice(to, 0, item)
 *     store.data.items = list
 *   }
 * })
 * ```
 */
export function useDragSort<T>(
  arr: Ref<T[]>,
  opts?: {
    onReorder?: (from: number, to: number) => void
  },
) {
  const dragIndex = ref<number | null>(null)
  const overIndex = ref<number | null>(null)

  function onDragStart(index: number) {
    dragIndex.value = index
  }

  function onDragOver(index: number, ev: DragEvent) {
    ev.preventDefault()
    if (dragIndex.value === null) return
    overIndex.value = index
  }

  function onDrop(index: number, ev: DragEvent) {
    ev.preventDefault()
    const from = dragIndex.value
    if (from === null || from === index) {
      reset()
      return
    }

    if (opts?.onReorder) {
      // 只读模式：通过回调通知
      opts.onReorder(from, index)
    } else {
      // 可写模式：直接 in-place splice
      const list = arr.value
      const item = list.splice(from, 1)[0]
      list.splice(index, 0, item)
    }
    reset()
  }

  function onDragEnd() {
    reset()
  }

  function reset() {
    dragIndex.value = null
    overIndex.value = null
  }

  return {
    dragIndex,
    overIndex,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
  }
}
