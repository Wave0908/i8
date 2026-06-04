CREATE VIEW zcxshtxz AS
--资产销售合同
select                  
pcm.phid as phid,                 
to_char(pcm.bill_dt, 'YYYY-MM-DD HH24:MI:SS') as "CREATETIME",--创建时间                                            
fu.username as "CREATEUSER",--录入人                                            
pcm.zfbl*100 as "HTFKBL",--合同收款比例(%)                                            
null as "LASTMODIFIEDTIME",--最后修改时间                                            
null as "LASTMODIFIEDUSER",--最后修改人                                            
--COALESCE(ll.fkje,0) as "LJFKJE" , --累计收款金额(元)  
null as "LJFKJE" , --累计收款金额(元)                                           
--COALESCE(ll.fpje,0) as "LJFPJE",--累计发票金额(元) 
null as "LJFPJE",--累计发票金额(元)                                            
--COALESCE(ll.jsje,0) as  "LJJSJE",--累计结算金额(元)   
null  as  "LJJSJE",--累计结算金额(元)                                         
0 as "LJYFWFJE",--累计应收未收金额                                            
null as "PMCTSBCGHT_BB",--版本                                            
pcm.cnt_sum_vat_fc/(1+pcm.user_rate) as "PMCTSBCGHT_BGJE",--合同金额不含税(元)                                            
null as "PMCTSBCGHT_BHBZJLX",--保函保证金类型                                            
ndl.oname as "PMCTSBCGHT_BMMC",--部门名称                                            
ndl.bmid as "PMCTSBCGHT_BMID",--部门ID                                            
'001' as "PMCTSBCGHT_BZ",--币种                                            
to_char(pcm.bill_dt, 'YYYY-MM-DD HH24:MI:SS') as "PMCTSBCGHT_BZRQ",-- 填报日期                                            
hem.bill_name as "PMCTSBCGHT_BZR",--填报人                                            
nl.dwbh as "PMCTSBCGHT_CGDWBH",--采购单位编号                                            
nl.dwbh as "PMCTSBCGHT_CGDWID",--采购单位名称   业务单元                                            
nl.oname as "PMCTSBCGHT_CGDW",--采购单位编号   pm甲方单位                                            
pcm.cnt_sum_vat_fc as  "PMCTSBCGHT_CSJE",--合同金额含税(元)                                            
case when fe.user_cwcode is null or fe.user_cwcode='' then fe.compno else fe.user_cwcode end as "PMCTSBCGHT_YFDWBH", --乙方单位编号                                          
case when fe.user_cwnm is null or fe.user_cwnm='' then cast(fe.phid as varchar) else fe.user_cwnm  end as "PMCTSBCGHT_YFDWID",--乙方单位ID                                   
fe.compname as "PMCTSBCGHT_YFDWMC",--供应商  乙方单位名称  往来单位                                            
pcm.asr_flag as  "PMCTSBCGHT_FJ",--附件                                            
pcm.exch_rate as "PMCTSBCGHT_HL",--汇率                                             
case                                    
when pcm.user_insconcode is null  or pcm.user_insconcode ='' then  CAST(pcm.bill_no as varchar) else pcm.user_insconcode  end as "PMCTSBCGHT_HTBH",--合同编号           
pcm.cnt_sum_vat_fc as "PMCTSBCGHT_HTE",--总合同金额含税(元)                                            
case when pcm.user_insconname is null  or pcm.user_insconname ='' then  CAST(pcm.bill_name as varchar) else pcm.user_insconname                   
end as "PMCTSBCGHT_HTMC",--合同名称                                            
null as "PMCTSBCGHT_HTSM",--合同主要条款                      
case                    
when pcm.user_insconid is null  or pcm.user_insconid ='' then  CAST(pcm.phid as varchar) else pcm.user_insconid  end as "PMCTSBCGHT_ID",--主键                          
'否' as "PMCTSBCGHT_IFQY",--是否启用                                            
case when pt.imposetype='1' then '简易计税' else '一般计税' end as "PMCTSBCGHT_JSFS" ,--计税方法 取项目信息计征类型                               
pcm.cnt_sum_vat_fc-(pcm.cnt_sum_vat_fc/(1+pcm.user_rate)) as "PMCTSBCGHT_N01",--税额(元)                                            
case                        
when fe.taxpayertype='0'  then '2'                       
when fe.taxpayertype='1'  then '0'                        
when fe.taxpayertype='2' then '1'                        
end as "PMCTSBCGHT_NSLX",--纳税人类型                                             
null as "PMCTSBCGHT_SH",--税号                               
'2' as "PMCTSBCGHT_SPZT",--审批状态                                            
'5cfdcd163696429685201d92acd1bcf2' as  "PMCTSBCGHT_STYLEID",--样式id                                            
pcm.user_rate*100 as  "PMCTSBCGHT_TAX",--税率                                            
fplx.gs_mc as "PMCTSBCGHT_VC01",--发票类型                                    
null as "PMCTSBCGHT_VC04",--合同文本模板                                            
null as "PMCTSBCGHT_WFID",--流程id                                 
case when pfd_747.inspur_xmlx_nm is null then cast(pt.phid as varchar) else pfd_747.inspur_xmlx_nm end     as "PMCTSBCGHT_XMID",--工程ID                                     
case when pfd_747.inspur_xmlx_bm is null then pt.bill_no else pfd_747.inspur_xmlx_bm               end     as "PMCTSBCGHT_XMBH",--工程编号  关联项目信息                     
pcm.user_yfkje as "PMCTSBCGHT_YFK",-- 预收款金额(元)                                            
pcm.user_yfkbl*100  as "PMCTSBCGHT_ZBJBL",--预收款金额比例                                            
null as "PMCTSBCGHT_YFKBL",--合同支付系数                                            
null as "PMCTSBCGHT_YSBTX",--样式必填项                                            
case                                    
when pcm.user_insconcode is null  or pcm.user_insconcode ='' then  CAST(pcm.bill_no as varchar) else pcm.user_insconcode  end as  "PMCTSBCGHT_YWHTBH",--业务合同编号    
'01' as "PMCTSBCGHT_ZT",--合同执行状态                                
0 as "SJFKBL",--实际收款比例(%)                                            
null as "TRANSCOPE",--接收系统                                            
0 as "WFKJE"--,--未收款金额                                                  
from pcm3_cnt_m pcm                                            
left join project_table pt on pt.phid=pcm.phid_pc                                       
left join p_form0000700047_d  pfd_747 on pfd_747.ng_project_phid=pt.phid  --历史项目对照表                                       
left join ngdept_lcywdy nl on nl.phid=pcm.user_lcssxmb                                    
left join ngdept_lchsbm ndl on ndl.phid=pcm.user_lcssxmb                                  
left join fg_fcur ff on pcm.phid_fcur=ff.phid                                      
left join fg3_user fu on fu.phid=pcm.creator           
left join hr_epm_main hem on fu.hrid=hem.phid           
left join p_form0000000257_d fplx on fplx.zd='发票类型' and fplx.djmc='资产购置合同' and fplx.phid=pcm.user_fplx    
left join fg3_enterprise fe on fe.phid=case when pcm.user_lcyf is null or pcm.user_lcyf='' then cast(pcm.phid_supply_ent as varchar) else cast(pcm.user_lcyf as varchar) end
--left join lc_ljjehj  ll on ll.u_htid = case when pcm.user_insconid is null then CAST(pcm.phid as varchar(100)) else pcm.user_insconid end