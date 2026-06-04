CREATE VIEW aqscyhzltz AS -- 安全生产隐患治理台账  
SELECT  
    pf0163m.phid,  
    pf0163m.phid_pc,  
    pf0163m.bill_dt,  
    u_dyfxbh AS risk_no, -- 对应风险编号  
    u_zdfxkzyhze AS risk_find_person, -- 针对风险开展隐患responsible person  
    CASE  
        WHEN pf0163m.u_jcfx = '塔吊与起重吊装' THEN '塔吊起重机机起重吊装'  
        ELSE pf0163m.u_jcfx  
    END AS hazard_type, -- 隐患类型  
    '有' AS risk_exsit,  
    CASE  
        WHEN u_yhlxxl = '高处作业' THEN '悬空作业'  
        WHEN u_yhlxxl = '基坑工程' THEN '基坑支护'  
        WHEN u_yhlxxl = '脚手架' THEN '附着式升降脚手架'  
        WHEN u_yhlxxl = '模板支架' THEN '支架构造'  
        WHEN u_yhlxxl = '施工机具' THEN '钢筋机械'  
        WHEN u_yhlxxl = '施工用电' THEN '配电箱与开关箱'  
        WHEN u_yhlxxl = '文明施工' THEN '施工场地'  
        ELSE u_yhlxxl  
    END hazard_type_mini, -- 隐患类型小类  
    NULL AS hazard_type_third, -- 隐患类型-三级  
    NULL AS hazard_type_fourth, -- 隐患类型-四级  
    CAST(pt.bill_no AS VARCHAR) AS proj_code, -- 项目编号  
    pt.bill_name AS proj_name, -- 项目名称  
    NULL AS stype_equip_code, -- 设备编号  
    TRIM(REPLACE(REPLACE(REPLACE(pf0163m.u_yhms, CHR(10), ''), CHR(13), ''), ' ')) AS hazard_des, -- 隐患具体描述  
    pf0163m.u_level AS hazard_level, -- 隐患级别  
    CAST(COALESCE(pf0163m.u_punish_amt, 0) AS DECIMAL(10, 2)) AS punish_amt, -- 罚款金额  
    pf0163m.u_rectification AS is_bid_abar, -- 是否要求停工整改  
    COALESCE(TO_CHAR(pf0163m.u_rectificationtime, 'YYYY-MM-DD'), '无') AS abar_end_time, -- 停工整改完成复工时间  
    COALESCE(pf0163m.u_empid1, '无') AS abar_duty_person, -- 整改责任人  
    TO_CHAR(pf0163m.u_completiontime, 'YYYY-MM-DD') AS abar_ask_complete_time, -- 要求完成整改时间  
    TO_CHAR(pf0163m.u_completiontime, 'YYYY-MM-DD') AS end_abar_time, -- 完成整改时间  
    pf0163m.empid2 AS abar_accounting_person, -- 整改复核人姓名  
    TO_CHAR(pf0163m.u_inspectiontime, 'YYYY-MM-DD') AS accounting_time -- 复核时间  
FROM  
    p_form0000700163_m pf0163m  
LEFT JOIN project_table pt ON pt.phid = pf0163m.phid_pc  
WHERE  
    LENGTH(u_dyfxbh) > 10