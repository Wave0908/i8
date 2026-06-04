function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700029_m');
    var dgrid = Ext.getCmp('p_form0000700029_d');
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;
    console.log(mstform);
    console.log(dgrid);

    // if (otype == $Otype.ADD) {
    //     /*根据业务日期带出年份和月份start*/
    //     var bill_dt = mstform.getItem('bill_dt').getValue();
    //     console.log('bill_dt:' + bill_dt);
    //     var year = bill_dt.getFullYear();
    //     var month = bill_dt.getMonth() + 1;
    //     mstform.getItem('ddlbcol_1').setValue(year);
    //     mstform.getItem('userhelp_4').setValue(month);
    //     console.log(year);
    //     console.log(month);
    //     /*根据业务日期带出年份和月份end*/
    // }
    /*业务日期选择后带出年份月份start*/
    mstform.getItem('bill_dt').addListener('change', function () {
        var bill_dt = mstform.getItem('bill_dt').getValue();
        console.log('bill_dt:' + bill_dt);
        if (!Ext.isEmpty(bill_dt)) {
            var year = bill_dt.getFullYear();
            var month = bill_dt.getMonth() + 1;
            mstform.getItem('ddlbcol_1').setValue(year);
            mstform.getItem('userhelp_4').setValue(month);
        }
        console.log(year);
        console.log(month);

    });
    mstform.getItem('phid_pc').addListener('change', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        execServer('p_form0000700029_select_XMB_list', { 'pc': pc }, function (res) {
            console.log(res)
            if (res.count == 0) return;
            const data1 = JSON.parse(res.data);
            if (data1.length == 0) return;
            console.log(data1[0])
            var deptid1Item = mstform.getItem("deptid1");
            console.log('444444444444444444444444')
            if (deptid1Item && data1[0].extendObjects && data1[0].extendObjects.deptid1) {
                console.log(deptid1Item)
                deptid1Item.setValue(data1[0].extendObjects.deptid1);
                BatchBindCombox([deptid1Item]);
                console.log('成功设置 deptid1 值');
            } else {
                console.error('设置失败：表单项或数据不存在');
                console.log('deptid1Item:', deptid1Item);
                console.log('extendObjects:', data1[0].extendObjects);
            }
        });
    });

    // mstform.getItem('phid_pc').addListener('helpselected', function (obj) {
    //     var pc = mstform.getItem('phid_pc').getValue();
    //     execServer('p_form0000700029_select_XMB_list', { 'pc': pc }, function (res) {
    //         console.log(res)
    //         if (res.count == 0) return;
    //         const data1 = JSON.parse(res.data);
    //         if (data1.length == 0) return;
    //         console.log(data1[0])
    //         var deptid1Item = mstform.getItem("deptid1");
    //         console.log('444444444444444444444444')
    //         if (deptid1Item && data1[0].extendObjects && data1[0].extendObjects.deptid1) {
    //             console.log(deptid1Item)
    //             deptid1Item.setValue(data1[0].extendObjects.deptid1);
    //             BatchBindCombox([deptid1Item]);
    //             console.log('成功设置 deptid1 值');
    //         } else {
    //             console.error('设置失败：表单项或数据不存在');
    //             console.log('deptid1Item:', deptid1Item);
    //             console.log('extendObjects:', data1[0].extendObjects);
    //         }
    //     });
    // });
    // 带出明细表内容
    // 单据日期设置为不只读
    // mstform.getItem('bill_dt').userSetReadOnly(false);
    // //日期设置为不可见
    // mstform.getItem('datetimecol_1').setVisible(false);
    // mstform.getItem('ddlbcol_1').userSetReadOnly(true);
    // mstform.getItem('userhelp_4').userSetReadOnly(true);
    // mstform.getItem('checkpsn').setVisible(false);
    //评价类别为只读
    dgrid.setReadOnlyCol('pjlb', true);
    //评分标准为只读
    dgrid.setReadOnlyCol('pfbz', true);
    if (otype == $Otype.ADD) {
        console.log('11111111111111111111111111111');
        mstform.getItem('pro_num').setValue(0);
        mstform.getItem('ins_num').setValue(0);
        mstform.getItem('safe_num').setValue(0);
        mstform.getItem('u_jyysfs').setValue(0);
        execServer('p_form0000700029_pjlb', {}, function (res) {
            console.log('22222222222222222222222222');
            console.log(res)
            if (res.count == 0) return;
            const data2 = JSON.parse(res.data);
            if (data2.length == 0) return;
            console.log(data2[0])
            //const data2 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            dstore.removeAll(); //清除单据体内所有数据
            for (var i = 0; i <= data2.length - 1; i++) {
                dstore.insert(dstore.getCount(), data2[i].extendObjects);
            }
        });
    }

    dgrid.addListener('edit', function (editor, e) {
        console.log('3333333333333333333333333333');
        var record = e.record;
        if (e.originalValue == e.value) {
            return;
        }

        if (e.field == 'pf') {

            if (record.get('pf') > record.get('pro_num')) {
                Ext.Msg.alert('提示', '当前评分已经大于满分:' + Ext.Number.from(record.get('pro_num'), 0) + '请重新输入');
                record.set('pf', 0);
                return false;
            }
            var a = 0;
            var b = 0;
            var c = 0;
            var d = 0;
            Ext.Array.each(dstore.data.items, function (record) {
                if (record.get('pjlb') == '1') {
                    a += Ext.Number.from(record.get('pf'), 0)
                }
                if (record.get('pjlb') == '2') {
                    b += Ext.Number.from(record.get('pf'), 0)
                }
                if (record.get('pjlb') == '3') {
                    c += Ext.Number.from(record.get('pf'), 0)
                }
                if (record.get('pjlb') == '4') {
                    d += Ext.Number.from(record.get('pf'), 0)
                }

            });

            mstform.getItem('pro_num').setValue(a);
            mstform.getItem('ins_num').setValue(b);
            mstform.getItem('safe_num').setValue(c);
            mstform.getItem('u_jyysfs').setValue(d);
            mstform.getItem('pjzf').setValue(mstform.getItem('pro_num').getValue() + mstform.getItem('ins_num').getValue() +
                mstform.getItem('safe_num').getValue() + mstform.getItem('u_jyysfs').getValue());

        }
    });


}