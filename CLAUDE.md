# 学生管理系统项目约束

## 项目概述

学生管理系统是一个面向中小学校和培训机构的学生信息一体化管理系统，提供学生、教师、班级、课程、成绩、考勤的集中管理。

## 技术栈

### 前端
- 框架：React 18 + Vite 5
- 样式：Tailwind CSS 3
- 状态管理：Zustand 4
- 路由：React Router DOM 6
- 语言：TypeScript 5
- 包管理：pnpm（必须）

### 后端
- 框架：Fastify 4
- ORM：Prisma 5
- 数据库：MySQL 8
- 语言：TypeScript 5
- 包管理：pnpm（必须）

## 代码规范

### 通用规范
- 语言：TypeScript（禁止 JavaScript）
- 每个文件不超过 500 行（超过必须拆分）
- 文件命名：kebab-case（如 `student-list.tsx`）
- 目录结构：按功能模块划分

### 前端规范
- 组件命名：PascalCase（如 `StudentList`）
- 组件拆分：超过 500 行必须拆分为子组件或抽取 hooks
- API 调用：必须通过 `shared/services/` 中的 service 层
- 状态管理：全局状态使用 Zustand，模块状态可使用 useState

### 后端规范
- Service 层：业务逻辑必须放在 `service.ts`
- Controller 层：只做参数校验和响应，禁止写业务逻辑
- 路由定义：在 `routes.ts` 中定义

## API 规范

### 基础规范
- 风格：RESTful
- 认证：JWT（Bearer Token）
- Token 存储：前端 localStorage
- 请求头：`Authorization: Bearer <token>`

### 响应格式
```typescript
// 成功响应
{
  "code": 0,
  "data": any,
  "message": "success"
}

// 错误响应
{
  "code": number,
  "data": null,
  "message": "错误信息"
}
```

### 错误码定义
| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 认证失败（未登录或token无效） |
| 1003 | 权限不足 |
| 2001 | 用户名已存在 |
| 2002 | 用户名或密码错误 |
| 3001 | 学号已存在 |
| 3002 | 学生不存在 |
| 4001 | 教师工号已存在 |
| 4002 | 教师不存在 |
| 5001 | 班级编号已存在 |
| 5002 | 班级不存在 |
| 6001 | 课程编号已存在 |
| 6002 | 课程不存在 |
| 7001 | 成绩记录已存在 |
| 7002 | 成绩记录不存在 |
| 8001 | 考勤记录已存在 |
| 8002 | 考勤记录不存在 |
| 5000 | 服务器内部错误 |

### API 路径规范
- 前缀：`/api`
- 认证相关：`/api/auth/*`
- 学生管理：`/api/students/*`
- 教师管理：`/api/teachers/*`
- 班级管理：`/api/classes/*`
- 课程管理：`/api/courses/*`
- 成绩管理：`/api/grades/*`
- 考勤管理：`/api/attendances/*`
- 统计分析：`/api/statistics/*`

## Prisma 规范

### 命名规范
- model 命名：PascalCase（如 `Student`、`Teacher`）
- 字段命名：camelCase（如 `createdAt`）
- 数据库列名：snake_case（使用 `@map`）
- 表名：snake_case 复数形式（使用 `@@map`）

### 必须字段
- `id`：自增主键
- `createdAt`：创建时间
- `updatedAt`：更新时间

## 安全规范

### 密码安全
- 使用 bcrypt 加密存储
- 盐值轮数：10

### JWT 配置
- 过期时间：7天
- 载荷：userId, username

### 安全措施
- 使用 @fastify/helmet 设置安全头
- 使用 @fastify/cors 配置跨域
- 使用 @fastify/rate-limit 限制请求频率
- 参数校验防止 SQL 注入
- XSS 过滤

## 禁止事项

- 禁止使用 npm 或 yarn 安装依赖
- 禁止在组件中直接调用 API（必须通过 service）
- 禁止在后端 controller 中写业务逻辑（必须放在 service）
- 禁止硬编码配置（必须使用环境变量）
- 禁止前端存储敏感信息
- 禁止跳过 TypeScript 类型检查
- 禁止物理删除有成绩/考勤记录的学生
- 禁止明文存储密码

## 开发流程

1. 后端先开发 API 接口
2. 前端对接 API 开发页面
3. 完成后进行代码 Review
4. Review 通过后推送代码
5. 运维部署到服务器
6. 测试进行自动化测试