function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700650_m');
    var dgrid = Ext.getCmp('p_form0000700650_dgrid');
    var dstore = dgrid.store;
    dgrid.hideColumn('prc', true);
    dgrid.hideColumn('qty', true);
    mstform.getItem('empid').userSetReadOnly(true);
    mstform.getItem('u_xm').userSetReadOnly(true);
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
        mstform.getItem('u_sfwxtnyg').addListener('change', function () {
            if (mstform.getItem('u_sfwxtnyg').getValue() == '1') {
                mstform.getItem('empid').userSetMustInput(true);
                mstform.getItem('empid').userSetReadOnly(false);
                mstform.getItem('u_xm').userSetReadOnly(true);
                mstform.getItem('u_xm').userSetMustInput(false);
            } else if (mstform.getItem('u_sfwxtnyg').getValue() == '0') {
                mstform.getItem('u_xm').userSetMustInput(true);
                mstform.getItem('u_xm').userSetReadOnly(false);
                mstform.getItem('empid').userSetReadOnly(true);
                mstform.getItem('empid').userSetMustInput(false);
            }
        })

        mstform.getItem('empid').addListener('helpselected', function () {
            var phid = mstform.getItem('empid').getValue();
            callServer('ryxx', [{ 'phid': phid }], function (res) {
                mstform.getItem('u_xb').setValue(res.record[0].sex);
                mstform.getItem('u_csny').setValue(res.record[0].birthday);
                mstform.getItem('u_mz').setValue(res.record[0].c_name);
                mstform.getItem('deptid').setValue(res.record[0].dept);
                BatchBindCombox([mstform.getItem('deptid')]);
                mstform.getItem('u_zw').setValue(res.record[0].user_xrzw);
                mstform.getItem('u_lxfs').setValue(res.record[0].moblie1);
                mstform.getItem('u_jg').setValue(res.record[0].user_jg);
            })
        })

    }

}