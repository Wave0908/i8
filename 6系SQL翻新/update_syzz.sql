-- 适配Seata分布式事务的OpenGauss SQL
UPDATE p_form0000000052_m 
SET 
  syzz = (SELECT u_syzz FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid LIMIT 1)
WHERE 
  EXISTS (SELECT 1 FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid);