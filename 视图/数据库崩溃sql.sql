CREATE VIEW ods_pm_proj_time AS
--项目工期
select                                                                     
a.stat,                                                                  
pfm_78.phid,                                                                                                   
pfm_78.bill_no,                                                                                                
to_char(u_sbyf, 'YYYY-MM-DD')  as report_month ,  --上报月份                                                                                                                                                          
COALESCE(pt.bill_no,'无') as proj_code,                                                                                                                                
COALESCE(pt.bill_name,'无') as proj_name,  -- 项目名称                                                                                                                          
replace(replace(replace(replace(COALESCE(left(pfm_78.u_jcqk,300),'无'),char(13),''),char(10),''),char(9),''),' ','') as progress_des ,   --进展情况                                                                                                        
replace(replace(replace(replace(COALESCE(left(pfm_78.textcol_1,300),'无'),char(13),''),char(10),''),char(9),''),' ','') as progress_des_this_month,   --本月主要形象进度                                                                                                  

replace(replace(replace(replace(COALESCE(left(pfm_78.u_plan,300),'无'),char(13),''),char(10),''),char(9),''),' ','') as 'plan',   --项目下月进度计划                                                                                                        
--COALESCE(a.u_delay_days,'0') as delay_days_this_month,  -- 本月拖期天数                                                                                              
--COALESCE(a.u_ljts,'0') as delay_days,  -- 累计拖期天数                                                                                                                                                                        
COALESCE(pfm_78.u_delay_days,'0') as delay_days_this_month,  -- 本月拖期天数                                                                                              
COALESCE(pfm_78.u_ljts,'0') as delay_days,  -- 累计拖期天数        

case                                                                                                                                      
when  a.stat='sts' then '在建'                                                                               
--when  b.stat='cpl' then '完工'                                                                                                 
when  a.stat is null and pt.stat='cpl' then '完工'                                              
when  a.stat is null and pt.stat ='stp' and pt.phid in (select phid_pc from pcm3_cnt_final_m) then '已完已结'--2024年12月27日新加                                                                          
when  a.stat is null and pt.stat in ('wjs','clo','stp') or pt.stat='pcl'  then '竣工'                                                                                   
when  a.stat is null and pt.stat='pau' then '停缓建'                                                                                                                                                                                                              

when  a.stat is null and pt.stat='ywy' then '已完已结'                                                      
else '无' end proj_state,--项目状态     

COALESCE(pfd_277_fj.c_name,'无.pdf') as project_image_progress,--项目形象进度照片                    
--COALESCE(pfm_780_fj.c_name,'无') project_image_progress, --项目形象进度                  
pfm645_m.u_yetzhqz as cfmd_delay_days,-- 已确认延期天数              
pfm645_m.asr_name as delay_file--上传工期延期的证明文件                                                               
from p_form0000700277_m pfm_78                   
left join p_form0000700645_m_yq_fj pfm645_m on pfm645_m.phid_pc=pfm_78.phid_pc              
left join p_form0000700277_d1 pfd_277 on pfd_277.pphid=pfm_78.phid and  pfd_277.u_fjmc='项目形象进度照片'                                                                                     
left join p_form0000700277_d1_fjhb pfd_277_fj on pfd_277_fj.bill_code = pfd_277.phid                                                                                                                                                                           

left join project_table pt on  pt.phid=pfm_78.phid_pc               
left join wbs_type wt on wt.phid=pt.phid_type --项目类型                                                                                                                             
left join                                                                                                         
(                                                                                    
select                                                                                                        
user_pc_dept,                                                                                                        
pt.stat stat,                                                                                        

sum(COALESCE(pfm_78.u_delay_days,0)) as u_delay_days,                                                                                              
sum(COALESCE(pfm_78.u_ljts,0)) as u_ljts                                                                                                                           
from project_table pt                                                                   
left join p_form0000700277_m pfm_78 on  pt.phid=pfm_78.phid_pc                                                                                                      
left join pcm3_cnt_m pcm  on pcm.phid_pc= pt.phid                                                                                                        
left join wbs_type wt on wt.phid=pt.phid_type --项目类型                                                                                                        
where                                                                                                                             
pt.bill_flg='1' and pt.app_status='1'                                                                                                                                    
and pt.virtual_flg='4'                                                                                          
--and convert(varchar(6),u_sbyf,112) =convert(varchar(6),dateadd(month,-1,getdate()),112)                                                                                         
and wt.type_name not in ('研发项目')                                                                                                                                     
and pt.bill_name not like'%不区分%'                                                                                                                       
and pt.bill_name not LIKE '%测试项目%'                                                                                                 
and pt.bill_name not LIKE '%任跃%'                                                                                                                                   
and pt.bill_name not LIKE '%功能测试%'                                                                                                                                  
and pt.bill_name not in ('集团标准库项目','曹雪芹公园项目')                                                                                
and pt.user_sfsczy in ('1','3')             
--and pt.user_tsxmmc in ('1' ,'6','7')                                                                  
and pt.stat='sts'                                         
group by user_pc_dept,pt.stat                    
) a on a.user_pc_dept=pt.user_pc_dept                                                                                

--left join ( select                                                                            
--user_pc_dept,                                                                                                        
--pt.stat stat                                      
--from                                                                                                         
--project_table pt                                                                              
--left join wbs_type wt on wt.phid=pt.phid_type --项目类型                                             
--where                                                                                                                             
--pt.bill_flg='1' and pt.app_status='1'                                                                                       
--                                                                                      
--and pt.virtual_flg='4'                                                                          
--and wt.type_name not in ('研发项目')                                                                                                            
--and pt.project_name not like'%不区分%'                                                                                                    
--and pt.project_name not LIKE '%测试项目%'                                                                                                  
--and pt.project_name not LIKE '%任跃%'                                                                                                     
--and pt.project_name not LIKE '%功能测试%'                                                                                                                                  
--and pt.project_name not in ('集团标准库项目','曹雪芹公园项目')                                                                                                                                              
--and pt.user_sfsczy in ('1','3')                                                                                                  
----and pt.user_tsxmmc in ('1' ,'6','7')                                                                                                          
--and pt.stat='cpl'                                                                                                        
--group by user_pc_dept,pt.stat                                                                                                        
--) b on b.user_pc_dept=pt.user_pc_dept                                                                             
where pfm_78.app_status=1                                                                                                                 
and to_char(u_sbyf, 'YYYY-MM-DD') =to_char(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM-DD')                                                                                               
--and convert(varchar(6),u_sbyf,112)   ='202410'                                                               
and wt.type_name not in ('研发项目')                                                                                                                                                 
and pt.bill_name not like'%不区分%'                                                                                                                                    
and pt.bill_name not LIKE '%测试项目%'                                                                    
and pt.bill_name not LIKE '%任跃%'                                                                    
and pt.bill_name not LIKE '%功能测试%'                                                                        
and pt.bill_name not in ('集团标准库项目','曹雪芹公园项目')                                                                                                         
and pt.user_sfsczy='1'