function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700440_m');
    var dgrid = Ext.getCmp('p_form0000700440_dgrid');
    dgrid.getColumn('pc_name').getEditor().addListener('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        var pc = data[0].get('pc');
        callServer('xmzt', [{ 'pc': pc }], function (res) {
            if (res.record[0]) {
                data[0].set('u_hte', res.record[0].cnt_amt);
                data[0].set('u_xmzt', res.record[0].xmzt);
            }
        });
    });

    var dstore = dgrid.store;

    dgrid.addListener('edit', function (editor, e) {                                          //监听单据体字段编辑状态 *edit 为编辑事件（据体汇总更新表头字段）
        if (e.originalValue == e.value) { return; }                                            //判断原值与新值是否相同，如果相同则返回
        if (e.field == 'u_yjjsz') {                                     //监听AmtFc、user_hl字段变化
            var sumPc = 0;                                                                 //变量sumVatFc初始值为0
            var sumYjjsz = 0;                                                                  //变量sumHtje初始值为0
            for (i = 0; i < dstore.getCount(); i++) {                                        //for循坏 *dstore.getCount()表示单据体总行数
                sumPc += 1;                //变量sumVatFc累加
                sumYjjsz += Ext.Number.from(dstore.getAt(i).get('u_yjjsz'), 0);               //变量sumHtje累加
            }                                                                             //for循环事件结束 ｝
            mstform.getItem('u_xmsl').setValue(sumPc);                            //变量sumVatFc值赋值给表头 CntSumVatFc
            mstform.getItem('u_je').setValue(sumYjjsz);                               //变量sumHtje值赋值给表头 user_htje
        };                                                                                //监听AmtFc、user_hl字段变化事件结束
    });                                                                                   //监听单据体编辑状态事件结束
}