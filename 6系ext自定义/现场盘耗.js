function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000091_m');
    mstform.getItem('iscost').setValue('0');

    var dgrid = Ext.getCmp('p_form0000000091_d');
    var dstore = dgrid.store;
    dgrid.setReadOnlyCol('spec', true);
    dgrid.setReadOnlyCol('c_name', true);
    dgrid.setReadOnlyCol('msunit', true);
    var is_flg = 0;

    //选择项目仓库清空
    mstform.getItem('phid_pc').addListener('helpselected', function () {
        mstform.getItem('xmck').setValue()
    })
    //根据项目选择仓库
    mstform.getItem('xmck').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        if (mstform.getItem('phid_pc').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择组织');
            return false;
        }
        mstform.getItem('xmck').setOutFilter({ pc: mstform.getItem('phid_pc').getValue() });
    });


    mstform.getItem('yf').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        console.log("mstform.getItem('nd').getValue():",mstform.getItem('nd').getValue());

        if (mstform.getItem('nd').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择年度');
            return false;
        }

        if (mstform.getItem('xmck').getValue() == null) {
            Ext.Msg.alert('提示', '请先选择项目仓库');
            return false;
        }
    });


    //选择月份
    mstform.getItem('cbsid').addListener('helpselected', function () {
        Ext.Array.each(dstore.data.items, function (record) {
            record.set('cbsid', mstform.getItem('cbsid').getValue());
            record.set('cbsid_name', mstform.getItem('cbsid').getRawValue());
        });
    });
    mstform.getItem('yf').addListener('helpselected', function () {
        execServer('p_form0000000091_czts', 
            { 'pc': mstform.getItem('phid_pc').getValue(), 
                'ck': mstform.getItem('xmck').getValue(), 
                'nd': mstform.getItem('nd').getValue(), 
                'yf': mstform.getItem('yf').getValue() }, 
                function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.length > 0) {
                is_flg = data[0].extendObjects.sl;
            }
        });
        if (is_flg > 0) {
            dstore.removeAll();
            Ext.Msg.alert('提示', '该仓库本月份已经做过报耗单');
            mstform.getItem('yf').setValue('');
            return;

        }
        execServer('mxsj', { 'pc': mstform.getItem('phid_pc').getValue(), 'ck': mstform.getItem('xmck').getValue() },
            function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.length > 0) {
                    console.log("data:",data);
                    var arr = new Array();
                    for (i = 0; i < data.length; i++) {
                        if (res.data[i].cksl > 0) {
                            arr.push({
                                phid_itemdata: data[i].extendObjects.phid_itemid,
                                itemid: data[i].extendObjects.phid_itemid,
                                c_name: data[i].extendObjects.name,
                                spec: data[i].extendObjects.spec,
                                msunit_name: data[i].extendObjects.msname,
                                wbscode: data[i].extendObjects.phid_wbs,
                                wbscode_name: data[i].extendObjects.description,
                                cbsid: data[i].extendObjects.phid_cbs,
                                cbsid_name: data[i].extendObjects.cbs_name,
                                ph: data[i].extendObjects.batchno,
                                numericcol_3: data[i].extendObjects.sqsl,
                                cksl: data[i].extendObjects.cksl,
                                prc: data[i].extendObjects.prc,
                                qmsys: Ext.Number.from(data[i].extendObjects.cksl, 0) + Ext.Number.from(data[i].extendObjects.sqsl, 0),
                                qty: Ext.Number.from(data[i].extendObjects.cksl, 0) + Ext.Number.from(data[i].extendObjects.sqsl, 0),
                                amt: (Ext.Number.from(data[i].extendObjects.sqsl, 0) + Ext.Number.from(data[i].extendObjects.cksl, 0)) * Ext.Number.from(res.data[i].prc, 0),
                                sygjje: (Ext.Number.from(data[i].extendObjects.sqsl, 0) + Ext.Number.from(data[i].extendObjects.cksl, 0)) * Ext.Number.from(res.data[i].prc, 0)
                            });
                        }
                    }
                }
                dstore.removeAll();
                dstore.insert(dstore.getCount(), arr);
            });
    });
    dgrid.addListener('edit', function (editor, e) {  //监听单据体编辑状态

        if (e.originalValue == e.value) { //判断原值与新值是否相同
            return;
        }
        if (e.field == 'numericcol_2') { //监听qty、prc、numericcol_2字段变化
            var record = e.record;
            record.set('qty', Ext.Number.from(record.get('qmsys'), 0) - Ext.Number.from(record.get('numericcol_2'), 0));  //计算numericcol_1值         
            record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));  //计算amt值
            record.set('sygjje', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));
            if (record.get('numericcol_2') > record.get('qmsys')) {
                Ext.Msg.alert('提示', '盘点数量不能大于应存数量');
                record.set('numericcol_2', 0);
                record.set('qty', Ext.Number.from(record.get('qmsys'), 0) - Ext.Number.from(record.get('numericcol_2'), 0));  //计算numericcol_1值
                record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));  //计算amt值
                record.set('sygjje', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));
                return;
            }

        }
    });
    dgrid.getColumn('numericcol_2').getEditor().minValue = 0;


}






