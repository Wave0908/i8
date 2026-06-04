SELECT 
  T1.在建项目数量,
  T1.本年计划验收项目数量,
  T1.本年实际验收项目数量,
  T2.风险预警项目数,
  T3.回款金额总额
FROM (
  -- 第一部分：统计主表 xmglb
  SELECT 
    SUM(CASE WHEN 项目状态 IN ('在施', '验收中', '暂停', '待施') THEN 1 ELSE 0 END) AS 在建项目数量, 
    SUM( 
      CASE 
        WHEN 计划验收日期 IS NOT NULL 
         AND 计划验收日期 >= TRUNC(SYSDATE, 'YYYY') 
         AND 计划验收日期 < ADD_MONTHS(TRUNC(SYSDATE, 'YYYY'), 12) THEN 1 
        ELSE 0 
      END 
    ) AS 本年计划验收项目数量, 
    0 AS 本年实际验收项目数量 
  FROM xmglb
) T1
CROSS JOIN (
  -- 第二部分：统计风险预警表
  SELECT COUNT(DISTINCT 项目编码) AS 风险预警项目数 FROM fxyj
) T2
CROSS JOIN (
  -- 第三部分：统计回款表
  SELECT NVL(SUM(回款金额), 0) AS 回款金额总额 FROM jshkb
) T3;