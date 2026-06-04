CREATE VIEW emp AS
SELECT DISTINCT 
    hr_epm_main.ccode AS emp_id,
    hr_epm_main.bill_no AS emp_no,
    (SELECT ocode FROM fg_orglist WHERE fg_orglist.phid = hr_epm_main.phid_org) AS org_id,
    ps_orgbase2.deptno AS dept_id,
    hr_epm_main.isdefault AS isdefault,
    hr_epm_main.bill_name AS s_name,
    hr_epm_main.sexno AS sex,
    hr_epm_main.defaproj AS duty,
    hr_epm_link.linkaddr AS site,
    hr_epm_link.commaddr AS addr,
    hr_epm_main.cardno AS id_card,
    hr_epm_main.account AS account,
    (SELECT cityno FROM fg3_region WHERE treelevel = '2' AND fg3_region.phid = hr_epm_base.city) AS city,
    (SELECT provinceno FROM fg3_region WHERE treelevel = '1' AND fg3_region.phid = hr_epm_base.province) AS province,
    (SELECT nationno FROM nation WHERE nation.phid = hr_epm_base.nation) AS country,
    hr_epm_link.pcode AS post,
    hr_epm_link.tell1 AS offi,
    hr_epm_link.ext1 AS ext,
    hr_epm_link.fax AS fax,
    hr_epm_link.mobile1 AS hdt,
    hr_epm_link.passon AS bp_no,
    hr_epm_link.email AS e_mail,
    (SELECT ccode FROM hr_base_enum WHERE hr_base_enum.ctype = 'empstatus' AND phid = hr_epm_main.empstatus) AS stat,
    hr_epm_main.cdescript AS memo,
    (SELECT ocode FROM fg_orglist WHERE fg_orglist.phid = hr_epm_main.phid_org) AS ocode,
    hr_epm_main.seq AS seq,
    NULL AS exp_flag,
    '0' AS if_aq_emp,
    hr_epm_main.level_code AS level_code,
    hr_epm_main.isblacklist AS isblacklist,
    (SELECT emptype FROM pr_emptype WHERE pr_emptype.phid = hr_epm_main.emptype) AS emptype
FROM 
    hr_epm_main
JOIN 
    hr_epm_link ON hr_epm_main.phid = hr_epm_link.pphid
JOIN 
    hr_epm_base ON hr_epm_main.phid = hr_epm_base.pphid
LEFT JOIN 
    (SELECT deptno, deptname, ocode FROM dept 
     UNION 
     SELECT ocode AS deptno, oname AS deptname, ocode FROM fg_orglist WHERE ifcorp = 'Y') AS ps_orgbase2 
    ON hr_epm_main.phid_dept = (SELECT phid FROM fg_orglist WHERE fg_orglist.ocode = ps_orgbase2.deptno)
    AND hr_epm_main.phid_org = (SELECT phid FROM fg_orglist WHERE fg_orglist.ocode = ps_orgbase2.ocode)
WHERE 
    hr_epm_base.systype = 0
    AND hr_epm_base.systype = hr_epm_link.systype

UNION 

SELECT DISTINCT 
    CONCAT('LMT', hr_ube_main.ccode) AS emp_id,
    hr_ube_main.bill_no AS emp_no,
    (SELECT ocode FROM fg_orglist WHERE fg_orglist.phid = hr_ube_main.phid_org) AS org_id,
    (SELECT ocode FROM fg_orglist WHERE fg_orglist.phid = hr_ube_main.phid_org) AS dept_id,
    '' AS isdefault,
    hr_ube_main.bill_name AS s_name,
    hr_ube_main.sexno AS sex,
    '' AS duty,
    '' AS site,
    '' AS addr,
    hr_ube_main.cardno AS id_card,
    '' AS account,
    '' AS city,
    '' AS province,
    '' AS country,
    '' AS post,
    '' AS offi,
    '' AS ext,
    '' AS fax,
    '' AS hdt,
    '' AS bp_no,
    '' AS e_mail,
    '' AS stat,
    '' AS memo,
    (SELECT ocode FROM fg_orglist WHERE fg_orglist.phid = hr_ube_main.phid_org) AS ocode,
    999999999 AS seq,
    NULL AS exp_flag,
    '0' AS if_aq_emp,
    '' AS level_code,
    hr_ube_main.canuse AS isblacklist,
    '' AS emptype
FROM 
    hr_ube_main;