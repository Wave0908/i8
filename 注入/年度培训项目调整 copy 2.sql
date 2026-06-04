UPDATE p_form0000000084_d
SET lb = (
  SELECT MIN(u_lb)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
tr_project_type = (
  SELECT MIN(u_pxxmlx)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
pxxmmc = (
  SELECT MIN(u_pxxmmc)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
empid1 = (
  SELECT MIN(u_fzr)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
pxmb = (
  SELECT MIN(u_pxmb)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
qty = (
  SELECT MIN(u_pxrs)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
yjksrq = (
  SELECT MIN(u_yjksrq)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
yjjsrq = (
  SELECT MIN(u_yjjsrq)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
amt = (
  SELECT MIN(u_fyys)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
xxxs = (
  SELECT MIN(u_pxxs)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
),
learn_style = (
  SELECT MIN(u_xxfs)
  FROM ndpxjhtzb
  WHERE mphid = 5690000000000001
    AND u_pxjhmc = p_form0000000084_d.pphid
)
WHERE
  EXISTS (
    SELECT 1
    FROM ndpxjhtzb
    WHERE mphid = 5690000000000001
      AND u_pxjhmc = p_form0000000084_d.pphid
  );