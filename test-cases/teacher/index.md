# 教师信息管理模块 - 测试用例索引

module: teacher
priority: P0
created_at: 2026-05-27

---

## 用例列表

| ID | 标题 | 优先级 | 状态 |
|----|------|--------|------|
| TC-TEACHER-001 | 新增教师信息（正常） | P0 | active |
| TC-TEACHER-002 | 新增教师信息（工号重复） | P0 | active |
| TC-TEACHER-003 | 新增教师信息（必填字段为空） | P0 | active |
| TC-TEACHER-004 | 修改教师信息 | P0 | active |
| TC-TEACHER-005 | 删除教师信息（无绑定课程） | P0 | active |
| TC-TEACHER-006 | 删除教师信息（已绑定课程） | P1 | active |
| TC-TEACHER-007 | 查询教师信息（按条件筛选） | P0 | active |
| TC-TEACHER-008 | 分配授课课程 | P1 | active |

---

## 核心功能覆盖

| 功能 | 用例 |
|------|------|
| 新增教师 | TC-TEACHER-001, TC-TEACHER-002, TC-TEACHER-003 |
| 修改教师 | TC-TEACHER-004 |
| 删除教师 | TC-TEACHER-005, TC-TEACHER-006 |
| 查询筛选 | TC-TEACHER-007 |
| 分配课程 | TC-TEACHER-008 |

---

## 执行历史

暂无执行记录。