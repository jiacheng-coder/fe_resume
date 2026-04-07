<template>
  <div class="flex h-full min-h-0 flex-col bg-slate-50">
    <div class="shrink-0 border-b border-slate-200 bg-white p-3 shadow-sm">
      <p class="mb-2 text-xs font-medium text-slate-500">本地存储 · 仅本机浏览器</p>
      <div class="flex flex-wrap items-end gap-2">
        <label class="form-control min-w-[8rem] flex-1">
          <span class="label py-0 text-xs">方案名称</span>
          <input
            v-model="saveName"
            type="text"
            placeholder="例如：社招版"
            class="input input-bordered input-sm w-full"
          />
        </label>
        <button type="button" class="btn btn-primary btn-sm" @click="onSave">保存</button>
        <label class="form-control min-w-[10rem]">
          <span class="label py-0 text-xs">继续编辑</span>
          <select v-model="selectedProfile" class="select select-bordered select-sm w-full max-w-xs" @change="onLoadSelected">
            <option value="">— 选择已保存 —</option>
            <option v-for="p in profileList" :key="p" :value="p">{{ p }}</option>
          </select>
        </label>
        <button type="button" class="btn btn-ghost btn-sm" :disabled="!selectedProfile" @click="onDelete">删除所选</button>
        <button type="button" class="btn btn-outline btn-sm" @click="onReset">恢复默认模板</button>
      </div>
      <p v-if="store.currentProfileName" class="mt-1 text-xs text-slate-500">当前：{{ store.currentProfileName }}</p>
      <div class="mt-3 border-t border-slate-100 pt-3">
        <ExportPdfButton />
      </div>
    </div>

    <div class="min-h-0 flex-1 space-y-6 overflow-y-auto p-3">
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">基本信息</h3>
        <label class="text-xs text-slate-600">头像 URL（留空用打包默认图）</label>
        <input v-model="store.resume.userInfo.avatar" type="text" class="input input-bordered input-sm w-full" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="store.resume.userInfo.name" placeholder="姓名" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.job" placeholder="职位" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.email" placeholder="邮箱" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.phone" placeholder="电话" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.wechat" placeholder="微信" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.resumeUrl" placeholder="简历页链接" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.blogUrl" placeholder="博客" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.githubUrl" placeholder="GitHub" class="input input-bordered input-sm" />
          <input v-model="store.resume.userInfo.notionUrl" placeholder="Notion（可选）" class="input input-bordered input-sm sm:col-span-2" />
        </div>
      </section>

      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">主题与界面文案</h3>
        <span class="text-xs text-slate-600">顶栏背景色</span>
        <input v-model="store.resume.ui.theme.headerBackground" type="text" class="input input-bordered input-sm w-full" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="store.resume.ui.copy.title" placeholder="复制提示标题" class="input input-bordered input-sm" />
          <input v-model="store.resume.ui.copy.message" placeholder="复制提示内容" class="input input-bordered input-sm" />
          <input v-model="store.resume.ui.exportPdf.button" placeholder="导出按钮" class="input input-bordered input-sm" />
          <input v-model="store.resume.ui.exportPdf.hint" placeholder="导出说明" class="input input-bordered input-sm" />
        </div>
        <p class="text-xs text-slate-500">区块标题</p>
        <div class="grid gap-2 sm:grid-cols-2">
          <label v-for="key in sectionKeys" :key="key" class="form-control">
            <span class="label py-0 text-[10px]">{{ key }}</span>
            <input v-model="store.resume.ui.sections[key]" class="input input-bordered input-sm" />
          </label>
        </div>
        <p class="text-xs text-slate-500">项目标签</p>
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="store.resume.ui.labels.projectDescription" class="input input-bordered input-sm" />
          <input v-model="store.resume.ui.labels.projectDuty" class="input input-bordered input-sm" />
          <input v-model="store.resume.ui.labels.techStack" class="input input-bordered input-sm sm:col-span-2" />
        </div>
      </section>

      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-800">教育经历</h3>
          <button type="button" class="btn btn-ghost btn-xs" @click="addEducation">+ 一条</button>
        </div>
        <div v-for="(row, i) in store.resume.education" :key="i" class="grid gap-1 rounded border border-slate-100 p-2 sm:grid-cols-3">
          <input v-model="row.school" placeholder="学校" class="input input-bordered input-xs" />
          <input v-model="row.major" placeholder="专业" class="input input-bordered input-xs" />
          <div class="flex gap-1">
            <input v-model="row.period" placeholder="时间" class="input input-bordered input-xs flex-1" />
            <button type="button" class="btn btn-ghost btn-xs" @click="removeEducation(i)">删</button>
          </div>
        </div>
      </section>

      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">技术栈（每行一项）</h3>
        <textarea v-model="skillsText" class="textarea textarea-bordered textarea-sm min-h-[6rem] w-full font-mono text-xs" />
      </section>
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">个人优势（每行一条）</h3>
        <textarea v-model="featuresText" class="textarea textarea-bordered textarea-sm min-h-[8rem] w-full font-mono text-xs" />
      </section>
      <section class="space-y-2 rounded-lg bg-white p-3 shadow-sm">
        <h3 class="text-sm font-bold text-slate-800">获奖（每行一条）</h3>
        <textarea v-model="prizesText" class="textarea textarea-bordered textarea-sm min-h-[4rem] w-full font-mono text-xs" />
      </section>

      <section class="space-y-3 rounded-lg bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-800">项目经历</h3>
          <button type="button" class="btn btn-ghost btn-xs" @click="addExperienceCompany">+ 公司</button>
        </div>
        <div v-for="(exp, ei) in store.resume.experience" :key="ei" class="space-y-2 rounded border border-slate-200 p-2">
          <div class="flex flex-wrap gap-1">
            <input v-model="exp.company" placeholder="公司 / 组织名" class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <input v-model="exp.icon" placeholder="图标路径（可选）/icons/..." class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <button type="button" class="btn btn-ghost btn-xs" @click="removeExperienceCompany(ei)">删公司</button>
          </div>
          <button type="button" class="btn btn-ghost btn-xs" @click="addExperienceProject(ei)">+ 项目</button>
          <div v-for="(proj, pi) in exp.projects" :key="pi" class="ml-2 space-y-1 border-l-2 border-sky-200 pl-2">
            <ResumeProjectFields v-model="exp.projects[pi]" @remove="removeExperienceProject(ei, pi)" />
          </div>
        </div>
      </section>

      <section class="space-y-3 rounded-lg bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-800">实习经历</h3>
          <button type="button" class="btn btn-ghost btn-xs" @click="addInternshipCompany">+ 公司</button>
        </div>
        <div v-for="(exp, ei) in store.resume.internship" :key="ei" class="space-y-2 rounded border border-slate-200 p-2">
          <div class="flex flex-wrap gap-1">
            <input v-model="exp.company" placeholder="公司名" class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <input v-model="exp.icon" placeholder="图标路径 /icons/..." class="input input-bordered input-sm min-w-[8rem] flex-1" />
            <button type="button" class="btn btn-ghost btn-xs" @click="removeInternshipCompany(ei)">删公司</button>
          </div>
          <button type="button" class="btn btn-ghost btn-xs" @click="addInternshipProject(ei)">+ 项目</button>
          <div v-for="(proj, pi) in exp.projects" :key="pi" class="ml-2 space-y-1 border-l-2 border-amber-200 pl-2">
            <ResumeProjectFields v-model="exp.projects[pi]" @remove="removeInternshipProject(ei, pi)" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useResumeEditorStore } from '@/store/resumeEditorStore'
import type { project, projects } from '@/types/projectsType'
import type { ResumeData } from '@/types/resume'
import ResumeProjectFields from './ResumeProjectFields.vue'
import ExportPdfButton from '@/components/ExportPdfButton.vue'

const store = useResumeEditorStore()

const sectionKeys: (keyof ResumeData['ui']['sections'])[] = [
  'features',
  'education',
  'internship',
  'projects',
  'prizes',
  'skills',
]

const saveName = ref('')
const selectedProfile = ref('')
const profileList = ref<string[]>([])

function refreshList() {
  profileList.value = store.listProfiles()
}

const skillsText = computed({
  get: () => store.resume.skills.join('\n'),
  set: (v: string) => {
    store.resume.skills = v.split('\n').map((s) => s.trim()).filter(Boolean)
  },
})
const featuresText = computed({
  get: () => store.resume.features.join('\n'),
  set: (v: string) => {
    store.resume.features = v.split('\n').map((s) => s.trim()).filter(Boolean)
  },
})
const prizesText = computed({
  get: () => store.resume.prizes.join('\n'),
  set: (v: string) => {
    store.resume.prizes = v.split('\n').map((s) => s.trim()).filter(Boolean)
  },
})

function emptyProject(): project {
  return {
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
  return { company: '', icon: '', projects: [emptyProject()] }
}

function addEducation() {
  store.resume.education.push({ school: '', major: '', period: '' })
}
function removeEducation(i: number) {
  store.resume.education.splice(i, 1)
}

function addExperienceCompany() {
  store.resume.experience.push(emptyCompany())
}
function removeExperienceCompany(i: number) {
  store.resume.experience.splice(i, 1)
}
function addExperienceProject(ei: number) {
  store.resume.experience[ei].projects.push(emptyProject())
}
function removeExperienceProject(ei: number, pi: number) {
  store.resume.experience[ei].projects.splice(pi, 1)
}

function addInternshipCompany() {
  store.resume.internship.push({ ...emptyCompany(), icon: '' })
}
function removeInternshipCompany(i: number) {
  store.resume.internship.splice(i, 1)
}
function addInternshipProject(ei: number) {
  store.resume.internship[ei].projects.push(emptyProject())
}
function removeInternshipProject(ei: number, pi: number) {
  store.resume.internship[ei].projects.splice(pi, 1)
}

function onSave() {
  if (!saveName.value.trim()) {
    saveName.value = '我的简历'
  }
  store.saveAs(saveName.value.trim())
  refreshList()
  selectedProfile.value = store.currentProfileName || ''
}

function onLoadSelected() {
  if (!selectedProfile.value) return
  store.loadProfile(selectedProfile.value)
  saveName.value = selectedProfile.value
}

function onDelete() {
  if (!selectedProfile.value) return
  if (!confirm(`确定删除方案「${selectedProfile.value}」？`)) return
  store.deleteProfile(selectedProfile.value)
  refreshList()
  selectedProfile.value = ''
}

function onReset() {
  if (!confirm('恢复为默认模板（未保存的修改会丢失）？')) return
  store.resetToSeed()
}

watch(
  () => store.currentProfileName,
  (n) => {
    if (n) saveName.value = n
  }
)

onMounted(() => {
  refreshList()
  saveName.value = store.currentProfileName || '我的简历'
  selectedProfile.value = store.currentProfileName || ''
})
</script>
