select
	hr.phid hrphid,
	org.phid phid,
	org.ocode,
	org.oname gzdw,
	hr.bill_no cno,
	hr.bill_name hrname,
	hr.user_xrzw,
	fgdata.c_name gbcj,
	hrenum.cname ygzt,
	hr.empstatus,
	fgdata1.c_name ybrgx,
	hrcorrel.cname qsxm,
	hrcorrel.birthday csrq,
	EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM hrcorrel.birthday) as age,
	hrcorrel.workcorp gzdw1,
	hrcorrel.ProtechDuty gwzw
from
	hr_epm_main hr
left join fg_simple_data fgdata on
	fgdata.phid = hr.user_gbcj
left join hr_base_enum hrenum on
	hrenum.phid = hr.empstatus
left join hr_epm_correl hrcorrel on
	hrcorrel.pphid = hr.ccode
left join fg_simple_data fgdata1 on
	fgdata1.phid = hrcorrel.correl
left join fg_orglist org on
	org.phid = hr.phid_org
where
	hr.user_gbcj in (224210928000011, 224210928000012, 221025033136, 224210615000036, 224210615000037, 224210615000038, 224210615000039)
	and hrenum.phid not in (34, 35, 300)
	and hr.dimissdt is null
	and hr.c_status = 3
	and org.phid = @phid
	and hr.bill_name like '%' || replace(replace(@cname, ' ', ''), CHR(13), '') || '%'
order by
	org.ocode,
	hr.bill_no asc