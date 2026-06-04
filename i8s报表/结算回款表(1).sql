CREATE VIEW jshkb AS
-- 项目看板-结算回款表
SELECT
  xp.xm_bill_no AS 项目编号,
  xp.xm_bill_name AS 项目名称,
  dqfo.oname AS 所属大区,
  fo.oname AS 所属分公司,
  xp.compname AS 客户名称,
  cc.contract_sum 合同金额,
  pt.approx_contract_fc AS 项目金额,
  wt.type_name AS 项目类型,
  xp.descript AS 项目状态,
  xp.cp_name AS 产品类型,
  xp.hr_bill_name AS 项目经理,
  ccfo.bill_name AS 业务归属,
  cm.name AS 结算阶段,
  cp.balanceplan_id AS 结算计划号,
  cp.pay_sum_fc AS 应收款金额,
  cp.balanced_sum_fc AS 回款金额,
  (cp.pay_sum_fc - cp.balanced_sum_fc) AS 剩余回款金额,
  '' AS 计划完成日期,
  '' AS 实际完成日期
FROM
  XM_PMS_base xp
  LEFT JOIN fg_orglist dqfo ON dqfo.phid = xp.dq_phid
  LEFT JOIN fg_orglist fo ON fo.phid = xp.phid_org
  LEFT JOIN wbs_type wt ON wt.phid = xp.phid_type
  left join con3_contract cc on cc.phid = xp.con_phid
  left join project_table pt on pt.phid =xp.xm_phid
  LEFT JOIN fg3_tags ccfo on ccfo.phid =cc.user_ywgs AND phid_tagskind in (select phid from fg3_tags_kind where bill_no = 'R1') and cstatus = '1'
  left join con3_balanceplan cp on cp.pphid=cc.phid
  left join con3_milestone cm on cm.phid=cp.phid_milestone
ORDER BY
  dqfo.ocode ASC,
  fo.ocode,
  cp.balanceplan_id