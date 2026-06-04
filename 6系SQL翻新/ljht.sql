SELECT
  m.bill_no AS u_htbm,
  m.phid AS u_htmc,
  m.bill_name AS u_htmc_EXName,
  pt.fact_start_dt,
  pt.fact_end_dt,
  pt.bill_no AS project_no,
  pt.bill_name AS project_name,
  ss.descript AS u_xmzt,
  m.phid_customer_ent AS u_zwdwmc,
  fe.compname AS u_zwdwmc_EXName,
  fe.fromtype AS fromtype,
  m.phid_org AS ng_phid_org,
  fo.oname AS ng_phid_org_EXName,
  m.cnt_sum_vat_fc AS u_hte,
  m.zfbl AS u_hthkbl,
  m.user_zbjbl AS u_zbjbl,
  m.user_zbj AS u_zbjje,
  ajxx.phid AS ajxx,
  ajxx.u_jbaq AS u_sswtms1,
  ajxx.u_fasj AS u_qssj,
  ajjz.u_jtansmqk AS u_sswtms,
  ajjz.bill_dt AS u_qssj1,
  ssb.u_ssbs AS u_sfyss,
  rgp.phid AS u_province,
  rgc.phid AS u_city,
  rga.phid AS u_region,
  CAST (rgp.provincename AS VARCHAR) AS u_province_exname,
  CAST (rgc.cityname AS VARCHAR) AS u_city_exname,
  CAST (rga.regionname AS VARCHAR) AS u_region_exname,
  pt.ab AS u_xmjc,
  pt.user_jfdw as u_yzdwmc,
  fe1.compname AS u_yzdwmc_EXName,
  pt.fact_end_dt as u_xmjgsj,
  m.Signdt as u_htqdsj,
  m.end_dt as end_dt,
  m.user_zbjqx as user_zbjqx,
  kd.bqkd as u_ljkd 
  
FROM
  project_table pt
  LEFT JOIN pcm3_cnt_m m ON pt.pc = m.phid_pc
  LEFT JOIN fg3_enterprise fe ON fe.phid = m.phid_customer_ent
  left join fg3_enterprise fe1 on fe1.phid = pt.user_jfdw
  LEFT JOIN fg_orglist fo ON fo.phid = m.phid_org
  LEFT JOIN pcm3_cnt_type pct ON m.cnt_type = pct.phid
  LEFT JOIN stats ss ON pt.stat = ss.stat
  LEFT JOIN p_form0000700618_m ajxx ON ajxx.u_saxm = pt.pc
  LEFT JOIN p_form0000700603_m ajjz ON CAST (ajjz.userhelp_1 AS VARCHAR) = ajxx.phid
  LEFT JOIN p_form0000700610_m ssb ON ssb.u_ajxz = ajxx.phid
  LEFT JOIN fg3_region rgp ON rgp.phid = pt.provinceid
  LEFT JOIN fg3_region rgc ON rgc.phid = pt.cityid
  LEFT JOIN fg3_region rga ON rga.phid = pt.regionid
  left join pcm3_cnt_pay_m pcpm on pcpm.phid_cnt = m.phid
  left join   (select phid_cnt,sum(app_amt_vat_fc) as bqkd from pcm3_cnt_pay_m
  left join pcm3_cnt_m on pcm3_cnt_m.phid = pcm3_cnt_pay_m.phid_cnt group by phid_cnt) kd on kd.phid_cnt = m.phid
WHERE
  (pct.cnt_mode = 1 OR pct.cnt_mode = 3)
  AND fe.accstop = 0
  AND m.app_status = 1
  AND pt.pc = @pc
ORDER BY
  ajjz.bill_dt,
  ajxx.u_fasj;
  