$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRows, useBeforeOpen, useClick, useBeforeClick }
) {
    var mstform = $NG.getCmpApi('PcmPay11');
    var dgrid = $NG.getCmpApi('PcmPayD11');
    if ($NG.getQueryValue('oType') == 'add') {
        mstform.getItem("user_cwxtsfjs").setValue('1');
    }
    // useUpdateRows(({ args, table }) => {
    //     /*监听单据体字段编辑状态 *edit 为编辑事件（据体更新单据体本行字段）
    //     grid - 当前grid
    //     record - 当前编辑行的数据
    //     field - 要编辑的字段名
    //     value - 编辑后的值
    //     originalValue - 原先的值.
    //     row - 行数*/
    //     // console.log("args:", args);
    //     // if (e.originalValue == e.value) { return; }                                        //判断原值与新值是否相同，如果相同则返回 *return 返回    
    //     // if (e.field == 'RepQty') {            //监听qty、prc、numericcol_2字段变化
    //     //     var record = e.record;
    //     //     console.log(record);                                                //当前行用对像record表示
    //     //     //record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));          //计算amt值，将 prc、qty的值转换成数值并运算  
    //     // };                                                                              //监听qty、prc、numericcol_2字段变化事件结束 ｝
    // }, 'PcmPayD11');

    useBeforeOpen((data) => {
        $NG.updateUI(function (updater, state) {
            updater.fieldSetForm.PcmPay11.user_ywlx.setProps({
                clientSqlFilter: ("zd = '业务类型' and djmc = '发票报账单'"),
                placeholder: ``
            });
        });
    }, 'gs_fpbzd_ywlx');


})