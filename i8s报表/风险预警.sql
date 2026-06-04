CREATE VIEW fxyj AS
-- 项目看板-风险预警
select 
xp.xm_bill_name as 项目名称,
dqfo.oname as 大区,
fo.oname as 分公司,
xp.xm_bill_no as 项目编码,
xp.hr_bill_name 项目经理,
case pffm.u_fxlx
when '1' then '实施资源匮乏'
when '2' then '进度偏差30%以上'
when '3' then '成本偏差30%以上'
when '4' then '产品需求卡点或稳定性问题'
when '5' then '商务关系破裂'
when '6' then '客户关键对接人变动'
when '7' then '客户高层不满意'
else ''
end as 风险类型,
pffm.u_risk as 风险详情,
case pffm.u_fxdj
when '1' then 'S1致命风险'
when '2' then 'S2严重风险'
when '3' then 'S3重要风险'
else ''
end as 风险等级,
pffm.u_cyzcxq as 产研支持需求,
pffm.u_sszyxq as 实施资源需求,
pffm.u_swgxygcdjsq as 商务关系与高层对接诉求,
trunc(pffm.app_dt) as 单据日期
from 
p_form_fxyjtz_m pffm
left join xm_pms xp on xp.xm_phid = pffm.u_phid_xm
left join fg_orglist dqfo on dqfo.phid =xp.dq_phid
left join fg_orglist fo on fo.phid =xp.phid_org

union all

select 
xp.xm_bill_name as 项目名称,
dqfo.oname as 大区,
fo.oname as 分公司,
xp.xm_bill_no as 项目编码,
xp.hr_bill_name 项目经理,
'' as 风险类型,
pfm.u_risk as 风险详情,
case u_risk_lev
when '1' then 'S1致命风险'
when '2' then 'S2严重风险'
when '3' then 'S3重要风险'
else ''
end as 风险等级,
null as 产研支持需求,
null as 实施资源需求,
null as 商务关系与高层对接诉求,
trunc(pfm.bill_dt) as 单据日期
from 
(select * from p_form0000700150_m where u_risk_lev <> 0)  pfm
left join xm_pms xp on xp.xm_phid = pfm.u_project
left join fg_orglist dqfo on dqfo.phid =xp.dq_phid
left join fg_orglist fo on fo.phid =xp.phid_org