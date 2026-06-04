-- 适配Seata分布式事务的OpenGauss SQL
UPDATE project_table 
SET 
  user_istbinspur = NULL, 
  user_tbinspurtime = NULL, 
  user_tblchs = NULL, 
  user_tblchstime = NULL, 
  user_ifnbfb = (SELECT user_ifnbfb FROM project_table WHERE phid = ? LIMIT 1), 
  user_gclx1 = (SELECT user_gclx1 FROM project_table WHERE phid = ? LIMIT 1), 
  user_gclx2 = (SELECT user_gclx2 FROM project_table WHERE phid = ? LIMIT 1), 
  user_gclx3 = (SELECT user_gclx3 FROM project_table WHERE phid = ? LIMIT 1), 
  phid_type = (SELECT phid_type FROM project_table WHERE phid = ? LIMIT 1), 
  user_pc_dept = (SELECT user_pc_dept FROM project_table WHERE phid = ? LIMIT 1), 
  user_lcywdy = (SELECT user_lcywdy FROM project_table WHERE phid = ? LIMIT 1), 
  user_xmbcl = (SELECT user_xmbcl FROM project_table WHERE phid = ? LIMIT 1), 
  user_cbfs = (SELECT user_cbfs FROM project_table WHERE phid = ? LIMIT 1), 
  user_wgrq = (SELECT user_wgrq FROM project_table WHERE phid = ? LIMIT 1), 
  job_phone = (SELECT job_phone FROM project_table WHERE phid = ? LIMIT 1), 
  user_mnemCodeInAccDepart = (SELECT user_mnemCodeInAccDepart FROM project_table WHERE phid = ? LIMIT 1), 
  user_sfhzjy = (SELECT user_sfhzjy FROM project_table WHERE phid = ? LIMIT 1), 
  user_sshy = (SELECT user_sshy FROM project_table WHERE phid = ? LIMIT 1), 
  user_hyxz = (SELECT user_hyxz FROM project_table WHERE phid = ? LIMIT 1), 
  user_clfs = (SELECT user_clfs FROM project_table WHERE phid = ? LIMIT 1), 
  user_gs_cybk = (SELECT user_gs_cybk FROM project_table WHERE phid = ? LIMIT 1), 
  user_xmgkms = (SELECT user_xmgkms FROM project_table WHERE phid = ? LIMIT 1), 
  user_cwbk = (SELECT user_cwbk FROM project_table WHERE phid = ? LIMIT 1), 
  user_cjms = (SELECT user_cjms FROM project_table WHERE phid = ? LIMIT 1), 
  user_tsxmmc = (SELECT user_tsxmmc FROM project_table WHERE phid = ? LIMIT 1), 
  user_jfdw = (SELECT user_jfdw FROM project_table WHERE phid = ? LIMIT 1), 
  record_manager = (SELECT user_baxmjl FROM project_table WHERE phid = ? LIMIT 1), 
  user_sfsczy = (SELECT user_sfsczy FROM project_table WHERE phid = ? LIMIT 1), 
  user_sftrj = (SELECT user_sftrj FROM project_table WHERE phid = ? LIMIT 1), 
  phid_fi_ocode = (SELECT phid_fi_ocode FROM project_table WHERE phid = ? LIMIT 1), 
  user_cwglbm = (SELECT user_cwglbm FROM project_table WHERE phid = ? LIMIT 1), 
  user_sbzysj = (SELECT user_sbzysj FROM project_table WHERE phid = ? LIMIT 1), 
  user_sbjzdxm = (SELECT user_sbjzdxm FROM project_table WHERE phid = ? LIMIT 1), 
  user_yztzrq = (SELECT user_yztzrq FROM project_table WHERE phid = ? LIMIT 1), 
  user_tzhjgrq = (SELECT user_tzhjgrq FROM project_table WHERE phid = ? LIMIT 1), 
  user_tzhzgq = (SELECT user_tzhzgq FROM project_table WHERE phid = ? LIMIT 1) 
WHERE 
  phid = (SELECT phid_ori FROM project_table WHERE phid = ? LIMIT 1) 
  AND user_istbinspur <> '4'

-- 新增适配Seata的SQL
UPDATE project_table 
SET fact_start_dt = a.u_sjkgrq, 
    stat = 'sts', 
    ng_update_dt = CURRENT_TIMESTAMP 
FROM 
  (SELECT u_sjkgrq, phid_pc FROM p_form0000700545_m WHERE phid = ? LIMIT 1) a 
WHERE 
  a.phid_pc = project_table.phid;