UPDATE p_form0000000084_d
SET lb = (
  SELECT u_lb
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
tr_project_type = (
  SELECT u_pxxmlx
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
pxxmmc = (
  SELECT u_pxxmmc
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
empid1 = (
  SELECT u_fzr
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
pxmb = (
  SELECT u_pxmb
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
qty = (
  SELECT u_pxrs
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
yjksrq = (
  SELECT u_yjksrq
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
yjjsrq = (
  SELECT u_yjjsrq
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
amt = (
  SELECT u_fyys
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
xxxs = (
  SELECT u_pxxs
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
),
learn_style = (
  SELECT u_xxfs
  FROM p_form_ndpxjhchange_m m
  WHERE m.phid = @Approve.Billphid
    AND m.u_pxjhmc = p_form0000000084_d.pphid
)
WHERE
  EXISTS (
    SELECT 1
    FROM p_form_ndpxjhchange_m m
    WHERE m.phid = @Approve.Billphid
      AND m.u_pxjhmc = p_form0000000084_d.pphid
  );