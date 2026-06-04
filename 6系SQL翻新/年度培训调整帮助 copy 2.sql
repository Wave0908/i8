SELECT
  p_form0000000084_m.phid,
  p_form0000000084_m.bill_no,
  p_form0000000084_m.bill_name
FROM
  p_form0000000084_m 
  left join p_form0000000084_d on p_form0000000084_d.pphid = p_form0000000084_m.phid
WHERE
  p_form0000000084_m.app_status = '1'
  AND p_form0000000084_m.bill_no = '000A1001202511190001'
  AND p_form0000000084_d.phid IS NOT NULL
  AND p_form0000000084_d.phid NOT IN (
    SELECT pxxmmc FROM p_form0000000088_m WHERE pxxmmc IS NOT NULL
  )
  AND p_form0000000084_d.phid NOT IN (
    SELECT pfm.train_project FROM p_form0000000096_m pfm WHERE pfm.train_project IS NOT NULL
  )
  AND p_form0000000084_d.phid = (
    SELECT MIN(d2.phid)
    FROM p_form0000000084_d d2
    WHERE d2.pphid = p_form0000000084_m.phid
      AND d2.phid IS NOT NULL
      AND d2.phid NOT IN (SELECT pxxmmc FROM p_form0000000088_m WHERE pxxmmc IS NOT NULL)
      AND d2.phid NOT IN (SELECT pfm.train_project FROM p_form0000000096_m pfm WHERE pfm.train_project IS NOT NULL)
  );