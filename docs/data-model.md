# 数据模型设计

## 概述

学生管理系统使用 MySQL 数据库，通过 Prisma ORM 进行数据操作。本文档描述所有数据表结构及其关系。

## ER 图

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   College   │────<│    Major    │────<│    Class    │
│   (学院)    │     │    (专业)    │     │    (班级)    │
└─────────────┘     └─────────────┘     └──────┬──────┘
       │                                       │
       │                                       │
       ▼                                       ▼
┌─────────────┐                          ┌─────────────┐
│   Teacher   │                          │   Student   │
│   (教师)    │                          │    (学生)   │
└──────┬──────┘                          └──────┬──────┘
       │                                        │
       │                                        │
       ▼                                        ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│CourseTeacher│────>│   Course    │<────│ CourseClass │
│ (课程-教师)  │     │    (课程)    │     │ (课程-班级)  │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
      ┌─────────────┐           ┌─────────────┐
      │    Grade    │           │ Attendance  │
      │    (成绩)   │           │    (考勤)    │
      └─────────────┘           └─────────────┘
```

## 数据表设计

### 用户表 (users)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| username | VARCHAR(50) | UNIQUE, NOT NULL | 用户名 |
| password | VARCHAR(255) | NOT NULL | 密码（bcrypt加密） |
| name | VARCHAR(50) | | 真实姓名 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

---

### 学院表 (colleges)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| name | VARCHAR(100) | UNIQUE, NOT NULL | 学院名称 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

---

### 专业表 (majors)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| name | VARCHAR(100) | NOT NULL | 专业名称 |
| college_id | INT | FK, NOT NULL | 所属学院ID |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

**唯一索引**: (name, college_id)

---

### 班级表 (classes)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| code | VARCHAR(20) | UNIQUE, NOT NULL | 班级编号 |
| name | VARCHAR(100) | NOT NULL | 班级名称 |
| college_id | INT | FK, NOT NULL | 所属学院ID |
| major_id | INT | FK, NOT NULL | 所属专业ID |
| grade | INT | NOT NULL | 年级 |
| teacher_id | INT | FK | 班主任ID |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

**外键关系**:
- college_id -> colleges.id
- major_id -> majors.id
- teacher_id -> teachers.id

---

### 教师表 (teachers)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| code | VARCHAR(20) | UNIQUE, NOT NULL | 教师工号 |
| name | VARCHAR(50) | NOT NULL | 姓名 |
| gender | VARCHAR(10) | NOT NULL | 性别 |
| phone | VARCHAR(20) | | 手机号 |
| email | VARCHAR(100) | | 邮箱 |
| college_id | INT | FK, NOT NULL | 所属学院ID |
| title | VARCHAR(50) | | 职称 |
| status | VARCHAR(20) | DEFAULT '在职' | 状态 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

**外键关系**:
- college_id -> colleges.id

---

### 学生表 (students)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| code | VARCHAR(20) | UNIQUE, NOT NULL | 学号 |
| name | VARCHAR(50) | NOT NULL | 姓名 |
| gender | VARCHAR(10) | NOT NULL | 性别 |
| birth_date | DATE | | 出生日期 |
| phone | VARCHAR(20) | | 手机号 |
| email | VARCHAR(100) | | 邮箱 |
| class_id | INT | FK, NOT NULL | 所属班级ID |
| enroll_year | INT | NOT NULL | 入学年份 |
| status | VARCHAR(20) | DEFAULT '在读' | 学籍状态 |
| address | VARCHAR(255) | | 家庭住址 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

**外键关系**:
- class_id -> classes.id

---

### 课程表 (courses)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| code | VARCHAR(20) | UNIQUE, NOT NULL | 课程编号 |
| name | VARCHAR(100) | NOT NULL | 课程名称 |
| type | VARCHAR(20) | NOT NULL | 课程类型（必修/选修） |
| credit | FLOAT | NOT NULL | 学分 |
| hours | INT | NOT NULL | 学时 |
| semester | VARCHAR(20) | NOT NULL | 开课学期 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

---

### 课程-教师关联表 (course_teachers)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| course_id | INT | FK, NOT NULL | 课程ID |
| teacher_id | INT | FK, NOT NULL | 教师ID |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |

**唯一索引**: (course_id, teacher_id)

---

### 课程-班级关联表 (course_classes)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| course_id | INT | FK, NOT NULL | 课程ID |
| class_id | INT | FK, NOT NULL | 班级ID |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |

**唯一索引**: (course_id, class_id)

---

### 成绩表 (grades)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| student_id | INT | FK, NOT NULL | 学生ID |
| course_id | INT | FK, NOT NULL | 课程ID |
| semester | VARCHAR(20) | NOT NULL | 学期 |
| daily_score | FLOAT | | 平时成绩 |
| midterm_score | FLOAT | | 期中成绩 |
| final_score | FLOAT | | 期末成绩 |
| total_score | FLOAT | | 总评成绩 |
| is_passed | BOOLEAN | DEFAULT FALSE | 是否及格 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

**唯一索引**: (student_id, course_id, semester)

**外键关系**:
- student_id -> students.id

---

### 考勤表 (attendances)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| student_id | INT | FK, NOT NULL | 学生ID |
| course_id | INT | FK, NOT NULL | 课程ID |
| date | DATE | NOT NULL | 考勤日期 |
| status | VARCHAR(20) | NOT NULL | 考勤状态 |
| remark | VARCHAR(255) | | 备注 |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |
| updated_at | DATETIME | ON UPDATE NOW | 更新时间 |

**唯一索引**: (student_id, course_id, date)

**外键关系**:
- student_id -> students.id

**考勤状态枚举**: 正常、迟到、早退、请假、缺勤

---

### 操作日志表 (operation_logs)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 操作用户ID |
| action | VARCHAR(50) | NOT NULL | 操作类型 |
| module | VARCHAR(50) | NOT NULL | 操作模块 |
| detail | TEXT | | 详细信息 |
| ip | VARCHAR(50) | | 操作IP |
| created_at | DATETIME | DEFAULT NOW | 创建时间 |

---

## 索引设计

### 主键索引
所有表都有自增主键索引。

### 唯一索引
- users.username
- students.code
- teachers.code
- classes.code
- courses.code
- majors (name, college_id)
- grades (student_id, course_id, semester)
- attendances (student_id, course_id, date)
- course_teachers (course_id, teacher_id)
- course_classes (course_id, class_id)

### 普通索引
- students.class_id
- teachers.college_id
- classes.college_id, classes.major_id
- grades.student_id, grades.course_id
- attendances.student_id, attendances.course_id, attendances.date
- operation_logs.user_id, operation_logs.created_at

---

## 数据关系说明

### 1. 学院 - 专业 - 班级 关系
- 一个学院包含多个专业（一对多）
- 一个专业属于一个学院（多对一）
- 一个专业包含多个班级（一对多）
- 一个班级属于一个专业（多对一）

### 2. 班级 - 学生 关系
- 一个班级包含多个学生（一对多）
- 一个学生属于一个班级（多对一）

### 3. 教师 - 课程 关系
- 一个教师可以教授多门课程（多对多）
- 一门课程可以有多个授课教师（多对多）
- 通过 course_teachers 关联表实现

### 4. 课程 - 班级 关系
- 一门课程可以被多个班级选修（多对多）
- 一个班级可以选修多门课程（多对多）
- 通过 course_classes 关联表实现

### 5. 学生 - 成绩 关系
- 一个学生可以有多条成绩记录（一对多）
- 一条成绩记录属于一个学生（多对一）

### 6. 学生 - 考勤 关系
- 一个学生可以有多条考勤记录（一对多）
- 一条考勤记录属于一个学生（多对一）

---

## Prisma Schema

完整 Prisma Schema 请参考 `server/prisma/schema.prisma` 文件。