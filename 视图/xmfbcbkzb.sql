CREATE OR REPLACE VIEW ng.xmfbcbkzb
AS SELECT a.u_fbgcmc_text, a.u_zbfw, a.u_bdhf, a.u_cgsj, a.u_jcsj, a.u_zzdjyq, 
    a.u_ntrrs, a.phid_pc, p.target_excl_tax_amt AS u_ewzb, a.u_fbms
   FROM ( SELECT concat(COALESCE(d.u_fbgcmc, ''), ' ', COALESCE(d.u_bd, '')) AS u_fbgcmc_text, 
            d.u_sgnr AS u_zbfw, d.u_bd AS u_bdhf, d.u_zbsj AS u_cgsj, 
            d.u_jhtc AS u_jcsj, d.u_zzyq AS u_zzdjyq, d.u_ntrrs, d.u_fbms, 
            m.phid_pc
           FROM ng.p_form_0000000023_m m
      LEFT JOIN ng.p_form_0000000023_d d ON d.pphid = m.phid) a
   LEFT JOIN ng.pms3_dynamic_cont_pk p ON p.cont_pack_name = a.u_fbgcmc_text
   LEFT JOIN ng.pms3_dynamic_contract cm ON p.pphid = cm.phid
  WHERE cm.is_history = 0;