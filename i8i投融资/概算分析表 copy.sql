SELECT 
pt.bill_name as 项目名,
    ptd.BUDGET_NO AS CBS, 
    ptd.BUDGET_NAME AS CBS名称, 
    ptd.tax_amt * 1.1 AS 估算金额, 
    ptd.tax_amt AS 概算金额, 
    ptd.tax_amt * 0.9 AS 施工图预算, 
    ptd.tax_amt * 0.81 AS 招标控制价, 
    SUM(pcd.amt_fc) AS 中标价, 
    SUM(pcd.amt_fc) AS 合同签订金额,
    sum(pcpd.amt_fc) as 累计支付金额,
    0 as 变更金额,
    0 as 变更占比
FROM 
    pco3_totalplancost_m ptm 
    LEFT JOIN pco3_totalplancost_d ptd ON ptm.phid = ptd.pphid  
    LEFT JOIN pcm3_cnt_d pcd ON ptd.phid_cbs = pcd.phid_cbs 
    LEFT JOIN pcm3_cnt_m pcm ON pcm.phid = pcd.pphid 
    left join pcm3_cnt_projbal_d pcpd on pcpd.phid_cbs = ptd.phid_cbs
    left join pcm3_cnt_projbal pcp on pcp.phid = pcpd.pphid
    left join project_table pt on ptm.phid_pc = pt.phid
WHERE 
    pcm.bill_type = 4 
    and pcp.bill_type = 4 
    and pcm.phid_pc = ptm.phid_pc
GROUP BY 
    ptd.BUDGET_NO, 
    ptd.BUDGET_NAME, 
    ptd.tax_amt,
    pt.bill_name
    