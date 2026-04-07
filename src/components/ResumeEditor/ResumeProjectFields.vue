<template>
  <div class="space-y-1 rounded bg-slate-50 p-2">
    <div class="flex flex-wrap gap-1">
      <input v-model="modelValue.name" placeholder="项目名" class="input input-bordered input-xs flex-1 min-w-[6rem]" />
      <input v-model="modelValue.job" placeholder="角色" class="input input-bordered input-xs flex-1 min-w-[6rem]" />
      <input v-model="modelValue.time" placeholder="时间" class="input input-bordered input-xs w-36" />
      <button type="button" class="btn btn-ghost btn-xs" @click="$emit('remove')">删项目</button>
    </div>
    <textarea v-model="modelValue.introduce" placeholder="项目描述" class="textarea textarea-bordered textarea-xs w-full min-h-[3rem]" />
    <p class="text-xs text-slate-500">职责（每行一条）</p>
    <textarea v-model="contributionText" class="textarea textarea-bordered textarea-xs w-full min-h-[5rem] font-mono" />
    <input v-model="modelValue.skills" placeholder="技术栈" class="input input-bordered input-xs w-full" />
    <input v-model="moreLink" placeholder="链接 more（可选）" class="input input-bordered input-xs w-full" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { project } from '@/types/projectsType'

const props = defineProps<{ modelValue: project }>()
defineEmits<{ remove: [] }>()

const contributionText = computed({
  get: () => props.modelValue.myContribution.join('\n'),
  set: (v: string) => {
    const lines = v.split('\n').map((s) => s.trim()).filter(Boolean)
    props.modelValue.myContribution = lines.length ? lines : ['']
  },
})

const moreLink = computed({
  get: () => props.modelValue.more ?? '',
  set: (v: string) => {
    props.modelValue.more = v.trim() || undefined
  },
})
</script>
