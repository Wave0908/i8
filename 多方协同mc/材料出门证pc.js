$NG.AllReady(function (page, { useClick, useBeforeClick, useValuesChange, useDataIndexChange, useBeforeOpen, useImpPullData, useImportExcelData }) {
    console.log("$NG.getUser():", $NG.getUser());
    var mstform = $NG.getCmpApi('p_form_clcmz_m_fs');
    //var mstform = $NG.getCmpApi('p_form_clcmz_m');
    console.log("mstform:", mstform);
    mstform.getItem('bill_dt').setReadOnly(true);


    var orgName = $NG.getUser().orgName;
    var phidCU = $NG.getUser().phidCU
    var cuName = $NG.getUser().cuName

    $NG.execServer("gjxmdydcxmmcc", { 'phid_org': phidCU }, (res) => {
        if (res.count > 0) {
            var data = JSON.parse(res.data)
            var u_xmmc = data[0].extendObjects.u_xmmc;
            var u_xmmc_EXName = data[0].extendObjects.u_xmmc_exname;
            $NG.updateState((updater) => {
                updater.data.p_form_clcmz_m.setProps({
                    u_xmmc: u_xmmc,
                    u_xmmc_EXName: u_xmmc_EXName,
                })
            })
        }
    });
    $NG.updateState((updater) => {
        updater.data.p_form_clcmz_m.setProps({
            u_cmdw: orgName,
        })
    })
}, function () {
    console.log('列表页加载完成');
});