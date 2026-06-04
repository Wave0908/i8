-- declare @uyear varchar(100),@mon varchar(100),@ocode varchar(100)
-- set @uyear='2023'
-- set @mon='12'
-- set @ocode='A1001'
select 
fg.oname 责任单位,
pt.pc_no "项目编码_合同编码",
project_name 工程名称,
dt.oname 所属项目部名称,
wldw.compname 业主名称 ,
khlx.descript 企业类型,
isnull(gj.nat_name,'')+isnull(sf.cname,'') + isnull(ct.cname,'') 项目所在地区,
qx.regionname as 区县,
lx.type_name 项目所属行业,
wt_gclx.type_name as 二级工程类型,
pt.job_phone 业主代表及联系电话,
--pd5.gs_mc 承包模式,
case 
when pt.user_cjms='1'  then '工程总承包'
when pt.user_cjms='2'  then '施工总承包'
when pt.user_cjms='3'  then '专业承包'
when pt.user_cjms='4'  then '投融建'
when pt.user_cjms='5'  then '其它'
end as 承建模式,
CONVERT(varchar(100),pt.start_date, 111) 合同开工日期,
CONVERT(varchar(100),pt.end_date, 111) 合同竣工日期,
pt.limit_time "合同工期_天",

	
user_yztzrq as 业主调整日期含签证,
user_tzhjgrq 调整后竣工日期,
user_tzhzgq 调整后总工期,


pt.approx_contract_fc/10000 "合同额_万元",
glry.glry 管理人员人数,
zyry.zyry 作业人员人数,
zt.descript 项目状态,
CONVERT(varchar(100),ghdg.check_dt, 111) 项目管理规划大纲审批日期,
CONVERT(varchar(100),xmbcl.check_dt, 111) 项目部成立日期,
CONVERT(varchar(100),zrs.check_dt, 111) 项目管理目标责任书签订日期,
CONVERT(varchar(100),ssghsp.check_dt, 111) 项目管理实施规划审批日期,
hr.cname + hl.mobile1 项目经理姓名及电话,
hr2.cname + hl2.mobile1 备案项目经理姓名及电话 ,
xmry.s_name+xmry.hdt   党工委书记姓名及电话,
xmry2.s_name+xmry2.hdt  项目总工姓名及电话,
xmry3.s_name+xmry3.hdt  工程经理姓名及电话,
xmry4.s_name+xmry4.hdt  商务经理姓名及电话 ,
xmry5.s_name+xmry5.hdt  安全经理姓名及电话,
CONVERT(varchar(100),kg.reo_scdt, 111) 内部开工审批日期,--取自开工报告内部开工报告日期
CONVERT(varchar(100),kg.kgbg_dt, 111) 外部开工报告审批日期,--取自开工报告外部开工报告日期

CONVERT(varchar(100),pf545_m.u_sjkgrq, 111) 项目实际开工日期,

CONVERT(varchar(100),pt.user_jhjgrq, 111)   计划竣工日期,
CONVERT(varchar(100),dateadd(mm,3,pt.user_wgrq),111)   预计竣工日期,
sjcztb.bycz "本月完成产值_万元",
sjcztb.bncz /10000 "当年累计完成产值_万元",
sjcztb.klcz /10000 "自开工累计完成产值_万元",
jdqk.sgjd 施工阶段,
jdqk.jdyj 项目进度预警级别,
--jdqk.jdzt 项目进度状态,
jdqk.pcts 项目进度计划偏差值天,
jdqk.pcyy 简要说明偏差原因,
--jdqk.yyxz 原因性质,
CONVERT(varchar(100),tg.gh_dt, 111) 停工开始日期,
CONVERT(varchar(100),tg.user_jhfg, 111) 计划复工日期,
CONVERT(varchar(100),tg.user_sjfgrq, 111) 实际复工日期,
-- case when tg.reono <>'' then DATEDIFF(day , case when convert(varchar(7),tg.gh_dt,120)=convert(varchar(7), DATEADD(MM,DATEDIFF(MM,0,@uyear+@mon+'08'),0),120)  then tg.gh_dt else  DATEADD(MM,DATEDIFF(MM,0,@uyear+@mon+'08'),0)  end, case when convert(varchar(7),tg.user_jhfg,120)=convert(varchar(7), DATEADD(MS,-3,DATEADD(MM, DATEDIFF(m,0,@uyear+@mon+'08')+1, 0)),120)  then tg.user_jhfg else DATEADD(MS,-3,DATEADD(MM, DATEDIFF(m,0,@uyear+@mon+'08')+1, 0))  end)+1 else '' end AS 本月停工天数,
ljtg.累计停工 累计实际停工天数,
tg.user_tyyy 停工原因,
tg.tg_why 原因简要描述,
--tg.user_zrf 停工责任方,
--tg.user_djyzsp 是否向业主递交索赔报告,
--bysk.amt/10000 本月实收工程款万元 ,
--bnsk.amt/10000 本年实收工程款万元,
--klsk.amt/10000 开工累计实收工程款万元,
--pt.cnt_amt_fc/10000 按合同约定应收款万元,
CONVERT(varchar(100),pt.user_wgrq, 111) 实体完工日期,
--case when pt.user_zlsfyj='1' then '是' else '否' end 资料是否移交,
--CONVERT(varchar(100),pt.fact_end_dt, 111) 竣工验收日期,
--CONVERT(varchar(100),jg.user_xmbcx, 111) "计划/实际_项目部撤销日期",
fg.oname 责任单位,
convert(varchar(100),pt.app_dt,23) as 审批日期,
case 
when pt.user_sftrj='1' then '是'
when pt.user_sftrj='2' then '否'
else pt.user_sftrj end  as 是否投融建,
case 
when pt.user_tsxmmc='1' then '正常项目'
when pt.user_tsxmmc='2' then '因政府干预无法接入平合项目'
when pt.user_tsxmmc='3' then '涉密项目'
when pt.user_tsxmmc='4' then '军民融合项目'
when pt.user_tsxmmc='5' then '项目合同工期低于3个月项目'
when pt.user_tsxmmc='6' then '钢厂检修项目'
when pt.user_tsxmmc='7' then '生产协力项目'
else pt.user_tsxmmc end  as 特殊项目,	
pt.user_sbzysj as 上报中冶时间,
qfzdxm.c_name as 省部级重点项目,
--convert(varchar(100),year(pt.app_dt))+right('00'+convert(varchar(100),month(pt.app_dt)),2) as a,
--@uyear+@mon  as b,
case 
when convert(varchar(100),year(pt.app_dt))+right('00'+convert(varchar(100),month(pt.app_dt)),2)=@uyear+@mon 
then '是'
else '否' end 是否为本月新增项目,
null 备注,
case when pt.user_ifnbfb='01' then '是' else '否' end 是否内部分包
from project_table pt
left join p_form0000700545_m pf545_m on pf545_m.phid=pt.phid  --项目内部开工审批表

--left join pcm3_cnt_m htzb on htzb.phid_pc=pt.phid and htzb.cnt_type in(5,224200107000001,224200107000002,224200107000003)--关联项目信息
--left join (select
--ware_htbm,
--htgl.newchinauni_htbm
--from 
--p_form0000700033_d htgl
--where
--htgl.phid in (
--select max(phid) from p_form0000700033_d htgl where htgl.htlx='1' group by  htgl.newchinauni_htbm 
--) ) htgl on htzb.bill_no=htgl.newchinauni_htbm 
left join fg_orglist dt on dt.phid = pt.user_pc_dept--所属项目部
left join fg3_enterprise wldw on pt.phid_company=wldw.phid
left join (
select * from fg3_customfile  where ng_insert_dt in (
select max(ng_insert_dt) from fg3_customfile  group by ent_id
)
) khxx on wldw.phid=khxx.ent_id --客户信息
left join custclass khlx on khxx.custclass_id=khlx.phid  and groupshareflg='1'--客户类型
left join nation gj on gj.phid = pt.countryid--国家
left join fg3_region sf on sf.phid = pt.provinceid --省份 
left join fg3_region ct on ct.phid = pt.cityid  --城市
left join p_form0000000257_d sshy on sshy.phid = pt.user_sshy --项目所属行业
--left join p_form0000000257_d pd5 on pd5.phid=pt.user_cjms and pd5.zd='项目信息-承包方式' 
left join (
select
convert(varchar(100),year(u_sbyf))+'-'+convert(varchar(100),month(u_sbyf))+'-01' as u_sbyf,
pc,
sum(u_xcty) glry, 
sum(u_xcry) zyry
from
p_form0000700080_m
group by 
pc,convert(varchar(100),year(u_sbyf))+'-'+convert(varchar(100),month(u_sbyf))+'-01'
) glry on glry.pc=pt.phid and year(glry.u_sbyf)=@uyear and month(glry.u_sbyf)=@mon --作业人员
--管理人员人数
left join stats zt on zt.stat = pt.stat --项目状态表
left join p_form0000000245_m zrs on zrs.pc = pt.pc and zrs.ischeck = 1 --目标责任书
left join hr_epm_main hr on hr.phid = pt.project_manager and hr.phid <>0--项目经理
left join hr_epm_main hr2 on hr2.phid = pt.record_manager and hr2.phid<>0 --备案项目经理
left join hr_epm_link hl on hl.must_phid = pt.project_manager and hl.must_phid<>0 --项目经理联系方式
left join hr_epm_link hl2 on hl2.must_phid = pt.record_manager and hl2.must_phid<>0 --备案项目经理联系方式
left join reort_t_m kg on kg.pc = pt.pc and kg.reo_type = 1 and kg.appflg = 1 --开工报告
left join reort_t_m tg on tg.pc = pt.pc and tg.appflg = 1 and tg.reo_type = 2 and tg.appflg = 1
and (SUBSTRING((CONVERT(varchar(100), tg.gh_dt, 112))  ,1 ,4)+SUBSTRING((CONVERT(varchar(100), tg.gh_dt, 112))  ,5 ,2))<=@uyear+@mon
and (SUBSTRING((CONVERT(varchar(100), tg.user_jhfg, 112))  ,1 ,4)+SUBSTRING((CONVERT(varchar(100), tg.user_jhfg, 112))  ,5 ,2))>=@uyear+@mon 

--停工
left join (select
tg.pc pc,
sum( DATEDIFF(day , tg.gh_dt, case when convert(varchar(7),tg.user_jhfg,120)<=convert(varchar(7), DATEADD(MS,-3,DATEADD(MM, DATEDIFF(m,0,@uyear+@mon+'08')+1, 0)),120)  then tg.user_jhfg else DATEADD(MS,-3,DATEADD(MM, DATEDIFF(m,0,@uyear+@mon+'08')+1, 0))  end)+1  ) 累计停工
from reort_t_m tg
where tg.appflg = 1 and tg.reo_type = 2 
and (SUBSTRING((CONVERT(varchar(100), tg.gh_dt, 112))  ,1 ,4)+SUBSTRING((CONVERT(varchar(100), tg.gh_dt, 112))  ,5 ,2))<=@uyear+@mon
group by tg.pc
) ljtg on ljtg.pc=pt.phid
--left join reort_t_m rg on rg.pc = pt.pc and rg.appflg = 1 and rg.reo_type = 3 and rg.appflg = 1 --复工
left join reort_t_m jg on jg.pc=pt.pc and jg.appflg='1' and jg.reo_type='4'
left join fg_orglist fg on fg.phid = pt.cat_phid
left join wbs_type lx on lx.phid=pt.phid_type   --项目类型
left join project_attr sx on lx.phid_projprop=sx.phid--项目属性
left join emp_chg_other xmry on pt.phid=xmry.pc_id and xmry.proj_station='224211214000006' and xmry.del_flg <> '1'
left join emp_chg_other xmry2 on pt.phid=xmry2.pc_id and xmry2.proj_station='224211222000006' and xmry2.del_flg <> '1'
left join emp_chg_other xmry3 on pt.phid=xmry3.pc_id and xmry3.proj_station='224210721001187' and xmry3.del_flg <> '1'
left join emp_chg_other xmry4 on pt.phid=xmry4.pc_id and xmry4.proj_station='224210721001191' and xmry4.del_flg <> '1'
left join emp_chg_other xmry5 on pt.phid=xmry5.pc_id and xmry5.proj_station='224210721001189' and xmry5.del_flg <> '1'
left join p_form0000000165_m xmbcl on pt.user_xmbcl=xmbcl.phid--项目部成立
left join p_form0000700034_m jdqk on jdqk.pc=pt.phid and jdqk.ischeck='1' and jdqk.uyear=@uyear and jdqk.mon=@mon--进度情况
left join (select * from p_form0000000030_m where  check_dt in (select min(check_dt) from p_form0000000030_m group by gcxm)) ssghsp on pt.phid=ssghsp.gcxm and ssghsp.ischeck='1'--实施规划审批
left join (
select
convert(varchar(100),year(u_sbyf))+'-'+convert(varchar(100),month(u_sbyf))+'-01' as u_sbyf,
pc,
sum(u_xcty) glry, 
sum(u_xcry) zyry
from
p_form0000700080_m
group by 
pc,convert(varchar(100),year(u_sbyf))+'-'+convert(varchar(100),month(u_sbyf))+'-01'
) zyry on zyry.pc=pt.phid and year(zyry.u_sbyf)=@uyear and month(zyry.u_sbyf)=@mon --作业人员
left join p_form0000700035_m ghdg on ghdg.pc=pt.pc
left join (
select
phid_pc as pc,
convert(varchar(100) ,fw.bdt,23) as bdt,
sum(isnull(convert(decimal(22,6),pca.amt_sum/10000),0))+sum(isnull(convert(decimal(22,6),pca.user_bywccz/10000),0)) as bycz,
sum(isnull(convert(decimal(22,6),pca.user_bnwcczbhs/10000),0))+sum(isnull(convert(decimal(22,6),pca.user_bnwcczdysj/10000),0)) as bncz,
sum(isnull(convert(decimal(22,6),pca.user_klwcczbhs/10000),0))+sum(isnull(convert(decimal(22,6),pca.user_klwcczdysj/10000),0)) as klcz
from
pms3_cz_act_m pca
left join fg3_workcycle fw on fw.phid=pca.phid_cycle --周期帮助
group by 
phid_pc,convert(varchar(100) ,fw.bdt,23)
)
sjcztb  on  sjcztb.pc = pt.phid and year(bdt) = @uyear and month(bdt) = @mon
--left join(
--select u_htbh,sum(amt) amt from p_form0000000267_m
--where year(ywrq)=@uyear and month(ywrq)=@mon
--group by u_htbh
--)bysk on htgl.ware_htbm=bysk.u_htbh--本月收款
--left join(
--select u_htbh,sum(amt) amt from p_form0000000267_m
--where year(ywrq)=@uyear and month(ywrq)<=@mon
--group by u_htbh
--)bnsk on htgl.ware_htbm=bnsk.u_htbh--本年收款
--left join(
--select u_htbh,sum(amt) amt from p_form0000000267_m
--where (SUBSTRING((CONVERT(varchar(100), ywrq, 112))  ,1 ,4)+SUBSTRING((CONVERT(varchar(100), ywrq, 112))  ,5 ,2))<=@uyear+@mon
--group by u_htbh
--)klsk on htgl.ware_htbm=klsk.u_htbh--开累收款
left join (select phid,regionno,regionname from fg3_region where treelevel=3) qx on qx.phid = pt.regionid
left join wbs_type wt_gclx on wt_gclx.phid =pt.user_gclx2
left join  (select phid,c_no,c_name from fg_simple_data where c_type = 'qfzdxm'  and (cancel_flg is null or cancel_flg=0)) qfzdxm  on qfzdxm.phid=pt.user_sbjzdxm
where  pt.app_status='1' and pt.bill_flg='1' and fg.ocode=@ocode
and pt.project_name not like'%不区分%'                             
and pt.project_name not LIKE '%测试项目%'                             
and pt.project_name not LIKE '%任跃%'                             
and pt.project_name not LIKE '%功能测试%'                            
and pt.project_name not in ('集团标准库项目','曹雪芹公园项目') 
and cast(year(pt.app_dt) as varchar)+cast( (case when len(month(pt.app_dt))='1' then '0'+cast(month(pt.app_dt) as varchar) else cast(month(pt.app_dt) as varchar)end ) as varchar)<=@uyear+@mon
and sx.phid='4' 
--and pt.phid_app in('313191217001298','313191217000673')
and virtual_flg=4  [query]
order by fg.ocode,xmbcl.check_dt,dt.oname