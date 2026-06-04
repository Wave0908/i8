select 
--dt.parent_orgid,
fg.oname 单位名称, 
--w.phid_emp ,
--hr.cno,
cast(dense_rank()over(order by fg.oname,hr.cardno) as int) 排名,
hr.cname 姓名,
(case hr.sexno when 1 then '男' when '2' then '女' end) as  性别,
hrs.Birthday 生日,
case 
when month(getdate())< month( hrs.birthday) then year(getdate()) - year(hrs.birthday)-1 
when month(getdate())> month( hrs.birthday) then year(getdate()) - year(hrs.birthday) 
when month(getdate())= month( hrs.birthday) and right(convert(varchar(100),getdate(),23),2)<right(convert(varchar(100),hrs.birthday,23),2)  then year(getdate()) - year(hrs.birthday)-1 
when month(getdate())= month( hrs.birthday) and right(convert(varchar(100),getdate(),23),2)>=right(convert(varchar(100),hrs.birthday,23),2)  then year(getdate()) - year(hrs.birthday)
end 年龄,
hr.cardno 身份证号,
mz.c_name 民族,
zzmm.c_name 政治面貌,
hrs.Gradschool 毕业院校,
--hrs.edulevel,
xl.c_name 最高学历, 
--hr.dept,
dt.deptname 职能机构,
--hrs.Station,
fgo.cname 现岗位,
--hr.jobtitle,
te.c_name 职称,
--hr.empstatus,
zz.cname 在职状态,
--hr.emptype,
lx.c_name 员工类型 ,
w.Phid_Level,d.cname  证书等级,
zszy_zxzy.zszy as 证书专业,
zszy_zxzy.zxzy as 增项专业,
w.cno 证书编号,
w.certsavecno 证书存档编号,
zszy_zxzy.yxkssj 有效开始日期,
zszy_zxzy.yxjssj 有效结束日期,
--w.phid_name,
m.cname 证书名称,
case w.c_status when '1' then '正常' when '2' then '过期' when '3' then '遗失' when '4' then '注销' when '5' then '转出'end 证书状态,
reg_dept 注册单位,
--m.phid_type,
wn.cname 证书类型, 
CASE WHEN zszy_zxzy.zxzy='' THEN w.senddt ELSE zszy_zxzy.senddt END 发证日期,
(case w.borrowflg when 0 then '未借用' when '1' then '已借用' end) as 借用状态,
jyr.cname 借用人,
jyrbm.deptname 借用人部门,
jyrzz.oname 借用人组织
from wm3_cert_empcert  w
left join wm3_cert_basedata d on d.phid=w.Phid_Level
left join wm3_cert_name_emp m on  m.phid=w.phid_name
left join wm3_cert_basedata z on  z.phid= w.phid_major
left join hr_epm_main  hr on hr.phid =w.phid_emp
left join dept dt on dt.phid =hr.dept
left join fg_orglist fg on fg.phid=dt.parent_orgid  
left join hr_epm_base hrs on hrs.must_phid =w.phid_emp
left join fg_simple_data te on te.phid=hr.jobtitle   
left join fg_ogm_station fgo on fgo.phid=hrs.Station
left join wm3_cert_type_emp  wn on wn.phid=m.phid_type
left join hr_base_enum zz on zz.phid=hr.empstatus
left join fg_simple_data lx on lx.phid =hr.emptype
left join fg_simple_data xl on xl.phid=hrs.edulevel
left join (select distinct w.phid_borrower,hm.cname,f.oname,d.deptname from wm3_cert_empcert w
left join hr_epm_main hm on hm.phid = w.phid_borrower
left join fg_orglist f on f.phid = hm.cboo
left join dept d on d.phid = hm.dept ) hem on hem.phid_borrower = w.phid_borrower
left join hr_epm_main jyr on w.phid_borrower=jyr.phid
left join fg_orglist jyrzz on jyr.cboo=jyrzz.phid
left join dept jyrbm on jyr.dept=jyrbm.phid
LEFT JOIN  (select phid,c_name from fg_simple_data where c_type='political') zzmm on hrs.Political=zzmm.phid
left join  (select  phid,c_name from  fg_simple_data  where c_type='folk') mz on hrs.folk=mz.phid
left join
(
select wce.phid,wcb.cname as zszy,'' as zxzy,wce.effectbdt as yxkssj,wce.effectedt as yxjssj,wce.senddt AS senddt from wm3_cert_empcert wce
left join wm3_cert_basedata wcb on  wcb.phid= wce.phid_major
union 
select wce.phid,'' as zszy,wcb.cname as zxzy,wcnm.checkbdt as yxkssj,wcnm.checkedt yxjssj,wcnm.registerdt AS senddt from wm3_cert_new_major wcnm 
left join wm3_cert_empcert wce on wce.phid =wcnm.pphid  
left join wm3_cert_basedata wcb on  wcb.phid= wcnm.phid_major
where type='2'  
) zszy_zxzy on zszy_zxzy.phid=w.phid
where hr.c_status = '3' and dt.parent_orgid=@parent_orgid [query] 
order by fg.oname,排名 ,w.cno desc,zszy_zxzy.zszy desc ,zszy_zxzy.zxzy desc