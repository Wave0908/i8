function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700361_m');
    var dgrid = Ext.getCmp('p_form0000700361_d');


    if (otype == $Otype.ADD) {

        var jbr = mstform.getItem('phid_fill_psn').getValue();
        execServer('p_form0000700361_Getygxm', { fphid: jbr }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.length>0) {
                //mstform.getItem('title').setValue($appinfo.username + '发起的办公用品购置申请');             
                mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                BatchBindCombox([mstform.getItem('deptid')]);
                //alert(xm1);  
            }
        })

    }
    mstform.getItem('u_gj').setValue(1); //国家
    BatchBindCombox([mstform.getItem('u_gj')]);
    mstform.getItem('u_sf').on('beforetriggerclick', function () { //省
        mstform.getItem('u_cs').setValue(); //市
        if (mstform.getItem('u_gj').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择国家');
            return false;
        }
        mstform.getItem('u_sf').setOutFilter({
            nationid: mstform.getItem('u_gj').getValue()
        })
    });

    mstform.getItem('u_cs').on('beforetriggerclick', function () {
        if (mstform.getItem('u_sf').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择省份');
            return false;
        }
        mstform.getItem('u_cs').setOutFilter({
            pid: mstform.getItem('u_sf').getValue()
        })
    });
    dgrid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        execServer('p_form0000700361_dw', {
            phid: userhelp_1
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count>0) {
                data[0].set('u_dw', data1[0].extendObjects.dw);
            }
        });
    });

    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) { return; }
        if (e.field == 'u_sl' || e.field == 'numericcol_1' || e.field == 'u_zj') {
            var record = e.record;
            record.set('u_zj', Ext.Number.from(record.get('u_sl'), 0) * Ext.Number.from(record.get('numericcol_1'), 0));
        };
    });

}