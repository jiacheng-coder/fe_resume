<template>
  <div class="flex h-full min-h-0 flex-col bg-[#fafafa]">
    <div class="shrink-0 border-b border-[#e8e8e8] bg-white p-3 shadow-sm">
      <!-- 标题 + 保存状态 -->
      <div class="mb-3 flex items-center gap-2">
        <span class="text-sm font-bold text-[#161616]">{{ store.currentProfile.value?.title || '未保存' }}</span>
        <span
          v-if="store.saveStatus.value !== 'idle'"
          class="ml-auto flex items-center gap-1 text-xs"
          :class="store.saveStatus.value === 'saving' ? 'text-[#a8a8a8]' : 'text-emerald-600'"
        >
          <span v-if="store.saveStatus.value === 'saving'" class="loading loading-spinner loading-xs"></span>
          {{ store.saveStatus.value === 'saving' ? '保存中…' : '已自动保存' }}
        </span>
        <span v-else-if="store.dirty.value" class="ml-auto text-xs text-amber-600">未保存</span>
      </div>

      <!-- 保存操作 -->
      <div class="flex flex-wrap items-end gap-2">
        <label class="min-w-[8rem] flex-1">
          <span class="mb-1 block text-xs text-[#6f6f6f]">标题</span>
          <input
            v-model="titleInput"
            type="text"
            placeholder="例如：社招版"
            class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20"
          />
        </label>
        <button type="button" class="rounded-lg bg-gradient-to-r from-[#0f62fe] to-[#4589ff] px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(15,98,254,0.3)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(15,98,254,0.4)] hover:brightness-110" @click="onSave">保存</button>
        <button type="button" class="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2 text-xs font-medium text-[#525252] transition-all duration-200 hover:border-[#0f62fe]/50 hover:text-[#0f62fe] hover:shadow-sm" @click="onSaveAs">另存为</button>
        <button type="button" class="rounded-lg px-3 py-2 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]" @click="onPreview">预览</button>
        <router-link
          v-if="store.currentProfileId.value"
          :to="'/preview/' + store.currentProfileId.value"
          class="rounded-lg px-3 py-2 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]"
        >预览链接</router-link>
      </div>

      <!-- 快捷键提示 -->
      <div class="mt-1.5 flex flex-wrap gap-2 text-[10px] text-[#a8a8a8]">
        <span><kbd>Ctrl</kbd>+<kbd>S</kbd> 保存</span>
        <span><kbd>Ctrl</kbd>+<kbd>P</kbd> 预览</span>
        <span><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> 另存为</span>
      </div>

      <!-- 导出工具 -->
      <div class="mt-3 space-y-2 border-t border-[#f0f0f0] pt-3">
        <ExportPdfButton />
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="rounded-lg border border-[#e0e0e0] bg-white px-3 py-1.5 text-xs font-medium text-[#525252] transition-all duration-200 hover:border-[#0f62fe]/50 hover:text-[#0f62fe] hover:shadow-sm" @click="copyResumeJson">复制 JSON</button>
          <button type="button" class="rounded-lg px-3 py-1.5 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]" @click="onReset">恢复模板内容</button>
          <span v-if="exportFeedback" class="text-xs text-emerald-600">{{ exportFeedback }}</span>
        </div>
        <p class="text-xs leading-relaxed text-[#6f6f6f]">
          编辑后自动保存到浏览器本地（IndexedDB），换设备可通过「导出/导入」迁移。
        </p>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="min-h-0 flex-1 space-y-5 overflow-y-auto p-3">

      <!-- 模板选择 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">模板选择</h3>
        <div class="grid gap-2 sm:grid-cols-2">
          <button
            v-for="tpl in allTemplates"
            :key="tpl.id"
            type="button"
            class="flex items-center gap-3 rounded-lg border-2 p-3 text-left transition"
            :class="currentTemplateId === tpl.id ? 'border-[#0f62fe] bg-[#0f62fe]/5' : 'border-[#e0e0e0] hover:border-[#0f62fe]/40'"
            @click="onSelectTemplate(tpl.id)"
          >
            <div class="h-10 w-10 shrink-0 rounded-lg" :style="{ backgroundColor: tpl.thumbnailColor }"></div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-[#161616]">{{ tpl.name }}</p>
              <p class="text-xs text-[#6f6f6f]">{{ tpl.description }}</p>
            </div>
          </button>
        </div>
      </section>

      <!-- 区块排序 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">区块排序</h3>
        <p class="text-xs text-[#6f6f6f]">拖拽以下卡片调整简历中各区块的显示顺序</p>
        <div class="space-y-1">
          <div
            v-for="(key, i) in sectionOrderArr"
            :key="key"
            draggable="true"
            class="flex items-center gap-2 rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] p-2 transition"
            :class="{
              'border-[#0f62fe]/60 bg-[#0f62fe]/5': sectionSort.overIndex.value === i,
              'opacity-40': sectionSort.dragIndex.value === i,
            }"
            @dragstart="sectionSort.onDragStart(i)"
            @dragover="sectionSort.onDragOver(i, $event)"
            @drop="sectionSort.onDrop(i, $event)"
            @dragend="sectionSort.onDragEnd"
          >
            <span class="cursor-grab text-[#a8a8a8]">⣿</span>
            <span class="text-xs font-mono text-[#a8a8a8]">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="flex-1 text-sm text-[#161616]">{{ sectionLabel(key) }}</span>
            <span class="text-xs text-[#a8a8a8]">{{ key }}</span>
          </div>
        </div>
      </section>

      <!-- 基本信息 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">基本信息</h3>
        <label class="text-xs text-[#525252]">头像 URL（留空用打包默认图）</label>
        <input v-model="resumeData.userInfo.avatar" type="text" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="resumeData.userInfo.name" placeholder="姓名" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.job" placeholder="职位" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.email" placeholder="邮箱" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.phone" placeholder="电话" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.wechat" placeholder="微信" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.resumeUrl" placeholder="简历页链接" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.blogUrl" placeholder="博客" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.githubUrl" placeholder="GitHub" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.userInfo.notionUrl" placeholder="Notion（可选）" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20 sm:col-span-2" />
        </div>
      </section>

      <!-- 主题与界面文案 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">主题与界面文案</h3>
        <span class="text-xs text-[#525252]">顶栏背景色</span>
        <input v-model="resumeData.ui.theme.headerBackground" type="text" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="resumeData.ui.copy.title" placeholder="复制提示标题" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.ui.copy.message" placeholder="复制提示内容" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.ui.exportPdf.button" placeholder="导出按钮" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.ui.exportPdf.hint" placeholder="导出说明" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
        </div>
        <p class="text-xs text-[#6f6f6f]">区块标题</p>
        <div class="grid gap-2 sm:grid-cols-2">
          <label v-for="key in sectionKeys" :key="key">
            <span class="mb-1 block text-[10px] text-[#6f6f6f]">{{ key }}</span>
            <input v-model="resumeData.ui.sections[key]" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          </label>
        </div>
        <p class="text-xs text-[#6f6f6f]">项目标签</p>
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="resumeData.ui.labels.projectDescription" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.ui.labels.projectDuty" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="resumeData.ui.labels.techStack" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20 sm:col-span-2" />
        </div>
      </section>

      <!-- 核心优势 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">核心优势（每行一条）</h3>
        <textarea v-model="featuresText" class="w-full min-h-[8rem] rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] p-3 font-mono text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
      </section>

      <!-- 工作与项目经历 -->
      <section class="space-y-3 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-[#161616]">工作与项目经历</h3>
          <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#0f62fe] transition-all duration-200 hover:bg-[#0f62fe]/8" @click="addExperienceCompany">+ 公司 / 组织</button>
        </div>
        <p class="text-xs text-[#a8a8a8]">拖拽 ⣿ 手柄可调整公司顺序</p>
        <div
          v-for="(exp, ei) in resumeData.experience"
          :key="exp.id || ei"
          class="space-y-2 rounded-lg border border-[#e0e0e0] p-2.5 transition"
          :class="{
            'border-[#0f62fe]/60 bg-[#0f62fe]/5': expSort.overIndex.value === ei,
            'opacity-40': expSort.dragIndex.value === ei,
          }"
          @dragover="expSort.onDragOver(ei, $event)"
          @drop="expSort.onDrop(ei, $event)"
          @dragend="expSort.onDragEnd"
        >
          <div class="flex flex-wrap items-center gap-1">
            <span class="cursor-grab text-[#a8a8a8]" draggable="true" @dragstart="expSort.onDragStart(ei)">⣿</span>
            <input v-model="exp.company" placeholder="公司 / 组织名" class="min-w-[8rem] flex-1 rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
            <input v-model="exp.icon" placeholder="图标路径（可选）/icons/..." class="min-w-[8rem] flex-1 rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
            <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]" @click="removeExperienceCompany(ei)">删公司</button>
          </div>
          <!-- 项目内拖拽 -->
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#0f62fe] transition-all duration-200 hover:bg-[#0f62fe]/8" @click="addExperienceProject(ei)">+ 项目</button>
              <span class="text-xs text-[#a8a8a8]">拖拽 ⣿ 调整项目顺序</span>
            </div>
            <div
              v-for="(proj, pi) in exp.projects"
              :key="proj.id || pi"
              class="ml-2 space-y-1 border-l-2 border-[#0f62fe]/30 pl-2.5 transition"
              :class="{
                'border-[#0f62fe] bg-[#0f62fe]/5': projSort.overIndex.value === pi,
                'opacity-40': projSort.dragIndex.value === pi,
              }"
              @dragover="onProjDragOver(ei, pi, $event)"
              @drop="onProjDrop(ei, pi, $event)"
              @dragend="onProjDragEnd"
            >
              <div class="flex items-center gap-1">
                <span class="cursor-grab text-xs text-[#a8a8a8]" draggable="true" @dragstart="onProjDragStart(ei, pi)">⣿</span>
              </div>
              <ResumeProjectFields v-model="exp.projects[pi]" @remove="removeExperienceProject(ei, pi)" />
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-[#161616]">教育背景</h3>
          <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#0f62fe] transition-all duration-200 hover:bg-[#0f62fe]/8" @click="addEducation">+ 一条</button>
        </div>
        <div
          v-for="(row, i) in resumeData.education"
          :key="row.id || i"
          class="grid gap-1.5 rounded-lg border border-[#f0f0f0] p-2 transition sm:grid-cols-3"
          :class="{
            'border-[#0f62fe]/60 bg-[#0f62fe]/5': eduSort.overIndex.value === i,
            'opacity-40': eduSort.dragIndex.value === i,
          }"
          @dragover="eduSort.onDragOver(i, $event)"
          @drop="eduSort.onDrop(i, $event)"
          @dragend="eduSort.onDragEnd"
        >
          <div class="flex items-center gap-1 sm:col-span-3">
            <span class="cursor-grab text-xs text-[#a8a8a8]" draggable="true" @dragstart="eduSort.onDragStart(i)">⣿</span>
            <span class="text-xs text-[#a8a8a8]">拖拽排序</span>
          </div>
          <input v-model="row.school" placeholder="学校" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <input v-model="row.major" placeholder="专业" class="w-full rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
          <div class="flex gap-1">
            <input v-model="row.period" placeholder="时间" class="w-full flex-1 rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-2.5 py-1.5 text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
            <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]" @click="removeEducation(i)">删</button>
          </div>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">专业技能（每行一项）</h3>
        <textarea v-model="skillsText" class="w-full min-h-[6rem] rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] p-3 font-mono text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
      </section>

      <!-- 荣誉与获奖 -->
      <section class="space-y-2.5 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <h3 class="text-sm font-bold text-[#161616]">荣誉与获奖（每行一条）</h3>
        <textarea v-model="prizesText" class="w-full min-h-[4rem] rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] p-3 font-mono text-xs text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
      </section>

      <!-- 其他实习 -->
      <section class="space-y-3 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-[#161616]">其他实习（可选）</h3>
          <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#0f62fe] transition-all duration-200 hover:bg-[#0f62fe]/8" @click="addInternshipCompany">+ 公司</button>
        </div>
        <p class="text-xs text-[#6f6f6f]">与「工作与项目」重复时只填一处即可；有数据时预览区会单独显示本区块。</p>
        <div v-for="(exp, ei) in resumeData.internship" :key="exp.id || ei" class="space-y-2 rounded-lg border border-[#e0e0e0] p-2.5">
          <div class="flex flex-wrap gap-1">
            <input v-model="exp.company" placeholder="公司名" class="min-w-[8rem] flex-1 rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
            <input v-model="exp.icon" placeholder="图标路径 /icons/..." class="min-w-[8rem] flex-1 rounded-lg border border-[#e0e0e0] bg-[#f9f9f9] px-3 py-2 text-sm text-[#161616] outline-none transition-all duration-200 placeholder:text-[#a8a8a8] focus:border-[#0f62fe] focus:bg-white focus:ring-2 focus:ring-[#0f62fe]/20" />
            <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#6f6f6f] transition-all duration-200 hover:bg-[#f4f4f4] hover:text-[#161616]" @click="removeInternshipCompany(ei)">删公司</button>
          </div>
          <button type="button" class="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#0f62fe] transition-all duration-200 hover:bg-[#0f62fe]/8" @click="addInternshipProject(ei)">+ 项目</button>
          <div v-for="(proj, pi) in exp.projects" :key="proj.id || pi" class="ml-2 space-y-1 border-l-2 border-amber-300 pl-2.5">
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
kbd {
  background: #f4f4f4;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 10px;
  font-family: monospace;
  color: #6f6f6f;
}
</style>
