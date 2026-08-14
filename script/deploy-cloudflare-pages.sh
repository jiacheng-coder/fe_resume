#!/bin/bash

# ────────────────────────────────────────────────────────────
# Cloudflare Pages 部署脚本
# 
# 使用前准备：
#   1. 确保已在 ~/.zshrc 中配置 CLOUDFLARE_API_TOKEN
#   2. 安装依赖：pnpm install
#
# 首次运行会自动创建项目，后续直接部署。
# 部署后会获得一个 https://fe-resume.pages.dev 的地址。
# ────────────────────────────────────────────────────────────

set -e

# 确保 _redirects 文件存在（SPA 路由支持）
echo "/*    /index.html   200" > dist/_redirects 2>/dev/null || true

echo "🔨 构建项目..."
pnpm build

# 确保 _redirects 在构建后存在
echo "/*    /index.html   200" > dist/_redirects

echo "📦 部署到 Cloudflare Pages..."
npx wrangler pages deploy dist \
  --project-name=fe-resume \
  --commit-dirty=true \
  --commit-message="deploy: $(git rev-parse --short HEAD 2>/dev/null || echo 'manual')"

echo ""
echo "✅ 部署完成！"
echo "   访问地址: https://fe-resume.pages.dev"
echo "   管理面板: https://dash.cloudflare.com/?to=/:account/pages"
