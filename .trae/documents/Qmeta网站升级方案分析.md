# 个人Git版本控制系统搭建计划

## 1. 本地仓库初始化

### 1.1 初始化Git仓库

- 使用`git init`命令初始化本地Git仓库
- 检查初始化结果，确保`.git`目录创建成功

### 1.2 配置用户信息

- 设置全局用户名：`git config --global user.name "[用户名]"`
- 设置全局邮箱：`git config --global user.email "[邮箱]"`
- 验证配置：`git config --global --list`

## 2. 完善.gitignore文件

### 2.1 检查现有.gitignore

- 查看当前项目是否已有.gitignore文件
- 如果已有，检查是否符合项目技术栈需求

### 2.2 完善.gitignore内容

- 根据项目技术栈（TypeScript、React、Vite、pnpm）添加忽略规则
- 忽略操作系统文件、IDE配置、依赖目录、构建输出、环境变量文件等

## 3. Git常用命令配置

### 3.1 设置Git别名

- 配置常用命令的短别名，提高工作效率
- 例如：
  ```bash
  git config --global alias.st status
  git config --global alias.ci commit
  git config --global alias.co checkout
  git config --global alias.br branch
  git config --global alias.lg "log --oneline --graph --decorate --all"
  git config --global alias.unstage "reset HEAD --"
  git config --global alias.last "log -1 HEAD"
  ```

### 3.2 配置自动换行处理

- 设置`core.autocrlf`为true（Windows环境）：`git config --global core.autocrlf true`

### 3.3 配置默认编辑器

- 设置默认编辑器为VS Code：`git config --global core.editor "code --wait"`

## 4. 提交规范定义

### 4.1 制定提交信息格式

- 采用Angular提交规范，格式如下：

  ```
  <类型>(<作用域>): <描述>

  [可选的正文]

  [可选的脚注]
  ```

### 4.2 提交类型说明

- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码风格调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### 4.3 配置提交模板

- 创建提交模板文件`.gitmessage`
- 配置Git使用该模板：`git config --global commit.template ~/.gitmessage`

## 5. 分支管理策略

### 5.1 主分支结构

- `main`: 生产分支，存放稳定版本
- `develop`: 开发分支，日常开发的主分支

### 5.2 辅助分支

- `feature/*`: 功能分支，用于开发新功能
- `fix/*`: 修复分支，用于修复bug
- `release/*`: 发布分支，用于准备新版本发布
- `hotfix/*`: 热修复分支，用于紧急修复生产问题

### 5.3 分支创建与合并规则

- 从`develop`分支创建功能分支
- 功能完成后合并回`develop`分支
- 发布前从`develop`创建`release`分支
- 发布后将`release`分支合并到`main`和`develop`分支
- 紧急修复从`main`创建`hotfix`分支，修复后合并回`main`和`develop`分支

## 6. 版本回溯与冲突解决

### 6.1 版本回溯方法

- 使用`git log`查看提交历史
- 使用`git checkout <commit-id>`临时查看历史版本
- 使用`git reset --hard <commit-id>`回退到指定版本
- 使用`git revert <commit-id>`创建一个新的提交来撤销之前的提交

### 6.2 冲突解决机制

- 了解冲突产生的原因
- 学习使用VS Code等工具解决冲突
- 掌握冲突解决的基本流程：
  1. 查看冲突文件
  2. 编辑文件，解决冲突
  3. 使用`git add`标记冲突已解决
  4. 继续提交或合并

## 7. 代码备份与远程仓库

### 7.1 配置远程仓库

- 在GitHub/GitLab等平台创建远程仓库
- 将本地仓库与远程仓库关联：`git remote add origin <远程仓库URL>`

### 7.2 定期推送代码

- 养成定期推送代码到远程仓库的习惯
- 建议每天工作结束前推送当天修改

### 7.3 拉取更新

- 定期从远程仓库拉取更新：`git pull`
- 或使用`git fetch` + `git merge`组合命令

## 8. 验证与测试

### 8.1 测试基本Git操作

- 创建测试文件并提交
- 测试分支创建、切换与合并
- 测试提交规范是否生效
- 测试冲突解决流程

### 8.2 验证Git配置

- 检查所有配置是否生效：`git config --list`
- 验证别名是否可用：`git lg`
- 验证提交模板是否生效

## 9. 后续维护

### 9.1 定期更新Git版本

- 保持Git版本为最新稳定版
- 定期检查Git更新：`git --version`

### 9.2 优化Git配置

- 根据使用习惯调整Git配置
- 学习并应用新的Git特性

## 预期成果

通过以上步骤，将搭建一套完整的个人Git版本控制系统，具备以下功能：

1. 完整的本地仓库管理
2. 规范的提交流程
3. 高效的分支管理
4. 可靠的版本回溯机制
5. 有效的冲突解决方法
6. 安全的代码备份策略

这套系统将满足个人日常开发需求，支持代码版本追踪、多分支并行开发及代码备份功能。
