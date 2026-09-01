import { z } from 'zod'
// 注意：本文件会被 Vercel Function (api/) 打包复用，统一使用相对路径导入，不使用 @ 别名
import { DEFAULT_SECTION_ORDER, type ResumeData, type SectionKey } from '../types/resume'

/**
 * 简历数据结构的单一事实源（Single Source of Truth）。
 *
 * 消费方：
 * - z.infer                    → TS 类型（与 types/resume.ts 的 ResumeData 用编译期断言互锁）
 * - normalize (transform.ts)   → 宽容归一化（替代 db/crud.ts 的手写 normalize* 函数）
 * - toJSONSchema / buildAIPrompt (aiPrompt.ts) → GLM 结构化输出约束与字段中文说明
 *
 * 约定：
 * - 每个字段必须写中文 .describe()，这是 AI 生成质量的来源；
 * - 归一化策略就地声明（.default / .catch），结构变更时只需改这里。
 */

// ── 字段构造器：中文语义 + 宽容归一化 ────────────────────────

/** 字符串字段：缺失或类型错误时回退默认值 */
const str = (desc: string, def = '') =>
  z.string().default(def).catch(def).describe(desc)

/** 可选字符串字段：缺失或类型错误时为 undefined */
const optStr = (desc: string) =>
  z.string().optional().catch(undefined).describe(desc)

/** 字符串数组字段：非法元素被丢弃（与旧 normalize 行为一致） */
const strArr = (desc: string) =>
  z
    .array(z.unknown())
    .catch([])
    .transform((arr) => arr.filter((x): x is string => typeof x === 'string'))
    .describe(desc)

/** 对象字段：整体非法时回退到全默认值对象 */
const obj = <T extends z.ZodObject<z.ZodRawShape>>(schema: T, desc?: string) => {
  const wrapped = schema.catch(schema.parse({}) as z.infer<T>)
  return desc ? wrapped.describe(desc) : wrapped
}

// ── 区块顺序 ────────────────────────────────────────────────

const sectionOrderSchema = z
  .array(z.unknown())
  .catch([])
  .transform((arr) => {
    const filtered = arr.filter((k): k is SectionKey =>
      (DEFAULT_SECTION_ORDER as readonly string[]).includes(k as string))
    return filtered.length > 0 ? filtered : undefined
  })
  .describe('区块排列顺序；AI 生成时无需输出此字段')

// ── 实体 schema ─────────────────────────────────────────────

const educationEntrySchema = z.object({
  id: str('实体唯一 ID，由系统生成；AI 生成时留空字符串'),
  school: str('学校名称'),
  major: str('专业'),
  period: str('就读时间段，格式如 2021.09 - 2025.06'),
})

const projectItemSchema = z.object({
  id: str('实体唯一 ID，由系统生成；AI 生成时留空字符串'),
  name: str('项目名称'),
  job: str('在项目中担任的角色，如 前端负责人'),
  time: str('项目时间段，格式如 2021.09 - 2025.06'),
  introduce: str('用一两句话描述项目的业务背景与目标'),
  myContribution: strArr('3-5 条项目职责与成果；每条按「背景-动作-量化结果」组织，尽量带数据'),
  skills: str('项目主要技术栈，如 Vue3 + TypeScript + Vite'),
  more: optStr('补充说明（可选）'),
})

const companySchema = z.object({
  id: str('实体唯一 ID，由系统生成；AI 生成时留空字符串'),
  company: str('公司名称'),
  icon: optStr('公司图标路径（可选，一般为空）'),
  projects: z
    .array(obj(projectItemSchema))
    .catch([])
    .describe('该公司/时期内的项目列表'),
})

// ── userInfo / ui ───────────────────────────────────────────

const userInfoSchema = z.object({
  name: str('姓名'),
  job: str('求职意向职位，如「前端开发工程师」'),
  email: str('邮箱；用户未提供则留空字符串，禁止编造'),
  phone: str('手机号；用户未提供则留空字符串，禁止编造'),
  wechat: str('微信号；用户未提供则留空字符串'),
  resumeUrl: str('在线简历链接；没有则留空字符串'),
  blogUrl: str('博客链接；没有则留空字符串'),
  githubUrl: str('GitHub 链接；没有则留空字符串'),
  notionUrl: optStr('Notion 主页链接（可选）'),
  avatar: optStr('头像图片路径（可选）'),
})

const uiSchema = z.object({
  theme: obj(
    z.object({ headerBackground: str('页头背景色（十六进制）', '#0284C7') }),
    '主题配色',
  ),
  copy: obj(
    z.object({
      title: str('复制成功提示的标题', ''),
      message: str('复制成功提示的内容', ''),
    }),
    '复制提示文案',
  ),
  exportPdf: obj(
    z.object({
      button: str('导出 PDF 按钮文案', '导出 PDF'),
      hint: str('导出 PDF 的操作说明', ''),
    }),
    '导出 PDF 文案',
  ),
  sections: obj(
    z.object({
      features: str('「核心优势」区块标题', '核心优势'),
      education: str('「教育背景」区块标题', '教育背景'),
      internship: str('「其他实习」区块标题', '其他实习'),
      projects: str('「工作与项目经历」区块标题', '工作与项目经历'),
      prizes: str('「荣誉与获奖」区块标题', '荣誉与获奖'),
      skills: str('「专业技能」区块标题', '专业技能'),
    }),
    '各区块显示标题',
  ),
  labels: obj(
    z.object({
      projectDescription: str('项目描述标签文案', '项目描述:'),
      projectDuty: str('项目职责标签文案', '项目职责:'),
      techStack: str('主要技术标签文案', '主要技术:'),
    }),
    '项目字段标签',
  ),
})

// ── 顶层 schema ─────────────────────────────────────────────

const resumeDataSchema = z.object({
  userInfo: obj(userInfoSchema, '求职者基本信息'),
  ui: obj(uiSchema, '界面文案与主题配置（AI 生成时使用默认值即可）'),
  education: z
    .array(obj(educationEntrySchema))
    .catch([])
    .describe('教育背景，通常倒序排列'),
  skills: strArr('专业技能列表；每条描述一项技能，可带括号补充说明'),
  prizes: strArr('荣誉与获奖列表'),
  features: strArr('核心优势；3-5 条，每条一句话概括能力亮点'),
  experience: z
    .array(obj(companySchema))
    .catch([])
    .describe('正式工作经历，按公司分组，倒序排列'),
  internship: z
    .array(obj(companySchema))
    .catch([])
    .describe('实习经历，按公司分组，倒序排列'),
  sectionOrder: sectionOrderSchema,
})

/**
 * 基础简历 schema。当前三个布局模板结构未分化，共用此 schema；
 * 未来模板结构分化时，从这里 .extend() 出各自的结构。
 */
export const baseSchema = resumeDataSchema.describe('一份完整的前端工程师简历数据')

/** 编译期同步锁：schema 推导类型必须与 ResumeData 一致，漂移会在 build 时报错 */
const _typeLock: ResumeData = baseSchema.parse({})
void _typeLock
