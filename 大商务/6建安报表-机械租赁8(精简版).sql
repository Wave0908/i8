-- 参数：项目ID、年份、月份（请替换实际值）
WITH
p AS (SELECT 5690000000023241 AS pid, 2026 AS yr, 4 AS mon),
pm AS (SELECT u_ywzb, u_zrcbzb FROM v_jxzl_project_metrics WHERE project_id = (SELECT pid FROM p)),
-- 各节点金额计算
amt AS (
    SELECT ts.id, ts.pid, ts.phid_pc, ts.seq,
        -- 根节点专用
        CASE WHEN ts.seq = '5' THEN (SELECT u_ywzb FROM pm) ELSE 0 END AS ywzb,
        CASE WHEN ts.seq = '5' THEN (SELECT u_zrcbzb FROM pm) ELSE 0 END AS zrcbzb,
        -- 二维指标
        CASE
            WHEN ts.seq = '5'      THEN COALESCE((SELECT SUM(u_ewzb) FROM v_jxzl_cont_pack_metrics WHERE phid_pc = ts.phid_pc),0) + COALESCE((SELECT ewzb FROM v_jxzl_lxcg_ewzb WHERE phid_pc = ts.phid_pc),0)
            WHEN ts.seq LIKE '5.%' AND POSITION('.' IN SUBSTR(ts.seq,3)) = 0 AND ts.seq != '5.999' THEN COALESCE((SELECT u_ewzb FROM v_jxzl_cont_pack_metrics WHERE cont_pack_id = ts.id AND phid_pc = ts.phid_pc),0)
            WHEN ts.seq LIKE '5.%.%' AND LENGTH(ts.seq)-LENGTH(REPLACE(ts.seq,'.','')) = 2 THEN COALESCE((SELECT u_ewzb FROM v_jxzl_sub_cont_pack_metrics WHERE sub_cont_pack_id = ts.id AND phid_pc = ts.phid_pc),0)
            WHEN ts.seq = '5.999'  THEN COALESCE((SELECT ewzb FROM v_jxzl_lxcg_ewzb WHERE phid_pc = ts.phid_pc),0)
            ELSE 0
        END AS ewzb,
        -- 合同金额
        CASE
            WHEN ts.seq = '5'      THEN COALESCE((SELECT SUM(u_htje) FROM v_jxzl_cont_pack_metrics WHERE phid_pc = ts.phid_pc),0)
            WHEN ts.seq LIKE '5.%' AND POSITION('.' IN SUBSTR(ts.seq,3)) = 0 AND ts.seq != '5.999' THEN COALESCE((SELECT SUM(u_htje) FROM v_jxzl_sub_cont_pack_metrics WHERE cont_pack_id = ts.id AND phid_pc = ts.phid_pc),0)
            WHEN ts.seq LIKE '5.%.%' AND LENGTH(ts.seq)-LENGTH(REPLACE(ts.seq,'.','')) = 2 THEN COALESCE((SELECT u_htje FROM v_jxzl_sub_cont_pack_metrics WHERE sub_cont_pack_id = ts.id AND phid_pc = ts.phid_pc),0)
            WHEN ts.seq LIKE '5.%.%.%' THEN (SELECT total_sum FROM v_jxzl_base WHERE cnt_m_phid = ts.id AND phid_pc = ts.phid_pc)
            ELSE 0
        END AS htje,
        -- 本月开单
        CASE
            WHEN ts.seq = '5'      THEN (SELECT COALESCE(SUM(amt),0) FROM v_jxzl_settle_mon WHERE phid_pc = ts.phid_pc AND yr = (SELECT yr FROM p) AND mon = (SELECT mon FROM p))
                                      + (SELECT COALESCE(amt,0) FROM v_jxzl_lxcg_mon WHERE phid_pc = ts.phid_pc AND yr = (SELECT yr FROM p) AND mon = (SELECT mon FROM p))
            WHEN ts.seq LIKE '5.%' AND POSITION('.' IN SUBSTR(ts.seq,3)) = 0 AND ts.seq != '5.999' THEN (SELECT COALESCE(SUM(s.amt),0) FROM v_jxzl_settle_mon s JOIN v_jxzl_base b ON s.contract_id = b.cnt_m_phid AND s.phid_pc = b.phid_pc WHERE b.parent_pcpd_phid = ts.id AND b.phid_pc = ts.phid_pc AND s.yr = (SELECT yr FROM p) AND s.mon = (SELECT mon FROM p))
            WHEN ts.seq LIKE '5.%.%' AND LENGTH(ts.seq)-LENGTH(REPLACE(ts.seq,'.','')) = 2 THEN (SELECT COALESCE(SUM(s.amt),0) FROM v_jxzl_settle_mon s JOIN v_jxzl_base b ON s.contract_id = b.cnt_m_phid AND s.phid_pc = b.phid_pc WHERE b.pcpd_phid = ts.id AND b.phid_pc = ts.phid_pc AND s.yr = (SELECT yr FROM p) AND s.mon = (SELECT mon FROM p))
            WHEN ts.seq LIKE '5.%.%.%' THEN (SELECT COALESCE(amt,0) FROM v_jxzl_settle_mon WHERE contract_id = ts.id AND phid_pc = ts.phid_pc AND yr = (SELECT yr FROM p) AND mon = (SELECT mon FROM p))
            WHEN ts.seq = '5.999'  THEN (SELECT COALESCE(amt,0) FROM v_jxzl_lxcg_mon WHERE phid_pc = ts.phid_pc AND yr = (SELECT yr FROM p) AND mon = (SELECT mon FROM p))
            ELSE 0
        END AS bykd,
        -- 本年累计开单 (类似逻辑，使用 v_jxzl_settle_year 和 v_jxzl_lxcg_year)
        -- 开工累计开单 (使用 v_jxzl_settle_all 和 v_jxzl_lxcg_all)
        -- 应收应付 (本月开单 * 支付比例 或 累计开单 * 支付比例)
        -- 为保持长度，此处仅示意，完整版见文末说明
        0 AS bnljkd, 0 AS kgljkd, 0 AS byysgck, 0 AS kgljysgck
    FROM v_jxzl_tree ts, p
    WHERE ts.phid_pc = p.pid
)
SELECT ts.phid_pc, ts.id AS s_tree_id, ts.pid AS s_tree_pid, ts.seq AS s_tree_no,
       ts.htbh AS u_htbh, ts.name AS s_tree_name,
       a.ywzb, a.zrcbzb, a.ewzb, a.htje, a.htje AS yjjsz,
       a.bykd, a.bnljkd, a.kgljkd, a.byysgck, a.kgljysgck,
       0 AS byssgck, 0 AS kgljssgck, '' AS htzt,
       (SELECT yr FROM p) AS tj_year, (SELECT mon FROM p) AS tj_mon
FROM v_jxzl_tree ts
JOIN amt a ON ts.id = a.id AND ts.phid_pc = a.phid_pc
CROSS JOIN p
WHERE ts.phid_pc = p.pid
ORDER BY CASE WHEN ts.seq = '5' THEN 1 WHEN ts.seq = '5.999' THEN 999 ELSE 2 END, ts.seq;