select z.oname '上报单位',
a.xmmc '项目名称',
a.amt '价款',
a.tbrq '投标日期',
(case a.tbms when '01' then '公投' 
when '02' then '议标'
when '03' then '邀请招标' end) '投标模式',
(case when a.tbjg='01' then '中标' when a.tbjg='02' then '未中标' else '等待结果' end) '投标结果',
a.zbrq '中标日期',
a.remarks '备注（不含陪标项目）'
from p_form0000000080_d a
left join fg_orglist z on a.sbdw=z.phid
left join p_form0000000080_m m on a.m_code=m.phid
left join fg3_workcycle g on g.phid=m.gzzq
where z.oname=@sbdw and a.tbrq between @s1 and @s2 and m.ischeck='1'[query]