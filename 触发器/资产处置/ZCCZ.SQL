CREATE OR REPLACE FUNCTION fn_zc_update_jtbz() RETURNS TRIGGER AS $$
DECLARE phid bigint;
        flg int;
        jz numeric(28,15);
        yyys bigint;
        yzje numeric(28,15);
        ljzj numeric(28,15);
        lyzj varchar(50);
        rec RECORD;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.jtbz IS DISTINCT FROM OLD.jtbz THEN
      phid := NEW.phid;
      flg := NEW.jtbz;
      IF flg = 1 THEN
        PERFORM 1 FROM p_form0000000238_d d WHERE d.m_code = phid;
        IF FOUND THEN
          FOR rec IN
            SELECT d.jz, d.yyys, d.yzje, d.ljzj, d.lyzj
            FROM p_form0000000238_d d
            WHERE d.m_code = phid
          LOOP
            jz := rec.jz;
            yyys := rec.yyys;
            yzje := rec.yzje;
            ljzj := rec.ljzj;
            lyzj := rec.lyzj;
            UPDATE p_form0000000225_m m
            SET jz_amt = jz - yzje,
                yyqs   = yyys + 1,
                ljzj   = ljzj + yzje
            WHERE m.phid::text = lyzj;
          END LOOP;
        END IF;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS zccz ON p_form0000000238_m;
CREATE TRIGGER zccz AFTER UPDATE OF jtbz ON p_form0000000238_m FOR EACH ROW EXECUTE PROCEDURE fn_zc_update_jtbz();