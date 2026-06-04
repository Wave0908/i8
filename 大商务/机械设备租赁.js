$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useClick }
) {
    //TODO
    var mstform = $NG.getCmpApi('p_form_0000000076_m');
    console.log("mstform:", mstform);
    const bill_no = mstform.getValues().bill_no;
    console.log("bill_no:", bill_no);
    $NG.execServer("gjdjdcjxfewcbzb", {
        billno: bill_no
    }, function (res) {
        const data = JSON.parse(res.data);
        console.log("data[0].extendObjects:" + data[0].extendObjects);
        const u_jxfewcb = data[0].extendObjects.u_jxfewcb;
        //项目公司、投资概算
        $NG.updateState((updater) => {
            updater.data.p_form_0000000076_m.setProps({
                u_jxfewcb: u_jxfewcb,
            });
        });
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