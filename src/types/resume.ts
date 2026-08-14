import type { projects } from './projectsType'

export type ResumeUi = {
  theme: {
    headerBackground: string
  }
  copy: {
    title: string
    message: string
  }
  exportPdf: {
    button: string
    /** 打印导出说明（系统打印 → 存储为 PDF） */
    hint: string
  }
  sections: {
    features: string
    education: string
    internship: string
    projects: string
    prizes: string
    skills: string
  }
  labels: {
    projectDescription: string
    projectDuty: string
    techStack: string
  }
}

export type EducationEntry = {
  /** 实体级唯一 ID，用于 v-for key 和排序 */
  id: string
  school: string
  major: string
  period: string
}

export type InternshipCompany = projects

/** 简历中可排序的区块标识 */
export type SectionKey = 'features' | 'projects' | 'internship' | 'education' | 'skills' | 'prizes'

/** 所有区块的默认排列顺序 */
export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'features',
  'projects',
  'internship',
  'education',
  'skills',
  'prizes',
]

export type ResumeData = {
  userInfo: {
    name: string
    job: string
    email: string
    phone: string
    wechat: string
    resumeUrl: string
    blogUrl: string
    githubUrl: string
    notionUrl?: string
    /** Public path, e.g. `/avatar.svg` */
    avatar?: string
  }
  ui: ResumeUi
  education: EducationEntry[]
  skills: string[]
  prizes: string[]
  features: string[]
  experience: projects[]
  internship: InternshipCompany[]
  /** 区块排列顺序，缺省时使用 DEFAULT_SECTION_ORDER */
  sectionOrder?: SectionKey[]
}

/**
 * 一份简历在数据库中的完整记录。
 * ResumeData 是简历内容本身（可被模板渲染的纯数据），
 * ResumeProfile 在其外层包裹了元信息（id、标题、模板、时间戳等）。
 */
export type ResumeProfile = {
  /** 主键，也是路由参数 */
  id: string
  /** 用户可读的标题，如 "社招版"、"校招版" */
  title: string
  /** 所用布局模板 ID，缺省为 'ai' */
  templateId?: string
  /** 角色模板 ID（AI研发/算法/设计），仅影响初始填充内容 */
  roleId?: string
  /** 简历内容 */
  data: ResumeData
  /** 创建时间 ISO */
  createdAt: string
  /** 最后更新时间 ISO */
  updatedAt: string
}

/** 用于导出/导入的文件格式 */
export type ResumeExportFile = {
  version: 1
  exportedAt: string
  profiles: ResumeProfile[]
}
