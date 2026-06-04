select *
FROM
  p_form0000000084_m
  LEFT JOIN p_form0000000084_d ON p_form0000000084_m.phid = p_form0000000084_d.pphid
WHERE
  p_form0000000084_m.app_status = '1'
  AND p_form0000000084_d.phid IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM p_form0000000088_m x
    WHERE x.pxxmmc = p_form0000000084_d.phid
  )
  AND NOT EXISTS (
    SELECT 1 FROM p_form0000000096_m pfm
    WHERE pfm.train_project = p_form0000000084_d.phid
  )
  AND NOT EXISTS (
    SELECT 1
    FROM p_form0000000084_d d2
    WHERE d2.pphid = p_form0000000084_m.phid
      AND d2.phid IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM p_form0000000088_m x WHERE x.pxxmmc = d2.phid)
      AND NOT EXISTS (SELECT 1 FROM p_form0000000096_m pfm WHERE pfm.train_project = d2.phid)
      AND d2.phid < p_form0000000084_d.phid
  )