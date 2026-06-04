SELECT
  cwzz.dqname AS 所属大区,
  cwzz.oname AS 所属分公司,
  NVL (zjxmsl.zjxmsl, 0) AS 在建项目数量,
  NVL (fx.xmsl, 0) AS 风险预警项目数,
  NVL (cbjd.xmsl, 0) AS 延期项目数量,
  NVL(ROUND( NULLIF(cbjd.xmsl, 0) / NULLIF(zjxmsl.zjxmsl, 0), 4), 0) as 延期率,
  NVL (cbjd1.xmsl, 0) AS 超支项目数量,
  NVL(ROUND(NULLIF(cbjd1.xmsl, 0) / NULLIF(zjxmsl.zjxmsl, 0), 4), 0) as 超支率,
  0  总客户数,
  0  活跃客户数 
FROM
  (
    SELECT
      m.PARENT_ORGID,
      m.relatid,
      m.org_id AS phid,
      m.ocode AS ocode,
      dq.oname AS dqname,
      d.oname AS oname,
      to_number(m.relid) AS relid
    FROM
      fg_orgrelatitem m
      LEFT JOIN fg_orglist d ON m.org_id = d.phid
      LEFT JOIN fg_orglist dq ON dq.phid = m.PARENT_ORGID
    WHERE
      m.relatid = '13'
  ) cwzz
  LEFT JOIN (
    SELECT
      所属分公司,
      SUM(CASE WHEN 项目状态 IN ('在施', '验收中', '暂停', '待施') THEN 1 ELSE 0 END) zjxmsl
    FROM
      xmglb
    GROUP BY
      所属分公司
  ) zjxmsl ON zjxmsl.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 分公司, COUNT(DISTINCT 项目编码) xmsl FROM fxyj GROUP BY 分公司) fx ON fx.分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, COUNT(所属分公司) AS xmsl FROM cbjdb WHERE 进度系数 > 1 GROUP BY 所属分公司) cbjd ON cbjd.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, COUNT(所属分公司) AS xmsl FROM cbjdb WHERE 成本系数 > 1 GROUP BY 所属分公司) cbjd1 ON cbjd1.所属分公司 = cwzz.oname