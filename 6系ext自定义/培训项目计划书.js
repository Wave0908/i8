function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000088_m'); //表头容器
    var dgrid = Ext.getCmp('p_form0000000088_d1');
    var dgrid3 = Ext.getCmp('p_form0000000088_d3');
    var dgrid4 = Ext.getCmp('p_form0000000088_d4');
    //其他人数标签  5系6系均不存在bq字段
    // mstform.getItem('bq').setVisible(false)

    //从项目名称带出相关信息
    if (otype == $Otype.ADD) {
        mstform.getItem('flg').setValue('0');
    };
    mstform.getItem('pxxmbm').userSetReadOnly(true);
    //培训年度设置为必输
    mstform.getItem('pxnd').userSetMustInput(true);
    //开展培训年度字段帮助窗口打开前事件
    mstform.getItem('pxnd').addListener('helpselected', function () {

        //培训项目名称
        mstform.getItem('pxxmmc').setValue('');
        mstform.getItem('pxlb').setValue('');
        mstform.getItem('pxrs').setValue('');
        mstform.getItem('empid').setValue('');
        mstform.getItem('gjfyys').setValue('');
        mstform.getItem('pymd').setValue('');
        mstform.getItem('flg').setValue('0');
        mstform.getItem('pxxmbm').setValue('');
    });
    //培训项目名称打开前会带出的东西其他字段
    mstform.getItem('pxxmmc').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        var pxnd_val = mstform.getItem('pxnd').getValue();
        var ocode_val = mstform.getItem('phid_org').getValue();
        console.log("pxnd_val:", pxnd_val);
        console.log("ocode_val:", ocode_val);
        if (Ext.isEmpty(pxnd_val) || Ext.isEmpty(ocode_val)) {
            Ext.Msg.alert('提示', '请先选择培训年度和组织！');
            return false;
        } else {
            // mstform.getItem('pxxmmc').setOutFilter({
            //     jhnd: pxnd_val,
            //     phid_org: ocode_val,
            //     bill_ori: '0'
            // });
            mstform.getItem('pxxmmc').setClientSqlFilter(
                "phid_org = " + ocode_val
                + " and jhnd = " + pxnd_val
                + " and bill_ori = '0'"
                + " and tt.phid not in(select pxxmmc from p_form0000000088_m where pxxmmc is not null )"
            )
        }
    });

    /*其他人数为0 不显示  附件中上传名单  ，其他人数不为0时 显示 附件中上传名单start*/
    // mstform.getItem('qtrs').addListener('change', function () {
    //     mstform.getItem('qtrs').getValue() == 0 ? mstform.getItem('bq').setVisible(false) : mstform.getItem('bq').setVisible(true)
    // });

    /*其他人数为0 不显示  附件中上传名单  ，其他人数不为0时 显示 附件中上传名单end*/
    mstform.getItem('pxxmmc').addListener('helpselected', function () {
        var pxxmmc_val = mstform.getItem('pxxmmc').getValue();
        console.log("pxxmmc_val:",pxxmmc_val);
        //带入表头信息
        execServer('p_form0000000088_select_MB_list', {
            'phid': pxxmmc_val
        },
            function (res) {
                if (res.count > 0) {
                    console.log("res:", res);
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    for (var rskey in data[0].extendObjects) {
                        if(data[0].extendObjects[rskey]!=null && data[0].extendObjects[rskey]!=''){
                            mstform.getItem(rskey).setValue(data[0].extendObjects[rskey]);
                            mstform.getItem(rskey).setReadOnly(true);

                            BatchBindCombox([mstform.getItem(rskey)]);
                        }
                    }
                }
            });
        mstform.getItem('pxrs').setReadOnly(false);
        mstform.getItem('gjfyys').setReadOnly(false);

    });
    //帮助窗口打开前事件结束
    // mstform.getItem('pxxmmc').addListener('helpselected', function () {
    //     var pxxmmc_val = mstform.getItem('pxxmmc').getValue();
    //     //带入表头信息
    //     execServer('p_form0000000088_select_MB_list', {
    //         'phid': pxxmmc_val
    //     },
    //         function (res) {
    //             if (res.count > 0) {
    //                 const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    //                 for (var rskey in data[0].extendObjects) {
    //                     mstform.getItem(rskey).setValue(data[0].extendObjects[rskey]);
    //                     mstform.getItem(rskey).setReadOnly(true);
    //                     BatchBindCombox([mstform.getItem(rskey)]);
    //                 }
    //             }
    //         });
    //     mstform.getItem('pxrs').setReadOnly(false);
    //     mstform.getItem('gjfyys').setReadOnly(false);

    // });
    //输入员工编号员工信息自动带入
    dgrid.getColumn('empid_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = dgrid.getSelectionModel().getSelection();
        console.log(data[0].data, 12121212)
        var id = data[0].data.empid;
        execServer('p_form0000000088_epm', {
            'id': id
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count > 0) {
                data[0].set('xb', data1[0].extendObjects.sex);
                data[0].set('nl', data1[0].extendObjects.age);
                data[0].set('lxdh', data1[0].extendObjects.mobile1);
                data[0].set('zc', data1[0].extendObjects.c_name);
            }
        })
    });
    //员工信息自动带入
    dgrid.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        console.log(1111)
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'empid') {
            var record = e.record;
            var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行

            var id = data[0].get('empid'); //获取当前选中行某个字段值
            execServer('p_form0000000088_epm', {
                'id': id
            }, function (res) {
                console.log(res, 888)
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log(data, res, 12212121)
                if (res.count > 0) {
                    record.set('xb', data[0].extendObjects.sex);
                    record.set('nl', data[0].extendObjects.age);
                    record.set('lxdh', data[0].extendObjects.mobile1);
                    record.set('zc', data[0].extendObjects.c_name);
                }
            })
        };
    });

    /*讲师酬金表     课时*课时酬金=酬金总额start*/
    dgrid3.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'xs' || e.field == 'mxsje') {
            var record = e.record;
            record.set('zje', Ext.Number.from(record.get('xs'), 0) * Ext.Number.from(record.get('mxsje'), 0));
        };
    });
    //员工信息自动带入
    // dgrid4.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
    //     if(e.originalValue == e.value) {
    //         return;
    //     }
    //     if(e.field == 'empid') {
    //         var record = e.record;
    //         var data = dgrid4.getSelectionModel().getSelection(); //获取当前选中行
    //         var id = data[0].get('empid'); //获取当前选中行某个字段值
    //         callServer('epm', [{
    //             'id': id
    //         }], function(res) {
    //             record.set('u_yglx', res.record[0].c_names);
    //         })
    //     };
    // });
    //输入员工编号员工信息自动带入
    dgrid4.getColumn('u_ygbh_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        // 选择gs单位 带出 浪潮的数据
        var data = dgrid4.getSelectionModel().getSelection();
        var id = data[0].data.u_ygbh;
        execServer('p_form0000000088_epm', {
            'id': id
        }, function (res) {
            const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log("data1:", data1);
            if (res.count > 0) {
                console.log("data1[0].extendObjects.emptype:", data1[0].extendObjects.emptype);
                console.log("data1[0].extendObjects.c_names:", data1[0].extendObjects.c_names);
                data[0].set('u_yglx', data1[0].extendObjects.emptype);
                data[0].set('u_yglx_EXName', data1[0].extendObjects.c_names);
                data[0].set('empid_EXName', data1[0].extendObjects.cname);
                data[0].set('empid', data1[0].extendObjects.phid);
            }
        })
    });



    //输入员工编号员工信息自动带入
    dgrid4.addListener('edit', function (editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
        console.log("e:", e);
        console.log("e.field:", e.field);
        if (e.field == 'u_ygbh_EXName') {
            var record = e.record;
            var data = dgrid4.getSelectionModel().getSelection(); //获取当前选中行
            var id = data[0].get('u_ygbh'); //获取当前选中行某个字段值
            console.log("id:", id);
            if (id != null && id != "") {
                execServer('p_form0000000088_epm', {
                    'id': id
                }, function (res) {
                    const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data1:", data1);
                    if (res.count > 0) {
                        console.log("data1[0].extendObjects.emptype:", data1[0].extendObjects.emptype);
                        console.log("data1[0].extendObjects.c_names:", data1[0].extendObjects.c_names);
                        record.set('u_yglx', data1[0].extendObjects.emptype);
                        record.set('u_yglx_EXName', data1[0].extendObjects.c_names);
                        record.set('empid_EXName', data1[0].extendObjects.cname);
                        record.set('empid', data1[0].extendObjects.phid);
                    }
                })
            }
        };
    });

    /*讲师酬金表     课时*课时酬金=酬金总额end*/

    /*费用总计=讲课酬金+其他费用+讲师食宿差旅费+学员食宿差旅费+广告费+文印费 start*/
    var gjfyysSumArray = ["jkcj", "qtje", "sscl", "xyssclf", "ggf", "wyf", "u_bmf", "u_bjglf", "u_mtf", "u_yfj", "u_jcf", "u_xctjf", "u_zlpgf", "u_cdsbzlf", "u_sxwlgjjf", "u_jkf"]


    //讲课酬金
    mstform.getItem("jkcj").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //监考费
    mstform.getItem("u_jkf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //其他费用
    mstform.getItem("qtje").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //讲师食宿差旅费
    mstform.getItem("sscl").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //学员食宿差旅费
    mstform.getItem("xyssclf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //广告费
    mstform.getItem("ggf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //文印费
    mstform.getItem("wyf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }
            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //报名费
    mstform.getItem("u_bmf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //班级管理费
    mstform.getItem("u_bjglf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //命题费
    mstform.getItem("u_mtf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //阅卷费
    mstform.getItem("u_yfj").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //教材费
    mstform.getItem("u_jcf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //宣传推介费
    mstform.getItem("u_xctjf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //质量评估费
    mstform.getItem("u_zlpgf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });

    //场地（设备）租赁费
    mstform.getItem("u_cdsbzlf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    //实训物料（工机具）费
    mstform.getItem("u_sxwlgjjf").addListener("change", function () {
        var gifyysSum = 0;
        var temp = 0;
        for (var i = 0; i < gjfyysSumArray.length; i++) {
            if (!Ext.isEmpty(Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue()))) {
                temp = Ext.Number.from(mstform.getItem(gjfyysSumArray[i]).getValue());
            } else {
                temp = 0;
            }

            gifyysSum += temp;
        }
        mstform.getItem("gjfyys").setValue(gifyysSum);
    });
    /*费用总计=讲课酬金+其他费用+讲师食宿差旅费+学员食宿差旅费+广告费+文印费 end*/

}

function getSaveDataEdit(type) { //单据编辑页面更新数据
    var mstform = Ext.getCmp('p_form0000000088_m');
    if (type == 'Verify') { //工作流经过审批节点
        var phid = mstform.getItem('phid').getValue(); //表头Bill_no值赋予变量bb
        return {
            funcname: 'cr',
            paramstr: [{
                phid: phid
            }]
        }; //调用注册SQL数据CRQC，变量bb传参给变量Bill_no
    }
    if (type == 'UnVerify') { //工作流经过审批节点
        var phid = mstform.getItem('phid').getValue(); //表头Bill_no值赋予变量bb
        return {
            funcname: 'des',
            paramstr: [{
                phid: phid
            }]
        }; //调用注册SQL数据CRQC，变量bb传参给变量Bill_no
    }
}

function getSaveDataList(type) {
    var mstform = Ext.getCmp('p_form0000000088_mgrid');
    var data = mstform.getSelectionModel().getSelection();
    var phid = Ext.Number.from(data[0].get('pxxmmc'), 0);
    if (type == 'Delete') {
        return {
            funcname: 'crs',
            paramstr: [{
                phid: phid
            }]
        };
    }
}
//保存前检测
function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000088_m');
    var dgrid4 = Ext.getCmp('p_form0000000088_d4');
    var dstore4 = dgrid4.store;
    var lx = mstform.getItem('szly').getValue();
    var flag = 0;
    if (dstore4.getCount() < 1) {
        Ext.MessageBox.show({
            title: '提示',
            msg: "请输入受训人员信息，人员较多可选择导入",
            modal: false
        });
        flag = 1;

    } else {
        if (lx == '01') {
            var dgrid1 = Ext.getCmp('p_form0000000088_d1');
            var dstore1 = dgrid1.store;
            if (dstore1.getCount() < 1) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "请填写内部教师登记表",
                    modal: false
                });
                flag = 1;
            }
        }
        if (lx == '02') {
            var dgrid2 = Ext.getCmp('p_form0000000088_d2');
            var dstore2 = dgrid2.store;
            if (dstore2.getCount() < 1) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: "请填写外部教师登记表",
                    modal: false
                });
                flag = 1;
            }
        }
    }
    if (flag == 1) {
        return false;
    }
    if (flag == 0) {
        return true;
    }

}
