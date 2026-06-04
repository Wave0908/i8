MERGE INTO p_form0000600061_d6 t
USING (
    SELECT
        phid,
        pphid,
        u_gzsj,
        u_wtfkxmjkywt,
        u_gjryjclfs,
        u_xmfzr
    FROM trzxm
    WHERE mphid = @Approve.Billphid
) s ON (1 = 0)
WHEN NOT MATCHED THEN
    INSERT (phid, pphid, u_gzsj, u_wtfkxmjkywt, u_gjryjclfs, u_xmfzr)
    VALUES (s.phid, s.pphid, s.u_gzsj, s.u_wtfkxmjkywt, s.u_gjryjclfs, s.u_xmfzr);