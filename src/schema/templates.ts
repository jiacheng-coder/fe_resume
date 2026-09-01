import type { z } from 'zod'
// 注意：本文件会被 Vercel Function (api/) 打包复用，统一使用相对路径导入，不使用 @ 别名
import type { ResumeData } from '../types/resume'
import { baseSchema } from './base'

/** 模板对应的简历数据 schema 类型（宽容输入、输出 ResumeData） */
export type ResumeSchema = z.ZodType<ResumeData, z.ZodTypeDef, unknown>

/**
 * 各布局模板的简历 schema 注册表 —— 与前端模板渲染注册表（templates/registry.ts）解耦，
 * 保证此文件无 Vue 依赖，可同时被前端与 Vercel Function 引用。
 *
 * 模板结构分化时，在此为对应模板从 baseSchema.extend() 派生专属结构，例如：
 *   classic: baseSchema.extend({ userInfo: baseSchema.shape.userInfo.extend({ location: ... }) })
 */
export const templateSchemas: Record<string, ResumeSchema> = {
  ai: baseSchema,
  classic: baseSchema,
  modern: baseSchema,
}

/** 获取模板 schema；未知 id 回退到 baseSchema */
export function getSchemaByTemplateId(templateId: string | undefined): ResumeSchema {
  return (templateId && templateSchemas[templateId]) || baseSchema
}
