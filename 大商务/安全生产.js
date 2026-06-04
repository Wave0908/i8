$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    //自动带出
    var mstform = $NG.getCmpApi('p_form_0000000078_m');
    console.log("mstform:", mstform);
    const bill_no = mstform.getValues().bill_no;
    const phid_pc = mstform.getValues().phid_pc;
    console.log("phid_pc:", phid_pc);
    console.log("bill_no:", bill_no);
    $NG.execServer("gjdjdcaqf", {
        'phid': phid_pc
    }, function (res) {
        console.log("res.data:", res.data);
        const data = JSON.parse(res.data);
        console.log("data[0].extendObjects:" + data[0].extendObjects);
        const u_aqscewcb = data[0].extendObjects.u_aqscewcb;
        console.log("u_aqscewcb:", u_aqscewcb);
        //项目公司、投资概算
        $NG.updateState((updater) => {
            updater.data.p_form_0000000078_m.setProps({
                u_aqscewcb: u_aqscewcb,
            });
        });
    });
    useDataIndexChange(({ args }) => {
        //store
        const store = args[1].table.store;
        console.log(store.data)
        var sumAmt = 0;
        store.data.forEach((item) => {
            sumAmt += item.u_gsjz; //遍历汇总
        });
        console.log(sumAmt);
        //汇总赋值
        $NG.updateState((updater) => {
            updater.data.p_form_0000000078_m.setProps({
                u_xmvnfscb: sumAmt*10000,
            });
        });
    }, "u_gsjz");
});