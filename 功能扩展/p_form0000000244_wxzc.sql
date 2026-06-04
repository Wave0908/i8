SELECT
  phid AS lyzj,
  zcbm,
  zcmc,
  xczlb AS zczl,
  zlb_name AS zczl_name,
  zcflb AS zcfl,
  flb_name AS zcfl_name,
  zclyfs,
  c_name AS zclyfs_name,
  ggxh,
  CAST (szrq AS VARCHAR (20)) AS datetimecol_1,
  yz AS bhsje,
  tax AS sl,
  amt_tax AS se,
  yz,
  jz_amt AS jz,
  cz,
  zjqs,
  yyqs AS yyys,
  yzje,
  ljzj,
  syzt AS sbzt,
  gldw AS u_gldw,
  gldw_name AS u_gldw_name,
  glbm AS u_glbm,
  glbm_name AS u_glbm_name,
  sydw AS u_sydw,
  sydw_name AS u_sydw_name,
  sybm AS u_sybm,
  sybm_name AS u_sybm_name
FROM
  zczj_zckp
WHERE
  syzt NOT IN ('出售', '抵出', '报废')
  AND yyqs < zjqs
  AND TO_CHAR(szrq + (yyqs || ' month')::interval, 'YYYYMM') <= (CAST(@nd AS VARCHAR) || LPAD(CAST(@yd AS VARCHAR), 2, '0'))
  AND
  CASE
    WHEN phid_org = '324191209000001' THEN
      u_jtkplxqf
    ELSE
      phid_org
  END = '324191209000019'
  AND zclx = @sblx