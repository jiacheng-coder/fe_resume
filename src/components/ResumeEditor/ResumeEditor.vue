<template>
  <div class="flex h-full min-h-0 flex-col bg-slate-50">
    <div class="shrink-0 border-b border-slate-200 bg-white p-3 shadow-sm">
      <!-- 标题 + 保存状态 -->
      <div class="mb-3 flex items-center gap-2">
        <span class="text-sm font-bold text-slate-700">{{ store.currentProfile.value?.title || '未保存' }}</span>
        <!-- 自动保存状态指示器 -->
        <span
          v-if="store.saveStatus.value !== 'idle'"
          class="ml-auto flex items-center gap-1 text-xs"
          :class="store.saveStatus.value === 'saving' ? 'text-slate-400' : 'text-emerald-500'"
        >
          <span v-if="store.saveStatus.value === 'saving'" class="loading loading-spinner loading-xs"></span>
          {{ store.saveStatus.value === 'saving' ? '保存中…' : '已自动保存' }}
        </span>
        <span v-else-if="store.dirty.value" class="ml-auto text-xs text-amber-500">未保存</span>
      </div>

      <!-- 保存操作 -->
      <div class="flex flex-wrap items-end gap-2">
        <label class="form-control min-w-[8rem] flex-1">
          <span class="label py-0 text-xs">标题</span>
          <input
            v-model="titleInput"
            type="text"
            placeholder="例如：社招版"
            class="input input-bordered input-sm w-full"
          />
        </label>
        <button type="button" class="btn btn-primary btn-sm" @click="onSave">保存</button>
        <button type="button" class="btn btn-outline btn-sm" @click="onSaveAs">另存为</button>
        <button type="button" class="btn btn-ghost btn-sm" @click="onPreview">预览</button>
        <router-link
          v-if="store.currentProfileId.value"
          :to="'/preview/' + store.currentProfileId.value"
          class="btn btn-ghost btn-sm"
        >预览链接</router-link>
      </div>

      <!-- 快捷键提示 -->
      <div class="mt-1.5 flex flex-wrap gap-2 text-[10px] text-slate-400">
        <span><kbd>Ctrl</kbd>+<kbd>S</kbd> 保存</span>
        <span><kbd>Ctrl</kbd>+<kbd>P</kbd> 预览</span>
        <span><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> 另存为</span>
      </div>

      <!-- 导出工具 -->
      <div class="mt-3 space-y-2 border-t border-slate-100 pt-3">
        <ExportPdfButton />
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="btn btn-outline btn-sm" @click="copyResumeJson">复制 JSON</button>
          <button type="button" class="btn btn-ghost btn-sm" @click="onReset">恢复模板内容</button>
          <span v-if="exportFeedback" class="text-xs text-emerald-600">{{ exportFeedback }}</span>
        </div>
        <p class="text-xs leading-relaxed text-slate-500">
          编辑后自动保存到浏览器本地（IndexedDB），换设备可通过「导出/导入」迁移。
        </p>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="min-h-0 flex-1 space-y-6 overflow-y-auto p-3">

      <!-- 模板选择 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">模板选择</h3>
        <div class="grid gap-2 sm:grid-cols-2">
          <button
            v-for="tpl in allTemplates"
            :key="tpl.id"
            type="button"
            class="flex items-center gap-3 rounded-lg border-2 p-3 text-left transition"
            :class="currentTemplateId === tpl.id ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-slate-300'"
            @click="onSelectTemplate(tpl.id)"
          >
            <div class="h-10 w-10 shrink-0 rounded" :style="{ backgroundColor: tpl.thumbnailColor }"></div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-slate-800">{{ tpl.name }}</p>
              <p class="text-xs text-slate-500">{{ tpl.description }}</p>
            </div>
          </button>
        </div>
      </section>

      <!-- 区块排序 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">区块排序</h3>
        <p class="text-xs text-slate-500">拖拽以下卡片调整简历中各区块的显示顺序</p>
        <div class="space-y-1">
          <div
            v-for="(key, i) in sectionOrderArr"
            :key="key"
            draggable="true"
            class="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 p-2 transition"
            :class="{
              'border-sky-400 bg-sky-50': sectionSort.overIndex.value === i,
              'opacity-40': sectionSort.dragIndex.value === i,
            }"
            @dragstart="sectionSort.onDragStart(i)"
            @dragover="sectionSort.onDragOver(i, $event)"
            @drop="sectionSort.onDrop(i, $event)"
            @dragend="sectionSort.onDragEnd"
          >
            <span class="cursor-grab text-slate-400">⣿</span>
            <span class="text-xs font-mono text-slate-400">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="flex-1 text-sm text-slate-700">{{ sectionLabel(key) }}</span>
            <span class="text-xs text-slate-400">{{ key }}</span>
          </div>
        </div>
      </section>

      <!-- 基本信息 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">基本信息</h3>
        <label class="text-xs text-slate-600">头像 URL（留空用打包默认图）</label>
        <input v-model="resumeData.userInfo.avatar" type="text" class="input input-bordered input-sm w-full" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="resumeData.userInfo.name" placeholder="姓名" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.job" placeholder="职位" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.email" placeholder="邮箱" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.phone" placeholder="电话" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.wechat" placeholder="微信" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.resumeUrl" placeholder="简历页链接" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.blogUrl" placeholder="博客" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.githubUrl" placeholder="GitHub" class="input input-bordered input-sm" />
          <input v-model="resumeData.userInfo.notionUrl" placeholder="Notion（可选）" class="input input-bordered input-sm sm:col-span-2" />
        </div>
      </section>

      <!-- 主题与界面文案 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">主题与界面文案</h3>
        <span class="text-xs text-slate-600">顶栏背景色</span>
        <input v-model="resumeData.ui.theme.headerBackground" type="text" class="input input-bordered input-sm w-full" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="resumeData.ui.copy.title" placeholder="复制提示标题" class="input input-bordered input-sm" />
          <input v-model="resumeData.ui.copy.message" placeholder="复制提示内容" class="input input-bordered input-sm" />
          <input v-model="resumeData.ui.exportPdf.button" placeholder="导出按钮" class="input input-bordered input-sm" />
          <input v-model="resumeData.ui.exportPdf.hint" placeholder="导出说明" class="input input-bordered input-sm" />
        </div>
        <p class="text-xs text-slate-500">区块标题</p>
        <div class="grid gap-2 sm:grid-cols-2">
          <label v-for="key in sectionKeys" :key="key" class="form-control">
            <span class="label py-0 text-[10px]">{{ key }}</span>
            <input v-model="resumeData.ui.sections[key]" class="input input-bordered input-sm" />
          </label>
        </div>
        <p class="text-xs text-slate-500">项目标签</p>
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="resumeData.ui.labels.projectDescription" class="input input-bordered input-sm" />
          <input v-model="resumeData.ui.labels.projectDuty" class="input input-bordered input-sm" />
          <input v-model="resumeData.ui.labels.techStack" class="input input-bordered input-sm sm:col-span-2" />
        </div>
      </section>

      <!-- 核心优势 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">核心优势（每行一条）</h3>
        <textarea v-model="featuresText" class="textarea textarea-bordered textarea-sm min-h-[8rem] w-full font-mono text-xs" />
      </section>

      <!-- 工作与项目经历 -->
      <section class="space-y-3 rounded-lg bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-800">工作与项目经历</h3>
          <button type="button" class="btn btn-ghost btn-xs" @click="addExperienceCompany">+ 公司 / 组织</button>
        </div>
        <p class="text-xs text-slate-400">拖拽 ⣿ 手柄可调整公司顺序</p>
        <div
          v-for="(exp, ei) in resumeData.experience"
          :key="exp.id || ei"
          class="space-y-2 rounded border border-slate-200 p-2 transition"
          :class="{
            'border-sky-400 bg-sky-50': expSort.overIndex.value === ei,
            'opacity-40': expSort.dragIndex.value === ei,
          }"
          @dragover="expSort.onDragOver(ei, $event)"
          @drop="expSort.onDrop(ei, $event)"
          @dragend="expSort.onDragEnd"
        >
          <div class="flex flex-wrap items-center gap-1">
            <span class="cursor-grab text-slate-400" draggable="true" @dragstart="expSort.onDragStart(ei)">⣿</span>
            <input v-model="exp.company" placeholder="公司 / 组织名" class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <input v-model="exp.icon" placeholder="图标路径（可选）/icons/..." class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <button type="button" class="btn btn-ghost btn-xs" @click="removeExperienceCompany(ei)">删公司</button>
          </div>
          <!-- 项目内拖拽 -->
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <button type="button" class="btn btn-ghost btn-xs" @click="addExperienceProject(ei)">+ 项目</button>
              <span class="text-xs text-slate-400">拖拽 ⣿ 调整项目顺序</span>
            </div>
            <div
              v-for="(proj, pi) in exp.projects"
              :key="proj.id || pi"
              class="ml-2 space-y-1 border-l-2 border-sky-200 pl-2 transition"
              :class="{
                'border-sky-400 bg-sky-50': projSort.overIndex.value === pi,
                'opacity-40': projSort.dragIndex.value === pi,
              }"
              @dragover="onProjDragOver(ei, pi, $event)"
              @drop="onProjDrop(ei, pi, $event)"
              @dragend="onProjDragEnd"
            >
              <div class="flex items-center gap-1">
                <span class="cursor-grab text-xs text-slate-400" draggable="true" @dragstart="onProjDragStart(ei, pi)">⣿</span>
              </div>
              <ResumeProjectFields v-model="exp.projects[pi]" @remove="removeExperienceProject(ei, pi)" />
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-800">教育背景</h3>
          <button type="button" class="btn btn-ghost btn-xs" @click="addEducation">+ 一条</button>
        </div>
        <div
          v-for="(row, i) in resumeData.education"
          :key="row.id || i"
          class="grid gap-1 rounded border border-slate-100 p-2 transition sm:grid-cols-3"
          :class="{
            'border-sky-400 bg-sky-50': eduSort.overIndex.value === i,
            'opacity-40': eduSort.dragIndex.value === i,
          }"
          @dragover="eduSort.onDragOver(i, $event)"
          @drop="eduSort.onDrop(i, $event)"
          @dragend="eduSort.onDragEnd"
        >
          <div class="flex items-center gap-1 sm:col-span-3">
            <span class="cursor-grab text-xs text-slate-400" draggable="true" @dragstart="eduSort.onDragStart(i)">⣿</span>
            <span class="text-xs text-slate-400">拖拽排序</span>
          </div>
          <input v-model="row.school" placeholder="学校" class="input input-bordered input-xs" />
          <input v-model="row.major" placeholder="专业" class="input input-bordered input-xs" />
          <div class="flex gap-1">
            <input v-model="row.period" placeholder="时间" class="input input-bordered input-xs flex-1" />
            <button type="button" class="btn btn-ghost btn-xs" @click="removeEducation(i)">删</button>
          </div>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">专业技能（每行一项）</h3>
        <textarea v-model="skillsText" class="textarea textarea-bordered textarea-sm min-h-[6rem] w-full font-mono text-xs" />
      </section>

      <!-- 荣誉与获奖 -->
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">荣誉与获奖（每行一条）</h3>
        <textarea v-model="prizesText" class="textarea textarea-bordered textarea-sm min-h-[4rem] w-full font-mono text-xs" />
      </section>

      <!-- 其他实习 -->
      <section class="space-y-3 rounded-lg bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-800">其他实习（可选）</h3>
          <button type="button" class="btn btn-ghost btn-xs" @click="addInternshipCompany">+ 公司</button>
        </div>
        <p class="text-xs text-slate-500">与「工作与项目」重复时只填一处即可；有数据时预览区会单独显示本区块。</p>
        <div v-for="(exp, ei) in resumeData.internship" :key="exp.id || ei" class="space-y-2 rounded border border-slate-200 p-2">
          <div class="flex flex-wrap gap-1">
            <input v-model="exp.company" placeholder="公司名" class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <input v-model="exp.icon" placeholder="图标路径 /icons/..." class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <button type="button" class="btn btn-ghost btn-xs" @click="removeInternshipCompany(ei)">删公司</button>
          </div>
          <button type="button" class="btn btn-ghost btn-xs" @click="addInternshipProject(ei)">+ 项目</button>
          <div v-for="(proj, pi) in exp.projects" :key="proj.id || pi" class="ml-2 space-y-1 border-l-2 border-amber-200 pl-2">
            <ResumeProjectFields v-model="exp.projects[pi]" @remove="removeInternshipProject(ei, pi)" />
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- 另存为对话框 -->
  <ConfirmDialog
    v-model="saveAsDialogOpen"
    title="另存为"
    input-mode
    :input-value="titleInput"
    input-placeholder="请输入新标题"
    confirm-text="保存"
    @confirm="onSaveAsConfirm"
  />

  <!-- 恢复默认模板确认对话框 -->
  <ConfirmDialog
    v-model="resetDialogOpen"
    title="恢复默认模板"
    message="当前编辑的内容会被覆盖，确定恢复为默认模板内容吗？"
    confirm-text="恢复"
    confirm-class="btn-warning"
    @confirm="store.resetToSeed()"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import copy from 'copy-to-clipboard'
import { getResumeStore } from '@/store'
import { cloneResume } from '@/utils/resumeClone'
import { genEntityId } from '@/utils/ensureEntityIds'
import { useDragSort } from '@/composables/useDragSort'
import { templates, defaultTemplateId } from '@/templates/registry'
import type { project, projects } from '@/types/projectsType'
import type { ResumeData, SectionKey } from '@/types/resume'
import { DEFAULT_SECTION_ORDER } from '@/types/resume'
import ResumeProjectFields from './ResumeProjectFields.vue'
import ExportPdfButton from '@/components/ExportPdfButton.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const router = useRouter()
const store = getResumeStore()
const exportFeedback = ref('')
const titleInput = ref('')

// ── 另存为对话框 ──────────────────────────────────────────
const saveAsDialogOpen = ref(false)
const resetDialogOpen = ref(false)

const allTemplates = templates

const resumeData = computed<ResumeData>(() => {
  if (store.currentProfile.value) {
    return store.currentProfile.value.data
  }
  return store.resume.value
})

// ── 模板选择 ──────────────────────────────────────────────

const currentTemplateId = computed(() => {
  return store.currentProfile.value?.templateId ?? defaultTemplateId
})

// ── 自动保存：监听 resumeData 变化 ────────────────────────

watch(
  resumeData,
  () => {
    store.markDirty()
  },
  { deep: true },
)

// 标题变化也触发 dirty，并传递标题值以便自动保存同步
watch(titleInput, (val) => {
  store.markDirty(val)
})

// 模板变化也触发 dirty
watch(currentTemplateId, () => {
  store.markDirty()
})

// ── 键盘快捷键 ────────────────────────────────────────────

function onKeyDown(e: KeyboardEvent) {
  // Ctrl/Cmd + S → 保存
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    onSave()
    return
  }
  // Ctrl/Cmd + P → 预览
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault()
    onPreview()
    return
  }
  // Ctrl/Cmd + Shift + S → 另存为
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
    e.preventDefault()
    saveAsDialogOpen.value = true
    return
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

// 路由离开时如果有未保存更改则 flush
onUnmounted(() => {
  store.flushSave()
  window.removeEventListener('keydown', onKeyDown)
})

function onSelectTemplate(id: string) {
  if (store.currentProfile.value) {
    store.currentProfile.value.templateId = id
  }
}

// ── 区块排序 ──────────────────────────────────────────────

const sectionKeys: SectionKey[] = [...DEFAULT_SECTION_ORDER]

const sectionOrderArr = computed<SectionKey[]>({
  get() {
    const order = resumeData.value.sectionOrder
    if (!order || !order.length) return DEFAULT_SECTION_ORDER
    const valid = order.filter((k) => sectionKeys.includes(k))
    const missing = DEFAULT_SECTION_ORDER.filter((k) => !valid.includes(k))
    return [...valid, ...missing]
  },
  set(val: SectionKey[]) {
    resumeData.value.sectionOrder = [...val]
  },
})

function sectionLabel(key: SectionKey): string {
  return resumeData.value.ui.sections[key] || key
}

// ── 拖拽排序（统一使用 useDragSort composable） ────────────

// 区块排序
const sectionSort = useDragSort(
  computed(() => sectionOrderArr.value),
  {
    onReorder: (from: number, to: number) => {
      const arr = [...sectionOrderArr.value]
      const item = arr.splice(from, 1)[0]
      arr.splice(to, 0, item)
      sectionOrderArr.value = arr
    },
  },
)

// 经历公司排序
const expSort = useDragSort(
  computed(() => resumeData.value.experience),
  {
    onReorder: (from: number, to: number) => {
      const arr = resumeData.value.experience
      const item = arr.splice(from, 1)[0]
      arr.splice(to, 0, item)
    },
  },
)

// 项目排序（公司内）—— 需要限定在同一个公司内
const projSortCompany = ref<number | null>(null)
const projSort = useDragSort(
  computed(() =>
    projSortCompany.value !== null
      ? resumeData.value.experience[projSortCompany.value]?.projects ?? []
      : [],
  ),
  {
    onReorder: (from: number, to: number) => {
      if (projSortCompany.value === null) return
      const arr = resumeData.value.experience[projSortCompany.value].projects
      const item = arr.splice(from, 1)[0]
      arr.splice(to, 0, item)
    },
  },
)

function onProjDragStart(ei: number, pi: number) {
  projSortCompany.value = ei
  projSort.onDragStart(pi)
}
function onProjDragOver(ei: number, pi: number, ev: DragEvent) {
  if (projSortCompany.value !== ei) return
  projSort.onDragOver(pi, ev)
}
function onProjDrop(ei: number, pi: number, ev: DragEvent) {
  if (projSortCompany.value !== ei) {
    projSort.onDragEnd()
    return
  }
  projSort.onDrop(pi, ev)
  projSortCompany.value = null
}
function onProjDragEnd() {
  projSort.onDragEnd()
  projSortCompany.value = null
}

// 教育条目排序
const eduSort = useDragSort(
  computed(() => resumeData.value.education),
  {
    onReorder: (from: number, to: number) => {
      const arr = resumeData.value.education
      const item = arr.splice(from, 1)[0]
      arr.splice(to, 0, item)
    },
  },
)

// ── 标题同步 ──────────────────────────────────────────────

watch(
  () => store.currentProfile.value?.title,
  (t) => {
    titleInput.value = t ?? ''
  },
  { immediate: true },
)

// ── 工具方法 ──────────────────────────────────────────────

function resumeJsonString(): string {
  return JSON.stringify(cloneResume(resumeData.value), null, 2)
}

function copyResumeJson() {
  const ok = copy(resumeJsonString())
  exportFeedback.value = ok ? '已复制到剪贴板' : '复制失败，请检查浏览器权限'
  window.setTimeout(() => {
    exportFeedback.value = ''
  }, 2500)
}

const skillsText = computed({
  get: () => resumeData.value.skills.join('\n'),
  set: (v: string) => {
    resumeData.value.skills = v.split('\n').map((s) => s.trim()).filter(Boolean)
  },
})
const featuresText = computed({
  get: () => resumeData.value.features.join('\n'),
  set: (v: string) => {
    resumeData.value.features = v.split('\n').map((s) => s.trim()).filter(Boolean)
  },
})
const prizesText = computed({
  get: () => resumeData.value.prizes.join('\n'),
  set: (v: string) => {
    resumeData.value.prizes = v.split('\n').map((s) => s.trim()).filter(Boolean)
  },
})

function emptyProject(): project {
  return {
    id: genEntityId(),
    name: '',
    job: '',
    time: '',
    introduce: '',
    myContribution: [''],
    skills: '',
    more: '',
  }
}

function emptyCompany(): projects {
  return { id: genEntityId(), company: '', icon: '', projects: [emptyProject()] }
}

function addEducation() {
  resumeData.value.education.push({ id: genEntityId(), school: '', major: '', period: '' })
}
function removeEducation(i: number) {
  resumeData.value.education.splice(i, 1)
}

function addExperienceCompany() {
  resumeData.value.experience.push(emptyCompany())
}
function removeExperienceCompany(i: number) {
  resumeData.value.experience.splice(i, 1)
}
function addExperienceProject(ei: number) {
  resumeData.value.experience[ei].projects.push(emptyProject())
}
function removeExperienceProject(ei: number, pi: number) {
  resumeData.value.experience[ei].projects.splice(pi, 1)
}

function addInternshipCompany() {
  resumeData.value.internship.push({ ...emptyCompany(), icon: '' })
}
function removeInternshipCompany(i: number) {
  resumeData.value.internship.splice(i, 1)
}
function addInternshipProject(ei: number) {
  resumeData.value.internship[ei].projects.push(emptyProject())
}
function removeInternshipProject(ei: number, pi: number) {
  resumeData.value.internship[ei].projects.splice(pi, 1)
}

async function onSave() {
  if (store.currentProfile.value && titleInput.value.trim()) {
    store.currentProfile.value.title = titleInput.value.trim()
  }
  await store.save(titleInput.value.trim() || undefined)
  exportFeedback.value = '已保存'
  window.setTimeout(() => { exportFeedback.value = '' }, 2000)
}

async function onSaveAs() {
  saveAsDialogOpen.value = true
}

async function onSaveAsConfirm(title: string) {
  const trimmed = title.trim()
  if (!trimmed) return
  const profile = await store.saveAs(trimmed)
  if (profile) {
    router.push('/editor/' + profile.id)
  }
}

function onPreview() {
  const id = store.currentProfileId.value
  if (id) {
    router.push('/preview/' + id)
  }
}

function onReset() {
  resetDialogOpen.value = true
}
</script>

<style scoped>
/* 快捷键提示样式 */
kbd {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 10px;
  font-family: monospace;
  color: #64748b;
}
</style>
