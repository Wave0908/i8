CREATE VIEW rzrtb AS
-- 项目看板-日志人天表
select
    xp.xm_bill_no as 项目编号,
    xp.xm_bill_name as 项目名称,
    dqfo.oname as 所属大区,
    fo.oname as 所属分公司,
    xp.compname as 客户名称,
    cc.contract_sum as 合同金额,
    pt.approx_contract_fc as 项目金额,
    wt.type_name as 项目类型,
    xp.descript as 项目状态,
    xp.cp_name as 产品类型,
    xp.hr_bill_name as 项目经理,
    hem.bill_name as 项目人员,
    case
        when instr(upper(g.bill_name), 'T') > 0
            then substr(g.bill_name, 1, instr(upper(g.bill_name), 'T') - 1)
        else g.bill_name
    end as 职能类别,
    substr(g.bill_name, -2, 2) as T级,
    sum(
        case
            when round(wwm.workhours, 2) < 8
                then round(nvl(wwm.workhours, 0) / 8, 2)
            else 1
        end
    ) as 投入人天,
    to_char(min(to_date(wwm.cdt, 'YYYY-MM-DD')), 'YYYY-MM-DD') as 进场日期
from xm_pms xp
left join fg_orglist dqfo on dqfo.phid = xp.dq_phid
left join fg_orglist fo on fo.phid = xp.phid_org
left join wbs_type wt on wt.phid = xp.phid_type
left join con3_contract cc on cc.phid = xp.con_phid
left join wm_worklog_main wwm on xp.xm_phid = wwm.phid_pc
left join hr_epm_main hem on hem.phid = wwm.phid_emp
left join hr_epm_station hes on hem.phid = hes.pphid and hes.assigntype = 0
left join fg_ogm_positionlevel g on g.phid = hes.plevel
left join project_table pt on pt.phid = xp.xm_phid
where wwm.phid_pc is not null
group by
    xp.xm_bill_no,
    xp.xm_bill_name,
    dqfo.oname,
    fo.oname,
    xp.compname,
    cc.contract_sum,
    pt.approx_contract_fc,
    wt.type_name,
    xp.descript,
    xp.cp_name,
    xp.hr_bill_name,
    hem.bill_name,
    case
        when instr(upper(g.bill_name), 'T') > 0
            then substr(g.bill_name, 1, instr(upper(g.bill_name), 'T') - 1)
        else g.bill_name
    end,
    substr(g.bill_name, -2, 2)
order by
    dqfo.oname,
    fo.oname