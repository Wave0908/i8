$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useUpdateRow, useUpdateRow1, useClick }
) {
    var dgrid = $NG.getCmpApi("p_form_0000000082_d1");
    const mstform = $NG.getCmpApi('p_form_0000000082_m');

    useValuesChange(({ args }) => {
        const phid_pc = mstform.getValues().phid_pc;
        console.log("phid_pc:", phid_pc);
        $NG.execServer("get_yjzsr", { 'id': phid_pc }, (res) => {
            const _data = JSON.parse(res.data)[0].extendObjects
            console.log("res:", res);
            console.log("res.data:", res.data);
            console.log('_data:', _data);
            $NG.updateState((updater) => {
                updater.data.p_form_0000000082_m.setProps({
                    u_yjzsr: _data.incl_tax_income_amt,//预计总收入
                });
            });

        });
    }, 'phid_pc');

    // 方案1：监听dgrid的u_ncxje字段变化，动态更新汇总
    useDataIndexChange(({ args }) => {
        console.log("useDataIndexChange触发 - u_ncxje");
        calculateAndUpdateTotal();
    }, "u_ncxje");

    // 方案2：监听u_yjsy_chh和u_yjsy_chq字段变化
    useDataIndexChange(({ args }) => {
        console.log("useDataIndexChange触发 - u_yjsy_chh");
        calculateAndUpdateTotal();
    }, "u_yjsy_chh");

    useDataIndexChange(({ args }) => {
        console.log("useDataIndexChange触发 - u_yjsy_chq");
        calculateAndUpdateTotal();
    }, "u_yjsy_chq");

    // 方案3：监听多行数据变化
    useUpdateRows(({ args, table }) => {
        console.log("useUpdateRows触发");
        calculateAndUpdateTotal();
    }, "p_form_0000000082_d1");

    // 汇总计算函数
    function calculateAndUpdateTotal() {
        // 获取当前dgrid的所有行数据
        const rows = dgrid.getRows();
        console.log("所有行数据:", rows);

        var sumNcxje = 0;
        rows.forEach((item) => {
            // 汇总所有行的拟创效金额
            sumNcxje += item.u_ncxje === undefined ? 0 : item.u_ncxje;
        });
        console.log("拟创效金额合计:", sumNcxje);
        // 更新主表的拟创效金额合计
        $NG.updateState((updater) => {
            updater.data.p_form_0000000082_m.setProps({
                u_ncxjehjz: sumNcxje,
            });
        });

        // 获取主表的预计总收入
        const yjzsr = mstform.getValues().u_yjzsr || 0;
        console.log("预计总收入:", yjzsr);

        // 计算比例：拟创效金额合计 / 预计总收入
        let cxbfb = 0;
        if (yjzsr > 0) {
            // 修改计算方式，增加精度
            cxbfb = ((sumNcxje / yjzsr) * 100).toFixed(4); // 增加到4位小数
            // 如果结果太小，使用科学计数法或更精确的显示
            if (parseFloat(cxbfb) < 0.01) {
                cxbfb = ((sumNcxje / yjzsr) * 100).toFixed(6); // 使用6位小数
            }
        }
        console.log("创效百分比:", cxbfb);

        // 更新主表的创效百分比
        $NG.updateState((updater) => {
            updater.data.p_form_0000000082_m.setProps({
                u_cxbfb: cxbfb,
            });
        });
    }

    useUpdateRow(({ args, table }) => {
        const record = args[0];
        //拟创效金额 （万元）
        if (record.u_yjsy_chh && record.u_yjsy_chq) {
            record.u_ncxje = (
                (parseFloat(record.u_yjsy_chh) || 0) - (parseFloat(record.u_yjsy_chq) || 0)
            );
        }
        table.updateRow(record);

        // 方案1补充：在useUpdateRow中也进行汇总计算
        console.log("useUpdateRow触发 - 进行汇总计算");
        calculateAndUpdateTotal();
    }
    )
});