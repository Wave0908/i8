function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700181_m');


    var dgrid1 = Ext.getCmp('p_form0000700181_d');
    var d1store = dgrid1.store;

    mstform.getItem('phid_app').setVisible(false);


    dgrid1.getColumn('userhelp_1_EXName').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid1.getSelectionModel().getSelection();
        var phid = data[0].get('userhelp_1');
        execServer('yjk', {
            'phid': phid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                data[0].set('textcol_2', res.data[0].sbdw);

            }
        });
    });




    if (otype == $Otype.ADD) {
        mstform.getItem('phid_fill_psn').addListener('change', function (obj) {
            var jbr = mstform.getItem('phid_fill_psn').getValue();
            execServer('p_form0000700181_Getygxm', { fphid: jbr }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {

                    mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                    BatchBindCombox([mstform.getItem('deptid')]);

                }
            })
        })
    }



    mstform.getItem('empid1').addListener('helpselected', function (obj) {
        var fgldphid = mstform.getItem("empid1").getValue();
        if (fgldphid) {
            execServer('zyjk_getygxx', {
                'phid': fgldphid
            }, function (res) {
                if (res.count>0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem("textcol_1").setValue(data1[0].extendObjects.phone); //电话
                }
            });
        }
    })



}
