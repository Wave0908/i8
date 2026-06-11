//以下代码不要写在任何函数中
Ext.Ajax.on('requestcomplete', function (self, response, options) {

    if ('/PMS/PMM/KcBill/WriteDownSave' !== options.url) return;

    let resp = Ext.JSON.decode(response.responseText);

    if (resp.Status !== 'success' || !Array.isArray(resp.KeyCodes) || resp.KeyCodes.length === 0) return;

    let ids = resp.KeyCodes; //冲减生成的所与单据的主键集合

    console.log(ids);

});
function AllReady() {

    var mstform = Ext.getCmp('KC_INKZICRK_Head');
    var Toolbar = CommButtonView.toolbar;
    var dgrid = Ext.getCmp('KC_INKZICRK_Body');
    dgrid.setMustInputCol('Batchno', false);
    Ext.getCmp('toolbar').get('addrow').setVisible(true);
    console.log(dgrid);
    if (otype == $Otype.VIEW) {
        if (!Ext.isEmpty(Toolbar)) {
            Toolbar.insert(18, {
                itemId: "TS",
                text: "推送浪潮",
                width: this.itemWidth,
                iconCls: "iconfont iconcreate",
                handler: function () {
                    var ChkFlg = mstform.queryById('ChkFlg').getValue();
                    var Tempflg = mstform.queryById('Tempflg').getValue();
                    var user_istbinspur = mstform.queryById('user_istbinspur').getValue();
                    console.log("ChkFlg", ChkFlg);
                    console.log("Tempflg", Tempflg);
                    console.log("user_istbinspur", user_istbinspur);
                    if (Ext.isEmpty(ChkFlg) || ChkFlg == '0') {
                        Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
                        return false;
                    }
                    if (Tempflg == '3') {
                        Ext.Msg.alert('提示', '采购入库只推送结存暂估，和暂估冲减单，不推送实价单');
                        return false;
                    }
                    if (user_istbinspur == 1 || user_istbinspur == 2 || user_istbinspur == 3) {
                        Ext.Msg.alert('提示', '当前单据已推送浪潮系统，请在浪潮系统中删除后,在重新推送');
                        return false;
                    }
                    var loadMarsk = new Ext.LoadMask(document.body, {
                        msg: '正在调用接口...',
                        removeMask: true
                    });

                    Ext.Ajax.request({
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/json;charset=UTF-8',
                        url: "http://172.20.65.5:30599/new_esey/lcApi/pushRkxx?phid=" + busid,
                        async: false, //同步请求
                        disableCaching: false, // 添加这行来阻止_dc参数
                        success: function (response) {
                            loadMarsk.hide();
                            window.wait = false;
                            var resdata = JSON.parse(response.text);
                            var status = resdata["status"];
                            var message = resdata["message"];
                            if (status == "success") {
                                Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function () { });
                            } else {
                                Ext.MessageBox.alert(Lang.Notes || '提示', message, function () { });
                            }
                        },
                        failure: function (response, opts) {
                            loadMarsk.hide();
                            window.wait = false;
                            var resdata = JSON.parse(response.text);
                            var message = resdata["message"];
                            Ext.MessageBox.alert(Lang.Notes || '提示', message);
                        }
                    });
                }
            });
        }

    }
    if (otype == $Otype.VIEW) {
        Toolbar.items.get('TS').on('click', function () {
            var user_lcglzz = mstform.getItem('user_lcglzz').value;
            var user_lcglmb = mstform.getItem('user_lcglmb').value;
            var user_lcywdy = mstform.getItem('user_lcywdy').value;
            var user_mnemcodeinaccdepart = mstform.getItem('user_mnemcodeinaccdepart').value;
            if (user_lcglzz && user_lcglmb && user_lcywdy && user_mnemcodeinaccdepart) {
                return true;
            } else {
                Ext.Msg.alert('提示', '缺少浪潮相关字段，不可推送');
                return false;
            }
        });
    }


    if (Ext.isEmpty(dgrid)) {
        return false;
    }
    var dstore = dgrid.store;
    //获取table页
    var tabPanel = Ext.getCmp('tabPanel');
    mstform.getItem('KCtype').setValue(0);
    mstform.getItem('KCtype').setVisible(false);

    console.log("Ext.getCmp('kcbillpanel').isWriteDown:", Ext.getCmp('kcbillpanel').isWriteDown);   //1冲减界面，0录入界面


    mstform.getItem('Billno').addListener('change', function () {
        if (Ext.getCmp('toolbar')) Ext.getCmp('toolbar').get('addrow').setVisible(false);
    })

    // if (otype == $Otype.ADD || otype == $Otype.EDIT) {  //2026-01-09 增加edit
    //     dstore.on('datachanged', function (dstore) {
    //         //单据体增行更新事件
    //         for (i = 0; i < dstore.getCount(); i++) {
    //             var record = dstore.getAt(i);
    //             record.set('user_sytxbl', 1);
    //         }
    //     })
    // }

    const impbtn = Ext.getCmp('toolbar')?.get('imp');
    if (impbtn) {
        impbtn.on('beforeclick', function () {                          //点击按钮检测事件
            if (Ext.isEmpty(mstform.getItem('user_wllb').value)) {
                Ext.Msg.alert('提示', '请选择物料类别！');
                return false;
            };
        });
    }
    /*根据不含税金额明细汇总给主表 和发票税额总额start*/
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        // Ext.getCmp('toolbar').get('addrow').on('click',function(){
        // 	var PhidContractno  = mstform.getItem('PhidContractno').getValue();
        // 	if(!PhidContractno){
        // 		Ext.Msg.alert('提示', '请选择合同编码');
        // 		return false;
        // 	}
        // });

    }
    /*这一整段是调差，增加TAB，其他代码在此段之外去写start*/
    //定义model
    var model = Ext.define('pcm3_cnt_wlmx_d', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'phid',
            type: 'string',
            mapping: 'phid'
        },
        {
            name: 'mstphid',
            type: 'string',
            mapping: 'mstphid'
        },
        {
            name: 'kxxz',
            type: 'double',
            mapping: 'kxxz'
        },
        {
            name: 'kxxz_name',
            type: 'string',
            mapping: 'kxxz_name'
        },
        {
            name: 'cgje',
            type: 'double',
            mapping: 'cgje'
        },
        {
            name: 'yfkhxje',
            type: 'double',
            mapping: 'yfkhxje'
        },
        {
            name: 'yfkhxhje',
            type: 'double',
            mapping: 'yfkhxhje'
        },
        {
            name: 'remark',
            type: 'string',
            mapping: 'remark'
        }
        ]
    });
    //定义store
    var store = Ext.create('Ext.ng.JsonStore', {
        model: model
    });

    if (otype != $Otype.ADD) {
        //获取主表的phid
        var mstphid = busid;
        console.log("busid:", busid);
        execServer('pcm3_cnt_wlmx_d', {
            'mstphid': mstphid
        }, function (res) {
            if (res.count == 0) return;
            const data = JSON.parse(res.data);
            if (data.length == 0) return;
            let dataArr = []
            for (let i = 0; i < data.length; i++) {
                dataArr.push({
                    "phid": data[i].extendObjects.phid,
                    "mstphid": data[i].extendObjects.mstphid,
                    "kxxz": data[i].extendObjects.kxxz,
                    "cgje": data[i].extendObjects.cgje,
                    "yfkhxje": data[i].extendObjects.yfkhxje,
                    "yfkhxhje": data[i].extendObjects.yfkhxhje,
                    "remark": data[i].extendObjects.remark,
                    "kxxz_name": data[i].extendObjects.kxxz_name
                });
            }
            if (dataArr.length > 0) {
                store.removeAll();
                store.loadData(dataArr);
            }
        });
    }
    /*这一整段是调差，增加TAB，其他代码在此段之外去写end*/

    /*插入往来明细表start*/
    var grid = Ext.create('Ext.ng.GridPanel', {
        title: '往来明细',
        id: 'pcm3_cnt_wlmx_d',
        region: 'south',
        stateful: false,
        isInit: true,
        features: [{
            ftype: 'summary'
        }],
        stateId: 'pcm3_cnt_wlmx_d', //所有单据不允许重复
        store: store,
        buskey: 'phid', //对应的业务表主键属性
        otype: otype,
        columnLines: true,
        tbar: [{
            xtype: 'button',
            itemId: 'addrow',
            text: '增行',
            iconCls: "icon-AddRow"
        },
        {
            xtype: 'button',
            itemId: 'delrow',
            text: '删行',
            iconCls: "icon-DeleteRow"
        }
        ],
        columns: [Ext.create('Ext.grid.RowNumberer', {
            text: '序号',
            width: 45
        }), {
            header: Lang.pcm3_cnt_wlmx_d_phid || '主键',
            dataIndex: 'phid',
            itemId: 'phid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_wlmx_d_mstphid || '主表主键',
            dataIndex: 'mstphid',
            itemId: 'mstphid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_wlmx_d_kxxz || '款项性质',
            dataIndex: 'kxxz_name',
            itemId: 'kxxz',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'gs_mc',
                listFields: 'phid,gs_mc',
                listHeadTexts: '代码,名称',
                helpid: 'cgrk_kxxz',
                needBlankLine: true,
                isInGrid: true,
                ORMMode: false,
                emptyText: '',
                mustInput: false,
                listeners: {
                    helpselected: function (obj) {
                        var data = grid.getSelectionModel().getSelection();
                        var oriValue = data[0].get('kxxz');
                        var rec = obj.data;
                        if (rec.constructor == Array) {
                            rec = obj.data[0].data;
                        }
                        data[0].set('kxxz', rec.phid);
                        data[0].set('kxxz_name', rec.gs_mc);
                    }
                }
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d_cgje || '采购金额',
            dataIndex: 'cgje',
            itemId: 'cgje',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d_yfkhxje || '预付款核销金额',
            dataIndex: 'yfkhxje',
            itemId: 'yfkhxje',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d_yfkhxhje || '预付款核销后金额',
            dataIndex: 'yfkhxhje',
            itemId: 'yfkhxhje',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },

        {
            header: Lang.pcm3_cnt_wlmx_d_remark || '备注',
            dataIndex: 'remark',
            itemId: 'remark',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngText',
                allowBlank: true
            }
        }
        ],
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ]
    });
    //根据tab页添加grid
    tabPanel.add(grid);

    var dgrid1 = Ext.getCmp('pcm3_cnt_wlmx_d');
    var dstore1 = dgrid1.store;
    if (otype == $Otype.VIEW) {
        grid.queryById('addrow').hide();
        grid.queryById('delrow').hide();
    }
    grid.queryById('addrow').on('click', function () {
        //store.insert(store.getCount(), [[, , , , 0, 0, 0,]]); //插入空直接写{}即可
        store.add({
            'phid': generateId(store.getCount() + 1).toString(),
            'mstphid': busid
        });
    });

    grid.queryById('delrow').on('click', function () {
        var data = grid.getSelectionModel().getSelection();
        Ext.Array.each(data, function (record) {
            store.remove(record);
        });
    });
    /*插入往来明细表end*/

    if (dgrid) { } else {
        var dgrid = Ext.getCmp('KC_INKZICRK_Body');
    }
    var dstore = dgrid.store;

    /*采购入库 价格类型为实价 发票号必填 价格类型为暂估，发票类型非必填start*/
    console.log("mstform.getItem('Tempflg').getValue():", mstform.getItem('Tempflg').getValue());
    if (mstform.getItem('Tempflg').getValue() == '3') {
        mstform.getItem('Invoiceno').userSetMustInput(true);
        mstform.getItem('user_bhsje_amt').userSetMustInput(true);
        mstform.getItem('user_fpse_amt').userSetMustInput(true);
    } else {
        mstform.getItem('Invoiceno').userSetMustInput(false);
        mstform.getItem('user_bhsje_amt').userSetMustInput(false);
        mstform.getItem('user_fpse_amt').userSetMustInput(false);
    }
    mstform.getItem('Tempflg').addListener('helpselected', function () {
        if (mstform.getItem('Tempflg').getValue() == '3') {
            mstform.getItem('Invoiceno').userSetMustInput(true);
            mstform.getItem('user_bhsje_amt').userSetMustInput(true);
            mstform.getItem('user_fpse_amt').userSetMustInput(true);
        } else {
            mstform.getItem('Invoiceno').userSetMustInput(false);
            mstform.getItem('user_bhsje_amt').userSetMustInput(false);
            mstform.getItem('user_fpse_amt').userSetMustInput(false);
        }
    });

    if (Ext.getCmp('kcbillpanel').isWriteDown == '1') {
        mstform.getItem('Invoiceno').userSetMustInput(true);
    }

    //菜单栏增加复制功能
    if (!Ext.isEmpty(Toolbar)) {
        Toolbar.insert(1, {
            itemId: "copy",
            text: "复制",
            width: this.itemWidth,
            iconCls: "icon-New"
        });

        Toolbar.items.get('copy').on('click', function () {
            //获取表体数据
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            var dzyhp = a[0].get('user_dzyhp');
            var user_cllb = a[0].get('user_cllb');
            var user_cllb_EXName = a[0].get('user_cllb_EXName');
            var sfzp = a[0].get('user_sfzp');
            var wg = a[0].get('user_wgzljy');
            var mp = a[0].get('user_mpjy');
            var zz = a[0].get('user_zljymc');
            var ys = a[0].get('user_zljyys');
            var cfdd = a[0].get('user_cfdd');

            for (var i = 1; i < a.length; i++) {
                a[i].set('user_wgzljy', wg);
                a[i].set('user_mpjy', mp);
                a[i].set('user_zljymc', zz);
                a[i].set('user_zljyys', ys);
                a[i].set('user_dzyhp', dzyhp);
                a[i].set('user_sfzp', sfzp);
                a[i].set('user_cfdd', cfdd);
                a[i].set('user_cllb', user_cllb);
                a[i].set('user_cllb_EXName', user_cllb_EXName);
            }
        });
    }
    /*存放地点根据是否低值易耗品为是的存放地点必输 不是 不必输start*/
    dstore.addListener('add', function (store, records, index, eOpts) {
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1); //获取表体的数据		
        var dzyhp = a[0].get('user_dzyhp');
        if (dzyhp == '1') {
            //存放地点设置为必输
            dgrid.setMustInputCol('user_cfdd', true);
        } else if (dzyhp == '2') {
            //存放地点设置为非必输
            dgrid.setMustInputCol('user_cfdd', false);
        }
    });
    /*存放地点根据是否低值易耗品为是的存放地点必输 不是 不必输end*/

    /*采购入库单据编码根据项目名称自动生成end*/

    /*入库类型字段选择前触发隐藏甲供start*/
    mstform.getItem('user_rklb').addListener('beforetriggerclick', function () {
        mstform.getItem('user_rklb').setClientSqlFilter("fg_simple_data.phid <>  '224191231000034' ");
    });
    /*入库类型字段选择前触发隐藏甲供end*/

    if (otype != $Otype.VIEW) {
        mstform.getItem('PhidTrProj').addListener('helpselected', function () {
            var PhidTrProj = mstform.getItem('PhidTrProj').getValue()
            console.log("PhidTrProj:", PhidTrProj);
            mstform.getItem('user_lcglzz').setValue('');
            mstform.getItem('user_lcglmb').setValue('');
            mstform.getItem('user_lcywdy').setValue('');
            mstform.getItem('user_mnemcodeinaccdepart').setValue('');
            execServer('xmxxdcglzssmb', {
                'phid': PhidTrProj
            }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    mstform.getItem('user_lcglzz').setValue(data[0].extendObjects.user_lcglzz);
                    mstform.getItem('user_lcglmb').setValue(data[0].extendObjects.user_lcssxmb);
                    BatchBindCombox([mstform.getItem('user_lcglzz')]);
                    BatchBindCombox([mstform.getItem('user_lcglmb')]);
                } else {
                    Ext.Msg.alert('提示', '项目信息没有管理组织和所属项目部');
                    return false;
                }
            });
            var user_lcglmb = mstform.getItem('user_lcglmb').getValue();
            if (user_lcglmb != '' && user_lcglmb != null) {
                execServer('ssxmb_bmywdy', {
                    'dept': user_lcglmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    if (res.count > 0) {
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_lcywdy) {
                                mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                mstform.getItem('user_lcywdy').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                    } else {
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        mstform.getItem('user_lcywdy').setValue(null);
                        return false;
                    }
                });

                execServer('ssxmb_zjm', {
                    'dept': user_lcglmb
                }, function (res) {
                    console.log("user_lcglmb:", user_lcglmb);
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    if (res.count > 0) {
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects
                                    .user_mnemcodeinaccdepart);
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                            return false;
                        }
                    } else {
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                        return false;
                    }
                });
            }
        });

        /*管理组织选择后清空所属项目部start*/
        mstform.getItem('PhidTrProj').addListener('helpselected', function () {
            var PhidTrProj = mstform.getItem('PhidTrProj').getValue()
            console.log("PhidTrProj:", PhidTrProj);
            mstform.getItem('user_lcglzz').setValue('');
            mstform.getItem('user_lcglmb').setValue('');
            mstform.getItem('user_lcywdy').setValue('');
            mstform.getItem('user_mnemcodeinaccdepart').setValue('');
            execServer('xmxxdcglzssmb', {
                'phid': PhidTrProj
            }, function (res) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    mstform.getItem('user_lcglzz').setValue(data[0].extendObjects.user_lcglzz);
                    mstform.getItem('user_lcglmb').setValue(data[0].extendObjects.user_lcssxmb);
                    BatchBindCombox([mstform.getItem('user_lcglzz')]);
                    BatchBindCombox([mstform.getItem('user_lcglmb')]);
                } else {
                    Ext.Msg.alert('提示', '项目信息没有管理组织和所属项目部');
                    return false;
                }
            });

            var user_lcglmb = mstform.getItem('user_lcglmb').getValue();
            if (user_lcglmb != '' && user_lcglmb != null) {
                execServer('ssxmb_bmywdy', {
                    'dept': user_lcglmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    if (res.count > 0) {
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_lcywdy) {
                                mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                mstform.getItem('user_lcywdy').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                    } else {
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        mstform.getItem('user_lcywdy').setValue(null);
                        return false;
                    }
                });

                execServer('ssxmb_zjm', {
                    'dept': user_lcglmb
                }, function (res) {
                    console.log("user_lcglmb:", user_lcglmb);
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("data:", data);
                    if (res.count > 0) {
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects
                                    .user_mnemcodeinaccdepart);
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                            return false;
                        }
                    } else {
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                        return false;
                    }
                });
            }
        });
        /*管理组织选择后清空所属项目部end*/

        /*管理组织选择后清空所属项目部start*/
        mstform.getItem('user_lcglzz').addListener('helpselected', function () {
            mstform.getItem('user_lcglmb').setValue();
            mstform.getItem('user_lcywdy').setValue();
            mstform.getItem('user_mnemcodeinaccdepart').setValue();
        });
        /*管理组织选择后清空所属项目部end*/
        mstform.getItem('user_lcglmb').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
            var zz = mstform.getItem('user_lcglzz').getValue();
            if (zz) {
                mstform.getItem('user_lcglmb').setOutFilter({
                    parent_orgid: zz
                }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
            }
        });

        /*项目所属部选择后带出浪潮业务单元start*/
        mstform.getItem('user_lcglmb').addListener('helpselected', function () {
            var user_lcglmb = mstform.getItem('user_lcglmb').getValue();
            if (user_lcglmb != '' && user_lcglmb != null) {
                execServer('ssxmb_bmywdy', {
                    'dept': user_lcglmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("项目所属部选择后带出浪潮业务单元:", data);
                    if (res.count > 0) {
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_lcywdy) {
                                mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                mstform.getItem('user_lcywdy').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                    } else {
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        mstform.getItem('user_lcywdy').setValue(null);
                        return false;
                    }
                });

                execServer('ssxmb_zjm', {
                    'dept': user_lcglmb
                }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    console.log("项目所属部选择后带出浪潮助记码:", data);
                    if (res.count > 0) {
                        if (data.length == 1) {
                            if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects
                                    .user_mnemcodeinaccdepart);
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                            mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                            return false;
                        }
                    } else {
                        Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                        mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                        return false;
                    }
                });
            }
        });
        /*项目所属部选择后带出浪潮业务单元end*/
    }

    var pc = mstform.getItem('PhidTrProj').getValue()
    if (!Ext.isEmpty(pc) && otype == $Otype.ADD) {
        mstform.getItem('user_lcywdy').setValue(null);
        mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
        execServer('gjxmxx_dcssxmb', {
            'phid': pc
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (res.count > 0) {
                if (data[0].extendObjects.user_pc_dept) {
                    execServer('ssxmb_bmywdy', {
                        'dept': data[0].extendObjects.user_pc_dept
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (res.count > 0) {
                            if (data.length == 1) {
                                if (data[0].extendObjects.user_lcywdy) {
                                    mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                                } else {
                                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                    mstform.getItem('user_lcywdy').setValue(null);
                                    return false;
                                }
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                                mstform.getItem('user_lcywdy').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                            mstform.getItem('user_lcywdy').setValue(null);
                            return false;
                        }
                    });

                    execServer('ssxmb_zjm', {
                        'dept': data[0].extendObjects.user_pc_dept
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (res.count > 0) {
                            if (data.length == 1) {
                                if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                                    mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects
                                        .user_mnemcodeinaccdepart);
                                } else {
                                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                                    mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                                    return false;
                                }
                            } else {
                                Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                                return false;
                            }
                        } else {
                            Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                            mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
                            return false;
                        }
                    });
                }
            } else {
                Ext.Msg.alert('提示', '项目信息所属项目部不存在');
                return false;
            }
        });
    }

    mstform.getItem('user_wllb').addListener('helpselected', function () { //帮助窗口打开前事件
        dstore.removeAll(); //清除单据体内所有数据
    });

    mstform.getItem('user_ywlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        mstform.getItem('user_ywlx').setClientSqlFilter(" zd='业务类型' and djmc='物资点验单' ");
    });

    dgrid.getColumn('user_cllb_EXName').getEditor().addListener('beforetriggerclick', function () {
        dgrid.getColumn('user_cllb_EXName').getEditor().setClientSqlFilter(
            " u_nm  in ( select YWLBCLLBSET_CLID from cllbdzb where BZZXYWLB_LBMC='采购入库' group by YWLBCLLBSET_CLID ) "
        );
    });

    lckcmx();

    //浪潮库存明细
    function lckcmx() {
        var tabPanel = Ext.getCmp('tabPanel');

        var model = Ext.define('pcm3_cnt_wlmx_d1', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'phid',
                type: 'string',
                mapping: 'phid'
            },
            {
                name: 'mstphid',
                type: 'string',
                mapping: 'mstphid'
            },
            {
                name: 'cllb',
                type: 'double',
                mapping: 'cllb'
            },
            {
                name: 'cllb_name',
                type: 'string',
                mapping: 'cllb_name'
            },
            {
                name: 'cgsl',
                type: 'double',
                mapping: 'cgsl'
            },
            {
                name: 'jldw',
                type: 'double',
                mapping: 'jldw'
            }, {
                name: 'jldw_name',
                type: 'string',
                mapping: 'jldw_name'
            },
            {
                name: 'bhsje',
                type: 'double',
                mapping: 'bhsje'
            }, {
                name: 'shuilv',
                type: 'double',
                mapping: 'shuilv'
            }, {
                name: 'se',
                type: 'double',
                mapping: 'se'
            }, {
                name: 'jshj',
                type: 'double',
                mapping: 'jshj'
            },
            {
                name: 'sfzp',
                type: 'string',
                mapping: 'sfzp'
            },
            {
                name: 'remark',
                type: 'string',
                mapping: 'remark'
            }
            ]
        });
        //定义store
        var store = Ext.create('Ext.ng.JsonStore', {
            model: model
        });

        if (!Ext.isEmpty(busid)) {
            //TODO
            execServer('pcm3_cnt_wlmx_d1', {
                'mstphid': busid
            }, function (res) {
                if (!Ext.isEmpty(res.data)) {
                    store.loadData(res.data);
                    for (i = 0; i < store.getCount(); i++) {
                        store.data.items[i].phantom = false;
                    }
                }
            });
        }
        var grid = Ext.create('Ext.ng.GridPanel', {
            title: '浪潮库存明细',
            id: 'pcm3_cnt_lckcmx_d1',
            region: 'south',
            stateful: false,
            isInit: true,
            features: [{
                ftype: 'summary'
            }],
            stateId: 'pcm3_cnt_wlmx_d1', //所有单据不允许重复
            store: store,
            buskey: 'phid', //对应的业务表主键属性
            otype: otype,
            columnLines: true,
            tbar: [{
                xtype: 'button',
                itemId: 'addrow',
                text: '刷新',
                iconCls: "icon-AddRow",
                handler: function () {
                    execServer('pcm3_cnt_wlmx_d1', {
                        'mstphid': busid
                    }, function (res) {
                        if (!Ext.isEmpty(res.data)) {
                            store.loadData(res.data);
                            for (i = 0; i < store.getCount(); i++) {
                                store.data.items[i].phantom = false;
                            }
                        }
                    });
                    Ext.Msg.alert("提示", "刷新完毕!")
                }
            }],
            columns: [Ext.create('Ext.grid.RowNumberer', {
                text: '序号',
                width: 45
            }), {
                header: Lang.pcm3_cnt_wlmx_d1_phid || '主键',
                dataIndex: 'phid',
                itemId: 'phid',
                width: 100,
                sortable: true,
                hidden: true
            }, {
                header: Lang.pcm3_cnt_wlmx_d1_mstphid || '主表主键',
                dataIndex: 'mstphid',
                itemId: 'mstphid',
                width: 100,
                sortable: true,
                hidden: true
            }, {
                header: Lang.pcm3_cnt_wlmx_d1_cllb || '材料类别',
                dataIndex: 'cllb_name',
                itemId: 'cllb',
                width: 200,
                sortable: true,
                editor: {
                    xtype: 'ngRichHelp',
                    valueField: 'phid',
                    displayField: 'u_mc',
                    helpid: 'gs_lcwz',
                    ORMMode: false,
                    listeners: {}
                }
            },
            {
                header: Lang.pcm3_cnt_wlmx_d1_cgje || '采购数量',
                dataIndex: 'cgsl',
                itemId: 'cgsl',
                width: 100,
                sortable: true,
                editor: {
                    xtype: 'ngNumber',
                    allowBlank: true
                }
            }, {
                header: Lang.pcm3_cnt_wlmx_d1_jldw || '计量单位',
                dataIndex: 'jldw_name',
                itemId: 'jldw',
                width: 200,
                sortable: true,
                editor: {
                    xtype: 'ngRichHelp',
                    valueField: 'phid',
                    displayField: 'msname',
                    helpid: 'epm_msunit',
                    ORMMode: false,
                    listeners: {}
                }
            },
            {
                header: Lang.pcm3_cnt_wlmx_d1_bhsje || '不含税金额',
                dataIndex: 'bhsje',
                itemId: 'bhsje',
                width: 120,
                sortable: true,
                editor: {
                    xtype: 'ngNumber',
                    allowBlank: true
                }
            },
            {
                header: Lang.pcm3_cnt_wlmx_d1_shuilv || '税率',
                dataIndex: 'shuilv',
                itemId: 'shuilv',
                width: 120,
                sortable: true,
                editor: {
                    xtype: 'ngNumber',
                    allowBlank: true
                }
            },
            {
                header: Lang.pcm3_cnt_wlmx_d1_se || '税额',
                dataIndex: 'se',
                itemId: 'se',
                width: 120,
                sortable: true,
                editor: {
                    xtype: 'ngNumber',
                    allowBlank: true
                }
            }, {
                header: Lang.pcm3_cnt_wlmx_d1_jshj || '采购金额（价税合计）',
                dataIndex: 'jshj',
                itemId: 'jshj',
                width: 120,
                sortable: true,
                editor: {
                    xtype: 'ngNumber',
                    allowBlank: true
                }
            }, {
                header: Lang.pcm3_cnt_wlmx_d1_sfzp || '是否专票',
                dataIndex: 'sfzp',
                itemId: 'sfzp',
                width: 120,
                sortable: true,
                editor: {
                    xtype: 'ngComboBox',
                    valueField: 'code',
                    displayField: 'name',
                    queryMode: 'local',
                    data: [{
                        code: '1',
                        name: '是'
                    }, {
                        code: '0',
                        name: '否'
                    }],
                    allowBlank: true
                },
                renderer: function (code) {
                    var data = [{
                        code: '1',
                        name: '是'
                    }, {
                        code: '0',
                        name: '否'
                    }];
                    Ext.each(data, function (rec) {
                        if (rec['code'] == code) {
                            code = rec['name'];
                            return false;
                        }
                    });
                    return code;
                }
            },
            {
                header: Lang.pcm3_cnt_wlmx_d1_remark || '备注',
                dataIndex: 'remark',
                itemId: 'remark',
                width: 200,
                sortable: true,
                editor: {
                    xtype: 'ngText',
                    allowBlank: true
                }
            }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]
        });
        //根据tab页添加grid
        tabPanel.add(grid);
    }
    if (Toolbar) Toolbar.get('addrow').setVisible(true);
}

function beforeSaveEdit() {
    /*判断是否有必输项没有输入start*/
    return Ext.getCmp('pcm3_cnt_wlmx_d') ? Ext.getCmp('pcm3_cnt_wlmx_d').isValid() : true;
    /*判断是否有必输项没有输入end*/
}

function getExtendData() {
    //后端自动生成phid
    var grid = Ext.getCmp('pcm3_cnt_wlmx_d');
    if (!grid) return {};
    var extendObj1 = grid.getChange(false);
    /*var extendObj = {
        tablename: 'pcm3_cnt_wlmx_d',
        data: grid.getChange(false)
    };*/
    return {
        'pcm3_cnt_wlmx_d': JSON.stringify(extendObj1)
    };
}

/*function getExtendData() {
    //后端自动生成phid
    var grid = Ext.getCmp('pcm3_cnt_wlmx_d');
    var store = grid.store;
    var extendObj = {
        tablename: 'pcm3_cnt_wlmx_d',
        data: grid.getChange(false)
    };
    return {
        'pcm3_cnt_wlmx_d': JSON.stringify(extendObj)
    };
}*/
//------生成主键函数(格式为日期时间毫秒+流水号)------
function generateId(sequence) {
    //获取当前时间
    const date = new Date();
    // 格式化日期为 YYMMDD
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    // 格式化时间为 HHMMSS
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timeStr = `${hours}${minutes}${seconds}`;
    // 获取毫秒数，并确保是2位数
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0').slice(0, 2);
    // 格式化流水号为3位
    const sequenceStr = sequence.toString().padStart(3, '0');
    // 拼接日期、时间、毫秒和流水号
    const phid = `${dateStr}${timeStr}${milliseconds}${sequenceStr}`;
    return phid;
}

//浪潮库存明细
function lckcmx() {
    var tabPanel = Ext.getCmp('tabPanel');

    var model = Ext.define('pcm3_cnt_wlmx_d1', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'phid',
            type: 'string',
            mapping: 'phid'
        },
        {
            name: 'mstphid',
            type: 'string',
            mapping: 'mstphid'
        },
        {
            name: 'cllb',
            type: 'double',
            mapping: 'cllb'
        },
        {
            name: 'cllb_name',
            type: 'string',
            mapping: 'cllb_name'
        },
        {
            name: 'cgsl',
            type: 'double',
            mapping: 'cgsl'
        },
        {
            name: 'jldw',
            type: 'double',
            mapping: 'jldw'
        }, {
            name: 'jldw_name',
            type: 'string',
            mapping: 'jldw_name'
        },
        {
            name: 'bhsje',
            type: 'double',
            mapping: 'bhsje'
        }, {
            name: 'shuilv',
            type: 'double',
            mapping: 'shuilv'
        }, {
            name: 'se',
            type: 'double',
            mapping: 'se'
        }, {
            name: 'jshj',
            type: 'double',
            mapping: 'jshj'
        },
        {
            name: 'sfzp',
            type: 'string',
            mapping: 'sfzp'
        },
        {
            name: 'remark',
            type: 'string',
            mapping: 'remark'
        }
        ]
    });
    //定义store
    var store = Ext.create('Ext.ng.JsonStore', {
        model: model
    });

    if (!Ext.isEmpty(busid)) {
        execServer('pcm3_cnt_wlmx_d1', {
            'mstphid': busid
        }, function (res) {
            if (!Ext.isEmpty(res.data)) {
                store.loadData(res.data);
                for (i = 0; i < store.getCount(); i++) {
                    store.data.items[i].phantom = false;
                }
            }
        });
    }
    var grid = Ext.create('Ext.ng.GridPanel', {
        title: '浪潮库存明细',
        id: 'pcm3_cnt_lckcmx_d1',
        region: 'south',
        stateful: false,
        isInit: true,
        features: [{
            ftype: 'summary'
        }],
        stateId: 'pcm3_cnt_wlmx_d1', //所有单据不允许重复
        store: store,
        buskey: 'phid', //对应的业务表主键属性
        otype: otype,
        columnLines: true,
        tbar: [{
            xtype: 'button',
            itemId: 'addrow',
            text: '刷新',
            iconCls: "icon-AddRow",
            handler: function () {
                execServer('pcm3_cnt_wlmx_d1', {
                    'mstphid': busid
                }, function (res) {
                    if (!Ext.isEmpty(res.data)) {
                        store.loadData(res.data);
                        for (i = 0; i < store.getCount(); i++) {
                            store.data.items[i].phantom = false;
                        }
                    }
                });
                Ext.Msg.alert("提示", "刷新完毕!")
            }
        }],
        columns: [Ext.create('Ext.grid.RowNumberer', {
            text: '序号',
            width: 45
        }), {
            header: Lang.pcm3_cnt_wlmx_d1_phid || '主键',
            dataIndex: 'phid',
            itemId: 'phid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_wlmx_d1_mstphid || '主表主键',
            dataIndex: 'mstphid',
            itemId: 'mstphid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_wlmx_d1_cllb || '材料类别',
            dataIndex: 'cllb_name',
            itemId: 'cllb',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'u_mc',
                helpid: 'gs_lcwz',
                ORMMode: false,
                listeners: {}
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d1_cgje || '采购数量',
            dataIndex: 'cgsl',
            itemId: 'cgsl',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        }, {
            header: Lang.pcm3_cnt_wlmx_d1_jldw || '计量单位',
            dataIndex: 'jldw_name',
            itemId: 'jldw',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'msname',
                helpid: 'epm_msunit',
                ORMMode: false,
                listeners: {}
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d1_bhsje || '不含税金额',
            dataIndex: 'bhsje',
            itemId: 'bhsje',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d1_shuilv || '税率',
            dataIndex: 'shuilv',
            itemId: 'shuilv',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d1_se || '税额',
            dataIndex: 'se',
            itemId: 'se',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        }, {
            header: Lang.pcm3_cnt_wlmx_d1_jshj || '采购金额（价税合计）',
            dataIndex: 'jshj',
            itemId: 'jshj',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        }, {
            header: Lang.pcm3_cnt_wlmx_d1_sfzp || '是否专票',
            dataIndex: 'sfzp',
            itemId: 'sfzp',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngComboBox',
                valueField: 'code',
                displayField: 'name',
                queryMode: 'local',
                data: [{
                    code: '1',
                    name: '是'
                }, {
                    code: '0',
                    name: '否'
                }],
                allowBlank: true
            },
            renderer: function (code) {
                var data = [{
                    code: '1',
                    name: '是'
                }, {
                    code: '0',
                    name: '否'
                }];
                Ext.each(data, function (rec) {
                    if (rec['code'] == code) {
                        code = rec['name'];
                        return false;
                    }
                });
                return code;
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d1_remark || '备注',
            dataIndex: 'remark',
            itemId: 'remark',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngText',
                allowBlank: true
            }
        }
        ],
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ]
    });
    //根据tab页添加grid
    tabPanel.add(grid);
}

function beforeAddRowDeal(records) {
    Ext.Array.forEach(records, function (record) {
        record.TaxMony = GcNumRound(record.TaxMony, 2);
        record.Tax = GcNumRound(record.Tax, 2);
        record.Mony = record.TaxMony - record.Tax;
    });
}