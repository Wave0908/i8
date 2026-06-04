SELECT
  project_table.bill_name,
  fg_orglist.oname,
  COALESCE (t.cnt_amt, 0) AS cnt_amt,
  COALESCE (t1.cz_amt, 0) AS cz_amt,
  COALESCE (t3.cnt_jsamt, 0) AS js_amt,
  COALESCE (t2.get_amt, 0) AS cnt_getamt,
  (
    CASE
      WHEN (COALESCE (t3.cnt_jsamt, 0) = 0) THEN
        0
      ELSE
        ROUND(COALESCE (t2.get_amt, 0) / COALESCE (t3.cnt_jsamt, 0), 4)
    END
  ) AS cnt_ysbl,
  COALESCE (t4.cnt_payamt, 0) AS cnt_payamt,
  COALESCE (t5.cnt_fcamt, 0) AS cnt_fcamt,
  COALESCE (t6.cnt_jsfcamt, 0) + COALESCE (t7.cnt_jszlamt, 0) AS cnt_jszc,
  (
    CASE
      WHEN (COALESCE (t6.cnt_jsfcamt, 0) + COALESCE (t7.cnt_jszlamt, 0) = 0) THEN
        0
      ELSE
        ROUND(
          COALESCE (t5.cnt_fcamt, 0) / (COALESCE (t6.cnt_jsfcamt, 0) + COALESCE (t7.cnt_jszlamt, 0)),
          4
        )
    END
  ) AS cnt_yfbl
FROM
  project_table
  LEFT JOIN fg_orglist ON project_table.phid_org = fg_orglist.phid
  LEFT OUTER JOIN (SELECT phid_pc, SUM(cnt_sum_vat_fc) AS cnt_amt FROM pcm3_cnt_m WHERE (bill_type IN (1, 2, 3)) GROUP BY phid_pc) AS t ON t.phid_pc = project_table.phid
  LEFT OUTER JOIN (SELECT phid_pc, SUM(amt_sum) AS cz_amt FROM pms3_cz_act_m GROUP BY phid_pc) AS t1 ON t1.phid_pc = project_table.phid
  LEFT OUTER JOIN (
    SELECT
      b.phid_pc,
      SUM(a.rec_amt_fc) AS get_amt
    FROM
      pcm3_cnt_m AS b
      LEFT OUTER JOIN fc3_fund_allot AS a ON a.phid_con = b.phid
    GROUP BY
      b.phid_pc
  ) AS t2 ON t2.phid_pc = project_table.phid
  LEFT OUTER JOIN (SELECT phid_pc, SUM(app_amt_vat_fc) AS cnt_jsamt FROM pcm3_cnt_pay_m WHERE (bill_type IN (1, 2, 3)) GROUP BY phid_pc) AS t3 ON t3.phid_pc = project_table.phid
  LEFT OUTER JOIN (
    SELECT
      phid_pc,
      SUM(cnt_sum_vat_fc) AS cnt_payamt
    FROM
      pcm3_cnt_m
    WHERE
      (bill_type IN (4, 5, 6, 7))
    GROUP BY
      phid_pc
  ) AS t4 ON t4.phid_pc = project_table.phid
  LEFT OUTER JOIN (
    SELECT
      a.phid_pc,
      SUM(b.zcje) AS cnt_fcamt
    FROM
      pcm3_cnt_m AS a
      LEFT OUTER JOIN (
        SELECT COALESCE
          (SUM(c.approve_amt_fc), 0) AS zcje,
          b.phid_con,
          d.bill_name
        FROM
          fc3_payplan_pc_dd AS b
          LEFT OUTER JOIN fc3_payment_bill_d AS c ON b.phid = c.phid_sourceid
          LEFT OUTER JOIN fc3_pay_bill AS e ON c.pphid = e.phid
          LEFT OUTER JOIN pcm3_cnt_m AS d ON b.phid_con = d.phid
        WHERE
          (e.check_flag_todrop = 1)
          AND (e.pay_status = 2)
        GROUP BY
          b.phid_con,
          d.bill_name
      ) AS b ON a.phid = b.phid_con
    GROUP BY
      a.phid_pc
  ) AS t5 ON t5.phid_pc = project_table.phid
  LEFT OUTER JOIN (
    SELECT
      phid_pc,
      SUM(app_amt_vat_fc) AS cnt_jsfcamt
    FROM
      pcm3_cnt_pay_m
    WHERE
      (bill_type IN (4, 5, 6, 7))
    GROUP BY
      phid_pc
  ) AS t6 ON t6.phid_pc = project_table.phid
  LEFT OUTER JOIN (SELECT phid_pc, SUM(total_sum) AS cnt_jszlamt FROM pcm3_cnt_pay_m WHERE (bill_type IN (10, 11)) GROUP BY phid_pc) AS t7 ON t7.phid_pc = project_table.phid
WHERE
  project_table.bill_flg = 1
  AND project_table.bill_name = @project_name
  AND fg_orglist.oname = @oname
ORDER BY
  fg_orglist.oname,
  project_table.bill_no
  