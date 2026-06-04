function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700215_m');
    var dgrid = Ext.getCmp('p_form0000700215_dgrid');
    var d1grid = Ext.getCmp('p_form0000700215_d1grid');
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

    dgrid.getColumn('empid_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empidPhid = data[0].get('empid');
        callServer('xbgw', [{
            'phid': empidPhid
        }], function (res) {
            console.log(res);
            if (res.record[0]) {
                data[0].set('u_xb', res.record[0].sexno);
                data[0].set('u_gw', res.record[0].xrzw);
            }
        });
    })




}