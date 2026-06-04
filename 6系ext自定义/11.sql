-- 1. 验证逻辑：查看待修改数据的当前状态（按单据+行号顺序）
SELECT 
    m.bill_no,
    d.lineid,
    d.fz AS 当前错误FZ,
    d.jnbl,
    d.jfxm
FROM p_form0000000265_m m 
LEFT JOIN p_form0000000265_d d ON m.phid = d.pphid 
WHERE m.bill_no = '20251225-0020' 
ORDER BY d.lineid;

-- 2. 验证逻辑：查看参考源数据的顺序（确认是否与目标数据行号一一对应）
SELECT 
    m.bill_no,
    d.lineid,
    d.fz AS 正确参考FZ,
    d.jflb AS jnlb,
    d.jfxm
FROM p_form0000000264_m m 
LEFT JOIN p_form0000000264_d d ON m.phid = d.pphid 
-- 注意：这里假设源表也通过某种方式能找到对应的记录，通常是通过配置表或固定模版
-- 如果 264 表是基础配置表，可能不需要 where bill_no，直接取其标准顺序
ORDER BY d.lineid;


-- 3. 执行更新：基于行号顺序（lineid）的强匹配更新
-- 假设：265表（目标表）和 264表（源表）的明细行是严格按 lineid 顺序一一对应的
-- 逻辑：使用 PostgreSQL/GaussDB 的 UPDATE FROM 语法

UPDATE p_form0000000265_d target_d
SET fz = source_data.correct_fz
FROM (
    -- 构建源数据映射：为每一行生成一个行号排名，用于对齐
    SELECT 
        d264.fz AS correct_fz,
        ROW_NUMBER() OVER (ORDER BY d264.lineid) AS rn
    FROM p_form0000000264_m m264
    JOIN p_form0000000264_d d264 ON m264.phid = d264.pphid
    -- 警告：这里需要确认 264 表是否只有一套标准数据？
    -- 如果 264 表有多套数据，必须加 WHERE 条件锁定那一套标准模版！
    -- 例如：WHERE m264.bill_no = 'STANDARD_TEMPLATE' 
) source_data,
(
    -- 构建目标数据映射：同样生成行号排名
    SELECT 
        d265.phid AS target_d_id,
        ROW_NUMBER() OVER (PARTITION BY m265.phid ORDER BY d265.lineid) AS rn
    FROM p_form0000000265_m m265
    JOIN p_form0000000265_d d265 ON m265.phid = d265.pphid
    -- 这里可以限定只更新特定的单据，或者去掉 WHERE 更新所有
    WHERE m265.sbnd = 2025 AND m265.sbyf > 9 -- 仅更新9月后的数据
) target_mapping
WHERE target_d.phid = target_mapping.target_d_id
AND target_mapping.rn = source_data.rn;


-- 4. 再次验证：检查更新后的结果
SELECT 
    m.bill_no,
    d.lineid,
    d.fz AS 更新后FZ,
    d.jnbl
FROM p_form0000000265_m m 
LEFT JOIN p_form0000000265_d d ON m.phid = d.pphid 
WHERE m.sbnd = 2025 AND m.sbyf > 9
ORDER BY m.bill_no, d.lineid;
