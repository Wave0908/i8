CREATE VIEW uv_caq_sample_record_rep AS
(
  -- 合并当前和历史质量检验记录
  SELECT 
    CAST(phid AS bigint) as phid,
    CAST(checkno AS varchar(60)) as checkno,
    CAST(wasteno AS varchar(8)) as wasteno,
    CAST(sampleno AS varchar(20)) as sampleno,
    CAST(value AS varchar(60)) as value,
    CAST(def_int1 AS integer) as def_int1,
    CAST(def_int2 AS integer) as def_int2,
    CAST(def_str1 AS varchar(60)) as def_str1,
    CAST(def_str2 AS varchar(60)) as def_str2,
    CAST(def_str3 AS varchar(60)) as def_str3,
    CAST(def_num1 AS numeric) as def_num1,
    CAST(def_num2 AS numeric) as def_num2,
    CAST(ocode AS varchar(20)) as ocode,
    CAST(dacode AS varchar(60)) as dacode,
    CAST(caq_mate_check_phid AS bigint) as caq_mate_check_phid
  FROM caq_sample_record
  UNION ALL
  SELECT 
    CAST(phid AS bigint) as phid,
    CAST(checkno AS varchar(60)) as checkno,
    CAST(wasteno AS varchar(8)) as wasteno,
    CAST(sampleno AS varchar(20)) as sampleno,
    CAST(value AS varchar(60)) as value,
    CAST(def_int1 AS integer) as def_int1,
    CAST(def_int2 AS integer) as def_int2,
    CAST(def_str1 AS varchar(60)) as def_str1,
    CAST(def_str2 AS varchar(60)) as def_str2,
    CAST(def_str3 AS varchar(60)) as def_str3,
    CAST(def_num1 AS numeric) as def_num1,
    CAST(def_num2 AS numeric) as def_num2,
    CAST(ocode AS varchar(20)) as ocode,
    CAST(dacode AS varchar(60)) as dacode,
    CAST(caq_mate_check_phid AS bigint) as caq_mate_check_phid
  FROM caq_sample_record_hi
);
