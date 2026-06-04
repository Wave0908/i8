$NG.AllReady(function (editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
    var mstform = $NG.getCmpApi('p_form_yszktzrb_m');
    var dgrid = $NG.getCmpApi('p_form_yszktzrb_d1');
    if (editPage.oType == "add" || editPage.oType == "edit") {
        // var allRows = [];
        var time = mstform.getItem('bill_dt').getValue();
        var dateObj = new Date(time);
        var start_t = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + String(dateObj.getDate()).padStart(2, '0');
        console.log("start_t:", start_t);
        if (mstform.getItem("phid_org").getValue() == "" || mstform.getItem("phid_org").getValue() == null) {
            $NG.alert("请先填写所属组织");
            return false;
        } else {
            console.log('mstform.getItem("phid_org").getValue():', mstform.getItem("phid_org").getValue());

            $NG.updateUI(function (updater, state) {
                console.log("updater:", updater);
                updater.fieldSetForm.p_form_yszktzrb_m.phid_pc.setProps({
                    clientSqlFilter: ("phid_org = '" + mstform.getItem("phid_org").getValue() + "'"),	//根据
                    placeholder: ``
                });
            });
        }

    }

    useValuesChange(({ args, form }) => {
        //清空明细
        dgrid.clearRows();
        console.log(args[0]);
        //const phid_pc = args[0].pc.PhId;
        const phid_pc = args[0].phid_pc.value;

        var allRows = [];
        
        //从项目取值
        if (phid_pc) {

            $NG.execServer("ljht", { pc: phid_pc }, function (res) {
                console.log("res:", res);
                if (res.count > 0) {
                    const data = JSON.parse(res.data);
                    console.log("data:", data)
                    project_name = data[0].extendObjects.project_name;
                    for (let i = 0; i < data.length; i++) {
                        const ex = data[i].extendObjects || {};
                        const rowData = {
                            u_jfdwmc: ex.u_zwdwmc,
                            u_jfdwmc_EXName: ex.u_zwdwmc_exname,
                            u_dyzqrzz: 0,
                            u_abs: 0,
                            u_zjphtc: 0,
                            u_qt: 0,
                            u_hktzhj: 0,
                            u_ywfssj: start_t

                        }
                        allRows.push(rowData);
                    }
                    if (allRows.length > 0) {
                        dgrid.addRows(allRows);
                        console.log("第一次添加子表数据:", allRows);
                        dgrid.refreshView();
                    }






                } else {
                    $NG.alert("该项目暂无信息");
                }




            })

        }

    }, "p_form_yszktzrb_m.phid_pc")


    useDataIndexChange(({ args, instance }) => {





        const u_dyzqrzz = args[0].u_dyzqrzz;
        const u_abs = args[0].u_abs;
        const u_zjphtc = args[0].u_zjphtc;
        const u_qt = args[0].u_qt;
        //const start_t = new Date(time);

        args[0].u_hktzhj = u_dyzqrzz + u_abs + u_zjphtc + u_qt;
        //args[0].u_ywfssj=start_t
        instance.updateRow(args[0]);


    }, ['p_form_yszktzrb_d1.u_dyzqrzz',
        'p_form_yszktzrb_d1.u_abs',
        'p_form_yszktzrb_d1.u_zjphtc',
        'p_form_yszktzrb_d1.u_qt',
        'p_form_yszktzrb_d1.u_ywfssj',
    ]);



})