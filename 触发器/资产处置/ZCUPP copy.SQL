--set nocount on 
declare @syzt varchar(50); 
declare @m_code varchar(50); 
declare @zcbh varchar(50); 
if update(ischeck)
begin
select @m_code = phid from inserted
--select @m_code = phid from p_form0000000238_m
select @zcbh = zcbh,@syzt= syzth  from p_form0000000238_d where m_code = @m_code
  DECLARE @temp TABLE
  (
     syzt NVARCHAR(50),
     zcbh NVARCHAR(50)
  )
  INSERT INTO @temp(syzt, zcbh)
 select syzth ,zcbh from p_form0000000238_d where m_code = @m_code
  -- 声明变量
 DECLARE

     @a AS NVARCHAR(50),
    @b AS NVARCHAR(20);
     
 WHILE EXISTS(SELECT zcbh FROM @temp)
 BEGIN
     -- 也可以使用top 1
     SET ROWCOUNT 1
     SELECT @a= zcbh, @b= syzt FROM @temp;
     UPDATE p_form0000000225_m SET syzt= @b WHERE zcbm=@a;
     SET ROWCOUNT 0
     
     DELETE FROM @temp WHERE zcbh=@a;
 END
--select @syzt= syzth from p_form0000000238_d
--update p_form0000000225_m set syzt=@syzt where zcbm=@zcbh
end