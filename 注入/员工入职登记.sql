UPDATE hr_epm_main
SET user_gbcj = (
    SELECT user_gbcj
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_csd = (
    SELECT user_csd
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_xrzw = (
    SELECT user_xrzw
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_sfyghwgzjl = (
    SELECT user_sfyghwgzjl
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_sfdrgxmjlgw = (
    SELECT user_sfdrgxmjlgw
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_rdsj = (
    SELECT user_rdsj
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_qp = (
    SELECT user_qp
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  ),
  user_jp = (
    SELECT user_jp
    FROM hr_epm_base
    WHERE pphid = hr_epm_main.phid
    LIMIT 1
  )
WHERE
  EXISTS (
    SELECT 1
    FROM hr3_affairs_checkin
    WHERE pphid = hr_epm_main.phid
      AND phid = @Approve.Billphid
  );