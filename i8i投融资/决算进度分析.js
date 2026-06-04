$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useBeforeOpen, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_jsjdfx_m');
    var d1 = $NG.getCmpApi("p_form_jsjdfx_d1");
    var d2 = $NG.getCmpApi("p_form_jsjdfx_d2");;

    useDataIndexChange(({ args, instance }) => {
        console.log("args:", args);
        const u_bysjwce = Number(args[0].u_bysjwce || 0);
        console.log("u_bysjwce:", u_bysjwce);
        
        args[0].u_ljsjwce = u_bysjwce;
        
        // 修正：计算决算偏差 (假定10000是计划值)
        var u_jdpc = 10000 - (u_bysjwce / 10000);
        args[0].u_jdpc = u_jdpc;
        console.log("u_jdpc:", u_jdpc);
        
        // 计算偏差率
        var u_pcl = ((u_jdpc / 10000)*100).toFixed(4);
        args[0].u_pcl = u_pcl;
        console.log("u_pcl:", u_pcl);
        
        if (Number(u_pcl) > 0.05) {
            args[0].u_sfzh = '1';
        } else {
            args[0].u_sfzh = '0';
        }
        instance.updateRow(args[0]);

    }, ['p_form_jsjdfx_d2.u_bysjwce']);
    if (editPage.oType == "add" || editPage.oType == "edit") {
        useValuesChange(async ({ args, form }) => {
            const u_sssyb = args[0].u_sssyb.value;
            console.log("u_sssyb:", u_sssyb);
            mstform.getItem('u_jszbze').setValue(10000);
            //SELECT 
            //     u_sssyb, 
            //     bill_dt 
            // FROM 
            //     p_form_jsjdfx_m 
            // WHERE 
            //     u_sssyb = @bm
            //     AND TO_CHAR(bill_dt, 'YYYYMM') = TO_CHAR(SYSDATE, 'YYYYMM')
            if (u_sssyb) {
                $NG.execServer("jsjdfxydjc", { bm: u_sssyb }, async function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data1.length > 0) {
                            $NG.alert("该部门本月于" + data1[0].extendObjects.bill_dt + "已录入决算进度分析表。");
                            mstform.getItem('u_sssyb').setValue(null);
                            d1.clearRows();
                            d2.clearRows();

                        }
                    } else {
                        d1.clearRows();
                        setTimeout(() => {
                            d1.addRows([
                                {
                                    u_month1: 5000000,
                                    u_month2: 6000000,
                                    u_month3: 7000000,
                                    u_month4: 8000000,
                                    u_month5: 8000000,
                                    u_month6: 9000000,
                                    u_month7: 9000000,
                                    u_month8: 10000000,
                                    u_month9: 10000000,
                                    u_month10: 10000000,
                                    u_month11: 9000000,
                                    u_month12: 9000000,
                                    u_month_sum: 100000000
                                }
                            ]);
                            d2.addRows([{ u_ljsjwce: 0 }]);
                        }, 100);
                    }
                })
            }
        }, "p_form_jsjdfx_m.u_sssyb");

    }


});
