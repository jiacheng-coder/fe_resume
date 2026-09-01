import type { z } from 'zod'

/**
 * 宽容归一化：任意输入 → schema 合法数据。
 * - 缺失字段补默认值；类型错误回退默认值
 * - 未知字段丢弃
 * - 输入完全非法（null / 非对象）时返回全默认值对象
 *
 * 返回深拷贝，避免调用方修改结果时污染 schema 内置的默认值引用。
 */
export function normalize<T extends z.ZodTypeAny>(schema: T, raw: unknown): z.infer<T> {
  const input = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
  const parsed = schema.parse(input)
  return JSON.parse(JSON.stringify(parsed)) as z.infer<T>
}
