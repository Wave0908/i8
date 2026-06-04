UPDATE pcm3_cnt_m
SET phid_sencomp = (SELECT user_bgyfdw FROM pcm3_cnt_change_m WHERE phid = @Approve.Billphid LIMIT 1)
WHERE EXISTS (SELECT 1 FROM pcm3_cnt_change_m WHERE pcm3_cnt_change_m.phid = @Approve.Billphid AND pcm3_cnt_change_m.phid_cnt = pcm3_cnt_m.phid AND user_bgyfdw IS NOT NULL)