SELECT
  zz.oname AS 所属单位,
  bm.deptname AS 所属部门,
  hr.bill_name AS 员工姓名,
  hr.bill_no AS 员工编码,
  CASE
    WHEN hr.sexno = '1' THEN
      '男'
    WHEN hr.sexno = '2' THEN
      '女'
  END AS 性别,
  COALESCE (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday) :: INTEGER, '未知') AS 年龄,
  zzgw2.bill_name AS 工作岗位,
  rylx.c_name AS 人员类型,
  ygzt.cname AS 员工状态,
  TO_CHAR(hr.cdt, 'yyyy-mm-dd') AS 入职日期,
  ht.probterm AS 试用期限,
  TO_CHAR(ht.pbdt, 'yyyy-mm-dd') AS 试用开始日期,
  TO_CHAR(ht.pedt, 'yyyy-mm-dd') AS 试用结束日期,
  zz2.oname 合同甲方,
  htlx.c_name 合同类型,
  qdfs.c_name 签订方式,
  ht.contno 合同编号,
  TO_CHAR(ht.signdt, 'yyyy-mm-dd') AS 签订日期,
  ht.conterm 合同期限,
  TO_CHAR(ht.cbdt, 'yyyy-mm-dd') AS 合同开始日期,
  TO_CHAR(ht.cedt, 'yyyy-mm-dd') AS 合同结束日期,
  CAST(ht.cedt AS DATE) - CURRENT_DATE AS 合同剩余天数,
  CASE
    WHEN CAST(ht.cedt AS DATE) - CURRENT_DATE >= 120 THEN
      '正常'
    WHEN CAST(ht.cedt AS DATE) - CURRENT_DATE >= 1 THEN
      '即将过期'
    WHEN CAST(ht.cedt AS DATE) - CURRENT_DATE <= 0 THEN
      '过期'
  END AS 合同状态,
  ht.SendPlace AS 派遣机构,
  rzly.c_name 入职来源,
  zgxl.c_name 最高学历
FROM
  hr_epm_cont ht
  LEFT JOIN hr_epm_main hr ON hr.ccode = ht.ccode
  LEFT JOIN fg_orglist zz ON hr.phid_org = zz.phid
  LEFT JOIN dept bm ON hr.phid_dept = bm.phid
  LEFT JOIN hr_epm_base hr2 ON hr.phid = hr2.ccode -- 员工基本信息表取ccode
  LEFT JOIN fg_ogm_station zzgw ON hr2.station = zzgw.phid --组织岗位
  LEFT JOIN (SELECT phid, cname FROM hr_base_enum WHERE ctype = 'empstatus') ygzt ON hr.EmpStatus = ygzt.phid -- 员工状态
  LEFT JOIN fg_simple_data rylx ON hr.emptype = rylx.phid
  AND rylx.c_type = 'emptype' -- 人员类型
  LEFT JOIN fg_orglist zz2 ON ht.firstside = zz2.phid
  LEFT JOIN hr_epm_station rzxx ON hr.phid = rzxx.ccode
  AND rzxx.assigntype = '0' -- 任职信息表
  LEFT JOIN fg_ogm_station zzgw2 ON rzxx.station = zzgw2.phid
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'contype') htlx ON ht.contype = htlx.phid
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'signkind') qdfs ON ht.signkind = qdfs.phid
  LEFT JOIN fg_simple_data rzly ON hr.recruittype = rzly.phid
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'edulevel') zgxl ON hr2.edulevel = zgxl.phid -- 最高学历
WHERE
  hr.phid_org = @ocode
  AND hr.c_status = '3'
ORDER BY
  zz.ocode