SELECT
--dt.parent_orgid,
fg.oname AS 单位名称,
--w.phid_emp ,
--hr.cno,
CAST(DENSE_RANK() OVER (ORDER BY fg.oname, hr.cardno) AS INT) AS 排名,
hr.bill_name AS 姓名,
(CASE hr.sexno WHEN 1 THEN '男' WHEN '2' THEN '女' END) AS 性别,
hrs.Birthday AS 生日,
-- 年龄使用 GaussDB 的 age + date_part 计算，更稳妥
date_part('year', age(current_date, hrs.birthday)) AS 年龄,
hr.cardno AS 身份证号,
mz.c_name AS 民族,
zzmm.c_name AS 政治面貌,
hrs.Gradschool AS 毕业院校,
--hrs.edulevel,
xl.c_name AS 最高学历,
--hr.dept,
dt.deptname AS 职能机构,
--hrs.Station,
fgo.bill_name AS 现岗位,
--hr.jobtitle,
te.c_name AS 职称,
--hr.empstatus,
zz.cname AS 在职状态,
--hr.emptype,
lx.c_name AS 员工类型,
w.Phid_Level,
d.bill_name AS 证书等级,
zszy_zxzy.zszy AS 证书专业,
zszy_zxzy.zxzy AS 增项专业,
w.bill_no AS 证书编号,
w.certsavecno AS 证书存档编号,
zszy_zxzy.yxkssj AS 有效开始日期,
zszy_zxzy.yxjssj AS 有效结束日期,
--w.phid_name,
m.bill_name AS 证书名称,
CASE
w.c_status
WHEN '1' THEN '正常'
WHEN '2' THEN '过期'
WHEN '3' THEN '遗失'
WHEN '4' THEN '注销'
WHEN '5' THEN '转出'
END AS 证书状态,
reg_dept AS 注册单位,
--m.phid_type,
wn.bill_name AS 证书类型,
CASE
WHEN zszy_zxzy.zxzy = '' THEN w.senddt
ELSE zszy_zxzy.senddt
END AS 发证日期,
(CASE w.borrowflg WHEN 0 THEN '未借用' WHEN '1' THEN '已借用' END) AS 借用状态,
jyr.bill_name AS 借用人,
jyrbm.deptname AS 借用人部门,
jyrzz.oname AS 借用人组织
FROM
wm3_cert_empcert w
LEFT JOIN wm3_cert_basedata d ON d.phid = w.Phid_Level
LEFT JOIN wm3_cert_name_emp m ON m.phid = w.phid_name
LEFT JOIN wm3_cert_basedata z ON z.phid = w.phid_major
LEFT JOIN hr_epm_main hr ON hr.phid = w.phid_emp
LEFT JOIN dept dt ON dt.phid = hr.phid_dept
LEFT JOIN fg_orglist fg ON fg.phid = dt.parent_orgid
LEFT JOIN hr_epm_base hrs ON hrs.pphid = w.phid_emp
LEFT JOIN fg_simple_data te ON te.phid = hr.jobtitle
LEFT JOIN fg_ogm_station fgo ON fgo.phid = hrs.Station
LEFT JOIN wm3_cert_type_emp wn ON wn.phid = m.phid_type
LEFT JOIN hr_base_enum zz ON zz.phid = hr.empstatus
LEFT JOIN fg_simple_data lx ON lx.phid = hr.emptype
LEFT JOIN fg_simple_data xl ON xl.phid = hrs.edulevel
LEFT JOIN (
SELECT DISTINCT
w.phid_borrower,
hm.bill_name,
f.oname,
d.deptname
FROM
wm3_cert_empcert w
LEFT JOIN hr_epm_main hm ON hm.phid = w.phid_borrower
LEFT JOIN fg_orglist f ON f.phid = hm.phid_org
LEFT JOIN dept d ON d.phid = hm.phid_dept
) hem ON hem.phid_borrower = w.phid_borrower
LEFT JOIN hr_epm_main jyr ON w.phid_borrower = jyr.phid
LEFT JOIN fg_orglist jyrzz ON jyr.phid_org = jyrzz.phid
LEFT JOIN dept jyrbm ON jyr.phid_dept = jyrbm.phid
LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'political') zzmm ON hrs.Political = zzmm.phid
LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'folk') mz ON hrs.folk = mz.phid
LEFT JOIN (
SELECT
wce.phid,
wcb.bill_name AS zszy,
'' AS zxzy,
wce.effectbdt AS yxkssj,
wce.effectedt AS yxjssj,
wce.senddt AS senddt
FROM
wm3_cert_empcert wce
LEFT JOIN wm3_cert_basedata wcb ON wcb.phid = wce.phid_major
UNION
SELECT
wce.phid,
'' AS zszy,
wcb.bill_name AS zxzy,
wcnm.checkbdt AS yxkssj,
wcnm.checkedt AS yxjssj,
wcnm.registerdt AS senddt
FROM
wm3_cert_new_major wcnm
LEFT JOIN wm3_cert_empcert wce ON wce.phid = wcnm.phid_cert
LEFT JOIN wm3_cert_basedata wcb ON wcb.phid = wcnm.phid_major
WHERE
wcb.TYPE = '2'
) zszy_zxzy ON zszy_zxzy.phid = w.phid
WHERE
hr.c_status = '3'

AND dt.parent_orgid = @parent_orgid
ORDER BY
fg.oname, 排名,
w.bill_no DESC,
zszy_zxzy.zszy DESC,
zszy_zxzy.zxzy DESC;
