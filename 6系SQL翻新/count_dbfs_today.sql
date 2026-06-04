-- 适配GaussDB的SQL查询，替换SQL Server的datediff函数
SELECT count(phid) AS sl 
FROM p_form0000000236_m 
WHERE dbfs = '1' 
  AND CAST(bill_dt AS DATE) = CURRENT_DATE