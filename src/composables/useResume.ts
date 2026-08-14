import { computed, inject, unref, type InjectionKey, type ComputedRef, type Ref } from 'vue'
import type { ResumeData } from '@/types/resume'

/** 简历数据的 provide/inject 键，带完整类型信息 */
export const RESUME_INJECTION_KEY: InjectionKey<ComputedRef<ResumeData> | Ref<ResumeData>> = Symbol('resume')

export function useResume() {
  const raw = inject(RESUME_INJECTION_KEY)
  if (raw == null) {
    throw new Error('resume not provided')
  }
  return computed(() => unref(raw) as ResumeData)
}
