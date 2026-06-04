$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_0000000094_m');
    if (editPage.oType == "add" || editPage.oType == "edit") {
        useBeforeOpen(async function ({ args }) {
            console.log("u_zldbh");
            if (mstform.getItem("phid_pc").getValue() == "" || mstform.getItem("phid_pc").getValue() == null) {
                $NG.alert("请先选择项目");
                return false;
            } else {
                $NG.updateUI(function (updater, state) {
                    console.log("updater:", updater);
                    updater.fieldSetForm.p_form_0000000094_m.u_zldbh.setProps({
                        clientSqlFilter: ("phid_pc = '" + mstform.getItem("phid_pc").getValue() + "'"),	//根据
                        placeholder: ``
                    });
                });
            }
        }, "lwfbqrd");
        useValuesChange(({ args, form }) => {
            console.log(args[0]);
            const u_zldbh = args[0].u_zldbh.value;
            if (u_zldbh) {
                console.log('u_zldbh:', u_zldbh);
                //从项目取值
                $NG.execServer("qrdylw", { phid: u_zldbh }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = JSON.parse(res.data);
                        if (data.length > 0) {
                            console.log("data:", data)
                            //主表的信息
                            const u_fbhtmc = data[0].extendObjects.u_fbhtmc;
                            const u_fbhtmc_exname = data[0].extendObjects.u_fbhtmc_exname;
                            const u_fbsmc = data[0].extendObjects.u_fbsmc;
                            const u_fbsmc_exname = data[0].extendObjects.u_fbsmc_exname;

                            console.log("u_fbhtmc:", u_fbhtmc);
                            console.log("u_fbhtmc_EXName:", u_fbhtmc_exname);
                            console.log("u_fbsmc:", u_fbsmc);
                            console.log("u_fbsmc_EXName:", u_fbsmc_exname);

                            $NG.updateState((updater) => {
                                updater.data.p_form_0000000094_m.setProps({
                                    u_fbhtmc: u_fbhtmc,
                                    u_fbhtmc_EXName: u_fbhtmc_exname,
                                    u_fbsmc: u_fbsmc,
                                    u_fbsmc_EXName: u_fbsmc_exname,
                                });
                            });
                        }

                    }
                });
            }
        }, "p_form_0000000094_m.u_zldbh");
    }


});
