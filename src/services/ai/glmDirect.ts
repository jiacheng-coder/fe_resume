/**
 * 本地开发直连 GLM（仅 dev 模式使用）。
 * 组装请求体逻辑与 api/generate.ts 保持一致，避免 dev/prod 行为差异。
 * 生产环境仍走 /api/generate，apiKey 不暴露给前端。
 */

import { buildSystemPrompt, toJSONSchema } from '@/schema/aiPrompt'
import { getSchemaByTemplateId } from '@/schema/templates'
import type { GenerateRequest, GenerateResponse } from './glmClient'

const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
const GLM_TIMEOUT_MS = 55_000

interface GlmMessage {
  role: 'system' | 'user'
  content: string
}

export async function callGLMDirect(
  apiKey: string,
  req: GenerateRequest,
): Promise<GenerateResponse> {
  const schema = getSchemaByTemplateId(req.templateId)
  const systemPrompt = buildSystemPrompt(schema)
  const userPrompt = req.retryHint
    ? `${req.description}\n\n【重试提示】上次输出存在以下问题，请修正后重新输出完整 JSON：${req.retryHint}`
    : req.description

  const body: Record<string, unknown> = {
    model: 'glm-4-flash',
    temperature: 0.3,
    max_tokens: 4000,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ] as GlmMessage[],
  }

  // dev 直连同样尝试 json_schema；失败时降级（与 serverless 一致）
  const tryCall = async (useSchema: boolean): Promise<GenerateResponse> => {
    const callBody = useSchema
      ? {
          ...body,
          response_format: {
            type: 'json_schema',
            json_schema: { name: 'resume', schema: toJSONSchema(schema) },
          },
        }
      : {
          ...body,
          messages: [
            {
              role: 'system',
              content: `${systemPrompt}\n\n完整 JSON Schema 结构定义：\n${JSON.stringify(toJSONSchema(schema))}`,
            },
            { role: 'user', content: userPrompt },
          ] as GlmMessage[],
        }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), GLM_TIMEOUT_MS)
    try {
      const resp = await fetch(GLM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(callBody),
        signal: controller.signal,
      })
      const result = (await resp.json()) as Record<string, unknown>
      if (!resp.ok) {
        const err = result.error as Record<string, unknown> | undefined
        const msg = (err?.message as string) || JSON.stringify(result).slice(0, 500)
        return { ok: false, error: `GLM API 错误（${resp.status}）: ${msg}` }
      }
      const choices = result.choices as Array<Record<string, unknown>> | undefined
      const message = choices?.[0]?.message as Record<string, unknown> | undefined
      const content = message?.content
      if (typeof content !== 'string' || !content) {
        return { ok: false, error: 'GLM 返回内容为空' }
      }
      return { ok: true, content }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      return { ok: false, error: `GLM 请求失败: ${msg}` }
    } finally {
      clearTimeout(timer)
    }
  }

  const first = await tryCall(true)
  if (!first.ok && first.error?.includes('400')) {
    return tryCall(false)
  }
  return first
}
