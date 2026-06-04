# 新中大 (NewGrand) 二开脚本及 SQL 汇总

本仓库汇总了新中大 i8 系列（主要针对 6.0 系列）的二次开发脚本与数据库 SQL 脚本。内容涵盖了从前端 UI 交互（Ext JS & React）到后端业务逻辑（SQL & Python）的完整实现方案。

## 目录结构说明

### 1. 前端脚本 (JavaScript)

*   **[6系系统翻新](file:///Users/w1ts/TangShan/js/脚本代码/6系系统翻新)**: 基于 React 框架实现的 6.0 系列标准模块翻新脚本。主要涉及合同、付款、结算等核心业务流程的交互逻辑优化。
*   **[6系react自定义](file:///Users/w1ts/TangShan/js/脚本代码/6系react自定义)**: 采用 React 技术栈开发的自定义业务单据脚本，如“两金填报”、“年度培训计划调整”等，代表了当前主流的二开模式。
*   **[6系ext自定义](file:///Users/w1ts/TangShan/js/脚本代码/6系ext自定义)**: 传统的 Ext JS 二开脚本，涵盖了大量的历史自定义功能和特定的 UI 插件实现。
*   **[大商务](file:///Users/w1ts/TangShan/js/脚本代码/大商务)**: 专注于商务管控、成本控制、合约规划等深度业务逻辑的脚本集合，包含复杂的成本测算与数据联动逻辑。
*   **[多方协同mc](file:///Users/w1ts/TangShan/js/脚本代码/多方协同mc)**: 移动端 (App) 与 PC 端协同办公脚本，如“动火令”、“浇筑令”等现场作业流程。

### 2. 数据库脚本 (SQL)

*   **[6系SQL翻新](file:///Users/w1ts/TangShan/js/脚本代码/6系SQL翻新)**: 基于 PostgreSQL (GaussDB) 的数据库逻辑修复、数据校对及业务逻辑更新脚本。
*   **[视图](file:///Users/w1ts/TangShan/js/脚本代码/视图)**: 定义了用于报表统计、接口对接及前端展示的各种数据库视图 (Views)。
*   **[注入](file:///Users/w1ts/TangShan/js/脚本代码/注入)**: 用于初始化数据、批量导入或数据迁移的注入脚本。
*   **[功能扩展](file:///Users/w1ts/TangShan/js/脚本代码/功能扩展)**: 存储过程、触发器等高级数据库功能扩展实现。

## 技术栈与规范

*   **前端框架**: 
    *   **React JS (推荐)**: 适用于 6.0 及以上版本的现代开发模式。参考实例：[6.0脚本常见场景功能实现示例.js](file:///Users/w1ts/TangShan/js/6.0脚本常见场景功能实现示例.js)。
    *   **Ext JS**: 适用于传统页面的维护与开发。
*   **数据库**: 基于 PostgreSQL 的 **GaussDB**。
*   **脚本存放**:
    *   JS 脚本：`/Users/w1ts/TangShan/js/脚本代码/`
    *   Python 脚本：`/Users/w1ts/TangShan/py脚本/` (若有生成)

## 核心参考资料

*   **React 开发参考**: [6.0脚本常见场景功能实现示例.js](file:///Users/w1ts/TangShan/js/6.0脚本常见场景功能实现示例.js)
*   **Ext JS 字典**: [I8JS脚本编写字典V1.3(1).xlsx](file:///Users/w1ts/TangShan/js/I8JS脚本编写字典V1.3(1).xlsx)

---
*注：本项目代码仅供内部开发参考，修改前请务必在测试环境验证。*
