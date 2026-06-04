function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000185_m');



    if (otype == $Otype.ADD) {
        mstform.on('dataready', function () {
            var jbr = mstform.getItem('phid_fill_psn').getValue();
            console.log("phid_fill_psn:", jbr);
            if (jbr) {
                execServer('p_form0000000185_Getygxm', { fphid: jbr }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (res.count > 0) {
                        mstform.getItem('bill_name').setValue($appinfo.username + '发起的设计任务书评审流程');
                        mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                        BatchBindCombox([mstform.getItem('deptid')]);
                        //alert(xm1);  
                    }
                })
            }
        })

    }
}