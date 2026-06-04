//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("p_form_xmchzxplfxbg_m");
    var dgrid1 = $NG.getCmpApi("p_form_xmchzxplfxbg_d1");//进度策划
    var dgrid2 = $NG.getCmpApi("p_form_xmchzxplfxbg_d2");//分包招标策划
    var dgrid3 = $NG.getCmpApi("p_form_xmchzxplfxbg_d3");//采购策划
    //var toolbar = $NG.getCmpApi("toolbar_top"); //表单布局不同，可能有差别，f12用选择器去看
    if (editPage.oType == "add" || editPage.oType == "edit") {
        //选择项目
        useValuesChange(({ args, form }) => {
            const phid_pc = args[0].phid_pc.value;
            if (phid_pc) {
                console.log("phid_pc:", phid_pc);
                //进度策划
                var allRows1 = [];
                $NG.execServer("zxplfxbg_jdch", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null
                            }
                            allRows1.push(rowData);
                        }
                        if (allRows1.length > 0) {
                            dgrid1.addRows(allRows1);
                            console.log("带出进度策划数据:", allRows1);
                            dgrid1.refreshView();
                        }
                    }
                })
                //分包招标策划
                var allRows2 = [];
                $NG.execServer("zxplfxbg_fbzbch", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null,
                                u_xsjdkzz: ex.u_xsjdkzz || null
                            }
                            allRows2.push(rowData);
                        }
                        if (allRows2.length > 0) {
                            dgrid2.addRows(allRows2);
                            console.log("带出分包招标策划数据:", allRows2);
                            dgrid2.refreshView();
                        }
                    }
                })
                //采购策划
                var allRows3 = [];
                $NG.execServer("zxplfxbg_cgch", { pc: phid_pc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        for (let i = 0; i < data.length; i++) {
                            const ex = data[i].extendObjects || {};
                            const rowData = {
                                u_kdmc: ex.u_kdmc || null,
                                u_jhwcsj: ex.u_jhwcsj || null
                            }
                            allRows3.push(rowData);
                        }
                        if (allRows3.length > 0) {
                            dgrid3.addRows(allRows3);
                            console.log("带出采购策划数据:", allRows3);
                            dgrid3.refreshView();
                        }
                    }
                })

            }
        }, "p_form_xmchzxplfxbg_m.phid_pc");

        useDataIndexChange(({ args, instance }) => {
            console.log("计算进度策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                if (u_sjwcsj > u_jhwcsj) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d1.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算分包招标策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                if (u_sjwcsj > u_jhwcsj) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d2.u_sjwcsj']);
        useDataIndexChange(({ args, instance }) => {
            console.log("计算采购策划是否超期...")
            const u_jhwcsj = args[0].u_jhwcsj;
            const u_sjwcsj = args[0].u_sjwcsj;
            if (u_jhwcsj && u_sjwcsj) {
                if (u_sjwcsj > u_jhwcsj) {
                    args[0].u_sfcq = "01";
                } else {
                    args[0].u_sfcq = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d3.u_sjwcsj']);

        useDataIndexChange(({ args, instance }) => {
            console.log("计算分包招标策划是否在控制范围内...")
            const u_xsjdkzz = args[0].u_xsjdkzz;
            const u_sjfsz = args[0].u_sjfsz;
            if (u_xsjdkzz && u_sjfsz) {
                if (u_sjfsz > u_xsjdkzz) {
                    args[0].u_sfzkzfwn = "01";
                } else {
                    args[0].u_sfzkzfwn = "02";
                }
            }
            instance.updateRow(args[0]);

        }, ['p_form_xmchzxplfxbg_d2.u_sjfsz']);
    }
})