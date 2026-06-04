function allReadyEdit() {
    //获取容器
    var mstform = Ext.getCmp('p_form0000000236_m');
    var dgrid = Ext.getCmp('p_form0000000236_d1');
    var dstore = dgrid.store;
    var dgrid1 = Ext.getCmp('p_form0000000236_d2');
    var dstore1 = dgrid1.store;
    var Toolbar = Ext.getCmp('toolbar');

    Toolbar.insert(1, {
        itemId: "push",
        text: "浪潮推送",
        width: this.itemWidth,
        iconCls: "icon-New"
    });

    Toolbar.items.get('push').on('click', function () {
        Ext.Ajax.request({
            method: 'get',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            url: "http://192.168.3.241:30599/new_esey/lcApi/pushDbtzDrOrDc?phid=" + busid,
            async: false, //同步请求
            disableCaching: false, // 添加这行来阻止_dc参数
            success: function (response) {
                window.wait = false;
                var resdata = JSON.parse(response.text);
                var status = resdata["status"];
                var message = resdata["message"];
                if (status == "success") {
                    Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () {

                    });
                } else {
                    Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
                }
            },
            failure: function (response, opts) {
                myMask.hide();
                window.wait = false;
                var resdata = JSON.parse(response.text);
                var status = resdata["status"];
                var message = resdata["message"];
                Ext.MessageBox.alert(Lang.Notes || '提示', message);
            }
        });
    });
    mstform.getItem('num_fj').setValue('0'); //附件数量置空
    if (otype == $Otype.ADD || otype == $Otype.EDIT) { //var a = document.getElementById('zcxz-inputEl').set
        //document.getElementById('ngText-1061-inputEl').style.backgroundColor = "darkorange";
        //部门填充  $appinfo.userID:登录用户phid;
        execServer('p_form0000000236_zz', {
            'logid': $appinfo.userID
        }, function (res) {
            const data = JSON.parse(res.data);
            mstform.getItem('deptid').setValue(data[0].phid);
            //console.log(res.record[0].phid)
            BatchBindCombox([mstform.getItem('deptid')]);
            mstform.getItem('bill_name').setValue(data.deptname + '资产调拨单');
        });
        //浪潮核算部门过滤
        //mstform.getItem('checkpsn').setVisible(false);
        mstform.getItem('lchsbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            var zz = mstform.getItem('phid_org').getValue();
            if (zz) {
                mstform.getItem('lchsbm').setOutFilter({
                    phid_org: zz
                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
            }
        });
        //表体控制
        mstform.getItem('dbfs').addListener('change', function () {
            //console.log(mstform.getItem('dbfs').getValue());
            //获取日期
            var myDate = new Date();
            var a = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var b = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            b = (b < 10 ? "0" + b : b);
            var c = myDate.getDate();
            var d = a.toString() + b.toString() + c.toString();
            //调入
            if (mstform.getItem('dbfs').getValue() == 1) {
                //设置引入数据只读
                dgrid.setReadOnlyCol('dygocode', true);
                dgrid.setReadOnlyCol('dygdept', true);
                dgrid.setReadOnlyCol('dysocode', true);
                dgrid.setReadOnlyCol('dysdept', true);

                //字段资产增加方式为显示
                dgrid.hideColumn('zczjfs_EXName', false);
                //字段资产增加方式为必输项
                dgrid.setMustInputCol('zczjfs_EXName', true);
                //字段资产减少方式隐藏
                dgrid.hideColumn('zcjsfs_EXName', true);
                //字段资产减少方式为不必输项
                dgrid.setMustInputCol('zcjsfs_EXName', false);
                if (otype == $Otype.ADD) {

                    //单据编码规则
                    execServer('p_form0000000236_zcdr', {}, function (res) {
                        const data = JSON.parse(res.data);
                        var sum = Number(data[0].extendObjects.sl);
                        if (0 <= sum && sum < 9) {
                            sum = "ZCXZ" + d + "00000" + (sum + 1).toString();
                            console.log(sum)
                            mstform.getItem('bill_no').setValue(sum);
                        } else if (9 <= sum && sum < 99) {
                            sum = "ZCXZ" + d + "0000" + (sum + 1).toString();
                            mstform.getItem('bill_no').setValue(sum);
                        } else if (99 <= sum && sum < 999) {
                            sum = "ZCXZ" + d + "000" + (sum + 1).toString();
                            mstform.getItem('bill_no').setValue(sum);
                        } else {
                            NGMsg.Info('你遇到了异常事件，请联系管理员增加流水号');
                        }
                    });
                }

            }
            //调出
            else if (mstform.getItem('dbfs').getValue() == 2) {
                //字段资产减少方式为显示
                dgrid.hideColumn('zcjsfs_EXName', false);
                //字段资产减少方式为必输项
                dgrid.setMustInputCol('zcjsfs_EXName', true);
                //字段资产增加方式隐藏
                dgrid.hideColumn('zczjfs_EXName', true);
                //字段资产增加方式为不必输项
                dgrid.setMustInputCol('zczjfs_EXName', false);
                if (otype == $Otype.ADD) {
                    //单据编码规则
                    execServer('p_form0000000236_zcdc', {}, function (res) {
                        const data = JSON.parse(res.data);
                        var sum = Number(data[0].extendObjects.sl);

                        if (0 <= sum && sum < 9) {
                            sum = "ZCJS" + d + "00000" + (sum + 1).toString();
                            console.log(sum)
                            mstform.getItem('bill_no').setValue(sum);
                        } else if (9 <= sum && sum < 99) {
                            sum = "ZCJS" + d + "0000" + (sum + 1).toString();
                            mstform.getItem('bill_no').setValue(sum);
                        } else if (99 <= sum && sum < 999) {
                            sum = "ZCJS" + d + "000" + (sum + 1).toString();
                            mstform.getItem('bill_no').setValue(sum);
                        } else {
                            NGMsg.Info('你遇到了异常事件，请联系管理员增加流水号');
                        }
                    });
                }

            }

        });
        //资产引用
        mstform.getItem('zcxz').el.down('input').on('dblclick', function () {
            //填写控制
            if (Ext.isEmpty(mstform.getItem('sblx').getValue()) || Ext.isEmpty(mstform.getItem('dbfs').getValue())) {
                Ext.Msg.alert('提示', '请先填写设备类型和调拨方式！')
                return false;
            }
            //设置来源主键隐藏
            //var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            dgrid.hideColumn('flag', true);
            //调入
            if (mstform.getItem('dbfs').getValue() == 1) {
                //引用调出
                var help = Ext.create('Ext.ng.MultiRichHelp', { //创建通用帮助多选
                    valueField: 'phid', //指定代码列
                    displayField: 'zcbm', //指定名称列
                    helpid: 'zckp_dy', //指定帮助ID
                    ORMMode: false, //通用写法
                    outFilter: {
                        'sblx': mstform.getItem('sblx').getValue(),
                        'dygocode': mstform.getItem('phid_org').getValue()
                    } //帮助对应过滤条件，帮助过滤字段等于表单字段  
                });
                help.showHelp();
                help.on('helpselected', function (obj) { //通用帮助选择更新
                    console.log("obj:", obj);
                    var arr = new Array(); //定义arr为数组
                    for (i = 0; i < obj.data.length; i++) { //for循环更新单据体数据 *obj.data.length表示选中帮助窗口的条数
                        console.log("obj.data[i].data.zl_EXName:", obj.data[i].data.zl_EXName);
                        arr.push({
                            flag: obj.data[i].data.phid,
                            zcbm: obj.data[i].data.zcbm, //arr数组推送单据体数据
                            zcmc: obj.data[i].data.zcmc, //选择通用帮助赋值单据体字段 zymc
                            ggxh: obj.data[i].data.ggxh, //选择通用帮助赋值单据体字段 dggxh
                            zczl: obj.data[i].data.zczl, //资产主类别 
                            zczl_EXName: obj.data[i].data.zl_EXName,
                            zcfl: obj.data[i].data.zcfl, //资产辅类别	
                            zcfl_EXName: obj.data[i].data.fl_EXName,
                            //msunit_name: obj.data[i].data.msname, 									
                            gocode: obj.data[i].data.gocode, //调出管理组织		
                            gocode_EXName: obj.data[i].data.dcgzz,
                            dcdept: obj.data[i].data.dcdept, //调出管理部门
                            dcdept_EXName: obj.data[i].data.dcgbm,
                            dsocode: obj.data[i].data.dsocode, //调出使用组织								
                            dsocode_EXName: obj.data[i].data.dcszz,
                            dsdept: obj.data[i].data.dsdept, //调出使用部门
                            dsdept_EXName: obj.data[i].data.dcsbm,
                            dygocode: obj.data[i].data.gocode, //调入管理组织
                            dygocode_EXName: obj.data[i].data.dygzz,
                            dygdept: obj.data[i].data.dygdept, //调入管理部门
                            dygdept_EXName: obj.data[i].data.dygbm,
                            dysocode: obj.data[i].data.dysocode, //调入使用组织								
                            dysocode_EXName: obj.data[i].data.dyszz,
                            dysdept: obj.data[i].data.dysdept, //调入使用部门
                            dysdept_EXName: obj.data[i].data.dysbm,
                            zclyfs: obj.data[i].data.zclyfs, //资产来源方式
                            zclyfs_EXName: obj.data[i].data.ly_EXName,
                            ccbh: obj.data[i].data.ccbh,
                            cph: obj.data[i].data.cph,
                            jldw: obj.data[i].data.jldw, //计量单位
                            jldw_EXName: obj.data[i].data.msname,
                            yyys: obj.data[i].data.yyys,
                            yz: obj.data[i].data.yz,
                            bhsje: obj.data[i].data.yz,
                            sl: obj.data[i].data.sl,
                            se: obj.data[i].data.se,
                            jz: obj.data[i].data.jz,
                            zjnx: obj.data[i].data.zjnx,
                            zjqs: obj.data[i].data.zjqs,
                            ljzj: obj.data[i].data.ljzj,
                            qyrq: obj.data[i].data.qyrq,
                            czsr: obj.data[i].data.czsr,
                            jzzb: obj.data[i].data.jzzb

                        });
                        //console.log(obj.data[i].data.user_code);//arr数组推送单据体数据事件结束 ｝
                    }; //for循环结束 ｝
                    dstore.insert(dstore.getCount(), arr); //单据体获取的数值插入单据体
                });

            }
            //调出
            if (mstform.getItem('dbfs').getValue() == 2) {
                //引用资产卡片加过滤
                console.log("mstform.getItem('sblx').getValue():", mstform.getItem('sblx').getValue());
                console.log("mstform.getItem('phid_org').getValue():", mstform.getItem('phid_org').getValue());
                var help = Ext.create('Ext.ng.MultiRichHelp', { //创建通用帮助多选
                    valueField: 'phid', //指定代码列
                    displayField: 'zcbm', //指定名称列
                    helpid: 'yy_zckp', //指定帮助ID
                    ORMMode: false, //通用写法
                    outFilter: {
                        'zclx': mstform.getItem('sblx').getValue(),
                        'yy_zckp.ocode': mstform.getItem('phid_org').getValue()
                    } //帮助对应过滤条件，帮助过滤字段等于表单字段  
                }); //创建通用帮助多选事件结束 ｝
                help.showHelp();
                help.on('helpselected', function (obj) { //通用帮助选择更新
                    var arr = new Array(); //定义arr为数组
                    for (i = 0; i < obj.data.length; i++) { //for循环更新单据体数据 *obj.data.length表示选中帮助窗口的条数
                        arr.push({
                            zcbm: obj.data[i].data.zcbm, //arr数组推送单据体数据
                            zcmc: obj.data[i].data.zcmc, //选择通用帮助赋值单据体字段 zymc
                            ggxh: obj.data[i].data.ggxh, //选择通用帮助赋值单据体字段 dggxh
                            zczl: obj.data[i].data.xczlb, //资产主类别 
                            zczl_EXName: obj.data[i].data.zlb_name,
                            zcfl: obj.data[i].data.zcflb, //资产辅类别	
                            zcfl_EXName: obj.data[i].data.c_name,
                            //msunit_name: obj.data[i].data.msname, 									
                            gocode: obj.data[i].data.phid_org, //管理组织		
                            gocode_EXName: obj.data[i].data.gname,
                            dcdept: obj.data[i].data.deptid, //管理部门
                            dcdept_EXName: obj.data[i].data.gdname,
                            dsocode: obj.data[i].data.user_ocode, //使用组织								
                            dsocode_EXName: obj.data[i].data.oname,
                            dsdept: obj.data[i].data.deptid2, //使用部门
                            dsdept_EXName: obj.data[i].data.deptname,
                            zclyfs: obj.data[i].data.zclyfs, //资产来源方式
                            zclyfs_EXName: obj.data[i].data.ly_name,
                            ccbh: obj.data[i].data.ccbh,
                            cph: obj.data[i].data.car_cph,
                            jldw: obj.data[i].data.jldw, //计量单位
                            jldw_EXName: obj.data[i].data.msname,
                            yyys: obj.data[i].data.yyqs,
                            yz: obj.data[i].data.yz,
                            bhsje: obj.data[i].data.yz,
                            sl: obj.data[i].data.tax,
                            se: obj.data[i].data.amt_tax,
                            jz: obj.data[i].data.jz_amt,
                            zjnx: obj.data[i].data.zjnx,
                            zjqs: obj.data[i].data.zjqs,
                            ljzj: obj.data[i].data.ljzj,
                            qyrq: obj.data[i].data.qyrq
                            //org_id1deptid2 
                        });
                        //console.log(obj.data[i].data.user_code);//arr数组推送单据体数据事件结束 ｝
                    }; //for循环结束 ｝
                    dstore.insert(dstore.getCount(), arr); //单据体获取的数值插入单据体
                });

            }
        })
        console.log('dygdept_EXName==============>', dgrid.getColumn('dygdept_EXName'))
        //表体调入部门控制
        dgrid.getColumn('dygdept_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行
            var cc = data[0].get('dygocode'); //获取当前选中行某个字段值
            //var cc = mstform.getItem('zclx').getValue();
            //console.log(cc);
            dgrid.getColumn('dygdept_EXName').getEditor().setOutFilter({
                'parent_orgid': cc
            });
        })

        //调入使用部门控制
        dgrid.getColumn('dysdept_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
            var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行
            var cc = data[0].get('dysocode'); //获取当前选中行某个字段值
            //var cc = mstform.getItem('zclx').getValue();
            //console.log(cc);
            dgrid.getColumn('dysdept_EXName').getEditor().setOutFilter({
                'parent_orgid': cc
            });
        })
    }

}

function attachReturnExt(key, value) {
    var mstform = Ext.getCmp('p_form0000000236_m');
    if (key == 'closeNG3Container') {
        if (value == '') {
            mstform.getItem('num_fj').setValue();
        } else {
            var res = Ext.decode(value);
            mstform.getItem('num_fj').setValue(res.length);
        }
    } else {
        return;
    }
}
