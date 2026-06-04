SELECT tt.phid, tt.phid_org, tt.oname, tt.jhnd, tt.pxxmmc 
	 , tt.xmbh, tt.username, tt.pxmb, tt.bill_ori 
FROM ( 
	 SELECT t1.phid, t1.bill_ori, t2.phid_org, t3.oname, t2.jhnd 
		 , t1.pxxmmc, t1.xmbh, t4.username, t1.pxmb, t2.pxlb 
		 , t2.app_status 
	 FROM p_form0000000084_d t1 
		 LEFT JOIN p_form0000000084_m t2 ON t1.pphid = t2.phid 
		 LEFT JOIN fg_orglist t3 ON t2.phid_org = t3.phid 
		 LEFT JOIN fg3_user t4 ON t1.empid1 = t4.phid 
) tt 
WHERE tt.pxlb = '01' 
	 AND tt.app_status = '1' 
	 AND (tt.phid_org = 324191209000001 
		 AND tt.jhnd = 2025 
		 AND tt.bill_ori = '0' 
		 AND tt.phid NOT IN ( 
			 SELECT pfm.train_project 
			 FROM p_form0000000096_m pfm 
		 )) 
ORDER BY tt.phid ASC