CREATE OR REPLACE VIEW ng.nianyue
AS SELECT to_char(fg3_workcycle.bdt, 'YYYY-MM'::text) AS bdt, 
    to_char(fg3_workcycle.bdt, 'YYYY'::text) AS nian, fg3_workcycle.phid
   FROM ng.fg3_workcycle
   WHERE fg3_workcycle.ctype = 'GCMONTH';
