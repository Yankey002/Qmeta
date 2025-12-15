# 测试策略

## 1. 测试目标

- 确保项目功能正常工作
- 提高代码质量和稳定性
- 减少生产环境中的bug
- 便于后续维护和扩展
- 确保代码变更不会破坏现有功能

## 2. 测试类型

### 2.1 前端测试

#### 2.1.1 单元测试
- **测试对象**：独立的函数、组件、Hook
- **测试工具**：
  - Vitest (测试框架)
  - React Testing Library (React组件测试)
  - jsdom (浏览器环境模拟)
- **测试范围**：
  - 工具函数 (`src/lib/utils.ts`)
  - 自定义Hook (`src/hooks/`)
  - 简单组件 (`src/components/`)
- **覆盖率要求**：
  - 工具函数：100%
  - 自定义Hook：90%+  
  - 简单组件：80%+

#### 2.1.2 组件测试
- **测试对象**：复杂组件、组件交互
- **测试工具**：
  - Vitest
  - React Testing Library
  - jsdom
- **测试范围**：
  - 布局组件 (`src/components/Layout.tsx`)
  - 页面组件 (`src/pages/`)
  - 表单组件 (如果有)
- **覆盖率要求**：
  - 布局组件：80%+
  - 页面组件：70%+

#### 2.1.3 E2E测试 (可选)
- **测试对象**：完整的用户流程
- **测试工具**：
  - Cypress
- **测试范围**：
  - 关键用户流程
  - 跨页面交互
- **覆盖率要求**：
  - 覆盖主要用户流程

### 2.2 后端测试

#### 2.2.1 API测试
- **测试对象**：API端点
- **测试工具**：
  - Jest
  - Supertest
- **测试范围**：
  - 所有API端点
  - 请求验证
  - 响应格式
  - 错误处理
- **覆盖率要求**：
  - API端点：100%

#### 2.2.2 数据库测试
- **测试对象**：数据库操作
- **测试工具**：
  - Jest
  - 测试数据库
- **测试范围**：
  - 数据模型
  - 关系映射
  - CRUD操作
- **覆盖率要求**：
  - 数据模型：100%
  - CRUD操作：90%+

#### 2.2.3 认证测试
- **测试对象**：身份认证和授权
- **测试工具**：
  - Jest
  - Supertest
- **测试范围**：
  - 登录/注册流程
  - JWT生成和验证
  - 权限控制
- **覆盖率要求**：
  - 认证流程：100%
  - 权限控制：90%+

## 3. 测试执行

### 3.1 本地开发测试
- **单元测试**：
  ```bash
  pnpm test
  ```
- **测试监听**：
  ```bash
  pnpm test:watch
  ```
- **测试覆盖率**：
  ```bash
  pnpm test:coverage
  ```

### 3.2 CI/CD测试
- **GitHub Actions**：
  - 推送代码到 `main` 或 `develop` 分支时自动运行测试
  - Pull Request 时自动运行测试
  - 生成测试覆盖率报告

## 4. 测试文件结构

```
Qmeta/
├── src/
│   ├── __tests__/            # 测试文件
│   │   ├── components/       # 组件测试
│   │   ├── hooks/            # Hook测试
│   │   ├── lib/              # 工具函数测试
│   │   └── pages/            # 页面测试
│   └── ...
└── ...
```

## 5. 测试最佳实践

1. **测试命名规范**：
   - 文件名：`[被测试文件].test.tsx` 或 `[被测试文件].spec.tsx`
   - 测试函数：`test('should [预期行为] when [条件]', () => { ... })`

2. **测试隔离**：
   - 每个测试应该独立运行
   - 使用 mock 隔离外部依赖
   - 测试数据库应该与生产数据库分离

3. **测试优先**：
   - 考虑使用 TDD (测试驱动开发) 方式
   - 先写测试，再实现功能

4. **测试覆盖关键路径**：
   - 覆盖正常流程
   - 覆盖边界情况
   - 覆盖错误情况

5. **测试维护**：
   - 定期更新测试用例
   - 修复失败的测试
   - 移除过时的测试

## 6. 测试工具配置

### 6.1 Vitest配置
- 配置文件：`vite.config.ts`
- 配置项：
  ```typescript
  export default defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      coverage: {
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['src/main.tsx', 'src/vite-env.d.ts'],
      },
    },
  })
  ```

### 6.2 React Testing Library配置
- 安装依赖：
  ```bash
  pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```
- 设置文件：`src/setupTests.ts`
  ```typescript
  import '@testing-library/jest-dom'
  ```

## 7. 测试报告

- **本地报告**：
  - 控制台输出
  - HTML报告：`coverage/index.html`

- **CI报告**：
  - GitHub Actions日志
  - 覆盖率徽章

## 8. 测试计划

| 测试阶段 | 测试类型 | 完成时间 | 负责人 |
|---------|---------|---------|-------|
| 第一阶段 | 前端单元测试 | 项目初期 | 开发者 |
| 第二阶段 | 前端组件测试 | 项目中期 | 开发者 |
| 第三阶段 | 后端API测试 | 后端开发完成后 | 开发者 |
| 第四阶段 | E2E测试 | 项目后期 | 开发者 |
| 持续阶段 | 回归测试 | 持续进行 | 开发者 |
