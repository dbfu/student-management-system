# 技术栈说明

## 概述

学生管理系统采用前后端分离架构，前端使用 React + Vite，后端使用 Fastify + Prisma，数据库使用 MySQL。

## 技术选型理由

### 前端技术栈

| 技术 | 版本 | 选型理由 |
|------|------|----------|
| React | 18 | 生态成熟、社区活跃、组件化开发效率高 |
| Vite | 5 | 开发体验好、HMR 快、构建速度快 |
| Tailwind CSS | 3 | 快速开发、响应式友好、无需手写 CSS |
| Zustand | 4 | 轻量、简单、无 Provider 包装、TypeScript 友好 |
| React Router DOM | 6 | 标准路由方案、功能完整 |
| TypeScript | 5 | 类型安全、前后端统一、开发体验好 |

### 后端技术栈

| 技术 | 版本 | 选型理由 |
|------|------|----------|
| Fastify | 4 | 高性能、Schema 验证、插件系统、TypeScript 友好 |
| Prisma | 5 | TypeScript 原生、类型安全、迁移工具、开发效率高 |
| MySQL | 8 | 最流行、云服务支持好、Prisma 支持、关系型数据 |
| TypeScript | 5 | 前后端统一、类型安全、代码可维护性高 |
| JWT | - | 无状态、跨服务友好、前端存储简单 |
| bcrypt | - | 密码加密、安全可靠 |

## 技术架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     浏览器（客户端）                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     前端层（React SPA）                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Pages     │  │  Modules    │  │   Shared    │          │
│  │  (路由页面)  │  │ (业务模块)   │  │ (公共组件)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌─────────────────────────────────────────────────┐        │
│  │              Zustand Store (全局状态)             │        │
│  └─────────────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────────────┐        │
│  │              API Service (接口封装)               │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     后端层（Fastify）                         │
│  ┌─────────────────────────────────────────────────┐        │
│  │                  中间件层                          │        │
│  │  JWT验证 │ CORS │ Helmet │ Rate Limit │ 日志      │        │
│  └─────────────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────────────┐        │
│  │                  业务模块层                        │        │
│  │  Auth │ Student │ Teacher │ Class │ Course      │        │
│  │  Grade │ Attendance │ Statistics                 │        │
│  └─────────────────────────────────────────────────┘        │
│  ┌─────────────────────────────────────────────────┐        │
│  │                  Prisma ORM                       │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     数据层（MySQL）                           │
│  users │ students │ teachers │ classes │ courses │ grades   │
│  attendances │ operation_logs                              │
└─────────────────────────────────────────────────────────────┘
```

## 目录结构

```
student-management-system/
├── web/                        # 前端项目
│   ├── src/
│   │   ├── modules/            # 业务模块
│   │   │   ├── auth/          # 认证模块
│   │   │   ├── student/       # 学生模块
│   │   │   ├── teacher/       # 教师模块
│   │   │   ├── class/         # 班级模块
│   │   │   ├── course/        # 课程模块
│   │   │   ├── grade/         # 成绩模块
│   │   │   ├── attendance/    # 考勤模块
│   │   │   └── statistics/    # 统计模块
│   │   ├── shared/            # 共享资源
│   │   │   ├── components/    # 公共组件
│   │   │   ├── hooks/        # 公共 hooks
│   │   │   ├── services/     # API 服务
│   │   │   ├── store/        # 全局状态
│   │   │   └── utils/        # 工具函数
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── server/                     # 后端项目
│   ├── src/
│   │   ├── modules/            # 业务模块
│   │   │   ├── auth/          # 认证模块
│   │   │   ├── student/       # 学生模块
│   │   │   ├── teacher/       # 教师模块
│   │   │   ├── class/         # 班级模块
│   │   │   ├── course/        # 课程模块
│   │   │   ├── grade/         # 成绩模块
│   │   │   ├── attendance/    # 考勤模块
│   │   │   └── statistics/    # 统计模块
│   │   ├── lib/
│   │   │   └── prisma.ts      # Prisma 客户端
│   │   ├── shared/
│   │   │   ├── middleware/    # 中间件
│   │   │   └── utils/         # 工具函数
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── docs/                       # 文档目录
│   ├── tech-stack.md
│   ├── architecture.md
│   ├── api-spec.md
│   └── data-model.md
│
├── CLAUDE.md
├── README.md
├── package.json
├── pnpm-workspace.yaml
└── .gitignore
```

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MySQL >= 8.0

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发环境（前后端同时启动）
pnpm dev

# 前端开发
cd web && pnpm dev

# 后端开发
cd server && pnpm dev

# 构建生产版本
pnpm build

# 数据库操作
cd server
pnpm db:generate   # 生成 Prisma Client
pnpm db:push       # 推送 schema 到数据库
pnpm db:migrate    # 创建迁移
pnpm db:studio     # 打开 Prisma Studio
```