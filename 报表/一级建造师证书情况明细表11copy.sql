select
fg.oname 单位名称,
cast(dense_rank()over(order by fg.oname,hem.cardno) as int) 排名,
hem.cname 姓名,
case hem.sexno when 1 then '男' when '2' then '女' end as  性别,
birthday 生日,
case 
when month(getdate())< month( heb.birthday) then year(getdate()) - year(heb.birthday)-1 
when month(getdate())> month( heb.birthday) then year(getdate()) - year(heb.birthday) 
when month(getdate())= month( heb.birthday) and right(convert(varchar(100),getdate(),23),2)<right(convert(varchar(100),heb.birthday,23),2)  then year(getdate()) - year(heb.birthday)-1 
when month(getdate())= month( heb.birthday) and right(convert(varchar(100),getdate(),23),2)>=right(convert(varchar(100),heb.birthday,23),2)  then year(getdate()) - year(heb.birthday)
end 年龄,
mz.c_name 民族,
zzmm.c_name 政治面貌,
heb.Gradschool 毕业院校,
xl.c_name 最高学历,
dt.deptname 职能机构,
fgo.cname 现任岗位,
te.c_name 职称,
zz.cname 在职状态,
lx.c_name 员工类型 ,
d.cname  证书等级,
zszy_zxzy.zszy as 证书专业,
zszy_zxzy.zxzy as 增项专业,
w.cno 证书编号,
w.certsavecno 证书存档编号,
zszy_zxzy.yxkssj 有效开始日期,
zszy_zxzy.yxjssj 有效结束日期,
m.cname 证书名称,
case w.c_status when '1' then '正常' when '2' then '过期' when '3' then '遗失' when '4' then '注销' when '5' then '转出'end 证书状态,
w.reg_dept 注册单位,
wn.cname 证书类型, 
CASE WHEN zszy_zxzy.zxzy='' THEN w.senddt ELSE zszy_zxzy.senddt END 发证日期,
(case w.borrowflg when 0 then '未借用' when '1' then '已借用' end) as 借用状态,
jyr.cname 借用人,
jyrbm.deptname 借用人部门,
jyrzz.oname 借用人组织

from
hr_epm_main hem
left
join
wm3_cert_empcert w on hem.phid =w.phid_emp --员工证书列表
left join dept dt on dt.phid =hem.dept --部门
left join fg_orglist fg on fg.phid=dt.parent_orgid --组织
left join hr_epm_base heb on heb.must_phid =w.phid_emp --员工基本信息
left join  (select  phid,c_name from  fg_simple_data  where c_type='folk') mz on heb.folk=mz.phid --民族
LEFT JOIN  (select phid,c_name from fg_simple_data where c_type='political') zzmm on heb.Political=zzmm.phid --政治面貌
left join fg_simple_data xl on xl.phid=heb.edulevel --学历
left join fg_ogm_station fgo on fgo.phid=heb.Station --岗位
left join fg_simple_data te on te.phid=hem.jobtitle --职称
left join hr_base_enum zz on zz.phid=hem.empstatus --在职状态
left join fg_simple_data lx on lx.phid =hem.emptype --员工类型
left join wm3_cert_basedata d on d.phid=w.Phid_Level --证书等级
left join
(
select wce.phid,wcb.cname as zszy,'' as zxzy,wce.effectbdt as yxkssj,wce.effectedt as yxjssj,wce.senddt AS senddt from wm3_cert_empcert wce
left join wm3_cert_basedata wcb on  wcb.phid= wce.phid_major
union 
select wce.phid,'' as zszy,wcb.cname as zxzy,wcnm.checkbdt as yxkssj,wcnm.checkedt yxjssj,wcnm.registerdt AS senddt from wm3_cert_new_major wcnm 
left join wm3_cert_empcert wce on wce.phid =wcnm.pphid  
left join wm3_cert_basedata wcb on  wcb.phid= wcnm.phid_major
where type='2'  
) zszy_zxzy on zszy_zxzy.phid=w.phid --证书专业
left join wm3_cert_name_emp m on  m.phid=w.phid_name --证书名称
left join wm3_cert_type_emp  wn on wn.phid=m.phid_type --证书类型
left join hr_epm_main jyr on w.phid_borrower=jyr.phid --借用人
left join fg_orglist jyrzz on jyr.cboo=jyrzz.phid --借用人组织
left join dept jyrbm on jyr.dept=jyrbm.phid --借用人部门
where hem.c_status = '3' and dt.parent_orgid=@parent_orgid [query] 
and w.cno is null
order by fg.oname,排名 ,w.cno desc,zszy_zxzy.zszy desc ,zszy_zxzy.zxzy desc