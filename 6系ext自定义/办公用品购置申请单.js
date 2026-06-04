function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000231_m');
    var dgrid = Ext.getCmp('p_form0000000231_d');

    if (otype == $Otype.ADD) {

        //var jbr=mstform.getItem('fillpsn').getValue();    
        var jbr = mstform.getItem('phid_fill_psn').getValue();
        execServer('p_form0000000231_Getygxm', { fphid: jbr }, function (res) {
            if (res.count > 0) {
                console.log(res, 111)
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                var deptid1Item = mstform.getItem("deptid");
                if (data[0]) {
                    mstform.getItem('bill_name').setValue($appinfo.username + '发起的办公用品购置申请');
                    console.log(deptid1Item)
                    deptid1Item.setValue(data[0].extendObjects.deptid);
                    //mstform.getItem('deptid').setValue(res.record[0]['phid']);
                    BatchBindCombox([mstform.getItem('deptid')]);
                    //alert(xm1);  
                }
            }
        })
    }
    //监听表体，表体更新则进行相关的操作
    dgrid.addListener('edit', function (editor, e) {
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        if (e.field == 'qty' || e.field == 'prc') {
            var record = e.record;
            //alert(Ext.Number.from(record.get('prc'),0));
            //alert(Ext.Number.from(record.get('qty'),0));
            record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));
        }

    })

}