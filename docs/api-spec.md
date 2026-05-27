# API 接口规范

## 基础信息

- **基础路径**：`/api`
- **认证方式**：JWT Bearer Token
- **请求格式**：`application/json`
- **响应格式**：`application/json`

## 响应格式

### 成功响应
```json
{
  "code": 0,
  "data": any,
  "message": "success"
}
```

### 错误响应
```json
{
  "code": number,
  "data": null,
  "message": "错误信息"
}
```

## 认证接口

### 登录
- **POST** `/api/auth/login`
- 请求体：
```json
{
  "username": "string",
  "password": "string"
}
```
- 响应：
```json
{
  "code": 0,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": 1,
      "username": "admin",
      "name": "管理员"
    }
  },
  "message": "登录成功"
}
```

### 获取当前用户信息
- **GET** `/api/auth/me`
- Header: `Authorization: Bearer <token>`
- 响应：
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "username": "admin",
    "name": "管理员"
  },
  "message": "success"
}
```

### 修改密码
- **PUT** `/api/auth/password`
- Header: `Authorization: Bearer <token>`
- 请求体：
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### 退出登录
- **POST** `/api/auth/logout`
- Header: `Authorization: Bearer <token>`

---

## 学生管理接口

### 获取学生列表
- **GET** `/api/students`
- Query参数：
  - `page`: 页码（默认1）
  - `pageSize`: 每页数量（默认10）
  - `keyword`: 搜索关键字（学号或姓名）
  - `classId`: 班级ID筛选
  - `status`: 学籍状态筛选
- 响应：
```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "code": "2024001",
        "name": "张三",
        "gender": "男",
        "phone": "13800138000",
        "className": "计算机2401班",
        "status": "在读"
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10
  },
  "message": "success"
}
```

### 获取学生详情
- **GET** `/api/students/:id`

### 新增学生
- **POST** `/api/students`
- 请求体：
```json
{
  "code": "2024001",
  "name": "张三",
  "gender": "男",
  "birthDate": "2000-01-01",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "classId": 1,
  "enrollYear": 2024,
  "status": "在读",
  "address": "北京市朝阳区"
}
```

### 修改学生
- **PUT** `/api/students/:id`
- 请求体：同新增

### 删除学生
- **DELETE** `/api/students/:id`

### 批量导入学生
- **POST** `/api/students/import`
- Content-Type: `multipart/form-data`
- 请求体：Excel文件

### 导出学生
- **GET** `/api/students/export`
- Query参数：同列表查询

---

## 教师管理接口

### 获取教师列表
- **GET** `/api/teachers`
- Query参数：
  - `page`: 页码
  - `pageSize`: 每页数量
  - `keyword`: 搜索关键字
  - `collegeId`: 学院ID筛选
  - `status`: 状态筛选

### 获取教师详情
- **GET** `/api/teachers/:id`

### 新增教师
- **POST** `/api/teachers`
- 请求体：
```json
{
  "code": "T001",
  "name": "李老师",
  "gender": "男",
  "phone": "13800138001",
  "email": "li@school.edu",
  "collegeId": 1,
  "title": "教授",
  "status": "在职"
}
```

### 修改教师
- **PUT** `/api/teachers/:id`

### 删除教师
- **DELETE** `/api/teachers/:id`

### 分配课程
- **POST** `/api/teachers/:id/courses`
- 请求体：
```json
{
  "courseIds": [1, 2, 3]
}
```

---

## 班级管理接口

### 获取班级列表
- **GET** `/api/classes`
- Query参数：
  - `page`: 页码
  - `pageSize`: 每页数量
  - `keyword`: 搜索关键字
  - `collegeId`: 学院ID筛选
  - `majorId`: 专业ID筛选

### 获取班级详情
- **GET** `/api/classes/:id`

### 新增班级
- **POST** `/api/classes`
- 请求体：
```json
{
  "code": "CS2401",
  "name": "计算机2401班",
  "collegeId": 1,
  "majorId": 1,
  "grade": 2024,
  "teacherId": 1
}
```

### 修改班级
- **PUT** `/api/classes/:id`

### 删除班级
- **DELETE** `/api/classes/:id`

### 获取班级学生列表
- **GET** `/api/classes/:id/students`

---

## 课程管理接口

### 获取课程列表
- **GET** `/api/courses`
- Query参数：
  - `page`: 页码
  - `pageSize`: 每页数量
  - `keyword`: 搜索关键字
  - `semester`: 学期筛选

### 获取课程详情
- **GET** `/api/courses/:id`

### 新增课程
- **POST** `/api/courses`
- 请求体：
```json
{
  "code": "CS101",
  "name": "计算机基础",
  "type": "必修",
  "credit": 3.0,
  "hours": 48,
  "semester": "2024-1",
  "teacherIds": [1],
  "classIds": [1, 2]
}
```

### 修改课程
- **PUT** `/api/courses/:id`

### 删除课程
- **DELETE** `/api/courses/:id`

### 分配教师
- **POST** `/api/courses/:id/teachers`
- 请求体：
```json
{
  "teacherIds": [1, 2]
}
```

### 分配班级
- **POST** `/api/courses/:id/classes`
- 请求体：
```json
{
  "classIds": [1, 2]
}
```

---

## 成绩管理接口

### 获取成绩列表
- **GET** `/api/grades`
- Query参数：
  - `page`: 页码
  - `pageSize`: 每页数量
  - `studentId`: 学生ID
  - `courseId`: 课程ID
  - `classId`: 班级ID
  - `semester`: 学期

### 获取成绩详情
- **GET** `/api/grades/:id`

### 新增成绩
- **POST** `/api/grades`
- 请求体：
```json
{
  "studentId": 1,
  "courseId": 1,
  "semester": "2024-1",
  "dailyScore": 80,
  "midtermScore": 75,
  "finalScore": 85
}
```

### 修改成绩
- **PUT** `/api/grades/:id`

### 删除成绩
- **DELETE** `/api/grades/:id`

### 批量导入成绩
- **POST** `/api/grades/import`

### 导出成绩
- **GET** `/api/grades/export`

### 成绩统计
- **GET** `/api/grades/statistics`
- Query参数：
  - `courseId`: 课程ID
  - `classId`: 班级ID
  - `semester`: 学期
- 响应：
```json
{
  "code": 0,
  "data": {
    "average": 75.5,
    "max": 98,
    "min": 45,
    "passRate": 0.85,
    "distribution": {
      "excellent": 10,
      "good": 20,
      "medium": 30,
      "pass": 25,
      "fail": 15
    }
  },
  "message": "success"
}
```

---

## 考勤管理接口

### 获取考勤列表
- **GET** `/api/attendances`
- Query参数：
  - `page`: 页码
  - `pageSize`: 每页数量
  - `studentId`: 学生ID
  - `courseId`: 课程ID
  - `classId`: 班级ID
  - `date`: 日期
  - `status`: 状态

### 获取考勤详情
- **GET** `/api/attendances/:id`

### 新增考勤
- **POST** `/api/attendances`
- 请求体：
```json
{
  "studentId": 1,
  "courseId": 1,
  "date": "2024-01-15",
  "status": "正常",
  "remark": ""
}
```

### 批量考勤
- **POST** `/api/attendances/batch`
- 请求体：
```json
{
  "courseId": 1,
  "date": "2024-01-15",
  "records": [
    { "studentId": 1, "status": "正常", "remark": "" },
    { "studentId": 2, "status": "迟到", "remark": "" }
  ]
}
```

### 修改考勤
- **PUT** `/api/attendances/:id`

### 删除考勤
- **DELETE** `/api/attendances/:id`

### 导出考勤
- **GET** `/api/attendances/export`

### 考勤统计
- **GET** `/api/attendances/statistics`
- Query参数：
  - `courseId`: 课程ID
  - `classId`: 班级ID
  - `startDate`: 开始日期
  - `endDate`: 结束日期
- 响应：
```json
{
  "code": 0,
  "data": {
    "normal": 450,
    "late": 20,
    "earlyLeave": 10,
    "leave": 15,
    "absent": 5
  },
  "message": "success"
}
```

---

## 统计分析接口

### 首页统计
- **GET** `/api/statistics/dashboard`
- 响应：
```json
{
  "code": 0,
  "data": {
    "studentCount": 1000,
    "teacherCount": 50,
    "classCount": 30,
    "courseCount": 100
  },
  "message": "success"
}
```

### 学生统计
- **GET** `/api/statistics/students`
- Query参数：
  - `dimension`: 统计维度（college/major/class/year）

### 成绩统计
- **GET** `/api/statistics/grades`
- Query参数：
  - `semester`: 学期
  - `courseId`: 课程ID

### 考勤统计
- **GET** `/api/statistics/attendances`
- Query参数：
  - `startDate`: 开始日期
  - `endDate`: 结束日期

---

## 基础数据接口

### 获取学院列表
- **GET** `/api/colleges`

### 获取专业列表
- **GET** `/api/majors`
- Query参数：
  - `collegeId`: 学院ID筛选

---

## 错误码汇总

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 认证失败 |
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