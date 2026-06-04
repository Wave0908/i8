SELECT
  m.u_sfwhzxm,
  m.u_sfxyss,
  d.u_jfdwxz,
  d.u_jfdwlsdwmc,
  d.u_htbm,
  d.u_htmc,
  d.u_hte,
  d.u_ljkd,
  d.u_ljhk,
  d.u_zjxj,
  d.u_jsxj,
  d.u_month2,
  d.u_month3_6,
  d.u_month7_12,
  d.u_year1_2,
  d.u_year2_3,
  d.u_year3up,
  d.u_sjyszkzl,
  d.u_ywwj1,
  d.u_ywwj1_2,
  d.u_ywwj2_3,
  d.u_ywwj3up,
  d.u_swch1,
  d.u_swch1_2,
  d.u_swch2_3,
  d.u_swch3up,
  d.u_sjysws,
  d.u_sfzynb,
  d.u_yfksfaqsh,
  d.u_wtms,
  d.u_sfyzlwtrwhk,
  d.u_zlwtms,
  d.u_zbjsfaqsh,
  d.u_zbjwtms,
  d.u_sfylyywtrwhk,
  d.u_lywtms,
  d.u_zbjdqsj,
  m.u_yzdwmc,
  m.u_yzdwxz,
  m.u_xmzzyzj,
  m.u_xmjgsj,
  d.u_sxswwbkd,
  d.u_wjqr,
  d.u_zlfk,
  d.u_qt,
  d.u_ljkd1,
  d.u_dyzqrzz,
  d.u_abs,
  d.u_zcphtc,
  d.u_qt1,
  d.u_ljhk1,
  d.u_byyszk,
  d.u_yzzzje,
  d.u_sjyszk,
  d.u_ywwjch,
  d.u_swch,
  d.u_ljhj,
  d.u_sfw2nwjs,
  d.u_sfw2nyjs,
  d.u_htqdsj,
  d.u_swddfktjdkd,
  d.u_swkhdyskje,
  d.u_sfyhz,
  d.u_hzdjje,
  d.u_hzhkje2025,
  d.u_jsyywfhkje,
  d.u_ywwjchje,
  d.u_sryywfyjej
FROM
  p_form_liangjintianbao_m m
  LEFT JOIN p_form_liangjintianbao_d1 d ON d.pphid = m.phid
  LEFT JOIN project_table pt ON pt.pc = m.phid_pc
  LEFT JOIN fg3_workcycle w1 ON w1.phid = m.u_tongjizhouqi
  LEFT JOIN fg3_workcycle w2 ON w2.phid = @zq
WHERE
  pt.pc = @pc
  AND m.app_status = '1'
  AND w1.bdt = (
    SELECT
      MAX(w3.bdt)
    FROM
      fg3_workcycle w3
    WHERE
      w3.bdt < w2.bdt
      AND w3.ctype = 'GCMONTH'
      AND EXTRACT(YEAR FROM w3.bdt) * 12 + EXTRACT(MONTH FROM w3.bdt) = EXTRACT(YEAR FROM w2.bdt) * 12 + EXTRACT(MONTH FROM w2.bdt) - 1
  );