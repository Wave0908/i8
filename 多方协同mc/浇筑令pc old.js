$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_jiaozhuling_m');
    if (editPage.oType == "add") {
        const phid_org = mstform.getItem("phid_org").getValue();
        if (phid_org) {
            console.log('phid_org:', phid_org);
            //从项目取值
            $NG.execServer("jzlqxmdy", { phid: phid_org }, function (res) {
                console.log("res:", res);
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;;
                    if (data.length > 0) {
                        console.log("data:", data)
                        //主表的信息
                        const u_xmdy = data[0].extendObjects.phid;
                        const u_xmdy_exname = data[0].extendObjects.oname;

                        console.log("u_xmdy:", u_xmdy);
                        console.log("u_xmdy_exname:", u_xmdy_exname);

                        $NG.updateState((updater) => {
                            updater.data.p_form_jiaozhuling_m.setProps({
                                u_xmdy: u_xmdy,
                                u_xmdy_EXName: u_xmdy_exname,
                            });
                        });
                    }

                }
            });
        }
    }


});
