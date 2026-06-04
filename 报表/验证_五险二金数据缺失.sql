-- 验证脚本 1: 首先确认 2025年9月以后 主表是否有数据
-- 如果这里记录数为0，说明根本没发起流程或录入数据
SELECT sbnd, sbyf, count(1) as 主表记录数
FROM p_form0000000265_m
WHERE sbnd = 2025 AND sbyf > 9
GROUP BY sbnd, sbyf;

--有记录数
--2025	12	93
--2025	11	98
--2025	10	105

-- 验证脚本 2: 深入明细表(p_form0000000265_d)，统计 9月后各险种(fz)的记录分布情况
-- 报表取数的关键 fz 值如下：
-- 医疗: 1,2,3; 大病: 4; 养老: 7,8,9; 失业: 10,11,12; 工伤: 13; 
-- 其它(zf): 16,17,18; 年金: 19,20,21
-- 关键点：观察结果中是否存在上述 fz 值。如果 fz 全是其他值，或者没有这些值，报表就会显示为空。
SELECT 
    m.sbnd AS 年份, 
    m.sbyf AS 月份, 
    d.fz AS 险种类型_FZ, 
    count(1) AS 记录条数,
    SUM(CASE WHEN d.jfdwsbs IS NULL THEN 1 ELSE 0 END) AS 金额为空条数,
    SUM(CASE WHEN d.jnbl IS NULL THEN 1 ELSE 0 END) AS 比例为空条数
FROM p_form0000000265_m m
JOIN p_form0000000265_d d ON m.phid = d.pphid
WHERE m.sbnd = 2025 AND m.sbyf > 9
GROUP BY m.sbnd, m.sbyf, d.fz
ORDER BY m.sbnd, m.sbyf, d.fz;

-- 结果为 
--2025	10		1775	0	0
--2025	11		1656	0	0
--2025	12		1571	0	0

-- 验证脚本 3: 抽样查看明细表原始数据
-- 直接看这几条数据里的 fz 是多少，以及 jfdwsbs, jnbl 是否真有值
SELECT 
    m.sbnd, 
    m.sbyf, 
    fg.oname as 单位名称, 
    d.fz, 
    d.jfdwsbs, 
    d.jnbl
FROM p_form0000000265_m m
LEFT JOIN fg_orglist fg ON m.u_jfdw = fg.phid
JOIN p_form0000000265_d d ON m.phid = d.pphid
WHERE m.sbnd = 2025 AND m.sbyf > 9
LIMIT 50;
--结果为
--2025	10	华北公司		150092.810000000000000	.098000000000000
--2025	10	华北公司		119706.310000000000000	.078000000000000
--2025	10	华北公司		30386.500000000000000	.020000000000000
--2025	10	华北公司		0.000000000000000	0.000000000000000

-- 验证脚本 4: 检查是否存在"只有主表，完全没有明细表"的数据
-- 如果这里查出来有数据，说明连明细行的壳子都没生成
SELECT 
    m.sbnd, m.sbyf, m.phid, fg.oname
FROM p_form0000000265_m m
LEFT JOIN fg_orglist fg ON m.u_jfdw = fg.phid
WHERE m.sbnd = 2025 AND m.sbyf > 9
AND NOT EXISTS (SELECT 1 FROM p_form0000000265_d d WHERE d.pphid = m.phid);
-- 结果为空