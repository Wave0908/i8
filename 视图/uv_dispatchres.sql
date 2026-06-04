CREATE VIEW uv_dispatchres (
    res_code, res_name, res_type, ocode, empstatus
) AS
-- 第一部分：从工具表获取资源
SELECT
    toolno AS res_code,
    tlname AS res_name,
    3 AS res_type,  -- 资源类型：工具(3)
    CAST(ocode AS text) AS ocode,
    '' AS empstatus  -- 工具无员工状态
FROM tool

UNION  -- 合并三部分结果（去重）

-- 第二部分：从设备表获取资源
SELECT
    deviceno AS res_code,
    devname AS res_name,
    2 AS res_type,  -- 资源类型：设备(2)
    CAST(ocode AS text) AS ocode,
    '' AS empstatus  -- 设备无员工状态
FROM device

UNION  -- 合并结果（去重）

-- 第三部分：从员工表获取资源
SELECT
    empno AS res_code,
    lastname AS res_name,
    1 AS res_type,  -- 资源类型：员工(1)
    CAST(ocode AS text) AS ocode,
    empstatus  -- 员工状态
FROM employee;