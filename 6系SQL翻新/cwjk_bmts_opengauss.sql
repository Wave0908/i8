CREATE VIEW cwjk_bmts AS SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d.phid 浪潮账套主键,
  p223d.dwbh 浪潮账套编码,
  p223d.dwmc 浪潮账套名称,
  NULL 浪潮业务员单元主键,
  NULL 浪潮业务员单元编码,
  NULL 浪潮业务单元名称,
  d.deptno 生成业务单元编码,
  '1' 类型标志,
  '' 核算部门类型,
  '1' 生成类别
FROM
  dept d
  LEFT JOIN (
    SELECT DISTINCT
      pm_zzbm,
      string_agg(ztbm, ',') AS ztbm
    FROM
      p_form0000000215_d
    GROUP BY
      pm_zzbm
  ) ztzh ON d.ocode = ztzh.pm_zzbm
  LEFT JOIN p_form0000000223_d p223d ON ztzh.ztbm = p223d.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (sjbm.parentorg LIKE'%.1003' OR sjbm.parentorg = 'A1001.1006')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)

UNION

SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d.phid 浪潮账套主键,
  p223d.dwbh 浪潮账套编码,
  p223d.dwmc 浪潮账套名称,
  NULL 浪潮业务员单元主键,
  NULL 浪潮业务员单元编码,
  NULL 浪潮业务单元名称,
  d.deptno 生成业务单元编码,
  '2' 类型标志,
  'ZZ' 核算部门类型,
  '2' 生成类别
FROM
  dept d
  LEFT JOIN (
    SELECT DISTINCT
      pm_zzbm,
      string_agg(ztbm, ',') AS ztbm
    FROM
      p_form0000000215_d
    GROUP BY
      pm_zzbm
  ) ztzh ON d.ocode = ztzh.pm_zzbm
  LEFT JOIN p_form0000000223_d p223d ON ztzh.ztbm = p223d.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (sjbm.parentorg LIKE'%.1003' OR sjbm.parentorg = 'A1001.1006')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)

UNION

SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d.phid 浪潮账套主键,
  p223d.dwbh 浪潮账套编码,
  p223d.dwmc 浪潮账套名称,
  sybjg.phid 浪潮业务单元主键,
  sybjg.dwbh 浪潮业务单元编码,
  sybjg.dwmc 浪潮业务单元编码,
  '' 生成业务单元编码,
  '2' 类型标志,
  'GL' 核算部门类型,
  '3' 生成类别
FROM
  dept d
  LEFT JOIN (
    SELECT DISTINCT
      pm_zzbm,
      string_agg(ztbm, ',') AS ztbm
    FROM
      p_form0000000215_d
    GROUP BY
      pm_zzbm
  ) ztzh ON d.ocode = ztzh.pm_zzbm
  LEFT JOIN p_form0000000223_d p223d ON ztzh.ztbm = p223d.dwbh
  LEFT JOIN (SELECT phid, dwbh, dwmc, sjjg FROM p_form0000000223_d WHERE dwmc LIKE'%事业部机关') sybjg ON sybjg.sjjg = p223d.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (sjbm.parentorg LIKE'%.1003' OR sjbm.parentorg = 'A1001.1006')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)

UNION

SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d1.phid 浪潮账套主键,
  p223d1.dwbh 浪潮账套编码,
  p223d1.dwmc 浪潮账套名称,
  p223d.phid 浪潮业务单元主键,
  p223d.dwbh 浪潮业务单元编码,
  p223d.dwmc 浪潮业务单元编码,
  '' 生成业务单元编码,
  '2' 类型标志,
  CASE
    WHEN d.deptname LIKE'%市场%' THEN
      'XS'
    ELSE
      'GL'
  END 核算部门类型,
  '4' 生成类别
FROM
  dept d
  LEFT JOIN p_form0000000217_d p217d ON d.parent_deptno = p217d.xzd_bmbm
  LEFT JOIN p_form0000000223_d p223d ON p217d.lc_ywdy = p223d.phid
  LEFT JOIN p_form0000000223_d p223d1 ON p223d.sjjg = p223d1.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (d.parent_deptno LIKE'%.1001' OR d.parent_deptno LIKE'%.1002' OR d.parent_deptno = 'A1001.3016' OR d.parent_deptno = 'A1001.3016')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)

UNION

SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d.phid 浪潮账套主键,
  p223d.dwbh 浪潮账套编码,
  p223d.dwmc 浪潮账套名称,
  NULL 浪潮业务员单元主键,
  NULL 浪潮业务员单元编码,
  NULL 浪潮业务单元名称,
  d.deptno 生成业务单元编码,
  '1' 类型标志,
  '' 核算部门类型,
  '1' 生成类别
FROM
  dept d
  LEFT JOIN (
    SELECT DISTINCT
      pm_zzbm,
      string_agg(ztbm, ',') AS ztbm
    FROM
      p_form0000000215_d
    GROUP BY
      pm_zzbm
  ) ztzh ON d.ocode = ztzh.pm_zzbm
  LEFT JOIN p_form0000000223_d p223d ON ztzh.ztbm = p223d.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (sjbm.parentorg LIKE'%.1004')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)

UNION

SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d.phid 浪潮账套主键,
  p223d.dwbh 浪潮账套编码,
  p223d.dwmc 浪潮账套名称,
  NULL 浪潮业务员单元主键,
  NULL 浪潮业务员单元编码,
  NULL 浪潮业务单元名称,
  d.deptno 生成业务单元编码,
  '2' 类型标志,
  'ZZ' 核算部门类型,
  '2' 生成类别
FROM
  dept d
  LEFT JOIN (
    SELECT DISTINCT
      pm_zzbm,
      string_agg(ztbm, ',') AS ztbm
    FROM
      p_form0000000215_d
    GROUP BY
      pm_zzbm
  ) ztzh ON d.ocode = ztzh.pm_zzbm
  LEFT JOIN p_form0000000223_d p223d ON ztzh.ztbm = p223d.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (sjbm.parentorg LIKE'%.1004')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)

UNION

SELECT
  d.ocode 所属组织,
  d.phid 部门主键,
  d.deptno 部门编码,
  d.deptname 部门名称,
  sjbm.parentorg 上级部门编码,
  p223d.phid 浪潮账套主键,
  p223d.dwbh 浪潮账套编码,
  p223d.dwmc 浪潮账套名称,
  sybjg.phid 浪潮业务单元主键,
  sybjg.dwbh 浪潮业务单元编码,
  sybjg.dwmc 浪潮业务单元编码,
  '' 生成业务单元编码,
  '2' 类型标志,
  'GL' 核算部门类型,
  '3' 生成类别
FROM
  dept d
  LEFT JOIN (
    SELECT DISTINCT
      pm_zzbm,
      string_agg(ztbm, ',') AS ztbm
    FROM
      p_form0000000215_d
    GROUP BY
      pm_zzbm
  ) ztzh ON d.ocode = ztzh.pm_zzbm
  LEFT JOIN p_form0000000223_d p223d ON ztzh.ztbm = p223d.dwbh
  LEFT JOIN (SELECT phid, dwbh, dwmc, sjjg FROM p_form0000000223_d WHERE dwmc LIKE'%事业部机关') sybjg ON sybjg.sjjg = p223d.dwbh
  LEFT JOIN (SELECT ocode, parentorg FROM fg_orgrelatitem WHERE relatid = '18') sjbm ON d.deptno = sjbm.ocode
  LEFT JOIN fg_orglist fg ON d.deptno = fg.ocode
WHERE
  fg.ng_insert_dt > '2021-08-06 00:30:37.000'
  AND (sjbm.parentorg LIKE'%.1004')
  AND d.phid NOT IN (SELECT xzd_bmmc FROM p_form0000000217_d WHERE xzd_bmmc IS NOT NULL)