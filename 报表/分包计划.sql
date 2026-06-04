SELECT
  concat(COALESCE(d.u_fbgcmc, ''), ' ', COALESCE(d.u_bd, '')) AS u_fbgcmc_text,
  d.u_sgnr AS u_zbfw,
  d.u_bd AS u_bdhf,
  d.u_zbsj AS u_cgsj,
  d.u_jhtc AS u_jcsj,
  d.u_zzyq AS u_zzdjyq,
  d.u_ntrrs AS u_ntrrs,
  p.target_excl_tax_amt AS u_ewzb
FROM
  p_form_0000000023_m m -- 分包计划
  LEFT JOIN p_form_0000000023_d d ON d.pphid = m.phid
  LEFT JOIN pms3_dynamic_contract cm ON cm.phid_pc = m.phid_pc
  LEFT JOIN pms3_dynamic_cont_pk p ON p.pphid = cm.phid
--   AND p.cont_pack_name = c.cont_pack_name
WHERE
  m.phid_pc = '569000000000778'
  and cm.is_history = '0'
