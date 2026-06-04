$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_jiaozhuling_m_fs');
    if (editPage.oType == "add") {
        var projectUnitId = $NG.getUser().projectUnitId;
        if (projectUnitId) {
            $NG.execServer("gjxmdydcxmmcc", { 'phid_org': projectUnitId }, (res) => {
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
        }
    }
})