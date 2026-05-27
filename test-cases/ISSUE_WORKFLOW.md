# Issue 提交流程

## 概述

当测试执行发现缺陷时，需要创建 GitHub Issue 进行缺陷管理。

---

## 流程步骤

### 1. 分析失败原因

首先判断测试失败的原因类型：

| 类型 | 描述 | 处理方式 |
|------|------|----------|
| `assertion_failed` | 断言验证失败 | 创建 Bug Issue |
| `precondition_failed` | 前置条件失败 | 标记为 blocked |
| `timeout` | 超时 | 创建 Performance Issue |
| `unexpected_behavior` | 非预期行为 | 创建 Bug Issue |
| `test_case_error` | 用例设计问题 | 更新用例，不创建 Issue |
| `environment_error` | 环境问题 | 重新执行，不创建 Issue |

**关键判断**: 是否是真正的代码缺陷？

- ✅ 是缺陷 → 创建 Bug Issue
- ❌ 是用例问题 → 更新用例，不创建 Issue
- ❌ 是环境问题 → 重新执行，不创建 Issue

---

### 2. 收集证据

必须收集的证据：

| 类型 | 内容 |
|------|------|
| 截图 | 失败时的页面截图 |
| 视频 | 失败时的操作录屏（可选） |
| 日志 | 错误日志、接口响应日志 |
| 复现步骤 | 详细复现步骤说明 |

证据存放在执行报告目录：
```
test-cases/{module}/{case-id}/{date}_{seq}-fail/
├── screenshots/
├── videos/
├── logs/
└── report.md
```

---

### 3. 创建 GitHub Issue

使用 `gh` 命令创建 Issue：

```bash
gh issue create \
  --title "[TEST-FAIL] TC-{ID} - {缺陷标题}" \
  --body-file test-cases/{module}/{case-id}/issue-body.md \
  --label "bug,P0,module:{module}" \
  --assignee @me
```

---

### 4. Issue 标签体系

| 标签 | 用途 |
|------|------|
| `bug` | 代码缺陷 |
| `test-failure` | 测试失败发现 |
| `P0` | 最高优先级（阻塞核心功能） |
| `P1` | 高优先级 |
| `P2` | 中优先级 |
| `blocked` | 阻塞其他测试 |
| `module:login` | 登录模块 |
| `module:student` | 学生管理模块 |
| `module:teacher` | 教师管理模块 |
| `module:class` | 班级管理模块 |
| `module:course` | 课程管理模块 |
| `module:score` | 成绩管理模块 |
| `module:attendance` | 考勤管理模块 |

---

### 5. Issue 内容模板

```markdown
# 缺陷描述

## 基本信息

| 项目 | 内容 |
|------|------|
| 测试用例 | TC-{ID} |
| 发现时间 | {date} |
| 执行批次 | {seq} |
| 严重程度 | P0/P1/P2 |
| 所属模块 | {module} |

## 缺陷描述

{详细描述缺陷现象}

## 复现步骤

1. {步骤1}
2. {步骤2}
3. {步骤3}

## 预期结果

{预期应该是什么}

## 实际结果

{实际发生了什么}

## 证据

- 截图: [截图文件名]
- 日志: [日志文件名]
- 执行报告: [报告链接]

## 建议

{修复建议（可选）}
```

---

### 6. 双向关联

在测试报告中添加关联 Issue：

```markdown
## 关联缺陷

| 项目 | 内容 |
|------|------|
| GitHub Issue | #{issue-id} |
| Issue 创建时间 | {datetime} |
```

---

## 示例

### TC-LOGIN-002 失败 Issue

```bash
gh issue create \
  --title "[TEST-FAIL] TC-LOGIN-002 - 登录失败未显示错误提示" \
  --body "## 基本信息
| 项目 | 内容 |
|------|------|
| 测试用例 | TC-LOGIN-002 |
| 发现时间 | 2026-05-27 |
| 严重程度 | P0 |
| 所属模块 | login |

## 缺陷描述
用户名或密码错误登录时，系统未显示错误提示信息。

## 复现步骤
1. 打开登录页面
2. 输入用户名 'wronguser'
3. 输入密码 'wrongpass'
4. 点击登录按钮

## 预期结果
显示明确的错误提示信息（如'用户名或密码错误'）

## 实际结果
无错误提示显示，用户无法了解登录失败原因。

## 建议
添加错误提示组件，在登录失败时显示错误信息。" \
  --label "bug,P0,module:login,test-failure"
```

---

*流程版本: v1.0*
*创建日期: 2026-05-27*