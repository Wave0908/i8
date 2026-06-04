CREATE VIEW cbjdb AS
-- 项目看板-成本进度表
WITH stage_data AS (
    SELECT 
        cbysm.u_phid_xm AS xm_phid,
        wbs_help.wbs_name AS u_wbs,
        cbysd3.u_user_startdt,
        cbysd3.u_user_enddt,
        cbysd3.u_jdyscb,
        ROW_NUMBER() OVER (PARTITION BY cbysm.u_phid_xm ORDER BY cbysd3.u_user_enddt) AS rn_asc,
        ROW_NUMBER() OVER (PARTITION BY cbysm.u_phid_xm ORDER BY cbysd3.u_user_enddt DESC) AS rn_desc,
        SUM(cbysd3.u_jdyscb) OVER (PARTITION BY cbysm.u_phid_xm ORDER BY cbysd3.u_user_enddt) AS cum_jdyscb
    FROM p_form_xmsscbys_m cbysm
    LEFT JOIN p_form_xmsscbys_d3 cbysd3 ON cbysm.phid = cbysd3.pphid
    LEFT JOIN wbs_help ON wbs_help.phid = cbysd3.u_wbs
    LEFT JOIN wbs_type ON (wbs_help.phid_wbs_type = wbs_type.phid)
),
qualified_stage AS (
    SELECT xm_phid, u_user_startdt, u_user_enddt, u_wbs, cum_jdyscb
    FROM (
        SELECT s.*,
               CASE WHEN TRUNC(u_user_enddt) >= TRUNC(SYSDATE) THEN 1 ELSE 0 END AS is_meet,
               ROW_NUMBER() OVER (PARTITION BY xm_phid 
                                  ORDER BY CASE WHEN TRUNC(u_user_enddt) >= TRUNC(SYSDATE) THEN 1 ELSE 0 END DESC,
                                           u_user_enddt DESC) AS rn
        FROM stage_data s
    ) WHERE rn = 1
),
actual_stage_data AS (
    SELECT 
        sjddm.u_phid_xm AS xm_phid,
        sjddd2.phid,
        wbs_help.wbs_name AS u_wbs,
        sjddd2.u_jd,
        sjddd2.u_czbl,
        p_form_xmsscbys_m.u_yscb,
        SUM(sjddd2.u_czbl) OVER (PARTITION BY sjddm.u_phid_xm ORDER BY sjddd2.phid 
                                 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_czbl
    FROM p_form_xszssjdd_m sjddm
    LEFT JOIN p_form_xmsscbys_m ON sjddm.u_phid_xm = p_form_xmsscbys_m.u_phid_xm
    LEFT JOIN p_form_xszssjdd_d2 sjddd2 ON sjddm.phid = sjddd2.pphid
    LEFT JOIN wbs_help ON wbs_help.phid = sjddd2.u_wbs
    LEFT JOIN wbs_type ON (wbs_help.phid_wbs_type = wbs_type.phid)
),
qualified_actual AS (
    SELECT xm_phid, u_wbs, cum_czbl, u_yscb
    FROM (
        SELECT xm_phid, u_wbs, cum_czbl, u_yscb,
               ROW_NUMBER() OVER (PARTITION BY xm_phid ORDER BY phid DESC) AS rn
        FROM actual_stage_data
        WHERE u_jd IN ('是', '进行中')
    ) WHERE rn = 1
)
SELECT
    xp.xm_phid AS 项目ID,
    xp.xm_bill_no AS 项目编号,
    xp.xm_bill_name AS 项目名称,
    dqfo.oname AS 所属大区,
    fo.oname AS 所属分公司,
    xp.compname AS 客户名称,
    '' AS 合同金额,
    '' AS 项目金额,
    wt.type_name AS 项目类型,
    xp.descript AS 项目状态,
    xp.cp_name AS 产品类型,
    xp.hr_bill_name AS 项目经理,
    '' AS 业务归属,
    qs.u_wbs AS 当前计划阶段,
    qa.u_wbs AS 当前实际阶段,
    qs.u_user_startdt AS 计划完成日期,
    qs.u_user_enddt AS 合同约定日期,
    qs.cum_jdyscb AS 阶段目标成本,
    qa.cum_czbl * qa.u_yscb AS 赢得值,   -- 赢得值 = 累计完成量 × 预算单价
    '' AS 阶段实际成本,
    '' AS 进度系数,
    '' AS 成本系数,
    ROUND(CASE 
        WHEN qs.cum_jdyscb IS NULL OR qs.cum_jdyscb = 0 THEN NULL 
        ELSE (qa.cum_czbl * qa.u_yscb) / qs.cum_jdyscb 
    END, 2) AS 进度绩效指数,   -- 赢得值 / 阶段目标成本
    '' AS 成本绩效指数,
    '' AS 进度预警分析,
    '' AS 成本预警分析,
    '' AS 项目综合预警
FROM
    xm_pms xp
    LEFT JOIN fg_orglist dqfo ON dqfo.phid = xp.dq_phid
    LEFT JOIN fg_orglist fo ON fo.phid = xp.phid_org
    LEFT JOIN wbs_type wt ON wt.phid = xp.phid_type
    LEFT JOIN qualified_stage qs ON qs.xm_phid = xp.xm_phid
    LEFT JOIN qualified_actual qa ON qa.xm_phid = xp.xm_phid
ORDER BY
    xp.xm_phid, dqfo.ocode ASC, fo.ocode