$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_0000000076_m');
    var dgrid = $NG.getCmpApi('p_form_0000000076_d');
    console.log("mstform:", mstform);
    const phid_pc = mstform.getValues().phid_pc;
    console.log("phid_pc:", phid_pc);
    const bill_no = mstform.getValues().bill_no;
    console.log("bill_no:", bill_no);

    if (dgrid.getRows().length == 0) {
        console.log('rows:', dgrid.getRows());
        // 直接调用computed函数，不需要遍历rows
        computed();
        dgrid.refreshView();
    }

    //调用不同的功能扩展需要提换下方getygxx，对应赋值字段也需要对应
    function computed(phid) {
        $NG.execServer("jxsbdthybx", {},//功能扩展
            function (res) {
                console.log("res:", res);
                // 添加空值校验
                if (!res || !res.data) {
                    console.log("jxsbdthybx 返回数据为空");
                    return;
                }

                try {
                    const datas = JSON.parse(res.data);
                    console.log(datas, "datas");

                    // 校验datas是否为有效数组
                    if (!datas || !Array.isArray(datas) || datas.length === 0) {
                        console.log("jxsbdthybx 解析数据无效或为空数组");
                        return;
                    }

                    // 遍历每个数据项，提取extendObjects中的值
                    const allRows = [];
                    datas.forEach((item) => {
                        if (item && item.extendObjects) {
                            const rowData = {
                                u_mc: item.extendObjects.u_mc || "",
                                u_sl: item.extendObjects.u_sl || 0,
                                u_gsje: item.extendObjects.u_gsje || 0
                            };
                            allRows.push(rowData);
                        }
                    });

                    // 一次性添加所有行
                    if (allRows.length > 0) {
                        dgrid.addRows(allRows);
                    }

                    dgrid.refreshView();
                } catch (error) {
                    console.error("解析jxsbdthybx返回数据时出错:", error);
                }
            }
        );
    }




    $NG.execServer("gjdjdcjxfewcbzb", {
        billno: bill_no
    }, function (res) {
        // 添加空值校验
        if (!res || !res.data) {
            console.log("gjdjdcjxfewcbzb 返回数据为空");
            return;
        }

        try {
            const data = JSON.parse(res.data);
            console.log("data[0].extendObjects:" + data[0].extendObjects);

            // 校验data数组是否存在且有数据
            if (!data || !Array.isArray(data) || data.length === 0 || !data[0] || !data[0].extendObjects) {
                console.log("gjdjdcjxfewcbzb 解析数据无效");
                return;
            }

            const u_jxfewcb = data[0].extendObjects.u_jxfewcb;
            //项目公司、投资概算
            $NG.updateState((updater) => {
                updater.data.p_form_0000000076_m.setProps({
                    u_jxfewcb: u_jxfewcb || "",
                });
            });
        } catch (error) {
            console.error("解析gjdjdcjxfewcbzb返回数据时出错:", error);
        }
    });

    useDataIndexChange(({ args }) => {
        //store
        debugger
        const store = args[1].table.store;
        console.log(store.data)
        var sumAmt = 0;
        store.data.forEach((item) => {
            sumAmt += item.u_gsje === undefined ? 0 : item.u_gsje; //遍历汇总
        });
        console.log(sumAmt);
        //汇总赋值
        $NG.updateState((updater) => {
            updater.data.p_form_0000000076_m.setProps({
                u_xmbnfscb: sumAmt,
            });
        });
    }, "u_gsje");
});