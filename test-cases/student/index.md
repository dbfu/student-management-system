# 学生信息管理模块 - 测试用例索引

module: student
priority: P0
created_at: 2026-05-27

---

## 用例列表

| ID | 标题 | 优先级 | 状态 |
|----|------|--------|------|
| TC-STUDENT-001 | 新增学生信息（正常） | P0 | active |
| TC-STUDENT-002 | 新增学生信息（学号重复） | P0 | active |
| TC-STUDENT-003 | 新增学生信息（必填字段为空） | P0 | active |
| TC-STUDENT-004 | 新增学生信息（手机号格式错误） | P1 | active |
| TC-STUDENT-005 | 新增学生信息（邮箱格式错误） | P1 | active |
| TC-STUDENT-006 | 修改学生信息 | P0 | active |
| TC-STUDENT-007 | 删除学生信息（二次确认） | P0 | active |
| TC-STUDENT-008 | 查询学生信息（按条件筛选） | P0 | active |
| TC-STUDENT-009 | 学生列表分页 | P1 | active |
| TC-STUDENT-010 | 导出学生信息 | P2 | active |
| TC-STUDENT-011 | Excel批量导入学生信息 | P2 | active |
| TC-STUDENT-012 | 删除已有关联成绩/考勤的学生 | P1 | active |

---

## 核心功能覆盖

| 功能 | 用例 |
|------|------|
| 新增学生 | TC-STUDENT-001, TC-STUDENT-002, TC-STUDENT-003, TC-STUDENT-004, TC-STUDENT-005 |
| 修改学生 | TC-STUDENT-006 |
| 删除学生 | TC-STUDENT-007, TC-STUDENT-012 |
| 查询筛选 | TC-STUDENT-008, TC-STUDENT-009 |
| 导入导出 | TC-STUDENT-010, TC-STUDENT-011 |

---

## 执行历史

暂无执行记录。