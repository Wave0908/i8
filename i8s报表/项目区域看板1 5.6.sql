SELECT
  cwzz.dqname AS 所属大区,
  cwzz.oname 所属分公司,
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
  cwzz
  LEFT JOIN (
    SELECT
      所属分公司,
      SUM(CASE WHEN 项目状态 IN ('在施', '验收中', '暂停', '待施') THEN 1 ELSE 0 END) zjxmsl
    FROM
      xmglb
    GROUP BY
      所属分公司
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
      ) jhyssl
    FROM
      xmglb
    GROUP BY
      所属分公司
  ) bnjhysxm ON bnjhysxm.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      fo.oname AS 所属分公司,
      COUNT(pfam.phid) AS bjsjysxmsl
    FROM
      p_form_project_accept_m pfam
      LEFT JOIN XM_PMS_base xpb ON xpb.xm_phid = pfam.u_phid_xm
      LEFT JOIN fg_orglist dqfo ON dqfo.phid = xpb.dq_phid
      LEFT JOIN fg_orglist fo ON fo.phid = xpb.phid_org
    WHERE
      u_checkdate >= TRUNC (SYSDATE, 'YYYY')
      AND u_checkdate < ADD_MONTHS (TRUNC (SYSDATE, 'YYYY'), 12)
    GROUP BY
      fo.oname
  ) bjsjysxmsl ON bjsjysxmsl.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 分公司, COUNT(DISTINCT 项目编码) xmsl FROM fxyj GROUP BY 分公司) fx ON fx.分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      所属分公司,
      NVL (SUM(回款金额), 0) + NVL (SUM(剩余回款金额), 0) htzje
    FROM
      jshkb
    GROUP BY
      所属分公司
  ) zjxmhthk ON zjxmhthk.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, NVL (SUM(回款金额), 0) hkje FROM jshkb GROUP BY 所属分公司) hk ON hk.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, NVL (SUM(剩余回款金额), 0) syhkje FROM jshkb GROUP BY 所属分公司) syhk ON syhk.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      fo.oname AS 所属分公司,
      NVL (SUM(pfm.u_xmje), 0) AS xmje
    FROM
      p_form_xszssjdd_m pfm
      LEFT JOIN XM_PMS_base xpb ON xpb.xm_phid = pfm.u_phid_xm
      LEFT JOIN fg_orglist dqfo ON dqfo.phid = xpb.dq_phid
      LEFT JOIN fg_orglist fo ON fo.phid = xpb.phid_org
    GROUP BY
      fo.oname
  ) mb ON mb.所属分公司 = cwzz.oname
  LEFT JOIN (SELECT 所属分公司, NVL (SUM(已确认产值), 0) yqrcz FROM xmglb GROUP BY 所属分公司) cz ON cz.所属分公司 = cwzz.oname
  LEFT JOIN (
    SELECT
      所属分公司,
      (SELECT NVL (SUM(u_xmje), 0) FROM p_form_xszssjdd_m) - NVL (SUM(已确认产值), 0) AS wqrcz
    FROM
      xmglb
    GROUP BY
      所属分公司
  ) wwc ON wwc.所属分公司 = cwzz.oname
  left join (SELECT 所属分公司,COUNT(所属分公司) as xmsl FROM cbjdb WHERE 进度系数 > 1 group by 所属分公司) cbjd ON cbjd.所属分公司 = cwzz.oname
  left join  (SELECT 所属分公司,COUNT(所属分公司) as xmsl FROM cbjdb WHERE 成本系数 > 1 group by 所属分公司) cbjd1 ON cbjd1.所属分公司 = cwzz.oname