$NG.AllReady(function (page, { useClick, useBeforeClick, useValuesChange, useDataIndexChange, useBeforeOpen, useImpPullData, useImportExcelData }) {
    console.log('详情页加载完成2222222222222');

    var gridTab = $NG.getCmpApi("InvoMainGrid");
    console.log('*****************', $NG.getCmpApi("InvoMainGrid").getSelectedRow())
    useDataIndexChange(({ args, instance }) => {
        console.log('项目变化/销方变更');
        var row = args[0];
        const rowIndex = args[1].update.rowIndex;
        console.log('销方', row.PhidEnt);
        console.log('项目', row.PhidPc);
        console.log(rowIndex);
        var pcid = row.PhidPc;
        var gysid = row.PhidEnt;

        if (pcid && gysid) {
            $NG.execServer("getCnt", { phid_pc: pcid, phid_supply_ent: gysid }, function (res) {
                console.log('res--', res);
                if (res.count = 1) {
                    const data = JSON.parse(res.data)[0].extendObjects;
                    //row.PhidCnt = data.phid;
                    //row.PhidCnt_EXName = data.bill_no;
                    //row.PhidCntName = data.bill_no;

                    
                    // $NG.updateState((updater) => {
                    //     updater.data.InvoMainGrid.setProps({
                    //         PhidCnt: data.phid,
                    //         PhidCnt_EXName: data.bill_no,
                    //     });
                    // });

                    instance.updateRow(row);
                }
            });
        }


    }, ['PhidEnt', 'PhidPc']);


    useDataIndexChange(({ args, instance }) => {
        console.log('合同');
        var row = args[0];
        console.log('合同row', row);
        console.log('合同', row.PhidCnt);
        console.log(gridTab.getItem("PhidCnt").getValue());


    }, 'PhidCnt');


}, function () {
    console.log('列表页加载完成111111111111111');
});