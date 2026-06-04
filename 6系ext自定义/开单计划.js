function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700447_m');
    var dgrid = Ext.getCmp('p_form0000700447_d');
    dgrid.getColumn('phid_pc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var pc = data[0].get('phid_pc');
        execServer('p_form0000700447_htmc', {
            phid: pc
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_hte', data1[0].extendObjects.hte / 10000);//合同额
                data[0].set('u_htbh', data1[0].extendObjects.htbm);//合同编码
            }
        });
    });
    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'u_yjdjh' || e.field == 'u_ejdjh' || e.field == 'u_sjdjh' || e.field == 'u_sijdjh' || e.field == 'numericcol_1' || e.field == 'numericcol_4'
            || e.field == 'numericcol_3' || e.field == 'numericcol_2' || e.field == 'numericcol_8' || e.field == 'numericcol_7' || e.field == 'numericcol_6' || e.field == 'numericcol_5') {
            var record = e.record;
            var u_yjdjh = Ext.Number.from(record.get('u_yjdjh'), 0); //一月计划
            var u_ejdjh = Ext.Number.from(record.get('u_ejdjh'), 0); //二月计划
            var u_sjdjh = Ext.Number.from(record.get('u_sjdjh'), 0); //三月计划
            var u_sijdjh = Ext.Number.from(record.get('u_sijdjh'), 0); //四月计划
            var numericcol_1 = Ext.Number.from(record.get('numericcol_1'), 0); //五月计划
            var numericcol_4 = Ext.Number.from(record.get('numericcol_4'), 0); //六月计划
            var numericcol_3 = Ext.Number.from(record.get('numericcol_3'), 0); //七月计划
            var numericcol_2 = Ext.Number.from(record.get('numericcol_2'), 0); //八月计划
            var numericcol_8 = Ext.Number.from(record.get('numericcol_8'), 0); //九月计划
            var numericcol_7 = Ext.Number.from(record.get('numericcol_7'), 0); //十月计划
            var numericcol_6 = Ext.Number.from(record.get('numericcol_6'), 0); //十一月计划
            var numericcol_5 = Ext.Number.from(record.get('numericcol_5'), 0); //十二月计划
            record.set('u_njh', u_yjdjh + u_ejdjh + u_sjdjh + u_sijdjh + numericcol_1 + numericcol_4 + numericcol_3 + numericcol_2 + numericcol_8 + numericcol_7 + numericcol_6 + numericcol_5); //年计划
        };
    });
    var dstore = dgrid.store;
    dgrid.addListener('edit', function (editor, e) {                                          //监听单据体字段编辑状态 *edit 为编辑事件（据体汇总更新表头字段）
        if (e.originalValue == e.value) { return; }                                            //判断原值与新值是否相同，如果相同则返回
        if (e.field == 'pc') {                                     //监听AmtFc、user_hl字段变化
            var sumPc = 0;                                                                 //变量sumVatFc初始值为0
            // var sumYjjsz = 0;                                                                  //变量sumHtje初始值为0
            for (i = 0; i < dstore.getCount(); i++) {                                        //for循坏 *dstore.getCount()表示单据体总行数
                sumPc += 1;                //变量sumVatFc累加
                //sumYjjsz +=Ext.Number.from(dstore.getAt(i).get('u_yjjsz'),0);               //变量sumHtje累加
            }                                                                             //for循环事件结束 ｝
            mstform.getItem('u_xmsl').setValue(sumPc);                            //变量sumVatFc值赋值给表头 CntSumVatFc
            //mstform.getItem('u_je').setValue(sumYjjsz);                               //变量sumHtje值赋值给表头 user_htje
        };                                                                                //监听AmtFc、user_hl字段变化事件结束
    });
}