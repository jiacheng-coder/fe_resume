import type { ResumeData } from '@/types/resume'

export function cloneResume(data: ResumeData): ResumeData {
  return JSON.parse(JSON.stringify(data)) as ResumeData
}
