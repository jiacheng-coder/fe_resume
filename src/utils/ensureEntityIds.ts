import type { ResumeData } from '@/types/resume'
import type { project, projects } from '@/types/projectsType'

/** 生成实体级短 ID */
function genEntityId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().slice(0, 8)
  }
  return Math.random().toString(36).slice(2, 10)
}

/**
 * 为 ResumeData 中所有缺少 ID 的可排序实体（公司、项目、教育条目）补充 ID。
 * 已有 ID 的不会被覆盖，保证向后兼容。
 */
export function ensureEntityIds(data: ResumeData): ResumeData {
  const ensureCompany = (c: projects): projects => ({
    ...c,
    id: c.id || genEntityId(),
    projects: c.projects.map((p: project): project => ({
      ...p,
      id: p.id || genEntityId(),
    })),
  })

  return {
    ...data,
    experience: data.experience.map(ensureCompany),
    internship: data.internship.map(ensureCompany),
    education: data.education.map((e) => ({
      ...e,
      id: e.id || genEntityId(),
    })),
  }
}

export { genEntityId }
