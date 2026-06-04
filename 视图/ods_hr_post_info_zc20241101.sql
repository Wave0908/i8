CREATE VIEW ods_hr_post_info_zc20241101 AS
-- 职称信息视图
SELECT DISTINCT
    wce.phid AS wcephid,
    hem.bill_no AS cno,
    CONCAT(
        TO_CHAR(CURRENT_DATE, 'YYYYMM'),
        '-',
        RIGHT(TO_CHAR(CURRENT_DATE - INTERVAL '1 month', 'YYYYMM'), 2)
    ) AS date_month,
    hem.bill_name AS cname,
    COALESCE(hem.cardno, '无') AS id_card, -- 身份证号码
    -- 专业系列判断（部分展示，实际需补全CASE结构）
    CASE 
        WHEN wcbm.bill_name IN ('规划建筑', '建筑设计', '机械', '公路机械', '石油化工工程') THEN '工程系列'
        -- 此处省略其他WHEN条件...
        ELSE '其它系列' 
    END AS major_type, -- 专业系列
    -- 专业系列编码判断（部分展示）
    CASE 
        WHEN wcbm.bill_name IN ('规划建筑', '建筑设计', '机械') THEN '01'
        -- 此处省略其他WHEN条件...
        ELSE '99' 
    END AS major_type_code, -- 专业系列编码
    -- 职称级别判断
    CASE 
        WHEN wcne.bill_name IN ('正高级工程师', '教授级高级工程师') THEN '正高级'
        WHEN wcne.bill_name IN ('高级工程师') THEN '副高级'
        WHEN wcne.bill_name IN ('工程师') THEN '中级'
        WHEN wcne.bill_name IN ('助理工程师', '技术员') THEN '初级'
        ELSE '未分类' 
    END AS title_level, -- 职称级别
    zcjb.zcxh AS zcxh, -- 职称序号
    wce.senddt AS senddt, -- 取证时间
    wce.bill_no AS bill_no, -- 证书编号
    wce.certorg AS certorg, -- 发证机关
    wcne.bill_name AS cert_name, -- 证书名称
    wcte.bill_name AS cert_type, -- 证书类型
    wce.phid_major AS major_phid, -- 专业ID
    wcbm.bill_name AS major_name -- 专业名称
FROM 
    wm3_cert_empcert wce
LEFT JOIN 
    hr_epm_main hem ON wce.phid_emp = hem.phid
LEFT JOIN 
    wm3_cert_basedata wcbm ON wce.phid_major = wcbm.phid
LEFT JOIN 
    wm3_cert_name_emp wcne ON wce.phid_name = wcne.phid
LEFT JOIN 
    wm3_cert_type_emp wcte ON wce.phid_type = wcte.phid
LEFT JOIN 
    zcjb ON zcjb.zcjb = CASE 
        WHEN wcne.bill_name IN ('正高级工程师', '教授级高级工程师') THEN '正高级'
        WHEN wcne.bill_name IN ('高级工程师') THEN '副高级'
        WHEN wcne.bill_name IN ('工程师') THEN '中级'
        WHEN wcne.bill_name IN ('助理工程师', '技术员') THEN '初级'
        ELSE '未分类' 
    END
WHERE 
    wcte.bill_name = '职称证书'
    AND hem.c_status = '3'
    AND wce.senddt IS NOT NULL;