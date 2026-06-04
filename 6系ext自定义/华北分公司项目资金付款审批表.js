function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000251_m');

    if (otype == $Otype.ADD) {
        mstform.getItem('phid_fill_psn').addListener('change', function () {
            var jbr = mstform.getItem('phid_fill_psn').getValue();
            console.log("jbr:", jbr);
            execServer('p_form0000000251_Getygxm', { fphid: jbr }, function (res) {
                if (res.count > 0) {
                    console.log("res:", res);
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('bill_name').setValue($appinfo.username + '发起的项目资金付款审批流程');
                    mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                    BatchBindCombox([mstform.getItem('deptid')]);
                    //alert(xm1);  
                }
            })
        })

    }
}