function allReadyEdit() {
    console.log("111");
    var mstform = Ext.getCmp('p_form0000000132_m');
    var dgrid = Ext.getCmp('p_form0000000132_d');
    dgrid.hideColumn('empid1', true);
    dgrid.hideColumn('empid1_EXName', true);
    mstform.getItem('u_jcdw').addListener('itemchanged', function () {
        var a = 1;
        var b = 0;
        if (mstform.getItem('u_jcdw').getValue() == mstform.getItem('phid_org').getValue()) {
            mstform.getItem('u_jcdwsfdyjydw').setValue(a);
        } else {
            mstform.getItem('u_jcdwsfdyjydw').setValue(b);
        }
    });
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.on('dataready', function () {
            //var dstore = dgrid.store;
            // var a=dgrid.getStore().getRange(0, dstore.getCount() - 1);  
            // console.log(a[0].get('cyrxx'));
            //手机号验证
            function checkPhone(phone) {
                if (!(/^[1][3456789][0-9]{9}$/.test(phone))) {
                    Ext.Msg.alert('提示', '手机号码有误，请重填');
                    mstform.getItem('textcol_1').setValue(null);
                    return false;
                }
            }
            //mstform.getItem('fillpsn').addListener('helpselected', function () { 
            var bm = mstform.getItem('phid_fill_psn').getValue();
            console.log('bm=============>', bm)
            //mstform.getItem('deptid').setValue(548191210001505);

            //console.log(bm);
            /*execServer('dt', {
                'id': $appinfo.userID
            }, (res) => {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data[0]) {
                    mstform.getItem('deptid').setValue(data[0].extendObjects.phid);
                    BatchBindCombox([mstform.getItem('deptid')]);
                    console.log(mstform.getItem('deptid').getValue());
                } else {
                    Ext.Msg.alert('提示', '人事档案里没有该员工的部门信息');
                }
            });*/
            execServer('p_form0000000132_hr', {
                'id': bm
            }, (res) => {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    if (data[0].extendObjects.mobile1) {
                        mstform.getItem('textcol_1').setValue(data[0].extendObjects.mobile1);
                    }
                } else {
                    Ext.MessageBox.alert('提示', '人事档案里没有借用人的联系电话请输入');
                    return false;
                }

            });

            mstform.getItem('empid').addListener('helpselected', function () {
                var id = mstform.getItem('empid').getValue();
                console.log("id:", id);
                execServer('p_form0000000132_hr', {
                    'id': id
                }, (res) => {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (res.count > 0) {
                        if (data[0].extendObjects.mobile1) {
                            mstform.getItem('textcol_2').setValue(data[0].extendObjects.mobile1);
                        }
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
        });
    }
}

//表体必输
function beforeSaveEdit() {
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        var mstform = Ext.getCmp('p_form0000000132_m');
        var dgrid = Ext.getCmp('p_form0000000132_d');
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


