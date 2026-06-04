CREATE view xmlxtz as 
--项目立项更新
select 
pt.phid as phid,              
pt.phid as XZD_PHID,              
TO_CHAR(pt.ng_insert_dt, 'YYYY-MM-DD HH24:MI:SS') as CREATETIME,--创建时间              
fu.userno  CREATEUSER,--创建人              
TO_CHAR(pt.ng_update_dt,'YYYY-MM-DD HH24:MI:SS') as LASTMODIFIEDTIME,--更新时间              
'新中大' "LASTMODIFIEDUSER",              
pd6.gs_mc as XMXX_CBFS,--承揽方式              
fsd.c_name as XMXX_CYBK,--产业板块              
nl.dwbh as XMXX_DWBH,--单位编号              
nl.dwid as XMXX_DWID,--单位id              
nl.oname as XMXX_DWMC,--单位名称              
pd1.gs_nm as XMXX_ENRLBHF,--enr              
pd4.gs_mc XMXX_GCZT,--项目状态              
nl.dwbh as XMXX_HSDW,--核算单位              
nl.oname as XMXX_HSDWMC,--核算单位名称              
null XMXX_HSXM,--核算项目              
COALESCE(pfd_747.inspur_hsxm_bm,pt.user_hsxmnm) as XMXX_HSXMBH,--核算项目编号              
'' XMXX_HSXMLB,--核算项目类别              
COALESCE(pfd_747.inspur_hsxm_mc,pt.bill_name) as XMXX_HSXMMC,--核算项目名称              
pt.limit_time as XMXX_HTGQ,--计划工期              
pt.cnt_amt_fc as XMXX_HTJE,--合同金额              
TO_CHAR(pt.end_date, 'YYYY-MM-DD')as XMXX_HTJGRQ,--合同竣工日期              
TO_CHAR(pt.start_date,'YYYY-MM-DD') as XMXX_HTKGRQ,--合同开工日期              
js.user_cwcode XMXX_JSDWBH,--建设单位编号              
case js.user_khssfw when '01' then '中冶集团内部'               
     when '02' then '中冶外五矿内' when '03' then '第三方'               
     when '04' then '二十二冶内部' else '' end as XMXX_JSDWLB,--建设单位类别              
js.compname as XMXX_JSDWMC,--建设单位名称              
case when pt.imposetype='1' then '简易计税' else '一般计税' end XMXX_JSFF,--计税方法              
'1' XMXX_MX,--明细              
TO_CHAR(pt.ng_insert_dt, 'YYYY-MM-DD HH24:MI:SS') as XMXX_QYRQ,--启用日期              
'' XMXX_SE,--税额              
case when fe.user_cwcode is null or fe.user_cwcode='' then fe.compno else fe.user_cwcode end XMXX_SGDWBH,--施工单位编号              
case when fe.user_cwnm is null or fe.user_cwnm='' then cast(fe.phid as varchar) else fe.user_cwnm  end as XMXX_SGDWID,--施工单位id              
fe.compname as XMXX_SGDWMC,--施工单位名称              
pd5.gs_mc as  XMXX_SGFS,--承包形式              
pt.pre_impose_rate*100 as XMXX_SL,--税率              
fr.cityno as XMXX_SSDQ,--所属地区              
pd3.gs_mc as XMXX_SSHY,--所属行业              
na.nat_name_e as XMXX_SSQY,--所属区域              
xmid.浪潮项目类型id XMXX_STYLEID,--样式id              
COALESCE(pfd_747.inspur_xmlx_mc,pt.bill_name) XMXX_SWXMMC,--税务项目名称              
fu.username XMXX_TBR,--填报人姓名              
fu.phid  XMXX_TBRID,--填报人id              
TO_CHAR(pt.ng_insert_dt, 'YYYY-MM-DD HH24:MI:SS') XMXX_TBRQ,--填报日期              
TO_CHAR(pt.ng_insert_dt, 'YYYY-MM-DD HH24:MI:SS')  XMXX_TIME,--填报时间              
pd2.gs_mc as XMXX_TZXZ,--行业性质              
COALESCE(pfd_747.inspur_xmlx_bm,pt.bill_no) as XMXX_XMBH,--项目编号              
pt.project_address as XMXX_XMDD,--项目地址              
COALESCE(pfd_747.inspur_xmlx_nm,pt.phid) XMXX_XMID,--项目id              
pt.ab as XMXX_XMJC,--项目简称              
COALESCE(pfd_747.inspur_xmlx_mc,pt.bill_name) as XMXX_XMMC,--项目名称              
COALESCE(pfd_747.inspur_xmlx_fjm,pt.user_gs_fjm) XMXX_XMSZGJFJM,--分级码              
pd10.gs_nm XMXX_XMZT,--项目状态              
pt.limit_time as XMXX_YJHTGQ,--预计合同工期              
pd8.gs_nm XMXX_YWLX,              
pd9.gs_nm as XMXX_XMXZ              
from project_table pt              
left join p_form0000700047_d pfd_747 on pfd_747.ng_project_bill_no=pt.bill_no              
left join fg3_enterprise fe on fe.phid=pt.phid_sg_org              
left join fg3_enterprise js on js.phid=case when pt.user_jfdw is null or pt.user_jfdw ='' then pt.phid_company  else  pt.user_jfdw end         
left join ngdept_lcywdy nl on cast(nl.phid as varchar)= case when pt.user_cwglbm is null or pt.user_cwglbm ='' then pt.user_pc_dept else  pt.user_cwglbm end               
left join wbs_type wt on wt.phid=pt.phid_type              
left join fg3_user fu on pt.creator=fu.phid              
left join fg_simple_data fsd on pt.user_cwbk=fsd.phid and fsd.c_type='cwbk'              
left join fg3_region fr on fr.phid=pt.cityid              
left join nation na on na.phid=pt.countryid              
left join p_form0000000257_d pd1 on pt.user_enr=pd1.phid and pd1.zd='项目信息-enr'              
left join p_form0000000257_d pd2 on pt.user_hyxz=pd2.phid and pd2.zd='项目信息-行业性质'              
left join p_form0000000257_d pd3 on pt.user_sshy=pd3.phid and pd3.zd='项目信息-所属行业'              
left join p_form0000000257_d pd4 on pt.stat=pd4.pm_zdb and pd4.zd='项目信息-项目状态'              
left join p_form0000000257_d pd5 on pd5.phid=pt.user_cbfs and pd5.zd='项目信息-承包方式'              
left join p_form0000000257_d pd6 on pd6.phid=pt.user_clfs and pd6.zd='承揽方式' and pd6.djmc='项目信息'              
left join p_form0000000257_d pd7 on pd7.phid=pt.user_gs_cybk and pd7.zd='产业板块' and pd7.djmc='项目信息'                
left join p_form0000000257_d pd8 on pd8.phid=pt.user_ywlx and pd8.zd='项目信息_业务类型' and pd8.djmc='项目信息'               
left join p_form0000000257_d pd9 on pd9.phid=pt.user_xmxz and pd9.zd='项目信息_项目性质' and pd9.djmc='项目信息'               
left join p_form0000000257_d pd10 on pd10.phid=pt.user_fc_xmzt and pd10.zd='房地产_项目状态' and pd10.djmc='项目信息'               
left join (select lx.phid 项目类型id,sx.attr_name 项目属性,lx.type_name 项目类型,              
case when sx.attr_name='工程建设' then '1c4641468c19bccc8d0b2062f92fc90f'              
else (case  when lx.type_name='房地产销售项目' then 'cb5ca0238692452d92ffa3b1e4529cae'              
   when lx.type_name='其它项目' then '8b94e09cd34e4109b715da559b027a68' end)end 浪潮项目类型id              
from wbs_type lx              
left join project_attr sx on lx.phid_projprop=sx.phid) xmid on xmid.项目类型id=pt.phid_type 