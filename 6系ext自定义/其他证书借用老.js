function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000132_m');
    var dgrid = Ext.getCmp('p_form0000000132_dgrid');
    dgrid.hideColumn('empid1', true);
    dgrid.hideColumn('empid1_name', true);
    mstform.getItem('u_jcdw').addListener('itemchanged', function () {
        var a = 1;
        var b = 0;
        if (mstform.getItem('u_jcdw').getValue() == mstform.getItem('ocode').getValue()) {
            mstform.getItem('u_jcdwsfdyjydw').setValue(a);
        } else {
            mstform.getItem('u_jcdwsfdyjydw').setValue(b);
        }
    });
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        //var dstore = dgrid.store;
        // var a=dgrid.getStore().getRange(0, dstore.getCount() - 1);  
        // console.log(a[0].get('cyrxx'));
        //手机号验证
        function checkPhone(phone) {
            if (!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone))) {
                Ext.Msg.alert('提示', '手机号码有误，请重填');
                return false;
            }
        }
        //mstform.getItem('fillpsn').addListener('helpselected', function () { 
        var bm = "'" + mstform.getItem('fillpsn').getValue() + "'";
        //mstform.getItem('deptid').setValue(548191210001505);

        //console.log(bm);
        /*callServer('dt', [{
            'id': $appinfo.userID
        }], function(res) {
            if (res.record[0]) {
                mstform.getItem('deptid').setValue(res.record[0].phid);
                BatchBindCombox([mstform.getItem('deptid')]);
                console.log(mstform.getItem('deptid').getValue());
            } else {
                Ext.Msg.alert('提示', '人事档案里没有该员工的部门信息');
            }
        });*/
        callServer('hr', [{
            'id': bm
        }], function (res) {
            if (res.record[0]) {
                mstform.getItem('textcol_1').setValue(res.record[0].mobile1);
            } else {
                Ext.MessageBox.alert('提示', '人事档案里没有借用人的联系电话请输入');
                return false;
            }
        });

        //});
        mstform.getItem('empid').addListener('helpselected', function () {
            var id = mstform.getItem('empid').getValue();
            callServer('hr', [{
                'id': id
            }], function (res) {
                if (res.record[0]) {
                    mstform.getItem('textcol_2').setValue(res.record[0].mobile1);
                } else {
                    Ext.Msg.alert('提示', '人事档案里没有使用人的联系电话请输入');
                    return false;
                }
            });
        });
        mstform.getItem('textcol_2').addListener('itemchanged', function () {
            var phone = mstform.getItem('textcol_2').getValue();
            checkPhone(phone);
        });
        mstform.getItem('textcol_1').addListener('itemchanged', function () {
            var phone = mstform.getItem('textcol_1').getValue();
            checkPhone(phone);
        });
    }

}

//表体必输
function beforeSaveEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000000132_m');
        var dgrid = Ext.getCmp('p_form0000000132_dgrid');
        var dstore = dgrid.store;
        //mstform.getItem ('DetectDt').userSetMustInput(true); 
        var flag = dstore.getCount();
        if (flag < 1) {
            Ext.Msg.alert('提示', '请输入明细表数据');
            return false;
        } else {
            return true;
        }
    }
}


