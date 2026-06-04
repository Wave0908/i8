$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useUpdateRow, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi("DynamicContractPlanmform");
    var phidPc = mstform.getItem("phidPc").getValue();
    //var toolbar = $NG.getCmpApi("toolbar"); //表单布局不同，可能有差别，f12用选择器去看
    // var btn = toolbar.getItem("u_xzlwfbyzyfb");
    var dgrid1 = $NG.getCmpApi("DynamicContractPlangrid");//实体类
    var dgrid2 = $NG.getCmpApi("DynamicContractPlanVirtualgrid");//虚拟类

    //劳务分包、专业分包、主要材料、小型机械合约包费用项明细
    var fymx1 = $NG.getCmpApi("ContPacDetailgrid");
    //周转材料、大型机械合约包费用项明细
    var fymx2 = $NG.getCmpApi("ContPacDetailgrid2");
    //安全文明施工费、临时设施费、其他措施费合约包费用项明细
    var fymx3 = $NG.getCmpApi("ContPacDetailgrid3");
    //管理费合约包费用项明细
    var fymx4 = $NG.getCmpApi("ContPacDetailgrid4");
    //规费合约包费用项明细
    var fymx5 = $NG.getCmpApi("ContPacDetailgrid5");
    //其他费合约包费用项明细
    var fymx6 = $NG.getCmpApi("ContPacDetailgrid6");
    //非系统内置根节点的合约包费用项明细
    // var fymx7 = $NG.getCmpApi("ContPacDetailgrid7");

    console.log("mstform:", mstform);
    console.log("phidPc:", phidPc);
    console.log("dgrid1:", dgrid1);
    console.log("dgrid2:", dgrid2);

    console.log("fymx1:", fymx1);
    console.log("fymx2:", fymx2);
    console.log("fymx3:", fymx3);
    console.log("fymx4:", fymx4);
    console.log("fymx5:", fymx5);
    console.log("fymx6:", fymx6);
    // console.log("fymx7:", fymx7);

    //功能扩展  动态合约规划查询二维指标  dthyghcxewzb

    execServer('dthyghcxewzb', {
        'phidPc': phidPc
    }, function (res) {
        if (res.count > 0) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log("data:",data);
            //dgrid2.setData(data);
        }
    });

    // useUpdateRow(({ args, table }) => {
    //     const record = args[0];
    //     console.log("record:", record);
    //     // if (record.u_sl && record.u_dj) {
    //     //     record.u_hj = (
    //     //         parseFloat(record.u_dj) * parseFloat(record.u_sl)
    //     //     ).toFixed(2);
    //     // }
    // })



});


