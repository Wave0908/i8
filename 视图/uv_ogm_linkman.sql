CREATE OR REPLACE VIEW uv_ogm_linkman AS
    SELECT DISTINCT '0' AS type, '员工' typename, hr_epm_main.phid_org, hr_epm_main.phid_dept, fg_orglist.oname, hr_epm_main.bill_no, hr_epm_main.bill_name,
    CASE WHEN hr_epm_link.mobile1 IS NULL THEN hr_epm_link.mobile2 ELSE hr_epm_link.mobile1 END mobile1, hr_epm_link.email email, o2.oname xoname, hr_epm_link.wechat wechat, hr_epm_link.systime
    FROM hr_epm_main
    JOIN hr_epm_link ON hr_epm_main.phid = hr_epm_link.pphid
    JOIN fg_orglist ON fg_orglist.phid = hr_epm_main.phid_dept
    JOIN fg_orglist o2 ON hr_epm_main.phid_org = o2.phid
    WHERE hr_epm_link.systype = 0
    AND (isoperator <> '1' OR isoperator IS NULL)
    AND hr_epm_main.empstatus IN (
        SELECT phid FROM hr_base_enum
        WHERE hr_base_enum.ctype = 'empstatus'
        AND ccode IN (
            SELECT ccode FROM hr_epm_status_property
            WHERE isstatus = '01' AND isuse = '1'
        )
    )

    UNION

    SELECT DISTINCT '1' type, '客户联系人' typename, fg3_customfile.phid_org, fg3_customfile.phid_ent, fg3_enterprise.compname, CAST(fg3_linkman_m.phid AS CHAR(100)) c_code,
    fg3_linkman_m.cname cname, fg3_linkman_m.handset, fg3_linkman_m.email, o2.oname xoname, NULL wechat, CAST(NULL AS timestamp without time zone) systime
    FROM fg3_customfile
    JOIN fg3_linkman_rel ON fg3_customfile.phid = fg3_linkman_rel.phid_bill
    JOIN fg3_linkman_m ON fg3_linkman_m.phid = fg3_linkman_rel.phid_linkman
    JOIN fg_orglist o2 ON fg3_customfile.phid_org = o2.phid
    JOIN fg3_enterprise ON fg3_enterprise.phid = fg3_customfile.phid_ent
    WHERE fg3_customfile.customattr = 'U'

    UNION

    SELECT DISTINCT '2' type, '供应商联系人' typename, fg3_supplyfile.phid_org, fg3_supplyfile.phid_ent, fg3_enterprise.compname, CAST(fg3_linkman_m.phid AS CHAR(100)) c_code,
    fg3_linkman_m.cname, fg3_linkman_m.handset, fg3_linkman_m.email, o2.oname xoname, NULL wechat, CAST(NULL AS timestamp without time zone) systime
    FROM fg3_supplyfile
    JOIN fg3_linkman_m ON fg3_supplyfile.phid_ent = fg3_linkman_m.phid_ent
    JOIN fg_orglist o2 ON fg3_supplyfile.phid_ent = o2.phid
    JOIN fg3_enterprise ON fg3_enterprise.phid = fg3_supplyfile.phid_ent

    UNION

    SELECT DISTINCT '5' type, '业务员' typename, hr_epm_main.phid_org, hr_epm_main.phid_dept, fg_orglist.oname, hr_epm_main.bill_no, hr_epm_main.bill_name,
    CASE WHEN hr_epm_link.mobile1 IS NULL THEN hr_epm_link.mobile2 ELSE hr_epm_link.mobile1 END mobile1, hr_epm_link.email email,
    o2.oname xoname, hr_epm_link.wechat wechat, hr_epm_link.systime
    FROM hr_epm_main
    JOIN hr_epm_link ON hr_epm_main.phid = hr_epm_link.pphid
    JOIN fg_orglist ON fg_orglist.phid = hr_epm_main.phid_dept
    JOIN fg_orglist o2 ON hr_epm_main.phid_org = o2.phid
    WHERE hr_epm_link.systype = 0
    AND hr_epm_main.isoperator = 1
    AND hr_epm_main.empstatus IN (
        SELECT phid FROM hr_base_enum
        WHERE hr_base_enum.ctype = 'empstatus'
        AND ccode IN (
            SELECT ccode FROM hr_epm_status_property
            WHERE isstatus = '01' AND isuse = '1'
        )
    )

    UNION

    SELECT DISTINCT '6' type, '操作员' typename, 0 cboo, fg3_user.deptid dept,
    (SELECT oname FROM fg_orglist WHERE fg3_user.deptid = fg_orglist.phid) oname, fg3_user.userno, fg3_user.username cname, fg3_user.mobileno,
    fg3_user.email email, '' xoname, fg3_user.wechat wechat, CAST(NULL AS timestamp without time zone) systime
    FROM fg3_user
    WHERE fg3_user.lg_sign = '1'

    UNION

    SELECT DISTINCT '11' type, '外部人员' typename, 0 cboo, 0 dept, oname, ccode, cname, mobile, email, '' xoname, NULL wechat, CAST(NULL AS timestamp without time zone) systime
    FROM fg_outcontact_info;