CREATE  VIEW ng.cmjtld
AS SELECT a.phid, b.u_xcmjtld
   FROM ( SELECT p_form0000700439_d.phid, 
            string_to_array(p_form0000700439_d.u_xcmjtld::text, ','::text) AS u_xcmjtld_array
           FROM ng.p_form0000700439_d
          WHERE p_form0000700439_d.u_xcmjtld IS NOT NULL) a
  CROSS JOIN LATERAL unnest(a.u_xcmjtld_array) b(u_xcmjtld);