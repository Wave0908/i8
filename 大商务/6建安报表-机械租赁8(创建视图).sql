-- 基础数据视图：合同 → 子合约包 → 父合约包（去重）
CREATE OR REPLACE VIEW v_jxzl_base AS
SELECT DISTINCT
    m.phid_pc,
    m.phid AS cnt_m_phid,
    m.bill_no,
    m.bill_name,
    m.total_sum,
    COALESCE(m.zfbl, 0) AS zfbl,
    pcpd.phid AS pcpd_phid,
    pcpd.parent_id AS pcpd_parent_id,
    pcpd.cont_pack_code,
    pcpd.cont_pack_name,
    pcpd2.phid AS parent_pcpd_phid,
    pcpd2.parent_id AS parent_pcpd_parent_id,
    pcpd2.cont_pack_name AS parent_cont_pack_name
FROM pcm3_cnt_m m
INNER JOIN pcm3_cnt_d d ON m.phid = d.pphid AND m.app_status = 1
INNER JOIN pms3_cont_pack_divide pcpd ON d.phid_cont_pack = pcpd.phid
LEFT JOIN pms3_cont_pack_divide pcpd2 ON pcpd2.phid = pcpd.parent_id
WHERE m.bill_type = 10 AND m.app_status = 1 AND pcpd.tag_type = 6;

-- 合同开单汇总（本月/本年/累计）
CREATE OR REPLACE VIEW v_jxzl_settle_mon AS
SELECT pay.phid_cnt AS contract_id, pay.phid_pc,
       EXTRACT(YEAR FROM pay.app_dt) AS yr, EXTRACT(MONTH FROM pay.app_dt) AS mon,
       SUM(pay.total_sum_bb) AS amt
FROM pcm3_cnt_pay_m pay
WHERE pay.app_status = 1 AND pay.wf_flag = 2 AND pay.app_dt IS NOT NULL
GROUP BY pay.phid_cnt, pay.phid_pc, yr, mon;

CREATE OR REPLACE VIEW v_jxzl_settle_year AS
SELECT pay.phid_cnt AS contract_id, pay.phid_pc,
       EXTRACT(YEAR FROM pay.app_dt) AS yr, SUM(pay.total_sum_bb) AS amt
FROM pcm3_cnt_pay_m pay
WHERE pay.app_status = 1 AND pay.wf_flag = 2 AND pay.app_dt IS NOT NULL
GROUP BY pay.phid_cnt, pay.phid_pc, yr;

CREATE OR REPLACE VIEW v_jxzl_settle_all AS
SELECT pay.phid_cnt AS contract_id, pay.phid_pc, SUM(pay.total_sum_bb) AS amt
FROM pcm3_cnt_pay_m pay
WHERE pay.app_status = 1 AND pay.wf_flag = 2 AND pay.app_dt IS NOT NULL
GROUP BY pay.phid_cnt, pay.phid_pc;

-- 零星采购汇总（本月/本年/累计/二维指标）
CREATE OR REPLACE VIEW v_jxzl_lxcg_mon AS
SELECT phid_pc, EXTRACT(YEAR FROM bill_dt) AS yr, EXTRACT(MONTH FROM bill_dt) AS mon,
       SUM(u_cgjehj) AS amt
FROM p_form0000700182_m
WHERE app_status = 1 AND u_cbys = 5690000000003436 AND bill_dt IS NOT NULL
GROUP BY phid_pc, yr, mon;

CREATE OR REPLACE VIEW v_jxzl_lxcg_year AS
SELECT phid_pc, EXTRACT(YEAR FROM bill_dt) AS yr, SUM(u_cgjehj) AS amt
FROM p_form0000700182_m
WHERE app_status = 1 AND u_cbys = 5690000000003436 AND bill_dt IS NOT NULL
GROUP BY phid_pc, yr;

CREATE OR REPLACE VIEW v_jxzl_lxcg_all AS
SELECT phid_pc, SUM(u_cgjehj) AS amt
FROM p_form0000700182_m
WHERE app_status = 1 AND u_cbys = 5690000000003436
GROUP BY phid_pc;

CREATE OR REPLACE VIEW v_jxzl_lxcg_ewzb AS
SELECT phid_pc, SUM(u_cgjehj) AS ewzb
FROM p_form0000700182_m
WHERE app_status = 1 AND u_cbys = 5690000000003436
GROUP BY phid_pc;

-- 项目一维/责任成本指标
CREATE OR REPLACE VIEW v_jxzl_project_metrics AS
SELECT m.phid_pc AS project_id,
       COALESCE(SUM(pfxd1.u_bjflmb), 0) AS u_ywzb,
       COALESCE(SUM(pfzd2.u_zrcb), 0) AS u_zrcbzb
FROM pcm3_cnt_m m
LEFT JOIN p_form_xmbjfl_m pfxm ON pfxm.phid_pc = m.phid_pc
LEFT JOIN p_form_xmbjfl_d1 pfxd1 ON pfxd1.pphid = pfxm.phid AND pfxd1.u_cbysmc = '机械租赁成本'
LEFT JOIN p_form_zrcbxd_m pfzm ON pfzm.phid_pc = m.phid_pc
LEFT JOIN p_form_zrcbxd_d2 pfzd2 ON pfzd2.pphid = pfzm.phid AND pfzd2.u_sdcbys = 5690000000003434
WHERE m.bill_type = 10 AND m.app_status = 1
GROUP BY m.phid_pc;

-- 合约包（父级）指标
CREATE OR REPLACE VIEW v_jxzl_cont_pack_metrics AS
SELECT b.parent_pcpd_phid AS cont_pack_id, b.phid_pc,
       MAX(pdcp.target_incl_tax_amt) AS u_ewzb,
       SUM(b.total_sum) AS u_htje
FROM v_jxzl_base b
LEFT JOIN pms3_dynamic_cont_pk pdcp ON pdcp.cont_divide_id = b.parent_pcpd_phid
WHERE b.parent_pcpd_phid IS NOT NULL
GROUP BY b.parent_pcpd_phid, b.phid_pc;

-- 子合约包指标
CREATE OR REPLACE VIEW v_jxzl_sub_cont_pack_metrics AS
SELECT b.pcpd_phid AS sub_cont_pack_id, b.parent_pcpd_phid AS cont_pack_id, b.phid_pc,
       MAX(pdcp.target_incl_tax_amt) AS u_ewzb,
       SUM(b.total_sum) AS u_htje
FROM v_jxzl_base b
LEFT JOIN pms3_dynamic_cont_pk pdcp ON pdcp.cont_divide_id = b.pcpd_phid
GROUP BY b.pcpd_phid, b.parent_pcpd_phid, b.phid_pc;

-- 树形结构（包含所有节点，序号按项目独立生成）
CREATE OR REPLACE VIEW v_jxzl_tree AS
WITH
-- 父合约包（去重并编号）
parent_pack AS (
    SELECT DISTINCT phid_pc, parent_pcpd_phid AS phid, parent_pcpd_parent_id AS parent_id,
           parent_cont_pack_name AS name
    FROM v_jxzl_base WHERE parent_pcpd_phid IS NOT NULL
),
parent_seq AS (
    SELECT *, '5.' || ROW_NUMBER() OVER (PARTITION BY phid_pc, parent_id ORDER BY name) AS seq
    FROM parent_pack
),
-- 子合约包
sub_pack AS (
    SELECT DISTINCT phid_pc, pcpd_phid AS phid, parent_pcpd_phid AS parent_id, cont_pack_name AS name
    FROM v_jxzl_base WHERE pcpd_phid IS NOT NULL
),
sub_seq AS (
    SELECT s.*, p.seq || '.' || ROW_NUMBER() OVER (PARTITION BY s.phid_pc, s.parent_id ORDER BY s.name) AS seq
    FROM sub_pack s JOIN parent_seq p ON s.phid_pc = p.phid_pc AND s.parent_id = p.phid
),
-- 合同层编号
contract_seq AS (
    SELECT b.phid_pc, b.cnt_m_phid AS phid, b.pcpd_phid AS parent_id, b.bill_name AS name,
           b.bill_no AS htbh,
           s.seq || '.' || ROW_NUMBER() OVER (PARTITION BY b.phid_pc, b.pcpd_phid ORDER BY b.bill_no) AS seq
    FROM v_jxzl_base b JOIN sub_seq s ON b.phid_pc = s.phid_pc AND b.pcpd_phid = s.phid
)
-- 合并所有层级 + 根节点 + 零星采购行
SELECT phid_pc, -1 AS id, 0 AS pid, '5' AS seq, '机械租赁' AS name, '' AS htbh, 0 AS cnt_phid FROM (SELECT DISTINCT phid_pc FROM v_jxzl_base) t
UNION ALL
SELECT phid_pc, phid, COALESCE(parent_id,0), seq, name, '' AS htbh, 0 FROM parent_seq
UNION ALL
SELECT phid_pc, phid, parent_id, seq, name, '' AS htbh, 0 FROM sub_seq
UNION ALL
SELECT phid_pc, phid, parent_id, seq, name, htbh, phid FROM contract_seq
UNION ALL
SELECT DISTINCT phid_pc, -999 AS id, parent_pcpd_parent_id AS pid, '5.999' AS seq, '零星采购' AS name, '' AS htbh, 0
FROM v_jxzl_base WHERE parent_pcpd_phid IS NOT NULL;