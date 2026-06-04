function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700251_m');
    var dgrid = Ext.getCmp('p_form0000700251_d');
    var dgrid1 = Ext.getCmp('p_form0000700251_d1');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');

    //姓名
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        dgrid.getColumn('empid_EXName').getEditor().addListener('helpselected', function (obj) {
            var data = dgrid.getSelectionModel().getSelection();
            var ygphid = data[0].get('empid');
            execServer('getryxx', {
                'phid': ygphid
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    data[0].set('u_djrzw', data1[0].extendObjects.user_xrzw); //所任职务phid
                }
            });
        });

        dgrid1.getColumn('empid1_EXName').getEditor().addListener('helpselected', function (obj) {
            var data = dgrid1.getSelectionModel().getSelection();
            var ygphid = data[0].get('empid1');
            execServer('getryxx', {
                'phid': ygphid
            }, function (res) {
                if (res.count > 0) {
                    data[0].set('u_djzw', data1[0].extendObjects.user_xrzw); //所任职务phid
                }
            });
        });
    }



}

