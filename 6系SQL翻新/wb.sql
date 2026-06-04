SELECT
  pxnd 开展培训年度,
  '外部培训申请表' AS 类型,
  '受训人员1' AS 参培学员类型,
  CAST(hr.bill_no AS VARCHAR(100)) 员工编码,
  hr.bill_name 员工姓名,
  pfm_84.pxxmmc AS 培训项目名称,
  CAST(ts AS DECIMAL(10, 2)) AS 培训时长_小时,
  CASE
    WHEN pfm_84.jhzt = '01' THEN
      '年初计划'
    WHEN pfm_84.jhzt = '02' THEN
      '新增'
    WHEN pfm_84.jhzt = '03' THEN
      '调整'
  END 计划类别,
  '外部培训' 培训类型,
  fsd.c_name AS 培训类别,
  CASE
    WHEN pfm_84.tr_project_type = '1' THEN
      '重点班'
    WHEN pfm_84.tr_project_type = '2' THEN
      '常规班'
  END 项目类型,
  d.deptname AS 组织部门,
  m.pxrs 培训人数,
  --费用总计 讲课酬金 讲师食宿差旅费 其他费用 学员食宿差旅费 广告费 文印费 培训费
  CAST(m.fyys AS DECIMAL(10, 2)) 费用总计,
  NULL 讲课酬金,
  NULL 讲师食宿差旅费,
  CAST(m.qtfy AS DECIMAL(10, 2)) 其他费用,
  CAST(m.clf AS DECIMAL(10, 2)) 学员食宿差旅费,
  0 AS 广告费,
  0 AS 文印费,
  CAST(m.pxf AS DECIMAL(10, 2)) AS 培训费,
  rylx.c_name 人员类型,
  ygzt.cname 员工状态,
  fg.oname 所在单位,
  hr.user_xrzw 现任职务,
  gwlb.c_name 岗位类别,
  gwcj.c_name 岗位层级,
  zw.bill_name 职位,
  zwcj.c_name 职位层级,
  zwlx.bill_name 职位类型,
  TO_CHAR(rzxx.bdt, 'YYYY-MM-DD') 任职时间,
  CASE
    WHEN (
        (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt)
      ) / 12 = 0 THEN
      CAST(
        (
          (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt)
        ) % 12 AS VARCHAR(100)
      ) || '个月'
    ELSE
      CAST(
        (
          (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt)
        ) / 12 AS VARCHAR(100)
      ) || '年' || CAST(
        (
          (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM rzxx.bdt)) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - EXTRACT(MONTH FROM rzxx.bdt)
        ) % 12 AS VARCHAR(100)
      ) || '个月'
  END 同岗位任职年限,
  CASE
    WHEN hr.sexno = '1' THEN
      '男'
    WHEN hr.sexno = '2' THEN
      '女'
  END 性别,
  mz.c_name 民族,
  zzmm.c_name 政治面貌,
  TO_CHAR(hr2.birthday, 'YYYY-MM-DD') AS 出生日期,
  TO_CHAR(hr2.Wrkdt, 'YYYY-MM-DD') 工作时间,
  TO_CHAR(hr.CDt, 'YYYY-MM-DD') 入职时间,
  CASE
    WHEN EXTRACT(MONTH FROM CURRENT_DATE) < EXTRACT(MONTH FROM hr2.birthday) THEN
      EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday) - 1
    WHEN EXTRACT(MONTH FROM CURRENT_DATE) > EXTRACT(MONTH FROM hr2.birthday) THEN
      EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday)
    WHEN EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM hr2.birthday)
      AND EXTRACT(DAY FROM CURRENT_DATE) < EXTRACT(DAY FROM hr2.birthday) THEN
      EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday) - 1
    WHEN EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM hr2.birthday)
      AND EXTRACT(DAY FROM CURRENT_DATE) >= EXTRACT(DAY FROM hr2.birthday) THEN
      EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.birthday)
  END 年龄,
  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr2.wrkdt) + 1 AS 社会工龄,
  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr.jdt) + 1 AS 企业工龄,
  f.c_name 职称名称,
  g.c_name 行政级别,
  gg.c_name 干部层级,
  (
    SELECT
      a.初始学历
    FROM
      (
        SELECT
          hr2.edt,
          hr2.eduorg 毕业院校,
          zgxl.c_name AS 初始学历
        FROM
          hr_epm_edu hr2 --教育经历表
          LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'edulevel') zgxl ON hr2.edugrade = zgxl.phid --最高学历
        WHERE
          hr2.edustyle = '1158'
          AND hr2.pphid = hr.phid
        ORDER BY
          hr2.edt DESC
        LIMIT 1
      ) a
  ) 初始学历,
  (    SELECT      a.毕业院校    FROM      (        SELECT          hr2.edt,          hr2.eduorg AS 毕业院校,          zgxl.c_name AS 初始学历,          CASE            WHEN hr2.spec = '无' THEN              ''            ELSE              hr2.spec          END AS 所学专业        FROM          hr_epm_edu hr2          LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'edulevel') zgxl ON hr2.edugrade = zgxl.phid      WHERE          hr2.edustyle = '1158'          AND hr2.pphid = hr.phid        ORDER BY          hr2.edt DESC        LIMIT 1      ) a  ) 初始毕业院校,
  (    SELECT      a.毕业时间    FROM      (        SELECT          hr2.edt,          hr2.eduorg AS 毕业院校,          zgxl.c_name AS 初始学历,          CASE            WHEN hr2.spec = '无' THEN              ''            ELSE              hr2.spec          END AS 所学专业,          TO_CHAR(hr2.bdt, 'YYYY-MM-DD') AS 入学时间,          TO_CHAR(hr2.edt, 'YYYY-MM-DD') AS 毕业时间        FROM          hr_epm_edu hr2         LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'edulevel') zgxl ON hr2.edugrade = zgxl.phid        WHERE          hr2.edustyle = '1158'          AND hr2.pphid = hr.phid        ORDER BY          hr2.edt DESC        LIMIT 1      ) a  ) 毕业时间,
  zgxl.c_name 最高学历,
  hee.eduorg 最高毕业院校,
  CASE
    WHEN hee.spec = '无' THEN
      ''
    ELSE
      hee.spec
  END 最高所学专业,
  jndjlx.skillname 技能等级类型,
  jndj.skillname 技能等级,
  gz.c_name 工种,
  lxxx.Mobile1 手机号,
  rzly.c_name 入职来源,
  CASE
    WHEN hr.user_sfyghwgzjl = '1' THEN
      '是'
    WHEN hr.user_sfyghwgzjl = '2' THEN
      '否'
    ELSE
      ''
  END AS 是否有过海外工作经历,
  CASE
    WHEN hr.user_sfdrgxmjlgw = '1' THEN
      '是'
    WHEN hr.user_sfdrgxmjlgw = '2' THEN
      '否'
    ELSE
      ''
  END AS 是否担任过项目经理岗位,
  CASE
    WHEN user_sfgjnrc = '1' THEN
      '是'
    WHEN user_sfgjnrc = '2' THEN
      '否'
  END AS 是否是高技能领军人才,
  CASE
    WHEN user_jsns = '1' THEN
      '全国技术能手'
    WHEN user_jsns = '2' THEN
      '省部级技术能手'
    WHEN user_jsns = '3' THEN
      '全国五一劳动奖章'
    WHEN user_jsns = '4' THEN
      '省部级五一劳动奖章'
  END AS 高技能领军人才类别,
  m.phid_org AS phid_org,
  pxnd pxnd
FROM
  p_form0000000096_d4 d4 --外部受训人员1
  LEFT JOIN p_form0000000096_m m ON m.phid = d4.pphid
  LEFT JOIN p_form0000000084_d pfm_84 ON m.train_project = pfm_84.phid --培训项目名称
  LEFT JOIN fg_simple_data fsd ON fsd.phid = m.pxlb --培训类型
  LEFT JOIN dept d ON d.phid = m.deptid --部门
  LEFT JOIN fg_simple_data fsd1 ON fsd1.phid = pfm_84.lb
  LEFT JOIN hr_epm_main hr ON hr.phid =
  CASE
    WHEN d4.userhelp_1 IS NOT NULL THEN
      (SELECT phid FROM hr_epm_main WHERE phid = CAST(d4.userhelp_1 AS VARCHAR(100)) LIMIT 1)
    ELSE
      d4.empid
  END LEFT JOIN fg_orglist fg ON fg.phid = hr.phid_org --关联组织
  LEFT JOIN dept dept ON dept.phid = hr.phid_dept --关联部门
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON dept.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg1 ON sjbm.parentorg = fg1.ocode
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm1 ON sjbm.parentorg = sjbm1.ocode
  LEFT JOIN fg_orglist fg2 ON sjbm1.parentorg = fg2.ocode
  LEFT JOIN fg_simple_data rylx ON hr.emptype = rylx.phid
  AND rylx.c_type = 'emptype' --人员类型
  LEFT JOIN hr_epm_base hr2 ON hr.phid = hr2.ccode --员工基本信息表
  LEFT JOIN fg_ogm_station zzgw ON hr2.station = zzgw.phid --组织岗位
  LEFT JOIN (SELECT phid, cname FROM hr_base_enum WHERE ctype = 'empstatus') ygzt ON hr.EmpStatus = ygzt.phid --员工状态
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'tectitle') f ON f.phid = hr.jobtitle --职称
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'pradmclass') g ON hr.admclass = g.phid --行政级别
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'gbcj') gg ON hr.user_gbcj = gg.phid --干部层级
  LEFT JOIN hr_epm_edu hee ON hee.pphid = hr.phid
  AND hee.IfHighEdugrade = '1' --工作经历勾选最高学历
  LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'edulevel') zgxl ON hee.edugrade = zgxl.phid --最高学历
  LEFT JOIN hr_epm_edu mhee ON mhee.pphid = hr.phid
  AND mhee.IfHightestDegree = '1' --教育经历勾选最高学位
  LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'degree' AND (cancel_flg IS NULL OR cancel_flg = 0)) zgxw ON mhee.DEGREE = zgxw.phid --最高学位
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'political') zzmm ON hr2.Political = zzmm.phid --政治面貌
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'folk') mz ON mz.phid = hr2.Folk --民族
  LEFT JOIN hr_epm_link lxxx ON lxxx.ccode = hr.phid --联系信息
  LEFT JOIN hr_epm_station rzxx ON hr.phid = rzxx.ccode
  AND rzxx.assigntype = '0' --任职信息表
  LEFT JOIN fg_ogm_station zzgw2 ON rzxx.station = zzgw2.phid
  LEFT JOIN fg_ogm_position zw ON zzgw2.positioncode = zw.phid --职位
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'positionlevel') zwcj ON zw.stationlevel = zwcj.phid --职位层级
  LEFT JOIN fg3_ogm_positiontype zwlx ON zw.positiontype = zwlx.phid --职位类型
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'stationkind') gwlb ON zzgw2.stationkind = gwlb.phid --岗位类别
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'stationlevel') gwcj ON zzgw2.stationlevel = gwcj.phid --岗位层级
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'certtype' AND (cancel_flg IS NULL OR cancel_flg = 0)) sfz ON sfz.phid = hr.cardtype --身份证类型
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE (cancel_flg IS NULL OR cancel_flg = 0) AND c_type = 'rprtype') hk ON hk.phid = hr2.rprtype --户口类型
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'tectitlesuject' AND (cancel_flg IS NULL OR cancel_flg = 0)) zczy ON zczy.phid = hr.jobspecial --职称专业
  LEFT JOIN hr3_empskilltype jndjlx ON jndjlx.phid = hr.skilltype --技能等级类型
  LEFT JOIN hr3_empskilldata jndj ON jndj.phid = hr.skilldata --技能等级类型
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'JobClass' AND (cancel_flg IS NULL OR cancel_flg = 0)) gz ON gz.phid = hr.jobclass
  LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'entancesourse' AND (cancel_flg IS NULL OR cancel_flg = 0)) rzly ON rzly.phid = hr.recruittype
  LEFT JOIN hr_epm_finance bank ON bank.ccode = hr.phid
  LEFT JOIN fg_simple_data fsd_yhlx ON bank.user_yhlx = fsd_yhlx.phid
  AND fsd_yhlx.c_type = 'banktype'
  LEFT JOIN hr_epm_cont hec ON hec.pphid = hr.phid --员工合同信息
  LEFT JOIN (
    SELECT
      ccode,
      bill_name = (
        STRING_AGG(bill_name, ',' ORDER BY ccode)
        )
        FROM
          (SELECT rzxx.ccode, zzgw.bill_name FROM hr_epm_station rzxx LEFT JOIN fg_ogm_station zzgw ON rzxx.station = zzgw.phid) AS Test
        GROUP BY
          ccode,bill_name
      ) a ON a.ccode = hr.ccode
      LEFT JOIN (
        SELECT
          hr.bill_no bill_no,
          MAX(edu.bdt) rxsj,
          MAX(edu.edt) bysj
        FROM
          hr_epm_edu edu
          LEFT JOIN hr_epm_main hr ON edu.pphid = hr.phid
        GROUP BY
          hr.bill_no
      ) edu ON hr.bill_no = edu.bill_no
    WHERE
      m.app_status = '1' UNION ALL
    SELECT
      pxnd 开展培训年度,
      '外部培训申请表' AS 类型,
      '受训人员2' AS 参培学员类型,
      NULL 员工编码,
      textcol_1 员工姓名,
      pfm_84.pxxmmc AS 培训项目名称,
      CAST(m.ts AS DECIMAL(10, 2)) AS 培训时长_小时,
      CASE
        WHEN pfm_84.jhzt = '01' THEN
          '年初计划'
        WHEN pfm_84.jhzt = '02' THEN
          '新增'
        WHEN pfm_84.jhzt = '03' THEN
          '调整'
      END 计划类别,
      '外部培训' 培训类型,
      fsd.c_name AS 培训类别,
      CASE
        WHEN pfm_84.tr_project_type = '1' THEN
          '重点班'
        WHEN pfm_84.tr_project_type = '2' THEN
          '常规班'
      END 项目类型,
      d.deptname AS 组织部门,
      m.pxrs 培训人数,
      --费用总计 讲课酬金 讲师食宿差旅费 其他费用 学员食宿差旅费 广告费 文印费 培训费
      CAST(m.fyys AS DECIMAL(10, 2)) 费用总计,
      NULL 讲课酬金,
      NULL 讲师食宿差旅费,
      CAST(m.qtfy AS DECIMAL(10, 2)) 其他费用,
      CAST(m.clf AS DECIMAL(10, 2)) 学员食宿差旅费,
      0 AS 广告费,
      0 AS 文印费,
      CAST(m.pxf AS DECIMAL(10, 2)) AS 培训费,
      fsd1.c_name 人员类型,
      NULL 员工状态,
      fo.oname 所在单位,
      NULL 现任职务,
      d1.u_gwlbxt 岗位类别,
      NULL 岗位层级,
      NULL 职位,
      NULL 职位层级,
      NULL 职位类型,
      NULL 任职时间,
      NULL 同岗位任职年限,
      NULL 性别,
      NULL 民族,
      fsd2.c_name 政治面貌,
      NULL 出生日期,
      NULL 工作时间,
      NULL 入职时间,
      d1.u_nl 年龄,
      d1.u_shgl 社会工龄,
      NULL 企业工龄,
      d1.textcol_2 职称名称,
      NULL 行政级别,
      d1.u_gbcj 干部层级,
      NULL 初始学历,
      NULL 初始毕业院校,
      NULL 毕业时间,
      d1.u_zgxl 最高学历,
      NULL 最高毕业院校,
      NULL 最高所学专业,
      NULL 技能等级类型,
      NULL 技能等级,
      NULL 工种,
      NULL 手机号,
      NULL 入职来源,
      NULL 是否有过海外工作经历,
      NULL 是否担任过项目经理岗位,
      NULL 是否是高技能领军人才,
      NULL 高技能领军人才类别,
      m.phid_org AS phid_org,
      pxnd pxnd
    FROM
      p_form0000000096_d1 d1 --外部受训人员2
      LEFT JOIN p_form0000000096_m m ON m.phid = d1.pphid
      LEFT JOIN p_form0000000084_d pfm_84 ON m.train_project = pfm_84.phid --培训项目名称
      LEFT JOIN fg_simple_data fsd ON fsd.phid = m.pxlb --培训类型
      LEFT JOIN dept d ON d.phid = m.deptid --部门
      LEFT JOIN fg_simple_data fsd1 ON fsd1.phid = d1.u_yglx
      LEFT JOIN fg_orglist fo ON fo.phid = d1.u_szdw
      LEFT JOIN fg_simple_data fsd2 ON fsd2.phid = d1.u_zzmm --政治面貌
    WHERE
      m.app_status = '1'