CREATE OR REPLACE FUNCTION get_monthly_project_report(uyear varchar DEFAULT '2023', mon varchar DEFAULT '12', ocode varchar DEFAULT 'A1001')
RETURNS TABLE (
  责任单位 varchar,
  项目编码_合同编码 varchar,
  工程名称 varchar,
  所属项目部名称 varchar,
  业主名称 varchar,
  企业类型 varchar,
  项目所在地区 varchar,
  区县 varchar,
  项目所属行业 varchar,
  二级工程类型 varchar,
  业主代表及联系电话 varchar,
  承建模式 varchar,
  合同开工日期 varchar,
  合同竣工日期 varchar,
  合同工期_天 varchar,
  业主调整日期含签证 varchar,
  调整后竣工日期 varchar,
  调整后总工期 varchar,
  合同额_万元 numeric,
  管理人员人数 numeric,
  作业人员人数 numeric,
  项目状态 varchar,
  项目管理规划大纲审批日期 varchar,
  项目部成立日期 varchar,
  项目管理目标责任书签订日期 varchar,
  项目管理实施规划审批日期 varchar,
  项目经理姓名及电话 varchar,
  备案项目经理姓名及电话 varchar,
  党工委书记姓名及电话 varchar,
  项目总工姓名及电话 varchar,
  工程经理姓名及电话 varchar,
  商务经理姓名及电话 varchar,
  安全经理姓名及电话 varchar,
  内部开工审批日期 varchar,
  外部开工报告审批日期 varchar,
  项目实际开工日期 varchar,
  计划竣工日期 varchar,
  预计竣工日期 varchar,
  本月完成产值_万元 numeric,
  当年累计完成产值_万元 numeric,
  自开工累计完成产值_万元 numeric,
  施工阶段 varchar,
  项目进度预警级别 varchar,
  项目进度计划偏差值天 varchar,
  简要说明偏差原因 varchar,
  停工开始日期 varchar,
  计划复工日期 varchar,
  实际复工日期 varchar,
  累计实际停工天数 numeric,
  停工原因 varchar,
  原因简要描述 varchar,
  实体完工日期 varchar,
  责任单位_1 varchar,
  审批日期 varchar,
  是否投融建 varchar,
  特殊项目 varchar,
  上报中冶时间 varchar,
  省部级重点项目 varchar,
  是否为本月新增项目 varchar,
  备注 varchar,
  是否内部分包 varchar
) AS $$
BEGIN
RETURN QUERY SELECT
  CAST(fg.oname AS varchar) 责任单位,
  CAST(pt.bill_no AS varchar)  项目编码_合同编码,
  CAST(pt.bill_name AS varchar)  工程名称,
  CAST(dt.oname AS varchar) 所属项目部名称,
  CAST(wldw.compname AS varchar) 业主名称 ,
  CAST(khlx.descript AS varchar) 企业类型,
  CAST(COALESCE(gj.nat_name, '') || COALESCE(sf.cname, '') || COALESCE(ct.cname, '') AS varchar) 项目所在地区,
  CAST(qx.regionname AS varchar) 区县,
  CAST(lx.type_name AS varchar) 项目所属行业,
  CAST(wt_gclx.type_name AS varchar) 二级工程类型,
  CAST(pt.job_phone AS varchar) 业主代表及联系电话,
  --pd5.gs_mc 承包模式,
  CAST(CASE
    WHEN pt.user_cjms = '1' THEN
      '工程总承包'
    WHEN pt.user_cjms = '2' THEN
      '施工总承包'
    WHEN pt.user_cjms = '3' THEN
      '专业承包'
    WHEN pt.user_cjms = '4' THEN
      '投融建'
    WHEN pt.user_cjms = '5' THEN
      '其它'
  END AS varchar) AS 承建模式,
  CAST(to_char(pt.start_date, 'YYYY-MM-DD') AS varchar) 合同开工日期,
  CAST(to_char(pt.end_date, 'YYYY-MM-DD') AS varchar) 合同竣工日期,
  CAST(pt.limit_time AS varchar) '合同工期_天',
  CAST(user_yztzrq AS varchar) 业主调整日期含签证,
  CAST(user_tzhjgrq AS varchar) 调整后竣工日期,
  CAST(user_tzhzgq AS varchar) 调整后总工期,
  pt.approx_contract_fc / 10000 '合同额_万元',
  glry.glry 管理人员人数,
  zyry.zyry 作业人员人数,
  CAST(zt.descript AS varchar) 项目状态,
  CAST(to_char(ghdg.app_dt, 'YYYY-MM-DD') AS varchar) 项目管理规划大纲审批日期,
  CAST(to_char(xmbcl.app_dt, 'YYYY-MM-DD') AS varchar) 项目部成立日期,
  CAST(to_char(zrs.app_dt, 'YYYY-MM-DD') AS varchar) 项目管理目标责任书签订日期,
  CAST(to_char(ssghsp.app_dt, 'YYYY-MM-DD') AS varchar) 项目管理实施规划审批日期,
  CAST(hr.bill_name || hl.mobile1 AS varchar) 项目经理姓名及电话,
  CAST(hr2.bill_name || hl2.mobile1 AS varchar) 备案项目经理姓名及电话 ,
  CAST(xmry.s_name || xmry.hdt AS varchar) 党工委书记姓名及电话,
  CAST(xmry2.s_name || xmry2.hdt AS varchar) 项目总工姓名及电话,
  CAST(xmry3.s_name || xmry3.hdt AS varchar) 工程经理姓名及电话,
  CAST(xmry4.s_name || xmry4.hdt AS varchar) 商务经理姓名及电话 ,
  CAST(xmry5.s_name || xmry5.hdt AS varchar) 安全经理姓名及电话,
  CAST(to_char(kg.reo_scdt, 'YYYY-MM-DD') AS varchar) 内部开工审批日期, --取自开工报告内部开工报告日期
  CAST(to_char(kg.kgbg_dt, 'YYYY-MM-DD') AS varchar) 外部开工报告审批日期, --取自开工报告外部开工报告日期
  CAST(to_char(pf545_m.u_sjkgrq, 'YYYY-MM-DD') AS varchar) 项目实际开工日期,
  CAST(to_char(pt.user_jhjgrq, 'YYYY-MM-DD') AS varchar) 计划竣工日期,
  CAST(to_char(pt.user_wgrq + INTERVAL '3 month', 'YYYY-MM-DD') AS varchar) 预计竣工日期,
  sjcztb.bycz '本月完成产值_万元',
  sjcztb.bncz / 10000 '当年累计完成产值_万元',
  sjcztb.klcz / 10000 '自开工累计完成产值_万元',
  CAST(jdqk.sgjd AS varchar) 施工阶段,
  CAST(jdqk.jdyj AS varchar) 项目进度预警级别,
  --jdqk.jdzt 项目进度状态,
  CAST(jdqk.pcts AS varchar) 项目进度计划偏差值天,
  CAST(jdqk.pcyy AS varchar) 简要说明偏差原因,
  --jdqk.yyxz 原因性质,
  CAST(to_char(tg.gh_dt, 'YYYY-MM-DD') AS varchar) 停工开始日期,
  CAST(to_char(tg.user_jhfg, 'YYYY-MM-DD') AS varchar) 计划复工日期,
  CAST(to_char(tg.user_sjfgrq, 'YYYY-MM-DD') AS varchar) 实际复工日期,
  -- case when tg.reono <>'' then DATEDIFF(day , case when convert(varchar(7),tg.gh_dt,120)=convert(varchar(7), DATEADD(MM,DATEDIFF(MM,0,@uyear+@mon+'08'),0),120)  then tg.gh_dt else  DATEADD(MM,DATEDIFF(MM,0,@uyear+@mon+'08'),0)  end, case when convert(varchar(7),tg.user_jhfg,120)=convert(varchar(7), DATEADD(MS,-3,DATEADD(MM, DATEDIFF(m,0,@uyear+@mon+'08')+1, 0)),120)  then tg.user_jhfg else DATEADD(MS,-3,DATEADD(MM, DATEDIFF(m,0,@uyear+@mon+'08')+1, 0))  end)+1 else '' end AS 本月停工天数,
  ljtg.累计停工 累计实际停工天数,
  CAST(tg.user_tyyy AS varchar) 停工原因,
  CAST(tg.tg_why AS varchar) 原因简要描述,
  --tg.user_zrf 停工责任方,
  --tg.user_djyzsp 是否向业主递交索赔报告,
  --bysk.amt/10000 本月实收工程款万元 ,
  --bnsk.amt/10000 本年实收工程款万元,
  --klsk.amt/10000 开工累计实收工程款万元,
  --pt.cnt_amt_fc/10000 按合同约定应收款万元,
  CAST(to_char(pt.user_wgrq, 'YYYY-MM-DD') AS varchar) 实体完工日期,
  --case when pt.user_zlsfyj='1' then '是' else '否' end 资料是否移交,
  --to_char(pt.fact_end_dt, 'YYYY-MM-DD') 竣工验收日期,
  --to_char(jg.user_xmbcx, 'YYYY-MM-DD') '计划/实际_项目部撤销日期',
  CAST(fg.oname AS varchar) 责任单位,
  CAST(to_char(pt.app_dt, 'YYYY-MM-DD') AS varchar) AS 审批日期,
  CAST(CASE
    WHEN pt.user_sftrj = '1' THEN
      '是'
    WHEN pt.user_sftrj = '2' THEN
      '否'
    ELSE
      pt.user_sftrj
  END AS varchar) AS 是否投融建,
  CAST(CASE
    WHEN pt.user_tsxmmc = '1' THEN
      '正常项目'
    WHEN pt.user_tsxmmc = '2' THEN
      '因政府干预无法接入平合项目'
    WHEN pt.user_tsxmmc = '3' THEN
      '涉密项目'
    WHEN pt.user_tsxmmc = '4' THEN
      '军民融合项目'
    WHEN pt.user_tsxmmc = '5' THEN
      '项目合同工期低于3个月项目'
    WHEN pt.user_tsxmmc = '6' THEN
      '钢厂检修项目'
    WHEN pt.user_tsxmmc = '7' THEN
      '生产协力项目'
    ELSE
      pt.user_tsxmmc
  END AS varchar) AS 特殊项目,
  CAST(pt.user_sbzysj AS varchar) AS 上报中冶时间,
  CAST(qfzdxm.c_name AS varchar) AS 省部级重点项目,
  --convert(varchar(100),year(pt.app_dt))+right('00'+convert(varchar(100),month(pt.app_dt)),2) as a,
  --uyear||mon as b,
  CAST(CASE
    WHEN to_char(pt.app_dt, 'YYYY') || right('00' || to_char(pt.app_dt, 'MM'), 2) = get_monthly_project_report.uyear || get_monthly_project_report.mon THEN
      '是'
    ELSE
      '否'
  END AS varchar) AS 是否为本月新增项目,
  CAST(NULL AS varchar) 备注,
  CAST(CASE
    WHEN pt.user_ifnbfb = '1' THEN
      '是'
    ELSE
      '否'
  END AS varchar) 是否内部分包
FROM
  project_table pt
  LEFT JOIN p_form0000700545_m pf545_m ON pf545_m.phid = pt.phid --项目内部开工审批表
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
  LEFT JOIN fg_orglist dt ON dt.phid = pt.user_pc_dept --所属项目部
  LEFT JOIN fg3_enterprise wldw ON pt.phid_company = wldw.phid
  LEFT JOIN (SELECT * FROM fg3_customfile WHERE ng_insert_dt IN (SELECT MAX(ng_insert_dt) FROM fg3_customfile GROUP BY phid_ent)) khxx ON wldw.phid = khxx.phid_ent --客户信息
  LEFT JOIN custclass khlx ON khxx.custclass_id = khlx.phid
  AND groupshareflg = '1' --客户类型
  LEFT JOIN nation gj ON gj.phid = pt.countryid --国家
  LEFT JOIN fg3_region sf ON sf.phid = pt.provinceid --省份
  LEFT JOIN fg3_region ct ON ct.phid = pt.cityid --城市
  LEFT JOIN p_form0000000257_d sshy ON sshy.phid = pt.user_sshy --项目所属行业
  --left join p_form0000000257_d pd5 on pd5.phid=pt.user_cjms and pd5.zd='项目信息-承包方式'
  LEFT JOIN (
    SELECT
      to_char(u_sbyf, 'YYYY') || '-' || to_char(u_sbyf, 'MM') || '-01' AS u_sbyf,
      phid_pc AS pc,
      SUM(u_xcty) glry,
      SUM(u_xcry) zyry
    FROM
      p_form0000700080_m
    GROUP BY
        phid_pc,
      to_char(u_sbyf, 'YYYY') || '-' || to_char(u_sbyf, 'MM') || '-01'
  ) glry ON glry.pc = pt.phid
  AND EXTRACT(YEAR FROM CAST(glry.u_sbyf AS date)) = CAST(uyear AS integer)
  AND EXTRACT(MONTH FROM CAST(glry.u_sbyf AS date)) = CAST(mon AS integer) --作业人员
  --管理人员人数
  LEFT JOIN stats zt ON zt.stat = pt.stat --项目状态表
  LEFT JOIN p_form0000000245_m zrs ON zrs.phid_pc = pt.phid
  AND zrs.app_status = 1 --目标责任书
  LEFT JOIN hr_epm_main hr ON hr.phid = pt.project_manager
  AND hr.phid <> 0--项目经理
  LEFT JOIN hr_epm_main hr2 ON hr2.phid = pt.record_manager
  AND hr2.phid <> 0 --备案项目经理
  LEFT JOIN hr_epm_link hl ON hl.pphid = pt.project_manager
  AND hl.pphid <> 0 --项目经理联系方式
  LEFT JOIN hr_epm_link hl2 ON hl2.pphid = pt.record_manager
  AND hl2.pphid <> 0 --备案项目经理联系方式
  LEFT JOIN reort_t_m kg ON kg.phid_pc = pt.phid
  AND kg.reo_type = 1
  AND kg.app_status = 1 --开工报告
  LEFT JOIN reort_t_m tg ON tg.phid_pc = pt.phid
  AND tg.app_status = 1
  AND tg.reo_type = 2
  AND tg.app_status = 1
  AND to_char(tg.gh_dt, 'YYYYMM') <= get_monthly_project_report.uyear || get_monthly_project_report.mon
  AND to_char(tg.user_jhfg, 'YYYYMM') >= get_monthly_project_report.uyear || get_monthly_project_report.mon
  --停工
  LEFT JOIN (SELECT
      tg.phid_pc AS pc,
      SUM(
        (CASE
          WHEN to_char(tg.user_jhfg, 'YYYY-MM') <= to_char((CAST(get_monthly_project_report.uyear || get_monthly_project_report.mon || '01' AS date) + INTERVAL '1 month' - INTERVAL '1 day'), 'YYYY-MM') THEN
            tg.user_jhfg
          ELSE
            (CAST(get_monthly_project_report.uyear || get_monthly_project_report.mon || '01' AS date) + INTERVAL '1 month' - INTERVAL '1 day')
        END - tg.gh_dt) + 1
      ) 累计停工
    FROM
      reort_t_m tg
    WHERE
      tg.app_status = 1
      AND tg.reo_type = 2
      AND to_char(tg.gh_dt, 'YYYYMM') <= get_monthly_project_report.uyear || get_monthly_project_report.mon
    GROUP BY
      tg.phid_pc
  ) ljtg ON ljtg.pc = pt.phid
  --left join reort_t_m rg on rg.phid_pc = pt.phid and rg.app_status = 1 and rg.reo_type = 3 and rg.app_status = 1 --复工
  LEFT JOIN reort_t_m jg ON jg.phid_pc = pt.phid
  AND jg.app_status = '1'
  AND jg.reo_type = '4'
  LEFT JOIN fg_orglist fg ON fg.phid = pt.phid_org
  LEFT JOIN wbs_type lx ON lx.phid = pt.phid_type --项目类型
  LEFT JOIN project_attr sx ON lx.phid_projprop = sx.phid --项目属性
  LEFT JOIN emp_chg_other xmry ON pt.phid = xmry.phid_pc
  AND xmry.proj_station = '224211214000006'
  AND xmry.del_flg <> '1'
  LEFT JOIN emp_chg_other xmry2 ON pt.phid = xmry2.phid_pc
  AND xmry2.proj_station = '224211222000006'
  AND xmry2.del_flg <> '1'
  LEFT JOIN emp_chg_other xmry3 ON pt.phid = xmry3.phid_pc
  AND xmry3.proj_station = '224210721001187'
  AND xmry3.del_flg <> '1'
  LEFT JOIN emp_chg_other xmry4 ON pt.phid = xmry4.phid_pc
  AND xmry4.proj_station = '224210721001191'
  AND xmry4.del_flg <> '1'
  LEFT JOIN emp_chg_other xmry5 ON pt.phid = xmry5.phid_pc
  AND xmry5.proj_station = '224210721001189'
  AND xmry5.del_flg <> '1'
  LEFT JOIN p_form0000000165_m xmbcl ON pt.user_xmbcl = xmbcl.phid --项目部成立
  LEFT JOIN p_form0000700034_m jdqk ON jdqk.phid_pc = pt.phid
  AND jdqk.app_status = '1'
  AND jdqk.uyear = get_monthly_project_report.uyear
  AND jdqk.mon = get_monthly_project_report.mon --进度情况
  LEFT JOIN (SELECT * FROM p_form0000000030_m WHERE app_dt IN (SELECT MIN(app_dt) FROM p_form0000000030_m GROUP BY gcxm)) ssghsp ON pt.phid = ssghsp.gcxm
  AND ssghsp.app_status = '1' --实施规划审批
  LEFT JOIN (
    SELECT
      to_char(u_sbyf, 'YYYY') || '-' || to_char(u_sbyf, 'MM') || '-01' AS u_sbyf,
      phid_pc AS pc,
      SUM(u_xcty) glry,
      SUM(u_xcry) zyry
    FROM
      p_form0000700080_m
    GROUP BY
       phid_pc,
      to_char(u_sbyf, 'YYYY') || '-' || to_char(u_sbyf, 'MM') || '-01'
  ) zyry ON zyry.pc = pt.phid
  AND EXTRACT(YEAR FROM CAST(zyry.u_sbyf AS date)) = CAST(get_monthly_project_report.uyear AS integer)
  AND EXTRACT(MONTH FROM CAST(zyry.u_sbyf AS date)) = CAST(get_monthly_project_report.mon AS integer) --作业人员
  LEFT JOIN (SELECT phid_pc AS pc, * FROM p_form0000700035_m) ghdg ON ghdg.pc = pt.phid
  LEFT JOIN (
    SELECT
      phid_pc AS pc,
      to_char(fw.bdt, 'YYYY-MM-DD') AS bdt,
      SUM(COALESCE(CAST(pca.amt_sum / 10000 AS DECIMAL(22, 6)), 0)) + SUM(COALESCE(CAST(pca.user_bywccz / 10000 AS DECIMAL(22, 6)), 0)) AS bycz,
      SUM(COALESCE(CAST(pca.user_bnwcczbhs / 10000 AS DECIMAL(22, 6)), 0)) + SUM(COALESCE(CAST(pca.user_bnwcczdysj / 10000 AS DECIMAL(22, 6)), 0)) AS bncz,
      SUM(COALESCE(CAST(pca.user_klwcczbhs / 10000 AS DECIMAL(22, 6)), 0)) + SUM(COALESCE(CAST(pca.user_klwcczdysj / 10000 AS DECIMAL(22, 6)), 0)) AS klcz
    FROM
      pms3_cz_act_m pca
      LEFT JOIN fg3_workcycle fw ON fw.phid = pca.phid_cycle --周期帮助
    GROUP BY
       phid_pc,
      to_char(fw.bdt, 'YYYY-MM-DD')
  ) sjcztb ON sjcztb.pc = pt.phid
  AND EXTRACT(YEAR FROM CAST(bdt AS date)) = CAST(get_monthly_project_report.uyear AS integer)
  AND EXTRACT(MONTH FROM CAST(bdt AS date)) = CAST(get_monthly_project_report.mon AS integer)
  --left join(
  --select u_htbh,sum(amt) amt from p_form0000000267_m
  --where EXTRACT(YEAR FROM ywrq) = uyear::integer and EXTRACT(MONTH FROM ywrq) = mon::integer
  --group by u_htbh
  --)bysk on htgl.ware_htbm=bysk.u_htbh--本月收款
  --left join(
  --select u_htbh,sum(amt) amt from p_form0000000267_m
  --where EXTRACT(YEAR FROM ywrq) = uyear::integer and EXTRACT(MONTH FROM ywrq) <= mon::integer
  --group by u_htbh
  --)bnsk on htgl.ware_htbm=bnsk.u_htbh--本年收款
  --left join(
  --select u_htbh,sum(amt) amt from p_form0000000267_m
  --where to_char(ywrq, 'YYYYMM') <= uyear || mon
  --group by u_htbh
  --)klsk on htgl.ware_htbm=klsk.u_htbh--开累收款
  LEFT JOIN (SELECT phid, regionno, regionname FROM fg3_region WHERE treelevel = 3) qx ON qx.phid = pt.regionid
  LEFT JOIN wbs_type wt_gclx ON wt_gclx.phid = pt.user_gclx2
  LEFT JOIN (SELECT phid, c_no, c_name FROM fg_simple_data WHERE c_type = 'qfzdxm' AND (cancel_flg IS NULL OR cancel_flg = 0)) qfzdxm ON qfzdxm.phid = pt.user_sbjzdxm
WHERE
  pt.app_status = '1'
  AND pt.bill_flg = '1'
  AND fg.ocode = get_monthly_project_report.ocode
  AND pt.bill_name NOT LIKE'%不区分%'
  AND pt.bill_name NOT LIKE'%测试项目%'
  AND pt.bill_name NOT LIKE'%任跃%'
  AND pt.bill_name NOT LIKE'%功能测试%'
  AND pt.bill_name NOT IN ('集团标准库项目', '曹雪芹公园项目')
  AND to_char(pt.app_dt, 'YYYYMM') <= get_monthly_project_report.uyear || get_monthly_project_report.mon
  AND sx.phid = '4'
  --and pt.phid_app in('313191217001298','313191217000673')
  AND virtual_flg = 4 
ORDER BY
  fg.ocode,
  xmbcl.app_dt,
  dt.oname;
END;
$$ LANGUAGE plpgsql;
-- 使用默认参数
-- SELECT * FROM get_monthly_project_report();

-- 或者指定参数
-- SELECT * FROM get_monthly_project_report('2024', '01', 'A1001');