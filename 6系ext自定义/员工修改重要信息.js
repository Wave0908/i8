function allReadyEdit() {
    //初始化
    var mstform = Ext.getCmp('p_form0000700212_m');

    mstform.getItem('bill_name').setVisible(false);
    //mstform.getItem('fillpsn').setVisible(false);
    //mstform.getItem('checkpsn').setVisible(false);
    mstform.getItem('phid_org').userSetReadOnly(true);
    mstform.getItem('u_gbcj').userSetReadOnly(true);
    mstform.getItem('u_xzjb').userSetReadOnly(true);
    mstform.getItem('u_yglx').userSetReadOnly(true);
    mstform.getItem('u_ggyy').setVisible(false);
    mstform.getItem('u_ggzd').userSetMustInput(true);


    //员工姓名选择后触发
    mstform.getItem('u_xm').addListener('helpselected', function (res) {
        console.log(res);
        mstform.getItem('u_gbcj').setValue(res.data.user_gbcj)
        mstform.getItem('u_xzjb').setValue(res.data.AdmClass)
        mstform.getItem('u_yglx').setValue(res.data.EmpType)
        BatchBindCombox([mstform.getItem('u_gbcj'), mstform.getItem('u_xzjb'), mstform.getItem('u_yglx')]) //可同时转换多个帮助字段用，隔开
    });

    //员工姓名选择前触发
    mstform.getItem('u_xm').on('beforetriggerclick', function () {
        var ocode = mstform.getItem('phid_org').getValue();
        mstform.getItem('u_xm').setClientSqlFilter("fphid in (" + ocode + ")");
    });

    //员工更正选择前触发
    mstform.getItem('u_ggzd').on('change', function () {
        var u_ggzd = mstform.getItem('u_ggzd').getValue();
        if (u_ggzd == '1') {
            mstform.getItem('u_yglx').userSetReadOnly(false);
            mstform.getItem('u_gbcj').userSetReadOnly(true);
            mstform.getItem('u_xzjb').userSetReadOnly(true);
            mstform.getItem('u_ggyy').setVisible(true);
            mstform.getItem('u_ggyy').userSetMustInput(true);
        }
        if (u_ggzd == '2') {
            mstform.getItem('u_yglx').userSetReadOnly(true);
            mstform.getItem('u_gbcj').userSetReadOnly(false);
            mstform.getItem('u_xzjb').userSetReadOnly(true);
            mstform.getItem('u_ggyy').setVisible(false);
            mstform.getItem('u_ggyy').userSetMustInput(false);
        }
        if (u_ggzd == '3') {
            mstform.getItem('u_yglx').userSetReadOnly(true);
            mstform.getItem('u_gbcj').userSetReadOnly(true);
            mstform.getItem('u_xzjb').userSetReadOnly(false);
            mstform.getItem('u_ggyy').setVisible(false);
            mstform.getItem('u_ggyy').userSetMustInput(false);
        }
    });






}