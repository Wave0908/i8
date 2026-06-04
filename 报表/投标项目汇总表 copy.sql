select z.oname '上报单位',
count(*) '投标项目数量',
sum(amt)  '投标总额（万元）',
count(case when tbjg='01' then  tbjg else null end) '中标项目数量',
isnull(sum(case when tbjg='01' then  amt else null end),0) '中标额（万元）'
from p_form0000000080_d a
left join fg_orglist z on a.sbdw=z.phid
left join p_form0000000080_m m on a.m_code=m.phid
left join fg3_workcycle g on g.phid=m.gzzq
where z.ocode=@sbdw and a.tbrq between @ks and @js and m.ischeck='1'[query]
group by z.oname