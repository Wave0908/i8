UPDATE p_form0000000084_d
SET lb = (
  SELECT u_lb
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
tr_project_type = (
  SELECT u_pxxmlx
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
pxxmmc = (
  SELECT u_pxxmmc
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
empid1 = (
  SELECT u_fzr
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
pxmb = (
  SELECT u_pxmb
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
qty = (
  SELECT u_pxrs
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
yjksrq = (
  SELECT u_yjksrq
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
yjjsrq = (
  SELECT u_yjjsrq
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
amt = (
  SELECT u_fyys
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
xxxs = (
  SELECT u_pxxs
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
),
learn_style = (
  SELECT u_xxfs
  FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
    AND d4phid = p_form0000000084_d.phid
  LIMIT 1
)
WHERE
  EXISTS (
    SELECT 1
    FROM ndpxjhtzb
  WHERE mphid = @Approve.Billphid
    AND u_pxjhmc = p_form0000000084_d.pphid
      AND d4phid = p_form0000000084_d.phid
  );