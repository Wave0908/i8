
CREATE VIEW hr_employee_joker_view AS 
SELECT 
     d.deptname, 
     hem.phid_org as companyno, 
     fos.bill_name as xrzw,                                                                                          
     fo.oname as company, 
     replace(coalesce(hem.bill_name, '无'), ' ', '') as name, 
     case 
         when hem.sexno='1' then '男' 
         when hem.sexno='2' then '女' 
         else '无' 
     end as sex, 
     case 
         when month(current_date) < month(heb.birthday) then year(current_date) - year(heb.birthday) - 1 
         when month(current_date) > month(heb.birthday) then year(current_date) - year(heb.birthday) 
         when month(current_date) = month(heb.birthday) and day(current_date) < day(heb.birthday) then year(current_date) - year(heb.birthday) - 1 
         when month(current_date) = month(heb.birthday) and day(current_date) >= day(heb.birthday) then year(current_date) - year(heb.birthday) 
     end nl, 
     to_char(heb.birthday, 'YYYY-MM-DD') as birthday, 
     coalesce(zgxl1.c_name, '无') as highest_edu, 
     hee1.eduorg as graduate_school, 
     hee1.Spec as dyzy, 
     hee.eduorg as graduate_school1, 
     coalesce(zgxw.c_name, '无') as highest_degree, 
     hee.degree, 
     hee.Spec as zgzy, 
     hem.user_xrzw as gw, 
     case 
         when fsd3.c_name = '合同制' then '正式员工' 	  
         else '劳务派遣' 
     end yglx, 
     coalesce(hel.mobile1, '无') as mobile, 
     coalesce(zzmm.c_name, '无') as politics_face,
     hem.phid as employee_phid
FROM hr_epm_main hem 
LEFT JOIN fg_orglist fo ON hem.phid_org = fo.phid 
LEFT JOIN fg_orglist fg ON fg.phid = hem.phid_org 
LEFT JOIN dept d ON d.phid = hem.phid_dept 
LEFT JOIN hr_epm_base heb ON hem.phid = heb.must_phid_todrop 
LEFT JOIN hr_epm_station hes ON hem.phid = hes.must_phid_todrop AND hes.assigntype = '0' 
LEFT JOIN fg_ogm_station fos ON hes.station = fos.phid   
LEFT JOIN fg_ogm_position fop ON fos.positioncode = fop.phid 
LEFT JOIN fg3_ogm_positiontype fopt ON fop.positiontype = fopt.phid 
LEFT JOIN fg_simple_data fsdd ON fsdd.phid = hem.talenttype  
LEFT JOIN fg_simple_data fsd ON fsd.phid = heb.folk 
LEFT JOIN hr_epm_edu hee ON hee.must_phid_todrop = hem.phid AND hee.ifhighedugrade = '1' 
LEFT JOIN hr_epm_edu hee1 ON hee1.must_phid_todrop = hem.phid AND hee1.user_csxl = '是'  
LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'edulevel') zgxl1 ON hee1.edugrade = zgxl1.phid 
LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data) zgxw ON hee.edugrade = zgxw.phid   
LEFT JOIN (SELECT phid, c_name, c_id FROM fg_simple_data WHERE c_type = 'edulevel') zgxl ON hee.edugrade = zgxl.phid 
LEFT JOIN hr_epm_link hel ON hel.must_phid_todrop = hem.phid 
LEFT JOIN (SELECT phid, c_name FROM fg_simple_data WHERE c_type = 'political') zzmm ON heb.political = zzmm.phid 
LEFT JOIN (SELECT phid, cname FROM hr_base_enum WHERE ctype = 'empstatus') hbe ON hbe.phid = hem.empstatus 
LEFT JOIN fg_simple_data fsd2 ON fsd2.phid = hem.JobTitle 
LEFT JOIN fg_simple_data fsd3 ON fsd3.phid = hem.EmpType;

-- 使用视图的查询示例
-- 将@phid变量放在视图外部的查询条件中
SELECT 
     deptname, 
     companyno, 
     xrzw,                                                                                          
     company, 
     name, 
     sex, 
     nl, 
     birthday, 
     highest_edu, 
     graduate_school, 
     dyzy, 
     graduate_school1,
     highest_degree, 
     degree, 
     zgzy, 
     gw, 
     yglx, 
     mobile, 
     politics_face
FROM hr_employee_joker_view 
WHERE employee_phid = @phid;