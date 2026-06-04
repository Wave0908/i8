$NG.AllReady(function (editPage, { useValuesChange, useDataIndexChange }) {
    var mstform = $NG.getCmpApi('p_form_0000000071_m');
    var dgrid = $NG.getCmpApi('p_form_0000000071_d');
    //过滤审批结束且是否发放奖金为是的奖金申请单据
    $NG.updateUI(function (updater, state) {
        updater.fieldSetForm.p_form_0000000071_m.u_jjsq.setProps({
            clientSqlFilter: ('app_status = 1 and u_sfff = 1')
        });
    });
    //根据选择的申请单据带出值
    useValuesChange(({ args }) => {
        console.log(args[0]);
        $NG.updateState((updater) => {
            updater.data.p_form_0000000071_m.setProps({
                u_chcxrd: args[0].u_jjsq.origin.u_cxrdje,
                u_jjrd: args[0].u_jjsq.origin.u_jjrd,
            });
        });
    }, "p_form_0000000071_m.u_jjsq");
    //根据选择的人员带出岗位
    useDataIndexChange(({ args, instance }) => {
        console.log("arg[0]", args[0]);
        $NG.execServer("get_gwxx", { phid: args[0].u_ryxm }, function (res) {
            if (res.count > 0) {
                const data = JSON.parse(res.data);
                const u_rygw = data[0].extendObjects.station_phid;
                const u_rygw_exname = data[0].extendObjects.station_name;
                console.log(u_rygw);
                console.log(u_rygw_exname);
                $NG.updateState((updater) => {
                    console.log("updater:",updater);
                    updater.grid.p_form_0000000071_d.setProps({
                        u_rygw: u_rygw,
                        u_rygw_EXName: u_rygw_exname
                    });
                });
                dgrid.refreshView();
            }

        });

    }, 'p_form_0000000071_d.u_ryxm');




    //var mstform = $NG.getCmp('p_form_0000000071_m');
    useValuesChange(({ args }) => {
        //  const u_dlqrfs = mstform.getItem("u_dlqrfs").getValue();
        $NG.updateUI(function (updater, state) {
            console.log('updater:', updater);
            updater.fieldSetForm.p_form_0000000071_m.u_chnr.setProps({
                required: true, //required是否必输
            });

        });
        mstform.getItem('u_chcxrd').setValue('1000');
    }, "p_form_0000000071_m.u_jjrd");
}, function () {
    console.log('list Ready');
});