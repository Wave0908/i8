select 
fg.oname,
m.sbnd 申报年份,
m.sbyf 申报月份,
m.bsgsd 保险归属,
bymzgrs 参保职工人数,
yld.jfdwsbs 单位,yld.jnbl 缴纳比例,ylg.jfdwsbs 单位,ylg.jnbl 缴纳比例,yl.jfdwsbs 小计,
syd.jfdwsbs 单位,syd.jnbl 缴纳比例,syg.jfdwsbs 单位,syg.jnbl 缴纳比例,sy.jfdwsbs 小计,
gs.jfdwsbs 单位,gs.jnbl 缴纳比例,gs.jfdwsbs 小计,
dtd.jfdwsbs 单位,dtd.jnbl 缴纳比例,dtg.jfdwsbs 单位,dtg.jnbl 缴纳比例,dt.jfdwsbs 小计,
bd.jfdwsbs 单位,bd.jnbl 缴纳比例,bd.jfdwsbs 小计,
zfd.jfdwsbs 单位,zfd.jnbl 缴纳比例,zfg.jfdwsbs 单位,zfg.jnbl 缴纳比例,zf.jfdwsbs 小计,
njd.jfdwsbs 单位,njd.jnbl 缴纳比例,njg.jfdwsbs 单位,njg.jnbl 缴纳比例,nj.jfdwsbs 小计,
yl.jfdwsbs +sy.jfdwsbs+gs.jfdwsbs+dt.jfdwsbs+bd.jfdwsbs+zf.jfdwsbs+nj.jfdwsbs 合计
from p_form0000000265_m m
left join p_form0000000265_d d on m.phid = d.pphid
left join fg_orglist fg on m.u_jfdw = fg.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 7) yl on yl.pphid = m.phid  --养老
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 8) yld on yld.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 9) ylg on ylg.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 10) sy on sy.pphid = m.phid--失业
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 11) syd on syd.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 12) syg on syg.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 13) gs on gs.pphid = m.phid--工伤
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 1) dt on dt.pphid = m.phid--医疗
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 2) dtd on dtd.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 3) dtg on dtg.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 4) bd on bd.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 16) zf on zf.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 17) zfd on zfd.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 18) zfg on zfg.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 19) nj on nj.pphid = m.phid--年金
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 20) njd on njd.pphid = m.phid
left join (select pphid,jfdwsbs,jnbl from p_form0000000265_d where fz = 21) njg on njg.pphid = m.phid
where m.u_jfdw = @zz
group by fg.oname,m.sbnd,m.sbyf,m.bsgsd,bymzgrs,yld.jfdwsbs,yld.jnbl,ylg.jfdwsbs,ylg.jnbl,yl.jfdwsbs,
syd.jfdwsbs,syd.jnbl,syg.jfdwsbs,syg.jnbl,sy.jfdwsbs,gs.jfdwsbs,gs.jnbl,gs.jfdwsbs,
bd.jfdwsbs,bd.jnbl,bd.jfdwsbs,zfd.jfdwsbs,zfd.jnbl,zfg.jfdwsbs,zfg.jnbl,zf.jfdwsbs,
dt.jfdwsbs,dtd.jfdwsbs,dtd.jnbl,dtg.jfdwsbs,dtg.jnbl,njd.jfdwsbs,njd.jnbl,njg.jfdwsbs,njg.jnbl,nj.jfdwsbs