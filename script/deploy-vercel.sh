#!/bin/bash

# ────────────────────────────────────────────────────────────
# Vercel 部署脚本
# 
# 使用前准备：
#   1. 安装 Vercel CLI：  npm install -g vercel
#   2. 登录 Vercel：       vercel login
#
# 首次运行 vercel 会交互式创建项目，后续直接部署。
# 部署后会获得一个 https://fe-resume.vercel.app 的地址。
# ────────────────────────────────────────────────────────────

set -e

echo "🔨 构建项目..."
pnpm build

echo "📦 部署到 Vercel..."
# --prod 表示生产部署，--yes 跳过交互确认（使用 vercel.json 配置）
vercel deploy --prod --yes

echo ""
echo "✅ 部署完成！"
echo "   访问地址: https://fe-resume.vercel.app"
echo "   管理面板: https://vercel.com/dashboard"
