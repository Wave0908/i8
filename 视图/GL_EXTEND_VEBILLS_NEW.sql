CREATE OR REPLACE VIEW ng.gl_extend_vebills_new
AS SELECT t.ac_code, t.uyear, t.tr_vendor, t.ocode, t_in.tbal_init, t0.de00, 
    t0.cr00, t1.de01, t1.cr01, t2.de02, t2.cr02, t3.de03, t3.cr03, t4.de04, 
    t4.cr04, t5.de05, t5.cr05, t6.de06, t6.cr06, t7.de07, t7.cr07, t8.de08, 
    t8.cr08, t9.de09, t9.cr09, t10.de10, t10.cr10, t11.de11, t11.cr11, t12.de12, 
    t12.cr12, t13.de13, t13.cr13, t14.de14, t14.cr14, t15.de15, t15.cr15
   FROM ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
            gl_extend_bills.tr_vendor, gl_extend_bills.ocode
           FROM ng.gl_extend_bills
          WHERE gl_extend_bills.tr_vendor IS NOT NULL
          GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
            gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
            sum(gl_extend_bills.tr_de) - sum(gl_extend_bills.tr_cr) AS tbal_init
           FROM ng.gl_extend_bills
          WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.extend_bill_type::text = 'glpz_bala'::text
          GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t_in ON t.ac_code::text = t_in.ac_code::text AND t.uyear::text = t_in.uyear::text AND t.tr_vendor::text = t_in.tr_vendor::text AND t.ocode::text = t_in.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
       gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
       sum(gl_extend_bills.tr_de) AS de00, sum(gl_extend_bills.tr_cr) AS cr00
      FROM ng.gl_extend_bills
     WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.extend_bill_type::text = 'glpz'::text AND gl_extend_bills.accper = 0
     GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t0 ON t.ac_code::text = t0.ac_code::text AND t.uyear::text = t0.uyear::text AND t.tr_vendor::text = t0.tr_vendor::text AND t.ocode::text = t0.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de01, sum(gl_extend_bills.tr_cr) AS cr01
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 1
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t1 ON t.ac_code::text = t1.ac_code::text AND t.uyear::text = t1.uyear::text AND t.tr_vendor::text = t1.tr_vendor::text AND t.ocode::text = t1.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de02, sum(gl_extend_bills.tr_cr) AS cr02
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 2
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t2 ON t.ac_code::text = t2.ac_code::text AND t.uyear::text = t2.uyear::text AND t.tr_vendor::text = t2.tr_vendor::text AND t.ocode::text = t2.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de03, sum(gl_extend_bills.tr_cr) AS cr03
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 3
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t3 ON t.ac_code::text = t3.ac_code::text AND t.uyear::text = t3.uyear::text AND t.tr_vendor::text = t3.tr_vendor::text AND t.ocode::text = t3.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de04, sum(gl_extend_bills.tr_cr) AS cr04
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 4
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t4 ON t.ac_code::text = t4.ac_code::text AND t.uyear::text = t4.uyear::text AND t.tr_vendor::text = t4.tr_vendor::text AND t.ocode::text = t4.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de05, sum(gl_extend_bills.tr_cr) AS cr05
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 5
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t5 ON t.ac_code::text = t5.ac_code::text AND t.uyear::text = t5.uyear::text AND t.tr_vendor::text = t5.tr_vendor::text AND t.ocode::text = t5.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de06, sum(gl_extend_bills.tr_cr) AS cr06
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 6
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t6 ON t.ac_code::text = t6.ac_code::text AND t.uyear::text = t6.uyear::text AND t.tr_vendor::text = t6.tr_vendor::text AND t.ocode::text = t6.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de07, sum(gl_extend_bills.tr_cr) AS cr07
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 7
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t7 ON t.ac_code::text = t7.ac_code::text AND t.uyear::text = t7.uyear::text AND t.tr_vendor::text = t7.tr_vendor::text AND t.ocode::text = t7.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de08, sum(gl_extend_bills.tr_cr) AS cr08
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 8
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t8 ON t.ac_code::text = t8.ac_code::text AND t.uyear::text = t8.uyear::text AND t.tr_vendor::text = t8.tr_vendor::text AND t.ocode::text = t8.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de09, sum(gl_extend_bills.tr_cr) AS cr09
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 9
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t9 ON t.ac_code::text = t9.ac_code::text AND t.uyear::text = t9.uyear::text AND t.tr_vendor::text = t9.tr_vendor::text AND t.ocode::text = t9.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de10, sum(gl_extend_bills.tr_cr) AS cr10
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 10
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t10 ON t.ac_code::text = t10.ac_code::text AND t.uyear::text = t10.uyear::text AND t.tr_vendor::text = t10.tr_vendor::text AND t.ocode::text = t10.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de11, sum(gl_extend_bills.tr_cr) AS cr11
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 11
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t11 ON t.ac_code::text = t11.ac_code::text AND t.uyear::text = t11.uyear::text AND t.tr_vendor::text = t11.tr_vendor::text AND t.ocode::text = t11.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de12, sum(gl_extend_bills.tr_cr) AS cr12
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 12
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t12 ON t.ac_code::text = t12.ac_code::text AND t.uyear::text = t12.uyear::text AND t.tr_vendor::text = t12.tr_vendor::text AND t.ocode::text = t12.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de13, sum(gl_extend_bills.tr_cr) AS cr13
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 13
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t13 ON t.ac_code::text = t13.ac_code::text AND t.uyear::text = t13.uyear::text AND t.tr_vendor::text = t13.tr_vendor::text AND t.ocode::text = t13.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de14, sum(gl_extend_bills.tr_cr) AS cr14
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 14
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t14 ON t.ac_code::text = t14.ac_code::text AND t.uyear::text = t14.uyear::text AND t.tr_vendor::text = t14.tr_vendor::text AND t.ocode::text = t14.ocode::text
   LEFT JOIN ( SELECT gl_extend_bills.ac_code, gl_extend_bills.uyear, 
    gl_extend_bills.tr_vendor, gl_extend_bills.ocode, 
    sum(gl_extend_bills.tr_de) AS de15, sum(gl_extend_bills.tr_cr) AS cr15
   FROM ng.gl_extend_bills
  WHERE gl_extend_bills.tr_vendor IS NOT NULL AND gl_extend_bills.accper = 15
  GROUP BY gl_extend_bills.ac_code, gl_extend_bills.uyear, gl_extend_bills.tr_vendor, gl_extend_bills.ocode) t15 ON t.ac_code::text = t15.ac_code::text AND t.uyear::text = t15.uyear::text AND t.tr_vendor::text = t15.tr_vendor::text AND t.ocode::text = t15.ocode::text;