CREATE VIEW ng.xmzw
AS WITH temp AS (
   SELECT p_form0000700439_d.phid, 
          string_to_array(CAST(p_form0000700439_d.u_cfryzwjxm AS text), ',') AS u_cfryzwjxm_array
   FROM ng.p_form0000700439_d
   WHERE p_form0000700439_d.u_cfryzwjxm IS NOT NULL 
     AND p_form0000700439_d.u_cfryzwjxm <> ''
)
SELECT temp.phid, unnest(u_cfryzwjxm_array) AS u_cfryzwjxm
FROM temp;