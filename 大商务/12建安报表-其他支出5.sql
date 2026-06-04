-- =====================================================
-- 视图：建安报表-其他支出树形数据（修正重复问题）
-- 功能：按指定项目、年份、月份，展示其他支出的树形结构及当期财务指标
-- 参数：通过 params CTE 中的值进行测试，最终封装为视图时可固定或改为会话参数
-- =====================================================

WITH 
-- 1. 报表参数（测试时可修改此处）
params AS (
    SELECT 
        5690000000023241 AS target_project_id,   -- 目标项目ID
        2026 AS target_year,                     -- 目标年份
        4   AS target_month                     -- 目标月份
),

-- 2. 基础数据：合同 → 子合约包 → 父合约包（增加 tag_type = 12）
base_data AS (
    SELECT DISTINCT
        m.phid_pc,
        m.phid AS cnt_m_phid,
        m.bill_no,
        m.bill_name,
        m.Cnt_sum_vat_fc AS total_sum,
        COALESCE(m.zfbl, 0) AS zfbl,
        pcpd.phid AS sub_cont_pack_id,           -- 子合约包ID（对应第二层节点）
        pcpd.parent_id AS sub_pack_parent_id,
        pcpd.cont_pack_code,
        pcpd.cont_pack_name,
        pcpd.contract_mode,
        pcpd2.phid AS parent_pcpd_phid,          -- 父合约包ID（根节点用）
        pcpd2.cont_pack_code AS parent_cont_pack_code
    FROM pcm3_cnt_m m
    INNER JOIN pcm3_cnt_d d ON m.phid = d.pphid AND m.app_status = 1
    INNER JOIN pms3_cont_pack_divide pcpd ON d.phid_cont_pack = pcpd.phid
    INNER JOIN pms3_cont_pack_divide pcpd2 ON pcpd2.phid = pcpd.parent_id
    WHERE m.bill_type NOT IN (1,2,3)
      AND m.app_status = 1
      AND pcpd.tag_type = 12                      -- 【新增】限定其他支出类型
      AND pcpd2.cont_pack_code = '09'             -- 原条件保留
),

-- 3. 开单金额统计（按合同+项目，带参数过滤）
-- 本月开单（合同结算表）
settle_mon_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.app_amt_vat_fc) AS settle_amt_mon
    FROM pcm3_cnt_pay_m pay
    CROSS JOIN params p
    WHERE pay.app_status = 1
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXTRACT(YEAR FROM pay.app_dt) = p.target_year
      AND EXTRACT(MONTH FROM pay.app_dt) = p.target_month
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = pay.phid_cnt AND bd.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),
-- 本月开单（物资点验单）
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
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = m76.u_htbh::bigint AND bd.phid_pc = m76.phid_pc)
    GROUP BY m76.u_htbh::bigint, m76.phid_pc
),

-- 本年累计开单（合同结算表）
settle_year_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.app_amt_vat_fc) AS settle_amt_year
    FROM pcm3_cnt_pay_m pay
    CROSS JOIN params p
    WHERE pay.app_status = 1
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXTRACT(YEAR FROM pay.app_dt) = p.target_year
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = pay.phid_cnt AND bd.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),
-- 本年累计开单（物资点验单）
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
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = m76.u_htbh::bigint AND bd.phid_pc = m76.phid_pc)
    GROUP BY m76.u_htbh::bigint, m76.phid_pc
),

-- 开工累计开单（合同结算表，全历史）
settle_all_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.app_amt_vat_fc) AS settle_amt_all
    FROM pcm3_cnt_pay_m pay
    WHERE pay.app_status = 1
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = pay.phid_cnt AND bd.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),
-- 开工累计开单（物资点验单）
settle_all_material AS (
    SELECT 
        m76.u_htbh::bigint AS contract_id,
        m76.phid_pc,
        SUM(d.u_jshj) AS settle_amt_all
    FROM p_form0000700076_m m76
    INNER JOIN p_form0000700076_d d ON d.pphid = m76.phid
    WHERE m76.app_status = 1
      AND m76.u_kprq IS NOT NULL
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = m76.u_htbh::bigint AND bd.phid_pc = m76.phid_pc)
    GROUP BY m76.u_htbh::bigint, m76.phid_pc
),

-- 4. 零星采购金额统计（其他支出专用）
lxcg_temp_mon AS (
    SELECT 
        phid_pc,
        SUM(u_cgjehj) AS settle_amt_mon
    FROM p_form0000700182_m
    CROSS JOIN params p
    WHERE app_status = 1
      AND u_cbys = 5690000000003439   -- 其他支出成本要素ID
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
      AND u_cbys = 5690000000003439
      AND bill_dt IS NOT NULL
      AND EXTRACT(YEAR FROM bill_dt) = p.target_year
    GROUP BY phid_pc
),
lxcg_temp_all AS (
    SELECT 
        phid_pc,
        SUM(u_cgjehj) AS settle_amt_all
    FROM p_form0000700182_m
    WHERE app_status = 1
      AND u_cbys = 5690000000003439
      AND bill_dt IS NOT NULL
    GROUP BY phid_pc
),
lxcg_ewzb_summary AS (
    SELECT 
        phid_pc,
        SUM(u_cgjehj) AS u_ewzb
    FROM p_form0000700182_m
    WHERE app_status = 1 AND u_cbys = 5690000000003439
    GROUP BY phid_pc
),

-- 5. 项目指标（一维指标、责任成本）
project_metrics AS (
    SELECT 
        m.phid_pc AS project_id,
        COALESCE(SUM(DISTINCT pfxd1.u_bjflmb), 0) AS u_ywzb,
        COALESCE(SUM(DISTINCT pfzd2.u_zrcb), 0) AS u_zrcbzb
    FROM pcm3_cnt_m m
    LEFT JOIN p_form_xmbjfl_m pfxm ON pfxm.phid_pc = m.phid_pc
    LEFT JOIN p_form_xmbjfl_d1 pfxd1 ON pfxd1.pphid = pfxm.phid AND pfxd1.u_cbysmc = '其他服务类'
    LEFT JOIN p_form_zrcbxd_m pfzm ON pfzm.phid_pc = m.phid_pc
    LEFT JOIN p_form_zrcbxd_d2 pfzd2 ON pfzd2.pphid = pfzm.phid AND pfzd2.u_sdcbys = 5690000000003437
    WHERE m.bill_type NOT IN (1,2,3) AND m.app_status = 1
      AND m.phid_pc = (SELECT target_project_id FROM params)
    GROUP BY m.phid_pc
),

-- 6. 合约包指标（二维指标、合同金额）
sub_cont_pack_metrics AS (
    SELECT 
        bd.sub_cont_pack_id,
        bd.phid_pc,
        MAX(pdcp.target_incl_tax_amt) AS u_ewzb,
        SUM(bd.total_sum) AS u_htje
    FROM base_data bd
    LEFT JOIN pms3_dynamic_cont_pk pdcp ON pdcp.cont_divide_id = bd.sub_cont_pack_id
    GROUP BY bd.sub_cont_pack_id, bd.phid_pc
),

-- 7. 树形结构序号生成（基于项目过滤）
filtered_base AS (
    SELECT bd.* FROM base_data bd
    CROSS JOIN params p
    WHERE bd.phid_pc = p.target_project_id
),

distinct_cont_pack AS (
    SELECT DISTINCT
        sub_cont_pack_id,
        cont_pack_name,
        parent_pcpd_phid   -- 根节点ID（用于父级关联）
    FROM filtered_base
    WHERE sub_cont_pack_id IS NOT NULL
),

cont_pack_seq AS (
    SELECT 
        sub_cont_pack_id,
        parent_pcpd_phid,
        cont_pack_name,
        '8.' || ROW_NUMBER() OVER (ORDER BY cont_pack_name) AS tree_seq_no
    FROM distinct_cont_pack
),

-- 8. 构建树形结构（固定根节点 + 合约包层 + 合同层 + 零星采购行）
tree_structure AS (
    -- 第1层：固定根节点（项目其他服务合同成本）
    SELECT DISTINCT
        -1 AS s_tree_id,
        0 AS s_tree_pid,
        '8' AS tree_seq_no,
        '项目其他服务合同成本' AS s_tree_name,
        phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM filtered_base

    UNION ALL

    -- 第2层：合约包（子合约包）
    SELECT 
        cps.sub_cont_pack_id AS s_tree_id,
        -1 AS s_tree_pid,               -- 父节点为根节点
        cps.tree_seq_no,
        cps.cont_pack_name AS s_tree_name,
        fb.phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM cont_pack_seq cps
    CROSS JOIN (SELECT DISTINCT phid_pc FROM filtered_base) fb

    UNION ALL

    -- 第3层：合同
    SELECT 
        bd.cnt_m_phid AS s_tree_id,
        bd.sub_cont_pack_id AS s_tree_pid,
        cps.tree_seq_no || '.' || 
        ROW_NUMBER() OVER (PARTITION BY bd.sub_cont_pack_id ORDER BY bd.bill_no) AS tree_seq_no,
        bd.bill_name AS s_tree_name,
        bd.phid_pc,
        bd.cnt_m_phid AS phid_cnt,
        bd.bill_no AS u_htbh
    FROM filtered_base bd
    INNER JOIN cont_pack_seq cps ON bd.sub_cont_pack_id = cps.sub_cont_pack_id

    UNION ALL

    -- 固定零星采购行（挂在根节点下）
    SELECT DISTINCT
        -999 AS s_tree_id,
        -1 AS s_tree_pid,               -- 父节点为根节点
        '8.999' AS tree_seq_no,
        '零星采购' AS s_tree_name,
        phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM filtered_base
),

-- 9. 金额数据计算（每个节点只计算一次，直接使用参数时间）
amount_data AS (
    -- 9.1 根节点（项目其他服务合同成本）
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.phid_cnt,
        p.target_year AS tj_year,
        p.target_month AS tj_mon,
        pm.u_ywzb,
        pm.u_zrcbzb,
        -- 二维指标 = 所有合约包二维指标 + 零星采购累计
        COALESCE((SELECT SUM(u_ewzb) FROM sub_cont_pack_metrics scpm WHERE scpm.phid_pc = ts.phid_pc), 0)
        + COALESCE((SELECT u_ewzb FROM lxcg_ewzb_summary les WHERE les.phid_pc = ts.phid_pc), 0) AS u_ewzb,
        -- 合同金额 = 所有合约包合同金额之和
        COALESCE((SELECT SUM(u_htje) FROM sub_cont_pack_metrics scpm WHERE scpm.phid_pc = ts.phid_pc), 0) AS u_htje,
        COALESCE((SELECT SUM(u_htje) FROM sub_cont_pack_metrics scpm WHERE scpm.phid_pc = ts.phid_pc), 0) AS u_yjjsz,
        -- 本月开单 = 正常合同本月开单 + 零星采购本月
        COALESCE((
            SELECT SUM(
                CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                     WHEN bd.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END
            )
            FROM filtered_base bd
            LEFT JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bd.cnt_m_phid = smm.contract_id AND bd.phid_pc = smm.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) + COALESCE((SELECT settle_amt_mon FROM lxcg_temp_mon WHERE phid_pc = ts.phid_pc), 0) AS u_bykd,
        -- 本年累计开单
        COALESCE((
            SELECT SUM(
                CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN syc.settle_amt_year
                     WHEN bd.contract_mode IN ('purchase','mortgage') THEN sym.settle_amt_year ELSE 0 END
            )
            FROM filtered_base bd
            LEFT JOIN settle_year_cnt syc ON bd.cnt_m_phid = syc.contract_id AND bd.phid_pc = syc.phid_pc
            LEFT JOIN settle_year_material sym ON bd.cnt_m_phid = sym.contract_id AND bd.phid_pc = sym.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) + COALESCE((SELECT settle_amt_year FROM lxcg_temp_year WHERE phid_pc = ts.phid_pc), 0) AS u_bnljkd,
        -- 开工累计开单
        COALESCE((
            SELECT SUM(
                CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                     WHEN bd.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END
            )
            FROM filtered_base bd
            LEFT JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bd.cnt_m_phid = sam.contract_id AND bd.phid_pc = sam.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) + COALESCE((SELECT settle_amt_all FROM lxcg_temp_all WHERE phid_pc = ts.phid_pc), 0) AS u_kgljkd,
        -- 本月应收/应付 = 合同本月开单 * 支付比例之和（零星采购为0）
        COALESCE((
            SELECT SUM(
                (CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                      WHEN bd.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END) * bd.zfbl
            )
            FROM filtered_base bd
            LEFT JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bd.cnt_m_phid = smm.contract_id AND bd.phid_pc = smm.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        -- 开工累计应收/应付
        COALESCE((
            SELECT SUM(
                (CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                      WHEN bd.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END) * bd.zfbl
            )
            FROM filtered_base bd
            LEFT JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bd.cnt_m_phid = sam.contract_id AND bd.phid_pc = sam.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0 AS u_byssgck,
        0 AS u_kgljssgck,
        '' AS u_htzt
    FROM tree_structure ts
    CROSS JOIN params p
    INNER JOIN project_metrics pm ON ts.phid_pc = pm.project_id
    WHERE ts.tree_seq_no = '8'

    UNION ALL

    -- 9.2 合约包层（子合约包）
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.phid_cnt,
        p.target_year,
        p.target_month,
        0,0,
        COALESCE(scpm.u_ewzb, 0) AS u_ewzb,
        COALESCE(scpm.u_htje, 0) AS u_htje,
        COALESCE(scpm.u_htje, 0) AS u_yjjsz,
        -- 本月开单：该合约包下所有合同的本月开单汇总
        COALESCE((
            SELECT SUM(
                CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                     WHEN bd.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END
            )
            FROM filtered_base bd
            LEFT JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bd.cnt_m_phid = smm.contract_id AND bd.phid_pc = smm.phid_pc
            WHERE bd.sub_cont_pack_id = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_bykd,
        -- 本年累计
        COALESCE((
            SELECT SUM(
                CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN syc.settle_amt_year
                     WHEN bd.contract_mode IN ('purchase','mortgage') THEN sym.settle_amt_year ELSE 0 END
            )
            FROM filtered_base bd
            LEFT JOIN settle_year_cnt syc ON bd.cnt_m_phid = syc.contract_id AND bd.phid_pc = syc.phid_pc
            LEFT JOIN settle_year_material sym ON bd.cnt_m_phid = sym.contract_id AND bd.phid_pc = sym.phid_pc
            WHERE bd.sub_cont_pack_id = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_bnljkd,
        -- 开工累计
        COALESCE((
            SELECT SUM(
                CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                     WHEN bd.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END
            )
            FROM filtered_base bd
            LEFT JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bd.cnt_m_phid = sam.contract_id AND bd.phid_pc = sam.phid_pc
            WHERE bd.sub_cont_pack_id = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_kgljkd,
        -- 本月应付
        COALESCE((
            SELECT SUM(
                (CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                      WHEN bd.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END) * bd.zfbl
            )
            FROM filtered_base bd
            LEFT JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            LEFT JOIN settle_mon_material smm ON bd.cnt_m_phid = smm.contract_id AND bd.phid_pc = smm.phid_pc
            WHERE bd.sub_cont_pack_id = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        -- 开工累计应付
        COALESCE((
            SELECT SUM(
                (CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                      WHEN bd.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END) * bd.zfbl
            )
            FROM filtered_base bd
            LEFT JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            LEFT JOIN settle_all_material sam ON bd.cnt_m_phid = sam.contract_id AND bd.phid_pc = sam.phid_pc
            WHERE bd.sub_cont_pack_id = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN sub_cont_pack_metrics scpm ON ts.s_tree_id = scpm.sub_cont_pack_id AND ts.phid_pc = scpm.phid_pc
    WHERE ts.tree_seq_no LIKE '8.%' AND ts.tree_seq_no != '8.999' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 1

    UNION ALL

    -- 9.3 合同层
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.phid_cnt,
        p.target_year,
        p.target_month,
        0,0,0,
        bd.total_sum AS u_htje,
        bd.total_sum AS u_yjjsz,
        COALESCE(
            CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                 WHEN bd.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END, 0) AS u_bykd,
        COALESCE(
            CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN syc.settle_amt_year
                 WHEN bd.contract_mode IN ('purchase','mortgage') THEN sym.settle_amt_year ELSE 0 END, 0) AS u_bnljkd,
        COALESCE(
            CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                 WHEN bd.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END, 0) AS u_kgljkd,
        COALESCE(
            CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN smc.settle_amt_mon
                 WHEN bd.contract_mode IN ('purchase','mortgage') THEN smm.settle_amt_mon ELSE 0 END, 0) * bd.zfbl AS u_byysgck,
        COALESCE(
            CASE WHEN bd.contract_mode IN ('labor','speciality','lease','other') THEN sac.settle_amt_all
                 WHEN bd.contract_mode IN ('purchase','mortgage') THEN sam.settle_amt_all ELSE 0 END, 0) * bd.zfbl AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    INNER JOIN filtered_base bd ON ts.s_tree_id = bd.cnt_m_phid AND ts.phid_pc = bd.phid_pc
    LEFT JOIN settle_mon_cnt smc ON ts.s_tree_id = smc.contract_id AND ts.phid_pc = smc.phid_pc
    LEFT JOIN settle_year_cnt syc ON ts.s_tree_id = syc.contract_id AND ts.phid_pc = syc.phid_pc
    LEFT JOIN settle_all_cnt sac ON ts.s_tree_id = sac.contract_id AND ts.phid_pc = sac.phid_pc
    LEFT JOIN settle_mon_material smm ON ts.s_tree_id = smm.contract_id AND ts.phid_pc = smm.phid_pc
    LEFT JOIN settle_year_material sym ON ts.s_tree_id = sym.contract_id AND ts.phid_pc = sym.phid_pc
    LEFT JOIN settle_all_material sam ON ts.s_tree_id = sam.contract_id AND ts.phid_pc = sam.phid_pc
    WHERE ts.tree_seq_no LIKE '8.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 2

    UNION ALL

    -- 9.4 固定零星采购行
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.phid_cnt,
        p.target_year,
        p.target_month,
        0,0,
        COALESCE(les.u_ewzb, 0) AS u_ewzb,
        NULL AS u_htje,
        0 AS u_yjjsz,
        COALESCE(ltm.settle_amt_mon, 0) AS u_bykd,
        COALESCE(lty.settle_amt_year, 0) AS u_bnljkd,
        COALESCE(lta.settle_amt_all, 0) AS u_kgljkd,
        NULL AS u_byysgck,
        NULL AS u_kgljysgck,
        NULL, NULL, ''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN lxcg_ewzb_summary les ON ts.phid_pc = les.phid_pc
    LEFT JOIN lxcg_temp_mon ltm ON ts.phid_pc = ltm.phid_pc
    LEFT JOIN lxcg_temp_year lty ON ts.phid_pc = lty.phid_pc
    LEFT JOIN lxcg_temp_all lta ON ts.phid_pc = lta.phid_pc
    WHERE ts.tree_seq_no = '8.999'
)

-- 10. 最终输出
SELECT 
    ts.phid_pc,
    ts.s_tree_id,
    ts.s_tree_pid,
    ts.tree_seq_no AS s_tree_no,
    ts.u_htbh,
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
        WHEN ts.tree_seq_no = '8' THEN 1
        WHEN ts.tree_seq_no LIKE '8.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 1 THEN 
            CASE WHEN ts.tree_seq_no = '8.999' THEN 999 ELSE 2 END
        WHEN ts.tree_seq_no LIKE '8.%.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 2 THEN 3
        ELSE 4
    END,
    ts.tree_seq_no;