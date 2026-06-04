-- 适配Seata分布式事务的OpenGauss SQL
UPDATE hr_epm_main
SET 
  user_gbcj = (SELECT u_gbcj FROM p_form0000700212_m WHERE phid = @Approve.Billphid LIMIT 1),
  emptype = (SELECT u_yglx FROM p_form0000700212_m WHERE phid = @Approve.Billphid LIMIT 1),
  admclass = (SELECT u_xzjb FROM p_form0000700212_m WHERE phid = @Approve.Billphid LIMIT 1)
WHERE 
  EXISTS (SELECT phid FROM p_form0000700212_m WHERE phid = @Approve.Billphid AND p_form0000700212_m.u_xm = hr_epm_main.phid)