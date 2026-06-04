CREATE VIEW dwzxzg AS 

SELECT 
    CAST(phid AS varchar) AS phid,
    CAST(ocode AS varchar) AS ocode,
    oname 
FROM fg_orglist 
WHERE ifcorp = 'Y' 
  AND isactive = '1' 

UNION ALL

SELECT 
    CAST(phid AS varchar) AS phid,
    CAST(ocode AS varchar) AS ocode,
    oname 
FROM fg_orglist 
WHERE CHAR_LENGTH(ocode) < 11 
  AND parent_orgid = '324191209000001' 
  AND (oname LIKE '%项目%' OR oname LIKE '%中心%')

UNION ALL

SELECT 
    CAST(phid AS varchar) AS phid,
    CAST(ocode AS varchar) AS ocode,
    oname 
FROM fg_orglist 
WHERE phid = '548191210000002'

UNION ALL

SELECT 
    CAST(phid AS varchar) AS phid,
    CAST(phid AS varchar) AS ocode,
    u_lsdw AS oname 
FROM p_form0000700531_d;