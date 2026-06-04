CREATE OR REPLACE VIEW v_employee_info AS


WITH excluded_statuses AS (
  SELECT DISTINCT be.phid
  FROM hr_base_enum be
  JOIN hr_epm_status_property sp ON be.ccode = sp.ccode
  WHERE be.ctype = 'empstatus' AND sp.isstatus = '04'
)
SELECT
  hem.phid AS ccode,
  hem.cno AS cno,
  hem.cname AS cname,
  hem.admclass AS admclass,
  fsd.c_name AS c_name,
  hem.station AS station,
  fos.bill_name AS cname1,
  d.deptno AS deptno,
  d.deptname AS deptname,
  hem.c_status,
  hem.empstatus,
  CASE
    WHEN hem.empstatus = '34' THEN hem.retiredt
    WHEN hem.empstatus = '35' THEN hem.dimissdt
    ELSE NULL
  END AS status_date,
  d.parent_deptno
FROM
  hr_epm_station_20230527 hem
  LEFT JOIN fg_simple_data fsd ON fsd.phid = hem.admclass
  LEFT JOIN fg_ogm_station fos ON fos.phid = hem.station
  LEFT JOIN dept d ON d.phid = hem.dept
  LEFT JOIN excluded_statuses ON hem.empstatus = excluded_statuses.phid
WHERE
  excluded_statuses.phid IS NULL;
  