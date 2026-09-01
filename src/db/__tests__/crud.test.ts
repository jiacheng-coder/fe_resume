import { describe, it, expect } from 'vitest'
import { normalizeProfile } from '../crud'

describe('normalizeProfile（crud，schema 化重构后行为回归）', () => {
  it('最小合法输入补全为完整 profile', () => {
    const p = normalizeProfile({ id: 'r1' }, 0)
    expect(p.id).toBe('r1')
    expect(p.title).toBe('未命名简历')
    expect(p.templateId).toBe('ai')
    expect(p.roleId).toBeUndefined()
    expect(p.data.userInfo.name).toBe('')
    expect(p.data.skills).toEqual([])
    expect(p.data.ui.theme.headerBackground).toBe('#0284C7')
  })

  it('非法输入抛错', () => {
    expect(() => normalizeProfile(null, 0)).toThrow('不是有效对象')
    expect(() => normalizeProfile({}, 0)).toThrow('缺少有效 id')
    expect(() => normalizeProfile({ id: '' }, 0)).toThrow('缺少有效 id')
  })

  it('data 为垃圾值时回退默认值，不抛错', () => {
    for (const bad of [undefined, 42, 'x', null]) {
      const p = normalizeProfile({ id: 'r2', data: bad }, 0)
      expect(p.data.userInfo.name).toBe('')
      expect(p.data.experience).toEqual([])
    }
  })

  it('保留合法数据并丢弃未知字段', () => {
    const p = normalizeProfile({
      id: 'r3',
      title: '我的简历',
      templateId: 'classic',
      data: {
        foo: 1,
        userInfo: { name: '张三', extra: 2 },
        education: [{ school: '北大', major: '计算机', period: '2017-2021' }],
      },
    }, 0)
    expect(p.title).toBe('我的简历')
    expect(p.templateId).toBe('classic')
    expect((p.data as Record<string, unknown>).foo).toBeUndefined()
    expect(p.data.userInfo.name).toBe('张三')
    expect(p.data.education[0].school).toBe('北大')
  })

  it('ensureEntityIds 为缺失 id 的实体补 id', () => {
    const p = normalizeProfile({
      id: 'r4',
      data: {
        education: [{ school: '北大' }],
        experience: [{ company: '美团', projects: [{ name: 'P1' }] }],
      },
    }, 0)
    expect(p.data.education[0].id).not.toBe('')
    expect(p.data.experience[0].id).not.toBe('')
    expect(p.data.experience[0].projects[0].id).not.toBe('')
  })
})
