function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700251_m');
    var dgrid = Ext.getCmp('p_form0000700251_d');
    var dgrid1 = Ext.getCmp('p_form0000700251_d1');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');

    //姓名
    dgrid.getColumn('empid_name').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid.getSelectionModel().getSelection();
        var ygphid = data[0].get('empid');
        execServer('getryxx', {
            'phid': ygphid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                data[0].set('u_djrzw', res.data[0].user_xrzw); //所任职务phid
            }
        });
    });

    dgrid1.getColumn('empid1_name').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid1.getSelectionModel().getSelection();
        var ygphid = data[0].get('empid1');
        execServer('getryxx', {
            'phid': ygphid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                data[0].set('u_djzw', res.data[0].user_xrzw); //所任职务phid
            }
        });
    });



}

