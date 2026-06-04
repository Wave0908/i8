SELECT DISTINCT
  m.phid,
  m.bill_no,
  m.bill_name
FROM
  p_form0000000084_m m
  LEFT JOIN p_form0000000084_d d ON m.phid = d.pphid
WHERE
  m.app_status = '1'
  AND m.bill_no = '000A1001202511190001'  AND d.phid NOT IN (SELECT pxxmmc FROM p_form0000000088_m WHERE pxxmmc IS NOT NULL)
  AND d.phid NOT IN (SELECT pfm.train_project FROM p_form0000000096_m pfm)
