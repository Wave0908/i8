CREATE OR REPLACE VIEW ng.v_pms3_cz_act_sum AS 
SELECT 
    a.phid_pc, 
    b.bdt, 
    SUM(COALESCE(a.user_bywccz, 0.00)) AS kldysj, 
    SUM(COALESCE(a.amt_sum, 0.00)) AS klbhs
FROM ng.pms3_cz_act_m a
LEFT JOIN ng.fg3_workcycle b ON b.phid = a.phid_cycle
WHERE a.app_status = 1
GROUP BY 
    a.phid_pc, 
    b.bdt;