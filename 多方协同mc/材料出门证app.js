$NG.AllReady(function (page, { useClick, useBeforeClick, useValuesChange, useDataIndexChange, useBeforeOpen, useImpPullData, useImportExcelData }) {
    console.log("$NG.getUser():", $NG.getUser());
    var mstform = $NG.getCmpApi('p_form_clcmz_m_fs');
    //var mstform = $NG.getCmpApi('p_form_clcmz_m');
    console.log("mstform:", mstform);
    mstform.getItem('bill_dt').setReadOnly(true);

    var orgID = $NG.getUser().orgID;
    var orgName = $NG.getUser().orgName;
    var projectUnitId = $NG.getUser().projectUnitId;
    var projectId = $NG.getUser().projectId;

    if (projectUnitId) {
        //ljsrht
        $NG.execServer("gjxmdydcxmmcc", { 'phid_org': projectUnitId }, (res) => {
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
        // $NG.execServer("hqcmdwmc", { phid: projectUnitId }, function (res) {
        //     console.log("res:", res);
        //     if (res.count > 0) {
        //         const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        //         console.log("data:", data)
        //         const u_xmmc_EXName = data[0].extendObjects.oname;
        //         $NG.updateState((updater) => {
        //             updater.data.p_form_clcmz_m.setProps({
        //                 u_xmmc: projectUnitId,
        //                 u_xmmc_EXName: u_xmmc_EXName,
        //             });
        //         });
        //     }
        // });
    }
    // $NG.updateState((updater) => {
    //     updater.data.p_form_clcmz_m.setProps({
    //         phid_org: orgID,
    //         phid_org_EXName: orgName,
    //         phid_pc: projectId,
    //         phid_pc_EXName: projectUnitId
    //     })
    // })
    $NG.updateState((updater) => {
        updater.data.p_form_clcmz_m.setProps({
            phid_org: projectId,
        })
    })
}, function () {
    console.log('列表页加载完成');
});