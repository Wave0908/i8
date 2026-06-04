CREATE view zcczhtbg as 
select                                 
to_char(pccm.ng_update_dt, 'YYYY-MM-DD HH24:MI:SS') as "CREATETIME",--创建时间                                
pccm.creator as "CREATEUSER",--创建人                                
null as "ISTRANS", --发送标志                                
to_char(pccm.ng_update_dt, 'YYYY-MM-DD HH24:MI:SS') as "LASTMODIFIEDTIME",--最后修改时间                                
pccm.creator as "LASTMODIFIEDUSER",--最后修改人ID                                
null as "TRANSCOPE", --接收系统                                
null as "ZCZLBG_BGDJ", --变更等级                                
cast(pccm.amt_vat_fc as decimal(18,2)) as "ZCZLBG_BGJE",--本次变更金额                                
'追加协议' as "ZCZLBG_BGLX", --变更类型                                
pccm.bill_no as "ZCZLBG_BH",--变更编号                                
cast(pcmh.cnt_sum_fc as decimal(18,2)) as "ZCZLBG_BHSJE", --不含税金额（元）                              
'001' as "ZCZLBG_BZ", --币种                                
null as "ZCZLBG_DFLXR", --对方联系人                                
nl.dwbh as "ZCZLBG_DWBH", --单位编号                                
nl.dwid as "ZCZLBG_DWID", --单位id                                
nl.oname as "ZCZLBG_DWMC",--单位名称                                
null as "ZCZLBG_FILE", --附件                                
fplx.gs_mc as "ZCZLBG_FPLX", --发票类型                                
null as "ZCZLBG_FSSJ", --发生时间                                
null as "ZCZLBG_HL", --汇率                                
case              
when pcm.user_insconcode is null or pcm.user_insconcode ='' then cast(pcm.bill_no as varchar) else pcm.user_insconcode end as "ZCZLBG_HTBH", --合同编号             
case              
when pcm.user_insconid is null or pcm.user_insconid ='' then cast(pcm.phid as varchar) else pcm.user_insconid end as "ZCZLBG_HTID", --合同ID                    
case when pcm.user_insconname is null or pcm.user_insconname ='' then cast(pcm.bill_no as varchar) else pcm.user_insconname             
end as "ZCZLBG_HTMC", --合同名称                                
pccm.phid as "ZCZLBG_ID", --变更ID                                
'0' as "ZCZLBG_ISUSED", --是否启用                                
case when pt.imposetype='1' then '简易计税' else '一般计税' end as "ZCZLBG_JSFF", --计税方法                                
null as "ZCZLBG_LXDH", --联系电话                                
null as "ZCZLBG_MC", --变更名称                                
null as "ZCZLBG_NOTE", --合同备注                                
case              
when fe.taxpayertype='0' then '2'              
when fe.taxpayertype='1' then '0'              
when fe.taxpayertype='2' then '1'              
end as "ZCZLBG_NSRLX", --纳税人类型                               
cast(pccm.rest_price_avt as decimal(18,2)) as "ZCZLBG_PFJE", --变更后金额（元）                              
null as "ZCZLBG_PFRQ", --批复日期                                
null as "ZCZLBG_PFWH", --批复文号                                
null as "ZCZLBG_PFYB", --批复原币金额                                
null as "ZCZLBG_PFZT", --批复状态                                
null as "ZCZLBG_QDRQ", --签订日期                               
pcm.cnt_sum_vat_fc as "ZCZLBG_SBJE", --合同金额(元)                               
null as "ZCZLBG_SBRQ", --申报日期                                
null as "ZCZLBG_SBYB", --申报原币金额                                
cast(pccm.rest_price_avt as decimal(18,2)) - cast(pccm.amt_fc as decimal(18,2)) as "ZCZLBG_SE", --税额                       
null as "ZCZLBG_SH", --税号                                
pcm.user_rate*100 as "ZCZLBG_SL",--税率                                
null as "ZCZLBG_SPWH", --申报文号                                
'2' as "ZCZLBG_SPZT", --审批状态                                
'58fb65d499154c529cc51ad07e099fa9' as "ZCZLBG_STYLEID", --样式id，样式ID为：58fb65d499154c529cc51ad07e099fa9                                
hem.bill_name as "ZCZLBG_TBR", --填报人                                
case  when coalesce(hem.user_lcnm,'') ='' then   cast(hem.phid as varchar(100))  else hem.user_lcnm end as "ZCZLBG_TBRID", --填报人ID                                
pccm.bill_dt as "ZCZLBG_TBRQ", --填报日期                                
null as "ZCZLBG_TIME", --保存时间                                
null as "ZCZLBG_WFID", --流程id                                
case when pfd_747.inspur_xmlx_bm is null then pt.bill_no else pfd_747.inspur_xmlx_bm end as "ZCZLBG_XMBH", --项目编号                                
case when pfd_747.inspur_xmlx_nm is null then cast(pt.phid as varchar) else pfd_747.inspur_xmlx_nm end as "ZCZLBG_XMID", --项目id                                
case when pfd_747.inspur_xmlx_mc is null then pt.bill_name else pfd_747.inspur_xmlx_mc end as "ZCZLBG_XMMC", --项目名称                                
null as "ZCZLBG_YFK", --预付款（元）                                
fe.compname as "ZCZLBG_YQBGF", --供应商名称                      
coalesce(fe.user_cwcode,fe.compno) as "ZCZLBG_YQBGFBH", --供应商编号                                
coalesce(fe.user_cwnm,cast(fe.phid as varchar)) as "ZCZLBG_YQBGFID", --供应商ID                                
null as "ZCZLBG_YSBTX", --样式必填项                                
ndl.bmbh as "ZCZLBG_ZXBMBH", --执行部门编号                                
ndl.phid as "ZCZLBG_ZXBMID", --执行部门ID                                
ndl.oname as "ZCZLBG_ZXBMMC", --执行部门名称                                
null as "ZCZLBG_ZYNR", --变更内容                              
pccm.remarks as "ZCZLBG_ZYYY" --变更事由  
from                                              
pcm3_cnt_change_m pccm  ----变更合同主表   
left join pcm3_cnt_m_history pcmh on pccm.phid = pcmh.phid_vary_mst
left join pcm3_cnt_m pcm on pccm.phid_cnt=pcm.phid 
left join project_table pt on pt.phid=pcm.phid_pc                                           
left join p_form0000700047_d  pfd_747 on pfd_747.ng_project_phid=pt.phid  --历史项目对照表                                         
left join fg3_enterprise fe on fe.phid= case when coalesce(pccm.user_bgyfdw,'') <> ''  then cast(pccm.user_bgyfdw as varchar)  when coalesce(pccm.user_lcyf,'') <> ''  then  cast(pccm.user_lcyf as varchar) else cast(pcm.phid_supply_ent as varchar)   end
left join ngdept_lcywdy nl on nl.phid=pcm.user_lcssxmb                                    
left join ngdept_lchsbm ndl on ndl.phid=pcm.user_lcssxmb  
left join fg3_user fu on fu.phid=pccm.creator                
left join hr_epm_main hem on fu.hrid=hem.phid             
left join p_form0000000257_d fplx on fplx.zd='发票类型' and fplx.djmc='资产购置合同' and fplx.phid=pcm.user_fplx
where
pcmh.cnt_version not in ('1')