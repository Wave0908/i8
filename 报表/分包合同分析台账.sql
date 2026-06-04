--declare @ocode varchar(100),@year varchar(100),@st varchar(100),@en varchar(100)
--set  @ocode='324191209000001'
--set @year='2022'
--set @st='1'
--set @en='9'

select
fo.oname as 单位名称,
lwfbhtyht_fs.fs as 劳务分包合同原合同份数,
cast(lwfbhtyht_je.htje as decimal(22,2)) as 劳务分包合同原合同金额,
lwfbhtbcxy_fs.fs as 劳务分包合同补充协议合同份数,
cast(lwfbhtbcxy_je.htje as decimal(22,2)) as 劳务分包合同补充协议合同金额,
lwfbhtbcxy_fsa.fs as 劳务补充单价份数,	
cast(lwfbhtbcxy_jea.htje as decimal(22,2)) 	as 劳务补充单价金额,
lwfbhtbcxy_fsb.fs as 劳务调整单价份数,	
cast(lwfbhtbcxy_jeb.htje as decimal(22,2))	as 劳务调整单价金额,
lwfbhtbcxy_fsc.fs as 劳务施工范围份数,	
cast(lwfbhtbcxy_jec.htje as decimal(22,2))	as 劳务施工范围金额,
lwfbhtbcxy_fsd.fs as 劳务其他情况份数,	
cast(lwfbhtbcxy_jed.htje as decimal(22,2))	as 劳务其他情况金额,
gcfbhtbcxy_yhtfs.fs as 工程合同原合同份数,
cast(gcfbhtbcxy_yhtje.htje as decimal(22,2)) as 工程合同原合同金额,
gcfbhtbcxy_fs.fs as 工程合同补充协议合同份数,
cast(gcfbhtbcxy_je.htje as decimal(22,2)) as 工程合同补充协议合同金额,
gcfbhtbcxy_fsa.fs as 工程补充单价份数,	
cast(gcfbhtbcxy_jea.htje as decimal(22,2)) 	as 工程补充单价金额,
gcfbhtbcxy_fsb.fs as 工程调整单价份数,	
cast(gcfbhtbcxy_jeb.htje as decimal(22,2))	as 工程调整单价金额,
gcfbhtbcxy_fsc.fs as 工程施工范围份数,	
cast(gcfbhtbcxy_jec.htje as decimal(22,2))	as 工程施工范围金额,
gcfbhtbcxy_fsd.fs as 工程其他情况份数,	
cast(gcfbhtbcxy_jed.htje as decimal(22,2))	as 工程其他情况金额,
cpjgfbhtbcxy_yhtfs.fs as 产品加工合同原合同份数,
cast(cpjgfbhtbcxy_yhtje.htje as decimal(22,2)) as 产品加工合同原合同金额,
cpjgfbhtbcxy_fs.fs as 产品加工合同补充协议合同份数,
cast(cpjgfbhtbcxy_je.htje as decimal(22,2)) as 产品加工合同补充协议合同金额,
cpjgfbhtbcxy_fsa.fs as 产品加工补充单价份数,	
cast(cpjgfbhtbcxy_jea.htje as decimal(22,2)) 	as 产品加工补充单价金额,
cpjgfbhtbcxy_fsb.fs as 产品加工调整单价份数,	
cast(cpjgfbhtbcxy_jeb.htje as decimal(22,2))	as 产品加工调整单价金额,
cpjgfbhtbcxy_fsc.fs as 产品加工施工范围份数,	
cast(cpjgfbhtbcxy_jec.htje as decimal(22,2))	as 产品加工施工范围金额,
cpjgfbhtbcxy_fsd.fs as 产品加工其他情况份数,	
cast(cpjgfbhtbcxy_jed.htje as decimal(22,2))	as 产品加工其他情况金额,
ljwmfbhtbcxy_yhtfs.fs as 临建文明合同原合同份数,
cast(ljwmfbhtbcxy_yhtje.htje as decimal(22,2)) as 临建文明合同原合同金额,
ljwmfbhtbcxy_fs.fs as 临建文明合同补充协议合同份数,
cast(ljwmfbhtbcxy_je.htje as decimal(22,2)) as 临建文明合同补充协议合同金额,
ljwmfbhtbcxy_fsa.fs as 临建文明补充单价份数,	
cast(ljwmfbhtbcxy_jea.htje as decimal(22,2)) 	as 临建文明补充单价金额,
ljwmfbhtbcxy_fsb.fs as 临建文明调整单价份数,	
cast(ljwmfbhtbcxy_jeb.htje as decimal(22,2))	as 临建文明调整单价金额,
ljwmfbhtbcxy_fsc.fs as 临建文明施工范围份数,	
cast(ljwmfbhtbcxy_jec.htje as decimal(22,2))	as 临建文明施工范围金额,
ljwmfbhtbcxy_fsd.fs as 临建文明其他情况份数,	
cast(ljwmfbhtbcxy_jed.htje as decimal(22,2))	as 临建文明其他情况金额,
fbht_yzhtfs.fs as 原合同份数,
cast(fbht_yzhtje.htje as decimal(22,2)) as 原合同金额,
fbht_yhtfs.fs as 原合同50万元以下份数,
cast(fbht_yhtje.htje as decimal(22,2)) as 原合同50万元以下金额,
cast(cast((cast(coalesce(fbht_yhtfs.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同50万元份数占比,
fbht_fs.fs as 原合同50_200万元份数,
cast(fbht_je.htje as decimal(22,2)) as 原合同50_200万元金额,
cast(cast((cast(coalesce(fbht_fs.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同50_200万元份数占比,
fbht_fsa.fs as 原合同200_1000万元份数,	
cast(fbht_jea.htje as decimal(22,2)) 	as 原合同200_1000万元金额,
cast(cast((cast(coalesce(fbht_fsa.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同200_1000万元份数占比,
fbht_fsb.fs as 原合同1000_2000万元份数,	
cast(fbht_jeb.htje as decimal(22,2))	as 原合同1000_2000万元金额,
cast(cast((cast(coalesce(fbht_fsb.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同1000_2000万元份数占比,
fbht_fsc.fs as 原合同2000_3000万元份数,	
cast(fbht_jec.htje as decimal(22,2))	as 原合同2000_3000万元金额,
cast(cast((cast(coalesce(fbht_fsc.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同2000_3000万元份数占比,
fbht_fsd.fs as 原合同3000_5000万元份数,	
cast(fbht_jed.htje as decimal(22,2))	as 原合同3000_5000万元金额,
cast(cast((cast(coalesce(fbht_fsd.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同3000_5000万元份数占比,
fbht_fse.fs as 原合同5000万元以上份数,	
cast(fbht_jee.htje as decimal(22,2))	as 原合同5000万元以上金额,
cast(cast((cast(coalesce(fbht_fse.fs, 0) as decimal(22,2))/cast(coalesce(fbht_yzhtfs.fs, 0) as decimal(22,2))*100) as decimal(22,2)) as varchar(100))|| '%' as 原合同5000万元份数占比,
bcxyfbhtbcxy_fs.fs as 补充协议合同补充协议合同份数,
cast(bcxyfbhtbcxy_je.htje as decimal(22,2)) as 补充协议合同补充协议合同金额,
null 占比1,
bcxyfbhtbcxy_fsa.fs as 补充协议补充单价份数,	
cast(bcxyfbhtbcxy_jea.htje as decimal(22,2)) 	as 补充协议补充单价金额,
null 占比2,
bcxyfbhtbcxy_fsb.fs as 补充协议调整单价份数,
cast(bcxyfbhtbcxy_jeb.htje as decimal(22,2))	as 补充协议调整单价金额,
null 占比3,
bcxyfbhtbcxy_fsc.fs as 补充协议施工范围份数,	
cast(bcxyfbhtbcxy_jec.htje as decimal(22,2))	as 补充协议施工范围金额,
null 占比4,
bcxyfbhtbcxy_fsd.fs as 补充协议其他情况份数,	
cast(bcxyfbhtbcxy_jed.htje as decimal(22,2))	as 补充协议其他情况金额,
null 占比5,
null 补充协议金额大于原合同金额份数,	
null 补充协议金额大于原合同金额金额,
null 补充协议金额大于原合同金额占比,
null 份数合计,
null 金额合计

from
fg_orglist fo  --组织表

--劳务分包合同原合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtyht_fs on lwfbhtyht_fs.phid_ocode=fo.phid
--劳务分包合同原合同份数end

--劳务分包合同原合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtyht_je on lwfbhtyht_je.phid_ocode=fo.phid
--劳务分包合同原合同金额end

--劳务分包合同补充协议合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_fs on lwfbhtbcxy_fs.phid_ocode=fo.phid
--劳务分包合同补充协议合同份数end

--劳务分包合同补充协议合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_je on lwfbhtbcxy_je.phid_ocode=fo.phid
--劳务分包合同补充协议合同金额end

--劳务分包合同份数a start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_fsa on lwfbhtbcxy_fsa.phid_ocode=fo.phid
--劳务分包合同份数a end

--劳务分包合同金额 a start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_jea on lwfbhtbcxy_jea.phid_ocode=fo.phid
--劳务分包合同金额 a end

--劳务分包合同份数b start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_fsb on lwfbhtbcxy_fsb.phid_ocode=fo.phid
--劳务分包合同份数b end

--劳务分包合同金额 b start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_jeb on lwfbhtbcxy_jeb.phid_ocode=fo.phid
--劳务分包合同金额 b end


--劳务分包合同份数c start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_fsc on lwfbhtbcxy_fsc.phid_ocode=fo.phid
--劳务分包合同份数c end

--劳务分包合同金额 c start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_jec on lwfbhtbcxy_jec.phid_ocode=fo.phid
--劳务分包合同金额 c end

--劳务分包合同份数d start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_fsd on lwfbhtbcxy_fsd.phid_ocode=fo.phid
--劳务分包合同份数d end

--劳务分包合同金额 d start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000001'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) lwfbhtbcxy_jed on lwfbhtbcxy_jed.phid_ocode=fo.phid
--劳务分包合同金额 d end

--工程分包合同原合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_yhtfs on gcfbhtbcxy_yhtfs.phid_ocode=fo.phid
--工程分包合同原合同份数end

--工程分包合同原合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_yhtje on gcfbhtbcxy_yhtje.phid_ocode=fo.phid
--工程分包合同原合同金额end

--工程分包合同补充协议合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_fs on gcfbhtbcxy_fs.phid_ocode=fo.phid
--工程分包合同补充协议合同份数end

--工程分包合同补充协议合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_je on gcfbhtbcxy_je.phid_ocode=fo.phid
--工程分包合同补充协议合同金额end

--工程分包合同份数a start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_fsa on gcfbhtbcxy_fsa.phid_ocode=fo.phid
--工程分包合同份数a end

--工程分包合同金额 a start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_jea on gcfbhtbcxy_jea.phid_ocode=fo.phid
--工程分包合同金额 a end

--工程分包合同份数b start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_fsb on gcfbhtbcxy_fsb.phid_ocode=fo.phid
--工程分包合同份数b end

--工程分包合同金额 b start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_jeb on gcfbhtbcxy_jeb.phid_ocode=fo.phid
--工程分包合同金额 b end


--工程分包合同份数c start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_fsc on gcfbhtbcxy_fsc.phid_ocode=fo.phid
--工程分包合同份数c end

--工程分包合同金额 c start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_jec on gcfbhtbcxy_jec.phid_ocode=fo.phid
--工程分包合同金额 c end

--工程分包合同份数d start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_fsd on gcfbhtbcxy_fsd.phid_ocode=fo.phid
--工程分包合同份数d end

--工程分包合同金额 d start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='2'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) gcfbhtbcxy_jed on gcfbhtbcxy_jed.phid_ocode=fo.phid
--工程分包合同金额 d end

--产品加工分包合同原合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_yhtfs on cpjgfbhtbcxy_yhtfs.phid_ocode=fo.phid
--产品加工分包合同原合同份数end

--产品加工分包合同原合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_yhtje on cpjgfbhtbcxy_yhtje.phid_ocode=fo.phid
--产品加工分包合同原合同金额end

--产品加工分包合同补充协议合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_fs on cpjgfbhtbcxy_fs.phid_ocode=fo.phid
--产品加工分包合同补充协议合同份数end

--产品加工分包合同补充协议合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_je on cpjgfbhtbcxy_je.phid_ocode=fo.phid
--产品加工分包合同补充协议合同金额end

--产品加工分包合同份数a start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_fsa on cpjgfbhtbcxy_fsa.phid_ocode=fo.phid
--产品加工分包合同份数a end

--产品加工分包合同金额 a start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_jea on cpjgfbhtbcxy_jea.phid_ocode=fo.phid
--产品加工分包合同金额 a end

--产品加工分包合同份数b start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_fsb on cpjgfbhtbcxy_fsb.phid_ocode=fo.phid
--产品加工分包合同份数b end

--产品加工分包合同金额 b start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_jeb on cpjgfbhtbcxy_jeb.phid_ocode=fo.phid
--产品加工分包合同金额 b end


--产品加工分包合同份数c start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_fsc on cpjgfbhtbcxy_fsc.phid_ocode=fo.phid
--产品加工分包合同份数c end

--产品加工分包合同金额 c start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_jec on cpjgfbhtbcxy_jec.phid_ocode=fo.phid
--产品加工分包合同金额 c end

--产品加工分包合同份数d start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_fsd on cpjgfbhtbcxy_fsd.phid_ocode=fo.phid
--产品加工分包合同份数d end

--产品加工分包合同金额 d start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000014'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) cpjgfbhtbcxy_jed on cpjgfbhtbcxy_jed.phid_ocode=fo.phid
--产品加工分包合同金额 d end

--临建文明分包合同原合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_yhtfs on ljwmfbhtbcxy_yhtfs.phid_ocode=fo.phid
--临建文明分包合同原合同份数end

--临建文明分包合同原合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_yhtje on ljwmfbhtbcxy_yhtje.phid_ocode=fo.phid
--临建文明分包合同原合同金额end

--临建文明分包合同补充协议合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_fs on ljwmfbhtbcxy_fs.phid_ocode=fo.phid
--临建文明分包合同补充协议合同份数end

--临建文明分包合同补充协议合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_je on ljwmfbhtbcxy_je.phid_ocode=fo.phid
--临建文明分包合同补充协议合同金额end

--临建文明分包合同份数a start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_fsa on ljwmfbhtbcxy_fsa.phid_ocode=fo.phid
--临建文明分包合同份数a end

--临建文明分包合同金额 a start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_jea on ljwmfbhtbcxy_jea.phid_ocode=fo.phid
--临建文明分包合同金额 a end

--临建文明分包合同份数b start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_fsb on ljwmfbhtbcxy_fsb.phid_ocode=fo.phid
--临建文明分包合同份数b end

--临建文明分包合同金额 b start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_jeb on ljwmfbhtbcxy_jeb.phid_ocode=fo.phid
--临建文明分包合同金额 b end


--临建文明分包合同份数c start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_fsc on ljwmfbhtbcxy_fsc.phid_ocode=fo.phid
--临建文明分包合同份数c end

--临建文明分包合同金额 c start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_jec on ljwmfbhtbcxy_jec.phid_ocode=fo.phid
--临建文明分包合同金额 c end

--临建文明分包合同份数d start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_fsd on ljwmfbhtbcxy_fsd.phid_ocode=fo.phid
--临建文明分包合同份数d end

--临建文明分包合同金额 d start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type='224200106000012'
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) ljwmfbhtbcxy_jed on ljwmfbhtbcxy_jed.phid_ocode=fo.phid
--临建文明分包合同金额 d end

--分包合同总份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_yzhtfs on fbht_yzhtfs.phid_ocode=fo.phid
--分包合同总份数end

--分包合同总金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_yzhtje on fbht_yzhtje.phid_ocode=fo.phid
--分包合同总金额end

--分包合同50万元以下份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1<500000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_yhtfs on fbht_yhtfs.phid_ocode=fo.phid
--分包合同50万元以下份数end

--分包合同50万元以下金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1<500000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_yhtje on fbht_yhtje.phid_ocode=fo.phid
--分包合同50万元以下金额end

--分包合同50-200万元份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 500000 and 2000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_fs on fbht_fs.phid_ocode=fo.phid
--分包合同50-200万元份数end

--分包合同50-200万元金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 500000 and 2000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_je on fbht_je.phid_ocode=fo.phid
--分包合同50-200万元金额end

--分包合同200-1000万元份数a start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 2000000 and 10000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_fsa on fbht_fsa.phid_ocode=fo.phid
--分包合同200-1000万元份数a end

--分包合同200-1000万元金额 a start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 2000000 and 10000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_jea on fbht_jea.phid_ocode=fo.phid
--分包合同200-1000万元金额 a end

--分包合同份数1000-2000万元	b start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 10000000 and 20000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_fsb on fbht_fsb.phid_ocode=fo.phid
--分包合同1000-2000万元份数b end

--分包合同1000-2000万元金额 b start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 10000000 and 20000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_jeb on fbht_jeb.phid_ocode=fo.phid
--分包合同1000-2000万元金额 b end


--分包合同2000-3000万元份数	c start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 20000000 and 30000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_fsc on fbht_fsc.phid_ocode=fo.phid
--分包合同2000-3000万元份数c end

--分包合同2000-3000万元金额 c start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 20000000 and 30000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_jec on fbht_jec.phid_ocode=fo.phid
--分包合同2000-3000万元金额 c end

--分包合同份数3000-5000万元	d start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 30000000 and 50000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_fsd on fbht_fsd.phid_ocode=fo.phid
--分包合同份数3000-5000万元	d end

--分包合同金额3000-5000万元	 d start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 between 30000000 and 50000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_jed on fbht_jed.phid_ocode=fo.phid
--分包合同金额3000-5000万元	 d end

--分包合同份数5000万元以上	e start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 > 50000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_fse on fbht_fse.phid_ocode=fo.phid
--分包合同份数5000万元以上	e end

--分包合同金额5000万元以上	 e start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.numericcol_1) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='2'
and pfm_14.numericcol_1 > 50000000
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) fbht_jee on fbht_jee.phid_ocode=fo.phid
--分包合同金额5000万元以上	 e end



--补充协议分包合同补充协议合同份数start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_fs on bcxyfbhtbcxy_fs.phid_ocode=fo.phid
--补充协议分包合同补充协议合同份数end

--补充协议分包合同补充协议合同金额start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_je on bcxyfbhtbcxy_je.phid_ocode=fo.phid
--补充协议分包合同补充协议合同金额end

--补充协议分包合同份数a start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_fsa on bcxyfbhtbcxy_fsa.phid_ocode=fo.phid
--补充协议分包合同份数a end

--补充协议分包合同金额 a start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000002'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_jea on bcxyfbhtbcxy_jea.phid_ocode=fo.phid
--补充协议分包合同金额 a end

--补充协议分包合同份数b start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_fsb on bcxyfbhtbcxy_fsb.phid_ocode=fo.phid
--补充协议分包合同份数b end

--补充协议分包合同金额 b start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000003'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_jeb on bcxyfbhtbcxy_jeb.phid_ocode=fo.phid
--补充协议分包合同金额 b end


--补充协议分包合同份数c start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_fsc on bcxyfbhtbcxy_fsc.phid_ocode=fo.phid
--补充协议分包合同份数c end

--补充协议分包合同金额 c start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000001'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_jec on bcxyfbhtbcxy_jec.phid_ocode=fo.phid
--补充协议分包合同金额 c end

--补充协议分包合同份数d start
left join 
(
select
pfm_14.sszz phid_ocode,
count(*) as fs
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_fsd on bcxyfbhtbcxy_fsd.phid_ocode=fo.phid
--补充协议分包合同份数d end

--补充协议分包合同金额 d start
left join 
(
select
pfm_14.sszz phid_ocode,
sum(pfm_14.bg_amt) as htje
from
p_form0000000014_m pfm_14 --项下合同评审及用印
where
pfm_14.app_status='1'
and pfm_14.cnt_type in ('224200106000012','2','224200106000014','224200106000001')
and pfm_14.sfbcxy='1'
and pfm_14.bglx='224200617000004'
and pfm_14.sszz= @ocode
and extract(year from pfm_14.app_dt)= @year
and extract(month from pfm_14.app_dt) between @st and @en
group by 
pfm_14.sszz
) bcxyfbhtbcxy_jed on bcxyfbhtbcxy_jed.phid_ocode=fo.phid
--补充协议分包合同金额 d end





where
fo.ifcorp='Y'
and fo.phid= @ocode
order by fo.ocode