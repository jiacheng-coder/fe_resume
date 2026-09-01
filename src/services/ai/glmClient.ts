/**
 * 前端唯一调用 /api/generate 的出口。
 * apiKey 在 Vercel Function 服务端持有，前端不接触密钥。
 *
 * 本地开发捷径：在项目根目录创建 `.env.development.local` 写入
 *   VITE_GLM_API_KEY=你的key
 * 即可免配 vercel dev，前端直连 GLM（仅 dev 模式有效，key 不会进产物）。
 */

import { callGLMDirect } from './glmDirect'

export interface GenerateRequest {
  /** 用户自述描述（10~2000 字） */
  description: string
  /** 布局模板 ID，决定生成简历的结构 */
  templateId?: string
  /** 重试提示：上次输出的错误说明，用于自修复重试 */
  retryHint?: string
}

export interface GenerateResponse {
  ok: boolean
  /** GLM 输出的原始文本（可能是带围栏的 JSON） */
  content?: string
  error?: string
}

const TIMEOUT_MS = 120_000

export async function callGenerate(req: GenerateRequest): Promise<GenerateResponse> {
  // ── dev 直连模式：免配 vercel dev ──────────────────────
  const devKey = (import.meta as any).env?.VITE_GLM_API_KEY as string | undefined
  if ((import.meta as any).env?.DEV && devKey) {
    return callGLMDirect(devKey, req)
  }

  // ── 生产/标准模式：走 Vercel Function ─────────────────
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
      signal: controller.signal,
    })
    const data = (await resp.json()) as GenerateResponse
    if (!resp.ok) {
      return { ok: false, error: data.error || `请求失败（${resp.status}）` }
    }
    return data
  } catch (e) {
    const msg = e instanceof Error && e.name === 'AbortError' ? '生成超时，请稍后重试' : '网络错误，请稍后重试'
    return { ok: false, error: msg }
  } finally {
    clearTimeout(timer)
  }
}
