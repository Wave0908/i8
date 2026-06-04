CREATE VIEW lchsry AS
WITH zwlb_cte AS (
    SELECT 
        hes.pphid,
        min(pd7.gs_bm) AS bm
    FROM hr_epm_station hes
    LEFT JOIN fg_ogm_station fos ON fos.phid = hes.station
    LEFT JOIN p_form0000000257_d pd7 ON CAST(pd7.phid AS double precision) = CAST(fos.user_lczwlb AS double precision)
    GROUP BY hes.pphid
)
SELECT 
    concat(d.dwbh, d.bmbh) AS dw_bm,
    date_format(b_db_statement_start_timestamp(0), '%Y-%m-%d %H:%i:%s') AS "CREATETIME",
    '新中大' AS "CREATEUSER",
    pd7.gs_nm AS "HRZGZD_XRZW",
    date_format(b_db_statement_start_timestamp(0), '%Y-%m-%d %H:%i:%s') AS "LASTMODIFIEDTIME",
    '新中大' AS "LASTMODIFIEDUSER",
    d.bmbh AS "LSZGZD_BMBH",
    d.userid AS "LSZGZD_CUSTOMFILED1",
    d.dwbh AS "LSZGZD_DWBH",
    d.lszgzd_id AS "LSZGZD_FZ16",
    d.lszgzd_id AS "LSZGZD_ID",
    '01' AS "LSZGZD_RYSX",
    '0' AS "LSZGZD_TBBZ",
    '0' AS "LSZGZD_TYBZ",
    d.userid AS "LSZGZD_USERID",
    '0' AS "LSZGZD_WJRY",
    d.zjm AS "LSZGZD_ZGBH",
    d.zgxm AS "LSZGZD_ZGXM",
    d.zjm AS "LSZGZD_ZJM",
    '1' AS "LSZGZD_ZWBZ"
FROM p_form0000700030_d d
LEFT JOIN hr_epm_main hr ON d.zjm = hr.bill_no
LEFT JOIN zwlb_cte zwlb ON hr.phid = zwlb.pphid
LEFT JOIN p_form0000000257_d pd7 ON pd7.gs_bm = zwlb.bm AND pd7.zd = '核算人员职务'
WHERE d.zjm IN (SELECT "LSZGZD_ZJM" FROM hsryxz);