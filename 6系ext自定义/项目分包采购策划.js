function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700449_m');
    var dgrid = Ext.getCmp('p_form0000700449_d');
    var dstore = dgrid.store;
    mstform.getItem('phid_pc').addListener('change', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        execServer('p_form0000700449_gcdz', { 'pc': pc }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_gcdz').setValue(data1[0].extendObjects.gcdz);//工程地址
                mstform.getItem('u_htgq').setValue(data1[0].extendObjects.htgq);//合同工期
            }

        });
    });
    //计算预计收益率
    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) {
            //判断原值与新值是否相同，如果相同则返回 *return 返回
            return;
        }
        if (e.field == 'numericcol_2' || e.field == 'u_zghte') {
            var record = e.record;
            record.set('u_yjsyl', (Ext.Number.from(record.get('numericcol_2'), 0) - Ext.Number.from(record.get('u_zghte'), 0)) / Ext.Number.from(record.get('numericcol_2'), 0));
        };
    });
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        dgrid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
            if (e.originalValue == e.value) {
                return;
            } //判断原值与新值是否相同
            if (e.field == 'numericcol_2' || e.field == 'u_zghte') { //监听qty、prc字段变化
                var arr = dgrid.getStore().getRange(0, dstore.getCount() - 1);
                var a = 0;
                var b = 0;
                var c = 0;
                for (var i = 0; i < dstore.getCount(); i++) {
                    var record = dstore.data.items[i];
                    a += Ext.Number.from(record.get('numericcol_2').toFixed(2), 0);//预计总收入
                    b += Ext.Number.from(record.get('u_zghte').toFixed(2), 0);//暂估总合同额

                }
                mstform.getItem('u_yjzsr').setValue(a);
                mstform.getItem('u_zgzhte').setValue(b);
                mstform.getItem('u_yjzsyl').setValue((a - b) / a);
            };
        });
    }
}