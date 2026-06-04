set nocount on 
declare @syzt varchar(50); 
declare @m_code varchar(50); 
declare @zcbh varchar(50); 
if update(ischeck)
select @m_code = phid from inserted
--select @m_code = phid from p_form0000000238_m
select @zcbh = zcbh,@syzt= syzth  from p_form0000000238_d where m_code = @m_code
--select @syzt= syzth from p_form0000000238_d
update p_form0000000225_m set syzt=@syzt where zcbm=@zcbh
set nocount off