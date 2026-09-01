# AI 生成简历技术方案

## 1. 需求

用户输入一段自由描述，调用 GLM 生成结构化简历 JSON，落库后进入编辑器。

两个硬约束：

1. 简历 JSON 结构后续会变（含字段增删、多模板各自不同结构），AI 侧必须自动跟随，不能靠人肉同步 prompt。
2. 当前及未来存在**字段结构真正不同**的多模板，schema 需按模板注册。

## 2. 核心设计：Schema 单一事实源 + 模板 Registry

现状问题：简历结构散落在三处——`src/types/resume.ts`（TS 类型）、`src/config/seed.ts`（默认值）、`src/db/crud.ts` 的 `normalizeProfile`（手写校验）。结构一变三处脱节。

方案：引入 **zod**（+ zod-to-json-schema），每个模板一个 schema，统一注册到 `src/schema/templates.ts`（纯数据、无 Vue 依赖，前端与 Vercel Function 共用），`src/templates/registry.ts` 消费它挂载渲染器。一切从 schema 派生：

```
templates[templateId].schema (zod)
  ├── z.infer            → TS 类型（编辑器/渲染器用）
  ├── buildDefaults      → 默认数据（替代 seed 结构定义）
  ├── normalize          → 宽容归一化（替代 crud.ts 手写 normalize）
  ├── toJSONSchema       → GLM response_format.json_schema
  └── buildAIPrompt      → 字段中文说明组装进 system prompt
```

**改结构只改 schema 一处**，类型、默认值、校验、AI 约束全部联动。

选 zod 而非自研的理由：多模板需要 `.extend()` 组合继承、`z.infer` 类型推导、生态兜底；自研描述器在多 schema 场景下要手写 merge/类型映射，成本反超。

## 3. Schema 分层结构

```
src/schema/
  base.ts        # 公共字段：userInfo / education / experience / skills / prizes / features / ui
                  # 每个字段 .describe() 中文语义（必填约定，AI 生成质量来源）
                  # .default() / .catch() 就地声明归一化策略
  templates.ts   # templateSchemas 注册表（纯数据，无 Vue 依赖，前端/Function 共用）；
                  #   getSchemaByTemplateId(id)；模板结构分化时在此 .extend()
  transform.ts   # normalize(schema, raw)：宽容归一化，返回深拷贝
                  #   缺失补默认值、类型错误修复、未知字段丢弃、旧数据自动升级
  aiPrompt.ts    # buildAIPrompt(schema)：遍历 .describe() 生成字段说明
                  # buildSystemPrompt(schema)：组装完整 system prompt（结构说明 + 内容规范）
                  # toJSONSchema(schema)：供 GLM response_format 使用
src/templates/registry.ts  # 渲染模板注册（消费 templateSchemas）
api/generate.ts             # Vercel Function（直接 import ../src/schema/*，相对路径无别名）
src/services/ai/            # glmClient.ts + generateResume.ts（前端调用与业务封装）
```

模板注册（扩展现有 `src/templates/registry.ts`，不另起炉灶）：

```ts
// src/schema/templates.ts
const classicSchema = baseSchema.extend({
  // 模板差异字段；无差异则直接用 baseSchema
})

export const templateSchemas: Record<string, ResumeSchema> = {
  ai: baseSchema,
  classic: classicSchema,
  modern: baseSchema,
}
```

注意：`.satisfies` 关键字需 TS 4.9+，本项目 TS 4.6，故用显式 `Record<string, ResumeSchema>` 类型注解替代。

关键点：

- **Base + extend 组合**：公共字段改一处全模板同步；模板差异字段只写差异部分。
- **类型按模板收窄**：`type SchemaOf<T> = z.infer<(typeof templates)[T]['schema']>`，`ResumeProfile<T>` 的 data 跟着 templateId 走，渲染器拿到模板专属字段的完整类型检查，读不到别的模板特有字段编译期报错。
- **schemaVersion 随模板走**：存量数据按 `templates[id].schema` 重跑 normalize 自动升级，模板间互不影响。
- **与现有 TS 类型的同步锁**：`const _typeLock: ResumeData = baseSchema.parse({})` 编译期断言，漂移即 `pnpm build` 报错。
- 现有 `ensureEntityIds` 保留，在 normalize 后兜底补实体 id。

## 4. GLM 接入

**API**：`POST https://open.bigmodel.cn/api/paas/v4/chat/completions`（OpenAI 兼容），模型默认 **`glm-4-flash`**（免费、实测可用；账户有余额需更高质量可在 Vercel 配 `GLM_MODEL=glm-4.6` 切换），`temperature: 0.3`、`max_tokens: 4000`、非流式。

**结构化输出**：`response_format: { type: 'json_schema', json_schema: { name: 'resume', schema: toJSONSchema(该模板schema) } }`；模型返回 400（不支持）时降级为不带 response_format、prompt 内附完整 JSON Schema 文本重试。

**apiKey 安全（不可打进前端 bundle）**：项目已部署 Vercel，用 Serverless Function 代理：

```
api/generate.ts               # Vercel Function（maxDuration=60）
  - GLM_API_KEY 从环境变量读（不进 git）；GLM_MODEL 可选，默认 glm-4-flash
  - 入参校验：description 10~2000 字，templateId ∈ registry，retryHint ≤ 2000 字
  - 内存 IP 限流（每 IP 每分钟 5 次）
  - 按模板 schema 组装：buildSystemPrompt + toJSONSchema(response_format)
  - 55s 超时保护（AbortController）
  - 透传模型输出文本（JSON 解析/归一化/重试在前端完成）
src/services/ai/glmClient.ts      # 前端唯一出口 fetch('/api/generate')，120s 超时
src/services/ai/generateResume.ts  # extractJSON(剥围栏) → normalize → ensureEntityIds；
                                   #   解析失败携带错误 retryHint 自修复重试一次
```

> 关键：`generateResume.ts` 从 `@/schema/templates`（纯数据）取 schema，不经由 `templates/registry.ts`，避免业务层拉进 Vue 组件依赖。

- `vercel.json` 现有 rewrite 不影响 `/api/*`（functions 先于 rewrites），无需改动。
- **本地开发两种模式**：
  1. **标准模式**（推荐，与生产一致）：`pnpm dev` + `vercel dev --listen 3000`，vite proxy 自动转发 `/api`。
  2. **快捷模式**（免配 vercel dev）：项目根目录创建 `.env.development.local` 写入 `VITE_GLM_API_KEY=你的key`，`pnpm dev` 时前端自动直连 GLM（该文件已被 gitignore 排除，不会提交）。
- GitHub Pages / Cloudflare Pages 纯静态无后端：这两个渠道 AI 入口走错误分支；如需支持，后续可加「用户自填 key 存 localStorage」的浏览器直连模式。
- ⚠️ 已在对话中出现的 apiKey 建议去智谱控制台重置，新 key 只配 Vercel 环境变量。

## 5. 交互与生成链路

入口：Dashboard 新增「AI 生成简历」按钮 → 弹窗（选模板 + 输入自述描述，带示例引导）。

```
用户输入描述 + 选模板
→ POST /api/generate {description, templateId}
→ Function 按模板 schema 约束调 GLM（json_schema 优先，400 降级）
→ 前端 extractJSON 容错解析（剥 ```json 围栏，截首尾大括号）
→ normalize(getSchemaByTemplateId(templateId), raw) 校验修复 + 深拷贝
→ ensureEntityIds 补实体 id
→ 解析失败：携带错误 retryHint 自修复重试一次
→ store.create(title, data, templateId) 落库（标题默认取「{姓名}的简历」）
→ router.push('/editor/' + id) 跳转微调
```

System prompt 内容规范（与结构解耦，维护在 aiPrompt.ts）：

- `myContribution` 按「背景-动作-量化结果」写，3-5 条；
- `experience`（正式）与 `internship`（实习）按时间段归类；
- `period`/`time` 统一 `2021.09 - 2025.06` 格式；
- 用户未提供的信息留空字符串，**禁止编造**。

## 6. 实施步骤（每步可独立验证）

| 步骤 | 内容 | 状态 | 验证 |
| --- | --- | --- | --- |
| 1 | Schema 基建：安装 zod / zod-to-json-schema，建 base.ts / templates.ts / transform.ts / aiPrompt.ts，registry 挂 schema；用 normalize 替换 crud.ts 5 个手写 normalize 函数 | ✅ 完成 | 14 个 vitest 用例通过；vue-tsc 零错误；pnpm build 通过 |
| 2 | Vercel Function + 前端 client；.env.example 补 GLM_API_KEY 说明 | ✅ 完成 | 22 个 vitest 用例通过；GLM 真实端到端实测（glm-4-flash 输出合格简历 JSON）；前端完整链路（normalize + ensureEntityIds + 未知字段丢弃）验证通过 |
| 3 | AIGenerateDialog 组件接入 Dashboard | ✅ 完成 | pnpm build 通过；浏览器实测：弹窗打开/模板切换/输入校验/错误提示均正常 |
| 4 | 自修复重试、错误提示、IP 限流 | ✅ 已随步骤 2 实现 | generateResume 单测覆盖重试与双失败；api 限流 + 入参校验已实现；部署侧仅需配 Vercel 环境变量 |

实际新增/改动文件清单：

- 新增：`src/schema/base.ts`、`src/schema/templates.ts`、`src/schema/transform.ts`、`src/schema/aiPrompt.ts`
- 新增：`api/generate.ts`、`src/services/ai/glmClient.ts`、`src/services/ai/generateResume.ts`
- 新增：`src/components/AIGenerateDialog.vue`
- 新增测试：`src/schema/__tests__/schema.test.ts`（9）、`src/db/__tests__/crud.test.ts`（5）、`src/services/ai/__tests__/generateResume.test.ts`（8）
- 新增：`.env.example`
- 改动：`src/templates/registry.ts`（挂 schema + getTemplateSchema）、`src/db/crud.ts`（normalize 化，删 ~140 行手写校验）、`src/pages/Dashboard/index.vue`（AI 入口 + 落库跳转）、`vite.config.ts`（/api 代理）
- 新增依赖：zod@3.25、zod-to-json-schema@3.25

共 22 个单测全部通过，pnpm build 零错误。

## 7. 旧代码迁移

- `crud.ts` 的 normalizeProfile + normalizeUserInfo/normalizeUi/normalizeEducation/normalizeStringArray/normalizeExperience/normalizeSectionOrder → 删除，统一走 `normalize(schema, raw)`；normalizeProfile 改为单行核心逻辑并 export（AI 链路与导入共用）。✅ 已完成
- `types/resume.ts` → ResumeData 暂保持手写，用 `const _typeLock: ResumeData = baseSchema.parse({})` 编译期断言与 schema 互锁；后续可改由 `z.infer` 派生。
- `seed.ts` → 暂不动（seed 含占位文案用于新建简历 UX，与 schema 的归一化默认值职责不同）；后续可让结构默认值由 schema 派生、保留文案部分。
- 渲染/导入导出/复制 → 已经经 registry 按 templateId 取 schema/renderer。

## 8. 风险与实测结论

- ✅ **GLM json_schema 支持度**：已实测，glm-4-flash 接受 json_schema 参数不报错，但输出仍带 ```json 围栏——证明前端 `extractJSON` 容错解析是必需的，非过度设计。降级路径（400 时改 prompt 内附 schema）已实现但本次未触发。
- ✅ **zod 版本兼容**：实测 zod@3.25 + zod-to-json-schema@3.25 与项目 TS 4.6 + vue-tsc 1.0.9 兼容，`pnpm build` 零类型错误。`.satisfies` 关键字因 TS 4.6 不支持已避免使用。
- ⚠️ **glm-4.6 无余额**：实测该账户 glm-4.6 返回 429（余额不足），已将默认模型改为免费的 glm-4-flash。如需更高质量，充值后配 `GLM_MODEL=glm-4.6` 即可。
- ⚠️ **多模板类型收窄**：当前三模板结构未分化（共用 baseSchema），`ResumeProfile<T>` 泛型化留待真正出现结构差异时再做，避免现在过度抽象。
- ⚠️ **apiKey 安全**：对话中出现过的 key 建议重置；上线前在 Vercel 项目配置 `GLM_API_KEY` 环境变量（Production + Preview）。
- ⚠️ **静态部署渠道**：GitHub Pages / Cloudflare Pages 无后端，AI 入口在这些渠道会走错误分支；如需支持，后续可加「用户自填 key 存 localStorage」的浏览器直连模式。
