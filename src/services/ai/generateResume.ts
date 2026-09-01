import type { ResumeData } from '@/types/resume'
import { normalize } from '@/schema/transform'
import { ensureEntityIds } from '@/utils/ensureEntityIds'
import { getSchemaByTemplateId } from '@/schema/templates'
import { callGenerate } from './glmClient'

/**
 * 描述 → 简历数据：
 * 调用 /api/generate → 容错解析 JSON（剥围栏）→ 按模板 schema 宽容归一化。
 * 解析失败时携带错误信息自修复重试一次，两次均失败则抛错。
 */

/** 从模型输出文本中提取 JSON：剥 Markdown 围栏，截取首个 { 到最后一个 } */
export function extractJSON(text: string): unknown {
  const stripped = text.replace(/```(?:json)?/gi, '').trim()
  const start = stripped.indexOf('{')
  const end = stripped.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('输出中未找到 JSON 对象')
  }
  return JSON.parse(stripped.slice(start, end + 1))
}

/** 解析并归一化一轮模型输出；失败抛出带原因的错误 */
function tryParse(templateId: string | undefined, content: string): ResumeData {
  if (!content || !content.trim()) throw new Error('模型输出为空')
  const raw = extractJSON(content)
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('输出不是 JSON 对象')
  }
  return ensureEntityIds(normalize(getSchemaByTemplateId(templateId), raw))
}

export class GenerateResumeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GenerateResumeError'
  }
}

/**
 * 根据用户自述描述生成简历数据。
 * @param description 自述描述（10~2000 字）
 * @param templateId 布局模板 ID（默认当前默认模板）
 * @returns 结构合法、实体 id 齐全的 ResumeData
 */
export async function generateResumeFromDescription(
  description: string,
  templateId?: string,
): Promise<ResumeData> {
  // 第一轮
  const first = await callGenerate({ description, templateId })
  if (!first.ok || !first.content) {
    throw new GenerateResumeError(first.error || '生成失败')
  }
  try {
    return tryParse(templateId, first.content)
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e)
    // 自修复重试一次：把失败原因带给模型
    const second = await callGenerate({ description, templateId, retryHint: reason })
    if (!second.ok || !second.content) {
      throw new GenerateResumeError(`${reason}；重试失败：${second.error || '无输出'}`)
    }
    try {
      return tryParse(templateId, second.content)
    } catch (e2) {
      const reason2 = e2 instanceof Error ? e2.message : String(e2)
      throw new GenerateResumeError(`两次生成均无法解析（${reason} / ${reason2}）`)
    }
  }
}
