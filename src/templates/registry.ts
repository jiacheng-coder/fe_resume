import { defineAsyncComponent, h, type Component } from 'vue'
import type { ResumeData } from '@/types/resume'

// ── 布局模板 ────────────────────────────────────────────────

export type TemplateMeta = {
  id: string
  name: string
  description: string
  /** 缩略图 CSS 背景色（用于卡片占位） */
  thumbnailColor: string
  /** 布局特点标签（用于卡片展示） */
  tags: string[]
  component: Component
}

/** 异步加载时的 loading 占位组件 */
const LoadingPlaceholder = {
  render() {
    return h('div', {
      class: 'flex items-center justify-center py-20',
    }, [
      h('span', { class: 'loading loading-spinner loading-lg text-slate-400' }),
    ])
  },
}

/** 异步加载失败时的错误组件 */
const ErrorFallback = {
  render() {
    return h('div', {
      class: 'flex flex-col items-center gap-3 py-20 text-center',
    }, [
      h('div', { class: 'text-4xl' }, '😵'),
      h('p', { class: 'text-sm text-slate-500' }, '模板加载失败，请刷新页面重试'),
    ])
  },
}

const ClassicTemplate = defineAsyncComponent({
  loader: () => import('./ClassicTemplate.vue'),
  loadingComponent: LoadingPlaceholder,
  errorComponent: ErrorFallback,
  delay: 200,
  timeout: 10000,
})

const ModernTemplate = defineAsyncComponent({
  loader: () => import('./ModernTemplate.vue'),
  loadingComponent: LoadingPlaceholder,
  errorComponent: ErrorFallback,
  delay: 200,
  timeout: 10000,
})

const AITemplate = defineAsyncComponent({
  loader: () => import('./AITemplate.vue'),
  loadingComponent: LoadingPlaceholder,
  errorComponent: ErrorFallback,
  delay: 200,
  timeout: 10000,
})

export const templates: TemplateMeta[] = [
  {
    id: 'ai',
    name: 'AI 卡片式',
    description: '标签式技能展示 + 卡片化布局，适合技术密度高的简历',
    thumbnailColor: '#059669',
    tags: ['标签技能', '卡片化', '绿色主题'],
    component: AITemplate,
  },
  {
    id: 'classic',
    name: '经典单栏',
    description: '顶部头像横幅 + 单栏从上到下排列，适合传统简历投递',
    thumbnailColor: '#0284C7',
    tags: ['单栏', '传统', '横幅头图'],
    component: ClassicTemplate,
  },
  {
    id: 'modern',
    name: '现代双栏',
    description: '左侧边栏展示联系方式/技能/教育，右侧主体展示经历/项目',
    thumbnailColor: '#7C3AED',
    tags: ['双栏', '侧边栏', '现代感'],
    component: ModernTemplate,
  },
]

export const defaultTemplateId = 'ai'

export function getTemplate(id: string | undefined): TemplateMeta {
  if (!id) return templates[0]
  return templates.find((t) => t.id === id) ?? templates[0]
}

// ── 角色模板 ────────────────────────────────────────────────

export type RoleMeta = {
  id: string
  name: string
  description: string
  /** 主题色 */
  color: string
  /** 图标 (emoji) */
  icon: string
  /** 默认职位 */
  defaultJob: string
  /** 默认技能列表 */
  defaultSkills: string[]
  /** 默认核心优势 */
  defaultFeatures: string[]
  /** 默认 UI 主题色 */
  defaultThemeColor: string
}

export const roles: RoleMeta[] = [
  {
    id: 'ai-engineer',
    name: 'AI 研发工程师',
    description: '突出 LangChain / LangGraph 技能栈，强调 AI 应用工程化与多 Agent 编排能力',
    color: '#059669',
    icon: '🤖',
    defaultJob: 'AI 研发工程师',
    defaultSkills: [
      'LangChain / LangGraph（链路与多步 Agent）',
      'Vercel AI SDK、Claude Agent SDK（流式 UI、工具与 Agent 集成）',
      'Prompt Engineering、长上下文与对话状态管理',
      'RAG：Embedding、向量检索、重排序与知识库治理',
      'OpenAI 及兼容 API（流式、Function Calling）',
      'TypeScript / Node.js',
      'Vue 3 / React 18（大型中后台与复杂交互）',
      'Vite / Webpack、性能与可维护性治理',
    ],
    defaultFeatures: [
      'AI 工程深度：熟悉并实践 LangChain / LangGraph，在 Prompt Engineering、上下文管理上持续投入。',
      '多 Agent 编排：具备多 Agent 协作架构设计与落地经验，能把控 Agent 边界与编排策略。',
      '扎实的工程底座：熟练掌握现代 Web 前端技术栈，具备大型复杂中后台的架构协作经验。',
      '业务落地能力：能将 AI 能力与业务场景深度结合，推动从「流程自动化」向「智能辅助决策」演进。',
    ],
    defaultThemeColor: '#059669',
  },
  {
    id: 'algorithm',
    name: '算法工程师',
    description: '聚焦模型训练与算法优化，强调数据处理、模型部署与工程化能力',
    color: '#0284C7',
    icon: '📊',
    defaultJob: '算法工程师',
    defaultSkills: [
      'Python / C++',
      'PyTorch / TensorFlow / Keras',
      'NLP / LLM 微调（LoRA、QLoRA、RLHF）',
      '计算机视觉（目标检测、图像分割）',
      '模型压缩与部署（ONNX、TensorRT、vLLM）',
      '数据工程（Pandas、Spark、数据清洗与特征工程）',
      'Linux / Docker / Kubernetes',
      'Git / MLflow / Weights & Biases',
    ],
    defaultFeatures: [
      '模型工程能力：具备从数据清洗、特征工程到模型训练、调优、部署的全链路经验。',
      '算法深度：在 NLP / CV 等方向有扎实理论基础，能快速复现并改进前沿论文方法。',
      '工程化思维：关注模型推理性能与资源效率，熟悉模型压缩、量化与服务化部署。',
      '业务理解：能将算法能力与业务指标对齐，用数据驱动的方式验证效果并持续迭代。',
    ],
    defaultThemeColor: '#0284C7',
  },
  {
    id: 'designer',
    name: '设计工程师',
    description: '兼顾设计与工程，强调 Design System、组件库建设与用户体验打磨',
    color: '#7C3AED',
    icon: '🎨',
    defaultJob: '设计工程师',
    defaultSkills: [
      'Figma / Sketch / Adobe XD',
      'Design System / Component Library',
      'React / TypeScript / CSS-in-JS',
      'Tailwind CSS / Styled Components',
      '动效设计（Framer Motion / GSAP / Lottie）',
      '用户研究与可用性测试',
      '前端工程化（Vite / Storybook / Monorepo）',
      '无障碍（A11y）/ 响应式设计',
    ],
    defaultFeatures: [
      '设计工程化：擅长将设计稿转化为高质量前端实现，搭建可复用的 Design System 与组件库。',
      '用户体验驱动：以用户研究和数据验证设计决策，关注交互细节与可用性。',
      '跨职能协作：能在设计与工程团队间架起桥梁，推动设计规范落地与一致性治理。',
      '技术广度：熟练掌握现代前端技术栈，关注动效、性能与无障碍等体验维度。',
    ],
    defaultThemeColor: '#7C3AED',
  },
]

export const defaultRoleId = 'ai-engineer'

export function getRole(id: string | undefined): RoleMeta {
  if (!id) return roles[0]
  return roles.find((r) => r.id === id) ?? roles[0]
}

/**
 * 根据角色生成初始简历数据（基于传入的 base seed 进行覆盖）。
 * 仅覆盖 job、skills、features 和 theme，其余字段保留 base seed 原值。
 */
export function buildRoleSeed(base: ResumeData, role: RoleMeta): ResumeData {
  return {
    ...base,
    userInfo: {
      ...base.userInfo,
      job: role.defaultJob,
    },
    ui: {
      ...base.ui,
      theme: {
        headerBackground: role.defaultThemeColor,
      },
    },
    skills: [...role.defaultSkills],
    features: [...role.defaultFeatures],
  }
}
