CREATE OR REPLACE FUNCTION fn_zcup_update() RETURNS TRIGGER AS $$
DECLARE syzt varchar(50);
        m_code varchar(50);
        zcbh varchar(50);
        rec RECORD;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.ischeck IS DISTINCT FROM OLD.ischeck THEN
      PERFORM 1 FROM p_form0000000238_d WHERE m_code = NEW.phid;
      IF FOUND THEN
        FOR rec IN
          SELECT d.syzth AS syzt, d.zcbh AS zcbh
          FROM p_form0000000238_d d
          WHERE d.m_code = NEW.phid
        LOOP
          syzt := rec.syzt;
          zcbh := rec.zcbh;
          UPDATE p_form0000000225_m m
          SET syzt = syzt
          WHERE m.zcbm = zcbh;
        END LOOP;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS zcup ON p_form0000000238_m;
CREATE TRIGGER zcup AFTER UPDATE OF ischeck ON p_form0000000238_m FOR EACH ROW EXECUTE PROCEDURE fn_zcup_update();