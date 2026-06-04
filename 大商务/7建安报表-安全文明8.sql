-- =====================================================
-- 视图：建安报表-安全文明费（彻底修正重复问题）
-- 功能：按项目、年份、月份展示安全文明费树形结构及财务指标
-- =====================================================

WITH 
params AS (
    SELECT 
        5690000000023241 AS target_project_id,   -- 测试用项目ID（正式改为动态传入）
        2026 AS target_year,
        4    AS target_month
),

-- 1. 基础数据：每个合同只保留一条关联的合约包（使用 DISTINCT ON）
base_contracts AS (
    SELECT DISTINCT ON (m.phid)
        m.phid_pc,
        m.phid AS contract_id,
        m.bill_no,
        m.bill_name,
        m.Cnt_sum_vat_fc,
        COALESCE(m.zfbl, 0) AS zfbl,
        pcpd.phid AS sub_cont_pack_id,
        pcpd.cont_pack_name AS sub_cont_pack_name,
        pcpd.contract_mode,
        pcpd2.phid AS cont_pack_id,
        pcpd2.cont_pack_name AS cont_pack_name,
        pcpd2.parent_id AS parent_cont_pack_id
    FROM pcm3_cnt_m m
    INNER JOIN pcm3_cnt_d d ON m.phid = d.pphid AND m.app_status = 1
    INNER JOIN pms3_cont_pack_divide pcpd ON d.phid_cont_pack = pcpd.phid
    INNER JOIN pms3_cont_pack_divide pcpd2 ON pcpd2.phid = pcpd.parent_id
    INNER JOIN pms3_cont_pack_divide pcpd3 ON pcpd3.phid = pcpd2.parent_id
    WHERE m.bill_type NOT IN (1,2,3)
      AND pcpd.tag_type = 10
      AND pcpd3.cont_pack_code = '07'
    ORDER BY m.phid, pcpd.phid   -- 按合同ID和子合约包ID排序，确保选择第一个
),

-- 2. 开单金额统计（按参数年月过滤）
settle_mon_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.total_sum_bb) AS settle_amt_mon
    FROM pcm3_cnt_pay_m pay
    CROSS JOIN params p
    WHERE pay.app_status = 1
      AND pay.bill_type NOT IN (1,2,3)
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXTRACT(YEAR FROM pay.app_dt) = p.target_year
      AND EXTRACT(MONTH FROM pay.app_dt) = p.target_month
      AND EXISTS (SELECT 1 FROM base_contracts bc WHERE bc.contract_id = pay.phid_cnt AND bc.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),
settle_mon_material AS (
    SELECT 
        m76.u_htbh::bigint AS contract_id,
        m76.phid_pc,
        SUM(d.u_jshj) AS settle_amt_mon
    FROM p_form0000700076_m m76
    INNER JOIN p_form0000700076_d d ON d.pphid = m76.phid
    CROSS JOIN params p
    WHERE m76.app_status = 1
      AND m76.u_kprq IS NOT NULL
      AND EXTRACT(YEAR FROM m76.u_kprq) = p.target_year
      AND EXTRACT(MONTH FROM m76.u_kprq) = p.target_month
      AND EXISTS (SELECT 1 FROM base_contracts bc WHERE bc.contract_id = m76.u_htbh::bigint AND bc.phid_pc = m76.phid_pc)
    GROUP BY m76.u_htbh::bigint, m76.phid_pc
),
settle_year_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.total_sum_bb) AS settle_amt_year
    FROM pcm3_cnt_pay_m pay
    CROSS JOIN params p
    WHERE pay.app_status = 1
      AND pay.bill_type NOT IN (1,2,3)
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXTRACT(YEAR FROM pay.app_dt) = p.target_year
      AND EXISTS (SELECT 1 FROM base_contracts bc WHERE bc.contract_id = pay.phid_cnt AND bc.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),
settle_year_material AS (
    SELECT 
        m76.u_htbh::bigint AS contract_id,
        m76.phid_pc,
        SUM(d.u_jshj) AS settle_amt_year
    FROM p_form0000700076_m m76
    INNER JOIN p_form0000700076_d d ON d.pphid = m76.phid
    CROSS JOIN params p
    WHERE m76.app_status = 1
      AND m76.u_kprq IS NOT NULL
      AND EXTRACT(YEAR FROM m76.u_kprq) = p.target_year
      AND EXISTS (SELECT 1 FROM base_contracts bc WHERE bc.contract_id = m76.u_htbh::bigint AND bc.phid_pc = m76.phid_pc)
    GROUP BY m76.u_htbh::bigint, m76.phid_pc
),
settle_all_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.total_sum_bb) AS settle_amt_all
    FROM pcm3_cnt_pay_m pay
    WHERE pay.app_status = 1
      AND pay.bill_type NOT IN (1,2,3)
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXISTS (SELECT 1 FROM base_contracts bc WHERE bc.contract_id = pay.phid_cnt AND bc.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),
settle_all_material AS (
    SELECT 
        m76.u_htbh::bigint AS contract_id,
        m76.phid_pc,
        SUM(d.u_jshj) AS settle_amt_all
    FROM p_form0000700076_m m76
    INNER JOIN p_form0000700076_d d ON d.pphid = m76.phid
    WHERE m76.app_status = 1
      AND m76.u_kprq IS NOT NULL
      AND EXISTS (SELECT 1 FROM base_contracts bc WHERE bc.contract_id = m76.u_htbh::bigint AND bc.phid_pc = m76.phid_pc)
    GROUP BY m76.u_htbh::bigint, m76.phid_pc
),

-- 3. 零星采购金额统计
lxcg_temp_mon AS (
    SELECT 
        phid_pc,
        SUM(u_cgjehj) AS settle_amt_mon
    FROM p_form0000700182_m
    CROSS JOIN params p
    WHERE app_status = 1
      AND u_cbys = 5690000000003437
      AND bill_dt IS NOT NULL
      AND EXTRACT(YEAR FROM bill_dt) = p.target_year
      AND EXTRACT(MONTH FROM bill_dt) = p.target_month
    GROUP BY phid_pc
),
lxcg_temp_year AS (
    SELECT 
        phid_pc,
        SUM(u_cgjehj) AS settle_amt_year
    FROM p_form0000700182_m
    CROSS JOIN params p
    WHERE app_status = 1
      AND u_cbys = 5690000000003437
      AND bill_dt IS NOT NULL
      AND EXTRACT(YEAR FROM bill_dt) = p.target_year
    GROUP BY phid_pc
),
lxcg_temp_all AS (
    SELECT 
        phid_pc,
        SUM(u_cgjehj) AS settle_amt_all
    FROM p_form0000700182_m
    WHERE app_status = 1 AND u_cbys = 5690000000003437 AND bill_dt IS NOT NULL
    GROUP BY phid_pc
),
lxcg_ewzb_summary AS (
    SELECT phid_pc, SUM(u_cgjehj) AS u_ewzb
    FROM p_form0000700182_m
    WHERE app_status = 1 AND u_cbys = 5690000000003437
    GROUP BY phid_pc
),

-- 4. 项目指标
project_metrics AS (
    SELECT 
        m.phid_pc AS project_id,
        COALESCE(SUM(DISTINCT pfxd1.u_bjflmb), 0) AS u_ywzb,
        COALESCE(SUM(DISTINCT pfzd2.u_zrcb), 0) AS u_zrcbzb
    FROM pcm3_cnt_m m
    LEFT JOIN p_form_xmbjfl_m pfxm ON pfxm.phid_pc = m.phid_pc
    LEFT JOIN p_form_xmbjfl_d1 pfxd1 ON pfxd1.pphid = pfxm.phid AND pfxd1.u_cbysmc = '安全生产费'
    LEFT JOIN p_form_zrcbxd_m pfzm ON pfzm.phid_pc = m.phid_pc
    LEFT JOIN p_form_zrcbxd_d2 pfzd2 ON pfzd2.pphid = pfzm.phid AND pfzd2.u_sdcbys = 5690000000003435
    WHERE m.bill_type NOT IN (1,2,3) AND m.app_status = 1
      AND m.phid_pc = (SELECT target_project_id FROM params)
    GROUP BY m.phid_pc
),

-- 5. 合约包及子合约包指标
cont_pack_summary AS (
    SELECT 
        cont_pack_id,
        phid_pc,
        MAX(pdcp.target_incl_tax_amt) AS u_ewzb,
        SUM(Cnt_sum_vat_fc) AS u_htje
    FROM base_contracts bc
    LEFT JOIN pms3_dynamic_cont_pk pdcp ON pdcp.cont_divide_id = bc.cont_pack_id
    WHERE cont_pack_id IS NOT NULL
    GROUP BY cont_pack_id, phid_pc
),
sub_cont_pack_summary AS (
    SELECT 
        sub_cont_pack_id,
        cont_pack_id,
        phid_pc,
        MAX(pdcp.target_incl_tax_amt) AS u_ewzb,
        SUM(Cnt_sum_vat_fc) AS u_htje
    FROM base_contracts bc
    LEFT JOIN pms3_dynamic_cont_pk pdcp ON pdcp.cont_divide_id = bc.sub_cont_pack_id
    WHERE sub_cont_pack_id IS NOT NULL
    GROUP BY sub_cont_pack_id, cont_pack_id, phid_pc
),

-- 6. 树形结构生成（基于项目过滤后的数据）
filtered_base AS (
    SELECT * FROM base_contracts
    CROSS JOIN params p
    WHERE phid_pc = p.target_project_id
),

root_node_id AS (
    SELECT DISTINCT parent_cont_pack_id AS root_id
    FROM filtered_base
    LIMIT 1
),

-- 合约包层（去重）
distinct_cont_pack AS (
    SELECT DISTINCT cont_pack_id, parent_cont_pack_id, cont_pack_name
    FROM filtered_base
    WHERE cont_pack_id IS NOT NULL
),
cont_pack_seq AS (
    SELECT 
        cont_pack_id,
        parent_cont_pack_id,
        cont_pack_name,
        '6.' || ROW_NUMBER() OVER (ORDER BY cont_pack_name) AS tree_seq_no
    FROM distinct_cont_pack
),

-- 子合约包层（去重）
distinct_sub_pack AS (
    SELECT DISTINCT sub_cont_pack_id, cont_pack_id, sub_cont_pack_name
    FROM filtered_base
    WHERE sub_cont_pack_id IS NOT NULL
),
sub_cont_pack_seq AS (
    SELECT 
        sp.sub_cont_pack_id,
        sp.cont_pack_id,
        sp.sub_cont_pack_name,
        cp.tree_seq_no || '.' || ROW_NUMBER() OVER (PARTITION BY cp.cont_pack_id ORDER BY sp.sub_cont_pack_name) AS tree_seq_no
    FROM distinct_sub_pack sp
    INNER JOIN cont_pack_seq cp ON sp.cont_pack_id = cp.cont_pack_id
),

-- 合同层（每个合同只生成一次，去重）
distinct_contract AS (
    SELECT DISTINCT
        contract_id,
        sub_cont_pack_id,
        bill_name,
        bill_no,
        phid_pc
    FROM filtered_base
),
contract_seq AS (
    SELECT 
        c.contract_id,
        c.sub_cont_pack_id,
        c.bill_name,
        c.bill_no,
        c.phid_pc,
        sp.tree_seq_no || '.' || ROW_NUMBER() OVER (PARTITION BY c.sub_cont_pack_id ORDER BY c.bill_no) AS tree_seq_no
    FROM distinct_contract c
    INNER JOIN sub_cont_pack_seq sp ON c.sub_cont_pack_id = sp.sub_cont_pack_id
),

-- 树形结构最终合并
tree_structure AS (
    -- 根节点
    SELECT 
        r.root_id AS s_tree_id,
        0 AS s_tree_pid,
        '6' AS tree_seq_no,
        '安全文明费' AS s_tree_name,
        (SELECT phid_pc FROM filtered_base LIMIT 1) AS phid_pc,
        0 AS contract_id,
        '' AS bill_no
    FROM root_node_id r

    UNION ALL

    -- 合约包层
    SELECT 
        cp.cont_pack_id,
        cp.parent_cont_pack_id,
        cp.tree_seq_no,
        cp.cont_pack_name,
        (SELECT phid_pc FROM filtered_base LIMIT 1),
        0, ''
    FROM cont_pack_seq cp

    UNION ALL

    -- 子合约包层
    SELECT 
        sp.sub_cont_pack_id,
        sp.cont_pack_id,
        sp.tree_seq_no,
        sp.sub_cont_pack_name,
        (SELECT phid_pc FROM filtered_base LIMIT 1),
        0, ''
    FROM sub_cont_pack_seq sp

    UNION ALL

    -- 合同层
    SELECT 
        c.contract_id,
        c.sub_cont_pack_id,
        c.tree_seq_no,
        c.bill_name,
        c.phid_pc,
        c.contract_id,
        c.bill_no
    FROM contract_seq c

    UNION ALL

    -- 零星采购行（每个项目一行）
    SELECT 
        -999,
        r.root_id,
        '6.999',
        '零星采购',
        (SELECT phid_pc FROM filtered_base LIMIT 1),
        0, ''
    FROM root_node_id r
),

-- 7. 金额数据计算（每个节点只输出一行）
amount_data AS (
    -- 根节点
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.contract_id,
        p.target_year AS tj_year,
        p.target_month AS tj_mon,
        pm.u_ywzb,
        pm.u_zrcbzb,
        COALESCE((SELECT SUM(u_ewzb) FROM cont_pack_summary WHERE phid_pc = ts.phid_pc), 0)
        + COALESCE((SELECT u_ewzb FROM lxcg_ewzb_summary WHERE phid_pc = ts.phid_pc), 0) AS u_ewzb,
        COALESCE((SELECT SUM(u_htje) FROM cont_pack_summary WHERE phid_pc = ts.phid_pc), 0) AS u_htje,
        COALESCE((SELECT SUM(u_htje) FROM cont_pack_summary WHERE phid_pc = ts.phid_pc), 0) AS u_yjjsz,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_mon_cnt smc ON bc.contract_id = smc.contract_id AND bc.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bc.contract_id = smm.contract_id AND bc.phid_pc = smm.phid_pc
            WHERE bc.phid_pc = ts.phid_pc
        ), 0) + COALESCE((SELECT settle_amt_mon FROM lxcg_temp_mon WHERE phid_pc = ts.phid_pc), 0) AS u_bykd,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN syc.settle_amt_year
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN sym.settle_amt_year ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_year_cnt syc ON bc.contract_id = syc.contract_id AND bc.phid_pc = syc.phid_pc
            LEFT JOIN settle_year_material sym ON bc.contract_id = sym.contract_id AND bc.phid_pc = sym.phid_pc
            WHERE bc.phid_pc = ts.phid_pc
        ), 0) + COALESCE((SELECT settle_amt_year FROM lxcg_temp_year WHERE phid_pc = ts.phid_pc), 0) AS u_bnljkd,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_all_cnt sac ON bc.contract_id = sac.contract_id AND bc.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bc.contract_id = sam.contract_id AND bc.phid_pc = sam.phid_pc
            WHERE bc.phid_pc = ts.phid_pc
        ), 0) + COALESCE((SELECT settle_amt_all FROM lxcg_temp_all WHERE phid_pc = ts.phid_pc), 0) AS u_kgljkd,
        COALESCE((
            SELECT SUM((CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                            WHEN bc.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END) * bc.zfbl)
            FROM filtered_base bc
            LEFT JOIN settle_mon_cnt smc ON bc.contract_id = smc.contract_id AND bc.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bc.contract_id = smm.contract_id AND bc.phid_pc = smm.phid_pc
            WHERE bc.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        COALESCE((
            SELECT SUM((CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                            WHEN bc.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END) * bc.zfbl)
            FROM filtered_base bc
            LEFT JOIN settle_all_cnt sac ON bc.contract_id = sac.contract_id AND bc.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bc.contract_id = sam.contract_id AND bc.phid_pc = sam.phid_pc
            WHERE bc.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0 AS u_byssgck,
        0 AS u_kgljssgck,
        '' AS u_htzt
    FROM tree_structure ts
    CROSS JOIN params p
    INNER JOIN project_metrics pm ON ts.phid_pc = pm.project_id
    WHERE ts.tree_seq_no = '6'

    UNION ALL

    -- 合约包层
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.contract_id,
        p.target_year, p.target_month,
        0,0,
        COALESCE(cps.u_ewzb, 0),
        COALESCE(cps.u_htje, 0),
        COALESCE(cps.u_htje, 0),
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_mon_cnt smc ON bc.contract_id = smc.contract_id AND bc.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bc.contract_id = smm.contract_id AND bc.phid_pc = smm.phid_pc
            WHERE bc.cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_bykd,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN syc.settle_amt_year
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN sym.settle_amt_year ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_year_cnt syc ON bc.contract_id = syc.contract_id AND bc.phid_pc = syc.phid_pc
            LEFT JOIN settle_year_material sym ON bc.contract_id = sym.contract_id AND bc.phid_pc = sym.phid_pc
            WHERE bc.cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_bnljkd,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_all_cnt sac ON bc.contract_id = sac.contract_id AND bc.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bc.contract_id = sam.contract_id AND bc.phid_pc = sam.phid_pc
            WHERE bc.cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_kgljkd,
        COALESCE((
            SELECT SUM((CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                            WHEN bc.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END) * bc.zfbl)
            FROM filtered_base bc
            LEFT JOIN settle_mon_cnt smc ON bc.contract_id = smc.contract_id AND bc.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bc.contract_id = smm.contract_id AND bc.phid_pc = smm.phid_pc
            WHERE bc.cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        COALESCE((
            SELECT SUM((CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                            WHEN bc.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END) * bc.zfbl)
            FROM filtered_base bc
            LEFT JOIN settle_all_cnt sac ON bc.contract_id = sac.contract_id AND bc.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bc.contract_id = sam.contract_id AND bc.phid_pc = sam.phid_pc
            WHERE bc.cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN cont_pack_summary cps ON ts.s_tree_id = cps.cont_pack_id AND ts.phid_pc = cps.phid_pc
    WHERE ts.tree_seq_no LIKE '6.%' AND ts.tree_seq_no != '6.999' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 1

    UNION ALL

    -- 子合约包层
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.contract_id,
        p.target_year, p.target_month,
        0,0,
        COALESCE(scps.u_ewzb, 0),
        COALESCE(scps.u_htje, 0),
        COALESCE(scps.u_htje, 0),
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_mon_cnt smc ON bc.contract_id = smc.contract_id AND bc.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bc.contract_id = smm.contract_id AND bc.phid_pc = smm.phid_pc
            WHERE bc.sub_cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_bykd,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN syc.settle_amt_year
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN sym.settle_amt_year ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_year_cnt syc ON bc.contract_id = syc.contract_id AND bc.phid_pc = syc.phid_pc
            LEFT JOIN settle_year_material sym ON bc.contract_id = sym.contract_id AND bc.phid_pc = sym.phid_pc
            WHERE bc.sub_cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_bnljkd,
        COALESCE((
            SELECT SUM(CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                           WHEN bc.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END)
            FROM filtered_base bc
            LEFT JOIN settle_all_cnt sac ON bc.contract_id = sac.contract_id AND bc.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bc.contract_id = sam.contract_id AND bc.phid_pc = sam.phid_pc
            WHERE bc.sub_cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_kgljkd,
        COALESCE((
            SELECT SUM((CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                            WHEN bc.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END) * bc.zfbl)
            FROM filtered_base bc
            LEFT JOIN settle_mon_cnt smc ON bc.contract_id = smc.contract_id AND bc.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bc.contract_id = smm.contract_id AND bc.phid_pc = smm.phid_pc
            WHERE bc.sub_cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        COALESCE((
            SELECT SUM((CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                            WHEN bc.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END) * bc.zfbl)
            FROM filtered_base bc
            LEFT JOIN settle_all_cnt sac ON bc.contract_id = sac.contract_id AND bc.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bc.contract_id = sam.contract_id AND bc.phid_pc = sam.phid_pc
            WHERE bc.sub_cont_pack_id = ts.s_tree_id AND bc.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN sub_cont_pack_summary scps ON ts.s_tree_id = scps.sub_cont_pack_id AND ts.phid_pc = scps.phid_pc
    WHERE ts.tree_seq_no LIKE '6.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 2

    UNION ALL

    -- 合同层
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.contract_id,
        p.target_year, p.target_month,
        0,0,0,
        bc.Cnt_sum_vat_fc,
        bc.Cnt_sum_vat_fc,
        CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN COALESCE(smc.settle_amt_mon,0)
             WHEN bc.contract_mode IN ('purchase','mortgage') THEN COALESCE(smm.settle_amt_mon,0)
             ELSE 0 END,
        CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN COALESCE(syc.settle_amt_year,0)
             WHEN bc.contract_mode IN ('purchase','mortgage') THEN COALESCE(sym.settle_amt_year,0)
             ELSE 0 END,
        CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN COALESCE(sac.settle_amt_all,0)
             WHEN bc.contract_mode IN ('purchase','mortgage') THEN COALESCE(sam.settle_amt_all,0)
             ELSE 0 END,
        (CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN COALESCE(smc.settle_amt_mon,0)
              WHEN bc.contract_mode IN ('purchase','mortgage') THEN COALESCE(smm.settle_amt_mon,0)
              ELSE 0 END) * bc.zfbl,
        (CASE WHEN bc.contract_mode IN ('labor','speciality','lease','other') THEN COALESCE(sac.settle_amt_all,0)
              WHEN bc.contract_mode IN ('purchase','mortgage') THEN COALESCE(sam.settle_amt_all,0)
              ELSE 0 END) * bc.zfbl,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    INNER JOIN filtered_base bc ON ts.s_tree_id = bc.contract_id AND ts.phid_pc = bc.phid_pc
    LEFT JOIN settle_mon_cnt smc ON ts.s_tree_id = smc.contract_id AND ts.phid_pc = smc.phid_pc
    LEFT JOIN settle_year_cnt syc ON ts.s_tree_id = syc.contract_id AND ts.phid_pc = syc.phid_pc
    LEFT JOIN settle_all_cnt sac ON ts.s_tree_id = sac.contract_id AND ts.phid_pc = sac.phid_pc
    LEFT JOIN settle_mon_material smm ON ts.s_tree_id = smm.contract_id AND ts.phid_pc = smm.phid_pc
    LEFT JOIN settle_year_material sym ON ts.s_tree_id = sym.contract_id AND ts.phid_pc = sym.phid_pc
    LEFT JOIN settle_all_material sam ON ts.s_tree_id = sam.contract_id AND ts.phid_pc = sam.phid_pc
    WHERE ts.tree_seq_no LIKE '6.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 3

    UNION ALL

    -- 零星采购行
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.contract_id,
        p.target_year, p.target_month,
        0,0,
        COALESCE(les.u_ewzb, 0),
        NULL, 0,
        COALESCE(ltm.settle_amt_mon, 0),
        COALESCE(lty.settle_amt_year, 0),
        COALESCE(lta.settle_amt_all, 0),
        NULL, NULL, NULL, NULL, ''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN lxcg_ewzb_summary les ON ts.phid_pc = les.phid_pc
    LEFT JOIN lxcg_temp_mon ltm ON ts.phid_pc = ltm.phid_pc
    LEFT JOIN lxcg_temp_year lty ON ts.phid_pc = lty.phid_pc
    LEFT JOIN lxcg_temp_all lta ON ts.phid_pc = lta.phid_pc
    WHERE ts.tree_seq_no = '6.999'
)

-- 8. 最终结果
SELECT 
    ts.phid_pc,
    ts.s_tree_id,
    ts.s_tree_pid,
    ts.tree_seq_no AS s_tree_no,
    ts.bill_no AS u_htbh,
    ts.s_tree_name,
    COALESCE(ad.u_ywzb, 0)::numeric AS u_ywzb,
    COALESCE(ad.u_zrcbzb, 0)::numeric AS u_zrcbzb,
    COALESCE(ad.u_ewzb, 0)::numeric AS u_ewzb,
    COALESCE(ad.u_htje, 0)::numeric AS u_htje,
    COALESCE(ad.u_yjjsz, 0)::numeric AS u_yjjsz,
    COALESCE(ad.u_bykd, 0)::numeric AS u_bykd,
    COALESCE(ad.u_bnljkd, 0)::numeric AS u_bnljkd,
    COALESCE(ad.u_kgljkd, 0)::numeric AS u_kgljkd,
    COALESCE(ad.u_byysgck, 0)::numeric AS u_byysgck,
    COALESCE(ad.u_kgljysgck, 0)::numeric AS u_kgljysgck,
    COALESCE(ad.u_byssgck, 0)::numeric AS u_byssgck,
    COALESCE(ad.u_kgljssgck, 0)::numeric AS u_kgljssgck,
    COALESCE(ad.u_htzt, '') AS u_htzt,
    ad.tj_year,
    ad.tj_mon
FROM tree_structure ts
LEFT JOIN amount_data ad ON ts.s_tree_id = ad.s_tree_id 
    AND ts.phid_pc = ad.phid_pc
    AND ts.s_tree_pid = ad.s_tree_pid
CROSS JOIN params p
WHERE ts.phid_pc = p.target_project_id
  AND (ad.tj_year = p.target_year OR ad.tj_year IS NULL)
  AND (ad.tj_mon = p.target_month OR ad.tj_mon IS NULL)
ORDER BY 
    CASE 
        WHEN ts.tree_seq_no = '6' THEN 1
        WHEN ts.tree_seq_no LIKE '6.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 1 THEN 
            CASE WHEN ts.tree_seq_no = '6.999' THEN 999 ELSE 2 END
        WHEN ts.tree_seq_no LIKE '6.%.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 2 THEN 3
        WHEN LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 3 THEN 4
        ELSE 5
    END,
    ts.tree_seq_no;