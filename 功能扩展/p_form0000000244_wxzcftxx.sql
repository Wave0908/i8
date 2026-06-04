SELECT
  '224220909001887' AS fylzxm,
  '管理费用-折旧费（管理费）' AS fylzxm_name,
  sydw,
  sydw_name,
  sybm,
  sybm_name,
  SUM(yzje) AS amt,
  nl.oname AS u_lcywdy,
  ndl.zjm AS u_lchsbmzjm
FROM
  zczj_zckp
  LEFT JOIN ngdept_lcywdy nl ON CAST (nl.phid AS VARCHAR) = zczj_zckp.sybm
  LEFT JOIN ngdept_lchsbm ndl ON CAST (ndl.phid AS VARCHAR) = zczj_zckp.sybm
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
  END = @zz
  AND zclx = @sblx
GROUP BY
  sydw,
  sydw_name,
  sybm,
  sybm_name,
  nl.oname,
  ndl.zjm