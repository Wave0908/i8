function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700663_m');
    var dgrid = Ext.getCmp('p_form0000700663_d');
    var dstore = dgrid.store;
    //mstform.getItem('u_psbyjgdfs').setVisible(false);
    //mstform.getItem('u_psbsmjgdfs').setVisible(false);
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {

        var arr1 = new Array();
        arr1.push({
            u_yz: '',
        });

        dstore.insert(dstore.getCount(), arr1);



        mstform.getItem('u_dfdw').addListener('change', function (obj) {
            console.log("mstform.getItem('u_dfdw'):", mstform.getItem('u_dfdw'));
            var phid = mstform.getItem('u_dfdw').getValue();
            console.log("phid:", phid);
            if (phid) {
                execServer('p_form0000700663_khxx', {
                    phid: phid
                }, function (res) {
                    console.log("res:", res);
                    if (res.count > 0) {
                        const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        mstform.getItem('u_khxz').setValue(data1[0].extendObjects.u_khxz);
                        BatchBindCombox([mstform.getItem('u_khxz')]);
                        mstform.getItem('u_khlxyj').setValue(data1[0].extendObjects.u_khlxyj);
                        mstform.getItem('u_khlxej').setValue(data1[0].extendObjects.u_khlxej);
                        BatchBindCombox([mstform.getItem('u_khlxej')]);
                        mstform.getItem('u_sfss').setValue(data1[0].extendObjects.u_sfss);
                        mstform.getItem('u_yyfw').setValue(data1[0].extendObjects.u_yyfw);
                        mstform.getItem('u_gj').setValue(data1[0].extendObjects.u_gj);
                        BatchBindCombox([mstform.getItem('u_gj')]);
                        mstform.getItem('u_sf').setValue(data1[0].extendObjects.u_sf);
                        BatchBindCombox([mstform.getItem('u_sf')]);
                        mstform.getItem('u_cs').setValue(data1[0].extendObjects.u_cs);
                        BatchBindCombox([mstform.getItem('u_cs')]);
                        mstform.getItem('u_qx').setValue(data1[0].extendObjects.u_qx);
                        BatchBindCombox([mstform.getItem('u_qx')]);
                        mstform.getItem('u_xxdz').setValue(data1[0].extendObjects.u_xxdz);
                        mstform.getItem('u_sfdkh').setValue(data1[0].extendObjects.u_sfdkh);
                        mstform.getItem('u_sfbc').setValue(data1[0].extendObjects.u_sfbc);
                        mstform.getItem('u_sfbh').setValue(data1[0].extendObjects.u_sfbh);
                        mstform.getItem('u_ssjghlsbm').setValue(data1[0].extendObjects.u_sjjg1);
                        BatchBindCombox([mstform.getItem('u_ssjghlsbm')]);
                    }

                });
            }
        })
    }
    dgrid.hideColumn('amt', true);
    dgrid.hideColumn('prc', true);

}


