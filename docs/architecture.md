# 架构设计文档

## 1. 系统概述

学生管理系统是一个面向中小学校和培训机构的学生信息一体化管理系统，采用前后端分离架构，提供学生、教师、班级、课程、成绩、考勤的集中管理功能。

## 2. 系统架构

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                          用户层                                  │
│                    浏览器（Chrome/Edge/Firefox）                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         前端层                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      React Application                     │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │  │
│  │  │   Pages     │ │   Modules   │ │   Shared    │         │  │
│  │  │  (路由页面)  │ │  (业务模块)  │ │  (公共层)    │         │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘         │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │              Zustand Store (状态管理)            │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │              API Service (接口封装)             │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                        Vite + TypeScript                         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTP/REST API
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         后端层                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      Fastify Server                        │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │                   中间件层                         │     │  │
│  │  │  JWT │ CORS │ Helmet │ Rate Limit │ 日志 │ 校验   │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │                   路由层                          │     │  │
│  │  │  /api/auth │ /api/students │ /api/teachers ...  │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │                   Controller层                   │     │  │
│  │  │  参数校验 │ 请求处理 │ 响应封装                    │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │                   Service层                      │     │  │
│  │  │  业务逻辑 │ 数据处理 │ 事务管理                    │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │                   Prisma ORM                     │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                        TypeScript                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         数据层                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      MySQL 8.0                             │  │
│  │  users │ colleges │ majors │ classes │ teachers │ students │  │
│  │  courses │ grades │ attendances │ operation_logs          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 技术架构

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 前端框架 | React 18 + Vite 5 | 现代化开发体验 |
| 前端样式 | Tailwind CSS 3 | 快速开发 |
| 前端状态 | Zustand 4 | 轻量状态管理 |
| 前端路由 | React Router DOM 6 | 标准路由方案 |
| 后端框架 | Fastify 4 | 高性能 Node.js 框架 |
| 后端ORM | Prisma 5 | 类型安全的数据库操作 |
| 数据库 | MySQL 8 | 主流关系型数据库 |
| 认证 | JWT | 无状态认证 |
| 语言 | TypeScript 5 | 类型安全 |

## 3. 前端架构

### 3.1 目录结构

```
web/src/
├── modules/                    # 业务模块
│   ├── auth/                  # 认证模块
│   │   ├── components/        # 模块组件
│   │   │   ├── login-form.tsx
│   │   │   └── change-password.tsx
│   │   ├── pages/             # 模块页面
│   │   │   └── login.tsx
│   │   ├── hooks/             # 模块hooks
│   │   │   └── use-auth.ts
│   │   └── index.ts
│   ├── student/               # 学生管理模块
│   │   ├── components/
│   │   │   ├── student-list.tsx
│   │   │   ├── student-form.tsx
│   │   │   └── student-detail.tsx
│   │   ├── pages/
│   │   │   ├── student-list.tsx
│   │   │   └── student-edit.tsx
│   │   ├── hooks/
│   │   │   └── use-students.ts
│   │   └── index.ts
│   ├── teacher/               # 教师管理模块（同上结构）
│   ├── class/                 # 班级管理模块（同上结构）
│   ├── course/                # 课程管理模块（同上结构）
│   ├── grade/                 # 成绩管理模块（同上结构）
│   ├── attendance/            # 考勤管理模块（同上结构）
│   └── statistics/            # 统计报表模块（同上结构）
│
├── shared/                    # 共享资源
│   ├── components/           # 公共组件
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── main-layout.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── modal.tsx
│   │   │   └── pagination.tsx
│   │   └── feedback/
│   │       ├── loading.tsx
│   │       ├── message.tsx
│   │       └── confirm.tsx
│   ├── hooks/                # 公共hooks
│   │   ├── use-request.ts
│   │   ├── use-pagination.ts
│   │   └── use-search.ts
│   ├── services/             # API服务
│   │   ├── api.ts            # 基础API配置
│   │   ├── auth.ts           # 认证API
│   │   ├── student.ts        # 学生API
│   │   ├── teacher.ts        # 教师API
│   │   ├── class.ts          # 班级API
│   │   ├── course.ts         # 课程API
│   │   ├── grade.ts          # 成绩API
│   │   ├── attendance.ts     # 考勤API
│   │   └── statistics.ts     # 统计API
│   ├── store/                # 全局状态
│   │   ├── auth-store.ts     # 认证状态
│   │   └── ui-store.ts       # UI状态
│   └── utils/                # 工具函数
│       ├── format.ts
│       ├── validate.ts
│       └── export.ts
│
├── pages/                     # 页面入口
│   ├── home.tsx              # 首页仪表盘
│   └── not-found.tsx         # 404页面
│
├── App.tsx                    # 应用入口
├── main.tsx                   # 渲染入口
└── index.css                  # 全局样式
```

### 3.2 状态管理

使用 Zustand 进行状态管理：

```typescript
// shared/store/auth-store.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}
```

### 3.3 API 服务封装

```typescript
// shared/services/api.ts
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器：添加token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 跳转登录
    }
    return Promise.reject(error);
  }
);
```

## 4. 后端架构

### 4.1 目录结构

```
server/src/
├── modules/                   # 业务模块
│   ├── auth/                 # 认证模块
│   │   ├── service.ts        # 业务逻辑
│   │   ├── controller.ts     # 控制器
│   │   ├── routes.ts         # 路由定义
│   │   └── types.ts          # 类型定义
│   ├── student/              # 学生管理模块
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   ├── routes.ts
│   │   └── types.ts
│   ├── teacher/              # 教师管理模块
│   ├── class/                # 班级管理模块
│   ├── college/              # 学院专业模块
│   ├── course/               # 课程管理模块
│   ├── grade/                # 成绩管理模块
│   ├── attendance/           # 考勤管理模块
│   └── statistics/           # 统计模块
│
├── lib/
│   └── prisma.ts             # Prisma客户端
│
├── shared/
│   ├── middleware/           # 中间件
│   │   ├── auth.ts           # JWT认证
│   │   ├── error-handler.ts  # 错误处理
│   │   └── logger.ts         # 日志
│   └── utils/                # 工具函数
│       ├── response.ts       # 响应格式化
│       ├── password.ts       # 密码加密
│       └── validate.ts       # 参数校验
│
├── app.ts                     # Fastify应用配置
└── server.ts                  # 服务入口
```

### 4.2 模块结构

每个业务模块遵循以下结构：

```typescript
// types.ts - 类型定义
export interface Student {
  id: number;
  code: string;
  name: string;
  // ...
}

export interface CreateStudentDto {
  code: string;
  name: string;
  // ...
}

// service.ts - 业务逻辑
export const studentService = {
  async list(params: ListParams) {
    return prisma.student.findMany({...});
  },
  async create(data: CreateStudentDto) {
    return prisma.student.create({...});
  },
  // ...
};

// controller.ts - 控制器
export const studentController = {
  async list(request: FastifyRequest, reply: FastifyReply) {
    const params = validateListParams(request.query);
    const result = await studentService.list(params);
    return reply.send(success(result));
  },
  // ...
};

// routes.ts - 路由定义
export async function studentRoutes(fastify: FastifyInstance) {
  fastify.get('/students', { preHandler: [auth] }, studentController.list);
  fastify.post('/students', { preHandler: [auth] }, studentController.create);
  // ...
}
```

### 4.3 中间件

#### JWT认证中间件
```typescript
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return reply.code(401).send({ code: 1002, message: '未登录' });
  }
  try {
    const decoded = fastify.jwt.verify(token);
    request.user = decoded;
  } catch (error) {
    return reply.code(401).send({ code: 1002, message: 'token无效' });
  }
}
```

#### 错误处理中间件
```typescript
export async function errorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
  console.error(error);
  const code = error.code || 5000;
  const message = error.message || '服务器内部错误';
  return reply.code(500).send({ code, message, data: null });
}
```

## 5. 部署架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Nginx 反向代理                          │
│                    (静态资源 + API代理)                       │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   前端静态资源   │ │   后端服务       │ │    MySQL 数据库  │
│  (React Build)  │ │  (Fastify)       │ │    (MySQL 8)     │
│                 │ │  Port: 3000     │ │    Port: 3306    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 部署配置

- **前端**：Vite 打包后的静态文件，由 Nginx 托管
- **后端**：Node.js 进程，使用 PM2 管理进程
- **数据库**：MySQL 8，独立部署
- **代理**：Nginx 反向代理，HTTPS 配置

## 6. 安全架构

### 6.1 认证与授权
- JWT Token 认证
- Token 有效期：7天
- Token 存储：前端 localStorage
- 每次请求携带 Authorization Header

### 6.2 数据安全
- 密码使用 bcrypt 加密存储
- 敏感操作记录操作日志
- 删除操作二次确认

### 6.3 接口安全
- @fastify/helmet 设置安全头
- @fastify/cors 配置跨域白名单
- @fastify/rate-limit 限制请求频率
- 参数校验防止 SQL 注入
- XSS 过滤

## 7. 性能优化

### 7.1 前端优化
- Vite 打包优化（代码分割、Tree Shaking）
- 路由懒加载
- 列表虚拟滚动（大数据量）
- 分页加载

### 7.2 后端优化
- 数据库索引优化
- 分页查询
- Prisma 查询优化（select 只查需要的字段）
- 连接池配置

### 7.3 数据库优化
- 合理设计索引
- 分页查询
- 避免 N+1 查询