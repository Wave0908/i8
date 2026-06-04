$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useBeforeClick, useDataIndexChange, useUpdateRows, useClick }
) {
    var mstform = $NG.getCmpApi('p_form_sslsgzzsj_m');
    var dgrid = $NG.getCmpApi('p_form_sslsgzzsj_d1');
    useValuesChange(({ args }) => {
        var u_gclxyj = mstform.getItem('u_gclxyj').getValue();
        console.log("u_gclxyj", u_gclxyj)
        if (u_gclxyj) {
            $NG.execServer('yjml', {
                phid: u_gclxyj
            }, function (res) {
                console.log("res:", res);
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('bill_name').setValue(data[0].extendObjects.c_name + "实施类施工组织设计");
                }
            })
        }
        $NG.updateUI(function (updater, state) {
            console.log('updater:', updater);
            console.log('state:', state);
            updater.grid.p_form_sslsgzzsj_d1.u_ejfl.setProps({
                clientSqlFilter: ("pid = " + u_gclxyj),	//根据
                placeholder: ``
            });
        });
    }, "p_form_sslsgzzsj_m.u_gclxyj");
    // useBeforeOpen(async function ({ args }) {
    //     console.log("监听u_sjfl");
    //     console.log("args", args)
    //     var ejfl = data[0].get('u_ejfl');
    //     console.log("ejfl", ejfl)
    //     $NG.updateUI(function (updater, state) {
    //         console.log('updater:', updater);
    //         console.log('state:', state);
    //         updater.grid.p_form_0000700630_d1.u_sjfl.setProps({
    //             clientSqlFilter: ("pid = " + ejfl),	//根据
    //             placeholder: ``
    //         });
    //     });
    // }, "yjksjml_copy");
    useDataIndexChange(({ args, instance }) => {
        console.log("u_ejfl args:", args)
        var u_ejfl = args[0].u_ejfl;
        if (u_ejfl) {
            $NG.updateUI(function (updater, state) {
                updater.grid.p_form_sslsgzzsj_d1.u_sjfl.setProps({
                    clientSqlFilter: ("pid = " + u_ejfl),	//根据
                    placeholder: ``
                });
            });
        }
    }, "p_form_sslsgzzsj_d1.u_ejfl");

})



