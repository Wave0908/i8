function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700215_m');
    var dgrid = Ext.getCmp('p_form0000700215_d');
    var d1grid = Ext.getCmp('p_form0000700215_d1');
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;
    var d1store = d1grid.store;



    Toolbar.get('addrow').on('click', function () {
        var a = dstore.getCount() + d1store.getCount();
        mstform.getItem('u_ryzs').setValue(a);
    });
    Toolbar.get('insertrow').on('click', function () {
        var a = dstore.getCount() + d1store.getCount();
        mstform.getItem('u_ryzs').setValue(a);
    });

    Toolbar.get('deleterow').on('click', function () {
        var a = dstore.getCount() + d1store.getCount();
        mstform.getItem('u_ryzs').setValue(a);
    });

    dgrid.getColumn('empid_EXName').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('empid');
        execServer('p_form0000700215_xbgw', {
            'phid': empidPhid
        }, function (res) {
            console.log(res);
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_xb', data1[0].extendObjects.sexno);
                data[0].set('u_gw', data1[0].extendObjects.xrzw);
            }
        });
    })




}