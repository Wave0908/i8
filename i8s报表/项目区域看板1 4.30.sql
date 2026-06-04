SELECT 
  -- 1. 统计在建项目数量
  (SELECT SUM(CASE WHEN 项目状态 IN ('在施', '验收中', '暂停', '待施') THEN 1 ELSE 0 END) FROM xmglb) AS 在建项目数量,
  
  -- 2. 统计本年计划验收项目数量
  (SELECT SUM(
    CASE 
      WHEN 计划验收日期 IS NOT NULL 
       AND 计划验收日期 >= TRUNC(SYSDATE, 'YYYY') 
       AND 计划验收日期 < ADD_MONTHS(TRUNC(SYSDATE, 'YYYY'), 12) THEN 1 
      ELSE 0 
    END
  ) FROM xmglb) AS 本年计划验收项目数量,
  
  -- 3. 本年实际验收项目数量 (u_checkdate 在本年)
  (SELECT COUNT(*) FROM p_form_project_accept_m 
   WHERE u_checkdate >= TRUNC(SYSDATE, 'YYYY') 
     AND u_checkdate < ADD_MONTHS(TRUNC(SYSDATE, 'YYYY'), 12)) AS 本年实际验收项目数量,
  
  -- 4. 统计风险预警项目数
  (SELECT COUNT(DISTINCT 项目编码) FROM fxyj) AS 风险预警项目数,
  
  
  -- 5. 在建项目合同总金额 (回款金额 + 剩余回款金额)
  (SELECT NVL(SUM(回款金额), 0) + NVL(SUM(剩余回款金额), 0) FROM jshkb) AS 在建项目合同总金额,

  -- 6. 统计回款金额
  (SELECT NVL(SUM(回款金额), 0) FROM jshkb) AS 回款金额,

 -- 7. 统计剩余回款
 (SELECT NVL(SUM(剩余回款金额), 0) FROM jshkb) AS 剩余回款,

  -- 8. 目标产值 (项目金额汇总)
  (SELECT NVL(SUM(u_xmje), 0) FROM p_form_xszssjdd_m) AS 目标产值,

  -- 9. 已确认产值
  (SELECT NVL(SUM(已确认产值), 0) FROM xmglb) AS 已确认产值,

  -- 10. 未完成产值 (目标产值 - 已确认产值)
  (SELECT NVL(SUM(u_xmje), 0) FROM p_form_xszssjdd_m) - (SELECT NVL(SUM(已确认产值), 0) FROM xmglb) AS 未完成产值,

  -- 11. 产值完成率 (已确认产值 / 目标产值)
  ROUND(
    (SELECT NVL(SUM(已确认产值), 0) FROM xmglb) / 
    NULLIF((SELECT SUM(u_xmje) FROM p_form_xszssjdd_m), 0), 
    4
  ) AS 产值完成率,

    -- 12. 延期项目数量 (进度系数 > 1)
  (SELECT COUNT(*) FROM cbjdb WHERE 进度系数 > 1) AS 延期项目数量,
  
  -- 13. 超预算项目数量 (成本系数 > 1)
  (SELECT COUNT(*) FROM cbjdb WHERE 成本系数 > 1) AS 超预算项目数量
 
 FROM DUAL