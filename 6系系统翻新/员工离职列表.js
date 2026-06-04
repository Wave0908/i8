function AllReady() {
    console.log("ready!");
    var mstform = Ext.getCmp('DimDetailInfo');
    /*根据离职员工字段自动带出员工类型字段start*/
    if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {
        mstform.getItem('PhIdEmp').addListener('helpselected', function () {
            var phid = mstform.getItem('PhIdEmp').getValue();
            execServer('yglx', {
                'phid': phid
            }, function (res) {
                if (res.count > 0) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('user_yglx').setValue(data1[0].extendObjects.c_name);
                }
            });
            execServer('gbcj', {
                'phid': phid
            }, function (res) {
                if (res.count > 0) {
                    const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('user_gbcj').setValue(data2[0].extendObjects.phid);
                    BatchBindCombox([mstform.getItem('user_gbcj')]);
                }
            });
            execServer('sfcyyjzs', {
                'phid': phid
            }, function (res) {
                const data3 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log(data3)
                if (data3.length > 0) {
                    mstform.getItem('user_sfcyyj').setValue('1');
                } else {
                    mstform.getItem('user_sfcyyj').setValue('2');
                }
            });

        });
        /*根据离职员工字段自动带出员工类型字段end*/

        //离职原因为其它原因时，是否人员优化显示且必填
        mstform.getItem('DimReason').addListener('change', function () {
            if (mstform.getItem('DimReason').getValue() == '224220507000018') {
                mstform.getItem('user_sfryyh').show();
                mstform.getItem('user_sfryyh').userSetMustInput(true);
            } else {
                mstform.getItem('user_sfryyh').hide();
                mstform.getItem('user_sfryyh').userSetMustInput(false);
            }
        });
    }

    if (otype == $Otype.EDIT || otype == $Otype.VIEW) {
        mstform.on('dataready', function () {
            BatchBindCombox([mstform.getItem('user_gbcj')]);
        });
    }
}