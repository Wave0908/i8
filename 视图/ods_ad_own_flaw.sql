CREATE VIEW ods_ad_own_flaw AS
--内控缺陷自查
select      
'中国二十二冶集团有限公司' AS com_name,--子公司名称      
--fg.oname com_name,--子公司名称      

--convert(varchar(4),dateadd(month,-1,getDate()),112) year,--年份   
to_char(bill_dt, 'YYYY') AS year,--年份 

zdy_yf.name AS month,--月份      

d.textcol_2 AS interior_flaw_des,--自查发现的内控缺陷描述      

d.textcol_1 AS flow_name,--业务流程名称      
case      
when d.ddlbcol_1 = 1 then '财务'      
when d.ddlbcol_1 =2 then '非财务'      
end AS interior_flaw_kind,--自查内控缺陷种类      
case      
when d.ddlbcol_2 = 1 then '设计'      
when d.ddlbcol_2 =2 then '运行'      
end AS interior_flaw_type,--自查内控缺陷类别      
case      
when d.ddlbcol_3 = 1 then '重大'      
when d.ddlbcol_3 =2 then '重要'      
when d.ddlbcol_3 =3 then '一般'      
end AS interior_flaw_level,--自查内控缺陷等级      
fsd.c_name AS interior_problem_type,--内控评价发现问题类型      
d.textcol_3 AS interior_flaw_cause,--缺陷产生原因      
d.textcol_4 AS interior_flaw_influence,--已造成或潜在的影响      
d.textcol_5 AS rectify_comments,--整改意见      
case      
when d.ddlbcol_4 = 1 then '未开展'      
when d.ddlbcol_4 =2 then '整改中'      
when d.ddlbcol_4 =3 then '已完成'      
end AS rectify_type,--整改状态      

d.textcol_6 AS no_rectify_des,--未完成整改-整改情况描述      

d.textcol_7 AS no_rectify_cause,--未完成整改的原因      

d.textcol_8 AS no_rectify_plan,--未完成整改-下一步整改计划      

to_char(d.datetimecol_1, 'YYYY-MM-DD') AS no_rectify_finish_time,--未完成整改-预计完成整改时间      

d.textcol_9 AS inspection_result,--整改检查结果      

d.textcol_10 AS rectification_unit--负责整改单位      
 from p_form0000700355_m m  
 left join  p_form0000700355_d d on m.phid=d.pphid
 left join zdy_yf on zdy_yf.yue = m.userhelp_2      
 left join fg_simple_data fsd on fsd.phid = d.userhelp_1     
 where d.textcol_1 is not null;