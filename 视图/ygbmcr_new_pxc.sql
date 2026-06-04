WITH params AS (
  SELECT
    (CONCAT(2025, '-', LPAD(11::text, 2, '0'), '-01'))::date AS start_date,
    ((CONCAT(2025, '-', LPAD(11::text, 2, '0'), '-01'))::date + INTERVAL '1 month') AS end_date
) SELECT
  v.ccode,
  v.cno,
  v.cname,
  v.admclass,
  v.c_name,
  v.station,
  v.cname1,
  v.deptno,
  v.deptname
FROM
  v_employee_info v
  CROSS JOIN params p
WHERE
  (v.deptno LIKE 'A1001.0001%' OR v.parent_deptno LIKE 'A1001.0001%')
  AND v.c_status IN ('1', '2', '3')
  AND (
    (v.empstatus IN ('34', '35') AND LEFT(v.status_date, 7) = to_char(p.start_date, 'YYYY-MM'))
    OR (v.empstatus NOT IN ('34', '35'))
  )
  AND NOT EXISTS (
    SELECT
      1
    FROM
      p_form0000000161_d d
      JOIN p_form0000000161_m m ON d.pphid = m.phid
    WHERE
      d.ygbh = v.ccode
      AND m.YEAR = 2025
      AND m.MONTH = 11
      AND m.fylx = '电脑补贴'
  );