CREATE VIEW ng.lsbfejdw AS
SELECT 
    m.phid AS phid_m, 
    d1.phid AS phid_d1, 
    xmgw.xmzw 
FROM ng.p_form0000700233_m m 
LEFT JOIN ng.p_form0000700233_d1 d1 ON d1.m_code = m.phid 
LEFT JOIN ng.xmgw ON position(',' || CAST(xmgw.phid AS text) || ',' IN ',' || CAST(d1.u_ejzwxm AS text) || ',') > 0 
WHERE d1.u_ejzwxm IS NOT NULL;