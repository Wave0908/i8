WITH decimal_info AS (
    SELECT DISTINCT
        qty,
        -- 移除末尾的0后再计算小数位数
        LENGTH(RTRIM(SPLIT_PART(CAST(qty AS VARCHAR), '.', 2), '0')) AS decimal_places
    FROM kc_billbody 
    WHERE POSITION('.' IN CAST(qty AS VARCHAR)) > 0
),
max_decimal AS (
    SELECT MAX(decimal_places) AS max_places
    FROM decimal_info
)
SELECT 
    d.decimal_places AS max_decimal_places,
    ARRAY_AGG(d.qty) AS qty_values,
    -- 显示具体的数值及其小数位数
    ARRAY_AGG(d.qty || ' (小数位数: ' || d.decimal_places || ')') AS examples
FROM decimal_info d, max_decimal m
WHERE d.decimal_places = m.max_places
GROUP BY d.decimal_places;


