create view zcbhtxz as   
--总承包合同新增
select                           
pcm.phid as phid,                        
null as "CBHTDJ_BB",--版本                                                                      
0 as "CBHTDJ_BGJE",--变更金额(元)                                                                      
case                                  
when pcm.user_insconcode is null  or pcm.user_insconcode ='' then  cast(pcm.bill_no as varchar) else pcm.user_insconcode  end as "CBHTDJ_BH",--承包合同编号             
cast((pcm.cnt_sum_vat_fc/(1+pcm.user_rate)) as decimal(22,2)) as "CBHTDJ_BHSJE",--不含税金额                                                               
pcm.user_zbjqx as   CBHTDJ_BXJBLQX,--质保金期限            
0 as "CBHTDJ_BXJDBZB",--保修金担保比例                                                                      
pcm.user_zbjbl*100 as "CBHTDJ_BXJZB",--质保金比例                                                                      
'001' as "CBHTDJ_BZ",--币种                                                                      
nl.dwbh as "CBHTDJ_CBFBH",--0                                                                      
nl.dwnm as "CBHTDJ_CBFID",--总承包单位                                                                      
nl.oname as "CBHTDJ_CBFMC",--承包单位                                                                      
pcm.cnt_sum_vat_fc as "CBHTDJ_CSHTJE",--合同金额(元)                                                                      
nl.dwbh as "CBHTDJ_DWBH",--填报单位编号                                                                      
nl.dwbh as "CBHTDJ_DWID",--填报单位                                                                      
nl.oname as "CBHTDJ_DWMC",--填报单位名称                                                                      
fplx.gs_mc as "CBHTDJ_FPLX",--发票类型                                                                      
pt.project_address as "CBHTDJ_GCDZ",--工程地址                                                                      
fr.provinceno as "CBHTDJ_GCGJ",--所属区域                                                                      
null as "CBHTDJ_GCLX",--工程类型                                                                      
fr.provinceno as "CBHTDJ_GCSS",--所属地区                                                                      
null as "CBHTDJ_GCZGQ",--工程总工期(天)                                                                      
null as "CBHTDJ_GZCZB",--工程款占合同比例                                                                      
pcm.exch_rate as "CBHTDJ_HL",--汇率                                                                      
pcm.cnt_sum_vat_fc as "CBHTDJ_HTJE",--总合同金额(元)                                                                      
case                                  
when pcm.user_insconid is null  or pcm.user_insconid ='' then  cast(pcm.phid as varchar) else pcm.user_insconid  end as "CBHTDJ_ID",--承包合同ID                        
fe.compname as "CBHTDJ_JSDW",--建设单位                                                                      
case when fe.user_cwcode is null or fe.user_cwcode='' then fe.compno else fe.user_cwcode end  as "CBHTDJ_JSDWBH",--建设单位编号                                
case when fe.user_cwnm is null or fe.user_cwnm='' then cast(fe.phid as varchar) else fe.user_cwnm  end as "CBHTDJ_JSDWID",--建设单位ID                         
case when pt.imposetype='1' then '简易计税' else '一般计税' end as "CBHTDJ_JSFF",--计税方法                                                                    
null as "CBHTDJ_LYDBZB",--履约占合同比例                                                                       
pcm.user_lybzje as "CBHTDJ_LYDBE",--履约支付保证金                                                                      
pcm.user_jgzfbl*100 as "CBHTDJ_JGHZFBL",     ----竣工支付比例                                                             
case when pcm.user_insconname is null  or pcm.user_insconname ='' then  cast(pcm.bill_name as varchar) else pcm.user_insconname            
end as "CBHTDJ_MC",--承包合同名称                                 
null as "CBHTDJ_QTDBZB",--其他占合同比例                                                                      
to_char(pcm.signdt,'YYYY-MM-DD HH24:MI:SS')  as "CBHTDJ_QYRQ",--签约日期                                                   
null as "CBHTDJ_QYZT",--签约状态                                                           
pcm.cnt_sum_vat_fc-(pcm.cnt_sum_vat_fc/(1+pcm.user_rate)) as "CBHTDJ_SE",--税额                      
null as "CBHTDJ_SGFS",--承包形式                      
pcm.user_rate*100 as "CBHTDJ_SL",--税率(%)                                           
'2' as "CBHTDJ_SPZT",--审批状态                                                                      
hem.bill_name as "CBHTDJ_TBR",--填报人                                                                      
case                            
when hem.user_lcnm is null or hem.user_lcnm ='' then   cast(hem.phid as varchar)  else hem.user_lcnm   end   as "CBHTDJ_TBRID",--填报人id                 
to_char( pcm.bill_dt,'YYYY-MM-DD HH24:MI:SS') as "CBHTDJ_TBRQ",--填报日期                           
null as "CBHTDJ_WFID",--流程id                                                                     
case when pfd_747.inspur_xmlx_nm is null then cast(pt.phid as varchar) else pfd_747.inspur_xmlx_nm end as "CBHTDJ_XMID",--项目id                               
case when pfd_747.inspur_xmlx_bm is null then pt.bill_no else pfd_747.inspur_xmlx_bm               end as "CBHTDJ_XMBH",--项目编号                             
case when pfd_747.inspur_xmlx_mc is null then pt.bill_name else pfd_747.inspur_xmlx_mc          end as "CBHTDJ_XMMC",--项目名称              
pcm.zfbl*100 as CBHTDJ_YDZFBL, --进度款支付比例            
null as "CBHTDJ_YFKDBZB",--预付款担保                                                                      
pcm.user_yfkbl*100 as "CBHTDJ_YFKZB",--预付款支付比例                                                                                 
pcm.user_yfkje as "CBHTDJ_YFK",--预付款金额（元）                                                                        
to_char( pt.end_date,'YYYY-MM-DD HH24:MI:SS') as"CBHTDJ_YJJGRQ",--预计竣工日期                                                                      
to_char( pt.start_date,'YYYY-MM-DD HH24:MI:SS') as "CBHTDJ_YJKGRQ",--预计开工日期                                                                      
pcm.bill_no as "CBHTDJ_YWHTBH",--业务合同编号                                                     
pcm.pay_name  as "CBHTDJ_ZCBFW",--合同主要条款                                                                               
null as "CBHTDJ_ZLJZB",--暂列金额占合同总价比                                                                      
'01' as "CBHTDJ_ZT",--合同执行状态                                                                      
null as "CBHTDJ_ZXCBZB",--占合同总价比                                                                      
to_char(pcm.bill_dt,'YYYY-MM-DD HH24:MI:SS') as  "CREATETIME",--创建时间                                                       
fu.username as "CREATEUSER",--创建人                                                                      
0 as "LJFKJE",--累计收款金额(元)                                                                      
0 as "LJFPJE",--累计发票金额(元)                                                                      
0 as "LJJSJE",--累计结算金额(元)                                                                      
0 as "LJYFWFJE",--累计应付未付金额                                                                      
0 as "SJFKBL",--实际收款比例(%)                                                                      
0 as "WFKJE",--未付款金额                                                                      
pcm.zfbl*100 as "HTFKBL"--,--合同付款比例                                                                     
from pcm3_cnt_m pcm                                  
left join project_table pt on pt.phid=pcm.phid_pc                                                      
left join p_form0000700047_d  pfd_747 on pfd_747.ng_project_phid=pt.phid  --历史项目对照表                                     
left join fg3_enterprise fe on fe.phid=case when pcm.user_lcjf is null or pcm.user_lcjf='' then cast(pcm.phid_customer_ent as varchar) else pcm.user_lcjf end                       
left join ngdept_lcywdy nl on nl.phid=pcm.user_lcssxmb                                   
left join ngdept_lchsbm ndl on ndl.phid=pcm.user_lcssxmb  
left join fg3_user fu on fu.phid=pcm.creator                                                                      
left join p_form0000000257_d fplx on fplx.zd='发票类型' and fplx.djmc='资产购置合同' and fplx.phid=pcm.user_fplx                            
left join fg3_region fr on fr.phid=pt.provinceid                             
left join fg_orglist tb on tb.phid=pcm.phid_org                      
left join p_form0000000257_d pd5 on pd5.phid=pt.user_gscbfs and pd5.zd='项目信息-承包方式'                
left join hr_epm_main hem on fu.hrid=hem.phid    
--left join lc_ljjehj  ll on ll.u_htid = case when pcm.user_insconid is null then convert(varchar(100),pcm.phid) else pcm.user_insconid END