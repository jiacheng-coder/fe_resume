import type { projects } from './projectsType'

export type ResumeUi = {
  theme: {
    headerBackground: string
  }
  copy: {
    title: string
    message: string
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
  school: string
  major: string
  period: string
}

export type InternshipCompany = projects & {
  /** Public URL under `public/`, e.g. `/icons/meituan.svg` */
  icon?: string
}

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
    [key: string]: string | undefined
  }
  ui: ResumeUi
  education: EducationEntry[]
  skills: string[]
  prizes: string[]
  features: string[]
  experience: projects[]
  internship: InternshipCompany[]
}
