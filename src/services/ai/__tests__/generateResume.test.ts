import { describe, it, expect, vi, afterEach } from 'vitest'
import { generateResumeFromDescription, extractJSON } from '../generateResume'

function mockFetchSequence(responses: Array<{ ok: boolean; content?: string; error?: string; status?: number }>) {
  let i = 0
  const fn = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) => {
    const r = responses[Math.min(i++, responses.length - 1)]
    return new Response(JSON.stringify(r), {
      status: r.ok ? 200 : (r.status ?? 400),
      headers: { 'Content-Type': 'application/json' },
    })
  })
  vi.stubGlobal('fetch', fn)
  return fn
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('extractJSON', () => {
  it('解析纯 JSON', () => {
    expect(extractJSON('{"a":1}')).toEqual({ a: 1 })
  })

  it('剥 Markdown 围栏', () => {
    expect(extractJSON('```json\n{"a":1}\n```')).toEqual({ a: 1 })
    expect(extractJSON('结果如下：\n```\n{"a":1}\n```\n以上。')).toEqual({ a: 1 })
  })

  it('前后带解释文字', () => {
    expect(extractJSON('好的，这是结果 {"a":{"b":2}} 请查收')).toEqual({ a: { b: 2 } })
  })

  it('无 JSON 时抛错', () => {
    expect(() => extractJSON('没有 JSON')).toThrow()
  })
})

describe('generateResumeFromDescription', () => {
  it('一次成功：解析 + 归一化 + 补实体 id', async () => {
    mockFetchSequence([{
      ok: true,
      content: JSON.stringify({
        userInfo: { name: '张三', job: '前端工程师' },
        education: [{ school: '北大', major: '计算机', period: '2017.09 - 2021.06' }],
        experience: [{ company: '美团', projects: [{ name: '营销平台' }] }],
      }),
    }])

    const data = await generateResumeFromDescription('我叫张三，做了三年前端')
    expect(data.userInfo.name).toBe('张三')
    expect(data.userInfo.job).toBe('前端工程师')
    expect(data.education[0].id).not.toBe('')
    expect(data.experience[0].projects[0].id).not.toBe('')
    expect(data.skills).toEqual([])
  })

  it('第一次输出非法，携带错误自修复重试成功', async () => {
    const fn = mockFetchSequence([
      { ok: true, content: '抱歉，我无法生成 JSON。' },
      { ok: true, content: '```json\n{"userInfo":{"name":"李四"}}\n```' },
    ])

    const data = await generateResumeFromDescription('我叫李四，做前端的')
    expect(data.userInfo.name).toBe('李四')
    expect(fn).toHaveBeenCalledTimes(2)
    // 第二次请求应携带 retryHint
    const secondBody = JSON.parse((fn.mock.calls[1][1] as RequestInit).body as string)
    expect(secondBody.retryHint).toBeTruthy()
  })

  it('两次均失败：抛出明确错误', async () => {
    mockFetchSequence([
      { ok: true, content: 'no json here' },
      { ok: true, content: 'still no json' },
    ])
    await expect(generateResumeFromDescription('我叫王五，做后端的')).rejects.toThrow('两次生成均无法解析')
  })

  it('服务端直接报错：不重试，抛出错误', async () => {
    const fn = mockFetchSequence([{ ok: false, error: '请求过于频繁', status: 429 }])
    await expect(generateResumeFromDescription('我叫赵六，做算法的')).rejects.toThrow('请求过于频繁')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
