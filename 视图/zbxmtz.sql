CREATE VIEW zbxmtz AS
SELECT
    z.oname AS "上报单位",
    a.xmmc AS "项目名称",
    1 AS "项目数量",
    a.amt AS "价款",
    a.tbrq AS "投标日期",
    CASE 
        WHEN a.tbms = '01' THEN '公投' 
        ELSE '议标' 
    END AS "投标模式",
    CASE 
        WHEN a.tbjg = '01' THEN '中标' 
        WHEN a.tbjg = '02' THEN '未中标' 
        ELSE '等待结果' 
    END AS "投标结果",
    a.zbrq AS "中标日期",
    a.remarks AS "备注（不含陪标项目）"
FROM p_form0000000080_d a
LEFT JOIN fg_orglist z ON a.sbdw = z.phid  -- 关联上报单位
LEFT JOIN p_form0000000080_m m ON a.pphid = m.phid  -- 关联主表
LEFT JOIN fg3_workcycle g ON g.phid = m.gzzq  -- 关联工作周期表（未直接使用字段）
WHERE m.app_status = '1'  -- 已审核
  AND a.tbjg = '01';  -- 投标结果为中标