SELECT
  cwzz.dqname AS 所属大区,
  cwzz.oname as 所属分公司,
  zjxmsl.项目类型,
  NVL(zjxmsl.zjxmsl, 0) AS 在建项目数量,
  NVL(bnjhysxm.jhyssl, 0) AS 本年计划验收项目数量,
  NVL(bjsjysxmsl.bjsjysxmsl, 0) AS 本年实际验收项目数量,
  NVL(fx.xmsl, 0) AS 风险预警项目数,
  NVL(zjxmhthk.htzje, 0) AS 在建项目合同总金额,
  NVL(hk.hkje, 0) AS 回款金额,
  NVL(syhk.syhkje, 0) AS 剩余回款,
  NVL(mb.xmje, 0) AS 目标产值,
  NVL(cz.yqrcz, 0) AS 已确认产值,
  NVL(wwc.wqrcz, 0) AS 未完成产值,
  ROUND(cz.yqrcz / NULLIF(mb.xmje, 0), 4) AS 产值完成率,
  NVL(cbjd.xmsl,0) as 延期项目数量,
  NVL(cbjd1.xmsl,0) as 超预算项目数量
FROM
  (SELECT
  m.PARENT_ORGID,
  m.relatid,
  m.org_id AS phid,
  m.ocode AS ocode,
  dq.oname as dqname,
  d.oname AS oname,
  to_number (m.relid) AS relid
FROM
  fg_orgrelatitem m
  LEFT JOIN fg_orglist d ON m.org_id = d.phid
  left join fg_orglist dq on dq.phid = m.PARENT_ORGID
WHERE
  m.relatid = '13') cwzz
  LEFT JOIN (
    SELECT
      所属分公司,
      SUM(CASE WHEN 项目状态 IN ('在施', '验收中', '暂停', '待施') THEN 1 ELSE 0 END) zjxmsl,
      项目类型
    FROM
      xmglb
      where 项目类型 = '智能建造-软件'
    GROUP BY
      所属分公司,
      项目类型
  ) zjxmsl ON zjxmsl.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      所属分公司,
      SUM(
        CASE
          WHEN 计划验收日期 IS NOT NULL
            AND 计划验收日期 >= TRUNC (SYSDATE, 'YYYY')
            AND 计划验收日期 < ADD_MONTHS (TRUNC (SYSDATE, 'YYYY'), 12) THEN
            1
          ELSE
            0
        END
      ) jhyssl,
      项目类型
    FROM
      xmglb
      where 项目类型 = '智能建造-软件'
    GROUP BY
      所属分公司,
      项目类型
  ) bnjhysxm ON bnjhysxm.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      fo.oname AS 所属分公司,
      COUNT(pfam.phid) AS bjsjysxmsl,
      xpb.type_name as 项目类型
    FROM
      p_form_project_accept_m pfam
      LEFT JOIN XM_PMS_base xpb ON xpb.xm_phid = pfam.u_phid_xm
      LEFT JOIN fg_orglist dqfo ON dqfo.phid = xpb.dq_phid
      LEFT JOIN fg_orglist fo ON fo.phid = xpb.phid_org
    WHERE
      u_checkdate >= TRUNC (SYSDATE, 'YYYY')
      AND u_checkdate < ADD_MONTHS (TRUNC (SYSDATE, 'YYYY'), 12)
      and xpb.type_name = '智能建造-软件'
    GROUP BY
      fo.oname,
      xpb.type_name
  ) bjsjysxmsl ON bjsjysxmsl.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 
  fxyj.分公司, 
  xpb.type_name AS 项目类型,
  COUNT(DISTINCT fxyj.项目编码) AS xmsl 
FROM fxyj 
LEFT JOIN XM_PMS_base xpb ON xpb.xm_bill_no = fxyj.项目编码  
where xpb.type_name = '智能建造-软件'
GROUP BY 
  fxyj.分公司, 
  xpb.type_name) fx ON fx.分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      所属分公司,
      NVL (SUM(回款金额), 0) + NVL (SUM(剩余回款金额), 0) htzje,
      项目类型
    FROM
      jshkb
      WHERE 项目类型 = '智能建造-软件'
    GROUP BY
      所属分公司,
      项目类型
  ) zjxmhthk ON zjxmhthk.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, NVL (SUM(回款金额), 0) hkje,项目类型 FROM jshkb WHERE 项目类型 = '智能建造-软件' GROUP BY 所属分公司,项目类型) hk ON hk.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, NVL (SUM(剩余回款金额), 0) syhkje,项目类型 FROM jshkb WHERE 项目类型 = '智能建造-软件' GROUP BY 所属分公司,项目类型) syhk ON syhk.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      fo.oname AS 所属分公司,
      xpb.type_name AS 项目类型,
      NVL (SUM(pfm.u_xmje), 0) AS xmje
    FROM
      p_form_xszssjdd_m pfm
      LEFT JOIN XM_PMS_base xpb ON xpb.xm_phid = pfm.u_phid_xm
      LEFT JOIN fg_orglist dqfo ON dqfo.phid = xpb.dq_phid
      LEFT JOIN fg_orglist fo ON fo.phid = xpb.phid_org
      WHERE xpb.type_name = '智能建造-软件'
    GROUP BY
      fo.oname,
      xpb.type_name
  ) mb ON mb.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, NVL (SUM(已确认产值), 0) yqrcz,项目类型 FROM xmglb  WHERE 项目类型 = '智能建造-软件' GROUP BY 所属分公司,项目类型) cz ON cz.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      所属分公司,
      项目类型,
      (SELECT NVL (SUM(u_xmje), 0) FROM p_form_xszssjdd_m WHERE 项目类型 = '智能建造-软件') - NVL (SUM(已确认产值), 0) AS wqrcz
    FROM
      xmglb
      WHERE 项目类型 = '智能建造-软件'
    GROUP BY
      所属分公司,
      项目类型
  ) wwc ON wwc.所属分公司 = cwzz.oname
  left join (SELECT 所属分公司,COUNT(所属分公司) as xmsl,项目类型 FROM cbjdb WHERE 进度系数 > 1 and 项目类型 = '智能建造-软件' group by 所属分公司,项目类型) cbjd ON cbjd.所属分公司 = cwzz.oname
  left join  (SELECT 所属分公司,COUNT(所属分公司) as xmsl,项目类型 FROM cbjdb WHERE 成本系数 > 1 and 项目类型 = '智能建造-软件' group by 所属分公司,项目类型) cbjd1 ON cbjd1.所属分公司 = cwzz.oname
where zjxmsl.项目类型 = '智能建造-软件'
