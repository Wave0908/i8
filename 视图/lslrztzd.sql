CREATE VIEW lslrztzd AS
-- 临设类入账通知单
SELECT
    m.bill_no AS 单据编号,
    fo.oname AS 申请单位,
    fo1.oname AS 使用部门,
    fo2.oname AS 管理部门,
    p18.bill_name AS 购置单号,
    fsd.c_name AS 计税方式,
    fsd1.c_name AS 发票类型,
    p257.gs_mc AS 新增业务,
    m.fj_num AS 附件张数,
    m.zy AS 摘要,
    d.zcbm AS 资产编码,
    d.zcmc AS 资产名称,
    d.ggxh AS 规格型号,
    zclx.c_name AS 资产主类别,
    zclb.c_name AS "资产分类(辅类别)",
    fsd2.c_name AS 资产来源方式,
    zzqlr AS 证载权利人,
    mqqlr AS 目前权利人,
    sjzyr AS 实际占用人,
    zztdsyqr AS 证载土地使用权人,
    jzjg AS 建筑结构,
    jglx AS 结构类型,
    jzmj AS 建筑面积,
    zdmj AS 宗地面积,
    jcrq AS 建成日期,
    tdyt AS 土地用途,
    fczbh AS 房产证编号,
    cg AS 层高,
    zcs AS 总层数,
    fcly AS 房产来源,
    tdzbh AS 土地证编号,
    bdwzdjc AS 本单位占用第几层,
    xxzkdz AS 详细坐落地址,
    org_id1 AS 单位名称,
    d.msunit AS 计量单位,
    ROUND(d.qty_1, 3) AS 数量,
    d.prc AS 单价,
    -- 税率：保留两位小数并拼接百分号
    CONCAT(CAST(ROUND(d.sl * 100.0, 2) AS DECIMAL(18, 2)), '%') AS 税率,
    d.se AS 数额,
    d.bhsje AS 不含税金额,
    d.hsje AS 含税金额,
    d.bbamt AS 本币含税金额,
    d.amt AS 原币含税金额,
    d.yz_amt AS 原值,
    d.zjnxn AS "折旧年限(年)",
    d.ftnxn AS 分摊月份,
    d.zjqs AS "折旧期数(月)",
    -- 残值率：保留两位小数并拼接百分号
    CONCAT(CAST(ROUND(d.czl * 100.0, 2) AS DECIMAL(18, 2)), '%') AS "残值率(%)",
    d.jhcz AS 计划残值,
    d.cz AS 残值,
    d.jz AS 净值,
    d.yzje AS 月折旧额,
    -- 期折旧率：保留两位小数并拼接百分号
    CONCAT(CAST(ROUND(d.deprate * 100.0, 2) AS DECIMAL(18, 2)), '%') AS 期折旧率,
    d.yfte AS 月分摊额,
    d.qty AS 已用月数,
    d.ljzj AS 累计折旧,
    szrq AS 上帐日期,
    qyrq AS 启用日期,
    d.syzt AS 使用状态,
    d.org_id AS 单据体使用部门,
    d.remarks AS 备注
FROM p_form0000000019_m m
LEFT JOIN p_form0000000019_d d ON d.m_code = m.phid
LEFT JOIN fg_orglist fo ON fo.phid = m.phid_org
LEFT JOIN fg_orglist fo1 ON fo1.phid = m.sybm
LEFT JOIN fg_orglist fo2 ON fo2.phid = m.glbm
LEFT JOIN p_form0000000018_m p18 ON p18.phid = m.userhelp_1
LEFT JOIN fg_simple_data fsd ON fsd.phid = m.jsfs
LEFT JOIN fg_simple_data fsd1 ON fsd1.phid = m.fplx
LEFT JOIN p_form0000000257_d p257 ON p257.phid = m.ywlx_xz
LEFT JOIN fg_simple_data zclx ON zclx.phid = d.zclb  -- 假设资产主类别关联fg_simple_data
LEFT JOIN fg_simple_data zclb ON zclb.phid = d.zcfl  -- 假设资产辅类别关联fg_simple_data
LEFT JOIN fg_simple_data fsd2 ON fsd2.phid = d.zclyfs  -- 假设资产来源方式字段为zclyfs
WHERE m.zclx = 1;  -- 筛选临设类资产