-- ng.gnkz_ygxx source

CREATE OR REPLACE VIEW ng.gnkz_ygxx
AS SELECT hr_epm_main.phid_dept, zz.oname AS zzname, hr_epm_main.sexno, 
    (EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hr_epm_base.birthday::date)) - 
        CASE
            WHEN EXTRACT(MONTH FROM CURRENT_DATE) < EXTRACT(MONTH FROM hr_epm_base.birthday::date) 
                OR (EXTRACT(MONTH FROM CURRENT_DATE) = EXTRACT(MONTH FROM hr_epm_base.birthday::date) 
                    AND EXTRACT(DAY FROM CURRENT_DATE) < EXTRACT(DAY FROM hr_epm_base.birthday::date)) 
            THEN 1
            ELSE 0
        END AS age, 
    hr_epm_main.jobtitle, zc.c_name AS zc_name, hr_epm_base.station, 
    gw.cname_todrop AS gw_name, hr_epm_base.edulevel, xl.c_name AS xl_name, 
    yglx.c_name, hr_epm_main.phid, 
    string_agg(zslx.cname_todrop::text, ', ' ORDER BY zslx.cname_todrop::text) AS certificates
FROM ng.hr_epm_main
LEFT JOIN ng.hr_epm_base ON hr_epm_main.phid::numeric = hr_epm_base.ccode::numeric
LEFT JOIN ng.fg_orglist zz ON hr_epm_main.phid_dept = zz.phid
LEFT JOIN ng.fg_simple_data zc ON hr_epm_main.jobtitle = zc.phid
LEFT JOIN ng.fg_ogm_station gw ON hr_epm_base.station = gw.phid
LEFT JOIN ng.fg_simple_data xl ON xl.phid = hr_epm_base.edulevel
LEFT JOIN ng.hr3_epm_type yglx ON hr_epm_main.emptype = yglx.phid
LEFT JOIN ng.wm3_cert_empcert zs ON hr_epm_main.phid = zs.phid_emp
LEFT JOIN ng.wm3_cert_name_emp zslx ON zs.phid_name = zslx.phid
GROUP BY hr_epm_main.phid_dept, zz.oname, hr_epm_main.sexno, hr_epm_base.birthday, 
    hr_epm_main.jobtitle, zc.c_name, hr_epm_base.station, gw.cname_todrop, 
    hr_epm_base.edulevel, xl.c_name, yglx.c_name, hr_epm_main.phid;