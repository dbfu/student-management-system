# 学生管理系统

一个面向中小学校和培训机构的学生信息一体化管理系统。

## 功能特性

### MVP（P0）
- ✅ 用户登录认证
- ✅ 学生信息管理（CRUD、查询筛选）
- ✅ 教师信息管理（CRUD、查询筛选）
- ✅ 班级管理（CRUD、学生归属）

### 第一期迭代（P1）
- 课程管理
- 成绩管理
- 考勤管理

### 第二期迭代（P2）
- 数据统计报表
- Excel导入导出
- 操作日志

## 技术栈

### 前端
- React 18 + Vite 5
- Tailwind CSS 3
- Zustand 4
- React Router DOM 6
- TypeScript 5

### 后端
- Fastify 4
- Prisma 5
- MySQL 8
- TypeScript 5
- JWT 认证

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MySQL >= 8.0

### 安装依赖

```bash
pnpm install
```

### 配置数据库

1. 创建 `.env` 文件（参考 `server/.env.example`）
2. 配置数据库连接信息

```bash
DATABASE_URL="mysql://用户名:密码@localhost:3306/student_management"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=development
```

3. 推送数据库结构

```bash
cd server
pnpm db:generate
pnpm db:push
```

### 启动开发环境

```bash
# 同时启动前后端
pnpm dev

# 或分别启动
cd web && pnpm dev    # 前端 http://localhost:5173
cd server && pnpm dev # 后端 http://localhost:3000
```

### 构建生产版本

```bash
pnpm build
```

## 项目结构

```
student-management-system/
├── web/                   # 前端项目
│   ├── src/
│   │   ├── modules/       # 业务模块
│   │   ├── shared/        # 共享资源
│   │   └── pages/         # 页面入口
│   └── ...
│
├── server/                # 后端项目
│   ├── src/
│   │   ├── modules/       # 业务模块
│   │   ├── lib/           # 库文件
│   │   └── shared/        # 共享资源
│   ├── prisma/            # 数据库 Schema
│   └── ...
│
├── docs/                  # 文档
├── CLAUDE.md              # 项目约束
└── README.md              # 项目说明
```

## API 文档

详见 [docs/api-spec.md](docs/api-spec.md)

## 数据模型

详见 [docs/data-model.md](docs/data-model.md)

## 许可证

MIT