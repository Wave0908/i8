-- 适配Seata分布式事务的OpenGauss SQL
UPDATE p_form0000700101_m 
SET p_form0000700101_m.u_proj_type = pt.phid_type 
FROM 
  project_table pt 
WHERE 
  p_form0000700101_m.phid_pc = pt.phid 
  AND p_form0000700101_m.u_proj_type <> pt.phid_type 
  AND p_form0000700101_m.phid_pc = (SELECT phid_ori FROM project_table WHERE phid = @Approve.Billphid LIMIT 1)