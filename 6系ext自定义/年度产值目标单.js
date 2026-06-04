function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700248_m');
    var dgrid = Ext.getCmp('p_form0000700248_d');
    mstform.getItem('userhelp_1').addListener('itemchanged', function (obj) {
        var nf = mstform.getItem("userhelp_1").getValue();
        console.log("nf:",nf);
        if (nf) {
            execServer('p_form0000700248_nfxz', {
                'nf': nf
            }, function (res) {
                if (res.count>0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if(data1.length>0){
                        Ext.Msg.alert('提示', '该年份已录入');
                        mstform.getItem("userhelp_1").setValue('');
                        return false;
                    }
                }
            });
        }
    })

}