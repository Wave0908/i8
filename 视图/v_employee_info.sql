CREATE VIEW v_employee_info AS

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
    WHEN hem.empstatus = '34' THEN
      retiredt
    WHEN hem.empstatus = '35' THEN
      dimissdt
    ELSE
      NULL
  END AS status_date,
  d.parent_deptno
FROM
  hr_epm_station_20230527 hem
  LEFT JOIN fg_simple_data fsd ON fsd.phid = hem.admclass
  LEFT JOIN fg_ogm_station fos ON fos.phid = hem.station
  LEFT JOIN dept d ON d.phid = hem.dept
WHERE
  hem.empstatus NOT IN (SELECT phid FROM hr_base_enum WHERE ctype = 'empstatus' AND ccode IN (SELECT ccode FROM hr_epm_status_property WHERE isstatus IN ('04')));
  