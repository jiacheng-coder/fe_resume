# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 重新打包组件库

pnpm build

# 进入待发布的 dist/ 目录
cd dist

git init
git add .
git commit -m 'deploy'

# 部署到 https://.github.io/
git push -f git@github.com:jiacheng-coder/fe_resume.git main:github-pages

# 提交所有代码到github
cd ..
git add .
git commit -m 'update'
git push
