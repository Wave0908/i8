INSERT INTO p_form0000600061_d6 (phid, pphid, u_gzsj, u_wtfkxmjkywt, u_gjryjclfs, u_xmfzr)
VALUES
(
  (SELECT phid FROM trzxm m WHERE m.mphid =@Approve.Billphid),
  (SELECT pphid FROM trzxm m WHERE m.mphid =@Approve.Billphid),
  (SELECT u_gzsj FROM trzxm m WHERE m.mphid =@Approve.Billphid),
  (SELECT u_wtfkxmjkywt FROM trzxm m WHERE m.mphid =@Approve.Billphid),
  (SELECT u_gjryjclfs FROM trzxm m WHERE m.mphid =@Approve.Billphid),
  (SELECT u_xmfzr FROM trzxm m WHERE m.mphid =@Approve.Billphid)
);