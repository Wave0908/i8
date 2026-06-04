function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700650_m');
    var dgrid = Ext.getCmp('p_form0000700650_d');
    var dstore = dgrid.store;
    // dgrid.hideColumn('prc', true);
    // dgrid.hideColumn('qty', true);
    mstform.getItem('empid').userSetReadOnly(false);
    mstform.getItem('u_xm').userSetReadOnly(false);
    mstform.getItem('empid').setVisible(false);
    mstform.getItem('u_xm').setVisible(false);
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
        mstform.getItem('u_sfwxtnyg').addListener('change', function () {
            if (mstform.getItem('u_sfwxtnyg').getValue() == '1') {
                mstform.getItem('empid').userSetMustInput(true);
                mstform.getItem('empid').userSetReadOnly(false);
                mstform.getItem('u_xm').userSetReadOnly(true);
                mstform.getItem('u_xm').userSetMustInput(false);
                mstform.getItem('u_xm').setValue(null);
                mstform.getItem('empid').setVisible(true);
                mstform.getItem('u_xm').setVisible(false);
            } else if (mstform.getItem('u_sfwxtnyg').getValue() == '0') {
                mstform.getItem('u_xm').userSetMustInput(true);
                mstform.getItem('u_xm').userSetReadOnly(false);
                mstform.getItem('empid').userSetReadOnly(true);
                mstform.getItem('empid').userSetMustInput(false);
                mstform.getItem('empid').setValue(null);
                mstform.getItem('u_xm').setVisible(true);
                mstform.getItem('empid').setVisible(false);
            }
        })

        mstform.getItem('empid').addListener('helpselected', function () {
            var phid = mstform.getItem('empid').getValue();
            execServer('p_form0000700650_ryxx', { 'phid': phid }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('u_xb').setValue(data[0].extendObjects.sex);
                    mstform.getItem('u_csny').setValue(data[0].extendObjects.birthday);
                    mstform.getItem('u_mz').setValue(data[0].extendObjects.c_name);
                    mstform.getItem('deptid').setValue(data[0].extendObjects.dept);
                    BatchBindCombox([mstform.getItem('deptid')]);
                    mstform.getItem('u_zw').setValue(data[0].extendObjects.user_xrzw);
                    mstform.getItem('u_lxfs').setValue(data[0].extendObjects.moblie1);
                    mstform.getItem('u_jg').setValue(data[0].extendObjects.user_jg);
                }
            })
        })

    }

}