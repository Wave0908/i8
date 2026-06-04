CREATE VIEW xmlsb AS
-- 项目看板-项目六算表
SELECT
  xp.xm_bill_no AS 项目编号,
  xp.xm_bill_name AS 项目名称,
  dqfo.oname AS 所属大区,
  fo.oname AS 所属分公司,
  xp.compname AS 客户名称,
  cc.contract_sum 合同金额,
  pt.approx_contract_fc 项目金额,
  wt.type_name 项目类型,
  xp.descript 项目状态,
  xp.cp_name 产品类型,
  xp.hr_bill_name 项目经理,
  ccfo.oname 业务归属,
  '' 合同概况成本,
  cbys.u_yscb 项目总预算成本,
  cbys.u_decb_rt 项目实施总预算成本,
  10 实际成本,
  10 剩余预算,
  10 预算执行率,
  10 项目毛利率
  
FROM
  xm_pms xp
  LEFT JOIN fg_orglist dqfo ON dqfo.phid = xp.dq_phid
  LEFT JOIN fg_orglist fo ON fo.phid = xp.phid_org
  LEFT JOIN wbs_type wt ON wt.phid = xp.phid_type
  left join con3_contract cc on cc.phid = xp.con_phid
  left join  fg_orglist ccfo on ccfo.phid =cc.phid_org
  left join project_table pt on pt.phid =xp.xm_phid
  left join p_form_xmsscbys_m cbys on cbys.u_phid_xm = xp.xm_phid
ORDER BY
  dqfo.ocode ASC,
  fo.ocode