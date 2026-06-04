SELECT
  m.bill_no,
  pro.bill_name,
  e.compno,
  e.compname,
  cast(ct.name as VARCHAR (100)) as TYPES,
  cast( start_dt as VARCHAR (100)) start_dt,
  cast( end_dt as VARCHAR (100)) end_dt,
  zfbl zfbl,
  (SELECT taxrate FROM pcm3_cnt_d WHERE pphid = m.phid LIMIT 1) taxrate,
  Cnt_sum_vat,
  (SELECT SUM(Amt_vat_fc) Amt_vat_fc FROM pcm3_cnt_change_m WHERE app_status = 1 AND phid_cnt = m.phid GROUP BY phid_cnt) Amt_vat_fc,
  '' wtdlr,
  bylj.jsje byjs,
  bnlj.jsje bnjs,
  kglj.jsje kgjs,
  bylj.kk bykk,
  bnlj.kk bnkk,
  kglj.kk kgkk,
  kglj.fjje ljyfje,
  m.user_tzhdfkbl yfkbl,
  m.Zfbl Zfbl,
  byfk.fkje byfk,
  bnfk.fkje bnfk,
  kgfk.fkje kgfk,
  CASE
    WHEN COALESCE(Cnt_sum_vat, 0) = 0
      OR kgfk.fkje = 0 THEN
      NULL
    ELSE
      kgfk.fkje / Cnt_sum_vat
  END sjfkbl,
  kglj.fjje - kgfk.fkje ljqk,
  jgjs.user_bzje,
  jgjs.user_esje,
  jgjs.user_ysje,
  jgjs.Amt_Sum_All,
  CASE
    WHEN m.stat = 'new' THEN
      '新增'
    WHEN m.stat = 'con' THEN
      '进行'
    WHEN m.stat = 'clo' THEN
      '完成'
    ELSE
      '待定'
  END stat
FROM
  pcm3_cnt_m m
  LEFT JOIN project_table pro ON pro.phid = m.phid_pc
  LEFT JOIN fg3_enterprise e ON e.phid = m.phid_supply_ent
  LEFT JOIN (
    SELECT
      phid_cnt,
      SUM(COALESCE(t.app_amt_vat, 0)) jsje,
      SUM(t1.kk) kk
    FROM
      pcm3_cnt_pay_m t
      LEFT JOIN (SELECT pphid, SUM(COALESCE(Amt_vat_fc, 0)) kk FROM pcm3_cnt_pay_desc WHERE TYPE = 0 GROUP BY pphid) t1 ON t1.pphid = t.phid
    WHERE
      t.app_status = 1
      AND EXTRACT(YEAR FROM t.bill_Dt) = @nd
      AND EXTRACT(MONTH FROM t.bill_Dt) = @yf
    GROUP BY
      phid_cnt
  ) bylj ON bylj.phid_cnt = m.phid
  LEFT JOIN (
    SELECT
      phid_cnt,
      SUM(COALESCE(t.app_amt_vat, 0)) jsje,
      SUM(t1.kk) kk
    FROM
      pcm3_cnt_pay_m t
      LEFT JOIN (SELECT pphid, SUM(COALESCE(Amt_vat_fc, 0)) kk FROM pcm3_cnt_pay_desc WHERE TYPE = 0 GROUP BY pphid) t1 ON t1.pphid = t.phid
    WHERE
      t.app_status = 1
      AND EXTRACT(YEAR FROM t.bill_Dt) = @nd
    GROUP BY
      phid_cnt
  ) bnlj ON bnlj.phid_cnt = m.phid
  LEFT JOIN (
    SELECT
      phid_cnt,
      SUM(COALESCE(t.app_amt_vat, 0)) jsje,
      SUM(t1.kk) kk,
      SUM(COALESCE(t.user_bqyfkje, 0)) fjje
    FROM
      pcm3_cnt_pay_m t
      LEFT JOIN (SELECT pphid, SUM(COALESCE(Amt_vat_fc, 0)) kk FROM pcm3_cnt_pay_desc WHERE TYPE = 0 GROUP BY pphid) t1 ON t1.pphid = t.phid
    WHERE
      t.app_status = 1
      AND to_char(t.bill_Dt, 'YYYYMM') <= (@nd::text || LPAD(@yf::text, 2, '0'))
    GROUP BY
      phid_cnt
  ) kglj ON kglj.phid_cnt = m.phid
  LEFT JOIN (
    SELECT
      phid_cnt,
      SUM(COALESCE(Act_amt_vat, 0)) fkje
    FROM
      pcm3_cnt_projbal
    WHERE
      app_status = 1
      AND EXTRACT(YEAR FROM bill_Dt) = @nd
      AND EXTRACT(MONTH FROM bill_Dt) = @yf
    GROUP BY
      phid_cnt
  ) byfk ON byfk.phid_cnt = m.phid
  LEFT JOIN (
    SELECT
      phid_cnt,
      SUM(COALESCE(Act_amt_vat, 0)) fkje
    FROM
      pcm3_cnt_projbal
    WHERE
      app_status = 1
      AND EXTRACT(YEAR FROM bill_Dt) = @nd
    GROUP BY
      phid_cnt
  ) bnfk ON bnfk.phid_cnt = m.phid
  LEFT JOIN (
    SELECT
      phid_cnt,
      SUM(COALESCE(Act_amt_vat, 0)) fkje
    FROM
      pcm3_cnt_projbal
    WHERE
      app_status = 1
      AND to_char(bill_Dt, 'YYYYMM') <= (@nd::text || LPAD(@yf::text, 2, '0'))
    GROUP BY
      phid_cnt
  ) kgfk ON kgfk.phid_cnt = m.phid
  LEFT JOIN pcm3_cnt_final_m jgjs ON jgjs.phid_cnt = m.phid
  LEFT JOIN pcm3_cnt_type ct ON ct.phid = m.cnt_type
WHERE
  1 = 1
  AND m.app_status = 1
  AND m.cnt_type IN (2, 224200106000001)