SELECT
  fg.oname 单位名称,
  CAST (DENSE_RANK() OVER (ORDER BY fg.oname, hem.cardno) AS INT) 排名,
  hem.bill_name 姓名,
  CASE
    hem.sexno
    WHEN 1 THEN
      '男'
    WHEN '2' THEN
      '女'
  END AS 性别,
  birthday 生日,
 date_part('year', age(current_date, heb.birthday)) AS 年龄,
  mz.c_name 民族,
  mz.c_name 民族,
  zzmm.c_name 政治面貌,
  heb.Gradschool 毕业院校,
  xl.c_name 最高学历,
  dt.deptname 职能机构,
  fgo.bill_name 现任岗位,
  te.c_name 职称,
  zz.cname 在职状态,
  lx.c_name 员工类型 ,
  d.bill_name 证书等级,
  zszy_zxzy.zszy AS 证书专业,
  zszy_zxzy.zxzy AS 增项专业,
  w.bill_no 证书编号,
  w.certsavecno 证书存档编号,
  zszy_zxzy.yxkssj 有效开始日期,
  zszy_zxzy.yxjssj 有效结束日期,
  m.bill_name 证书名称,
  CASE
    w.c_status
    WHEN '1' THEN
      '正常'
    WHEN '2' THEN
      '过期'
    WHEN '3' THEN
      '遗失'
    WHEN '4' THEN
      '注销'
    WHEN '5' THEN
      '转出'
  END 证书状态,
  w.reg_dept 注册单位,
  wn.bill_name 证书类型,
  CASE
    WHEN zszy_zxzy.zxzy = '' THEN
      w.senddt
    ELSE
      zszy_zxzy.senddt
  END 发证日期,
  (CASE w.borrowflg WHEN 0 THEN '未借用' WHEN '1' THEN '已借用' END) AS 借用状态,
  jyr.bill_name 借用人,
  jyrbm.deptname 借用人部门,
  jyrzz.oname 借用人组织
FROM
  hr_epm_main hem
  LEFT JOIN wm3_cert_empcert w ON hem.phid = w.phid_emp --员工证书列表
  LEFT JOIN dept dt ON dt.phid = hem.phid_dept --部门
  LEFT JOIN fg_orglist fg ON fg.phid = dt.parent_orgid --组织
  LEFT JOIN hr_epm_base heb ON heb.pphid = w.phid_emp --员工基本信息
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'folk') mz ON heb.folk = mz.phid --民族
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'political') zzmm ON heb.Political = zzmm.phid --政治面貌
  LEFT JOIN fg_simple_data xl ON xl.phid = heb.edulevel --学历
  LEFT JOIN fg_ogm_station fgo ON fgo.phid = heb.Station --岗位
  LEFT JOIN fg_simple_data te ON te.phid = hem.jobtitle --职称
  LEFT JOIN hr_base_enum zz ON zz.phid = hem.empstatus --在职状态
  LEFT JOIN fg_simple_data lx ON lx.phid = hem.emptype --员工类型
  LEFT JOIN wm3_cert_basedata d ON d.phid = w.Phid_Level --证书等级
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
      LEFT JOIN wm3_cert_basedata wcb ON wcb.phid = wce.phid_major UNION
    SELECT
      wce.phid,
      '' AS zszy,
      wcb.bill_name AS zxzy,
      wcnm.checkbdt AS yxkssj,
      wcnm.checkedt yxjssj,
      wcnm.registerdt AS senddt
    FROM
      wm3_cert_new_major wcnm
      LEFT JOIN wm3_cert_empcert wce ON wce.phid = wcnm.phid_major
      LEFT JOIN wm3_cert_basedata wcb ON wcb.phid = wcnm.phid_major
    WHERE
      TYPE = '2'
  ) zszy_zxzy ON zszy_zxzy.phid = w.phid --证书专业
  LEFT JOIN wm3_cert_name_emp m ON m.phid = w.phid_name --证书名称
  LEFT JOIN wm3_cert_type_emp wn ON wn.phid = m.phid_type --证书类型
  LEFT JOIN hr_epm_main jyr ON w.phid_borrower = jyr.phid --借用人
  LEFT JOIN fg_orglist jyrzz ON jyr.phid_org = jyrzz.phid --借用人组织
  LEFT JOIN dept jyrbm ON jyr.phid_dept = jyrbm.phid --借用人部门
WHERE
  hem.c_status = '3'
  AND dt.parent_orgid = @parent_orgid
  AND w.bill_no IS NULL
ORDER BY
  fg.oname, 排名,
  w.bill_no DESC,
  zszy_zxzy.zszy DESC,
  zszy_zxzy.zxzy DESC