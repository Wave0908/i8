$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_jiaozhuling_m');
    if (editPage.oType == "add") {
        var orgName = $NG.getUser().orgName;
        var phidCU = $NG.getUser().phidCU
        var cuName = $NG.getUser().cuName
        $NG.execServer("gjxmdydcxmmcc", { 'phid_org': phidCU }, (res) => {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                var u_xmmc = data[0].extendObjects.u_xmmc;
                var u_xmmc_EXName = data[0].extendObjects.u_xmmc_exname;
                $NG.updateState((updater) => {
                    updater.data.p_form_jiaozhuling_m.setProps({
                        u_xmmc: u_xmmc,
                        u_xmmc_EXName: u_xmmc_EXName,
                    })
                })
            }
        });
        $NG.updateState((updater) => {
            updater.data.p_form_jiaozhuling_m.setProps({
                u_sqdw: orgName,
            })
        })
    }


});
