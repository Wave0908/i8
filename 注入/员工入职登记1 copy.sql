UPDATE hr_epm_link l
SET nowplace = l.user_xjzd
WHERE
  EXISTS (SELECT 1 FROM hr_epm_base b WHERE b.must_phid = l.must_phid AND b.phid = @Approve.Billphid)