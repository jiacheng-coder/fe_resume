import { describe, it, expect } from 'vitest'
import { baseSchema } from '../base'
import { normalize } from '../transform'
import { buildAIPrompt, toJSONSchema } from '../aiPrompt'
import type { ResumeData } from '@/types/resume'

describe('baseSchema（单一事实源）', () => {
  it('空对象解析出全量默认值，且类型与 ResumeData 兼容', () => {
    const data: ResumeData = baseSchema.parse({})
    expect(data.userInfo.name).toBe('')
    expect(data.userInfo.job).toBe('')
    expect(data.skills).toEqual([])
    expect(data.prizes).toEqual([])
    expect(data.features).toEqual([])
    expect(data.experience).toEqual([])
    expect(data.internship).toEqual([])
    expect(data.education).toEqual([])
    expect(data.sectionOrder).toBeUndefined()
    expect(data.ui.theme.headerBackground).toBe('#0284C7')
    expect(data.ui.exportPdf.button).toBe('导出 PDF')
    expect(data.ui.sections.internship).toBe('其他实习')
  })
})

describe('normalize（宽容归一化）', () => {
  it('null / undefined / 非对象输入回退全默认值', () => {
    for (const bad of [null, undefined, 42, 'x', [], true]) {
      const data = normalize(baseSchema, bad)
      expect(data.userInfo.name).toBe('')
      expect(data.experience).toEqual([])
    }
  })

  it('字段类型错误时回退默认值，合法字段保留', () => {
    const data = normalize(baseSchema, {
      userInfo: { name: 123, job: '前端工程师' },
      skills: 'not-an-array',
      education: 'bad',
      features: null,
      experience: [
        {
          company: '美团',
          projects: [{ name: '营销平台', myContribution: ['负责 H5 搭建', 5] }],
        },
      ],
    })
    expect(data.userInfo.name).toBe('')
    expect(data.userInfo.job).toBe('前端工程师')
    expect(data.skills).toEqual([])
    expect(data.education).toEqual([])
    expect(data.features).toEqual([])
    expect(data.experience[0].company).toBe('美团')
    expect(data.experience[0].projects[0].name).toBe('营销平台')
    // 非法元素被丢弃（与旧 normalize 行为一致）
    expect(data.experience[0].projects[0].myContribution).toEqual(['负责 H5 搭建'])
  })

  it('未知字段被丢弃（顶层与嵌套）', () => {
    const data = normalize(baseSchema, {
      foo: 1,
      userInfo: { name: '张三', extra: true },
    })
    expect((data as Record<string, unknown>).foo).toBeUndefined()
    expect((data.userInfo as Record<string, unknown>).extra).toBeUndefined()
    expect(data.userInfo.name).toBe('张三')
  })

  it('sectionOrder 过滤非法项，空则 undefined（与旧逻辑一致）', () => {
    expect(normalize(baseSchema, { sectionOrder: ['features', 'bad', 'skills'] }).sectionOrder)
      .toEqual(['features', 'skills'])
    expect(normalize(baseSchema, { sectionOrder: ['bad'] }).sectionOrder).toBeUndefined()
    expect(normalize(baseSchema, { sectionOrder: 'bad' }).sectionOrder).toBeUndefined()
    expect(normalize(baseSchema, {}).sectionOrder).toBeUndefined()
  })

  it('返回深拷贝，不共享 schema 内置默认值引用', () => {
    const a = normalize(baseSchema, { skills: 'bad' })
    a.skills.push('X')
    const b = normalize(baseSchema, { skills: 'bad' })
    expect(b.skills).toEqual([])
  })

  it('完整合法数据无损通过', () => {
    const input = {
      userInfo: { name: '张三', job: '前端工程师', email: 'a@b.com' },
      education: [{ id: 'e1', school: '北京大学', major: '计算机', period: '2017.09 - 2021.06' }],
      skills: ['Vue3', 'TypeScript'],
      experience: [{
        id: 'c1', company: '美团', projects: [{
          id: 'p1', name: '营销平台', job: '前端负责人', time: '2021.07 - 至今',
          introduce: '面向商家的营销活动搭建平台',
          myContribution: ['负责 H5 搭建器', '性能优化 LCP 降低 40%'],
          skills: 'Vue3 + TypeScript',
        }],
      }],
    }
    const data = normalize(baseSchema, input)
    expect(data.userInfo.name).toBe('张三')
    expect(data.education[0].school).toBe('北京大学')
    expect(data.experience[0].projects[0].myContribution[1]).toContain('40%')
  })
})

describe('AI prompt / JSON Schema 派生', () => {
  it('toJSONSchema 生成含全部顶层字段的 JSON Schema', () => {
    const js = toJSONSchema(baseSchema) as Record<string, any>
    expect(js.type).toBe('object')
    expect(js.properties.userInfo).toBeTruthy()
    expect(js.properties.education).toBeTruthy()
    expect(js.properties.experience).toBeTruthy()
    expect(js.properties.sectionOrder).toBeTruthy()
  })

  it('buildAIPrompt 输出字段路径与中文说明', () => {
    const prompt = buildAIPrompt(baseSchema)
    expect(prompt).toContain('userInfo.name')
    expect(prompt).toContain('姓名')
    expect(prompt).toContain('experience')
    expect(prompt).toContain('myContribution')
    expect(prompt).toContain('禁止编造')
  })
})
