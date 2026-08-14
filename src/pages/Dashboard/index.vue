<template>
  <div class="dashboard-root">
    <!-- ── 顶部导航 ────────────────────────────────────────── -->
    <header ref="headerRef" class="no-print sticky top-0 z-30 bg-white/80 backdrop-blur-xl" style="opacity: 0">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div class="flex items-center gap-2.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0f62fe] to-[#0043ce] text-sm font-bold text-white shadow-sm shadow-[#0f62fe]/30">简</div>
          <span class="text-base font-semibold text-[#161616]">简站</span>
          <span class="hidden text-xs text-[#8c8c8c] sm:inline">纯前端 · 本地简历生成器</span>
        </div>
        <div class="flex items-center gap-2">
          <!-- 导入按钮 -->
          <button
            class="group inline-flex items-center gap-1.5 rounded-lg border border-[#e0e0e0] bg-white px-3 py-1.5 text-xs font-medium text-[#525252] transition-all hover:border-[#0f62fe] hover:text-[#0f62fe] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e0e0e0] disabled:hover:text-[#525252]"
            @click="onImportClick"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v9M4.5 5.5L8 2l3.5 3.5M3 13h10" />
            </svg>
            <span>导入</span>
          </button>
          <!-- 导出按钮 -->
          <button
            class="group inline-flex items-center gap-1.5 rounded-lg bg-[#0f62fe] px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#0043ce] hover:shadow-sm hover:shadow-[#0f62fe]/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#0f62fe] disabled:hover:shadow-none"
            :disabled="store.profileList.value.length === 0"
            @click="onExportAll"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 11V2M4.5 7.5L8 11l3.5-3.5M3 13h10" />
            </svg>
            <span>导出全部</span>
          </button>
          <input ref="importInput" type="file" accept=".json" class="hidden" @change="onImportFile" />
        </div>
      </div>
    </header>

    <!-- ── Hero 区域 ────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-white">
      <!-- 装饰背景 -->
      <div ref="heroDecoRef" class="pointer-events-none absolute inset-0" style="opacity: 0">
        <!-- 渐变光斑 -->
        <div class="hero-blob hero-blob--1"></div>
        <div class="hero-blob hero-blob--2"></div>
        <div class="hero-blob hero-blob--3"></div>
        <!-- 网格 -->
        <div class="hero-grid"></div>
        <!-- 底部渐变过渡 -->
        <div class="hero-fade-bottom"></div>
      </div>

      <div class="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <!-- Eyebrow badge -->
        <div ref="eyebrowRef" class="mb-6" style="opacity: 0">
          <span class="inline-flex items-center gap-2 rounded-full bg-[#0f62fe]/8 px-3.5 py-1.5 text-xs font-medium text-[#0f62fe]">
            <span class="relative flex h-1.5 w-1.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0f62fe] opacity-75"></span>
              <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0f62fe]"></span>
            </span>
            纯前端 · 数据本地存储 · 开箱即用
          </span>
        </div>

        <!-- 大标题 -->
        <h1 class="mb-6 text-4xl font-light leading-[1.15] tracking-tight text-[#161616] sm:text-6xl">
          <span ref="heroTitleRef" class="hero-title-word inline-block" style="opacity: 0">写简历，</span><br class="hidden sm:block" />
          <span ref="heroTitle2Ref" class="hero-title-word inline-block bg-gradient-to-r from-[#0f62fe] to-[#6f8fff] bg-clip-text text-transparent" style="opacity: 0">就这么简单。</span>
        </h1>

        <!-- 副标题 -->
        <p ref="heroSubRef" class="mb-10 max-w-lg text-base leading-relaxed text-[#525252] sm:text-lg" style="opacity: 0">
          简站是一个纯前端简历生成器，数据存储在浏览器本地，无需注册、无需登录。支持多模板切换、实时预览、一键导出 PDF，让你的简历专业又高效。
        </p>

        <!-- CTA 按钮 -->
        <div ref="heroCtaRef" class="flex flex-wrap items-center gap-3" style="opacity: 0">
          <button
            class="group inline-flex items-center gap-2 rounded-lg bg-[#0f62fe] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#0f62fe]/25 transition-all hover:bg-[#0043ce] hover:shadow-xl hover:shadow-[#0f62fe]/30 active:scale-[0.98]"
            @click="onCreate"
          >
            <svg class="h-4 w-4 transition-transform group-hover:rotate-90" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
            <span>新建简历</span>
          </button>
          <a
            v-if="store.profileList.value.length > 0"
            href="#my-resumes"
            class="inline-flex items-center gap-1.5 rounded-lg border border-[#e0e0e0] bg-white px-5 py-2.5 text-sm font-medium text-[#525252] transition-all hover:border-[#0f62fe] hover:text-[#0f62fe] hover:shadow-sm"
          >
            <span>查看我的简历</span>
            <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </a>
        </div>

        <!-- 统计数据 -->
        <div ref="heroStatsRef" class="mt-16 flex gap-8 sm:gap-14" style="opacity: 0">
          <div class="stat-item">
            <div class="text-3xl font-light text-[#161616] sm:text-4xl">{{ store.profileList.value.length }}</div>
            <div class="mt-1 text-xs text-[#8c8c8c] sm:text-sm">份简历</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="text-3xl font-light text-[#161616] sm:text-4xl">{{ roles.length }}<span class="text-xl text-[#8c8c8c]">+</span>{{ templates.length }}</div>
            <div class="mt-1 text-xs text-[#8c8c8c] sm:text-sm">角色 + 布局</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="text-3xl font-light text-[#161616] sm:text-4xl">100<span class="text-xl text-[#8c8c8c]">%</span></div>
            <div class="mt-1 text-xs text-[#8c8c8c] sm:text-sm">本地存储</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 特性卡片 ────────────────────────────────────────── -->
    <section class="mx-auto max-w-5xl px-6 py-12">
      <div ref="featuresTitleRef" class="mb-1 flex items-center gap-2" style="opacity: 0">
        <div class="h-4 w-1 rounded-full bg-[#0f62fe]"></div>
        <h2 class="text-lg font-medium text-[#161616]">为什么选择简站</h2>
      </div>
      <p ref="featuresSubRef" class="mb-6 pl-3 text-sm text-[#8c8c8c]" style="opacity: 0">四个核心能力，覆盖简历制作全流程</p>

      <div ref="featuresGridRef" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(feat, i) in features"
          :key="feat.title"
          class="feature-card group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-[#e0e0e0] bg-white p-5 transition-all hover:border-[#0f62fe]/40 hover:shadow-lg hover:shadow-[#0f62fe]/8"
          style="opacity: 0"
          @mouseenter="onFeatureEnter"
          @mouseleave="onFeatureLeave"
        >
          <!-- 顶部渐变条 -->
          <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#0f62fe] to-[#6f8fff] opacity-0 transition-opacity group-hover:opacity-100"></div>

          <div class="feat-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f62fe]/6 text-[#0f62fe] transition-all group-hover:bg-[#0f62fe] group-hover:text-white">
            <component :is="feat.iconComp" />
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-semibold text-[#161616]">{{ feat.title }}</h3>
            <p class="mt-1 text-xs leading-relaxed text-[#525252]">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 我的简历 ────────────────────────────────────────── -->
    <section id="my-resumes" class="mx-auto max-w-5xl px-6 pb-24">
      <!-- 加载中 -->
      <div v-if="store.loading.value" class="flex justify-center py-20">
        <span class="loading loading-spinner loading-lg text-[#0f62fe]"></span>
      </div>

      <template v-else>
        <!-- 标题行 -->
        <div ref="titleSectionRef" class="mb-6 flex items-center justify-between" style="opacity: 0">
          <div class="flex items-center gap-2">
            <h2 class="text-2xl font-light text-[#161616]">我的简历</h2>
            <span v-if="store.profileList.value.length > 0" class="rounded-full bg-[#f4f4f4] px-2 py-0.5 text-xs font-medium text-[#8c8c8c]">{{ store.profileList.value.length }}</span>
          </div>
          <button
            v-if="store.profileList.value.length > 0"
            class="inline-flex items-center gap-1.5 rounded-lg border border-[#0f62fe] px-3 py-1.5 text-xs font-medium text-[#0f62fe] transition-all hover:bg-[#0f62fe] hover:text-white hover:shadow-sm hover:shadow-[#0f62fe]/25"
            @click="onCreate"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
            <span>新建</span>
          </button>
        </div>

        <!-- 空状态 -->
        <div
          v-if="store.profileList.value.length === 0"
          ref="emptyStateRef"
          class="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-[#d0d0d0] bg-gradient-to-b from-[#fafbfc] to-white py-20"
          style="opacity: 0"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0f62fe]/6">
            <svg class="h-10 w-10 text-[#0f62fe]" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 6h18l8 8v28H12z" />
              <path d="M30 6v8h8" />
              <path d="M18 26h16M18 32h16M18 20h8" />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-lg font-medium text-[#161616]">还没有简历</p>
            <p class="mt-1 text-sm text-[#8c8c8c]">点击下方按钮，创建你的第一份简历</p>
          </div>
          <button
            class="group inline-flex items-center gap-2 rounded-lg bg-[#0f62fe] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#0f62fe]/25 transition-all hover:bg-[#0043ce] hover:shadow-xl hover:shadow-[#0f62fe]/30 active:scale-[0.98]"
            @click="onCreate"
          >
            <svg class="h-4 w-4 transition-transform group-hover:rotate-90" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
            <span>新建简历</span>
          </button>
        </div>

        <!-- 简历卡片列表 -->
        <div v-else ref="cardGridRef" class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="profile in store.profileList.value"
            :key="profile.id"
            class="resume-card group relative flex flex-col overflow-hidden rounded-xl border border-[#e0e0e0] bg-white p-5 transition-all hover:border-[#0f62fe]/40 hover:shadow-lg hover:shadow-[#0f62fe]/8"
            style="opacity: 0"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <!-- 左侧色条 -->
            <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0f62fe] to-[#6f8fff] opacity-0 transition-opacity group-hover:opacity-100"></div>

            <!-- 标题与时间 -->
            <div class="mb-3 flex items-start justify-between">
              <div class="min-w-0 flex-1">
                <h3 class="truncate text-lg font-semibold text-[#161616]">{{ profile.title }}</h3>
                <p class="mt-0.5 text-xs text-[#8c8c8c]">
                  更新于 {{ formatDate(profile.updatedAt) }}
                </p>
              </div>
              <!-- 操作菜单 -->
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="flex h-7 w-7 items-center justify-center rounded-lg text-[#8c8c8c] transition-colors hover:bg-[#f4f4f4] hover:text-[#525252]">⋯</label>
                <ul tabindex="0" class="menu dropdown-content z-10 w-40 rounded-lg border border-[#e0e0e0] bg-white p-1 shadow-lg">
                  <li><a @click="onDuplicate(profile.id)">复制</a></li>
                  <li><a @click="onRename(profile)">重命名</a></li>
                  <li><a @click="onExportOne(profile.id)">导出</a></li>
                  <li><a @click="onDelete(profile)" class="text-red-500">删除</a></li>
                </ul>
              </div>
            </div>

            <!-- 预览信息 -->
            <div class="mb-4 flex-1">
              <div class="flex items-center gap-2 text-sm text-[#525252]">
                <svg class="h-3.5 w-3.5 text-[#8c8c8c]" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <circle cx="8" cy="6" r="3" />
                  <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
                </svg>
                <span>{{ profile.data.userInfo.name || '—' }} · {{ profile.data.userInfo.job || '—' }}</span>
              </div>
              <div class="mt-1.5 flex items-center gap-2 text-xs text-[#8c8c8c]">
                <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <rect x="2" y="3" width="12" height="10" rx="1" />
                  <path d="M2 6h12M5 9h6" />
                </svg>
                <span>{{ profile.data.experience.length }} 段经历 · {{ profile.data.skills.length }} 项技能</span>
              </div>
              <div class="mt-2">
                <span class="inline-flex items-center rounded-md bg-[#f4f4f4] px-2 py-1 text-xs font-medium text-[#525252]">{{ templateLabel(profile.templateId, profile.roleId) }}</span>
              </div>
            </div>

            <!-- 按钮 -->
            <div class="flex gap-2">
              <router-link
                :to="editorLink(profile.id)"
                class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0f62fe] px-3 py-2 text-xs font-medium text-white transition-all hover:bg-[#0043ce] hover:shadow-sm hover:shadow-[#0f62fe]/25"
              >
                <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 2l3 3-9 9H2v-3l9-9z" />
                </svg>
                编辑
              </router-link>
              <router-link
                :to="previewLink(profile.id)"
                class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#0f62fe] px-3 py-2 text-xs font-medium text-[#0f62fe] transition-all hover:bg-[#0f62fe] hover:text-white hover:shadow-sm hover:shadow-[#0f62fe]/25"
              >
                <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
                  <circle cx="8" cy="8" r="2" />
                </svg>
                预览
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- ── 对话框 ────────────────────────────────────────── -->
    <TemplatePickerDialog
      v-model="createDialogOpen"
      @confirm="onCreateConfirm"
    />

    <ConfirmDialog
      v-model="renameDialogOpen"
      title="重命名简历"
      input-mode
      :input-value="renameTarget?.title || ''"
      input-placeholder="请输入新标题"
      confirm-text="保存"
      @confirm="onRenameConfirm"
    />

    <ConfirmDialog
      v-model="deleteDialogOpen"
      title="删除简历"
      :message="'确定删除「' + (deleteTarget?.title || '') + '」？此操作不可恢复。'"
      confirm-text="删除"
      confirm-class="btn-error"
      @confirm="onDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, watch, h } from 'vue'
import { useRouter } from 'vue-router'
import { animate, stagger, createTimeline } from 'animejs'
import { getResumeStore } from '@/store'
import { exportAllProfiles, exportProfile, importProfiles } from '@/db/crud'
import { templates, roles, defaultTemplateId, getTemplate, getRole, buildRoleSeed } from '@/templates/registry'
import type { ResumeProfile, ResumeExportFile, ResumeData } from '@/types/resume'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import TemplatePickerDialog from '@/components/TemplatePickerDialog.vue'
import { baseSeed as resumeSeed } from '@/config/seed'

const router = useRouter()
const store = getResumeStore()
const importInput = ref<HTMLInputElement | null>(null)

// ── 模板 ref ──────────────────────────────────────────────
const headerRef = ref<HTMLElement | null>(null)
const heroDecoRef = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const heroTitleRef = ref<HTMLElement | null>(null)
const heroTitle2Ref = ref<HTMLElement | null>(null)
const heroSubRef = ref<HTMLElement | null>(null)
const heroCtaRef = ref<HTMLElement | null>(null)
const heroStatsRef = ref<HTMLElement | null>(null)
const featuresTitleRef = ref<HTMLElement | null>(null)
const featuresSubRef = ref<HTMLElement | null>(null)
const featuresGridRef = ref<HTMLElement | null>(null)
const titleSectionRef = ref<HTMLElement | null>(null)
const cardGridRef = ref<HTMLElement | null>(null)
const emptyStateRef = ref<HTMLElement | null>(null)

// ── SVG 图标组件 ──────────────────────────────────────────
const IconLock = () => h('svg', { class: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '4', y: '9', width: '12', height: '8', rx: '1.5' }),
  h('path', { d: 'M7 9V6a3 3 0 016 0v3' }),
  h('circle', { cx: '10', cy: '13', r: '1' }),
])
const IconPalette = () => h('svg', { class: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M10 2a8 8 0 100 16c.6 0 1-.4 1-1 0-.3-.1-.5-.3-.7-.2-.2-.3-.5-.3-.8 0-.6.4-1 1-1h1.5a3.5 3.5 0 003.5-3.5C17 5.5 13.9 2 10 2z' }),
  h('circle', { cx: '6.5', cy: '11', r: '0.8', fill: 'currentColor' }),
  h('circle', { cx: '9', cy: '7.5', r: '0.8', fill: 'currentColor' }),
  h('circle', { cx: '13', cy: '7.5', r: '0.8', fill: 'currentColor' }),
])
const IconPdf = () => h('svg', { class: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M5 2h7l4 4v12H5z' }),
  h('path', { d: 'M12 2v4h4' }),
  h('path', { d: 'M8 11h1.5a1 1 0 010 2H8v-2zM8 13v2' }),
])
const IconJson = () => h('svg', { class: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M6 4c-2 0-2 2-2 4s0 3-2 3c2 0 2 1 2 3s0 4 2 4' }),
  h('path', { d: 'M14 4c2 0 2 2 2 4s0 3 2 3c-2 0-2 1-2 3s0 4-2 4' }),
])

// ── 特性数据 ──────────────────────────────────────────────
const features = [
  { iconComp: IconLock, title: '纯前端本地存储', desc: '数据保存在浏览器 IndexedDB，无需注册登录，隐私安全有保障。' },
  { iconComp: IconPalette, title: '多模板自由切换', desc: '内置 AI 研发、算法、设计三种角色模板 + 三套布局，角色 + 布局双重选择。' },
  { iconComp: IconPdf, title: '一键导出 PDF', desc: '编辑完成即可通过浏览器打印导出为 PDF，投递简历零障碍。' },
  { iconComp: IconJson, title: 'JSON 导入导出', desc: '支持以 JSON 格式批量导入导出，方便备份和迁移简历数据。' },
]

// ── 对话框状态 ────────────────────────────────────────────
const createDialogOpen = ref(false)
const renameDialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const renameTarget = ref<ResumeProfile | null>(null)
const deleteTarget = ref<ResumeProfile | null>(null)

function editorLink(id: string) {
  return '/editor/' + id
}

function previewLink(id: string) {
  return '/preview/' + id
}

function templateLabel(templateId?: string, roleId?: string): string {
  const role = roleId ? getRole(roleId) : null
  const tpl = templateId ? getTemplate(templateId) : null
  if (role && tpl) return role.name + ' · ' + tpl.name
  if (role) return role.name
  if (tpl) return tpl.name
  const defaultTpl = getTemplate(defaultTemplateId)
  const defaultRole = getRole(undefined)
  return defaultRole.name + ' · ' + defaultTpl.name
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60_000) return '刚刚'
  const mins = Math.floor(diff / 60_000)
  if (diff < 3_600_000) return mins + ' 分钟前'
  const hours = Math.floor(diff / 3_600_000)
  if (diff < 86_400_000) return hours + ' 小时前'
  const days = Math.floor(diff / 86_400_000)
  if (diff < 7 * 86_400_000) return days + ' 天前'
  return d.toLocaleDateString('zh-CN')
}

// ── 入场动画 ──────────────────────────────────────────────

function playEntrance() {
  const tl = createTimeline({ defaults: { ease: 'outExpo' } })

  // 导航栏
  tl.add(headerRef.value!, {
    opacity: [0, 1],
    translateY: [-16, 0],
    duration: 500,
  })

  // Hero 装饰背景
  tl.add(heroDecoRef.value!, {
    opacity: [0, 1],
    duration: 800,
  }, '-=300')

  // Eyebrow
  tl.add(eyebrowRef.value!, {
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 400,
  }, '-=400')

  // 标题第一段
  tl.add(heroTitleRef.value!, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 600,
  }, '-=200')

  // 标题第二段
  tl.add(heroTitle2Ref.value!, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 600,
  }, '-=400')

  // 副标题
  tl.add(heroSubRef.value!, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 500,
  }, '-=300')

  // CTA 按钮
  tl.add(heroCtaRef.value!, {
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: 500,
  }, '-=200')

  // 统计数据
  tl.add(heroStatsRef.value!, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 500,
  }, '-=200')

  // 特性区标题
  tl.add(featuresTitleRef.value!, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 400,
  }, '-=200')

  tl.add(featuresSubRef.value!, {
    opacity: [0, 1],
    duration: 300,
  }, '-=200')

  // 特性卡片交错入场
  tl.add(featuresGridRef.value?.querySelectorAll('.feature-card')!, {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 500,
    delay: stagger(80),
  }, '-=100')

  // 我的简历标题行
  if (titleSectionRef.value) {
    tl.add(titleSectionRef.value, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 400,
    }, '-=200')
  }

  // 空状态或卡片列表
  if (emptyStateRef.value) {
    tl.add(emptyStateRef.value, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 500,
    }, '-=200')
  }

  playCardEntrance()
}

function playCardEntrance() {
  nextTick(() => {
    const cards = cardGridRef.value?.querySelectorAll('.resume-card')
    if (cards && cards.length > 0) {
      animate(cards, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.96, 1],
        duration: 600,
        delay: stagger(80, { start: 200 }),
        ease: 'outBack',
      })
    }
  })
}

watch(() => store.profileList.value.length, (newLen, oldLen) => {
  if (newLen > 0 && newLen !== oldLen) {
    playCardEntrance()
  }
})

// ── 特性卡片 hover ───────────────────────────────────────

function onFeatureEnter(ev: MouseEvent) {
  const card = ev.currentTarget as HTMLElement
  animate(card, {
    translateY: -4,
    duration: 250,
    ease: 'outQuad',
  })
  const icon = card.querySelector('.feat-icon')
  if (icon) {
    animate(icon, {
      scale: 1.1,
      duration: 250,
      ease: 'outBack',
    })
  }
}

function onFeatureLeave(ev: MouseEvent) {
  const card = ev.currentTarget as HTMLElement
  animate(card, {
    translateY: 0,
    duration: 250,
    ease: 'outQuad',
  })
  const icon = card.querySelector('.feat-icon')
  if (icon) {
    animate(icon, {
      scale: 1,
      duration: 250,
      ease: 'outQuad',
    })
  }
}

// ── 卡片 hover 微动画 ─────────────────────────────────────

function onCardEnter(ev: MouseEvent) {
  const card = ev.currentTarget as HTMLElement
  animate(card, {
    translateY: -3,
    duration: 250,
    ease: 'outQuad',
  })
}

function onCardLeave(ev: MouseEvent) {
  const card = ev.currentTarget as HTMLElement
  animate(card, {
    translateY: 0,
    duration: 250,
    ease: 'outQuad',
  })
}

// ── 业务操作 ──────────────────────────────────────────────

function onCreate() {
  createDialogOpen.value = true
}

async function onCreateConfirm(payload: { title: string; templateId: string; roleId: string }) {
  const trimmed = payload.title.trim()
  if (!trimmed) return
  const role = getRole(payload.roleId)
  const baseSeed = resumeSeed
  const roleSeed = buildRoleSeed(baseSeed, role)
  const profile = await store.create(trimmed, roleSeed, payload.templateId, payload.roleId)
  router.push('/editor/' + profile.id)
}

function onRename(profile: ResumeProfile) {
  renameTarget.value = profile
  renameDialogOpen.value = true
}

async function onRenameConfirm(title: string) {
  if (!renameTarget.value || !title.trim()) return
  await store.rename(renameTarget.value.id, title.trim())
  renameTarget.value = null
}

function onDelete(profile: ResumeProfile) {
  deleteTarget.value = profile
  deleteDialogOpen.value = true
}

async function onDeleteConfirm() {
  if (!deleteTarget.value) return
  await store.remove(deleteTarget.value.id)
  deleteTarget.value = null
}

async function onDuplicate(id: string) {
  await store.duplicate(id)
}

function onImportClick() {
  importInput.value?.click()
}

async function onImportFile(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    const text = await file.text()
    const data = JSON.parse(text) as ResumeExportFile
    const count = await importProfiles(data)
    await store.refreshList()
    alert('成功导入 ' + count + ' 份简历')
  } catch (e) {
    alert('导入失败：' + (e instanceof Error ? e.message : '未知错误'))
  } finally {
    input.value = ''
  }
}

async function onExportAll() {
  const data = await exportAllProfiles()
  downloadJson(data, 'resumes_' + Date.now() + '.json')
}

async function onExportOne(id: string) {
  const data = await exportProfile(id)
  if (!data) return
  downloadJson(data, 'resume_' + id + '.json')
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  store.init().catch((e) => {
    console.error('[Dashboard] 初始化失败：', e)
  })
  nextTick(() => playEntrance())
})
</script>

<style scoped>
.dashboard-root {
  min-height: 100vh;
  background: #f7f8fa;
}

/* Hero 装饰背景 */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, #f0f0f0 1px, transparent 1px),
    linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 60% 80% at 50% 0%, #000 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 60% 80% at 50% 0%, #000 30%, transparent 70%);
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.hero-blob--1 {
  top: -120px;
  right: -60px;
  width: 400px;
  height: 400px;
  background: rgba(15, 98, 254, 0.10);
}

.hero-blob--2 {
  bottom: -80px;
  left: -80px;
  width: 300px;
  height: 300px;
  background: rgba(0, 67, 206, 0.08);
}

.hero-blob--3 {
  top: 30%;
  left: 60%;
  width: 200px;
  height: 200px;
  background: rgba(111, 143, 255, 0.06);
}

.hero-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #f7f8fa);
}

/* 统计数据分割线 */
.stat-divider {
  width: 1px;
  background: #e0e0e0;
  align-self: stretch;
  margin: 4px 0;
}

/* 简历卡片 & 特性卡片去掉 DaisyUI 默认阴影 */
.resume-card,
.feature-card {
  box-shadow: none !important;
  border-radius: 12px;
}

.resume-card {
  padding-left: 1.25rem;
}
</style>
