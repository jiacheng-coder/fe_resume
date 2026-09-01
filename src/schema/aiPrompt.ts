import { zodToJsonSchema } from 'zod-to-json-schema'
// 注意：本文件会被 Vercel Function (api/) 打包复用，只依赖 zod 生态，不使用 @ 别名
import type { z } from 'zod'

/** 由 zod schema 生成 JSON Schema（供 GLM response_format.json_schema 使用） */
export function toJSONSchema(schema: z.ZodTypeAny): Record<string, unknown> {
  return zodToJsonSchema(schema, { $refStrategy: 'none' }) as Record<string, unknown>
}

/**
 * 遍历 JSON Schema，生成「字段路径: 中文说明」缩进清单，
 * 用于组装 AI 生成简历的 system prompt。
 * 字段说明来源于 schema 中每个字段的 .describe()，结构变更自动跟随。
 */
export function buildAIPrompt(schema: z.ZodTypeAny): string {
  const lines: string[] = []

  const walk = (node: unknown, path: string, depth: number): void => {
    if (!node || typeof node !== 'object') return
    const n = node as Record<string, unknown>
    if (path && typeof n.description === 'string' && n.description) {
      lines.push(`${'  '.repeat(depth)}${path}: ${n.description}`)
    }
    if (n.properties && typeof n.properties === 'object') {
      for (const [key, child] of Object.entries(n.properties as Record<string, unknown>)) {
        walk(child, path ? `${path}.${key}` : key, depth + 1)
      }
    } else if (n.items && typeof n.items === 'object') {
      walk(n.items, `${path}[]`, depth + 1)
    }
  }

  walk(toJSONSchema(schema), '', 0)
  return lines.join('\n')
}

/**
 * 组装 AI 生成简历的完整 system prompt。
 * 结构部分由 schema 的 .describe() 自动派生（结构变更自动跟随）；
 * 内容规范与结构解耦，人工维护。
 */
export function buildSystemPrompt(schema: z.ZodTypeAny): string {
  return [
    '你是一位资深前端简历专家。请根据用户的自述描述，生成一份结构化简历 JSON。',
    '',
    '必须严格遵守以下字段结构（格式为「字段路径: 说明」）：',
    buildAIPrompt(schema),
    '',
    '内容规范：',
    '- myContribution 按「背景-动作-量化结果」组织，3-5 条，尽量带数据量化；',
    '- experience（正式工作）与 internship（实习）按用户描述的时间段正确归类；',
    '- period / time 统一使用 2021.09 - 2025.06 这样的格式；',
    '- 用户未提供的信息一律留空字符串，禁止编造联系方式、经历或成果；',
    '- id、icon、sectionOrder、ui 等系统字段：id 留空字符串，ui 使用默认值，sectionOrder 不输出；',
    '- 只输出一个 JSON 对象，不要输出任何解释或 Markdown 围栏。',
  ].join('\n')
}
