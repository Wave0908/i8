CREATE OR REPLACE VIEW ng.ods_pm_proj_basic_info_tj2 AS
SELECT
    pt.stat AS stat,
    fo.oname AS oname,
    '中国二十二冶集团有限公司' AS company, -- 所属公司
    REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(pt.bill_name, '无'), CHR(13), ''), CHR(10), ''), CHR(9), ''), ' ', '') AS proj_name, -- 项目全称
    LEFT(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(pt.ab, '无'), CHR(13), ''), CHR(10), ''), CHR(9), ''), ' ', ''), 11) AS proj_name_abb, -- 项目简称
    COALESCE(pt.bill_no, '无') AS proj_code, -- 项目编号
    COALESCE(wt.type_name, '无') AS xmlx, -- 项目类型
    CASE 
        WHEN user_sftrj = '1' THEN '是'
        ELSE '否' 
    END AS is_invest_financ_build, -- 是否投融建
    COALESCE(pt.bill_no, '无') AS qz_proj_code, -- 智慧工地项目编号
    REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(LEFT(pt.g_situation, 300), '无'), CHR(13), ''), CHR(10), ''), CHR(9), ''), ' ', '') AS proj_des, -- 工程概况
    TO_CHAR(pt.ng_insert_dt, 'YYYY-MM-DD HH24:MI:SS') AS create_time, -- 创建时间
    TO_CHAR(pt.ng_update_dt, 'YYYY-MM-DD HH24:MI:SS') AS update_datetime -- 更新时间
FROM
    ng.project_table pt -- 项目信息表
LEFT JOIN ng.fg_orglist fo ON fo.phid = pt.phid_org -- 组织
LEFT JOIN ng.wbs_type wt ON wt.phid = pt.phid_type -- 项目类型
WHERE
    pt.bill_flg = '1' 
    AND pt.app_status = '1'
    AND pt.virtual_flg = '4' 
    AND pt.stat <> 'stp'
    AND wt.type_name NOT IN ('研发项目')
    AND pt.bill_name NOT LIKE '%不区分%'
    AND pt.bill_name NOT LIKE '%测试项目%'
    AND pt.bill_name NOT LIKE '%任跃%'
    AND pt.bill_name NOT LIKE '%功能测试%'
    AND pt.bill_name NOT IN ('集团标准库项目', '曹雪芹公园项目')
    AND pt.user_sfsczy IN ('1')
    AND pt.user_tsxmmc IN ('1', '6', '7');