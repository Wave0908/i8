CREATE VIEW ndpxjhtzb AS 
SELECT
  m.phid AS mphid,
  m.u_pxjhmc,
  d4.phid AS d4phid,
  u_lb,
  u_pxxmlx,
  u_pxxmmc,
  u_fzr,
  u_pxmb,
  u_pxrs,
  u_yjksrq,
  u_yjjsrq,
  u_fyys,
  u_pxxs,
  u_xxfs
FROM
  p_form_ndpxjhchange_m m
  LEFT JOIN p_form_ndpxjhchange_d1 d ON m.phid = d.pphid
  LEFT JOIN p_form0000000084_d d4 ON d4.phid = d.phid
  LEFT JOIN p_form0000000084_m m4 ON m4.phid = d4.pphid