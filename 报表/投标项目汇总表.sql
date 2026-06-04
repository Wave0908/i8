SELECT
z.oname AS "上报单位",
COUNT(a.phid) AS "投标项目数量",
SUM(amt) AS "投标总额（万元）",
SUM(CASE WHEN tbjg = '01' THEN 1 ELSE 0 END) AS "中标项目数量",
COALESCE(SUM(CASE WHEN tbjg = '01' THEN amt END), 0::numeric) AS "中标额（万元）"
FROM
p_form0000000080_d a
LEFT JOIN fg_orglist z ON a.sbdw = z.phid
LEFT JOIN p_form0000000080_m m ON a.pphid = m.phid
LEFT JOIN fg3_workcycle g ON g.phid = m.gzzq
WHERE
z.ocode = @sbdw
AND (NULLIF(@ks, '') IS NULL OR a.tbrq >= NULLIF(@ks, '')::timestamp)
AND (NULLIF(@js, '') IS NULL OR a.tbrq <= NULLIF(@js, '')::timestamp)
AND m.app_status = '1'
GROUP BY
z.oname;