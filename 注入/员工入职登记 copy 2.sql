UPDATE hr_epm_main
SET hr_epm_main.user_gbcj = hr_epm_base.user_gbcj,
hr_epm_main.user_csd = hr_epm_base.user_csd,
hr_epm_main.user_xrzw = hr_epm_base.user_xrzw,
hr_epm_main.user_sfyghwgzjl = hr_epm_base.user_sfyghwgzjl,
hr_epm_main.user_sfdrgxmjlgw = hr_epm_base.user_sfdrgxmjlgw,
hr_epm_main.user_rdsj = hr_epm_base.user_rdsj
FROM
  hr_epm_base
WHERE
  hr_epm_base.must_phid = hr_epm_main.phid
  AND hr_epm_base.phid =@Approve.Billphid