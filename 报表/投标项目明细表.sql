SELECT
  z.oname "上报单位",
  a.xmmc "项目名称",
  a.amt "价款",
  a.tbrq "投标日期",
  (CASE a.tbms WHEN '01' THEN '公投' WHEN '02' THEN '议标' WHEN '03' THEN '邀请招标' END) "投标模式",
  (CASE WHEN a.tbjg = '01' THEN '中标' WHEN a.tbjg = '02' THEN '未中标' ELSE'等待结果' END) "投标结果",
  a.zbrq "中标日期",
  a.remarks "备注（不含陪标项目）"
FROM
  p_form0000000080_d a
  LEFT JOIN fg_orglist z ON a.sbdw = z.phid
  LEFT JOIN p_form0000000080_m m ON a.pphid = m.phid
  LEFT JOIN fg3_workcycle g ON g.phid = m.gzzq
WHERE
  z.oname = @sbdw
  AND (NULLIF(@s1, '') IS NULL OR a.tbrq >= NULLIF(@s1, '')::timestamp)
  AND (NULLIF(@s2, '') IS NULL OR a.tbrq <= NULLIF(@s2, '')::timestamp)
  AND m.app_status = '1'