function AllReady() {
    var mstform = Ext.getCmp('CntPayM11');
    var dgrid = Ext.getCmp('CntPayD11');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    mstform.getItem("user_cwxtsfjs").setValue('1');
    dgrid.addListener('edit', function (editor, e) {                                          /*监听单据体字段编辑状态 *edit 为编辑事件（据体更新单据体本行字段）
    grid - 当前grid
    record - 当前编辑行的数据
    field - 要编辑的字段名
    value - 编辑后的值
    originalValue - 原先的值.
    row - 行数*/

        if (e.originalValue == e.value) { return; }                                        //判断原值与新值是否相同，如果相同则返回 *return 返回    
        if (e.field == 'RepQty') {            //监听qty、prc、numericcol_2字段变化
            var record = e.record;
            console.log(record);                                                //当前行用对像record表示
            //record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));          //计算amt值，将 prc、qty的值转换成数值并运算  
        };                                                                              //监听qty、prc、numericcol_2字段变化事件结束 ｝
    });



    /*业务类型过滤*/
    mstform.getItem('user_ywlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        mstform.getItem('user_ywlx').setOutFilter({
            zd: '业务类型',
            djmc: '发票报账单'
        })
    });


}   