-- 适配Seata分布式事务的OpenGauss SQL
UPDATE pcm3_cnt_m
SET 
  phid_supply_ent = (SELECT user_bgyfdw FROM pcm3_cnt_change_m WHERE phid = @Approve.Billphid LIMIT 1)
WHERE 
  EXISTS (SELECT 1 FROM pcm3_cnt_change_m WHERE phid = @Approve.Billphid AND pcm3_cnt_m.phid = phid_cnt AND user_bgyfdw IS NOT NULL)