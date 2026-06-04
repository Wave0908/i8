-- 适配Seata分布式事务的OpenGauss SQL
UPDATE p_form0000700078_m 
SET 
  u_zycs = (SELECT pt.phid_type FROM project_table pt WHERE p_form0000700078_m.phid_pc = pt.phid LIMIT 1),
  numericcol_1 = NULL, 
  numericcol_2 = NULL, 
  numericcol_3 = NULL, 
  numericcol_4 = NULL, 
  numericcol_5 = NULL, 
  numericcol_6 = NULL, 
  numericcol_7 = NULL, 
  numericcol_8 = NULL, 
  numericcol_9 = NULL, 
  numericcol_10 = NULL, 
  numericcol_11 = NULL, 
  numericcol_12 = NULL, 
  numericcol_13 = NULL, 
  numericcol_14 = NULL, 
  numericcol_15 = NULL, 
  numericcol_16 = NULL, 
  numericcol_17 = NULL, 
  numericcol_18 = NULL, 
  numericcol_19 = NULL
WHERE 
  EXISTS (SELECT 1 FROM project_table pt WHERE p_form0000700078_m.phid_pc = pt.phid AND p_form0000700078_m.u_zycs <> pt.phid_type)
  AND p_form0000700078_m.phid_pc = (SELECT phid_ori FROM project_table WHERE phid = @dmMain.PhId)