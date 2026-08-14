import Dexie, { type Table } from 'dexie'
import type { ResumeProfile } from '@/types/resume'

export class ResumeDB extends Dexie {
  profiles!: Table<ResumeProfile, string>

  constructor() {
    super('fe_resume_db')
    this.version(1).stores({
      // 主键 id，updatedAt 用于按修改时间排序
      profiles: 'id, updatedAt, title',
    })
  }
}

export const db = new ResumeDB()
