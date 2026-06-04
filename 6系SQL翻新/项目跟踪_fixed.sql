-- 适配Seata分布式事务的OpenGauss SQL
UPDATE p_form0000000052_m
SET 
  ddlbcol_1 = (SELECT t2.ddlbcol_1 FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  zbgl = (SELECT t2.u_zbgl FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  yjhte = (SELECT t2.numericcol_1 FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  yjtbrq = (SELECT t2.datetimecol_2 FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  ddlbcol_3 = (SELECT t2.ddlbcol_2 FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  xmmc = (SELECT t2.u_gxhxmmc FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  bill_name = (SELECT t2.u_gxhxmmc FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  empid = (SELECT t2.empid FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  zbfw = (SELECT t2.u_zbfw FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  xmgk = (SELECT t2.u_gcgk FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1),
  syzz = (SELECT CAST(t2.u_syzz AS text) FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid ORDER BY bill_dt DESC LIMIT 1)
WHERE
  EXISTS (SELECT 1 FROM p_form0000700161_m t2 WHERE t2.userhelp_1 = p_form0000000052_m.phid AND t2.phid = @Approve.Billphid);