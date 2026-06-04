CREATE  VIEW gnkz_xmxx
AS SELECT COALESCE(project_table.bill_no, '0') AS bill_no, 
    COALESCE(project_table.phid_type, 0) AS phid_type, 
    COALESCE(xmlx.type_name, '0') AS type_name, 
    COALESCE(project_table.project_address, '0') AS project_address, 
    COALESCE(project_table.phid_company, '0') AS phid_company, 
    COALESCE(jsdw.compname, '0') AS js_compname, 
    COALESCE(project_table.architect, '0') AS architect, 
    COALESCE(sjdw.compname, '0') AS sj_compname, 
    COALESCE(project_table.phid_sg_org, '0') AS phid_sg_org, 
    COALESCE(sgdw.compname, '0') AS sg_compname, 
    COALESCE(project_table.g_situation, '0') AS g_situation, 
    COALESCE(pcm3_cnt_m.cnt_sum_vat_fc, 0) AS cnt_sum_vat_fc, 
    COALESCE(pcm3_cnt_m.phid_reccomp_todrop, '0') AS phid_reccomp_todrop, 
    COALESCE(jfdw.compname, '0') AS jf_compname, 
    COALESCE(to_char(pcm3_cnt_m.signdt, 'YYYY-MM-DD'), '0') AS signdt, 
    COALESCE(project_table.phid, '0') AS phid, 
    COALESCE(to_char(project_table.start_date, 'YYYY-MM-DD'), '0') AS start_date, 
    COALESCE(to_char(project_table.end_date, 'YYYY-MM-DD'), '0') AS end_date, 
    COALESCE(project_table.limit_time, 0) AS limit_time
   FROM ng.project_table
   LEFT JOIN ng.pcm3_cnt_m ON project_table.phid = pcm3_cnt_m.phid_pc
   LEFT JOIN ng.wbs_type xmlx ON project_table.phid_type = xmlx.phid
   LEFT JOIN ng.fg3_enterprise jsdw ON project_table.phid_company = jsdw.phid
   LEFT JOIN ng.fg3_enterprise sjdw ON project_table.architect::double precision = sjdw.phid::double precision
   LEFT JOIN ng.fg3_enterprise sgdw ON project_table.phid_sg_org = sgdw.phid
   LEFT JOIN ng.fg3_enterprise jfdw ON pcm3_cnt_m.phid_reccomp_todrop = jfdw.phid
  WHERE pcm3_cnt_m.cnt_type::double precision = 5::double precision;