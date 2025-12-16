# Qmeta 个人日常记录系统

## 项目简介

Qmeta 是一个基于 React、TypeScript、Tailwind CSS 和 Vite 构建的现代化个人管理系统，旨在帮助用户高效管理个人信息、任务、日程和数据。

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite 6
- **样式框架**: Tailwind CSS 3
- **状态管理**: React Context API
- **路由管理**: React Router 7
- **UI 组件**: Lucide React (图标)
- **动画效果**: Framer Motion
- **代码质量**: ESLint + Prettier + TypeScript
- **测试框架**: Vitest + React Testing Library
- **部署工具**: GitHub Actions + Docker

## 项目结构

```
├── .github/           # GitHub Actions 配置
├── src/
│   ├── components/    # 可复用组件
│   ├── contexts/      # React Context
│   ├── hooks/         # 自定义 Hooks
│   ├── lib/           # 工具函数
│   ├── pages/         # 页面组件
│   ├── App.tsx        # 应用入口
│   └── main.tsx       # 渲染入口
├── .env.example       # 环境变量示例
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript 配置
├── vite.config.ts     # Vite 配置
├── tailwind.config.js # Tailwind CSS 配置
└── eslint.config.js   # ESLint 配置
```

## 本地开发

### 环境准备

- Node.js 18+
- pnpm

### 操作步骤

1. **安装依赖**

```sh
pnpm install
```

2. **启动开发服务器**

```sh
pnpm run dev
```

3. **在浏览器访问**

```
http://localhost:3000
```

## 环境变量

复制 `.env.example` 文件为 `.env`，并根据需要修改配置：

```sh
cp .env.example .env
```

## 构建和部署

### 构建生产版本

```sh
pnpm run build
```

构建产物将生成在 `dist/static` 目录中。

### 部署方式

#### 1. 本地部署

```sh
# 预览生产构建
pnpm run preview
```

#### 2. 服务器部署

项目通过 GitHub Actions 自动部署到服务器，部署配置位于 `.github/workflows/build-test.yml`。

#### 3. Docker 部署

```sh
docker run -d --name qmeta-nginx -p 8080:80 -v /path/to/static:/usr/share/nginx/html nginx:stable
```

## CI/CD 配置

项目使用 GitHub Actions 实现持续集成和持续部署：

- **构建测试**: 每次推送代码到 main 分支时自动运行构建、测试和代码质量检查
- **自动部署**: 构建成功后自动部署到服务器

## 测试

### 运行单元测试

```sh
pnpm run test
```

### 运行测试并生成覆盖率报告

```sh
pnpm run test:coverage
```

### 测试覆盖率报告

测试覆盖率报告将生成在 `coverage` 目录中。

## 代码质量

### ESLint 检查

```sh
pnpm run lint
```

### Prettier 格式化

```sh
# 检查格式
pnpm run format:check

# 自动修复格式
pnpm run format
```

### TypeScript 检查

```sh
pnpm run typecheck
```

### 综合检查

```sh
pnpm run check
```

## 功能特性

- ✅ 个人信息管理
- ✅ 日常记录
- ✅ 任务清单
- ✅ 长期计划
- ✅ 提醒功能
- ✅ 网站管理
- ✅ 数据备份
- ✅ 用户设置
- ✅ 暗色主题支持
- ✅ 响应式设计

## 更新日志

- 2025-12-16: 修复 GitHub Actions 部署问题，配置 SSH 密钥认证
- 2025-12-16: 配置 Docker 容器部署，实现应用隔离
- 2025-12-15: 初始化项目，添加基础功能模块

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过 GitHub Issues 联系我们。
