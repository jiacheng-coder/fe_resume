import { ref, computed, watch } from 'vue'
import { baseSeed as seed } from '@/config/seed'
import type { ResumeData, ResumeProfile } from '@/types/resume'
import { cloneResume } from '@/utils/resumeClone'
import { ensureEntityIds } from '@/utils/ensureEntityIds'
import {
  getProfile,
  listProfiles,
  createProfile,
  updateProfileData,
  renameProfile,
  deleteProfile,
  duplicateProfile,
  migrateFromLocalStorageIfNeeded,
} from '@/db/crud'


/** localStorage 备份 key（最近一份简历的快照） */
const BACKUP_KEY = 'fe_resume_backup_v1'

/** 深度比较两个 ResumeData 是否有差异（简化版：JSON 序列化比对） */
function isDirty(a: ResumeData, b: ResumeData): boolean {
  return JSON.stringify(a) !== JSON.stringify(b)
}

/** 将最近一份简历写入 localStorage 作为兜底备份 */
function writeBackup(profile: ResumeProfile) {
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(profile))
  } catch {
    // localStorage 满了或其他异常，静默忽略
  }
}

export function useResumeStore() {
  // ── state ──────────────────────────────────────────────
  const currentProfile = ref<ResumeProfile | null>(null)
  const profileList = ref<ResumeProfile[]>([])
  const loading = ref(false)
  const loaded = ref(false)

  /** 是否有未保存的更改 */
  const dirty = ref(false)
  /** 自动保存状态：idle | saving | saved */
  const saveStatus = ref<'idle' | 'saving' | 'saved'>('idle')

  /** 上次持久化时的 data 快照，用于判断是否真的有变更 */
  let lastSavedData: ResumeData | null = null
  /** 上次持久化时的标题快照 */
  let lastSavedTitle = ''

  // ── getters ────────────────────────────────────────────
  const resume = computed(() => {
    if (currentProfile.value) return currentProfile.value.data
    return seed
  })

  const currentProfileId = computed(() => currentProfile.value?.id ?? null)

  // ── actions ────────────────────────────────────────────

  /** 加载简历列表 */
  async function refreshList() {
    profileList.value = await listProfiles()
  }

  /** 首次初始化：迁移旧数据 + 加载列表 */
  async function init() {
    if (loaded.value) return
    loaded.value = true
    loading.value = true
    try {
      await migrateFromLocalStorageIfNeeded()
      await refreshList()

      // 如果有简历，自动选中最新的那份
      if (profileList.value.length > 0) {
        profileList.value[0].data = ensureEntityIds(profileList.value[0].data)
        currentProfile.value = profileList.value[0]
        lastSavedData = cloneResume(profileList.value[0].data)
        lastSavedTitle = profileList.value[0].title
      }
    } catch (e) {
      console.error('[resumeStore] 初始化失败：', e)
      loaded.value = false // 允许重试
    } finally {
      loading.value = false
    }
  }

  /** 新建简历 */
  async function create(title: string, data?: ResumeData, templateId?: string, roleId?: string) {
    const profile = await createProfile(title, data, templateId, roleId)
    await refreshList()
    currentProfile.value = profile
    lastSavedData = cloneResume(profile.data)
    lastSavedTitle = profile.title
    dirty.value = false
    writeBackup(profile)
    return profile
  }

  /** 根据 ID 加载简历 */
  async function loadById(id: string) {
    const profile = await getProfile(id)
    if (profile) {
      profile.data = ensureEntityIds(profile.data)
      currentProfile.value = profile
      lastSavedData = cloneResume(profile.data)
      lastSavedTitle = profile.title
      dirty.value = false
    }
    return profile
  }

  /**
   * 保存当前简历内容到 IndexedDB。
   * 如果 currentProfile 为空则新建一份。
   * @param title 如果传入，会先同步标题到 currentProfile
   */
  async function save(title?: string) {
    if (currentProfile.value) {
      // 同步标题（自动保存和手动保存都会经过这里）
      if (title !== undefined && title.trim()) {
        currentProfile.value.title = title.trim()
      }
      await updateProfileData(
        currentProfile.value.id,
        currentProfile.value.data,
        currentProfile.value.templateId,
      )
      // 同步内存中的 updatedAt
      currentProfile.value.updatedAt = new Date().toISOString()
      await refreshList()
      lastSavedData = cloneResume(currentProfile.value.data)
      lastSavedTitle = currentProfile.value.title
      dirty.value = false
      writeBackup(currentProfile.value)
    } else {
      const profile = await create(title || '我的简历', resume.value)
      await refreshList()
      currentProfile.value = profile
      lastSavedData = cloneResume(profile.data)
      lastSavedTitle = profile.title
      dirty.value = false
      writeBackup(profile)
    }
  }

  /** 保存为副本（另存为） */
  async function saveAs(title: string) {
    const profile = await create(title, resume.value)
    await refreshList()
    currentProfile.value = profile
    lastSavedData = cloneResume(profile.data)
    lastSavedTitle = profile.title
    dirty.value = false
    writeBackup(profile)
    return profile
  }

  /** 重命名 */
  async function rename(id: string, title: string) {
    await renameProfile(id, title)
    await refreshList()
    if (currentProfile.value?.id === id) {
      currentProfile.value = (await getProfile(id)) ?? null
    }
  }

  /** 删除 */
  async function remove(id: string) {
    await deleteProfile(id)
    await refreshList()
    if (currentProfile.value?.id === id) {
      currentProfile.value = profileList.value[0] ?? null
      if (currentProfile.value) {
        lastSavedData = cloneResume(currentProfile.value.data)
        lastSavedTitle = currentProfile.value.title
        dirty.value = false
      }
    }
  }

  /** 复制 */
  async function duplicate(id: string) {
    const copy = await duplicateProfile(id)
    if (copy) {
      await refreshList()
    }
    return copy
  }

  /** 恢复到默认模板（不清空 id，只重置 data） */
  function resetToSeed() {
    if (currentProfile.value) {
      currentProfile.value.data = ensureEntityIds(cloneResume(seed))
    } else {
      currentProfile.value = {
        id: '',
        title: '我的简历',
        data: ensureEntityIds(cloneResume(seed)),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
    // 重置后标记为已修改，触发自动保存
    markDirty()
  }

  // ── 自动保存（debounce 2s） ────────────────────────────

  let autoSaveTimer: ReturnType<typeof setTimeout> | null = null
  /** 保存版本号：每次 markDirty 递增，用于检测保存回调是否过期 */
  let saveVersion = 0
  /** 是否有保存正在进行中（用于串行化） */
  let saveInFlight = false
  /** 在保存期间又产生了新的变更，需要在当前保存结束后再保存一次 */
  let saveAgain = false

  /** 立即触发的保存（跳过 debounce） */
  async function flushSave() {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
      autoSaveTimer = null
    }
    if (dirty.value && currentProfile.value) {
      await doSave()
    }
  }

  /** 待保存的标题（由编辑器通过 markDirty 同步） */
  let pendingTitle: string | undefined = undefined

  /** 实际执行保存的内部方法（串行化） */
  async function doSave() {
    // 如果已有保存在进行中，标记需要再次保存
    if (saveInFlight) {
      saveAgain = true
      return
    }
    saveInFlight = true
    const myVersion = ++saveVersion

    try {
      saveStatus.value = 'saving'
      // 再次确认确实有变更（避免频繁触发但内容相同）
      const dataChanged = !lastSavedData || isDirty(currentProfile.value!.data, lastSavedData)
      const titleChanged = pendingTitle !== undefined && pendingTitle !== lastSavedTitle
      if (!dataChanged && !titleChanged) {
        dirty.value = false
        saveStatus.value = 'saved'
        setTimeout(() => { if (saveStatus.value === 'saved') saveStatus.value = 'idle' }, 1500)
        return
      }
      await save(pendingTitle)
      pendingTitle = undefined
      saveStatus.value = 'saved'
      setTimeout(() => { if (saveStatus.value === 'saved') saveStatus.value = 'idle' }, 1500)
    } catch (e) {
      console.error('[resumeStore] 自动保存失败：', e)
      saveStatus.value = 'idle'
    } finally {
      saveInFlight = false
      // 如果在保存期间又有新变更，且版本号已更新，则再保存一次
      if (saveAgain && saveVersion !== myVersion) {
        saveAgain = false
        if (dirty.value && currentProfile.value) {
          await doSave()
        }
      } else {
        saveAgain = false
      }
    }
  }

  /** 标记为已修改，并启动 debounce 自动保存 */
  function markDirty(title?: string) {
    dirty.value = true
    saveStatus.value = 'idle'
    if (title !== undefined) pendingTitle = title
    saveVersion++

    if (autoSaveTimer) clearTimeout(autoSaveTimer)
    autoSaveTimer = setTimeout(() => {
      autoSaveTimer = null
      if (dirty.value && currentProfile.value) {
        doSave()
      }
    }, 2000)
  }

  // ── beforeunload 集成 ──────────────────────────────────

  /** 注册 beforeunload 监听，有未保存更改时提示用户 */
  function setupBeforeUnload() {
    window.addEventListener('beforeunload', onBeforeUnload)
  }

  function teardownBeforeUnload() {
    window.removeEventListener('beforeunload', onBeforeUnload)
  }

  function onBeforeUnload(ev: BeforeUnloadEvent) {
    if (dirty.value) {
      ev.preventDefault()
      ev.returnValue = ''
    }
  }

  return {
    // state
    currentProfile,
    profileList,
    loading,
    loaded,
    dirty,
    saveStatus,
    // getters
    resume,
    currentProfileId,
    // actions
    init,
    refreshList,
    create,
    loadById,
    save,
    saveAs,
    rename,
    remove,
    duplicate,
    resetToSeed,
    // auto-save
    markDirty,
    flushSave,
    setupBeforeUnload,
    teardownBeforeUnload,
  }
}

/**
 * 全局单例 store。
 * 使用闭包 + 模块级变量实现，不依赖任何状态管理库。
 * 在 getResumeStore() 首次调用时初始化并注册 beforeunload 监听。
 */
let _store: ReturnType<typeof useResumeStore> | null = null

export function getResumeStore() {
  if (!_store) {
    _store = useResumeStore()
    _store.setupBeforeUnload()
  }
  return _store
}
