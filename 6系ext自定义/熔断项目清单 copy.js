function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700462_m');
    var dgrid = Ext.getCmp('p_form0000700462_dgrid');
    dgrid.getColumn('pc_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var pc = data[0].get('pc');
        callServer('xmjl', [{
            phid: pc
        }], function (res) {
            if (res.record[0]) {
                data[0].set('u_xmjl', res.record[0].xmjl);//项目经理
            }
        });
    });
}