-- =====================================================
-- 视图：建安报表-机械租赁树形数据（修正重复问题）
-- 功能：按指定项目、年份、月份，展示机械租赁的树形结构及当期财务指标
-- 参数：通过最终WHERE中的项目ID、年份、月份传入（硬编码或外部赋值）
-- =====================================================

-- 定义报表参数（可在最终查询中修改，此处先用常量，便于理解）
WITH 
params AS (
    SELECT 
        5690000000023241 AS target_project_id,  -- 目标项目ID
        2026 AS target_year,                     -- 目标年份
        4   AS target_month                     -- 目标月份
),

-- 1. 基础数据：合同 -> 子合约包 -> 父合约包（允许父级为空）
base_data AS (
    SELECT DISTINCT
        m.phid_pc,
        m.phid AS cnt_m_phid,
        m.bill_no,
        m.bill_name,
        m.total_sum,
        COALESCE(m.zfbl, 0) AS zfbl,
        m.app_status,
        pcpd.phid AS pcpd_phid,                 -- 子合约包ID
        pcpd.parent_id AS pcpd_parent_id,
        pcpd.cont_pack_code,
        pcpd.cont_pack_name,
        pcpd2.phid AS parent_pcpd_phid,         -- 父合约包ID（可能为NULL）
        pcpd2.parent_id AS parent_pcpd_parent_id,
        pcpd2.cont_pack_code AS parent_cont_pack_code,
        pcpd2.cont_pack_name AS parent_cont_pack_name
    FROM pcm3_cnt_m m
    INNER JOIN pcm3_cnt_d d ON m.phid = d.pphid AND m.app_status = 1
    INNER JOIN pms3_cont_pack_divide pcpd ON d.phid_cont_pack = pcpd.phid
    LEFT JOIN pms3_cont_pack_divide pcpd2 ON pcpd2.phid = pcpd.parent_id   -- 改为LEFT JOIN
    WHERE m.bill_type = 10 
      AND m.app_status = 1
      AND pcpd.tag_type = 6
),

-- 2. 按合同+项目汇总的开单金额（本月、本年累计、开工累计）带参数过滤
-- 本月开单（仅 target_year,target_month）
settle_mon_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.total_sum_bb) AS settle_amt_mon
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

-- 本年累计开单（仅 target_year）
settle_year_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.total_sum_bb) AS settle_amt_year
    FROM pcm3_cnt_pay_m pay
    CROSS JOIN params p
    WHERE pay.app_status = 1
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXTRACT(YEAR FROM pay.app_dt) = p.target_year
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = pay.phid_cnt AND bd.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),

-- 开工累计开单（全部时间）
settle_all_cnt AS (
    SELECT 
        pay.phid_cnt AS contract_id,
        pay.phid_pc,
        SUM(pay.total_sum_bb) AS settle_amt_all
    FROM pcm3_cnt_pay_m pay
    WHERE pay.app_status = 1
      AND pay.wf_flag = 2
      AND pay.app_dt IS NOT NULL
      AND EXISTS (SELECT 1 FROM base_data bd WHERE bd.cnt_m_phid = pay.phid_cnt AND bd.phid_pc = pay.phid_pc)
    GROUP BY pay.phid_cnt, pay.phid_pc
),

-- 3. 零星采购金额（按年月过滤）
lxcg_temp_mon AS (
    SELECT 
        lxcg.phid_pc,
        SUM(lxcg.u_cgjehj) AS settle_amt_mon
    FROM p_form0000700182_m lxcg
    CROSS JOIN params p
    WHERE lxcg.app_status = 1
      AND lxcg.u_cbys = 5690000000003436   -- 机械租赁成本要素
      AND lxcg.bill_dt IS NOT NULL
      AND EXTRACT(YEAR FROM lxcg.bill_dt) = p.target_year
      AND EXTRACT(MONTH FROM lxcg.bill_dt) = p.target_month
    GROUP BY lxcg.phid_pc
),

lxcg_temp_year AS (
    SELECT 
        lxcg.phid_pc,
        SUM(lxcg.u_cgjehj) AS settle_amt_year
    FROM p_form0000700182_m lxcg
    CROSS JOIN params p
    WHERE lxcg.app_status = 1
      AND lxcg.u_cbys = 5690000000003436
      AND lxcg.bill_dt IS NOT NULL
      AND EXTRACT(YEAR FROM lxcg.bill_dt) = p.target_year
    GROUP BY lxcg.phid_pc
),

lxcg_temp_all AS (
    SELECT 
        lxcg.phid_pc,
        SUM(lxcg.u_cgjehj) AS settle_amt_all
    FROM p_form0000700182_m lxcg
    WHERE lxcg.app_status = 1
      AND lxcg.u_cbys = 5690000000003436
      AND lxcg.bill_dt IS NOT NULL
    GROUP BY lxcg.phid_pc
),

lxcg_ewzb_summary AS (
    SELECT 
        lxcg.phid_pc,
        SUM(lxcg.u_cgjehj) AS u_ewzb
    FROM p_form0000700182_m lxcg
    WHERE lxcg.app_status = 1
      AND lxcg.u_cbys = 5690000000003436
    GROUP BY lxcg.phid_pc
),

-- 4. 层级序号生成（先获取所有不同的父合约包，再分子合约包）
-- 注意：此处先按项目过滤，提升性能
filtered_base AS (
    SELECT bd.* FROM base_data bd
    CROSS JOIN params p
    WHERE bd.phid_pc = p.target_project_id
),

-- 父合约包列表（用于生成 "5.x"）
distinct_parent_pack AS (
    SELECT DISTINCT
        parent_pcpd_phid AS phid,
        parent_pcpd_parent_id AS parent_id,
        parent_cont_pack_code,
        parent_cont_pack_name
    FROM filtered_base
    WHERE parent_pcpd_phid IS NOT NULL
),

cont_pack_seq AS (
    SELECT 
        phid,
        parent_id,
        parent_cont_pack_code,
        parent_cont_pack_name,
        '5.' || ROW_NUMBER() OVER (PARTITION BY parent_id ORDER BY parent_cont_pack_code) AS tree_seq_no
    FROM distinct_parent_pack
),

-- 子合约包列表（用于生成 "5.x.y"）
distinct_sub_pack AS (
    SELECT DISTINCT
        pcpd_phid AS phid,
        parent_pcpd_phid AS parent_id,
        cont_pack_code,
        cont_pack_name
    FROM filtered_base
    WHERE pcpd_phid IS NOT NULL
),

sub_cont_pack_seq AS (
    SELECT 
        sp.phid,
        sp.parent_id,
        sp.cont_pack_code,
        sp.cont_pack_name,
        cps.tree_seq_no || '.' || 
        ROW_NUMBER() OVER (PARTITION BY sp.parent_id ORDER BY sp.cont_pack_code) AS tree_seq_no
    FROM distinct_sub_pack sp
    INNER JOIN cont_pack_seq cps ON sp.parent_id = cps.phid
),

-- 5. 项目级指标（一维、责任成本）
project_metrics AS (
    SELECT 
        m.phid_pc AS project_id,
        COALESCE(SUM(pfxd1.u_bjflmb), 0) AS u_ywzb,
        COALESCE(SUM(pfzd2.u_zrcb), 0) AS u_zrcbzb
    FROM pcm3_cnt_m m
    CROSS JOIN params p
    LEFT JOIN p_form_xmbjfl_m pfxm ON pfxm.phid_pc = m.phid_pc
    LEFT JOIN p_form_xmbjfl_d1 pfxd1 ON pfxd1.pphid = pfxm.phid AND pfxd1.u_cbysmc = '机械租赁成本'
    LEFT JOIN p_form_zrcbxd_m pfzm ON pfzm.phid_pc = m.phid_pc
    LEFT JOIN p_form_zrcbxd_d2 pfzd2 ON pfzd2.pphid = pfzm.phid AND pfzd2.u_sdcbys = 5690000000003434
    WHERE m.bill_type = 10 AND m.app_status = 1 AND m.phid_pc = p.target_project_id
    GROUP BY m.phid_pc
),

-- 6. 合约包指标（二维指标、合同金额） - 使用SUM而非SUM(DISTINCT)
cont_pack_metrics AS (
    SELECT 
        bd.parent_pcpd_phid AS cont_pack_id,
        bd.phid_pc,
        MAX(pdcp.target_incl_tax_amt) AS u_ewzb,   -- 二维指标取最大值（同一合约包下重复值）
        SUM(bd.total_sum) AS u_htje                -- 直接求和，因base_data已去重
    FROM filtered_base bd
    LEFT JOIN pms3_dynamic_cont_pk pdcp ON pdcp.cont_divide_id = bd.parent_pcpd_phid
    WHERE bd.parent_pcpd_phid IS NOT NULL
    GROUP BY bd.parent_pcpd_phid, bd.phid_pc
),

sub_cont_pack_metrics AS (
    SELECT 
        bd.pcpd_phid AS sub_cont_pack_id,
        bd.parent_pcpd_phid AS cont_pack_id,
        bd.phid_pc,
        MAX(pdcp2.target_incl_tax_amt) AS u_ewzb,
        SUM(bd.total_sum) AS u_htje
    FROM filtered_base bd
    LEFT JOIN pms3_dynamic_cont_pk pdcp2 ON pdcp2.cont_divide_id = bd.pcpd_phid
    GROUP BY bd.pcpd_phid, bd.parent_pcpd_phid, bd.phid_pc
),

-- 7. 树形结构构建（固定层级 + 零星采购行，每个节点只出现一次）
tree_structure AS (
    -- 第1层：根节点 "机械租赁"
    SELECT DISTINCT
        -1 AS s_tree_id,                     -- 虚拟根ID
        0 AS s_tree_pid,
        '5' AS tree_seq_no,
        '机械租赁' AS s_tree_name,
        bd.phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM filtered_base bd
    
    UNION ALL
    
    -- 第2层：合约包 "5.1", "5.2" ...
    SELECT 
        cps.phid AS s_tree_id,
        COALESCE(cps.parent_id, 0) AS s_tree_pid,
        cps.tree_seq_no,
        cps.parent_cont_pack_name AS s_tree_name,
        fb.phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM cont_pack_seq cps
    CROSS JOIN (SELECT DISTINCT phid_pc FROM filtered_base) fb   -- 同一项目下所有节点共享项目ID
    
    UNION ALL
    
    -- 第3层：子合约包 "5.1.1", "5.1.2" ...
    SELECT 
        scps.phid AS s_tree_id,
        scps.parent_id AS s_tree_pid,
        scps.tree_seq_no,
        scps.cont_pack_name AS s_tree_name,
        fb.phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM sub_cont_pack_seq scps
    CROSS JOIN (SELECT DISTINCT phid_pc FROM filtered_base) fb
    
    UNION ALL
    
    -- 第4层：合同 "5.1.1.1", "5.1.1.2" ...
    SELECT 
        bd.cnt_m_phid AS s_tree_id,
        bd.pcpd_phid AS s_tree_pid,
        scps.tree_seq_no || '.' || 
        ROW_NUMBER() OVER (PARTITION BY bd.pcpd_phid ORDER BY bd.bill_no) AS tree_seq_no,
        bd.bill_name AS s_tree_name,
        bd.phid_pc,
        bd.cnt_m_phid AS phid_cnt,
        bd.bill_no AS u_htbh
    FROM filtered_base bd
    INNER JOIN sub_cont_pack_seq scps ON bd.pcpd_phid = scps.phid
    
    UNION ALL
    
    -- 固定零星采购行（显示在合约包下方）
    SELECT DISTINCT
        -999 AS s_tree_id,
        bd.parent_pcpd_parent_id AS s_tree_pid,
        '5.999' AS tree_seq_no,
        '零星采购' AS s_tree_name,
        bd.phid_pc,
        0 AS phid_cnt,
        '' AS u_htbh
    FROM filtered_base bd
),

-- 8. 金额数据计算（每个节点只计算一次，固定输出参数年月）
amount_data AS (
    -- 根节点（机械租赁）
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
        -- 二维指标 = 所有子合约包二维指标 + 零星采购累计
        COALESCE((SELECT SUM(cpm.u_ewzb) FROM cont_pack_metrics cpm WHERE cpm.phid_pc = ts.phid_pc), 0)
        + COALESCE((SELECT les.u_ewzb FROM lxcg_ewzb_summary les WHERE les.phid_pc = ts.phid_pc), 0) AS u_ewzb,
        -- 合同金额 = 所有子合约包合同金额之和
        COALESCE((SELECT SUM(cpm.u_htje) FROM cont_pack_metrics cpm WHERE cpm.phid_pc = ts.phid_pc), 0) AS u_htje,
        COALESCE((SELECT SUM(cpm.u_htje) FROM cont_pack_metrics cpm WHERE cpm.phid_pc = ts.phid_pc), 0) AS u_yjjsz,
        -- 本月开单 = 正常合同本月开单 + 零星采购本月
        COALESCE((SELECT SUM(smc.settle_amt_mon) FROM settle_mon_cnt smc WHERE smc.phid_pc = ts.phid_pc), 0)
        + COALESCE((SELECT ltm.settle_amt_mon FROM lxcg_temp_mon ltm WHERE ltm.phid_pc = ts.phid_pc), 0) AS u_bykd,
        -- 本年累计开单
        COALESCE((SELECT SUM(syc.settle_amt_year) FROM settle_year_cnt syc WHERE syc.phid_pc = ts.phid_pc), 0)
        + COALESCE((SELECT lty.settle_amt_year FROM lxcg_temp_year lty WHERE lty.phid_pc = ts.phid_pc), 0) AS u_bnljkd,
        -- 开工累计开单
        COALESCE((SELECT SUM(sac.settle_amt_all) FROM settle_all_cnt sac WHERE sac.phid_pc = ts.phid_pc), 0)
        + COALESCE((SELECT lta.settle_amt_all FROM lxcg_temp_all lta WHERE lta.phid_pc = ts.phid_pc), 0) AS u_kgljkd,
        -- 本月应收/应付 = 合同本月开单 * 支付比例 之和（零星采购为0）
        COALESCE((
            SELECT SUM(smc.settle_amt_mon * bd.zfbl)
            FROM filtered_base bd
            INNER JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        -- 开工累计应收/应付
        COALESCE((
            SELECT SUM(sac.settle_amt_all * bd.zfbl)
            FROM filtered_base bd
            INNER JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            WHERE bd.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0 AS u_byssgck,
        0 AS u_kgljssgck,
        '' AS u_htzt
    FROM tree_structure ts
    CROSS JOIN params p
    INNER JOIN project_metrics pm ON ts.phid_pc = pm.project_id
    WHERE ts.tree_seq_no = '5'
    
    UNION ALL
    
    -- 合约包层
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.phid_cnt,
        p.target_year,
        p.target_month,
        0 AS u_ywzb,
        0 AS u_zrcbzb,
        COALESCE(cpm.u_ewzb, 0) AS u_ewzb,
        -- 合同金额 = 其下子合约包的合同金额之和
        COALESCE((SELECT SUM(scpm.u_htje) FROM sub_cont_pack_metrics scpm 
                  WHERE scpm.cont_pack_id = ts.s_tree_id AND scpm.phid_pc = ts.phid_pc), 0) AS u_htje,
        COALESCE((SELECT SUM(scpm.u_htje) FROM sub_cont_pack_metrics scpm 
                  WHERE scpm.cont_pack_id = ts.s_tree_id AND scpm.phid_pc = ts.phid_pc), 0) AS u_yjjsz,
        -- 开单金额：其下所有合同的开单汇总
        COALESCE((
            SELECT SUM(smc.settle_amt_mon)
            FROM settle_mon_cnt smc
            WHERE EXISTS (
                SELECT 1 FROM filtered_base bd 
                WHERE bd.parent_pcpd_phid = ts.s_tree_id 
                  AND bd.phid_pc = ts.phid_pc
                  AND bd.cnt_m_phid = smc.contract_id
            )
        ), 0) AS u_bykd,
        COALESCE((
            SELECT SUM(syc.settle_amt_year)
            FROM settle_year_cnt syc
            WHERE EXISTS (
                SELECT 1 FROM filtered_base bd 
                WHERE bd.parent_pcpd_phid = ts.s_tree_id 
                  AND bd.phid_pc = ts.phid_pc
                  AND bd.cnt_m_phid = syc.contract_id
            )
        ), 0) AS u_bnljkd,
        COALESCE((
            SELECT SUM(sac.settle_amt_all)
            FROM settle_all_cnt sac
            WHERE EXISTS (
                SELECT 1 FROM filtered_base bd 
                WHERE bd.parent_pcpd_phid = ts.s_tree_id 
                  AND bd.phid_pc = ts.phid_pc
                  AND bd.cnt_m_phid = sac.contract_id
            )
        ), 0) AS u_kgljkd,
        -- 应收/应付
        COALESCE((
            SELECT SUM(smc.settle_amt_mon * bd.zfbl)
            FROM filtered_base bd
            INNER JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            WHERE bd.parent_pcpd_phid = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        COALESCE((
            SELECT SUM(sac.settle_amt_all * bd.zfbl)
            FROM filtered_base bd
            INNER JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            WHERE bd.parent_pcpd_phid = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN cont_pack_metrics cpm ON ts.s_tree_id = cpm.cont_pack_id AND ts.phid_pc = cpm.phid_pc
    WHERE ts.tree_seq_no LIKE '5.%' 
      AND ts.tree_seq_no != '5.999'
      AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 1
    
    UNION ALL
    
    -- 子合约包层
    SELECT 
        ts.s_tree_id,
        ts.s_tree_pid,
        ts.s_tree_name,
        ts.phid_pc,
        ts.phid_cnt,
        p.target_year,
        p.target_month,
        0,0,
        COALESCE(scpm.u_ewzb, 0),
        COALESCE(scpm.u_htje, 0) AS u_htje,
        COALESCE(scpm.u_htje, 0) AS u_yjjsz,
        -- 其下合同的开单汇总
        COALESCE((
            SELECT SUM(smc.settle_amt_mon)
            FROM settle_mon_cnt smc
            WHERE EXISTS (
                SELECT 1 FROM filtered_base bd 
                WHERE bd.pcpd_phid = ts.s_tree_id 
                  AND bd.phid_pc = ts.phid_pc
                  AND bd.cnt_m_phid = smc.contract_id
            )
        ), 0) AS u_bykd,
        COALESCE((
            SELECT SUM(syc.settle_amt_year)
            FROM settle_year_cnt syc
            WHERE EXISTS (
                SELECT 1 FROM filtered_base bd 
                WHERE bd.pcpd_phid = ts.s_tree_id 
                  AND bd.phid_pc = ts.phid_pc
                  AND bd.cnt_m_phid = syc.contract_id
            )
        ), 0) AS u_bnljkd,
        COALESCE((
            SELECT SUM(sac.settle_amt_all)
            FROM settle_all_cnt sac
            WHERE EXISTS (
                SELECT 1 FROM filtered_base bd 
                WHERE bd.pcpd_phid = ts.s_tree_id 
                  AND bd.phid_pc = ts.phid_pc
                  AND bd.cnt_m_phid = sac.contract_id
            )
        ), 0) AS u_kgljkd,
        -- 应收/应付
        COALESCE((
            SELECT SUM(smc.settle_amt_mon * bd.zfbl)
            FROM filtered_base bd
            INNER JOIN settle_mon_cnt smc ON bd.cnt_m_phid = smc.contract_id AND bd.phid_pc = smc.phid_pc
            WHERE bd.pcpd_phid = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_byysgck,
        COALESCE((
            SELECT SUM(sac.settle_amt_all * bd.zfbl)
            FROM filtered_base bd
            INNER JOIN settle_all_cnt sac ON bd.cnt_m_phid = sac.contract_id AND bd.phid_pc = sac.phid_pc
            WHERE bd.pcpd_phid = ts.s_tree_id AND bd.phid_pc = ts.phid_pc
        ), 0) AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    LEFT JOIN sub_cont_pack_metrics scpm ON ts.s_tree_id = scpm.sub_cont_pack_id AND ts.phid_pc = scpm.phid_pc
    WHERE ts.tree_seq_no LIKE '5.%' 
      AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 2
    
    UNION ALL
    
    -- 合同层
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
        COALESCE(smc.settle_amt_mon, 0) AS u_bykd,
        COALESCE(syc.settle_amt_year, 0) AS u_bnljkd,
        COALESCE(sac.settle_amt_all, 0) AS u_kgljkd,
        COALESCE(smc.settle_amt_mon, 0) * bd.zfbl AS u_byysgck,
        COALESCE(sac.settle_amt_all, 0) * bd.zfbl AS u_kgljysgck,
        0,0,''
    FROM tree_structure ts
    CROSS JOIN params p
    INNER JOIN filtered_base bd ON ts.s_tree_id = bd.cnt_m_phid AND ts.phid_pc = bd.phid_pc
    LEFT JOIN settle_mon_cnt smc ON ts.s_tree_id = smc.contract_id AND ts.phid_pc = smc.phid_pc
    LEFT JOIN settle_year_cnt syc ON ts.s_tree_id = syc.contract_id AND ts.phid_pc = syc.phid_pc
    LEFT JOIN settle_all_cnt sac ON ts.s_tree_id = sac.contract_id AND ts.phid_pc = sac.phid_pc
    WHERE ts.tree_seq_no LIKE '5.%' 
      AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 3
    
    UNION ALL
    
    -- 零星采购固定行
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
    WHERE ts.tree_seq_no = '5.999'
)

-- =====================================================
-- 最终查询：按树形序号排序，输出所有节点
-- =====================================================
SELECT 
    ts.phid_pc,
    ts.s_tree_id,
    ts.s_tree_pid,
    ts.tree_seq_no AS s_tree_no,
    ts.u_htbh,
    ts.s_tree_name,
    COALESCE(ad.u_ywzb, 0) AS u_ywzb,
    COALESCE(ad.u_zrcbzb, 0) AS u_zrcbzb,
    COALESCE(ad.u_ewzb, 0) AS u_ewzb,
    COALESCE(ad.u_htje, 0) AS u_htje,
    COALESCE(ad.u_yjjsz, 0) AS u_yjjsz,
    COALESCE(ad.u_bykd, 0) AS u_bykd,
    COALESCE(ad.u_bnljkd, 0) AS u_bnljkd,
    COALESCE(ad.u_kgljkd, 0) AS u_kgljkd,
    COALESCE(ad.u_byysgck, 0) AS u_byysgck,
    COALESCE(ad.u_kgljysgck, 0) AS u_kgljysgck,
    COALESCE(ad.u_byssgck, 0) AS u_byssgck,
    COALESCE(ad.u_kgljssgck, 0) AS u_kgljssgck,
    COALESCE(ad.u_htzt, '') AS u_htzt,
    ad.tj_year,
    ad.tj_mon
FROM tree_structure ts
LEFT JOIN amount_data ad ON ts.s_tree_id = ad.s_tree_id 
    AND ts.phid_pc = ad.phid_pc
    AND ts.s_tree_pid = ad.s_tree_pid
CROSS JOIN params p
WHERE ts.phid_pc = p.target_project_id
  AND (ad.tj_year = p.target_year OR ad.tj_year IS NULL)  -- 允许部分节点无年月（如零星采购行）
  AND (ad.tj_mon = p.target_month OR ad.tj_mon IS NULL)
ORDER BY 
    CASE 
        WHEN ts.tree_seq_no = '5' THEN 1
        WHEN ts.tree_seq_no LIKE '5.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 1 THEN 
            CASE WHEN ts.tree_seq_no = '5.999' THEN 999 ELSE 2 END
        WHEN ts.tree_seq_no LIKE '5.%.%' AND LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 2 THEN 3
        WHEN LENGTH(ts.tree_seq_no) - LENGTH(REPLACE(ts.tree_seq_no, '.', '')) = 3 THEN 4
        ELSE 5
    END,
    ts.tree_seq_no;