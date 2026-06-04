function allReadyEdit() {


    if (otype == $Otype.VIEW) {
        var mstform = Ext.getCmp('p_form0000000238_m');
        var dgrid = Ext.getCmp('p_form0000000238_d');
        var dstore = dgrid.store;
        var Toolbar = Ext.getCmp('toolbar');

        Toolbar.insert(1, {
            itemId: "push",
            text: "浪潮推送",
            width: this.itemWidth,
            iconCls: "icon-New"
        });
        Toolbar.insert(2, {
            itemId: "changeStatus",
            text: "更改状态",
            width: this.itemWidth,
            iconCls: "icon-New"
        });
        //王振猛提示您，此代码请勿注释。
        Toolbar.items.get('changeStatus').on('click', function () {
            console.log("dstore:", dstore);
            var Creator = mstform.getItem("phid_fill_psn").getValue();
            if (Creator != $appinfo.userID) {
                Ext.MessageBox.alert(Lang.Notes || '提示', "只有创建人才能更改状态。", function () { });
                return false;
            } else if (mstform.getItem("wf_flag").getValue() != 2) {
                Ext.MessageBox.alert(Lang.Notes || '提示', "单据未审批，无法更改状态。", function () { });
                return false;
            } else if (mstform.getItem("u_ggbz").getValue() == '1') {
                Ext.MessageBox.alert(Lang.Notes || '提示', "状态已更改，无法重复更改！", function () { });
                return false;
            } else {
                mstform.getItem("u_ggbz").setValue('1');
                Ext.MessageBox.alert(Lang.Notes || '提示', "状态更改完毕！", function () {
                });
            }
            const rows = dstore.data.items
            console.log("rows:", rows);
            rows.forEach(row => {
                console.log("zcbh:", row.data.zcbh);
                execServer('xgkpzt', {
                    'zcbm': row.data.zcbh
                }, function (res) {
                });
            });


        })

        Toolbar.items.get('push').on('click', function () {
            Ext.Ajax.request({
                method: 'get',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: "http://172.20.65.5:30599/new_esey/lcApi/pushZccz?phid=" + busid,
                async: false, //同步请求
                disableCaching: false, // 添加这行来阻止_dc参数
                success: function (response) {
                    window.wait = false;
                    var resdata = JSON.parse(response.responseText);
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
                    // myMask.hide();
                    window.wait = false;
                    console.log("response:", response);
                    var resdata = JSON.parse(response.responseText);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    Ext.MessageBox.alert(Lang.Notes || '提示', message);
                }
            });
        });
    }
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        //获取容器
        var mstform = Ext.getCmp('p_form0000000238_m');
        var dgrid = Ext.getCmp('p_form0000000238_d');
        var dstore = dgrid.store;
        var Toolbar = Ext.getCmp('toolbar');
        var a = 0;
        //mstform.getItem('checkpsn').setVisible(false);
        //mstform.getItem('jtbz').setVisible(false);
        mstform.getItem('jtbz').setValue('0');
        dgrid.hideColumn('lyzj', true);
        dgrid.hideColumn('yzje', true);
        dgrid.hideColumn('yyys', true);




        //设备类型选择结束变为只读    
        mstform.getItem('zclx').addListener('itemchanged', function () {
            mstform.getItem('zclx').userSetReadOnly(true);
        });
        //部门填充  $appinfo.userID:登录用户phid;
        execServer('p_form0000000238_zz', {
            'logid': $appinfo.userID
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                mstform.getItem('deptid').setValue(data[0].extendObjects.phid);
                BatchBindCombox([mstform.getItem('deptid')]);
            }
            //mstform.getItem('title').setValue(data[0].deptname +'资产调拨单');
        });
        //单据状态为新增、修改时执行（单据体同时增加多行功能）*单据状态事件可并行写入多个
        Toolbar.insert(1, {
            itemId: "yy",
            text: "引用资产卡片",
            width: this.itemWidth,
            iconCls: "icon-AddRow"
        });
        Toolbar.insert(3, {
            itemId: "copy",
            text: "复制必填项",
            width: this.itemWidth,
            iconCls: "icon-Copy"
        });
        Toolbar.insert(4, {
            itemId: "jt",
            text: "本月是否已计提",
            width: this.itemWidth,
            iconCls: "folder_go"
        }); /*在菜单栏第一个按钮位置增加名称为 yy 显示为 增行 的按钮 	
		icon-AddRow图标在该目录下找\i8MidServer\NGWebSite\NG3Resource\icons\icon.css*/
        Toolbar.items.get('yy').on('click', function () { //单击增行按钮触发事件
            //var mstform = Ext.getCmp('p_form0000000238_m');
            if (Ext.isEmpty(mstform.getItem('zclx').getValue()) ||
                Ext.isEmpty(mstform.getItem('phid_org').getValue())) { //if(isEmpty判断返回字段是否为空，空返回值为真）
                Ext.Msg.alert('提示', '请先填写资产类型、单位名称！'); //显示提示信息
                return false; //返回假
            }; //if结束 ｝
            console.log("mstform.getItem('phid_org').getValue():", mstform.getItem('phid_org').getValue());
            console.log("mstform.getItem('zclx').getValue():", mstform.getItem('zclx').getValue());
            var help = Ext.create('Ext.ng.MultiRichHelp', { //创建通用帮助多选
                valueField: 'phid', //指定代码列
                displayField: 'zcmc', //指定名称列
                helpid: 'zckp_yy', //指定帮助ID
                ORMMode: false, //通用写法
                outFilter: {
                    'phid_org': mstform.getItem('phid_org').getValue(),
                    'zclx': mstform.getItem('zclx').getValue()
                } //帮助对应过滤条件，帮助过滤字段等于表单字段  
            }); //创建通用帮助多选事件结束 ｝
            help.showHelp(); //展示help帮助框
            help.on('helpselected', function (obj) { //通用帮助选择更新
                var arr = new Array(); //定义arr为数组
                for (i = 0; i < obj.data.length; i++) { //for循环更新单据体数据 *obj.data.length表示选中帮助窗口的条数
                    console.log("引用的资产卡片的data数据：======>", obj.data[i]);
                    arr.push({ //arr数组推送单据体数据
                        zcbh: obj.data[i].data.zcbm, //选择通用帮助赋值单据体字段 zymc
                        zcmc: obj.data[i].data.zcmc, //选择通用帮助赋值单据体字段 dggxh
                        ggxh: obj.data[i].data.ggxh,
                        zczlv: obj.data[i].data.xczlb,
                        zczlv_EXName: obj.data[i].data.c_name,
                        jldw: obj.data[i].data.jldw, //选择通用帮助赋值单据体帮助字段 msunit 键值						
                        jldw_EXName: obj.data[i].data.msname, //选择通用帮助赋值单据体帮助字段 msunit_name 显示值
                        ccbh: obj.data[i].data.ccbh,
                        car_nb: obj.data[i].data.car_cph,
                        nl: obj.data[i].data.car_nl,
                        syztq: obj.data[i].data.syzt,
                        jz: obj.data[i].data.jz_amt,
                        yz: obj.data[i].data.yz,
                        ljzj: obj.data[i].data.ljzj,
                        qyrq: obj.data[i].data.qyrq,
                        jtbz: 0,
                        yzje: obj.data[i].data.yzje,
                        lyzj: obj.data[i].data.phid,
                        yyys: obj.data[i].data.yyqs,
                        czsr: null,
                        remarks: obj.data[i].data.remarks

                    }); //arr数组推送单据体数据事件结束 ｝
                }; //for循环结束 ｝
                dstore.insert(dstore.getCount(), arr); //单据体获取的数值插入单据体
            }); //通用帮助选择更新事件结束 ｝

        }); //单击增力士按钮触发事件结束 ｝
        //复制
        Toolbar.items.get('copy').on('click', function () {
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            var zcjsfs = a[0].get('zcjsfs');
            var zcjsfs_name = a[0].get('zcjsfs_EXName');
            var syzth = a[0].get('syzth');
            var czsr = a[0].get('czsr');
            var jzda = a[0].get('jzda');
            var jzda_name = a[0].get('jzda_EXName');
            for (i = 1; i < a.length; i++) {
                a[i].set('zcjsfs', zcjsfs);
                a[i].set('zcjsfs_EXName', zcjsfs_name);
                a[i].set('syzth', syzth);
                a[i].set('czsr', czsr);
                a[i].set('jzda_EXName', jzda_name);
                a[i].set('jzda', jzda);
            }
        })
        //计提
        Toolbar.items.get('jt').on('click', function () {

            Ext.MessageBox.confirm('提示', '本月是否已计提？', function (e) {
                if (mstform.getItem('zclx').getValue() != 4) {
                    if (e == "yes") {

                    } else {
                        mstform.getItem('jtbz').setValue('1');
                    }
                } else {
                    Ext.Msg.alert('提示', '无形资产处置本月无需计提')
                }

            });

        })
    } //单据状态判断执行事件结束｝ 
}
//获取附件张数
function attachReturnExt(key, value) {
    var mstform = Ext.getCmp('p_form0000000238_m');
    if (key == 'closeNG3Container') {
        if (value == '') {
            mstform.getItem('fj_num').setValue();
        } else {
            var res = Ext.decode(value);
            mstform.getItem('fj_num').setValue(res.length);
        }
    } else {
        return;
    }
}

//保存前计算合计
function beforeSaveEdit() {
    var mstform = Ext.getCmp('p_form0000000238_m');
    var dgrid = Ext.getCmp('p_form0000000238_d');
    var dstore = dgrid.store;
    var a = 0;
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        Ext.Array.each(dstore.data.items, function (record) {
            a += Ext.Number.from(record.get('jzje'), 0)
            mstform.getItem('jzjehj').setValue(a);

        });
    }
    return true;
}

