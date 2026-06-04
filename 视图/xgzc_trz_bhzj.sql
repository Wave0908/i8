CREATE VIEW xgzc_trz_bhzj AS
/*是直签项目*/
SELECT 
    pfm_677.phid AS phid, 
    pfm_61.xmmc AS xmmc, /*项目名称*/
    pfm_61.gcbh AS xmbm, /*项目编码*/
    pfm_61.phid_org AS phid_org /*组织*/
FROM p_form0000600077_m pfm_677 /*标后总结*/
LEFT JOIN p_form0000600069_m pfm_69 
    ON 400000000000000 + pfm_69.phid = pfm_677.xmmc /*标前立项*/
LEFT JOIN p_form0000600061_m pfm_61 
    ON pfm_69.xmmc = pfm_61.phid /*项目跟踪*/
WHERE 
    pfm_69.sfsyzqxm = '1' /*是直签项目*/
    AND pfm_69.app_status = '1' 
    AND pfm_677.app_status = '1' 
    AND pfm_677.tbjg = '1'

UNION ALL

/*不是直签项目*/
SELECT 
    pfm_677.phid AS phid, 
    CASE 
        WHEN pfm_69ys.sfxyzgys = '1' THEN pfm_61ys.xmmc 
        WHEN pfm_69fys.sfxyzgys = '2' THEN pfm_61fys.xmmc 
    END AS xmmc, /*项目名称*/
    pfm_75.xmbm AS xmbm, /*项目编码*/
    pfm_75.phid_org AS phid_org /*组织*/
FROM p_form0000600077_m pfm_677 /*标后总结*/
LEFT JOIN p_form0000600075_m pfm_75 
    ON pfm_75.phid = pfm_677.xmmc /*投标文件评估*/
LEFT JOIN p_form0000600073_m pfm_73 
    ON pfm_73.phid = pfm_75.xmmc /*标前会议*/
LEFT JOIN p_form0000600072_m pfm_72 
    ON pfm_72.phid = pfm_73.xmmc /*投融资招标文件评估*/
LEFT JOIN p_form0000600070_m pfm_70 
    ON pfm_70.phid = pfm_72.xmmc /*投融资招标预审评估*/
LEFT JOIN p_form0000600069_m pfm_69ys 
    ON pfm_69ys.phid = pfm_70.xmmc 
    AND pfm_69ys.sfxyzgys = '1' /*投融资标前立项 预审*/
LEFT JOIN p_form0000600069_m pfm_69fys 
    ON pfm_69fys.phid = pfm_72.xmmc - 200000000000000 
    AND pfm_69fys.sfxyzgys = '2' /*投融资标前立项非预审*/
LEFT JOIN p_form0000600061_m pfm_61ys 
    ON pfm_61ys.phid = pfm_69ys.xmmc /*项目跟踪预审*/
LEFT JOIN p_form0000600061_m pfm_61fys 
    ON pfm_61fys.phid = pfm_69fys.xmmc /*项目跟踪非预审*/
WHERE 
    pfm_75.sftb = '1' /*是投标*/
    AND pfm_75.app_status = '1' 
    AND pfm_677.app_status = '1' 
    AND pfm_677.tbjg = '1'

UNION ALL

/*投融资历史项目*/
SELECT 
    phid,
    xmmc,
    xmbm,
    CAST(zzbm AS bigint) AS phid_org /*将 zzbm 转换为 bigint 类型并重命名为 phid_org*/
FROM p_form0000700059_d 
WHERE pphid IN (SELECT phid FROM p_form0000700059_m WHERE app_status = 1);