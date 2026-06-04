CREATE VIEW czwcd AS
-- 产值完成单
SELECT
    m.bill_name AS "标题",
    fo.ocode AS "组织",
    u_yf AS "月份",
    pt.bill_name AS "工程项目",
    u_kdjh AS "产值完成(万元)",
    u_glsl AS "管理数量",
    u_zysjsl AS "作业人员实际进场数量"
FROM
    p_form0000700259_m m
    LEFT JOIN fg_orglist fo ON m.phid_org = fo.phid
    LEFT JOIN project_table pt ON pt.phid = m.phid_pc;