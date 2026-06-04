SELECT
  kc_billhead.uyear 年份,
  kc_billhead.accper 核算期,
  kc_transtype.transname 业务类型,
  kc_billhead.billno 单据号,
  project_table.project_name 项目,
  fg3_enterprise.compname 供应商,
  pcm3_cnt_m.bill_no 合同编号,
  pcm3_cnt_m.title 合同名称,
  warehouse.whname 仓库,
  res_master.code 物料编码,
  res_master.name 物料名称,
  msunit.msname 计量单位,
  res_master.spec 规格型号,
  kc_billbody.res_propertys 组合名称,
  kc_billbody.qty 数量,
  kc_billbody.prc 单价,
  kc_billbody.tax 税额,
  kc_billbody.tax_mony 价税合计,
  kc_billhead.transdt 单据日期,
  (CASE kc_billhead.wrioffflg WHEN 3 THEN '已冲红' WHEN 2 THEN '被冲红' ELSE'未冲红' END) AS 冲红标志,
  (CASE kc_billhead.entaccflg WHEN 2 THEN '已作废' ELSE'未作废' END) AS 作废标志,
  (CASE kc_billhead.entaccflg WHEN 1 THEN '已过账' ELSE'未过账' END) AS 过账标志
FROM
  kc_billbody
  JOIN kc_billhead ON kc_billhead.phid = kc_billbody.pphid
  JOIN res_master ON res_master.phid = kc_billbody.phid_itemid
  JOIN kc_transtype ON kc_transtype.phid = kc_billhead.phid_transno
  LEFT JOIN project_table ON project_table.phid = kc_billhead.phid_tr_proj
  LEFT JOIN warehouse ON warehouse.phid = kc_billhead.phid_warehouse
  LEFT JOIN msunit ON msunit.phid = res_master.phid_msunit
  LEFT JOIN pcm3_cnt_m ON kc_billhead.phid_contractno = pcm3_cnt_m.phid
  LEFT JOIN fg3_enterprise ON kc_billhead.phid_compno = fg3_enterprise.phid
WHERE
  kc_billhead.transdt >=@TransDtBgn
  AND kc_billhead.transdt <=@TransDtEnd
  AND COALESCE (kc_billbody.split_type, 0) <> 1 [query]
  AND [PcRight]
ORDER BY
  kc_billhead.phid_transno,
  kc_billhead.uyear,
  kc_billhead.accper,
  kc_billhead.transdt