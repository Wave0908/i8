function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000068_m');
    var dgrid = Ext.getCmp('p_form0000000068_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');


    //mstform.getItem('u_lyhtzj').setVisible(false);
    //mstform.getItem('u_lyspzj').setVisible(false);
    mstform.getItem('amt').setVisible(false);
    mstform.getItem('prc').setVisible(false);
    // mstform.getItem('u_wlmc').setVisible(false);
    mstform.getItem('u_wzbm').setVisible(false);
    mstform.getItem('sepc').setVisible(false);
    mstform.getItem('u_jldw').setVisible(false);
    //mstform.getItem ('qty').setVisible(false);
    //mstform.getItem('xcdd').setVisible(false);
    mstform.getItem('u_hjje').setVisible(false);
    mstform.getItem('u_czsl').setVisible(false);
    //mstform.getItem('boqid').setVisible(false);
    //mstform.getItem('item_name').setVisible(false);
    //mstform.getItem('userhelp_char').setVisible(false);
    //mstform.getItem('czfs').setVisible(false);
    //mstform.getItem('u_wzczspddh').userSetReadOnly(true);
    //mstform.getItem('u_czfs').userSetReadOnly(true);
    //mstform.getItem('u_htddh').userSetReadOnly(true);
    dgrid.addListener('edit', function (editor, e) {
        //czfs
        var sum = 0;
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (i = 0; i < dstore.getCount(); i++) {
            sum += a[i].get('qty');
        }
        mstform.getItem('u_czsl').setValue(sum);
    })
    dgrid.addListener('edit', function (editor, e) {
        var sum2 = 0;
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (i = 0; i < dstore.getCount(); i++) {
            sum2 += a[i].get('amt');
        }
        mstform.getItem('u_hjje').setValue(sum2);
    })
    // dgrid.hideColumn('u_lyhtmxzj', true);
    // dgrid.hideColumn('u_lyjsmxzj', true);


    dgrid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        // if (e.originalValue == e.value) {
        //     return;
        // } //判断原值与新值是否相同
        if (e.field == 'qty' || e.field == 'prc') { //监听qty、prc字段变化
            var record = e.record;
            record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'),
                0)); //计算amt值  

        };
        if (e.field == 'amt') { //监听qty、prc字段变化
            var sumamt = 0;
            Ext.Array.each(dstore.data.items, function (rowdata) {
                sumamt += rowdata.get('amt');
            })
            mstform.getItem('czamt').setValue(sumamt)

        }

    });


    //表体发生变化方法
    dstore.on('datachanged', function (dstore) {
        var sumamt = 0;
        Ext.Array.each(dstore.data.items, function (rowdata) {
            sumamt += rowdata.get('amt');
        })
        mstform.getItem('czamt').setValue(sumamt)
    });


    mstform.getItem('u_wlmc').addListener('helpselected', function (e) {
        mstform.getItem('u_wzbm').setValue(e.data.itemno)
        mstform.getItem('u_jldw').setValue(e.data.msname)
        mstform.getItem('sepc').setValue(e.data.spec)

    })
    if (otype == $Otype.ADD) {
        mstform.getItem('prc').addListener('change', function (e) {
            var prc = mstform.getItem('prc').getValue();
            var qty = mstform.getItem('qty').getValue();
            if (qty == '' && qty == 0) {

                mstform.getItem('czamt').setValue(0);
            }
            else if (prc == '' && prc == 0) {
                mstform.getItem('czamt').setValue(0);
            } else {
                mstform.getItem('czamt').setValue(prc * qty);
            }

        });
        mstform.getItem('qty').addListener('change', function (e) {
            var prc = mstform.getItem('prc').getValue();
            var qty = mstform.getItem('qty').getValue();
            if (qty == '' && qty == 0) {

                mstform.getItem('czamt').setValue(0);
            }
            else if (prc == '' && prc == 0) {
                mstform.getItem('czamt').setValue(0);
            } else {
                mstform.getItem('czamt').setValue(prc * qty);
            }

        });
    }

}