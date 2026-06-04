SELECT
  fg.oname,
  m.sbnd 申报年份,
  m.sbyf 申报月份,
  m.bsgsd 保险归属,
  bymzgrs 参保职工人数,
  yld.jfdwsbs 单位,
  yld.jnbl 缴纳比例,
  ylg.jfdwsbs 单位1,
  ylg.jnbl 缴纳比例1,
  yl.jfdwsbs 小计1,
  syd.jfdwsbs 单位2,
  syd.jnbl 缴纳比例2,
  syg.jfdwsbs 单位3,
  syg.jnbl 缴纳比例3,
  sy.jfdwsbs 小计3,
  gs.jfdwsbs 单位4,
  gs.jnbl 缴纳比例4,
  gs.jfdwsbs 小计4,
  dtd.jfdwsbs 单位5,
  dtd.jnbl 缴纳比例5,
  dtg.jfdwsbs 单位6,
  dtg.jnbl 缴纳比例6,
  dt.jfdwsbs 小计6,
  bd.jfdwsbs 单位7,
  bd.jnbl 缴纳比例7,
  bd.jfdwsbs 小计7,
  zfd.jfdwsbs 单位8,
  zfd.jnbl 缴纳比例8,
  zfg.jfdwsbs 单位9,
  zfg.jnbl 缴纳比例9,
  zf.jfdwsbs 小计9,
  njd.jfdwsbs 单位10,
  njd.jnbl 缴纳比例10,
  njg.jfdwsbs 单位11,
  njg.jnbl 缴纳比例11,
  nj.jfdwsbs 小计11,
  yl.jfdwsbs + sy.jfdwsbs + gs.jfdwsbs + dt.jfdwsbs + bd.jfdwsbs + zf.jfdwsbs + nj.jfdwsbs 合计
FROM
  p_form0000000265_m m
  LEFT JOIN p_form0000000265_d d ON m.phid = d.pphid
  LEFT JOIN fg_orglist fg ON m.u_jfdw = fg.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 7) yl ON yl.pphid = m.phid --养老
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 8) yld ON yld.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 9) ylg ON ylg.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 10) sy ON sy.pphid = m.phid --失业
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 11) syd ON syd.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 12) syg ON syg.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 13) gs ON gs.pphid = m.phid --工伤
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 1) dt ON dt.pphid = m.phid --医疗
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 2) dtd ON dtd.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 3) dtg ON dtg.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 4) bd ON bd.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 16) zf ON zf.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 17) zfd ON zfd.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 18) zfg ON zfg.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 19) nj ON nj.pphid = m.phid --年金
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 20) njd ON njd.pphid = m.phid
  LEFT JOIN (SELECT pphid, jfdwsbs, jnbl FROM p_form0000000265_d WHERE fz = 21) njg ON njg.pphid = m.phid
WHERE
  m.u_jfdw = @zz [query]
GROUP BY
  fg.oname,
  m.sbnd,
  m.sbyf,
  m.bsgsd,
  bymzgrs,
  yld.jfdwsbs,
  yld.jnbl,
  ylg.jfdwsbs,
  ylg.jnbl,
  yl.jfdwsbs,
  syd.jfdwsbs,
  syd.jnbl,
  syg.jfdwsbs,
  syg.jnbl,
  sy.jfdwsbs,
  gs.jfdwsbs,
  gs.jnbl,
  gs.jfdwsbs,
  bd.jfdwsbs,
  bd.jnbl,
  bd.jfdwsbs,
  zfd.jfdwsbs,
  zfd.jnbl,
  zfg.jfdwsbs,
  zfg.jnbl,
  zf.jfdwsbs,
  dt.jfdwsbs,
  dtd.jfdwsbs,
  dtd.jnbl,
  dtg.jfdwsbs,
  dtg.jnbl,
  njd.jfdwsbs,
  njd.jnbl,
  njg.jfdwsbs,
  njg.jnbl,
  nj.jfdwsbs