CREATE VIEW zdy_wzdydcxb AS
--自定义_物资点验单查询表
select                           
ndl.bmid  as "FSYXDJ_BMID", --部门ID                          
ndl.oname  as "FSYXDJ_BMMC", --部门名称                          
pfm_76.bill_no as "FSYXDJ_DJBH", --单据编号                          
'3e2675f08b4c5cb1fe177e90ba2f727e' as "FSYXDJ_DJLX", --单据类型//传3e2675f08b4c5cb1fe177e90ba2f727e                          
concat(CAST(pfm_76.phid as varchar(100)), '_zdywzdydzb') as "FSYXDJ_DJNM", --单据内码                          
to_char(pfm_76.bill_dt, 'YYYY-MM-DD') as "FSYXDJ_DJRQ", --单据日期                          
'WEBBZ' as "FSYXDJ_DJYWLX",-- 业务类型 传：WEBBZ                          
'0'  as "FSYXDJ_DJZT", --单据状态 传：0                          
nl.dwbh as "FSYXDJ_DWBH", --单位编号                          
nl.oname as "FSYXDJ_DWMC", --单位名称                          
pfm_76.u_fjzs as "FSYXDJ_FJZS", --附件张数         
concat(CAST(pfm_76.phid as varchar(100)), '_zdywzdydzb') as FSYXDJ_ID,        
pfm_76.u_cgjehj as "FSYXDJ_JE", --金额 传物资点验单的采购金额合计                           
pfm_76.u_cgjehj as "FSYXDJ_JSJE", --结算金额 与金额一致                          
'cea6cb26b317b02fd02ad6e1bf90ad17' as "FSYXDJ_TREEID", --传：cea6cb26b317b02fd02ad6e1bf90ad17                          
'物资点验单' as "FSYXDJ_TREEMC", --传：物资点验单                          
'新中大' as "FSYXDJ_USER", --用户 传"新中大"                          
'0acbbe3c-43e5-47d2-8f17-c9874c03d5f3' as "FSYXDJ_USERID", --用户ID//传0acbbe3c-43e5-47d2-8f17-c9874c03d5f3                          
wzdyd.gs_nm as "FSYXDJ_YWLX", --业务类型：传值见下                         
wzdyd.gs_mc as "FSYXDJ_YWLXMC",    --业务类型名称：                          
pfm_76.u_zy  as "FSYXDJ_ZY" --摘要                          
from  p_form0000700076_m pfm_76             
left join project_table pt on pt.phid=pfm_76.phid_pc --项目表                              
left join p_form0000700047_d  pfd_747 on pfd_747.ng_project_phid=pt.phid  --历史项目对照表  
left join pcm3_cnt_m pcm on pcm.phid=pfm_76.u_htbh --合同表   
left join ngdept_lcywdy nl on nl.phid=CAST(case when pfm_76.u_lcglbm is null then pcm.user_lcssxmb else pfm_76.u_lcglbm end as bigint)   --浪潮业务单元视图             
left join ngdept_lchsbm ndl on ndl.phid=CAST(case when pfm_76.u_lcglbm is null then pcm.user_lcssxmb else pfm_76.u_lcglbm end as bigint) --浪潮核算部门视图             
left join p_form0000000257_d wzdyd on wzdyd.zd='业务类型' and wzdyd.djmc='物资点验单' and wzdyd.phid=pfm_76.u_ywlx;