select    
pxnd as 开展培训年度,  
'外部培训申请表' as 类型,    
'受训人员1' as 参培学员类型,    
    
CAST(hr.bill_no AS varchar(100)) as 员工编码,    
hr.bill_no as 员工姓名,    
pfm_84.pxxmmc as 培训项目名称,    
CAST(ts AS decimal(10,2)) as 培训时长_小时,    
case when pfm_84.jhzt = '01' then '年初计划'    
     when pfm_84.jhzt = '02' then '新增'    
     when pfm_84.jhzt = '03' then '调整'    
end as 计划类别,    
'外部培训' as 培训类型,    
fsd.c_name as 培训类别,    
case when pfm_84.tr_project_type='1' then '重点班'    
     when pfm_84.tr_project_type='2' then '常规班'    
end as 项目类型,    
d.deptname as 组织部门,    
m.pxrs as 培训人数,    
CAST(m.fyys AS decimal(10,2)) as 费用总计,    
null as 讲课酬金,    
null as 讲师食宿差旅费,    
CAST(m.qtfy AS decimal(10,2)) as 其他费用,    
CAST(m.clf AS decimal(10,2)) as 学员食宿差旅费,    
0 as 广告费,    
0 as 文印费,    
CAST(m.pxf AS decimal(10,2)) as 培训费,    
rylx.c_name as 人员类型,    
ygzt.cname as 员工状态,    
fg.oname as 所在单位,    
hr.user_xrzw as 现任职务,    
gwlb.c_name as 岗位类别,    
gwcj.c_name as 岗位层级,    
zw.cname as 职位,    
zwcj.c_name as 职位层级,    
zwlx.cname as 职位类型,    
TO_CHAR(rzxx.bdt, 'YYYY-MM-DD') as 任职时间,    
case 
    when ((EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt))/12 = 0 
    then CAST(((EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt))%12 AS varchar) || '个月' 
    else CAST(((EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt))/12 AS varchar) || '年' || 
         CAST(((EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt))%12 AS varchar) || '个月' 
end as 同岗位任职年限,    
case when hr.sexno='1' then '男' when hr.sexno='2' then '女' end as 性别,    
mz.c_name as 民族,    
zzmm.c_name as 政治面貌,    
    
TO_CHAR(hr2.birthday, 'YYYY-MM-DD') as 出生日期,    
TO_CHAR(hr2.Wrkdt, 'YYYY-MM-DD') as 工作时间,    
TO_CHAR(hr.CDt, 'YYYY-MM-DD') as 入职时间,    
    
case     
when EXTRACT(MONTH FROM CURRENT_DATE) < EXTRACT(MONTH FROM hr2.birthday) then EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday) - 1    
when EXTRACT(MONTH FROM CURRENT_DATE) > EXTRACT(MONTH FROM hr2.birthday) then EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday)    
when EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM hr2.birthday) and 
     EXTRACT(DAY FROM CURRENT_DATE) < EXTRACT(DAY FROM hr2.birthday) then EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday) - 1    
when EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM hr2.birthday) and 
     EXTRACT(DAY FROM CURRENT_DATE) >= EXTRACT(DAY FROM hr2.birthday) then EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday)    
end as 年龄,    
    
EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.wrkdt) + 1 as 社会工龄,    
    
EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr.jdt) + 1 as 企业工龄,    
    
f.c_name as 职称名称,    
g.c_name as 行政级别,    
gg.c_name as 干部层级,    
(    
select    
初始学历    
from    
(    
select     
hr2.edt,    
hr2.eduorg as 毕业院校,    
zgxl.c_name as 初始学历    
from hr_epm_edu hr2  --教育经历表    
left join (select phid,c_name,c_id from fg_simple_data where c_type='edulevel') zgxl on hr2.edugrade=zgxl.phid--最高学历    
where     
hr2.edustyle='1158'    
and hr2.must_phid=hr.phid    
order by hr2.edt desc    
limit 1    
) a    
) as 初始学历,    
    
(    
select    
毕业院校    
from    
(    
select     
hr2.edt,    
hr2.eduorg as 毕业院校,    
zgxl.c_name as 初始学历,    
case when hr2.spec='无' then ''    
else hr2.spec end as 所学专业    
from hr_epm_edu hr2  --教育经历表    
left join (select phid,c_name,c_id from fg_simple_data where c_type='edulevel') zgxl on hr2.edugrade=zgxl.phid--最高学历    
where     
hr2.edustyle='1158'    
and hr2.must_phid=hr.phid    
order by hr2.edt desc    
limit 1    
) a    
) as 初始毕业院校,    
(    
select    
毕业时间    
from    
(    
select     
hr2.edt,    
hr2.eduorg as 毕业院校,    
zgxl.c_name as 初始学历,    
case when hr2.spec='无' then ''    
else hr2.spec end as 所学专业,    
TO_CHAR(hr2.bdt, 'YYYY-MM-DD') as 入学时间,    
TO_CHAR(hr2.edt, 'YYYY-MM-DD') as 毕业时间    
from hr_epm_edu hr2  --教育经历表    
left join (select phid,c_name,c_id from fg_simple_data where c_type='edulevel') zgxl on hr2.edugrade=zgxl.phid--最高学历    
where     
hr2.edustyle='1158'    
and hr2.must_phid=hr.phid    
order by hr2.edt desc    
limit 1    
) a    
) as 毕业时间,    
zgxl.c_name as 最高学历,    
hee.eduorg as 最高毕业院校,    
case when hee.spec='无' then ''    
else hee.spec end as 最高所学专业,    
jndjlx.skillname as 技能等级类型,    
jndj.skillname as 技能等级,    
gz.c_name as 工种,    
lxxx.Mobile1 as 手机号,    
rzly.c_name as 入职来源,    
case     
when hr.user_sfyghwgzjl='1' then '是'    
when hr.user_sfyghwgzjl='2' then '否'    
else '' end as 是否有过海外工作经历,    
case     
when hr.user_sfdrgxmjlgw='1' then '是'    
when hr.user_sfdrgxmjlgw='2' then '否'    
else '' end as 是否担任过项目经理岗位,    
case when user_sfgjnrc='1' then '是'    
     when user_sfgjnrc='2' then '否' end as 是否是高技能领军人才,    
case when user_jsns='1' then '全国技术能手'    
     when user_jsns='2' then '省部级技术能手'    
     when user_jsns='3' then '全国五一劳动奖章'    
     when user_jsns='4' then '省部级五一劳动奖章'    
end as 高技能领军人才类别,    
m.ocode as ocode,    
pxnd as pxnd  
from p_form0000000096_d4 d4--外部受训人员1    
left join p_form0000000096_m m on m.phid=d4.pphid    
left join p_form0000000084_d pfm_84 on m.train_project=pfm_84.phid--培训项目名称    
left join fg_simple_data fsd on fsd.phid=m.pxlb  --培训类型    
left join dept d on d.phid=m.deptid --部门    
left join fg_simple_data fsd1 on fsd1.phid= pfm_84.lb    
left join hr_epm_main hr on hr.phid=case when d4.userhelp_1 is not null then (select phid from hr_epm_main where phid=CAST(d4.userhelp_1 AS varchar)) else d4.empid end    
left join fg_orglist fg on fg.phid=hr.phid_org--关联组织    
left join dept dept on dept.phid=hr.phid_dept--关联部门    
left join (select ocode,parentorg from fg_orgrelatitem where relatid='18') sjbm on dept.deptno=sjbm.ocode    
left join fg_orglist fg1 on sjbm.parentorg=fg1.ocode    
left join (select ocode,parentorg from fg_orgrelatitem where relatid='18') sjbm1 on sjbm.parentorg=sjbm1.ocode    
left join fg_orglist fg2 on sjbm1.parentorg=fg2.ocode    
left join fg_simple_data rylx on hr.emptype=rylx.phid and rylx.c_type='emptype'--人员类型    
left join hr_epm_base hr2 on hr.phid=hr2.ccode--员工基本信息表    
left join fg_ogm_station zzgw on hr2.station=zzgw.phid--组织岗位     
left join (select phid,cname from hr_base_enum where ctype='empstatus')ygzt on hr.EmpStatus=ygzt.phid--员工状态    
left join (select phid,c_name from fg_simple_data where c_type='tectitle') f on f.phid=hr.jobtitle--职称    
left join (select phid,c_name from fg_simple_data where c_type='pradmclass') g on hr.admclass=g.phid--行政级别    
left join (select phid,c_name from fg_simple_data where c_type='gbcj') gg on hr.user_gbcj=gg.phid--干部层级    
left join hr_epm_edu hee on hee.pphid=hr.phid and hee.IfHighEdugrade='1'  --工作经历勾选最高学历    
left join (select phid,c_name,c_id from fg_simple_data where c_type='edulevel') zgxl on hee.edugrade=zgxl.phid--最高学历    
left join hr_epm_edu mhee on mhee.pphid=hr.phid and mhee.IfHightestDegree='1'  --教育经历勾选最高学位      
left join (select phid,c_name,c_id from fg_simple_data where c_type = 'degree' and (cancel_flg is null or cancel_flg=0)) zgxw on mhee.degree=zgxw.phid--最高学位    
left join (select phid,c_name from fg_simple_data where c_type='political') zzmm on hr2.Political=zzmm.phid--政治面貌    
left join (select phid,c_name from fg_simple_data where c_type='folk') mz on mz.phid=hr2.Folk--民族    
left join hr_epm_link lxxx on lxxx.ccode=hr.phid--联系信息    
left join hr_epm_station rzxx on hr.phid=rzxx.ccode and rzxx.assigntype='0'--任职信息表    
left join fg_ogm_station zzgw2 on rzxx.station=zzgw2.phid    
left join fg_ogm_position zw on zzgw2.positioncode=zw.phid--职位    
left join (select phid,c_name from fg_simple_data where c_type='positionlevel') zwcj on zw.stationlevel=zwcj.phid--职位层级    
left join fg3_ogm_positiontype zwlx on zw.positiontype=zwlx.phid--职位类型    
left join (select phid,c_name from fg_simple_data where c_type='stationkind') gwlb on zzgw2.stationkind=gwlb.phid--岗位类别    
left join (select phid,c_name from fg_simple_data where c_type='stationlevel') gwcj on zzgw2.stationlevel=gwcj.phid--岗位层级    
left join (select phid,c_name from fg_simple_data where c_type='certtype' and (cancel_flg is null or cancel_flg=0)) sfz on sfz.phid = hr.cardtype --身份证类型    
left join (select phid,c_name from fg_simple_data where (cancel_flg is null or cancel_flg=0) and c_type='rprtype' ) hk on hk.phid = hr2.rprtype--户口类型     
left join (select phid,c_name from fg_simple_data where c_type = 'tectitlesuject' and (cancel_flg is null or cancel_flg=0)) zczy on zczy.phid = hr.jobspecial --职称专业    
left join hr3_empskilltype jndjlx on jndjlx.phid = hr.skilltype --技能等级类型    
left join hr3_empskilldata jndj on jndj.phid = hr.skilldata --技能等级类型    
left join (select phid,c_name from fg_simple_data where c_type = 'JobClass' and (cancel_flg is null or cancel_flg=0)) gz on gz.phid = hr.jobclass    
left join (select phid,c_name from fg_simple_data where c_type = 'entancesourse' and (cancel_flg is null or cancel_flg=0)) rzly on rzly.phid = hr.recruittype    
left join hr_epm_finance bank on bank.ccode = hr.phid     
left join fg_simple_data fsd_yhlx on bank.user_yhlx=fsd_yhlx.phid and fsd_yhlx.c_type='banktype'    
left join hr_epm_cont hec on hec.pphid=hr.phid  --员工合同信息    
    
left join     
(SELECT s.ccode,    
        STRING_AGG(s.bill_name, ',' ORDER BY s.bill_name) as bill_name
FROM (select rzxx.ccode,zzgw.bill_name 
      from hr_epm_station rzxx    
      left join fg_ogm_station zzgw on rzxx.station=zzgw.phid) s    
GROUP BY s.ccode) a on a.ccode=hr.ccode    
left join (select hr.cno as cno,max(edu.bdt) as rxsj,max(edu.edt) as bysj 
           from hr_epm_edu edu    
           left join hr_epm_main hr on edu.must_phid=hr.phid    
           group by hr.cno) edu on hr.cno=edu.cno    
where      
m.ischeck='1'    
    
union all    
     
select    
pxnd as 开展培训年度,  
'外部培训申请表' as 类型,    
'受训人员2' as 参培学员类型,    
null as 员工编码,    
textcol_1 as 员工姓名,    
pfm_84.pxxmmc as 培训项目名称,    
CAST(m.ts AS decimal(10,2)) as 培训时长_小时,    
case when pfm_84.jhzt ='01' then '年初计划'    
     when pfm_84.jhzt ='02' then '新增'    
     when pfm_84.jhzt ='03' then '调整'    
end as 计划类别,    
'外部培训' as 培训类型,    
fsd.c_name as 培训类别,    
case when pfm_84.tr_project_type='1' then '重点班'    
     when pfm_84.tr_project_type='2' then '常规班'    
end as 项目类型,    
d.deptname as 组织部门,    
m.pxrs as 培训人数,    
CAST(m.fyys AS decimal(10,2)) as 费用总计,    
null as 讲课酬金,    
null as 讲师食宿差旅费,    
CAST(m.qtfy AS decimal(10,2)) as 其他费用,    
CAST(m.clf AS decimal(10,2)) as 学员食宿差旅费,    
0 as 广告费,    
0 as 文印费,    
CAST(m.pxf AS decimal(10,2)) as 培训费,    
fsd1.c_name as 人员类型,    
null as 员工状态,    
fo.oname as 所在单位,    
null as 现任职务,    
d1.u_gwlbxt as 岗位类别,    
null as 岗位层级,    
null as 职位,    
null as 职位层级,    
null as 职位类型,    
null as 任职时间,    
null as 同岗位任职年限,    
null as 性别,    
null as 民族,    
fsd2.c_name as 政治面貌,    
null as 出生日期,    
null as 工作时间,    
null as 入职时间,    
d1.u_nl as 年龄,    
d1.u_shgl as 社会工龄,    
null as 企业工龄,    
d1.textcol_2 as 职称名称,    
null as 行政级别,    
d1.u_gbcj as 干部层级,    
null as 初始学历,    
null as 初始毕业院校,    
null as 毕业时间,    
d1.u_zgxl as 最高学历,    
null as 最高毕业院校,    
null as 最高所学专业,    
null as 技能等级类型,    
null as 技能等级,    
null as 工种,    
null as 手机号,    
null as 入职来源,    
null as 是否有过海外工作经历,    
null as 是否担任过项目经理岗位,    
null as 是否是高技能领军人才,    
null as 高技能领军人才类别,    
m.ocode as ocode,  
pxnd as pxnd  
from p_form0000000096_d1 d1--外部受训人员2    
left join p_form0000000096_m m on m.phid=d1.m_code    
left join p_form0000000084_d4 pfm_84 on m.train_project=pfm_84.phid--培训项目名称    
left join fg_simple_data fsd on fsd.phid=m.pxlb  --培训类型    
left join dept d on d.phid=m.deptid --部门    
left join fg_simple_data fsd1 on fsd1.phid=d1.u_yglx    
left join fg_orglist fo on fo.phid=d1.u_szdw    
left join fg_simple_data fsd2 on fsd2.phid=d1.u_zzmm  --政治面貌    
where m.ischeck='1';