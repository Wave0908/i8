WITH p AS(SELECT 5690000000023241 pp,2026 yy,4 mm)
SELECT t.phid_pc,t.id s_tree_id,t.pid s_tree_pid,t.seq s_tree_no,t.htbh u_htbh,t.name s_tree_name,t.ywzb u_ywzb,t.zrcbzb u_zrcbzb,t.ewzb u_ewzb,t.htje u_htje,t.htje u_yjjsz,COALESCE(m.kd,0) u_bykd,COALESCE(y.kd,0) u_bnljkd,COALESCE(a.kd,0) u_kgljkd,COALESCE(m.yf,0) u_byysgck,COALESCE(a.yf,0) u_kgljysgck,0 u_byssgck,0 u_kgljssgck,'' u_htzt,p.yy tj_year,p.mm tj_mon
FROM v_aw_e t
JOIN p ON t.phid_pc=p.pp
LEFT JOIN v_aw_nm m ON m.phid_pc=t.phid_pc AND m.id=t.id AND m.yr=p.yy AND m.mon=p.mm
LEFT JOIN v_aw_ny y ON y.phid_pc=t.phid_pc AND y.id=t.id AND y.yr=p.yy
LEFT JOIN v_aw_na a ON a.phid_pc=t.phid_pc AND a.id=t.id
ORDER BY CASE WHEN t.lv=0 THEN 1 WHEN t.lv=9 THEN 999 ELSE t.lv+1 END,t.seq;
