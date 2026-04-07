import { defineStore } from 'pinia'
import resumeSeed from '@/config/resume.json'
import type { ResumeData } from '@/types/resume'
import { cloneResume } from '@/utils/resumeClone'

const STORAGE_KEY = 'fe_resume_editor_profiles_v1'
const LAST_KEY = 'fe_resume_editor_last_active_v1'

const seed = resumeSeed as ResumeData

export const useResumeEditorStore = defineStore('resumeEditor', {
  state: () => ({
    resume: cloneResume(seed),
    currentProfileName: null as string | null,
    initialized: false,
  }),
  actions: {
    initFromStorage() {
      if (this.initialized) return
      this.initialized = true
      try {
        const last = localStorage.getItem(LAST_KEY)
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw && last) {
          const profiles = JSON.parse(raw) as Record<string, ResumeData>
          if (profiles[last]) {
            this.resume = cloneResume(profiles[last])
            this.currentProfileName = last
            return
          }
        }
      } catch {
        /* ignore */
      }
      this.resume = cloneResume(seed)
      this.currentProfileName = null
    },
    resetToSeed() {
      this.resume = cloneResume(seed)
      this.currentProfileName = null
    },
    saveAs(name: string) {
      const trimmed = name.trim()
      if (!trimmed) return
      let profiles: Record<string, ResumeData> = {}
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) profiles = JSON.parse(raw) as Record<string, ResumeData>
      } catch {
        /* ignore */
      }
      profiles[trimmed] = cloneResume(this.resume)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
      localStorage.setItem(LAST_KEY, trimmed)
      this.currentProfileName = trimmed
    },
    loadProfile(name: string) {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        const profiles = JSON.parse(raw) as Record<string, ResumeData>
        if (profiles[name]) {
          this.resume = cloneResume(profiles[name])
          this.currentProfileName = name
          localStorage.setItem(LAST_KEY, name)
        }
      } catch {
        /* ignore */
      }
    },
    listProfiles(): string[] {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        return Object.keys(JSON.parse(raw) as Record<string, unknown>)
      } catch {
        return []
      }
    },
    deleteProfile(name: string) {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        const profiles = JSON.parse(raw) as Record<string, ResumeData>
        delete profiles[name]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
        if (this.currentProfileName === name) {
          this.resetToSeed()
          localStorage.removeItem(LAST_KEY)
        }
      } catch {
        /* ignore */
      }
    },
  },
})
