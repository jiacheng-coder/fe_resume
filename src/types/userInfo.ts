export type userInfoType = {
  name: string
  job: string
  email: string
  phone: string
  wechat: string
  resumeUrl: string
  blogUrl: string
  githubUrl: string
  notionUrl?: string
  avatar?: string
  [key: string]: string | undefined
}
