function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700663_m');
    var dgrid = Ext.getCmp('p_form0000700663_dgrid');
    var dstore = dgrid.store;
    mstform.getItem('u_psbyjgdfs').setVisible(false);
    mstform.getItem('u_psbsmjgdfs').setVisible(false);


    var arr1 = new Array();
    arr1.push({
        u_yz: '',
    });

    dstore.insert(dstore.getCount(), arr1);



    mstform.getItem('u_dfdw').addListener('change', function (obj) {
        var phid = mstform.getItem('u_dfdw').getValue();
        callServer('khxx', [{
            'phid': phid
        }], function (res) {
            mstform.getItem('u_khxz').setValue(res.record[0].u_khxz);
            BatchBindCombox([mstform.getItem('u_khxz')]);
            mstform.getItem('u_khlxyj').setValue(res.record[0].u_khlxyj);
            mstform.getItem('u_khlxej').setValue(res.record[0].u_khlxej);
            BatchBindCombox([mstform.getItem('u_khlxej')]);
            mstform.getItem('u_sfss').setValue(res.record[0].u_sfss);
            mstform.getItem('u_yyfw').setValue(res.record[0].u_yyfw);
            mstform.getItem('u_gj').setValue(res.record[0].u_gj);
            BatchBindCombox([mstform.getItem('u_gj')]);
            mstform.getItem('u_sf').setValue(res.record[0].u_sf);
            BatchBindCombox([mstform.getItem('u_sf')]);
            mstform.getItem('u_cs').setValue(res.record[0].u_cs);
            BatchBindCombox([mstform.getItem('u_cs')]);
            mstform.getItem('u_qx').setValue(res.record[0].u_qx);
            BatchBindCombox([mstform.getItem('u_qx')]);
            mstform.getItem('u_xxdz').setValue(res.record[0].u_xxdz);
            mstform.getItem('u_sfdkh').setValue(res.record[0].u_sfdkh);
            mstform.getItem('u_sfbc').setValue(res.record[0].u_sfbc);
            mstform.getItem('u_sfbh').setValue(res.record[0].u_sfbh);
            mstform.getItem('u_ssjghlsbm').setValue(res.record[0].u_sjjg1);
            BatchBindCombox([mstform.getItem('u_ssjghlsbm')]);

        });
    })
    dgrid.hideColumn('amt', true);
    dgrid.hideColumn('prc', true);

}


