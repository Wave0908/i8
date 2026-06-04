//----------资金评审表------------
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000600071_m');
    var dgrid = Ext.getCmp('p_form0000600071_d');
    var d1grid = Ext.getCmp('p_form0000600071_d1');
    var dstore = dgrid.store;
    var dstore1 = d1grid.store;

    if (otype == $Otype.ADD) {
        mstform.on('dataready', function (e) {
            var jbr = mstform.getItem('phid_fill_psn').getValue();
            execServer('p_form0000600071_Getygxm', { fphid: jbr }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    mstform.getItem('bill_EXName').setValue($appinfo.username + '发起的资金审批流程');
                    mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                    BatchBindCombox([mstform.getItem('deptid')]);
                    //alert(xm1);  
                }
            })
        })
    }




    dgrid.addListener('edit', function (editor, e) {
        //判断原值与新值是否相同
        if (e.originalValue == e.value) {
            return;
        }
        var record = e.record;
        //record.set('amt',Ext.Number.from(mstform.getItem('xmnhye').getValue(), 0))
        if (e.field == 'hke') {

            record.set('kzpe', Ext.Number.from(record.get('hke'), 0) * 0.6);
            record.set('kzpje', (Ext.Number.from(record.get('hke'), 0) * 0.6) - (Ext.Number.from(record.get('jdgz'), 0)));
        }
        if (e.field == 'jdgz') {
            record.set('kzpje', (Ext.Number.from(record.get('hke'), 0) * 0.6) - (Ext.Number.from(record.get('jdgz'), 0)));
        }
    })


    d1grid.getColumn('htbm_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var deptid = mstform.getItem('deptid').getValue();
        //console.log(deptid);
        if (Ext.isEmpty(deptid)) {
            Ext.Msg.alert('提示', '请先选择项目部!');
            return false;
        }
        d1grid.getColumn('htbm_EXName').getEditor().setOutFilter({
            'user_pc_dept': deptid
        });

    })

    d1grid.getColumn('htbm_EXName').getEditor().addListener('helpselected', function (obj) {
        console.log(obj);
    });


    d1grid.addListener('edit', function (editor, e) {
        //判断原值与新值是否相同
        if (e.originalValue == e.value) {
            return;
        }
        var record = e.record;
        if (e.field == 'htbm' && !(Ext.isEmpty(Ext.getCmp('deptid').getValue()))) {

            console.log(e);

            execServer('p_form0000600071_fillhtnr', { 'rhtbm': "\'" + record.get('htbm_EXName') + "\'" }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log(res);
                if (res.count > 0) {
                    record.set('htmc', data[0].extendObjects['title']);         //合同名称
                    record.set('ksbm', data[0].extendObjects['phid_sencomp']);    //客商编码
                    record.set('ksmc', data[0].extendObjects['compname']);    //客商名称                    
                    record.set('htlxbm', data[0].extendObjects['cnt_type']);          //合同类型编码
                    record.set('htlxmc', data[0].extendObjects['name']);          //合同类型编码
                    record.set('hte', Ext.Number.from(data[0].extendObjects['cnt_sum_vat_fc'], 0));    //合同金额
                    //record.set('qty', data[0].extendObjects['zfbl']);           //合同约定付款比例
                    //alert(xm1);  
                }
            })


        }
        //console.log(record);

        if ((e.field == 'ljjs' || e.field == 'ljyf' || e.field == 'sqfkje') && (Ext.Number.from(record.get('ljjs'), 0) > 0)) {
            //console.log(e.field);
            record.set('qty_1', ((Ext.Number.from(record.get('ljyf'), 0) + (Ext.Number.from(record.get('sqfkje'), 0)))) / Ext.Number.from(record.get('ljjs'), 0));
            record.set('yfye', Ext.Number.from(record.get('ljjs'), 0) * Ext.Number.from(record.get('qty'), 0) - Ext.Number.from(record.get('ljyf'), 0))
        }

        if ((e.field == 'sqfkje') && (Ext.Number.from(mstform.getItem('xmnhje').getValue(), 0) > 0)) {
            Sumnhye();
        }

    })

    mstform.getItem('xmnhje').addListener('change', function () {
        Sumnhye();
    })

    function Sumnhye() {
        var sumVatFc = 0;
        for (i = 0; i < dstore1.getCount(); i++) {
            sumVatFc += Ext.Number.from(dstore1.getAt(i).get('sqfkje'), 0);
        }
        mstform.getItem('xmnhye').setValue(Ext.Number.from(mstform.getItem('xmnhje').getValue(), 0) - sumVatFc);
    }


}