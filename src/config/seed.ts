import type { ResumeData } from '@/types/resume'

/**
 * 基础种子数据 —— 所有字段使用占位内容，不含任何真实个人信息。
 * 新建简历时以此为 base，再由 registry.buildRoleSeed() 按角色覆盖 skills / features / job / theme。
 */
export const baseSeed: ResumeData = {
  ui: {
    theme: {
      headerBackground: '#0284C7',
    },
    copy: {
      title: '提示!',
      message: '内容已复制到剪贴板',
    },
    exportPdf: {
      button: '导出 PDF',
      hint: '将打开打印对话框，目标打印机请选择「存储为 PDF」',
    },
    sections: {
      features: '核心优势',
      education: '教育背景',
      internship: '其他实习（可选）',
      projects: '工作与项目经历',
      prizes: '荣誉与获奖',
      skills: '专业技能',
    },
    labels: {
      projectDescription: '项目描述:',
      projectDuty: '项目职责:',
      techStack: '主要技术:',
    },
  },
  userInfo: {
    avatar: '',
    name: '你的姓名',
    job: '你的职位',
    email: 'your.email@example.com',
    phone: '1XX-XXXX-XXXX',
    wechat: 'your_wechat_id',
    resumeUrl: '',
    blogUrl: '',
    githubUrl: '',
    notionUrl: '',
  },
  education: [
    {
      id: 'edu-1',
      school: '你的学校',
      major: '你的专业',
      period: '20XX - 20XX',
    },
  ],
  skills: [
    '请在此添加你的专业技能',
  ],
  prizes: [],
  features: [
    '请在此添加你的核心优势描述。',
  ],
  experience: [
    {
      id: 'exp-1',
      company: '公司名称',
      icon: '',
      projects: [
        {
          id: 'proj-1',
          name: '项目名称',
          job: '你的角色',
          time: '20XX.X - 20XX.X',
          introduce: '用一两句话描述项目的业务背景与目标。',
          myContribution: [
            '描述你在项目中的具体职责和贡献；',
            '描述你解决的关键问题或取得的关键成果。',
          ],
          skills: '技术栈：如 React + TypeScript + Node.js',
        },
      ],
    },
  ],
  internship: [],
}
