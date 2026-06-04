function AllReady() {



    var mstform = Ext.getCmp('CntM3');

    mstform.getItem('PhidYsfl').userSetMustInput(false);
    mstform.getItem('Iscb').userSetMustInput(false);
    var IsBalOverCntSum = mstform.getItem('IsBalOverCntSum');

    IsBalOverCntSum.setValue('1');
    mstform.getItem('LogicControlPercent').userSetReadOnly(true);
    mstform.getItem('IsBalOverCntSum').userSetReadOnly(true);

    mstform.getItem('IsBalOverCntSum').addListener('change', function (res) {
        mstform.getItem('LogicControlPercent').userSetReadOnly(true);
        mstform.getItem('IsBalOverCntSum').userSetReadOnly(true);
    });
    //2025/7/26 所有模块的合同信息（采购合同、支出合同、承包合同、设备租入协议），都需要给【预算分类】字段值默认为“二次预算”，并隐藏该字段
    mstform.getItem('PhidYsfl').setValue('二次预算').hide();



}


function beforeSaveEdit() {                                    //单据编辑页面保存前检测
    debugger;
    var mstform = Ext.getCmp('CntM7');

    var PayOverPrecent = mstform.getItem('PayOverPrecent').getValue();


    if (PayOverPrecent > 1.2) {
        Ext.Msg.alert('提示', '结算值不能超合同额120%');
        return false;
    }

    else {
        return true
    };

}