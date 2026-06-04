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
-- 2. 项目管理表明细汇总 (按分公司+原始项目类型)
xmglb_raw AS (
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
-- 3. 结算回款表明细汇总
jshkb_raw AS (
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
-- 4. 目标产值明细汇总
mb_raw AS (
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
-- 5. 实际验收明细汇总
accept_raw AS (
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
-- 6. 风险预警明细汇总
fx_raw AS (
  SELECT
    fxyj.分公司 AS 所属分公司,
    xpb.type_name AS 项目类型,
    COUNT(DISTINCT fxyj.项目编码) AS xmsl
  FROM
    fxyj
    LEFT JOIN XM_PMS_base xpb ON xpb.xm_bill_no = fxyj.项目编码
  GROUP BY
    fxyj.分公司, xpb.type_name
),
-- 7. 进度/成本系数明细汇总
cb_raw AS (
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
-- 8. 统一明细池 (包含所有分公司和所有项目类型的数据)
all_metrics AS (
  SELECT 
    o.dqname,
    o.oname,
    COALESCE(x.项目类型, j.项目类型, m.项目类型, a.项目类型, f.项目类型, c.项目类型) as 原始类型,
    NVL(x.zjxmsl, 0) as zjxmsl,
    NVL(x.jhyssl, 0) as jhyssl,
    NVL(x.yqrcz, 0) as yqrcz,
    NVL(j.htzje, 0) as htzje,
    NVL(j.hkje, 0) as hkje,
    NVL(j.syhkje, 0) as syhkje,
    NVL(m.xmje, 0) as xmje,
    NVL(a.bjsjysxmsl, 0) as bjsjysxmsl,
    NVL(f.xmsl, 0) as fxyjsl,
    NVL(c.yqsl, 0) as yqsl,
    NVL(c.czsl, 0) as czsl
  FROM base_org o
  FULL JOIN xmglb_raw x ON x.所属分公司 = o.oname
  FULL JOIN jshkb_raw j ON j.所属分公司 = o.oname AND j.项目类型 = x.项目类型
  FULL JOIN mb_raw m ON m.所属分公司 = o.oname AND m.项目类型 = COALESCE(x.项目类型, j.项目类型)
  FULL JOIN accept_raw a ON a.所属分公司 = o.oname AND a.项目类型 = COALESCE(x.项目类型, j.项目类型, m.项目类型)
  FULL JOIN fx_raw f ON f.所属分公司 = o.oname AND f.项目类型 = COALESCE(x.项目类型, j.项目类型, m.项目类型, a.项目类型)
  FULL JOIN cb_raw c ON c.所属分公司 = o.oname AND c.项目类型 = COALESCE(x.项目类型, j.项目类型, m.项目类型, a.项目类型, f.项目类型)
  WHERE o.oname IS NOT NULL
),
-- 9. 汇总计算逻辑 (分类计算)
summarized_data AS (
  -- A. 整体部分 (汇总所有类型)
  SELECT 
    dqname, oname, '整体' as 项目类型,
    SUM(zjxmsl) as zjxmsl, SUM(jhyssl) as jhyssl, SUM(yqrcz) as yqrcz,
    SUM(htzje) as htzje, SUM(hkje) as hkje, SUM(syhkje) as syhkje,
    SUM(xmje) as xmje, SUM(bjsjysxmsl) as bjsjysxmsl, SUM(fxyjsl) as fxyjsl,
    SUM(yqsl) as yqsl, SUM(czsl) as czsl, 1 as sort_idx
  FROM all_metrics GROUP BY dqname, oname
  UNION ALL
  -- B. 智能建造部分 (汇总 硬件+软件)
  SELECT 
    dqname, oname, '智能建造' as 项目类型,
    SUM(zjxmsl) as zjxmsl, SUM(jhyssl) as jhyssl, SUM(yqrcz) as yqrcz,
    SUM(htzje) as htzje, SUM(hkje) as hkje, SUM(syhkje) as syhkje,
    SUM(xmje) as xmje, SUM(bjsjysxmsl) as bjsjysxmsl, SUM(fxyjsl) as fxyjsl,
    SUM(yqsl) as yqsl, SUM(czsl) as czsl, 2 as sort_idx
  FROM all_metrics WHERE 原始类型 IN ('智能建造-硬件', '智能建造-软件') GROUP BY dqname, oname
  UNION ALL
  -- C. 信息化部分 (汇总 其余所有)
  SELECT 
    dqname, oname, '信息化' as 项目类型,
    SUM(zjxmsl) as zjxmsl, SUM(jhyssl) as jhyssl, SUM(yqrcz) as yqrcz,
    SUM(htzje) as htzje, SUM(hkje) as hkje, SUM(syhkje) as syhkje,
    SUM(xmje) as xmje, SUM(bjsjysxmsl) as bjsjysxmsl, SUM(fxyjsl) as fxyjsl,
    SUM(yqsl) as yqsl, SUM(czsl) as czsl, 3 as sort_idx
  FROM all_metrics WHERE 原始类型 NOT IN ('智能建造-硬件', '智能建造-软件') OR 原始类型 IS NULL GROUP BY dqname, oname
)
-- 10. 最终输出格式化
SELECT 
  dqname AS 所属大区,
  oname AS 所属分公司,
  项目类型,
  zjxmsl AS 在建项目数量,
  jhyssl AS 本年计划验收项目数量,
  bjsjysxmsl AS 本年实际验收项目数量,
  fxyjsl AS 风险预警项目数,
  htzje AS 在建项目合同总金额,
  hkje AS 回款金额,
  syhkje AS 剩余回款,
  xmje AS 目标产值,
  yqrcz AS 已确认产值,
  (xmje - yqrcz) AS 未完成产值,
  ROUND(yqrcz / NULLIF(xmje, 0), 4) AS 产值完成率,
  yqsl AS 延期项目数量,
  czsl AS 超预算项目数量
FROM summarized_data
ORDER BY dqname, oname, sort_idx
