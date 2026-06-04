CREATE VIEW gl_proj_wb AS 
SELECT 
    gl_trnBALA.id, 
    gl_trnBALA.tr_date,  
    gl_trnBALA.tr_type,
    gl_trnBALA.tr_num,
    gl_trnBALA.tr_note, 
    gl_trnBALA.ac_code, 
    gl_trnBALA.tr_de,
    gl_trnBALA.tr_cr, 
    gl_trnBALA.tr_unite, 
    gl_trnBALA.unite_code, 
    gl_trnBALA.ocode, 
    (EXTRACT(YEAR FROM tr_date) + 1)::INTEGER AS uyear,  -- OpenGauss年份提取函数
    gl_trnBALA.tr_id,
    gl_trnBALA.tr_custom,
    gl_trnBALA.tr_vendor,
    gl_trnBALA.tr_code, 
    fg_acco.ac_bala, 
    -1 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trnBALA, fg_acco 
WHERE gl_trnBALA.ocode = fg_acco.ocode 
  AND gl_trnBALA.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn00.id, 
    gl_trn00.tr_date,  
    gl_trn00.tr_type,
    gl_trn00.tr_num,
    gl_trn00.tr_note, 
    gl_trn00.ac_code, 
    gl_trn00.tr_de,
    gl_trn00.tr_cr, 
    gl_trn00.tr_unite, 
    gl_trn00.unite_code, 
    gl_trn00.ocode, 
    CAST(gl_trn00.uyear AS INTEGER) AS uyear,
    gl_trn00.tr_id,
    gl_trn00.tr_custom,
    gl_trn00.tr_vendor,
    gl_trn00.tr_code, 
    fg_acco.ac_bala, 
    0 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn00, fg_acco 
WHERE gl_trn00.ocode = fg_acco.ocode 
  AND gl_trn00.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn01.id, 
    gl_trn01.tr_date,  
    gl_trn01.tr_type,
    gl_trn01.tr_num,
    gl_trn01.tr_note, 
    gl_trn01.ac_code, 
    gl_trn01.tr_de,
    gl_trn01.tr_cr, 
    gl_trn01.tr_unite, 
    gl_trn01.unite_code, 
    gl_trn01.ocode, 
    CAST(gl_trn01.uyear AS INTEGER) AS uyear,
    gl_trn01.tr_id,
    gl_trn01.tr_custom,
    gl_trn01.tr_vendor,
    gl_trn01.tr_code, 
    fg_acco.ac_bala, 
    1 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn01, fg_acco 
WHERE gl_trn01.ocode = fg_acco.ocode 
  AND gl_trn01.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn02.id, 
    gl_trn02.tr_date,  
    gl_trn02.tr_type,
    gl_trn02.tr_num,
    gl_trn02.tr_note, 
    gl_trn02.ac_code, 
    gl_trn02.tr_de,
    gl_trn02.tr_cr, 
    gl_trn02.tr_unite, 
    gl_trn02.unite_code, 
    gl_trn02.ocode, 
    CAST(gl_trn02.uyear AS INTEGER) AS uyear,
    gl_trn02.tr_id,
    gl_trn02.tr_custom,
    gl_trn02.tr_vendor,
    gl_trn02.tr_code, 
    fg_acco.ac_bala, 
    2 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn02, fg_acco 
WHERE gl_trn02.ocode = fg_acco.ocode 
  AND gl_trn02.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn03.id, 
    gl_trn03.tr_date,  
    gl_trn03.tr_type,
    gl_trn03.tr_num,
    gl_trn03.tr_note, 
    gl_trn03.ac_code, 
    gl_trn03.tr_de,
    gl_trn03.tr_cr, 
    gl_trn03.tr_unite, 
    gl_trn03.unite_code, 
    gl_trn03.ocode, 
    CAST(gl_trn03.uyear AS INTEGER) AS uyear,
    gl_trn03.tr_id,
    gl_trn03.tr_custom,
    gl_trn03.tr_vendor,
    gl_trn03.tr_code, 
    fg_acco.ac_bala, 
    3 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn03, fg_acco 
WHERE gl_trn03.ocode = fg_acco.ocode 
  AND gl_trn03.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn04.id, 
    gl_trn04.tr_date,  
    gl_trn04.tr_type,
    gl_trn04.tr_num,
    gl_trn04.tr_note, 
    gl_trn04.ac_code, 
    gl_trn04.tr_de,
    gl_trn04.tr_cr, 
    gl_trn04.tr_unite, 
    gl_trn04.unite_code, 
    gl_trn04.ocode, 
    CAST(gl_trn04.uyear AS INTEGER) AS uyear,
    gl_trn04.tr_id,
    gl_trn04.tr_custom,
    gl_trn04.tr_vendor,
    gl_trn04.tr_code, 
    fg_acco.ac_bala, 
    4 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn04, fg_acco 
WHERE gl_trn04.ocode = fg_acco.ocode 
  AND gl_trn04.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn05.id, 
    gl_trn05.tr_date,  
    gl_trn05.tr_type,
    gl_trn05.tr_num,
    gl_trn05.tr_note, 
    gl_trn05.ac_code, 
    gl_trn05.tr_de,
    gl_trn05.tr_cr, 
    gl_trn05.tr_unite, 
    gl_trn05.unite_code, 
    gl_trn05.ocode, 
    CAST(gl_trn05.uyear AS INTEGER) AS uyear,
    gl_trn05.tr_id,
    gl_trn05.tr_custom,
    gl_trn05.tr_vendor,
    gl_trn05.tr_code, 
    fg_acco.ac_bala, 
    5 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn05, fg_acco 
WHERE gl_trn05.ocode = fg_acco.ocode 
  AND gl_trn05.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn06.id, 
    gl_trn06.tr_date,  
    gl_trn06.tr_type,
    gl_trn06.tr_num,
    gl_trn06.tr_note, 
    gl_trn06.ac_code, 
    gl_trn06.tr_de,
    gl_trn06.tr_cr, 
    gl_trn06.tr_unite, 
    gl_trn06.unite_code, 
    gl_trn06.ocode, 
    CAST(gl_trn06.uyear AS INTEGER) AS uyear,
    gl_trn06.tr_id,
    gl_trn06.tr_custom,
    gl_trn06.tr_vendor,
    gl_trn06.tr_code, 
    fg_acco.ac_bala, 
    6 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn06, fg_acco 
WHERE gl_trn06.ocode = fg_acco.ocode 
  AND gl_trn06.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn07.id, 
    gl_trn07.tr_date,  
    gl_trn07.tr_type,
    gl_trn07.tr_num,
    gl_trn07.tr_note, 
    gl_trn07.ac_code, 
    gl_trn07.tr_de,
    gl_trn07.tr_cr, 
    gl_trn07.tr_unite, 
    gl_trn07.unite_code, 
    gl_trn07.ocode, 
    CAST(gl_trn07.uyear AS INTEGER) AS uyear,
    gl_trn07.tr_id,
    gl_trn07.tr_custom,
    gl_trn07.tr_vendor,
    gl_trn07.tr_code, 
    fg_acco.ac_bala, 
    7 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn07, fg_acco 
WHERE gl_trn07.ocode = fg_acco.ocode 
  AND gl_trn07.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn08.id, 
    gl_trn08.tr_date,  
    gl_trn08.tr_type,
    gl_trn08.tr_num,
    gl_trn08.tr_note, 
    gl_trn08.ac_code, 
    gl_trn08.tr_de,
    gl_trn08.tr_cr, 
    gl_trn08.tr_unite, 
    gl_trn08.unite_code, 
    gl_trn08.ocode, 
    CAST(gl_trn08.uyear AS INTEGER) AS uyear,
    gl_trn08.tr_id,
    gl_trn08.tr_custom,
    gl_trn08.tr_vendor,
    gl_trn08.tr_code, 
    fg_acco.ac_bala, 
    8 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn08, fg_acco 
WHERE gl_trn08.ocode = fg_acco.ocode 
  AND gl_trn08.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn09.id, 
    gl_trn09.tr_date,  
    gl_trn09.tr_type,
    gl_trn09.tr_num,
    gl_trn09.tr_note, 
    gl_trn09.ac_code, 
    gl_trn09.tr_de,
    gl_trn09.tr_cr, 
    gl_trn09.tr_unite, 
    gl_trn09.unite_code, 
    gl_trn09.ocode, 
    CAST(gl_trn09.uyear AS INTEGER) AS uyear,
    gl_trn09.tr_id,
    gl_trn09.tr_custom,
    gl_trn09.tr_vendor,
    gl_trn09.tr_code, 
    fg_acco.ac_bala, 
    9 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn09, fg_acco 
WHERE gl_trn09.ocode = fg_acco.ocode 
  AND gl_trn09.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn10.id, 
    gl_trn10.tr_date,  
    gl_trn10.tr_type,
    gl_trn10.tr_num,
    gl_trn10.tr_note, 
    gl_trn10.ac_code, 
    gl_trn10.tr_de,
    gl_trn10.tr_cr, 
    gl_trn10.tr_unite, 
    gl_trn10.unite_code, 
    gl_trn10.ocode, 
    CAST(gl_trn10.uyear AS INTEGER) AS uyear,
    gl_trn10.tr_id,
    gl_trn10.tr_custom,
    gl_trn10.tr_vendor,
    gl_trn10.tr_code, 
    fg_acco.ac_bala, 
    10 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn10, fg_acco 
WHERE gl_trn10.ocode = fg_acco.ocode 
  AND gl_trn10.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn11.id, 
    gl_trn11.tr_date,  
    gl_trn11.tr_type,
    gl_trn11.tr_num,
    gl_trn11.tr_note, 
    gl_trn11.ac_code, 
    gl_trn11.tr_de,
    gl_trn11.tr_cr, 
    gl_trn11.tr_unite, 
    gl_trn11.unite_code, 
    gl_trn11.ocode, 
    CAST(gl_trn11.uyear AS INTEGER) AS uyear,
    gl_trn11.tr_id,
    gl_trn11.tr_custom,
    gl_trn11.tr_vendor,
    gl_trn11.tr_code, 
    fg_acco.ac_bala, 
    11 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn11, fg_acco 
WHERE gl_trn11.ocode = fg_acco.ocode 
  AND gl_trn11.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn12.id, 
    gl_trn12.tr_date,  
    gl_trn12.tr_type,
    gl_trn12.tr_num,
    gl_trn12.tr_note, 
    gl_trn12.ac_code, 
    gl_trn12.tr_de,
    gl_trn12.tr_cr, 
    gl_trn12.tr_unite, 
    gl_trn12.unite_code, 
    gl_trn12.ocode, 
    CAST(gl_trn12.uyear AS INTEGER) AS uyear,
    gl_trn12.tr_id,
    gl_trn12.tr_custom,
    gl_trn12.tr_vendor,
    gl_trn12.tr_code, 
    fg_acco.ac_bala, 
    12 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn12, fg_acco 
WHERE gl_trn12.ocode = fg_acco.ocode 
  AND gl_trn12.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn13.id, 
    gl_trn13.tr_date,  
    gl_trn13.tr_type,
    gl_trn13.tr_num,
    gl_trn13.tr_note, 
    gl_trn13.ac_code, 
    gl_trn13.tr_de,
    gl_trn13.tr_cr, 
    gl_trn13.tr_unite, 
    gl_trn13.unite_code, 
    gl_trn13.ocode, 
    CAST(gl_trn13.uyear AS INTEGER) AS uyear,
    gl_trn13.tr_id,
    gl_trn13.tr_custom,
    gl_trn13.tr_vendor,
    gl_trn13.tr_code, 
    fg_acco.ac_bala, 
    13 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn13, fg_acco 
WHERE gl_trn13.ocode = fg_acco.ocode 
  AND gl_trn13.ac_code = fg_acco.ac_code 

UNION 

SELECT 
    gl_trn14.id, 
    gl_trn14.tr_date,  
    gl_trn14.tr_type,
    gl_trn14.tr_num,
    gl_trn14.tr_note, 
    gl_trn14.ac_code, 
    gl_trn14.tr_de,
    gl_trn14.tr_cr, 
    gl_trn14.tr_unite, 
    gl_trn14.unite_code, 
    gl_trn14.ocode, 
    CAST(gl_trn14.uyear AS INTEGER) AS uyear, 
    gl_trn14.tr_id,
    gl_trn14.tr_custom,
    gl_trn14.tr_vendor,
    gl_trn14.tr_code, 
    fg_acco.ac_bala, 
    14 AS accper, 
    tr_indivi,
    tr_dept,
    quantity 
FROM gl_trn14, fg_acco 
WHERE gl_trn14.ocode = fg_acco.ocode 
  AND gl_trn14.ac_code = fg_acco.ac_code;