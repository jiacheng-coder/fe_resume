import { db } from './index'
import type { ResumeProfile, ResumeData, ResumeExportFile } from '@/types/resume'
import { cloneResume } from '@/utils/resumeClone'
import { ensureEntityIds } from '@/utils/ensureEntityIds'
import { baseSeed as seed } from '@/config/seed'
import { defaultTemplateId, defaultRoleId, getTemplateSchema } from '@/templates/registry'
import { normalize } from '@/schema/transform'


/** 生成唯一 ID */
export function genId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `r_${crypto.randomUUID()}`
  }
  return `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/** 创建一份新简历（基于默认模板或传入的 data） */
export async function createProfile(
  title: string,
  data?: ResumeData,
  templateId?: string,
  roleId?: string,
): Promise<ResumeProfile> {
  const now = new Date().toISOString()
  const profile: ResumeProfile = {
    id: genId(),
    title: title.trim() || '未命名简历',
    templateId: templateId ?? defaultTemplateId,
    roleId: roleId ?? defaultRoleId,
    data: data ? ensureEntityIds(cloneResume(data)) : ensureEntityIds(cloneResume(seed)),
    createdAt: now,
    updatedAt: now,
  }
  await db.profiles.put(profile)
  return profile
}

/** 获取单份简历 */
export async function getProfile(id: string): Promise<ResumeProfile | undefined> {
  return db.profiles.get(id)
}

/** 获取所有简历（按更新时间降序） */
export async function listProfiles(): Promise<ResumeProfile[]> {
  const all = await db.profiles.toArray()
  return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

/** 更新简历内容（自动更新 updatedAt） */
export async function updateProfileData(
  id: string,
  data: ResumeData,
  templateId?: string,
): Promise<void> {
  if (templateId !== undefined) {
    await db.profiles.update(id, {
      data: cloneResume(data),
      templateId,
      updatedAt: new Date().toISOString(),
    })
  } else {
    await db.profiles.update(id, {
      data: cloneResume(data),
      updatedAt: new Date().toISOString(),
    })
  }
}

/** 重命名简历标题 */
export async function renameProfile(id: string, title: string): Promise<void> {
  await db.profiles.update(id, {
    title: title.trim() || '未命名简历',
    updatedAt: new Date().toISOString(),
  })
}

/** 删除简历 */
export async function deleteProfile(id: string): Promise<void> {
  await db.profiles.delete(id)
}

/** 复制一份简历 */
export async function duplicateProfile(id: string): Promise<ResumeProfile | undefined> {
  const src = await db.profiles.get(id)
  if (!src) return undefined
  const now = new Date().toISOString()
  const copy: ResumeProfile = {
    id: genId(),
    title: `${src.title} 副本`,
    templateId: src.templateId ?? defaultTemplateId,
    data: ensureEntityIds(cloneResume(src.data)),
    createdAt: now,
    updatedAt: now,
  }
  await db.profiles.put(copy)
  return copy
}

// ── 导入 / 导出 ──────────────────────────────────────────

/** 导出所有简历为可序列化对象 */
export async function exportAllProfiles(): Promise<ResumeExportFile> {
  const profiles = await listProfiles()
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    profiles,
  }
}

/** 导出单份简历 */
export async function exportProfile(id: string): Promise<ResumeExportFile | undefined> {
  const profile = await db.profiles.get(id)
  if (!profile) return undefined
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    profiles: [profile],
  }
}

/**
 * 校验并补全导入的 profile 数据（结构校验由模板 schema 统一完成）。
 * 缺失字段用 schema 默认值补全，未知字段丢弃；结构严重不合法则抛错。
 * 该函数同时被 AI 生成简历链路复用。
 */
export function normalizeProfile(raw: unknown, index: number): ResumeProfile {
  if (!raw || typeof raw !== 'object') {
    throw new Error(`第 ${index + 1} 份简历数据不是有效对象`)
  }
  const obj = raw as Record<string, unknown>

  // 必需字段校验
  if (typeof obj.id !== 'string' || !obj.id) {
    throw new Error(`第 ${index + 1} 份简历缺少有效 id`)
  }

  const now = new Date().toISOString()
  const templateId = typeof obj.templateId === 'string' && obj.templateId
    ? obj.templateId
    : defaultTemplateId

  return {
    id: obj.id,
    title: typeof obj.title === 'string' && obj.title ? obj.title : '未命名简历',
    templateId,
    roleId: typeof obj.roleId === 'string' ? obj.roleId : undefined,
    data: ensureEntityIds(normalize(getTemplateSchema(templateId), obj.data)),
    createdAt: typeof obj.createdAt === 'string' ? obj.createdAt : now,
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : now,
  }
}

/** 从导入文件恢复简历（已有相同 id 的会被覆盖，自动校验并补全缺失字段） */
export async function importProfiles(file: ResumeExportFile): Promise<number> {
  if (!file || typeof file !== 'object') {
    throw new Error('文件格式不正确：不是有效的 JSON 对象')
  }
  if (file.version !== 1 || !Array.isArray(file.profiles)) {
    throw new Error('文件格式不正确：版本号或 profiles 字段不合法')
  }
  if (file.profiles.length === 0) {
    throw new Error('文件中没有简历数据')
  }

  const normalized = file.profiles.map((raw, i) => normalizeProfile(raw, i))
  await db.profiles.bulkPut(normalized)
  return normalized.length
}

/**
 * 首次使用时迁移 localStorage 中的旧数据。
 * 如果 IndexedDB 为空且 localStorage 中有旧 profile，则自动导入。
 */
export async function migrateFromLocalStorageIfNeeded(): Promise<void> {
  const count = await db.profiles.count()
  if (count > 0) return

  const STORAGE_KEY = 'fe_resume_editor_profiles_v1'
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  try {
    const oldProfiles = JSON.parse(raw) as Record<string, ResumeData>
    const now = new Date().toISOString()
    const entries = Object.entries(oldProfiles)
    if (entries.length === 0) return

    const newProfiles: ResumeProfile[] = entries.map(([name, data]) => ({
      id: genId(),
      title: name,
      data: ensureEntityIds(cloneResume(data)),
      createdAt: now,
      updatedAt: now,
    }))

    await db.profiles.bulkPut(newProfiles)
    // 迁移完成后清理旧数据
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('fe_resume_editor_last_active_v1')
  } catch {
    // 迁移失败静默忽略，不影响正常使用
  }
}
