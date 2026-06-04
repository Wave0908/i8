CREATE OR REPLACE VIEW fbcbkzb
AS WITH xmfbcbkzb_data AS (
         SELECT xmfbcbkzb.u_fbgcmc_text, xmfbcbkzb.u_zbfw, xmfbcbkzb.u_bdhf, 
            xmfbcbkzb.u_cgsj, xmfbcbkzb.u_jcsj, xmfbcbkzb.u_zzdjyq, 
            xmfbcbkzb.u_ntrrs, xmfbcbkzb.phid_pc, xmfbcbkzb.u_ewzb, 
            xmfbcbkzb.u_fbms
           FROM ng.xmfbcbkzb
        ), fixed_values AS (
                 SELECT '劳务分包类' AS u_fbgcmc_text, 
                    '' AS u_zbfw, '' AS u_bdhf, 
                    CAST(NULL AS timestamp with time zone) AS u_cgsj, 
                    CAST(NULL AS timestamp with time zone) AS u_jcsj, 
                    '' AS u_zzdjyq, '' AS u_ntrrs, 
                    ( SELECT xmfbcbkzb_data.phid_pc
                           FROM xmfbcbkzb_data
                         LIMIT 1) AS phid_pc, 
                    '' AS u_ewzb, '' AS u_fbms
        UNION ALL 
                 SELECT '工程分包类' AS u_fbgcmc_text, 
                    '' AS u_zbfw, '' AS u_bdhf, 
                    CAST(NULL AS timestamp with time zone) AS u_cgsj, 
                    CAST(NULL AS timestamp with time zone) AS u_jcsj, 
                    '' AS u_zzdjyq, '' AS u_ntrrs, 
                    ( SELECT xmfbcbkzb_data.phid_pc
                           FROM xmfbcbkzb_data
                         OFFSET 1
                         LIMIT 1) AS phid_pc, 
                    '' AS u_ewzb, '' AS u_fbms
        )
         SELECT  *
           FROM fixed_values
UNION ALL 
         SELECT xmfbcbkzb_data.u_fbgcmc_text, xmfbcbkzb_data.u_zbfw, 
            xmfbcbkzb_data.u_bdhf, xmfbcbkzb_data.u_cgsj, xmfbcbkzb_data.u_jcsj, 
            xmfbcbkzb_data.u_zzdjyq, xmfbcbkzb_data.u_ntrrs, 
            xmfbcbkzb_data.phid_pc, xmfbcbkzb_data.u_ewzb, 
            xmfbcbkzb_data.u_fbms
           FROM xmfbcbkzb_data;