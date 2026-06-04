CREATE VIEW xmglb AS
-- 项目看板-项目概览表
select 
xp.xm_bill_no as 项目编号,
xp.xm_bill_name as 项目名称,
dqfo.oname as 所属大区,
fo.oname as 所属分公司,
xp.compname as 客户名称,
pfxm.u_zkxx 战略客户标签,
pfxm.u_ddlbcol_xmjb 项目级别,
xp.cp_name 产品类型,
wt.type_name 项目类型,
xp.descript 项目状态,
dqjd.pfxd2u_wbs 当前实际阶段,
hem.bill_name 商务经理,
xp.hr_bill_name 项目经理,
cc.affixto_date 合同签订日期,
ccfo.oname 业务归属,
cc.contract_sum 合同金额,
pt.approx_contract_fc 项目金额,
'' 回款金额,
'' 最近回款时间,
'' 开票金额,
'' 最近开票,
'' 已确认产值,
'' 产值完成率,
coalesce(pfxm.u_kg,pfxsm.u_kgdt) 项目开工日期,
pfxsm.u_jhysrq 计划验收日期,
pfxsm.u_jhjsdate 计划结束日期,
pfxsm.u_xmts 计划项目总工期
from xm_pms xp
left join fg_orglist dqfo on dqfo.phid =xp.dq_phid
left join fg_orglist fo on fo.phid =xp.phid_org
left join wbs_type wt on wt.phid =xp.phid_type
left join con3_contract cc on cc.phid = xp.con_phid
left join p_form_xszssjdd_m pfxm on pfxm.u_phid_xm =xp.xm_phid
left join  hr_epm_main hem on hem.phid =cc.phid_emp
left join  fg_orglist ccfo on ccfo.phid =cc.phid_org
left join project_table pt on pt.phid =xp.xm_phid
left join p_form_xmsscbys_m pfxsm on pfxsm.u_phid_xm = xp.xm_phid
left join 
(
select 
pfxm.phid as phid, 
bw.description  as pfxd2u_wbs
from p_form_xszssjdd_m pfxm 
left join 
(
select
pfxm.phid as pphid,
max(pfxd2.phid) phid
from 
p_form_xszssjdd_m pfxm
left join  p_form_xszssjdd_d2 pfxd2 on pfxm.phid = pfxd2.pphid
where  u_jd='是'
group by pfxm.phid
) pfxms on pfxms.pphid = pfxm.phid
left join 
(
select
pfxm.phid as pphid,
max(pfxd2.phid) phid
from 
p_form_xszssjdd_m pfxm
left join  p_form_xszssjdd_d2 pfxd2 on pfxm.phid = pfxd2.pphid
where  u_jd='进行中'
group by pfxm.phid
) pfxmj on pfxmj.pphid = pfxm.phid
left join p_form_xszssjdd_d2 pfxd2 on pfxd2.phid =
case 
when pfxms.phid>pfxmj.phid   then pfxms.phid else  pfxmj.phid end
left join bd_wbs bw on bw.phid =pfxd2.u_wbs 

) dqjd on dqjd.phid=pfxm.phid
order by dqfo.ocode asc,fo.ocode