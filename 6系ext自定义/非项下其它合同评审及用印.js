function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000156_m');
    var ssdwbm = mstform.getItem('ssdwbm').getValue();
    var cnt_typeno = mstform.getItem('cnt_typeno').getValue();
    var pc_no = mstform.getItem('pc_no').getValue();
    var year = mstform.getItem('datetimecol_2').getValue().getFullYear();
    if (mstform.getItem('sfbcxy').getValue() == '2') {
        if (mstform.getItem('cnt_no').getValue() == '') {
            var no = mstform.getItem('pc_no').getValue();
            //生成变更评审编号
            execServer('p_form0000000156_cnt_no', {
                'ssdwbm': ssdwbm,
                'cnt_typeno': cnt_typeno,
                'year': year
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('cnt_no').setValue(ssdwbm + cnt_typeno + year + String(1001 + data[0].extendObjects.流水号).slice(1, 4));
                }
            });
            return true;
        } else {
            return true;
        }
    } else {
        if (mstform.getItem('bg_cntno').getValue() == '') {
            var yhtbh = mstform.getItem('yhtbh').getValue();
            //生成变更评审编号
            execServer('p_form0000000156_bg_cntno', {
                'phid': yhtbh,
            }, function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('bg_cntno').setValue(mstform.getItem('cnt_no').getValue() + 'B' + String(101 + data[0].extendObjects.流水号).slice(1, 3));
                }
            })
            return true;
        } else {
            return true;
        }
    }
}
function getSaveDataEdit(type) {
    console.log("type:", type)                           //单据编辑页面更新数据
    var mstform = Ext.getCmp('p_form0000000156_m');
    if (type == 'Approve') {                                    //工作流经过审批节点
        return { funcname: 'cs', paramstr: [{}] };
    }
    if (type == 'Verify') {                                    //直接审核
        return { funcname: 'cs', paramstr: [{}] };
    }


}
function allReadyEdit() { //页面编辑方法，固定写法
    //获取容器，固定写法
    var mstform = Ext.getCmp('p_form0000000156_m');
    //获取工具栏容器
    var Toolbar = Ext.getCmp('toolbar');
    //获取表体1容器
    var dgrid1 = Ext.getCmp('p_form0000000156_d1');
    var dstore1 = dgrid1.store;
    //获取表体2容器
    var dgrid2 = Ext.getCmp('p_form0000000156_d2');
    var dstore2 = dgrid2.store;
    //获取表体3容器
    var dgrid3 = Ext.getCmp('p_form0000000156_d3');
    var dstore3 = dgrid3.store;
    //获取表体4容器
    var dgrid4 = Ext.getCmp('p_form0000000156_d4');
    var dstore4 = dgrid4.store;
    //获取表体5容器
    var dgrid5 = Ext.getCmp('p_form0000000156_d5');
    var dstore5 = dgrid5.store;
    //获取表体6容器
    var dgrid6 = Ext.getCmp('p_form0000000156_d6');
    var dstore6 = dgrid6.store;
    //获取表体7容器
    var dgrid7 = Ext.getCmp('p_form0000000156_d7');
    var dstore7 = dgrid7.store;
    //获取表体容器
    var dgrid = Ext.getCmp('p_form0000000156_d8');
    var dstore = dgrid.store;




    //存储表体各部门各等级风险的总条数
    var ybfx0 = 0;
    var zyqx0 = 0;
    var zdqx0 = 0;
    var tsqx0 = 0;

    //存储表体1各部门各等级风险的总条数
    var ybfx1 = 0;
    var zyqx1 = 0;
    var zdqx1 = 0;
    var tsqx1 = 0;

    //存储表体2各部门各等级风险的总条数
    var ybfx2 = 0;
    var zyqx2 = 0;
    var zdqx2 = 0;
    var tsqx2 = 0;

    //存储表体3各部门各等级风险的总条数
    var ybfx3 = 0;
    var zyqx3 = 0;
    var zdqx3 = 0;
    var tsqx3 = 0;

    //存储表体4各部门各等级风险的总条数
    var ybfx4 = 0;
    var zyqx4 = 0;
    var zdqx4 = 0;
    var tsqx4 = 0;

    //存储表体5各部门各等级风险的总条数
    var ybfx5 = 0;
    var zyqx5 = 0;
    var zdqx5 = 0;
    var tsqx5 = 0;

    //存储表体6各部门各等级风险的总条数
    var ybfx6 = 0;
    var zyqx6 = 0;
    var zdqx6 = 0;
    var tsqx6 = 0;

    //存储表体7各部门各等级风险的总条数
    var ybfx7 = 0;
    var zyqx7 = 0;
    var zdqx7 = 0;
    var tsqx7 = 0;
    mstform.getItem('sfbcxy').setValue(2); //是否是补充协议默认为否
    mstform.getItem('cnt_no').userSetReadOnly(false); //合同编码保护
    mstform.getItem('bg_cntno').userSetReadOnly(true); //合同编码保护
    mstform.getItem('yhtbh').setVisible(false); //变更编码不可见
    mstform.getItem('bg_cntno').setVisible(false); //变更编码不可见
    mstform.getItem('pc_no').setVisible(false); //变更编码不可见
    mstform.getItem('cnt_typeno').setVisible(false); //变更编码不可见
    mstform.getItem('bg_amt').setVisible(false);
    mstform.getItem('ssdwbm').userSetReadOnly(true);

    mstform.getItem('bg_amt').addListener('change', function () {

        mstform.getItem('amt').setValue(mstform.getItem('bg_amt').getValue() + mstform.getItem('numericcol_1').getValue());
    });
    mstform.getItem('sfbcxy').addListener('change', function () { //监听表头是否补充协议字段值发生变化后立即触发 
        if (mstform.getItem('sfbcxy').getValue() == 2) {
            mstform.getItem('yhtbh').setVisible(false); //变更编码不可见
            mstform.getItem('bg_amt').setVisible(false);
            mstform.getItem('cnt_no').setVisible(true); //合同编码可见
            mstform.getItem('yhtbh').setVisible(false); //原合同编码不可见
            mstform.getItem('bg_cntno').setVisible(false);
            mstform.getItem('yhtbh').userSetMustInput(false); //原合同编码不必输
            mstform.getItem('phid_pc').userSetReadOnly(false); //项目名称不保护
            mstform.getItem('sszz').userSetReadOnly(false);
            mstform.getItem('numericcol_1').userSetReadOnly(false);
            mstform.getItem('fbms').userSetReadOnly(false);
            mstform.getItem('fkfs').userSetReadOnly(false);
            mstform.getItem('fkbl').userSetReadOnly(false);
            mstform.getItem('sx').userSetReadOnly(false);
            mstform.getItem('cnt_type').userSetReadOnly(false);
            mstform.getItem('org_id').userSetReadOnly(false);


        } else {
            mstform.getItem('bg_cntno').userSetReadOnly(false); //变更编码不保护
            mstform.getItem('bg_cntno').setVisible(true);
            mstform.getItem('yhtbh').setVisible(true); //原编码可见
            mstform.getItem('bg_amt').setVisible(true);
            mstform.getItem('cnt_no').setVisible(false); //合同编码不可见
            mstform.getItem('yhtbh').userSetMustInput(true); //原合同编码必输
            mstform.getItem('phid_pc').userSetReadOnly(true); //项目名称保护
            mstform.getItem('sszz').userSetReadOnly(true);
            mstform.getItem('numericcol_1').userSetReadOnly(true);
            mstform.getItem('fbms').userSetReadOnly(true);
            mstform.getItem('fkfs').userSetReadOnly(true);
            mstform.getItem('fkbl').userSetReadOnly(true);
            mstform.getItem('sx').userSetReadOnly(true);
            mstform.getItem('cnt_type').userSetReadOnly(true);
            mstform.getItem('org_id').userSetReadOnly(true);




            mstform.getItem('yhtbh').addListener('helpselected', function () {
                var phid = mstform.getItem('yhtbh').getValue();
                BatchBindCombox(mstform.getItem('yhtbh'));

                mstform.getItem('sfbcxy').userSetReadOnly(true); //是否补充协议在选择合同后不允许修改
                execServer('p_form0000000156_bg', {
                    'phid': phid
                }, function (res) {
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        mstform.getItem('phid_pc').setValue(data[0].extendObjects.项目);
                        mstform.getItem('sszz').setValue(data[0].extendObjects.实施组织);
                        mstform.getItem('cnt_no').setValue(data[0].extendObjects.合同编码);
                        mstform.getItem('bill_name').setValue(data[0].extendObjects.合同名称);
                        mstform.getItem('cnt_type').setValue(data[0].extendObjects.合同类型);
                        mstform.getItem('numericcol_1').setValue(data[0].extendObjects.合同金额);
                        mstform.getItem('fbms').setValue(data[0].extendObjects.分包模式);
                        mstform.getItem('userhelp_1').setValue(data[0].extendObjects.结算方式);
                        mstform.getItem('fkfs').setValue(data[0].extendObjects.付款方式);
                        mstform.getItem('fkbl').setValue(data[0].extendObjects.付款比例);
                        mstform.getItem('sx').setValue(data[0].extendObjects.事项);
                        mstform.getItem('ssdwbm').setValue(data[0].extendObjects.实施单位编码);
                        mstform.getItem('org_id').setValue(data[0].extendObjects.供应商);
                    }
                })

                BatchBindCombox([mstform.getItem('phid_pc'), mstform.getItem('sszz'), mstform.getItem('cnt_type'), mstform.getItem('userhelp_1'), mstform.getItem('org_id')])
            })
        }
    })
    //选择实施组织更新实施单位编码
    mstform.getItem('sszz').addListener('helpselected', function () {
        var dwdm = mstform.getItem('sszz').getValue();
        console.log("dwdm:",dwdm);
        execServer('p_form0000000156_fbf', {
            'phid': dwdm
        }, function (res) {
            if(res.count>0){
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('ssdwbm').setValue(data[0].extendObjects.user_cldwbm);
            }
        })
    })
    //选择合同类型更新合同类型编码
    mstform.getItem('cnt_type').addListener('helpselected', function () {
        var typeno = mstform.getItem('cnt_type').getValue();
        execServer('p_form0000000156_cnt_typeno', {
            'phid': typeno
        }, function (res) {
            if(res.count>0){
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('cnt_typeno').setValue(data[0].extendObjects.cnt_code);
            }
        })
    })

    //选择项目更新项目编码
    mstform.getItem('phid_pc').addListener('helpselected', function () {
        mstform.getItem('sfbcxy').userSetReadOnly(true); //是否补充协议在选择项目后不允许修改
        var typeno = mstform.getItem('phid_pc').getValue();
        execServer('p_form0000000156_pc_no', {
            'phid': typeno
        }, function (res) {
            if(res.count>0){
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('pc_no').setValue(data[0].extendObjects.pc_no);
            }
        })
    })
    //监听表体，表体更新则进行相关的操作
    dgrid.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx0 = 0;
        zyqx0 = 0;
        zdqx0 = 0;
        tsqx0 = 0;
        //给变量赋值变量
        ybfx0 += ybfx;
        zyqx0 += zyqx;
        zdqx0 += zdqx;
        tsqx0 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;

        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        ybfx0 = 0;
        zyqx0 = 0;
        zdqx0 = 0;
        tsqx0 = 0;
        ybfx0 += ybfx;
        zyqx0 += zyqx;
        zdqx0 += zdqx;
        tsqx0 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })





    //监听表体1，表体更新则进行相关的操作
    dgrid1.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore1.getCount()获取表体行数
        for (i = 0; i < dstore1.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore1.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx1 = 0;
        zyqx1 = 0;
        zdqx1 = 0;
        tsqx1 = 0;
        //给变量赋值
        ybfx1 += ybfx;
        zyqx1 += zyqx;
        zdqx1 += zdqx;
        tsqx1 += tsqx;
        //各类情形的总条数的值传给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //dstore.getCount()获取表体行数
        for (i = 0; i < dstore1.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore1.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        ybfx1 = 0;
        zyqx1 = 0;
        zdqx1 = 0;
        tsqx1 = 0;
        ybfx1 += ybfx;
        zyqx1 += zyqx;
        zdqx1 += zdqx;
        tsqx1 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })



    //监听表体2，表体更新则进行相关的操作
    dgrid2.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore2.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore2.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx2 = 0;
        zyqx2 = 0;
        zdqx2 = 0;
        tsqx2 = 0;
        //给变量赋值变量
        ybfx2 += ybfx;
        zyqx2 += zyqx;
        zdqx2 += zdqx;
        tsqx2 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore2.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore2.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx2 = 0;
        zyqx2 = 0;
        zdqx2 = 0;
        tsqx2 = 0;
        //给变量赋值变量
        ybfx2 += ybfx;
        zyqx2 += zyqx;
        zdqx2 += zdqx;
        tsqx2 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })




    //监听表体3，表体更新则进行相关的操作
    dgrid3.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore3.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore3.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx3 = 0;
        zyqx3 = 0;
        zdqx3 = 0;
        tsqx3 = 0;
        //给变量赋值变量
        ybfx3 += ybfx;
        zyqx3 += zyqx;
        zdqx3 += zdqx;
        tsqx3 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;

        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore3.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore3.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx3 = 0;
        zyqx3 = 0;
        zdqx3 = 0;
        tsqx3 = 0;
        //给变量赋值变量
        ybfx3 += ybfx;
        zyqx3 += zyqx;
        zdqx3 += zdqx;
        tsqx3 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })








    //监听表体4，表体更新则进行相关的操作
    dgrid4.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore4.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore4.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx4 = 0;
        zyqx4 = 0;
        zdqx4 = 0;
        tsqx4 = 0;
        //给变量赋值变量
        ybfx4 += ybfx;
        zyqx4 += zyqx;
        zdqx4 += zdqx;
        tsqx4 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;

        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore4.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore4.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx4 = 0;
        zyqx4 = 0;
        zdqx4 = 0;
        tsqx4 = 0;
        //给变量赋值变量
        ybfx4 += ybfx;
        zyqx4 += zyqx;
        zdqx4 += zdqx;
        tsqx4 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })



    //监听表体5，表体更新则进行相关的操作
    dgrid5.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore5.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore5.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx5 = 0;
        zyqx5 = 0;
        zdqx5 = 0;
        tsqx5 = 0;
        //给变量赋值变量
        ybfx5 += ybfx;
        zyqx5 += zyqx;
        zdqx5 += zdqx;
        tsqx5 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;

        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore5.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore5.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx5 = 0;
        zyqx5 = 0;
        zdqx5 = 0;
        tsqx5 = 0;
        //给变量赋值变量
        ybfx5 += ybfx;
        zyqx5 += zyqx;
        zdqx5 += zdqx;
        tsqx5 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })




    //监听表体6，表体更新则进行相关的操作
    dgrid6.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore6.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore6.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx6 = 0;
        zyqx6 = 0;
        zdqx6 = 0;
        tsqx6 = 0;
        //给变量赋值变量
        ybfx6 += ybfx;
        zyqx6 += zyqx;
        zdqx6 += zdqx;
        tsqx6 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;

        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore6.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore6.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx6 = 0;
        zyqx6 = 0;
        zdqx6 = 0;
        tsqx6 = 0;
        //给变量赋值变量
        ybfx6 += ybfx;
        zyqx6 += zyqx;
        zdqx6 += zdqx;
        tsqx6 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })



    //监听表体7，表体更新则进行相关的操作
    dgrid7.addListener('edit', function (editor, e) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;
        //判断原值与新值是否相同
        // if (e.originalValue == e.value) {
        //     return;
        // }
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore7.getCount(); i++) {
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore7.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx7 = 0;
        zyqx7 = 0;
        zdqx7 = 0;
        tsqx7 = 0;
        //给变量赋值变量
        ybfx7 += ybfx;
        zyqx7 += zyqx;
        zdqx7 += zdqx;
        tsqx7 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);
    });

    //监听删除行的操作，固定写法
    Toolbar.get('deleterow').on('click', function () {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //用来存储一般风险的总条数
        var ybfx = 0;
        var zyqx = 0;
        var zdqx = 0;
        var tsqx = 0;

        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore5.getCount(); i++) {
            //sum等于每一行的金额相加
            sum = Ext.Number.from(dstore5.getAt(i).get('fxdj'), 0);
            if (sum == '242191205000001') {
                ybfx += 1;
            } else if (sum == '242191205000002') {
                zyqx += 1;
            } else if (sum == '242191205000003') {
                zdqx += 1;
            } else if (sum == '242191205000004') {
                tsqx += 1;
            }
        }
        //初始化变量
        ybfx5 = 0;
        zyqx5 = 0;
        zdqx5 = 0;
        tsqx5 = 0;
        //给变量赋值变量
        ybfx5 += ybfx;
        zyqx5 += zyqx;
        zdqx5 += zdqx;
        tsqx5 += tsqx;
        //各类情形的总条数的值赋给表体控件
        mstform.getItem('ybfx').setValue(ybfx0 + ybfx1 + ybfx2 + ybfx3 + ybfx4 + ybfx5 + ybfx6 + ybfx7);
        mstform.getItem('zyqx').setValue(zyqx0 + zyqx1 + zyqx2 + zyqx3 + zyqx4 + zyqx5 + zyqx6 + zyqx7);
        mstform.getItem('zdqx').setValue(zdqx0 + zdqx1 + zdqx2 + zdqx3 + zdqx4 + zdqx5 + zdqx6 + zdqx7);
        mstform.getItem('tsqx').setValue(tsqx0 + tsqx1 + tsqx2 + tsqx3 + tsqx4 + tsqx5 + tsqx6 + tsqx7);

    })

    mstform.getItem('ddlbcol_2').setValue(0);
}