$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_donghuoling_m_fs');
    var dgrid = $NG.getCmpApi("p_form_donghuoling_d1");
    if (editPage.oType == "add") {
        var projectUnitId = $NG.getUser().projectUnitId;
        if (projectUnitId) {
            $NG.execServer("gjxmdydcxmmcc", { 'phid_org': projectUnitId }, (res) => {
                if (res.count > 0) {
                    var data = JSON.parse(res.data)
                    var u_xmmc = data[0].extendObjects.u_xmmc;
                    var u_xmmc_EXName = data[0].extendObjects.u_xmmc_exname;
                    $NG.updateState((updater) => {
                        updater.data.p_form_donghuoling_m.setProps({
                            u_xmmc: u_xmmc,
                            u_xmmc_EXName: u_xmmc_EXName,
                        })
                    })
                }
            });
        }
        if (dgrid.getRows().length == 0) {
            setTimeout(() => {
                dgrid.addRows([
                    { u_dhzyaqcs: "特种作业人员是否持证上岗。" },
                    { u_dhzyaqcs: "是否清理动火地点周边及下方可燃物。" },
                    { u_dhzyaqcs: "动火作业地点是否按规定配备消防器材，是否配备看火人。" },
                    { u_dhzyaqcs: "高处作业动火是否设置防火花飞溅安全措施。" },
                    { u_dhzyaqcs: "气瓶使用是否符合安全标准，安全附件是否齐全有效。" },
                    { u_dhzyaqcs: "动火作业地点是否有可靠立足点及安全防护措施。" },
                    { u_dhzyaqcs: "动火作业人员是否进行安全教育培训及交底。" },
                    { u_dhzyaqcs: "是否制定火灾现场处置方案。" },
                    { u_dhzyaqcs: "其他安全措施：" },
                ]);
            }, 100);
        }
    }


});
