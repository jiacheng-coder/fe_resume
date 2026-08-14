# 介绍
> 简站 — 一体化简历生成器

产品优势
 - 多档案管理：支持创建多份简历（如社招版、校招版），通过 IndexedDB 本地持久化
 - 多模板切换：内置经典单栏和现代双栏模板，通过模板注册表可扩展
 - 实时预览编辑：左侧模板预览 + 右侧编辑面板，所见即所得
 - 自动保存：编辑后自动保存到浏览器本地（IndexedDB），带未保存离开提醒
 - JSON 导入导出：支持简历数据的 JSON 导入导出，方便跨设备迁移
 - 拖拽排序：支持区块、公司、项目、教育条目的拖拽排序
 - PDF 导出：通过浏览器打印功能直接将网页转换为 PDF，文本保持矢量可复制
产品局限
 - 数据仅存储在本地浏览器，不支持跨设备同步（需手动导入导出）
 - 模块较少，暂时不支持自定义模块功能
 - 预览链接仅在本机浏览器可访问，非公开分享链接

## 技术栈

- Vue 3.2 + TypeScript + Vue Router
- Dexie.js (IndexedDB) 本地持久化
- Anime.js 页面与微交互动画
- TailwindCSS + DaisyUI 样式与组件基座
- Vite 构建 + Vitest 测试框架

## src目录构成

- `types/`: TypeScript 类型定义（ResumeData, ResumeProfile, projects 等）
- `store/`: 全局状态管理（基于 Composition API 的模块级单例）
- `router/`: 路由配置（Dashboard / Editor / Preview 三页）
- `db/`: 数据访问层（Dexie 封装的 CRUD + 导入导出 + 数据迁移）
- `templates/`: 模板注册表与模板组件（ClassicTemplate, ModernTemplate）
- `composables/`: 组合式函数（useResume, useDragSort）
- `components/`: 通用组件（Header, Main, ResumeEditor, ConfirmDialog 等）
- `pages/`: 页面组件（Dashboard, Editor, Preview）
- `utils/`: 工具函数（resumeClone, publicAsset, ensureEntityIds）
- `config/`: 默认简历数据配置

# 使用

## 环境与安装

本项目使用 [pnpm](https://pnpm.io/) 管理依赖（勿使用 `npm install` / `yarn`）。

```bash
# 安装 pnpm（任选其一）
npm install -g pnpm
# 或使用 Corepack（Node 16.13+）：corepack enable && corepack prepare pnpm@8.3.1 --activate

pnpm install
pnpm dev
```

常用命令：`pnpm build` 构建，`pnpm preview` 本地预览构建结果，`pnpm test` 运行测试。

## 部署

- GitHub Pages：`sh script/deploy-github-pages.sh`
- Cloudflare Pages：`sh script/deploy-cloudflare-pages.sh`

## 实习经历
 - 项目所用的技术栈
 - 项目中所负责的功能模块（行业的核心模块）
 - 项目亮点（封装，提升用户体验，别人没解决，你解决的）
 - 在项目中做过哪些优化
 - 项目中封装过哪些可复用组件(项目亮点)
 - 适配 兼容
