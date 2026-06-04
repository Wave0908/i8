function allReadyEdit() { //初始化
    var mstform = Ext.getCmp('p_form0000000124_m');
    mstform.getItem('tzqbl').userSetReadOnly(true);
    mstform.getItem('tzhfkbl').userSetReadOnly(true);
    mstform.getItem('u_istbinspur').userSetReadOnly(true);
    mstform.getItem('u_tbinspurtime').userSetReadOnly(true);
    mstform.getItem('tzbl').addListener('change', function () {
        if (mstform.getItem('tzbl').getValue() < 0) {
            mstform.getItem('tzbl').setValue(0)
        }
    })



    mstform.getItem('htmc').addListener('beforetriggerclick', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        console.log("pc:",pc);
        if (Ext.isEmpty(pc)) {
            Ext.Msg.alert('提示', '请先选择项目，在选择合同');
            return false;
        }
        
        mstform.getItem('htmc').setOutFilter({
            phid_pc: mstform.getItem('phid_pc').getValue()
        });
    });
    mstform.getItem('htmc').addListener('helpselected', function (obj) {
        
        var htmc = mstform.getItem('htmc').getValue();
        console.log("htmc:",htmc);
        execServer('p_form0000000124_fkbltz', {
            'phid': htmc
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('vendor_id').setValue(data[0].extendObjects.vendor_id);
                mstform.getItem('tzqbl').setValue(data[0].extendObjects.user_tzhdfkbl);
                BatchBindCombox([mstform.getItem('vendor_id')]);
            }
        });

    });

    mstform.getItem('tzbl').addListener('change', function (obj) {
        var tzbl = mstform.getItem('tzbl').getValue();
        var tzqbl = mstform.getItem('tzqbl').getValue();
        if (tzbl + tzqbl <= 1) {
            mstform.getItem('tzhfkbl').setValue(tzbl + tzqbl)
        } else {
            mstform.getItem('tzbl').setValue(0)
            mstform.getItem('tzhfkbl').setValue(0)
        }

    });

}