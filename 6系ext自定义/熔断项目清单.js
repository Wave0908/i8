function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700462_m');
    var dgrid = Ext.getCmp('p_form0000700462_d');
    dgrid.getColumn('phid_pc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var pc = data[0].get('phid_pc');
        execServer('p_form0000700462_xmjl', {
            phid: pc
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_xmjl', data1[0].extendObjects.xmjl);//项目经理
            }
        });
    });
}