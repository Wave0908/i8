CREATE VIEW v_hr_employee_info AS 
SELECT 
    a.phid, 
    a.bill_no AS cno, 
    a.bill_name AS cname, 
    CASE
        WHEN CAST(a.sexno AS VARCHAR) = '1' THEN '男'
        WHEN CAST(a.sexno AS VARCHAR) = '2' THEN '女'
        ELSE ''
    END AS sexno, 
    b.oname, 
    a.phid_dept, 
    c.deptname, 
    a.emptype, 
    d.c_name AS cs_name, 
    rzxx.assigntype, 
    CASE
        WHEN CAST(rzxx.assigntype AS VARCHAR) = '0' THEN '正式'
        WHEN CAST(a.sexno AS VARCHAR) = '3' THEN '借调'
        ELSE ''
    END AS assigntype_name, 
    j.gwmc, 
    j.gwlx, 
    j.gwcj, 
    j.zw, 
    a.jobtitle, 
    f.c_name AS jobtitle_name, 
    a.admclass, 
    g.c_name AS admclass_name, 
    a.empstatus, 
    e.levelname, 
    e.gradschool, 
    e.special, 
    e.graddt, 
    e.zzmm, 
    e.folkname, 
    e.joindt, 
    e.wrkdt, 
    e.birthday, 
    a.cardno, 
    h.address1, 
    h.mobile1
FROM ng.hr_epm_main a
LEFT JOIN ng.fg_orglist b ON a.phid_org = b.phid
LEFT JOIN dept c ON a.phid_dept = c.phid
LEFT JOIN (
    SELECT fg_simple_data.phid, fg_simple_data.c_name
    FROM ng.fg_simple_data
    WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'emptype'
) d ON a.emptype = d.phid
LEFT JOIN (
    SELECT fg_simple_data.phid, fg_simple_data.c_name
    FROM ng.fg_simple_data
    WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'tectitle'
) f ON f.phid = a.jobtitle
LEFT JOIN (
    SELECT 
        a.pphid, 
        a.wrkdt, 
        a.birthday, 
        a.graddt, 
        a.joindt, 
        a.edulevel, 
        a.gradschool, 
        a.special, 
        a.political, 
        a.folk, 
        b.c_name AS levelname, 
        c.c_name AS zzmm, 
        d.c_name AS folkname
    FROM ng.hr_epm_base a
    LEFT JOIN (
        SELECT fg_simple_data.phid, fg_simple_data.c_name
        FROM ng.fg_simple_data
        WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'edulevel'
    ) b ON b.phid = a.edulevel
    LEFT JOIN (
        SELECT fg_simple_data.phid, fg_simple_data.c_name
        FROM ng.fg_simple_data
        WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'political'
    ) c ON c.phid = a.political
    LEFT JOIN (
        SELECT fg_simple_data.phid, fg_simple_data.c_name
        FROM ng.fg_simple_data
        WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'folk'
    ) d ON d.phid = a.folk
) e ON e.pphid = a.phid
LEFT JOIN (
    SELECT fg_simple_data.phid, fg_simple_data.c_name
    FROM ng.fg_simple_data
    WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'pradmclass'
) g ON a.admclass = g.phid
LEFT JOIN ng.hr_epm_link h ON a.phid = h.pphid
LEFT JOIN (
    SELECT 
        a.pphid, 
        b.bill_no, 
        b.bill_name AS gwmc, 
        c.c_name AS gwcj, 
        d.c_name AS gwlx, 
        f.bill_name AS zw
    FROM ng.hr_epm_station a
    LEFT JOIN ng.fg_ogm_station b ON a.station = b.phid
    LEFT JOIN (
        SELECT fg_simple_data.phid, fg_simple_data.c_name
        FROM ng.fg_simple_data
        WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'stationlevel'
    ) c ON CAST(b.stationlevel AS NUMERIC) = CAST(c.phid AS NUMERIC)
    LEFT JOIN (
        SELECT fg_simple_data.phid, fg_simple_data.c_name
        FROM ng.fg_simple_data
        WHERE CAST(fg_simple_data.c_type AS VARCHAR) = 'stationkind'
    ) d ON CAST(b.stationkind AS NUMERIC) = CAST(d.phid AS NUMERIC)
    LEFT JOIN ng.fg_ogm_position f ON CAST(b.positioncode AS NUMERIC) = CAST(f.phid AS NUMERIC)
    WHERE CAST(a.assigntype AS NUMERIC) = 0
) j ON j.pphid = a.phid
LEFT JOIN ng.hr_epm_station rzxx ON CAST(a.phid AS NUMERIC) = CAST(rzxx.ccode AS NUMERIC) 
    AND (rzxx.assigntype IN (
        SELECT max(CAST(rzxx.assigntype AS VARCHAR)) AS max
        FROM ng.hr_epm_main hr
        LEFT JOIN ng.hr_epm_station rzxx ON CAST(hr.phid AS NUMERIC) = CAST(rzxx.ccode AS NUMERIC)
        WHERE hr.phid = a.phid 
        AND (CAST(rzxx.assigntype AS VARCHAR) IN ('0', '3'))
    ))
WHERE rzxx.assigntype IS NOT NULL;