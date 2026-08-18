<template>
  <div class="space-y-1.5 rounded-lg bg-[#f9f9f9] p-2.5">
    <div class="flex flex-wrap gap-1">
      <input v-model="modelValue.name" placeholder="项目名" class="min-w-[6rem] flex-1 rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
      <input v-model="modelValue.job" placeholder="角色" class="min-w-[6rem] flex-1 rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
      <input v-model="modelValue.time" placeholder="时间" class="w-36 rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
      <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]" @click="$emit('remove')">删项目</button>
    </div>
    <textarea v-model="modelValue.introduce" placeholder="项目描述" class="w-full min-h-[3rem] rounded-lg border border-[#e0e0e0] bg-white p-2.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
    <p class="text-xs text-[#6f6f6f]">职责（每行一条）</p>
    <textarea v-model="contributionText" class="w-full min-h-[5rem] rounded-lg border border-[#e0e0e0] bg-white p-2.5 font-mono text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
    <input v-model="modelValue.skills" placeholder="技术栈" class="w-full rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
    <input v-model="moreLink" placeholder="链接 more（可选）" class="w-full rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:ring-2 focus:ring-[#0f62fe]/20" />
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
