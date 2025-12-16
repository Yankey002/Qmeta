#!/bin/bash

# Qmeta项目部署脚本
# 用于在服务器上部署Qmeta项目

# 配置信息
PROJECT_NAME="qmeta"
PROJECT_DIR="/var/www/qmeta"
BACKUP_DIR="/var/www/backup"
NODE_VERSION="18"
PM2_NAME="qmeta"

# 颜色定义
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${GREEN}=== Qmeta项目部署脚本 ===${NC}"

# 1. 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}错误：请使用root用户执行此脚本${NC}"
    exit 1
fi

# 2. 创建项目目录
echo -e "${YELLOW}2. 创建项目目录...${NC}"
mkdir -p "$PROJECT_DIR"
mkdir -p "$BACKUP_DIR"

# 3. 备份现有项目（如果存在）
if [ -d "$PROJECT_DIR" ] && [ "$(ls -A $PROJECT_DIR)" ]; then
    echo -e "${YELLOW}3. 备份现有项目...${NC}"
    BACKUP_FILE="${BACKUP_DIR}/${PROJECT_NAME}_$(date +%Y%m%d_%H%M%S).tar.gz"
    tar -czf "$BACKUP_FILE" "$PROJECT_DIR"
    echo -e "${GREEN}   备份完成：$BACKUP_FILE${NC}"
fi

# 4. 清理旧文件
echo -e "${YELLOW}4. 清理旧文件...${NC}"
rm -rf "$PROJECT_DIR/*"

# 5. 复制新文件（假设文件已上传到服务器）
echo -e "${YELLOW}5. 复制新文件...${NC}"
# 如果使用git拉取代码，可以取消下面的注释
# cd "$PROJECT_DIR"
# git clone <your-repo-url> .
# git checkout main
# git pull

# 6. 安装Node.js（如果未安装）
echo -e "${YELLOW}6. 检查Node.js安装...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}   安装Node.js $NODE_VERSION...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
    apt-get install -y nodejs
fi

# 7. 安装pnpm（如果未安装）
echo -e "${YELLOW}7. 检查pnpm安装...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}   安装pnpm...${NC}"
    npm install -g pnpm
fi

# 8. 安装项目依赖
echo -e "${YELLOW}8. 安装项目依赖...${NC}"
cd "$PROJECT_DIR"
pnpm install

# 9. 构建项目
echo -e "${YELLOW}9. 构建项目...${NC}"
pnpm run build

# 10. 安装PM2（如果未安装）
echo -e "${YELLOW}10. 检查PM2安装...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}   安装PM2...${NC}"
    npm install -g pm2
fi

# 11. 启动/重启项目
echo -e "${YELLOW}11. 启动/重启项目...${NC}"
if pm2 list | grep -q "$PM2_NAME"; then
    pm2 restart "$PM2_NAME"
else
    pm2 start "pnpm" --name "$PM2_NAME" -- run preview
fi

# 12. 保存PM2进程列表
echo -e "${YELLOW}12. 保存PM2进程列表...${NC}"
pm2 save

# 13. 配置PM2开机自启
echo -e "${YELLOW}13. 配置PM2开机自启...${NC}"
pm2 startup

# 14. 显示部署结果
echo -e "${GREEN}=== 部署完成 ===${NC}"
echo -e "${GREEN}项目已成功部署到：${NC}${YELLOW}$PROJECT_DIR${NC}"
echo -e "${GREEN}PM2进程名称：${NC}${YELLOW}$PM2_NAME${NC}"
echo -e "${GREEN}可以使用以下命令管理项目：${NC}"
echo -e "  pm2 status $PM2_NAME      # 查看状态"
echo -e "  pm2 logs $PM2_NAME        # 查看日志"
echo -e "  pm2 restart $PM2_NAME     # 重启项目"
echo -e "  pm2 stop $PM2_NAME        # 停止项目"