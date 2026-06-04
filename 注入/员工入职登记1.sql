UPDATE hr_epm_link
SET nowplace = user_xjzd
WHERE
  EXISTS (
    SELECT 1
    FROM hr3_affairs_checkin
    WHERE hr3_affairs_checkin.pphid = hr_epm_link.pphid
      AND hr3_affairs_checkin.phid = @Approve.Billphid
  );