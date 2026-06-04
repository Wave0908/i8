function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700712_m');
    var dgrid = Ext.getCmp('p_form0000700712_d');
    var dstore = dgrid.store;

    dgrid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        execServer('ryxx', {
            phid: userhelp_1
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data1:", data1);
                data[0].set('u_gz', data1[0].extendObjects.JobClass);
                data[0].set('u_gz_EXName', data1[0].extendObjects.gz);//工种

                data[0].set('u_ssgs', data1[0].extendObjects.cboo);
                data[0].set('u_ssgs_EXName', data1[0].extendObjects.zz); //所属公司

                data[0].set('u_lxfs', data1[0].extendObjects.u_sjh); //联系方式

                data[0].set('userhelp_2', data1[0].extendObjects.skilldata);
                data[0].set('userhelp_2_EXName', data1[0].extendObjects.jndj);//技能水平
            }
        });
    });

}