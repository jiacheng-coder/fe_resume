import type { IncomingMessage, ServerResponse } from 'http'
import { getSchemaByTemplateId } from '../src/schema/templates'
import { buildSystemPrompt, toJSONSchema } from '../src/schema/aiPrompt'

/**
 * POST /api/generate
 * Body: { description: string, templateId?: string, retryHint?: string }
 *
 * 职责：入参校验 → IP 限流 → 按模板 schema 组装 GLM 请求（json_schema 结构化输出，
 * 不支持时降级 json_object + prompt 内附结构）→ 透传模型输出文本。
 * JSON 解析、normalize、失败重试均在前端 generateResume 中完成。
 */

// Vercel：简历生成为长耗时请求，放宽到 60s（Hobby 计划上限）
export const maxDuration = 60

const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
const MODEL = process.env.GLM_MODEL || 'glm-4-flash'
const DESCRIPTION_MIN = 10
const DESCRIPTION_MAX = 2000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const GLM_TIMEOUT_MS = 55_000

// ── 最小请求/响应类型（不引入 @vercel/node 依赖） ─────────────

type Req = IncomingMessage & {
  method?: string
  body?: unknown
  headers: Record<string, string | string[] | undefined>
}
type Res = ServerResponse

function send(res: Res, status: number, data: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

// ── 内存级 IP 限流（单实例有效，足够挡住误刷） ────────────────

const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (list.length >= RATE_LIMIT_MAX) {
    hits.set(ip, list)
    return true
  }
  list.push(now)
  hits.set(ip, list)
  return false
}

function getClientIp(req: Req): string {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim()
  if (Array.isArray(fwd) && fwd.length) return fwd[0]
  return req.socket.remoteAddress ?? 'unknown'
}

// ── 入参校验 ─────────────────────────────────────────────────

interface GenerateBody {
  description: string
  templateId?: string
  retryHint?: string
}

function parseBody(req: Req): GenerateBody | null {
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return null
    }
  }
  if (!body || typeof body !== 'object') return null
  const { description, templateId, retryHint } = body as Record<string, unknown>
  if (typeof description !== 'string') return null
  const trimmed = description.trim()
  if (trimmed.length < DESCRIPTION_MIN || trimmed.length > DESCRIPTION_MAX) return null
  if (templateId !== undefined && typeof templateId !== 'string') return null
  if (retryHint !== undefined && (typeof retryHint !== 'string' || retryHint.length > 2000)) return null
  return {
    description: trimmed,
    templateId: typeof templateId === 'string' ? templateId : undefined,
    retryHint: typeof retryHint === 'string' && retryHint.trim() ? retryHint.trim() : undefined,
  }
}

// ── GLM 调用 ─────────────────────────────────────────────────

interface GlmMessage {
  role: 'system' | 'user'
  content: string
}

async function callGLM(
  apiKey: string,
  messages: GlmMessage[],
  jsonSchema?: Record<string, unknown>,
): Promise<{ status: number; text: string }> {
  const body: Record<string, unknown> = {
    model: MODEL,
    temperature: 0.3,
    max_tokens: 4000,
    messages,
  }
  if (jsonSchema) {
    body.response_format = {
      type: 'json_schema',
      json_schema: { name: 'resume', schema: jsonSchema },
    }
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
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    const result = (await resp.json()) as Record<string, unknown>
    if (!resp.ok) {
      const err = result.error as Record<string, unknown> | undefined
      const msg = (err?.message as string) || JSON.stringify(result).slice(0, 500)
      return { status: resp.status, text: `GLM API 错误（${resp.status}）: ${msg}` }
    }
    const choices = result.choices as Array<Record<string, unknown>> | undefined
    const content = choices?.[0]?.message?.content
    if (typeof content !== 'string' || !content) {
      return { status: 502, text: 'GLM 返回内容为空' }
    }
    return { status: 200, text: content }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { status: 502, text: `GLM 请求失败: ${msg}` }
  } finally {
    clearTimeout(timer)
  }
}

// ── handler ──────────────────────────────────────────────────

export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== 'POST') {
    send(res, 405, { ok: false, error: '仅支持 POST' })
    return
  }

  const apiKey = process.env.GLM_API_KEY
  if (!apiKey) {
    send(res, 500, { ok: false, error: '服务端未配置 GLM_API_KEY 环境变量' })
    return
  }

  if (isRateLimited(getClientIp(req))) {
    send(res, 429, { ok: false, error: '请求过于频繁，请稍后再试（每分钟最多 5 次）' })
    return
  }

  const body = parseBody(req)
  if (!body) {
    send(res, 400, {
      ok: false,
      error: `参数不合法：description 需为 ${DESCRIPTION_MIN}~${DESCRIPTION_MAX} 字的字符串`,
    })
    return
  }

  const schema = getSchemaByTemplateId(body.templateId)
  const systemPrompt = buildSystemPrompt(schema)
  const userPrompt = body.retryHint
    ? `${body.description}\n\n【重试提示】上次输出存在以下问题，请修正后重新输出完整 JSON：${body.retryHint}`
    : body.description

  const messages: GlmMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]

  // 首选：json_schema 严格结构化输出；模型不支持（400）时降级为 prompt 内附结构
  let result = await callGLM(apiKey, messages, toJSONSchema(schema))
  if (result.status === 400) {
    result = await callGLM(
      apiKey,
      [
        { role: 'system', content: `${systemPrompt}\n\n完整 JSON Schema 结构定义：\n${JSON.stringify(toJSONSchema(schema))}` },
        { role: 'user', content: userPrompt },
      ],
      undefined,
    )
  }

  if (result.status !== 200) {
    send(res, result.status, { ok: false, error: result.text })
    return
  }

  send(res, 200, { ok: true, content: result.text })
}
