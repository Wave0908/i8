
update
	p_form0000000052_m
	set
	ddlbcol_1 = (
	select
		t2.ddlbcol_1
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	zbgl = (
	select
		t2.u_zbgl
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	yjhte = (
	select
		t2.numericcol_1
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	yjtbrq = (
	select
		t2.datetimecol_2
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	ddlbcol_3 = (
	select
		t2.ddlbcol_2
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	xmmc = (
	select
		t2.u_gxhxmmc
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	bill_name = (
	select
		t2.u_gxhxmmc
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	empid = (
	select
		t2.empid
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	zbfw = (
	select
		t2.u_zbfw
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	xmgk = (
	select
		t2.u_gcgk
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1),
	syzz = (
	select
		t2.u_syzz
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid
		order by bill_dt desc
	limit 1)
where
	exists (
	select
		1
	from
		p_form0000700161_m t2
	where
		t2.userhelp_1 = p_form0000000052_m.phid
		and t2.phid = @Approve.Billphid )
