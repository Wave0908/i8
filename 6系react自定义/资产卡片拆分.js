//1.入口函数
$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, addRow, useBeforeClick, useUpdateRows, useClick }
) {
    console.log('ready');
    var mstform = $NG.getCmpApi("p_form_zckpdivide_m");
    var dgrid = $NG.getCmpApi("p_form_zckpdivide_d1");
    if (editPage.oType == "add" || editPage.oType == "edit") {
        useValuesChange(({ args, form }) => {
            console.log("args:", args)
            const u_zcmc = args[0].u_zcmc.value;
            console.log("u_zcmc:", u_zcmc)
            //从项目取值
            if (u_zcmc) {
                console.log('主表u_zcmc:', u_zcmc);
                //从项目取值
                //ljsrht
                $NG.execServer("hqzcyz", { phid: u_zcmc }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        console.log("data:", data)
                        const u_yz = data[0].extendObjects.yz;
                        $NG.updateState((updater) => {
                            updater.data.p_form_zckpdivide_m.setProps({
                                u_yz: u_yz,
                            });
                        });
                    }
                });
            }
        }, "p_form_zckpdivide_m.u_zcmc");

        useBeforeClick(async function ({ args }) {
            //按钮点击前事件
            const rows = dgrid.getRows();
            console.log("点击保存前，所有行数据：", rows);
            let all_yz = 0;
            for (let k = 0; k < rows.length; k++) {
                let row = rows[k];
                //累计开单➖累计回款 必须等于 应收账款小计  否则无法保存
                console.log("第" + (k + 1) + "行，原值 = " + row.u_yz);
                all_yz += Number(row.u_yz) || 0;
            }
            
            
            var yz = Number(mstform.getItem("u_yz").getValue()) || 0;
            console.log("主表原值 = " + yz);
            if (all_yz != yz) {
                await $NG.alert('拆分的明细总原值与主表原值不一致，无法保存');
                return false;
            }
        }, "save");
    }
}, function () {
    console.log('列表页加载完成');
});