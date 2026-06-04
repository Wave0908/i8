function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000003_m'); //表头容器
    //--字段获取--//
    var xmmc = mstform.getItem('xmmc'); //合同名称
    var ocode = mstform.getItem('phid_org'); //单位名称
    //--设置默认必输--//
    // xmmc.userSetMustInput(true);
    // xmmc.userSetReadOnly(true);
    mstform.getItem('bzf').setValue('0');

    //从项目名称带出相关信息

}
function getSaveDataEdit(type) {
    if (type == 'Save') {
        var mstform = Ext.getCmp('p_form0000000003_m');
        var pc_no_val = mstform.getItem('bill_no').getValue();
        return {
            funcname: "update_state",
            paramstr: [{
                bill_no: pc_no_val
            }]
        };
    };
}
