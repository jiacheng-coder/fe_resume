import { computed, inject, unref } from 'vue'
import type { ResumeData } from '@/types/resume'

export function useResume() {
  const raw = inject('resume')
  if (raw == null) {
    throw new Error('resume not provided')
  }
  return computed(() => unref(raw as never) as ResumeData)
}
