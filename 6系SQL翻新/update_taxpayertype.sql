-- 适配Seata分布式事务的OpenGauss SQL
UPDATE fg3_enterprise 
SET 
  taxpayertype = (
    SELECT 
      pcm.user_nsrlx 
    FROM 
      pcm3_cnt_m pcm 
    WHERE 
      (CASE WHEN pcm.user_lcyf IS NULL OR pcm.user_lcyf = '' THEN pcm.phid_reccomp ELSE pcm.user_lcyf END) = fg3_enterprise.phid 
      AND pcm.phid = @Approve.Billphid 
      AND pcm.user_nsrlx IS NOT NULL 
    LIMIT 1 
  ) 
WHERE 
  EXISTS (
    SELECT 
      1 
    FROM 
      pcm3_cnt_m pcm 
    WHERE 
      (CASE WHEN pcm.user_lcyf IS NULL OR pcm.user_lcyf = '' THEN pcm.phid_reccomp ELSE pcm.user_lcyf END) = fg3_enterprise.phid 
      AND pcm.phid = @Approve.Billphid 
      AND pcm.user_nsrlx IS NOT NULL 
  )