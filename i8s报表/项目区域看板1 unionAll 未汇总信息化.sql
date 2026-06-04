WITH 
-- 1. 基础组织架构
base_org AS (
  SELECT
    m.PARENT_ORGID,
    dq.oname AS dqname,
    d.oname AS oname
  FROM
    fg_orgrelatitem m
    LEFT JOIN fg_orglist d ON m.org_id = d.phid
    LEFT JOIN fg_orglist dq ON dq.phid = m.PARENT_ORGID
  WHERE
    m.relatid = '13'
),
-- 2. 项目管理表汇总
xmglb_agg AS (
  SELECT
    所属分公司,
    项目类型,
    SUM(CASE WHEN 项目状态 IN ('在施', '验收中', '暂停', '待施') THEN 1 ELSE 0 END) AS zjxmsl,
    SUM(CASE WHEN 计划验收日期 >= TRUNC(SYSDATE, 'YYYY') AND 计划验收日期 < ADD_MONTHS(TRUNC(SYSDATE, 'YYYY'), 12) THEN 1 ELSE 0 END) AS jhyssl,
    SUM(NVL(已确认产值, 0)) AS yqrcz
  FROM
    xmglb
  GROUP BY
    所属分公司, 项目类型
),
-- 3. 结算回款表汇总
jshkb_agg AS (
  SELECT
    所属分公司,
    项目类型,
    SUM(NVL(回款金额, 0) + NVL(剩余回款金额, 0)) AS htzje,
    SUM(NVL(回款金额, 0)) AS hkje,
    SUM(NVL(剩余回款金额, 0)) AS syhkje
  FROM
    jshkb
  GROUP BY
    所属分公司, 项目类型
),
-- 4. 目标产值汇总
mb_agg AS (
  SELECT
    fo.oname AS 所属分公司,
    xpb.type_name AS 项目类型,
    SUM(NVL(pfm.u_xmje, 0)) AS xmje
  FROM
    p_form_xszssjdd_m pfm
    LEFT JOIN XM_PMS_base xpb ON xpb.xm_phid = pfm.u_phid_xm
    LEFT JOIN fg_orglist fo ON fo.phid = xpb.phid_org
  GROUP BY
    fo.oname, xpb.type_name
),
-- 5. 实际验收汇总
accept_agg AS (
  SELECT
    fo.oname AS 所属分公司,
    xpb.type_name AS 项目类型,
    COUNT(pfam.phid) AS bjsjysxmsl
  FROM
    p_form_project_accept_m pfam
    LEFT JOIN XM_PMS_base xpb ON xpb.xm_phid = pfam.u_phid_xm
    LEFT JOIN fg_orglist fo ON fo.phid = xpb.phid_org
  WHERE
    pfam.u_checkdate >= TRUNC(SYSDATE, 'YYYY')
    AND pfam.u_checkdate < ADD_MONTHS(TRUNC(SYSDATE, 'YYYY'), 12)
  GROUP BY
    fo.oname, xpb.type_name
),
-- 6. 风险预警汇总
fx_agg AS (
  SELECT
    fxyj.分公司,
    xpb.type_name AS 项目类型,
    COUNT(DISTINCT fxyj.项目编码) AS xmsl
  FROM
    fxyj
    LEFT JOIN XM_PMS_base xpb ON xpb.xm_bill_no = fxyj.项目编码
  GROUP BY
    fxyj.分公司, xpb.type_name
),
-- 7. 进度/成本系数汇总
cb_agg AS (
  SELECT
    所属分公司,
    项目类型,
    SUM(CASE WHEN 进度系数 > 1 THEN 1 ELSE 0 END) AS yqsl,
    SUM(CASE WHEN 成本系数 > 1 THEN 1 ELSE 0 END) AS czsl
  FROM
    cbjdb
  GROUP BY
    所属分公司, 项目类型
),
-- 8. 核心指标合并
final_combined AS (
  SELECT
    o.dqname AS 所属大区,
    o.oname AS 所属分公司,
    x.项目类型,
    NVL(x.zjxmsl, 0) AS 在建项目数量,
    NVL(x.jhyssl, 0) AS 本年计划验收项目数量,
    NVL(a.bjsjysxmsl, 0) AS 本年实际验收项目数量,
    NVL(f.xmsl, 0) AS 风险预警项目数,
    NVL(j.htzje, 0) AS 在建项目合同总金额,
    NVL(j.hkje, 0) AS 回款金额,
    NVL(j.syhkje, 0) AS 剩余回款,
    NVL(m.xmje, 0) AS 目标产值,
    NVL(x.yqrcz, 0) AS 已确认产值,
    NVL(m.xmje, 0) - NVL(x.yqrcz, 0) AS 未完成产值,
    ROUND(NVL(x.yqrcz, 0) / NULLIF(m.xmje, 0), 4) AS 产值完成率,
    NVL(c.yqsl, 0) AS 延期项目数量,
    NVL(c.czsl, 0) AS 超预算项目数量
  FROM
    base_org o
    INNER JOIN xmglb_agg x ON x.所属分公司 = o.oname
    LEFT JOIN jshkb_agg j ON j.所属分公司 = o.oname AND j.项目类型 = x.项目类型
    LEFT JOIN mb_agg m ON m.所属分公司 = o.oname AND m.项目类型 = x.项目类型
    LEFT JOIN accept_agg a ON a.所属分公司 = o.oname AND a.项目类型 = x.项目类型
    LEFT JOIN fx_agg f ON f.分公司 = o.oname AND f.项目类型 = x.项目类型
    LEFT JOIN cb_agg c ON c.所属分公司 = o.oname AND c.项目类型 = x.项目类型
)
-- 9. 最终输出
SELECT
  所属大区,
  所属分公司,
  项目类型,
  在建项目数量,
  本年计划验收项目数量,
  本年实际验收项目数量,
  风险预警项目数,
  在建项目合同总金额,
  回款金额,
  剩余回款,
  目标产值,
  已确认产值,
  未完成产值,
  产值完成率,
  延期项目数量,
  超预算项目数量
FROM (
  SELECT
    所属大区, 所属分公司, 项目类型, 在建项目数量, 本年计划验收项目数量, 本年实际验收项目数量,
    风险预警项目数, 在建项目合同总金额, 回款金额, 剩余回款, 目标产值, 已确认产值,
    未完成产值, 产值完成率, 延期项目数量, 超预算项目数量
  FROM final_combined WHERE 项目类型 NOT IN ('智能建造-硬件', '智能建造-软件')
  UNION ALL
  SELECT
    所属大区, 所属分公司, 项目类型, 在建项目数量, 本年计划验收项目数量, 本年实际验收项目数量,
    风险预警项目数, 在建项目合同总金额, 回款金额, 剩余回款, 目标产值, 已确认产值,
    未完成产值, 产值完成率, 延期项目数量, 超预算项目数量
  FROM final_combined WHERE 项目类型 = '智能建造-软件'
  UNION ALL
  SELECT
    所属大区, 所属分公司, 项目类型, 在建项目数量, 本年计划验收项目数量, 本年实际验收项目数量,
    风险预警项目数, 在建项目合同总金额, 回款金额, 剩余回款, 目标产值, 已确认产值,
    未完成产值, 产值完成率, 延期项目数量, 超预算项目数量
  FROM final_combined WHERE 项目类型 = '智能建造-硬件'
) t
ORDER BY t.所属大区, t.所属分公司, t.项目类型