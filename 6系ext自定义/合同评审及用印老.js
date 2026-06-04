// 合同评审及用印

//差一个合同变更的方案和取消审核检查事项
function beforeUnVerifyList() { //单据列表去审核时检测
    var mgrid = Ext.getCmp('p_form0000000042_mgrid');
    var data = mgrid.getSelectionModel().getSelection();
    if (data.length < 1)
        return;
    var ddbh = data[0].get('phid');
    var ybyy;
    var xm;
    callServer('scjc', [{
        'phid': ddbh
    }], function (res) { //调用注册SQL函数 HZJC 变量 htbh 赋值给函数变量ddbh,结果返回到res
        ybyy = res.record[0].sl; //res返回值第一行 sl 字段值赋值给 ybyy
    });

    callServer('xmjc', [{
        'pc': ddbh
    }], function (res) { //调用注册SQL函数 HZJC 变量 htbh 赋值给函数变量ddbh,结果返回到res
        xm = res.record[0].sl; //res返回值第一行 sl 字段值赋值给 ybyy
    });

    //调用注册SQL函数 HZJC事件结束
    if (ybyy > 0) {
        Ext.Msg.alert('提示', '该合同评审存在补充协议评审！请先删除补充协议。'); //返回提示信息
        return false; //返回假
    } else if (xm > 0) {
        Ext.Msg.alert('提示', '该合同评审已被项目信息引用，请先删除项目信息。'); //返回提示信息
        return false;
    } else {
        return true;
    }

}
//保存前检查，如果变更后编码为空则生成编码并保存
function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000042_m');
    var flag = 0;
    //如果是补充协议则判断变更编码是否为空，否则直接保存
    if (mstform.getItem('sfbcxy').getValue() == 1) {//是补充协议
        if (mstform.getItem('bg_cnt_no').getValue() == '') {//补充协议编号不为空
            var no = mstform.getItem('htbm').getValue();//获取合同编码
            //生成变更评审编号
            callServer('bg_no', [{
                'bill_no': no
            }], function (res) {
                mstform.getItem('bg_cnt_no').setValue(mstform.getItem('cnt_no').getValue() + 'B' + String(101 + res.record[0].流水号)
                    .substr(1, 2));
            });
            //return true;
        } else {
            //return true;

        }

    } else {

        //return true;

    }
    //获取工具栏容器
    //获取表体容器
    var dgrid = Ext.getCmp('p_form0000000042_dgrid');
    var dstore = dgrid.store;
    //获取表体1容器
    var dgrid1 = Ext.getCmp('p_form0000000042_d1grid');
    var dstore1 = dgrid1.store;
    //获取表体2容器
    var dgrid2 = Ext.getCmp('p_form0000000042_d2grid');
    var dstore2 = dgrid2.store;
    //获取表体3容器
    var dgrid3 = Ext.getCmp('p_form0000000042_d3grid');
    var dstore3 = dgrid3.store;
    //获取表体4容器
    var dgrid4 = Ext.getCmp('p_form0000000042_d4grid');
    var dstore4 = dgrid4.store;
    //获取表体5容器
    var dgrid5 = Ext.getCmp('p_form0000000042_d5grid');
    var dstore5 = dgrid5.store;
    //获取表体6容器
    var dgrid6 = Ext.getCmp('p_form0000000042_d6grid');
    var dstore6 = dgrid6.store;
    //获取表体7容器
    var dgrid7 = Ext.getCmp('p_form0000000042_d7grid');
    var dstore7 = dgrid7.store;
    //获取表体8容器
    var dgrid8 = Ext.getCmp('p_form0000000042_d8grid');
    var dstore8 = dgrid8.store;
    //存储表体各部门各等级风险的总条数
    var ybfx = 0;
    var zyqx = 0;
    var zdqx = 0;
    var tsqx = 0;
    //存储二级单位等级风险条数
    var u_jtgsybht = 0;
    var u_ejdwzyqx = 0;
    var u_ejdwzdqx = 0;
    var u_ejdwtsqx = 0;
    //修改保存时置空
    mstform.getItem('ori_risk').setValue(' ');
    mstform.getItem('imp_risk').setValue(' ');
    mstform.getItem('big_risk').setValue(' ');
    mstform.getItem('spec_risk').setValue(' ');
    mstform.getItem('u_ejdwybqx').setValue(' ');
    mstform.getItem('u_ejdwtsqxpd').setValue(' ');
    mstform.getItem('u_ejdwzdqxpd').setValue(' ');
    mstform.getItem('u_ejdwzyqxpd').setValue(' ');
    //定义保存检测函数
    function Save_fx(dstore) {
        //sum用于存储 风险等级字段的值
        var sum = 0;
        //sszzSum用于存储 二级单位风险字段的值
        var sszzSum = 0
        //用来存储风险的总条数
        //判断原值与新值是否相同
        // dstore.getCount()获取表体行数
        for (i = 0; i < dstore.getCount(); i++) {
            // 所属组织1集团 2二级单位
            sszzSum = Ext.Number.from(dstore.getAt(i).get('u_sszz'), 0);
            //风险等级的值赋给SUM
            sum = Ext.Number.from(dstore.getAt(i).get('fxdj'), 0);
            if (sszzSum == '1') {
                if (sum == '242191205000001') {
                    ybfx += 1;
                } else if (sum == '242191205000002') {
                    zyqx += 1;
                } else if (sum == '242191205000003') {
                    zdqx += 1;
                } else if (sum == '242191205000004') {
                    tsqx += 1;
                }
            } else if (sszzSum == '2') {
                if (sum == '242191205000001') {
                    u_jtgsybht += 1;
                } else if (sum == '242191205000002') {
                    u_ejdwzyqx += 1;
                } else if (sum == '242191205000003') {
                    u_ejdwzdqx += 1;
                } else if (sum == '242191205000004') {
                    u_ejdwtsqx += 1;
                }
            }
        }
        //console.log(ybfx,zyqx,zdqx,tsqx);
    }
    Save_fx(dstore);
    Save_fx(dstore1);
    Save_fx(dstore2);
    Save_fx(dstore3);
    Save_fx(dstore4);
    Save_fx(dstore5);
    Save_fx(dstore6);
    Save_fx(dstore7);
    Save_fx(dstore8);
    //各类情形的总条数的值赋给表体控件
    mstform.getItem('ybfx').setValue(ybfx);
    mstform.getItem('zyqx').setValue(zyqx);
    mstform.getItem('zdqx').setValue(zdqx);
    mstform.getItem('tsqx').setValue(tsqx);
    //二级单位总条数赋值
    mstform.getItem('u_jtgsybht').setValue(u_jtgsybht);
    mstform.getItem('u_ejdwzyqx').setValue(u_ejdwzyqx);
    mstform.getItem('u_ejdwzdqx').setValue(u_ejdwzdqx);
    mstform.getItem('u_ejdwtsqx').setValue(u_ejdwtsqx);
    if (mstform.getItem('sfhz').getValue() == 1) {
        var yb = mstform.getItem('ybfx').getValue();
        var zy = mstform.getItem('zyqx').getValue();
        var zd = mstform.getItem('zdqx').getValue();
        var ts = mstform.getItem('tsqx').getValue();

        if (ts > 0) {
            mstform.getItem('spec_risk').setValue('1'); //特殊情形
        } else if (zd > 0) {
            mstform.getItem('big_risk').setValue('1'); //重大情形
        } else if (zy > 0) {
            mstform.getItem('imp_risk').setValue('1'); //重要情形
        } else if (yb > 0) {
            mstform.getItem('ori_risk').setValue('1'); //一般情形
        } else if (yb == 0 && zy == 0 && zd == 0 && ts == 0) {
            //console.log('正常');
            //mstform.getItem('sfhz').setValue('2');
            mstform.getItem('ori_risk').setValue('1');
        } else {
            Ext.Msg.alert('提示', '逻辑存在漏洞，请联系管理员');
            flag = 1;
        }
    } else {
        mstform.getItem('ori_risk').setValue(' ');
        mstform.getItem('imp_risk').setValue(' ');
        mstform.getItem('big_risk').setValue(' ');
        mstform.getItem('spec_risk').setValue(' ');
    }

    if (mstform.getItem('u_ejdwsfhz').getValue() == 1) {
        var ybs = mstform.getItem('u_jtgsybht').getValue();
        var zys = mstform.getItem('u_ejdwzyqx').getValue();
        var zds = mstform.getItem('u_ejdwzdqx').getValue();
        var tss = mstform.getItem('u_ejdwtsqx').getValue();

        if (tss > 0) {
            mstform.getItem('u_ejdwtsqxpd').setValue('1'); //特殊情形
        } else if (zds > 0) {
            mstform.getItem('u_ejdwzdqxpd').setValue('1'); //重大情形
        } else if (zys > 0) {
            mstform.getItem('u_ejdwzyqxpd').setValue('1'); //重要情形
        } else if (ybs > 0) {
            mstform.getItem('u_ejdwybqx').setValue('1'); //一般情形
        } else if (ybs == 0 && zys == 0 && zds == 0 && tss == 0) {
            //console.log('正常');
            //mstform.getItem('sfhz').setValue('2');
            mstform.getItem('u_ejdwybqx').setValue('1');
        } else {
            Ext.Msg.alert('提示', '逻辑存在漏洞，请联系管理员');
            flag = 1;
        }
    } else {
        mstform.getItem('u_ejdwybqx').setValue(' ');
        mstform.getItem('u_ejdwzyqxpd').setValue(' ');
        mstform.getItem('u_ejdwzdqxpd').setValue(' ');
        mstform.getItem('u_ejdwtsqxpd').setValue(' ');
    }
    //8.7新增 集团公司风险情况和二级单位风险情况对比 得出最终风险情况
    var yb = mstform.getItem('ybfx').getValue();
    var zy = mstform.getItem('zyqx').getValue();
    var zd = mstform.getItem('zdqx').getValue();
    var ts = mstform.getItem('tsqx').getValue();
    var ybs = mstform.getItem('u_jtgsybht').getValue();
    var zys = mstform.getItem('u_ejdwzyqx').getValue();
    var zds = mstform.getItem('u_ejdwzdqx').getValue();
    var tss = mstform.getItem('u_ejdwtsqx').getValue();
    if (mstform.getItem('sfhz').getValue() == 0 && mstform.getItem('u_ejdwsfhz').getValue() == 0) {
        mstform.getItem('u_zzybqx').setValue('');
    } else {
        if (ts > 0 || tss > 0) {
            mstform.getItem('u_zzybqx').setValue('4'); //特殊情形
        } else if (zd > 0 || zds > 0) {
            mstform.getItem('u_zzybqx').setValue('3'); //重大情形
        } else if (zy > 0 || zys > 0) {
            mstform.getItem('u_zzybqx').setValue('2');; //重要情形
        } else if (yb > 0 || ybs > 0) {
            mstform.getItem('u_zzybqx').setValue('1');; //一般情形
        } else {
            mstform.getItem('u_zzybqx').setValue('');
        }
    }
    if (flag == 0) {
        return true;
    } else {
        return false;
    }
}

function getSaveDataEdit(type) {

    var mstform = Ext.getCmp('p_form0000000042_m');
    if (mstform.getItem('sfbcxy').getValue() == 2) {
        if (type == 'Save') {

            var pc = mstform.getItem('pc_name').getValue();
            return {
                funcname: 'pc',
                paramstr: [{
                    phid_pc: pc
                }]
            };
            //调用执行SQL gxht，变量传递 SQl定义变量bb:变量bb

        }
    } else {
        return;
    }

}

function allReadyEdit() { //页面编辑方法，固定写法
    //获取容器，固定写法
    var mstform = Ext.getCmp('p_form0000000042_m');
    mstform.getItem('is_sum').setVisible(false);
    mstform.getItem('fkgs').setVisible(false);
    mstform.getItem('jjfs').setVisible(false);
    mstform.getItem('sfzzgl').setValue('2');
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {

        //获取表体容器
        var dgrid = Ext.getCmp('p_form0000000042_dgrid');
        var dstore = dgrid.store;
        //获取表体1容器
        var dgrid1 = Ext.getCmp('p_form0000000042_d1grid');
        var dstore1 = dgrid1.store;
        //获取表体2容器
        var dgrid2 = Ext.getCmp('p_form0000000042_d2grid');
        var dstore2 = dgrid2.store;
        //获取表体3容器
        var dgrid3 = Ext.getCmp('p_form0000000042_d3grid');
        var dstore3 = dgrid3.store;
        //获取表体4容器
        var dgrid4 = Ext.getCmp('p_form0000000042_d4grid');
        var dstore4 = dgrid4.store;
        //获取表体5容器
        var dgrid5 = Ext.getCmp('p_form0000000042_d5grid');
        var dstore5 = dgrid5.store;
        //获取表体6容器
        var dgrid6 = Ext.getCmp('p_form0000000042_d6grid');
        var dstore6 = dgrid6.store;
        //获取表体7容器
        var dgrid7 = Ext.getCmp('p_form0000000042_d7grid');
        var dstore7 = dgrid7.store;
        //获取表体8容器
        var dgrid8 = Ext.getCmp('p_form0000000042_d8grid');
        var dstore8 = dgrid8.store;

        mstform.getItem('sflht').addListener("change", function () {
            var sflht = mstform.getItem('sflht').getValue();
            if (sflht == '是') {
                mstform.getItem('amt_1').userSetMustInput(true);
                mstform.getItem('amt_2').userSetMustInput(true);
            } else {
                mstform.getItem('amt_1').userSetMustInput(false);
                mstform.getItem('amt_2').userSetMustInput(false);
            }
        });

        mstform.getItem('xmlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            mstform.getItem('xmlx').setClientSqlFilter('grade = 1 and enable_status=1 ');
        });
        mstform.getItem('sfbcxy').addListener("change", function () {
            var sfbcxy = mstform.getItem('sfbcxy').getValue();
            if (sfbcxy == '1') {
                mstform.getItem('remarks').setVisible(true);
                mstform.getItem('remarks').userSetMustInput(true);
            } else {
                mstform.getItem('remarks').setVisible(false);
                mstform.getItem('remarks').userSetMustInput(false);
            }
        });

        //获取工具栏容器
        mstform.getItem('sfbcxy').setValue(2); //默认为2
        BatchBindCombox([mstform.getItem('sfbcxy')]);
        mstform.getItem('bg_cnt_no').setVisible(false); //默认bg_cnt_no不可见
        mstform.getItem('textcol_1').setVisible(false); //默认bg_cnt_no不可见
        mstform.getItem('bg_amt').setVisible(false); //默认bg_cnt_no不可见
        mstform.getItem('htbm').setVisible(false); //默认bg_cnt_no不可见
        mstform.getItem('amt').setVisible(false);
        mstform.getItem('sfzzgl').setVisible(false);

        mstform.getItem('sfbcxy').addListener('change', function () { //监听表头sfbcxy字段值发生变化后立即触发

            if (mstform.getItem('sfbcxy').getValue() == 2) {
                mstform.getItem('bg_cnt_no').setVisible(false); //sfbcxy等于2则bg_cnt_no不可见
                mstform.getItem('textcol_1').setVisible(false);
                // mstform.getItem('bg_amt').setVisible(false);
                mstform.getItem('htbm').setVisible(false);
                mstform.getItem('cnt_no').setVisible(true);
                mstform.getItem('htbm').userSetMustInput(false); //合同编码不必输
                mstform.getItem('pc_name').userSetReadOnly(false); //项目名称不保护
                mstform.getItem('amt').setVisible(false);
                mstform.getItem('amt').userSetMustInput(false);
                mstform.getItem('bg_cnt_no').userSetMustInput(false);
                mstform.getItem('textcol_1').userSetMustInput(false);
                mstform.getItem('sfzzgl').setVisible(false);
                // mstform.getItem('bg_amt').userSetMustInput(false);

            } else {
                mstform.getItem('sfzzgl').setVisible(true);
                mstform.getItem('amt').setVisible(true);
                mstform.getItem('amt').userSetMustInput(true);
                mstform.getItem('bg_cnt_no').setVisible(true); //否则则bg_cnt_no可见
                mstform.getItem('bg_cnt_no').userSetMustInput(true);
                mstform.getItem('textcol_1').setVisible(true);
                mstform.getItem('textcol_1').userSetMustInput(true);
                // mstform.getItem('bg_amt').setVisible(true);
                //  mstform.getItem('bg_amt').userSetMustInput(true);
                mstform.getItem('htbm').setVisible(true);
                mstform.getItem('cnt_no').setVisible(false);
                mstform.getItem('htbm').userSetMustInput(true); //合同编码必输
                mstform.getItem('pc_name').userSetReadOnly(true); //项目名称保护
                //监听表体合同编码字段，字段选择后触发
                mstform.getItem('htbm').addListener('helpselected', function () {
                    var htmc = mstform.getItem('htbm').getValue();
                    callServer('bg_ht', [{
                        'bill_no': htmc
                    }], function (res) {
                        mstform.getItem('htzt').setValue(res.record[0].合同主体);
                        mstform.getItem('pc_name').setValue(res.record[0].工程项目);
                        mstform.getItem('xmgn').setValue(res.record[0].项目功能);
                        mstform.getItem('xmlx').setValue(res.record[0].工程类型);
                        mstform.getItem('title').setValue(res.record[0].合同名称);
                        mstform.getItem('cnt_no').setValue(res.record[0].合同编码);

                        mstform.getItem('jfdw').setValue(res.record[0].甲方单位信息);
                        mstform.getItem('numericcol_1').setValue(res.record[0].签约合同金额);
                        mstform.getItem('userhelp_1').setValue(res.record[0].承揽模式);
                        mstform.getItem('htlx').setValue(res.record[0].合同类型);
                        mstform.getItem('htlrl').setValue(res.record[0].投标收益率);

                        BatchBindCombox([mstform.getItem('htzt'), mstform.getItem('pc_name'), mstform.getItem('xmgn'), mstform.getItem('xmlx'), mstform.getItem('custno'),
                        mstform.getItem('numericcol_1'), mstform.getItem('userhelp_1'), mstform.getItem('htlx'), mstform.getItem('htlrl'), mstform.getItem('jfdw')
                        ])
                        //htbm字段选择后是否补充协议字段保护
                        mstform.getItem('sfbcxy').userSetReadOnly(true);
                    })
                })
            }
        });
        //单据穿透查询用phid值传参
        mstform.getItem('pc_name').el.down('input').on('dblclick', function () {
            var id = mstform.getItem('pc_name').getValue();
            if (id) {
                var url = C_ROOT + 'PMS/CRM/AdvanceProject/AdvanceProjectEdit?otype=view&id=' + id;
                $OpenTab('标前立项-查看', url);
            }
        });
        //是否汇总监听

        //var aa = 0;
        // if(otype == $Otype.EDIT){
        // 	var aa = 1;
        // }
        window.onload = function () {
            console.log(dstore, dstore.getCount(), dstore.getTotalCount(), 123);
            mstform.getItem('sfhz').addListener('change', function () { //监听表头字段值发生变化后立即触发
                if (mstform.getItem('sfhz').getValue() == 1) {
                    console.log(dstore, dstore.getCount(), dstore.getTotalCount(), 123);

                    if (dstore.getCount() == 0 && dstore1.getCount() == 0 && dstore2.getCount() == 0 &&
                        dstore3.getCount() == 0 && dstore4.getCount() == 0 && dstore5.getCount() == 0 && dstore6.getCount() == 0 &&
                        dstore7.getCount() == 0 && dstore8.getCount() == 0) {
                        mstform.getItem('sfhz').setValue('');

                        Ext.Msg.alert('提示', '请先录入明细表风险数据');

                    } else {
                        //return true;
                        //mstform.getItem('sfhz').setValue('0');
                    }

                } else if (mstform.getItem('sfhz').getValue() == 2) {
                    mstform.getItem('ori_risk').setValue(' ');
                    mstform.getItem('imp_risk').setValue(' ');
                    mstform.getItem('big_risk').setValue(' ');
                    mstform.getItem('spec_risk').setValue(' ');
                }
            });

            mstform.getItem('u_ejdwsfhz').addListener('change', function () { //监听表头字段值发生变化后立即触发
                if (mstform.getItem('u_ejdwsfhz').getValue() == 1) {
                    console.log(dstore, dstore.getCount(), dstore.getTotalCount());

                    if (dstore.getCount() == 0 && dstore1.getCount() == 0 && dstore2.getCount() == 0 &&
                        dstore3.getCount() == 0 && dstore4.getCount() == 0 && dstore5.getCount() == 0 && dstore6.getCount() == 0 &&
                        dstore7.getCount() == 0 && dstore8.getCount() == 0) {
                        mstform.getItem('u_ejdwsfhz').setValue('');

                        Ext.Msg.alert('提示', '请先录入明细表风险数据');

                    } else {
                        //return true;
                        //mstform.getItem('sfhz').setValue('0');
                    }

                } else if (mstform.getItem('u_ejdwsfhz').getValue() == 2) {
                    mstform.getItem('u_ejdwybqx').setValue(' ');
                    mstform.getItem('u_ejdwzyqxpd').setValue(' ');
                    mstform.getItem('u_ejdwzdqxpd').setValue(' ');
                    mstform.getItem('u_ejdwtsqxpd').setValue(' ');
                }
            });
        }
        //非补充协议评审字段更新，字段选择后触发
        mstform.getItem('pc_name').addListener('helpselected', function () {
            //获取字段值，赋值给变量
            var pc_no = mstform.getItem('pc_name').getValue();
            //'pc_name'元数据注册的功能名称，‘phid’SQL引用的函数名，pc_no 变量
            callServer('pc_name', [{
                'phid': pc_no
            }], function (res) {
                //给字段赋值
                var b = res.record[0].甲方单位信息
                mstform.getItem('gcdd').setValue(res.record[0].工程地点);
                mstform.getItem('country').setValue(res.record[0].国家);
                mstform.getItem('province').setValue(res.record[0].省);
                mstform.getItem('city').setValue(res.record[0].市);
                mstform.getItem('region').setValue(res.record[0].区县);
                //mstform.getItem('cnt_no').setValue(res.record[0].编码);
                mstform.getItem('userhelp_1').setValue(res.record[0].承揽模式);
                mstform.getItem('htlx').setValue(res.record[0].合同类型);
                mstform.getItem('xmlx').setValue(res.record[0].项目类型);
                mstform.getItem('htzt').setValue(res.record[0].承揽单位编码);
                mstform.getItem('xmgn').setValue(res.record[0].项目功能);
                mstform.getItem('jfdw').setValue(res.record[0].甲方单位信息);
                //编码转换为名称
                BatchBindCombox([mstform.getItem('country'), mstform.getItem('province'), mstform.getItem('city'), mstform.getItem('region'), mstform.getItem('custno')]);

                console.log("custno:",mstform.getItem('custno'));
                BatchBindCombox([mstform.getItem('userhelp_1'), mstform.getItem('htlx'), mstform.getItem('xmlx'), mstform.getItem('htzt'), mstform.getItem('xmgn'), mstform.getItem('jfdw')]);

                //项目选择后，是否补充协议字段不允许改动
                mstform.getItem('sfbcxy').userSetReadOnly(true);

            });

        });

        mstform.getItem('htzt').addListener('helpselected', function () {
            var dwdm = mstform.getItem('htzt').getValue();

            if (Ext.isEmpty(dwdm)) {
                mstform.getItem('cldwbm').setValue();
            } else {
                //通过SQL赋值给承揽单位编码
                callServer('fbf', [{
                    'phid': dwdm
                }], function (res) {
                    var b = res.record[0].user_cldwbm;
                    mstform.getItem('cldwbm').setValue(b);
                });
            }

        });

    }

    /*关联合同编码通用帮助选择前触发 start*/
    //项选择前触发

    mstform.getItem('htbm').addListener('beforetriggerclick', function () {
        var pocode = mstform.getItem('ocode').getValue();
        //获取是否过滤组织字段
        var sfzzgl = mstform.getItem('sfzzgl').getValue();
        if (sfzzgl == '1') {
            mstform.getItem('htbm').setOutFilter({
                'ocode': pocode
            });

        } else if (sfzzgl == '2') {
            mstform.getItem('htbm').setOutFilter({

            });
        }

    });
    /*关联合同编码通用帮助选择前触发 end*/

}

