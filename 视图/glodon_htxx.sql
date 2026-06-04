CREATE VIEW glodon_htxx AS
--合同基础信息接口
select   distinct       
pm.bill_no as contrCode, --合同编码          
pm.phid as contrInternalCode, --合同内码          
pm.bill_name as  contrName, --合同名称          
fo.ocode  as  orgCode, --组织编码          
fo.oname as  orgName, --组织名称          
case           
 when pm.cnt_type in ('5','224200107000001','224200107000002','224200107000003')           
 then 1--收入合同（建筑安装、产品加工与制造、房地产开发、设计）          
 when pm.cnt_type in ('3','224200715000001','224200106000017')          
 then 4--采购合同（材料采购、设备采购和周转材采购）          
 when pm.cnt_type in ('10','6','7')          
 then 7--租赁合同（周材租赁、设备内租和设备外租）          
 when pm.cnt_type in ('224200106000001')          
 then 5--劳务分包合同          
 when pm.cnt_type in ('2')          
 then 6--专业分包合同          
 when pm.cnt_type in ('224201218000002','224210118000001','224210118000002',          
 '224210118000003','224210118000004','224200107000004','224200107000005','12')          
 and pt.bill_name not like '%不区分%' and  pt.bill_name is not null          
 then 2--承揽其他收入合同          
 when pm.cnt_type in ('224201218000002','224210118000001','224210118000002',          
 '224210118000003','224210118000004','224200107000004','224200107000005','12')          
 and pt.bill_name like '%不区分%' and  pt.bill_name is not null          
 then 3--非承揽其他收入合同          
 when pm.cnt_type in ('224201218000002','224210118000001','224210118000002',          
 '224210118000003','224210118000004','224200107000004','224200107000005','12')          
 and  pt.bill_name is null          
 then 23--非承揽/承揽其他收入合同          
 when pm.cnt_type in ('4','224200106000002','224200106000003',          
 '224200106000004','224200106000005','224200106000006','224200106000014','224200106000012'          
 ,'224200106000013','224200106000015','224200106000016','224200106000018'          
 ,'224200715000002','224201218000001')          
 and pt.bill_name like '%不区分%' and  pt.bill_name is not null          
 then 9--非承揽其他支出合同          
  when pm.cnt_type in ('4','224200106000002','224200106000003',          
 '224200106000004','224200106000005','224200106000006','224200106000014','224200106000012'          
 ,'224200106000013','224200106000015','224200106000016','224200106000018'          
 ,'224200715000002','224201218000001')          
 and pt.bill_name not like '%不区分%' and  pt.bill_name is not null          
 then 10--承揽其他支出合同          
 when pm.cnt_type in ('4','224200106000002','224200106000003',          
 '224200106000004','224200106000005','224200106000006','224200106000014','224200106000012'          
 ,'224200106000013','224200106000015','224200106000016','224200106000018'          
 ,'224200715000002','224201218000001')          
 and pt.bill_name is  null          
 then 910--承揽/非承揽其他支出合同          
 else 0          
end  as contrClassify ,--合同分类          
pm.cnt_type as  contrType, --合同类型          
pm.stat as  contrState, --合同状态          
pm.start_dt as  contrStartTime, --合同开始时间          
pm.end_dt as  contrFinishTime, --合同结束时间          
pm.signdt as  signDate, --签订日期          
pt.bill_no as  projCode, --项目编码          
pt.bill_name as  projName, --项目名称          
fo1.oname as  departmentName, --部门名称          
fo1.ocode as  departmentCode, --部门编码          
fe.compname as  partyAUnitName, --甲方单位名称          
fe.compno as  partyAUnitCode, --甲方单位编码          
pm.senemp as  partyARepresent, --甲方代表          
fe1.compname as  partyBUnitName, --乙方单位名称          
fe1.compno as  partyBUnitCode, --乙方单位编码          
pm.phid_senemp as  partyBRepresent, --乙方代表          
pm.user_yfsqwtr as  partyBDelegator, --乙方授权委托人          
pm.user_yfsqwtrlxfs as  partyBDelegatorContactInfo, --乙方授权委托人联系方式          
pm.user_yjsyl as  predictYield, --预计收益率          
fe1.compname as  implementingUnit, --实施单位          
hem.bill_no as  projManager, --项目经理          
hem1.bill_no as  onSiteManager, --现场经理          
pm.zfbl as  progressPaymentPercentage, --进度款比例          
pm.cnt_sum_vat_fc as  amtTax, --含税合同金额          
case           
 when pm.cnt_type in ('10','6','7')          
 then pm.cnt_sum_fc           
 else pm.user_bhsje          
end as  amt, --不含税金额          
case           
 when pm.cnt_type in ('10','6','7')          
 then pm.ori_total_sum_fc        
 else pm.cnt_org_sum_vat_fc           
end as  originalTaxContrAmt, --原含税合同金额          
case           
 when pm.cnt_type in ('10','6','7')          
 then pm.ch_xy_amt_vat_fc        
 else pm.ch_sum_amt_vat_fc             
end as  cumulativeChangeTaxContrAmount, --累计变更含税合同金额          
pm.user_se as  taxAmt, --税额          
pm.user_rate as  taxRate, --税率          
null  currency, --币种          
pm.user_sfhzf as  isForPartner, --是否为合作方          
pm.user_sfjgc as  isPartyA, --是否甲供材          
pm.Cnt_Sum_Vat as  currencyTaxInclusiveAmt, --本币含税金额          
pm.user_gqzrlts as  durationTotalCalendarDays, --工期总日历天数          
pm.ch_sum_amt_vat_fc as  uppercaseContrPriceTaxTotal, --大写合同价税合计          
pm.user_zbj as  qualityDeposit, --质保金          
pm.user_zbjbl as  qualityDepositPercentage, --质保金比例          
pm.user_zbjqx as  qualityDepositDeadline, --质保金期限          
pm.user_yfkje as  prepaymentAmt, --预付款金额          
pm.user_yfkbl as  prepaymentPercentage, --预付款比例          
pm.user_jgzfbl as  completedPaymentPercentage, --竣工支付比例          
adm.deployflag as  keepPromiseGuaranteeWay, --履约保证方式          
pm.user_lybzje as  keepPromiseGuaranteeAmt, --履约保证金额          
fe3.compno as  invoiceUnit, --开票单位          
fe4.compno  as  invoicingUnit, --收票单位          
m.gs_bm as  invoiceType, --发票类型          
case     
 when pm.user_nsrlx='0' then NULL     
 else pm.user_nsrlx    
end  as  taxpayerType, --纳税人类型          
pm.is_bal_over_cnt_sum as  orBeyondContrAmt, --付款额是否不能超合同额          
pm.logic_control_percent as  noBeyondContrAmtPayment, --付款额不能超合同额支付比例数          
pm.is_rk_prc_noover_cnt as  orBeyondContrUnitPrice, --是否入库单价不能超合同单价          
pm.pay_over_precent as  noBeyondContrAmt, --预结算/结算额不能超合同额比例          
pm.is_pay_over_cnt_sum as  isPreQuotaNoBeyond, --是否预结算/结算额不能超合同额          
pm.user_tzhdfkbl as  initialPaymentPercentage, --初始的付款比例          
pm.user_cllx as  materialType, --材料类型          
pm.user_htsx as  contrAttribute, --合同属性          
t.c_no as  paymentWay, --付款方式          
cm.orders as  purchaseWay, --采购方式          
pm.user_sfcds as  purchaseForm, --采购形式          
pm.user_jjfs as  purchaseValuationWay, --采购计价方式          
pm.calc_type as  rentalValuationWay, --租赁计价方式          
pm.user_sfgmh as  isScaleCollection, --是否规模化采集          
pm.user_cwxtsfcz as  financeSystemIsExist, --财务系统是否存在          
pm.user_insconcode as  inspurContrCode, --浪潮合同编码          
pm.user_insconid as  inspurContrId, --浪潮合同ID          
pm.user_insconname as  inspurContrName, --浪潮合同名称          
pm.phid  sourceId --源业务系统主键          
from pcm3_cnt_m pm          
left join fg_orglist fo on fo.phid=pm.phid_org          
left join project_table pt on pt.phid=pm.phid_pc          
left join fg_orglist fo1 on fo1.phid=pm.phid_dept           
left join fg3_enterprise fe on pm.phid_customer_ent=fe.phid          
left join fg3_enterprise fe1 on pm.phid_supply_ent=fe1.phid          
left join fg3_enterprise fe2 on pm.phid_sgcomp=fe2.phid          
left join hr_epm_main hem on hem.phid=pm.phid_pm          
left join hr_epm_main hem1 on hem1.phid=pm.phid_cm          
left join cg_mode cm on cm.phid=pm.user_cgfs          
left join (select * from fg_simple_data where c_type = 'fkfs') as t           
on t.phid=pm.user_fkfs          
left join (select * from p_form0000000257_d where zd='发票类型' and djmc='资产购置合同') as m          
on m.phid=pm.user_fplx          
left join addin_method_m as adm on adm.phid=pm.user_lybzfs          
left join fg3_enterprise fe3 on           
(case           
 when pm.cnt_type in ('5','224200107000001','224200107000002','224200107000003')          
 then CAST(pm.user_kpdw AS bigint)           
 else pm.phid_inv_comp             
end) =fe3.phid          
left join fg3_enterprise fe4 on           
(case           
 when pm.cnt_type in ('5','224200107000001','224200107000002','224200107000003')          
 then CAST(pm.user_spdw AS bigint)           
 else pm.phid_tick_comp             
end) =fe4.phid          
      where   
pm.app_status=1 and pm.bill_name not like '%任跃%' and pm.bill_name not like '%测试%' and pt.bill_name not like '%任跃%' and pt.bill_name not like '%测试%' and replace(pm.bill_no,' ','') not in (select replace(pm.bill_no,' ','') from pcm3_cnt_m pm     
where pm.app_status=1  group by replace(pm.bill_no,' ','') having count(*)>1)  
and pm.user_gldtbbz is null   
or  
pm.app_status=1 and pm.bill_name not like '%任跃%' and pm.bill_name not like '%测试%' and pt.bill_name not like '%任跃%' and pt.bill_name not like '%测试%' and replace(pm.bill_no,' ','') not in (select replace(pm.bill_no,' ','') from pcm3_cnt_m pm     
where pm.app_status=1  group by replace(pm.bill_no,' ','') having count(*)>1)  
and pm.ng_update_dt  >  pm.user_gldtbsj  ---更新时间大于推送时间