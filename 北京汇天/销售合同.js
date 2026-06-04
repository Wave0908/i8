function AllReady() {
    var mstform = Ext.getCmp('CntM3');
    console.log("ready");
    //单据新增触发条件
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('PhidPc').addListener('change', function (res) {
            var PhidPc = mstform.getItem('PhidPc').getValue();
            if (PhidPc) {
                execServer('xshtdcdw', {
                    pc: PhidPc
                }, function (res) {
                    console.log(res);
                    if (!Ext.isEmpty(res.data[0])) {
                        mstform.getItem('PhidRecComp').setValue(res.data[0].PhidRecComp);
                        mstform.getItem('InvoiceSen').setValue(res.data[0].PhidRecComp);
                        mstform.getItem('PhidSenComp').setValue(res.data[0].PhidSenComp);
                        mstform.getItem('InvoiceCmp').setValue(res.data[0].PhidSenComp);
                    }
                });
            }
        })
    }
}