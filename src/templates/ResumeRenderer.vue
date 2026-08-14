<template>
  <component :is="templateComponent" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTemplate } from './registry'

const props = defineProps<{ templateId?: string }>()

const templateComponent = computed(() => {
  return getTemplate(props.templateId).component
})
</script>
