declare @phid bigint;
declare @flg int;
if update(jtbz) 
begin
select @phid = phid,@flg = jtbz  from inserted 
--定义表变量
  DECLARE @temp TABLE
  (
      jz decimal(28,15),
      yyys BIGINT,
      yzje decimal(28,15),
      ljzj decimal(28,15),
      lyzj varchar(50)
  )
 INSERT INTO @temp(jz,yyys,yzje,ljzj,lyzj)
 select jz, yyys,yzje,ljzj,lyzj from p_form0000000238_d d
 left join p_form0000000238_m m on d.m_code =m.phid  
 where  m.phid = @phid and @flg = 1
  -- 声明变量
 DECLARE @jz decimal(28,15),
 @yyys BIGINT,
 @yzje decimal(28,15),
 @ljzj decimal(28,15),
 @lyzj varchar(50)
 WHILE EXISTS(SELECT lyzj FROM @temp )
 BEGIN
 
     -- 也可以使用top 1
     SET ROWCOUNT 1 --每次执行一条
     SELECT @jz = jz, @yyys = yyys,@yzje = yzje,@ljzj = ljzj,@lyzj = lyzj  FROM @temp;
     update p_form0000000225_m  set jz_amt=@jz - @yzje,yyqs =@yyys+1,ljzj = @ljzj +@yzje WHERE phid=@lyzj 
     SET ROWCOUNT 0    
     DELETE FROM @temp WHERE lyzj=@lyzj;
 END
end