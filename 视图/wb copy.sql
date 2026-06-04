  
select    
pxnd 开展培训年度,  
'外部培训申请表' as 类型,    
'受训人员1' as 参培学员类型,    
    
convert(varchar(100),hr.cno) 员工编码,    
hr.cname 员工姓名,    
 pfm_84.pxxmmc as 培训项目名称,    
convert(decimal(10,2),ts) as 培训时长_小时,    
case when  pfm_84.jhzt ='01' then '年初计划'    
      when  pfm_84.jhzt ='02' then '新增'    
   when  pfm_84.jhzt ='03' then '调整'    
end 计划类别,    
'外部培训' 培训类型,    
 fsd.c_name as 培训类别,    
case when pfm_84.tr_project_type='1' then '重点班'    
 when pfm_84.tr_project_type='2' then '常规班'    
end 项目类型,    
 d.deptname as 组织部门,    
 m.pxrs 培训人数,    
 --费用总计 讲课酬金 讲师食宿差旅费 其他费用 学员食宿差旅费 广告费 文印费 培训费    
convert(decimal(10,2),m.fyys)  费用总计,    
null 讲课酬金,    
null 讲师食宿差旅费,    
convert(decimal(10,2),m.qtfy)  其他费用,    
convert(decimal(10,2),m.clf)  学员食宿差旅费,    
0 as 广告费,    
0 as 文印费,    
convert(decimal(10,2),m.pxf)  as 培训费,    
rylx.c_name 人员类型,    
ygzt.cname 员工状态,    
fg.oname 所在单位,    
hr.user_xrzw 现任职务,    
gwlb.c_name 岗位类别,    
gwcj.c_name 岗位层级,    
zw.cname 职位,    
zwcj.c_name 职位层级,    
zwlx.cname 职位类型,    
CONVERT(varchar(100), rzxx.bdt, 23) 任职时间,    
case when ((year(getDate())-year(rzxx.bdt))*12+month(getDate())-month(rzxx.bdt))/12=0 then convert(varchar(100),((year(getDate())-year(rzxx.bdt))*12+month(getDate())-month(rzxx.bdt))%12)+'个月' else     
convert(varchar(100),((year(getDate())-year(rzxx.bdt))*12+month(getDate())-month(rzxx.bdt))/12) +'年'+convert(varchar(100),((year(getDate())-year(rzxx.bdt))*12+month(getDate())-month(rzxx.bdt))%12)+'个月' end 同岗位任职年限,    
case when hr.sexno='1' then '男' when hr.sexno='2' then '女' end 性别,    
mz.c_name 民族,    
zzmm.c_name 政治面貌,    
    
CONVERT(varchar(100), hr2.birthday, 23)  as 出生日期,    
CONVERT(varchar(100), hr2.Wrkdt, 23) 工作时间,    
CONVERT(varchar(100),hr.CDt, 23)  入职时间,    
    
case     
when month(getdate())< month( hr2.birthday) then year(getdate()) - year(hr2.birthday)-1    
when month(getdate())> month( hr2.birthday) then year(getdate()) - year(hr2.birthday)    
when month(getdate())= month( hr2.birthday) and right(convert(varchar(100),getdate(),23),2)<right(convert(varchar(100),hr2.birthday,23),2)  then year(getdate()) - year(hr2.birthday)-1    
when month(getdate())= month( hr2.birthday) and right(convert(varchar(100),getdate(),23),2)>=right(convert(varchar(100),hr2.birthday,23),2)  then year(getdate()) - year(hr2.birthday)    
end 年龄,    
    
year(getdate())-year(hr2.wrkdt)+1 as 社会工龄,    
    
year(getdate())-year(hr.jdt)+1 as 企业工龄,    
    
f.c_name 职称名称,    
g.c_name 行政级别,    
gg.c_name 干部层级,    
(    
select    
初始学历    
from    
(    
select     
top (1) hr2.edt,    
hr2.eduorg 毕业院校,    
zgxl.c_name 初始学历    
from hr_epm_edu hr2  --教育经历表    
left join (select  phid,c_name,c_id from  fg_simple_data  where c_type='edulevel') zgxl on hr2.edugrade=zgxl.phid--最高学历    
where     
hr2.edustyle='1158'    
and hr2.must_phid=hr.phid    
order by hr2.edt desc    
) a    
) 初始学历,    
    
(    
select    
毕业院校    
from    
(    
select     
top (1) hr2.edt,    
hr2.eduorg 毕业院校,    
zgxl.c_name 初始学历,    
case when hr2.spec='无' then ''    
else hr2.spec end 所学专业    
from hr_epm_edu hr2  --教育经历表    
left join (select  phid,c_name,c_id from  fg_simple_data  where c_type='edulevel') zgxl on hr2.edugrade=zgxl.phid--最高学历    
where     
hr2.edustyle='1158'    
and hr2.must_phid=hr.phid    
order by hr2.edt desc    
) a    
) 初始毕业院校,    
(    
select    
毕业时间    
from    
(    
select     
top (1) hr2.edt,    
hr2.eduorg 毕业院校,    
zgxl.c_name 初始学历,    
case when hr2.spec='无' then ''    
else hr2.spec end 所学专业,    
CONVERT(varchar(100), hr2.bdt, 23) 入学时间,    
CONVERT(varchar(100), hr2.edt, 23) 毕业时间    
from hr_epm_edu hr2  --教育经历表    
left join (select  phid,c_name,c_id from  fg_simple_data  where c_type='edulevel') zgxl on hr2.edugrade=zgxl.phid--最高学历    
where     
hr2.edustyle='1158'    
and hr2.must_phid=hr.phid    
order by hr2.edt desc    
) a    
) 毕业时间,    
zgxl.c_name 最高学历,    
hee.eduorg 最高毕业院校,    
case when hee.spec='无' then ''    
else hee.spec end 最高所学专业,    
jndjlx.skillname 技能等级类型,    
jndj.skillname 技能等级,    
gz.c_name 工种,    
lxxx.Mobile1 手机号,    
rzly.c_name 入职来源,    
case     
when hr.user_sfyghwgzjl='1' then '是'    
when hr.user_sfyghwgzjl='2' then '否'    
else '' end as 是否有过海外工作经历,    
case     
when hr.user_sfdrgxmjlgw='1' then '是'    
when hr.user_sfdrgxmjlgw='2' then '否'    
else '' end  as 是否担任过项目经理岗位,    
case when user_sfgjnrc='1' then '是'    
     when user_sfgjnrc='2' then '否'end  as 是否是高技能领军人才,    
case when user_jsns='1' then '全国技术能手'    
     when user_jsns='2' then '省部级技术能手'    
  when user_jsns='3' then '全国五一劳动奖章'    
  when user_jsns='4' then '省部级五一劳动奖章'    
end  as 高技能领军人才类别,    
m.ocode as ocode,    
pxnd pxnd  
from p_form0000000096_d4  d4--外部受训人员1    
left join p_form0000000096_m m on m.phid=d4.m_code    
left join p_form0000000084_d pfm_84 on m.train_project=pfm_84.phid--培训项目名称    
left join fg_simple_data fsd on fsd.phid=m.pxlb  --培训类型    
left join dept d on d.phid=m.deptid --部门    
left join fg_simple_data fsd1 on fsd1.phid= pfm_84.lb    
left join  hr_epm_main hr on hr.phid=case when d4.userhelp_1 is not null then (select phid from hr_epm_main where phid=convert(varchar(100),d4.userhelp_1)) else d4.empid end    
left join fg_orglist fg on fg.phid=hr.cboo--关联组织    
left join dept dept on dept.phid=hr.dept--关联部门    
left join (select ocode,parentorg from fg_orgrelatitem where relatid='18') sjbm on dept.deptno=sjbm.ocode    
left join fg_orglist fg1 on sjbm.parentorg=fg1.ocode    
left join (select ocode,parentorg from fg_orgrelatitem where relatid='18') sjbm1 on sjbm.parentorg=sjbm1.ocode    
left join fg_orglist fg2 on sjbm1.parentorg=fg2.ocode    
left join fg_simple_data rylx on hr.emptype=rylx.phid and rylx.c_type='emptype'--人员类型    
left join hr_epm_base hr2 on hr.phid=hr2.ccode--员工基本信息表    
left join fg_ogm_station zzgw on hr2.station=zzgw.phid--组织岗位     
left join (select phid,cname from hr_base_enum where ctype='empstatus')ygzt on hr.EmpStatus=ygzt.phid--员工状态    
left join (select  phid,c_name from  fg_simple_data  where c_type='tectitle') f on f.phid=hr.jobtitle--职称    
left join (select  phid,c_name from  fg_simple_data  where c_type='pradmclass') g on hr.admclass=g.phid--行政级别    
left join (select  phid,c_name from  fg_simple_data  where c_type='gbcj') gg on hr.user_gbcj=gg.phid--干部层级    
left join hr_epm_edu hee on hee.must_phid=hr.phid and hee.IfHighEdugrade='1'  --工作经历勾选最高学历    
left join (select  phid,c_name,c_id from  fg_simple_data  where c_type='edulevel') zgxl on hee.edugrade=zgxl.phid--最高学历    
left join hr_epm_edu mhee on mhee.must_phid=hr.phid and mhee.IfHightestDegree='1'  --教育经历勾选最高学位      
left join (select  phid,c_name,c_id from  fg_simple_data  where  c_type = 'degree'  and (cancel_flg is null or cancel_flg=0)) zgxw on mhee.degree=zgxw.phid--最高学位    
left join (select  phid,c_name from  fg_simple_data  where c_type='political') zzmm on hr2.Political=zzmm.phid--政治面貌    
left join (select  phid,c_name from  fg_simple_data  where c_type='folk') mz on mz.phid=hr2.Folk--民族    
left join hr_epm_link lxxx on lxxx.ccode=hr.phid--联系信息    
left join hr_epm_station rzxx on hr.phid=rzxx.ccode and rzxx.assigntype='0'--任职信息表    
left join fg_ogm_station zzgw2 on  rzxx.station=zzgw2.phid    
left join fg_ogm_position zw on zzgw2.positioncode=zw.phid--职位    
left join (select phid,c_name from fg_simple_data where c_type='positionlevel') zwcj on zw.stationlevel=zwcj.phid--职位层级    
left join fg3_ogm_positiontype zwlx on zw.positiontype=zwlx.phid--职位类型    
left join (select phid,c_name from fg_simple_data where c_type='stationkind') gwlb on zzgw2.stationkind=gwlb.phid--岗位类别    
left join (select phid,c_name from fg_simple_data where c_type='stationlevel') gwcj on zzgw2.stationlevel=gwcj.phid--岗位层级    
left join (select  phid,c_name from  fg_simple_data  where c_type='certtype'  and (cancel_flg is null or cancel_flg=0)) sfz on sfz.phid = hr.cardtype --身份证类型    
left join (select  phid,c_name from  fg_simple_data  where (cancel_flg is null or cancel_flg=0) and c_type='rprtype' ) hk on hk.phid = hr2.rprtype--户口类型     
left join (select phid,c_name from fg_simple_data  where c_type = 'tectitlesuject'  and (cancel_flg is null or cancel_flg=0)) zczy on zczy.phid = hr.jobspecial --职称专业    
left join hr3_empskilltype jndjlx on jndjlx.phid = hr.skilltype --技能等级类型    
left join hr3_empskilldata jndj on jndj.phid = hr.skilldata --技能等级类型    
left join (select phid,c_name from fg_simple_data  where c_type = 'JobClass'  and (cancel_flg is null or cancel_flg=0)) gz on gz.phid = hr.jobclass    
left join (select phid,c_name from fg_simple_data  where c_type = 'entancesourse'  and (cancel_flg is null or cancel_flg=0)) rzly on rzly.phid = hr.recruittype    
left join hr_epm_finance bank on bank.ccode = hr.phid     
left join fg_simple_data fsd_yhlx on bank.user_yhlx=fsd_yhlx.phid and fsd_yhlx.c_type='banktype'    
left join hr_epm_cont hec on hec.must_phid=hr.phid  --员工合同信息    
    
left join     
(SELECT  ccode ,    
        cname = ( STUFF(( SELECT    ',' + cname    
                          FROM      (select rzxx.ccode,zzgw.cname from hr_epm_station rzxx    
left join fg_ogm_station zzgw on rzxx.station=zzgw.phid) s    
                          WHERE     ccode = Test.ccode    
                        FOR    
                          XML PATH('')    
                        ), 1, 1, '') )    
FROM    (select rzxx.ccode,zzgw.cname from hr_epm_station rzxx    
left join fg_ogm_station zzgw on rzxx.station=zzgw.phid) AS Test    
GROUP BY ccode) a on  a.ccode=hr.ccode    
left join (select hr.cno cno,max(edu.bdt) rxsj,max(edu.edt) bysj from hr_epm_edu edu    
left join hr_epm_main hr  on edu.must_phid=hr.phid    
group by hr.cno) edu on hr.cno=edu.cno    
where      
m.ischeck='1'    
    
union all    
     
select    
pxnd 开展培训年度,  
'外部培训申请表' as 类型,    
'受训人员2' as 参培学员类型,    
null 员工编码,    
textcol_1 员工姓名,    
 pfm_84.pxxmmc as 培训项目名称,    
 convert(decimal(10,2),m.ts)   as 培训时长_小时,    
case when  pfm_84.jhzt ='01' then '年初计划'    
      when  pfm_84.jhzt ='02' then '新增'    
   when  pfm_84.jhzt ='03' then '调整'    
end 计划类别,    
'外部培训' 培训类型,    
 fsd.c_name as 培训类别,    
case when pfm_84.tr_project_type='1' then '重点班'    
 when pfm_84.tr_project_type='2' then '常规班'    
end 项目类型,    
 d.deptname as 组织部门,    
  m.pxrs 培训人数,    
 --费用总计 讲课酬金 讲师食宿差旅费 其他费用 学员食宿差旅费 广告费 文印费 培训费    
 convert(decimal(10,2),m.fyys)  费用总计,    
null 讲课酬金,    
null 讲师食宿差旅费,    
 convert(decimal(10,2),m.qtfy)  其他费用,    
 convert(decimal(10,2),m.clf)   学员食宿差旅费,    
0 as 广告费,    
0 as 文印费,    
convert(decimal(10,2),m.pxf)  as 培训费,    
fsd1.c_name 人员类型,    
    
null 员工状态,    
fo.oname 所在单位,    
    
null 现任职务,    
d1.u_gwlbxt 岗位类别,    
null 岗位层级,    
null 职位,    
null 职位层级,    
null 职位类型,    
null 任职时间,    
null 同岗位任职年限,    
null 性别,    
null 民族,    
    
fsd2.c_name 政治面貌,    
    
null 出生日期,    
null 工作时间,    
null 入职时间,    
    
d1.u_nl 年龄,    
    
d1.u_shgl 社会工龄,    
    
null 企业工龄,    
    
d1.textcol_2 职称名称,    
null 行政级别,    
d1.u_gbcj 干部层级,    
null 初始学历,    
null 初始毕业院校,    
null 毕业时间,    
d1.u_zgxl 最高学历,    
null 最高毕业院校,    
null 最高所学专业,    
null 技能等级类型,    
null 技能等级,    
null 工种,    
null 手机号,    
null 入职来源,    
null 是否有过海外工作经历,    
null 是否担任过项目经理岗位,    
null 是否是高技能领军人才,    
null 高技能领军人才类别,    
m.ocode as ocode,  
pxnd pxnd  
from p_form0000000096_d1  d1--外部受训人员2    
left join p_form0000000096_m m on m.phid=d1.m_code    
left join p_form0000000084_d pfm_84 on m.train_project=pfm_84.phid--培训项目名称    
left join fg_simple_data fsd on fsd.phid=m.pxlb  --培训类型    
left join dept d on d.phid=m.deptid --部门    
left join fg_simple_data fsd1 on fsd1.phid=d1.u_yglx    
left join fg_orglist fo on fo.phid=d1.u_szdw    
left join fg_simple_data fsd2 on fsd2.phid=d1.u_zzmm  --政治面貌    
where m.ischeck='1';