CREATE VIEW ods_pm_proj_basic_info_tj AS
SELECT
    ppm.phid AS phid,
    fo.oname AS oname,
    '中国二十二冶集团有限公司' AS company, -- 所属公司
    REPLACE(REPLACE(REPLACE(REPLACE(IFNULL(pt.bill_name, '无'), CHR(13), ''), CHR(10), ''), CHR(9), ''), ' ', '') AS proj_name, -- 项目全称
    LEFT(REPLACE(REPLACE(REPLACE(REPLACE(IFNULL(pt.ab, '无'), CHR(13), ''), CHR(10), ''), CHR(9), ''), ' ', ''), 11) AS proj_name_abb, -- 项目简称
    IFNULL(pt.bill_no, '无') AS proj_code, -- 项目编号
    IFNULL(province.cname, '无') AS province, -- 所在省份
    IFNULL(city.cname, '无') AS city, -- 所在地市
    CASE
        WHEN pt.regionid = '130502' THEN '襄都区'
        WHEN pt.regionid = '130503' THEN '信都区'
        ELSE IFNULL(region.cname, '无')
    END AS county, -- 所在区县
    IFNULL(wt.type_name, '无') AS xmlx, -- 项目类型
    CASE
        WHEN user_cjms = '1' THEN '工程总承包'
        WHEN user_cjms = '2' THEN '施工总承包'
        WHEN user_cjms = '3' THEN '专业承包'
        WHEN user_cjms = '4' THEN '投融建'
        WHEN user_cjms = '5' THEN '其它'
        ELSE '无'
    END AS proj_type, -- 承建模式
    CASE
        WHEN user_sftrj = '1' THEN '是'
        ELSE '否'
    END AS is_invest_financ_build, -- 是否投融建
    IFNULL(fe.compname, '无') AS owner_name, -- 业主名称
    IFNULL(c.descript, '无') AS owner_type, -- 业主性质
    IFNULL(pt.bill_no, '无') AS qz_proj_code, -- 智慧工地项目编号
    REPLACE(REPLACE(REPLACE(REPLACE(IFNULL(LEFT(pt.g_situation, 300), '无'), CHR(13), ''), CHR(10), ''), CHR(9), ''), ' ', '') AS proj_des, -- 工程概况
    IFNULL(ppm_fj.asr_name, '无') AS project_effect_picture, -- 项目效果图
    DATE_FORMAT(pt.ng_insert_dt, '%Y-%m-%d %H:%i:%s') AS create_time, -- 创建时间
    DATE_FORMAT(pt.ng_update_dt, '%Y-%m-%d %H:%i:%s') AS update_datetime -- 更新时间
FROM
    project_table pt -- 项目信息表
    LEFT JOIN fg_orglist fo ON fo.phid = pt.phid_org -- 组织
    LEFT JOIN fg3_region province ON province.phid = pt.provinceid -- 省份
    LEFT JOIN fg3_region city ON city.phid = pt.cityid -- 地市
    LEFT JOIN fg3_region region ON region.phid = pt.regionid -- 区县
    LEFT JOIN wbs_type wt ON wt.phid = pt.phid_type -- 项目类型
    LEFT JOIN fg3_enterprise fe ON fe.phid = pt.phid_company -- 业主名称
    LEFT JOIN fg3_customfile_20221010 fc ON fc.phid_ent = fe.phid -- 客户信息
    LEFT JOIN custclass c ON c.phid = fc.custclass_id -- 客户类型
    LEFT JOIN pms3_pc_map ppm ON ppm.phid_pc = pt.phid
    LEFT JOIN pms3_pc_map_fjhb ppm_fj ON ppm_fj.asr_code = ppm.asr_code
WHERE
    pt.bill_flg = '1' 
    AND pt.app_status = '1'
    AND pt.virtual_flg = '4' 
    AND pt.Stat <> 'stp'
    AND wt.type_name NOT IN ('研发项目')
    AND pt.bill_name NOT LIKE '%不区分%'
    AND pt.bill_name NOT LIKE '%测试项目%'
    AND pt.bill_name NOT LIKE '%任跃%'
    AND pt.bill_name NOT LIKE '%功能测试%'
    AND pt.bill_name NOT IN ('集团标准库项目', '曹雪芹公园项目')
    AND pt.user_sfsczy IN ('1', '3')
    AND pt.user_tsxmmc = '1';