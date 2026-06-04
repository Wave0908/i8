SELECT
  合同编码,
  合同名称,
  合同金额,
  发起单位,
  客户类型,
  风险评定部门,
  合同条款,
  风险提示,
  风险等级,
  修改建议,
  fo_phid
FROM
  clhtfxpjtz_view
WHERE
  fo_phid = @fo_phid
             [query]
ORDER BY
  ocode,
  合同编码;