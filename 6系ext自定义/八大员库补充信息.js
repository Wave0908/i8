function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700593_m');
    var dgrid = Ext.getCmp('p_form0000700593_d');
    mstform.getItem('u_ywbaxm').addListener('change', function () {
        if (mstform.getItem('u_ywbaxm').getValue() == 1) {
            dgrid.setMustInputCol('u_pc_EXName', true);
        } else {
            dgrid.setMustInputCol('u_pc_EXName', false);
        }
    });
    dgrid.getColumn('u_pc_EXName').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid.getSelectionModel().getSelection();//获取当前选中行
        var phid_pc = data[0].get('u_pc');
        console.log(phid_pc);
        execServer('p_form0000700593_xmxx', {
            'pc': phid_pc
        }, function (res) {
            console.log(res);
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_xmsfjg', data1[0].extendObjects.xmsfjg);
                data[0].set('u_xmxxzskyptsfkc', data1[0].extendObjects.xmxxzskyptsfkc);
                data[0].set('u_htzmjgrq', data1[0].extendObjects.datetimecol_4);
                data[0].set('u_sjjgrq', data1[0].extendObjects.datetimecol_5);
            } else {
                console.log("空");
            }

        });
    })
}