#!/bin/bash

# Qmeta 部署脚本

# 设置错误时退出
set -e

echo "=== Qmeta 部署脚本 ==="

# 1. 拉取最新代码
echo "1. 拉取最新代码..."
git pull origin main

# 2. 安装依赖
echo "2. 安装依赖..."
pnpm install

# 3. 构建项目
echo "3. 构建项目..."
pnpm build

# 4. 重启服务（如果使用PM2）
echo "4. 重启服务..."
if command -v pm2 &> /dev/null; then
    pm2 restart qmeta || pm2 start dist/main.js --name qmeta
else
    echo "PM2 未安装，跳过服务重启"
fi

# 5. 输出部署信息
echo "5. 部署完成！"
echo "部署时间：$(date)"
echo "当前版本：$(git rev-parse --short HEAD)"
