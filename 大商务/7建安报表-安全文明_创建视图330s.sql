CREATE OR REPLACE VIEW v_aw_b AS
SELECT DISTINCT ON(m.phid) m.phid_pc,m.phid cid,m.bill_no,m.bill_name,m.Cnt_sum_vat_fc hj,COALESCE(m.zfbl,0) zfbl,p.phid sid,p.cont_pack_name sname,p.contract_mode cmode,p2.phid pid,p2.cont_pack_name pname,p2.parent_id rid
FROM pcm3_cnt_m m
JOIN pcm3_cnt_d d ON m.phid=d.pphid AND m.app_status=1
JOIN pms3_cont_pack_divide p ON d.phid_cont_pack=p.phid
JOIN pms3_cont_pack_divide p2 ON p2.phid=p.parent_id
JOIN pms3_cont_pack_divide p3 ON p3.phid=p2.parent_id
WHERE m.bill_type NOT IN(1,2,3) AND p.tag_type=10 AND p3.cont_pack_code='07'
ORDER BY m.phid,p.phid;

CREATE OR REPLACE VIEW v_aw_pm AS
SELECT m.phid_pc project_id,COALESCE(SUM(DISTINCT x.u_bjflmb),0) ywzb,COALESCE(SUM(DISTINCT z.u_zrcb),0) zrcbzb
FROM pcm3_cnt_m m
LEFT JOIN p_form_xmbjfl_m xm ON xm.phid_pc=m.phid_pc
LEFT JOIN p_form_xmbjfl_d1 x ON x.pphid=xm.phid AND x.u_cbysmc='安全生产费'
LEFT JOIN p_form_zrcbxd_m zm ON zm.phid_pc=m.phid_pc
LEFT JOIN p_form_zrcbxd_d2 z ON z.pphid=zm.phid AND z.u_sdcbys=5690000000003435
WHERE m.bill_type NOT IN(1,2,3) AND m.app_status=1
GROUP BY m.phid_pc;

CREATE OR REPLACE VIEW v_aw_cp AS
SELECT b.pid,b.phid_pc,MAX(COALESCE(pm.zrcbzb,0)) zrcbzb,SUM(b.hj) hj
FROM v_aw_b b LEFT JOIN v_aw_pm pm ON pm.project_id=b.phid_pc
GROUP BY b.pid,b.phid_pc;

CREATE OR REPLACE VIEW v_aw_sp AS
SELECT b.sid,b.pid,b.phid_pc,MAX(COALESCE(pm.zrcbzb,0)) zrcbzb,SUM(b.hj) hj
FROM v_aw_b b LEFT JOIN v_aw_pm pm ON pm.project_id=b.phid_pc
GROUP BY b.sid,b.pid,b.phid_pc;

CREATE OR REPLACE VIEW v_aw_t AS
WITH r AS(SELECT DISTINCT phid_pc,rid FROM v_aw_b),
c AS(SELECT DISTINCT phid_pc,pid,rid,pname FROM v_aw_b),
cs AS(SELECT phid_pc,pid,rid,pname,'6.'||ROW_NUMBER() OVER(PARTITION BY phid_pc ORDER BY pname) seq FROM c),
s AS(SELECT DISTINCT b.phid_pc,b.sid,b.pid,b.sname,cs.seq pseq FROM v_aw_b b JOIN cs ON cs.phid_pc=b.phid_pc AND cs.pid=b.pid),
ss AS(SELECT phid_pc,sid,pid,sname,pseq||'.'||ROW_NUMBER() OVER(PARTITION BY phid_pc,pid ORDER BY sname) seq FROM s),
h AS(SELECT b.phid_pc,b.cid,b.sid,b.bill_name,b.bill_no,ss.seq pseq FROM v_aw_b b JOIN ss ON ss.phid_pc=b.phid_pc AND ss.sid=b.sid),
hs AS(SELECT phid_pc,cid,sid,bill_name,bill_no,pseq||'.'||ROW_NUMBER() OVER(PARTITION BY phid_pc,sid ORDER BY bill_name) seq FROM h)
SELECT phid_pc,rid id,0 pid,'6' seq,'安全文明费' name,'' htbh,0 cid,0 lv FROM r
UNION ALL SELECT phid_pc,pid,rid,seq,pname,'',0,1 FROM cs
UNION ALL SELECT phid_pc,sid,pid,seq,sname,'',0,2 FROM ss
UNION ALL SELECT phid_pc,cid,sid,seq,bill_name,bill_no,cid,3 FROM hs
UNION ALL SELECT phid_pc,-999,rid,'6.999','零星采购','',0,9 FROM r;

CREATE OR REPLACE VIEW v_aw_src AS
SELECT phid_cnt cid,phid_pc,app_dt dt,total_sum_bb amt,'C' k
FROM pcm3_cnt_pay_m
WHERE app_status=1 AND bill_type NOT IN(1,2,3) AND wf_flag=2 AND app_dt IS NOT NULL
UNION ALL
SELECT m.u_htbh::bigint cid,m.phid_pc,m.u_kprq dt,d.u_jshj amt,'M' k
FROM p_form0000700076_m m
JOIN p_form0000700076_d d ON d.pphid=m.phid
WHERE m.app_status=1 AND m.u_kprq IS NOT NULL;

CREATE OR REPLACE VIEW v_aw_m AS
SELECT b.cid,b.pid,b.sid,b.phid_pc,EXTRACT(YEAR FROM x.dt) yr,EXTRACT(MONTH FROM x.dt) mon,
SUM(CASE WHEN b.cmode IN('labor','speciality','lease','other') AND x.k='C' THEN x.amt WHEN b.cmode IN('purchase','mortgage') AND x.k='M' THEN x.amt ELSE 0 END) kd,
SUM((CASE WHEN b.cmode IN('labor','speciality','lease','other') AND x.k='C' THEN x.amt WHEN b.cmode IN('purchase','mortgage') AND x.k='M' THEN x.amt ELSE 0 END)*b.zfbl) yf
FROM v_aw_b b JOIN v_aw_src x ON x.cid=b.cid AND x.phid_pc=b.phid_pc
GROUP BY b.cid,b.pid,b.sid,b.phid_pc,EXTRACT(YEAR FROM x.dt),EXTRACT(MONTH FROM x.dt);

CREATE OR REPLACE VIEW v_aw_y AS
SELECT cid,pid,sid,phid_pc,yr,SUM(kd) kd FROM v_aw_m GROUP BY cid,pid,sid,phid_pc,yr;

CREATE OR REPLACE VIEW v_aw_a AS
SELECT cid,pid,sid,phid_pc,SUM(kd) kd,SUM(yf) yf FROM v_aw_m GROUP BY cid,pid,sid,phid_pc;

CREATE OR REPLACE VIEW v_aw_lm AS
SELECT phid_pc,EXTRACT(YEAR FROM bill_dt) yr,EXTRACT(MONTH FROM bill_dt) mon,SUM(COALESCE(u_cgjehj,0)) kd
FROM p_form0000700182_m
WHERE app_status=1 AND u_cbys=5690000000003437 AND bill_dt IS NOT NULL
GROUP BY phid_pc,EXTRACT(YEAR FROM bill_dt),EXTRACT(MONTH FROM bill_dt);

CREATE OR REPLACE VIEW v_aw_ly AS
SELECT phid_pc,yr,SUM(kd) kd FROM v_aw_lm GROUP BY phid_pc,yr;

CREATE OR REPLACE VIEW v_aw_la AS
SELECT phid_pc,SUM(kd) kd FROM v_aw_lm GROUP BY phid_pc;

CREATE OR REPLACE VIEW v_aw_le AS
SELECT phid_pc,SUM(COALESCE(u_cgjehj,0)) ewzb
FROM p_form0000700182_m
WHERE app_status=1 AND u_cbys=5690000000003437
GROUP BY phid_pc;

CREATE OR REPLACE VIEW v_aw_e AS
SELECT t.*,
CASE WHEN lv=0 THEN COALESCE((SELECT x.ywzb FROM v_aw_pm x WHERE x.project_id=t.phid_pc),0) ELSE 0 END ywzb,
CASE WHEN lv=0 THEN COALESCE((SELECT x.zrcbzb FROM v_aw_pm x WHERE x.project_id=t.phid_pc),0) WHEN lv=1 THEN COALESCE((SELECT x.zrcbzb FROM v_aw_cp x WHERE x.pid=t.id AND x.phid_pc=t.phid_pc),0) WHEN lv=2 THEN COALESCE((SELECT x.zrcbzb FROM v_aw_sp x WHERE x.sid=t.id AND x.phid_pc=t.phid_pc),0) ELSE 0 END zrcbzb,
CASE WHEN lv=0 THEN COALESCE((SELECT SUM(x.hj) FROM v_aw_cp x WHERE x.phid_pc=t.phid_pc),0)+COALESCE((SELECT x.ewzb FROM v_aw_le x WHERE x.phid_pc=t.phid_pc),0) WHEN lv=1 THEN COALESCE((SELECT x.hj FROM v_aw_cp x WHERE x.pid=t.id AND x.phid_pc=t.phid_pc),0) WHEN lv=2 THEN COALESCE((SELECT x.hj FROM v_aw_sp x WHERE x.sid=t.id AND x.phid_pc=t.phid_pc),0) WHEN lv=9 THEN COALESCE((SELECT x.ewzb FROM v_aw_le x WHERE x.phid_pc=t.phid_pc),0) ELSE 0 END ewzb,
CASE WHEN lv=0 THEN COALESCE((SELECT SUM(x.hj) FROM v_aw_cp x WHERE x.phid_pc=t.phid_pc),0) WHEN lv=1 THEN COALESCE((SELECT x.hj FROM v_aw_cp x WHERE x.pid=t.id AND x.phid_pc=t.phid_pc),0) WHEN lv=2 THEN COALESCE((SELECT x.hj FROM v_aw_sp x WHERE x.sid=t.id AND x.phid_pc=t.phid_pc),0) WHEN lv=3 THEN COALESCE((SELECT x.hj FROM v_aw_b x WHERE x.cid=t.cid AND x.phid_pc=t.phid_pc),0) ELSE 0 END htje
FROM v_aw_t t;
