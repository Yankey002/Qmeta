# Qmeta - 个人全栈管理系统

## 项目介绍

Qmeta是一个基于React+TypeScript+Node.js的个人全栈管理系统，提供日记记录、待办事项、长周期计划、提醒管理、网址管理、数据备份等功能，帮助用户高效管理个人生活和工作。

## 技术栈

### 前端
- **框架**: React 18.3.1
- **语言**: TypeScript 5.7.2
- **构建工具**: Vite 6.2.0
- **路由**: React Router 7.3.0
- **UI组件**: Lucide React (图标)
- **样式**: Tailwind CSS 3.4.17
- **动画**: Framer Motion 12.9.2
- **状态管理**: React Context API
- **HTTP客户端**: 待实现
- **验证**: Zod 3.24.2

### 后端 (待实现)
- **框架**: 待选择 (Express/Koa/NestJS)
- **数据库**: 待选择 (MySQL/MongoDB/PostgreSQL)
- **ORM/ODM**: 待选择 (Prisma/TypeORM/Mongoose)
- **认证**: JWT
- **API规范**: RESTful

## 项目结构

```
Qmeta/
├── src/
│   ├── components/          # 通用组件
│   ├── contexts/            # React Context
│   ├── hooks/               # 自定义Hooks
│   ├── lib/                 # 工具函数
│   ├── pages/               # 页面组件
│   ├── App.tsx              # 应用入口组件
│   ├── index.css            # 全局样式
│   ├── main.tsx             # 应用入口文件
│   └── vite-env.d.ts        # Vite环境类型声明
├── .env.example             # 环境变量示例
├── .gitignore               # Git忽略文件
├── package.json             # 项目依赖
├── pnpm-lock.yaml           # pnpm锁文件
├── postcss.config.js        # PostCSS配置
├── tailwind.config.js       # Tailwind CSS配置
├── tsconfig.json            # TypeScript配置
└── vite.config.ts           # Vite配置
```

## 功能模块

- **首页**: 系统概览和快捷入口
- **日记记录**: 记录每日生活和工作
- **待办事项**: 管理日常任务
- **长周期计划**: 规划长期目标和项目
- **提醒管理**: 设置各种提醒事项
- **网址管理**: 管理常用网址
- **数据备份**: 数据备份和恢复
- **系统设置**: 个性化配置

## 快速开始

### 前置要求

- Node.js 18.x 或更高版本
- pnpm 8.x 或更高版本

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

1. 复制环境变量示例文件
   ```bash
   cp .env.example .env
   ```

2. 根据实际情况修改.env文件中的配置

### 启动开发服务器

```bash
pnpm run dev
```

应用将在 http://localhost:5173 启动

### 构建生产版本

```bash
pnpm run build
```

构建输出将位于 `dist` 目录

### 预览生产构建

```bash
pnpm run preview
```

## 开发指南

### 代码规范

- 使用TypeScript进行开发
- 遵循ESLint和Prettier规范
- 组件命名使用PascalCase
- 文件命名使用kebab-case
- 函数命名使用camelCase

### 提交规范

采用Angular提交规范，格式如下：

```
<类型>(<作用域>): <描述>

[可选的正文]

[可选的脚注]
```

类型说明：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码风格调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### 分支管理

- **main**: 生产分支，存放稳定版本
- **develop**: 开发分支，日常开发的主分支
- **feature/***: 功能分支，用于开发新功能
- **fix/***: 修复分支，用于修复bug
- **release/***: 发布分支，用于准备新版本发布
- **hotfix/***: 热修复分支，用于紧急修复生产问题

## 测试

### 运行单元测试

```bash
pnpm run test
```

### 运行测试并监听文件变化

```bash
pnpm run test:watch
```

### 生成测试覆盖率报告

```bash
pnpm run test:coverage
```

## 部署

### 本地部署

1. 构建生产版本
   ```bash
   pnpm run build
   ```

2. 部署到服务器
   ```bash
   # 使用PM2管理进程
   pm2 start npm --name qmeta -- run preview
   ```

### CI/CD

项目配置了GitHub Actions，自动执行构建、测试和部署流程

## 贡献

目前为个人项目，暂不接受外部贡献

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系项目开发者

## 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)
