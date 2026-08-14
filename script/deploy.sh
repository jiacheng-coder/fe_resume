#!/bin/bash

# 此脚本与 deploy-github-pages.sh 功能相同
# 建议使用 deploy-github-pages.sh 或 deploy-cloudflare-pages.sh
# 请参考 README.md 中的部署说明

echo "💡 提示：推荐使用 deploy-github-pages.sh 或 deploy-cloudflare-pages.sh"
echo ""

# 确保脚本抛出遇到的错误
set -e

# ── 安全检查 ──────────────────────────────────────────────
# 确认当前在项目根目录
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "❌ 请在项目根目录运行此脚本"
  exit 1
fi

# 检查是否有未提交的变更（不阻止部署，但提醒用户）
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  echo "⚠️  检测到未提交的变更，建议先提交再部署。"
  echo "    未提交文件："
  git status --short
  echo ""
  read -p "是否继续部署？（y/N）" -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消部署。"
    exit 0
  fi
fi

# 重新打包
echo "📦 正在构建..."
pnpm build

# 进入待发布的 dist/ 目录
cd dist

# 添加 SPA fallback（GitHub Pages 刷新子路由不 404）
cp index.html 404.html

# 初始化临时 git 仓库并部署
git init
git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# 部署到 GitHub Pages（强制推送是必要的，因为 dist 是临时仓库）
echo "🚀 正在推送到 GitHub Pages..."
git push -f git@github.com:jiacheng-coder/fe_resume.git main:github-pages

echo "✅ GitHub Pages 部署完成！"
echo ""
echo "💡 注意：源代码变更需要您手动提交和推送，此脚本不会自动操作主分支。"
