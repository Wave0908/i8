function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700248_m');
    var dgrid = Ext.getCmp('p_form0000700248_dgrid');
    mstform.getItem('userhelp_1').addListener('itemchanged', function (obj) {

        var nf = mstform.getItem("userhelp_1").getValue();
        callServer('nfxz', [{
            'nf': nf
        }], function (res) {
            if (!Ext.isEmpty(res) && res.record[0]) {
                Ext.Msg.alert('提示', '该年份已录入');
                mstform.getItem("userhelp_1").setValue('');
                return false;
            }
        });
    })

}