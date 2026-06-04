function AllReady() {
    var mstform = Ext.getCmp('KC_OUTJGCK_Head');

    var Toolbar = CommButtonView.toolbar;


    Toolbar.insert(18, {
        itemId: "TS",
        text: "推送浪潮",
        width: this.itemWidth,
        iconCls: "iconfont iconcreate",
        handler: function () {
            // var mstformlist = Ext.getCmp('KcBillheadList');
            // //log

            // var data = mstformlist.getSelectionModel().getSelection();
            var ChkFlg = mstform.queryById('ChkFlg').getValue();
            if (Ext.isEmpty(ChkFlg) || ChkFlg == '0') {
                Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
                return false;
            }
            //	if(!Ext.isEmpty(data[0].data.user_istbinspur) || data[0].data.user_istbinspur == '1') {
            //		Ext.Msg.alert('提示', '当前单据已推送浪潮系统，请在浪潮系统中删除后,在重新推送');
            //		return false;
            //	}
            var loadMarsk = new Ext.LoadMask(document.body, {
                msg: '正在调用接口...',
                removeMask: true
            });

            Ext.Ajax.request({
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: "http://172.20.65.5:30599/new_esey/lcApi/pushCkxx?phid=" + busid,
                async: false, //同步请求
                success: function (response) {
                    loadMarsk.hide();
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
                    loadMarsk.hide();
                    window.wait = false;
                    var resdata = JSON.parse(response.text);
                    var status = resdata["status"];
                    var message = resdata["message"];
                    Ext.MessageBox.alert(Lang.Notes || '提示', message);
                }
            });
            mstformlist.store.reload();
            //console.log(data);
        }
    });
    var Toolbar = Ext.getCmp('toolbar');
    var dgrid = Ext.getCmp('KC_OUTJGCK_Body');
    //获取table页
    var tabPanel = Ext.getCmp('tabPanel');

    if (Ext.isEmpty(dgrid)) {
        return false;
    }

    var dstore = dgrid.store;
    if (otype == $Otype.ADD || otype == $Otype.EDIT) {
        mstform.getItem('user_fjzs').setValue(1);
    }
    /*增加一个复制按钮start*/
    Toolbar.insert(1, {
        itemId: "copy",
        text: "复制",
        width: this.itemWidth,
        iconCls: "icon-New"
    });
    /*增加一个复制按钮end*/
    if (mstform != '' || mstform != 'undefined') {
        mstform.getItem('user_fjzs').setValue(1);

    }

    /*复制按钮单击，会查到第1条数据的字段值然后赋值给表体中的每条数据start*/
    Toolbar.items.get('copy').on('click', function () {

        //获取表体数据
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);

        //费用项目字段
        var fyxm = a[0].get('user_fyxm');
        var fyxmname = a[0].get('user_fyxm_EXName');
        //使用部位字段
        var sybw = a[0].get('user_sybw');
        var sybwname = a[0].get('user_sybw_EXName');
        //材料类别字段
        var cllb = a[0].get('user_cllb');
        var cllbname = a[0].get('user_cllb_EXName');
        //专业工程字段
        var user_zygc = a[0].get('user_zygc');
        var user_zygcname = a[0].get('user_zygc_EXName');
        //所属板块字段
        var user_ssbk = a[0].get('user_ssbk');
        var user_ssbkname = a[0].get('user_ssbk_EXName');

        for (var i = 1; i < a.length; i++) {
            a[i].set('user_fyxm', fyxm);
            a[i].set('user_fyxm_EXName', fyxmname);
            a[i].set('user_sybw', sybw);
            a[i].set('user_sybw_EXName', sybwname);
            a[i].set('user_cllb', cllb);
            a[i].set('user_cllb_EXName', cllbname);
            a[i].set('user_zygc', user_zygc);
            a[i].set('user_zygc_EXName', user_zygcname);
            a[i].set('user_ssbk', user_ssbk);
            a[i].set('user_ssbk_EXName', user_ssbkname);
        }
    });
    /*复制按钮单击，会查到第1条数据的字段值然后赋值给表体中的每条数据end*/

    /*子表的使用部位通用帮助选择前start*/
    dgrid.getColumn('user_sybw_EXName').getEditor().addListener('beforetriggerclick', function () {
        if (Ext.isEmpty(mstform.getItem('PhidTrProj').getValue())) {
            Ext.Msg.alert('提示', "请先选择工程项目");
            return false;
        }
        var pc = mstform.getItem('PhidTrProj').getValue();
        dgrid.getColumn('user_sybw_EXName').getEditor().setOutFilter({
            'teams_gr_up.phid_pc': pc
        });
    });
    /*子表的使用部位通用帮助选择前end*/


    dgrid.getColumn('user_cllb_EXName').getEditor().addListener('beforetriggerclick', function () {
        var user_ywlx = mstform.getItem('user_ywlx').getValue();
        if (Ext.isEmpty(user_ywlx)) {
            Ext.Msg.alert('提示', '请先维护gs业务类型');
            return false;
        }

        dgrid.getColumn('user_cllb_EXName').getEditor().setClientSqlFilter(" u_nm  in (  select YWLBCLLBSET_CLID from cllbdzbfld where  BZZXYWLB_NM in (select gs_nm from p_form0000000257_d where phid= ' " + user_ywlx + " ' )  )");
    });

    mstform.getItem('user_ywlx').addListener('helpselected', function () {
        var user_ywlx = mstform.getItem('user_ywlx').getValue();
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        for (var i = 0; i < a.length; i++) {
            a[i].set('user_cllb', null);
            a[i].set('user_cllb_EXName', null);
        }

    });

    /*采购入库单据编码根据项目名称自动生成start*/

    mstform.getItem('Billno').addListener('change', function () {
        var bill_no = mstform.getItem('Billno').getValue();
        var newbill_no = bill_no.substr(-14);
        mstform.getItem('user_djbh').setValue(newbill_no);
    });

    /*采购入库单据编码根据项目名称自动生成end*/

    /*这一整段是调差，增加TAB，其他代码在此段之外去写start*/
    //定义model
    var model = Ext.define('pcm3_cnt_xhck_d', {
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
            name: 'htmc',
            type: 'double',
            mapping: 'htmc'
        },
        {
            name: 'htmc_EXName',
            type: 'string',
            mapping: 'htmc_EXName'
        },
        {
            name: 'wldw',
            type: 'double',
            mapping: 'wldw'
        },
        {
            name: 'wldw_EXName',
            type: 'string',
            mapping: 'wldw_EXName'
        },
        {
            name: 'kxxz',
            type: 'double',
            mapping: 'kxxz'
        },
        {
            name: 'kxxz_EXName',
            type: 'string',
            mapping: 'kxxz_EXName'
        },
        {
            name: 'amt',
            type: 'double',
            mapping: 'amt'
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

        execServer('pcm3_cnt_xhck_d', {
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
                    "htmc": data[i].extendObjects.htmc,
                    "wldw": data[i].extendObjects.wldw,
                    "amt": data[i].extendObjects.amt,
                    "remark": data[i].extendObjects.remark,
                    "htmc_EXName": data[i].extendObjects.htmc_name,
                    "wldw_EXName": data[i].extendObjects.wldw_name,
                    "kxxz_EXName": data[i].extendObjects.kxxz_name,
                    "kxxz": data[i].extendObjects.kxxz
                });
            }
            if (dataArr.length > 0) {
                store.removeAll();
                store.loadData(dataArr);
            }
        });
    }

    //插入往来明细表
    var grid = Ext.create('Ext.ng.GridPanel', {
        title: '往来明细',
        id: 'pcm3_cnt_xhck_d',
        region: 'south',
        stateful: false,
        isInit: true,
        features: [{
            ftype: 'summary'
        }],
        stateId: 'pcm3_cnt_xhck_d', //所有单据不允许重复
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
            header: Lang.pcm3_cnt_xhck_d_phid || '主键',
            dataIndex: 'phid',
            itemId: 'phid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_xhck_d_mstphid || '主表主键',
            dataIndex: 'mstphid',
            itemId: 'mstphid',
            width: 100,
            sortable: true,
            hidden: true
        },
        {
            header: Lang.pcm3_cnt_xhck_d_htmc || '合同名称',
            dataIndex: 'htmc_EXName',
            itemId: 'htmc',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'title',
                listFields: 'phid,bill_no,title',
                listHeadTexts: '代码,编码,名称',
                helpid: 'xhck_htmc',
                needBlankLine: true,
                isInGrid: true,
                ORMMode: false,
                emptyText: '',
                mustInput: false,
                listeners: {
                    helpselected: function (obj) {
                        var data = grid.getSelectionModel().getSelection();
                        var oriValue = data[0].get('htmc');
                        var rec = obj.data;
                        if (rec.constructor == Array) {
                            rec = obj.data[0].data;
                        }
                        data[0].set('htmc', rec.phid);
                        data[0].set('htmc_EXName', rec.title);
                    }
                }
            }
        },
        {
            header: Lang.pcm3_cnt_xhck_d_wldw || '往来单位',
            dataIndex: 'wldw_EXName',
            itemId: 'wldw',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'compname',
                listFields: 'phid,compno,compname',
                listHeadTexts: '代码,编码,名称',
                helpid: 'xhck_wldw',
                needBlankLine: true,
                isInGrid: true,
                ORMMode: false,
                emptyText: '',
                mustInput: false,
                listeners: {
                    helpselected: function (obj) {
                        var data = grid.getSelectionModel().getSelection();
                        var oriValue = data[0].get('wldw');
                        var rec = obj.data;
                        if (rec.constructor == Array) {
                            rec = obj.data[0].data;
                        }
                        data[0].set('wldw', rec.phid);
                        data[0].set('wldw_EXName', rec.compname);
                    }
                }
            }
        },
        {
            header: Lang.pcm3_cnt_xhck_d_kxxz || '款项性质',
            dataIndex: 'kxxz_EXName',
            itemId: 'kxxz',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'gs_nm',
                displayField: 'gs_mc',
                listFields: 'gs_nm,gs_mc',
                listHeadTexts: '代码,名称',
                helpid: 'xhck_kxxz',
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
                        data[0].set('kxxz', rec.gs_nm);
                        data[0].set('kxxz_EXName', rec.gs_mc);
                    }
                }
            }
        },
        {
            header: Lang.pcm3_cnt_xhck_d_cgje || '金额',
            dataIndex: 'amt',
            itemId: 'amt',
            width: 100,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },
        {
            header: Lang.pcm3_cnt_xhck_d_remark || '备注',
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

    var dgrid1 = Ext.getCmp('pcm3_cnt_xhck_d');
    var dstore1 = dgrid1.store;
    if (otype == $Otype.VIEW) {
        grid.queryById('addrow').hide();
        grid.queryById('delrow').hide();
    }
    grid.queryById('addrow').on('click', function () {
        //store.insert(store.getCount(), [{}]); //插入空直接写{}即可
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

    /*这一整段是调差，增加TAB，其他代码在此段之外去写end*/

    /*根据tab页添加往来明细表end*/


    mstform.getItem('PhidTrProj').addListener('helpselected', function (obj) {
        var pc = mstform.getItem('PhidTrProj').getValue()
        mstform.getItem('user_lcywdy').setValue(null);
        mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
        execServer('gjxmxx_dcssxmb', {
            'phid': pc
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    execServer('ssxmb_bmywdy', {
                        'dept': data[0].extendObjects.user_pc_dept
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data.length != 0) {
                            mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                        } else {
                            Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                            return false;
                        }
                    });

                    execServer('ssxmb_zjm', {
                        'dept': data[0].extendObjects.user_pc_dept
                    }, function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length != 0) {
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                            } else {
                                Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                                return false;
                            }
                        }
                    });

                } else {
                    Ext.Msg.alert('提示', '项目信息所属项目部不存在');
                    return false;
                }
            }
        });

    });

    var pc = mstform.getItem('PhidTrProj').getValue()
    if (!Ext.isEmpty(pc)) {
        mstform.getItem('user_lcywdy').setValue(null);
        mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
        execServer('gjxmxx_dcssxmb', {
            'phid': pc
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    execServer('ssxmb_bmywdy', {
                        'dept': data[0].extendObjects.user_pc_dept
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data.length != 0) {
                            mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                        } else {
                            Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                            return false;
                        }
                    });

                    execServer('ssxmb_zjm', {
                        'dept': data[0].extendObjects.user_pc_dept
                    }, function (res) {
                        if (res.count > 0) {
                            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                            if (data.length != 0) {
                                mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                            } else {
                                Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                                return false;
                            }
                        }
                    });

                } else {
                    Ext.Msg.alert('提示', '项目信息所属项目部不存在');
                    return false;
                }
            }
        });
    }
    lckcmx();

    /*管理组织选择后清空所属项目部start*/
    mstform.getItem('PhidTrProj').addListener('helpselected', function () {
        var PhidTrProj = mstform.getItem('PhidTrProj').getValue()
        execServer('xmxxdcglzssmb', {
            'phid': PhidTrProj
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    mstform.getItem('user_lcglzz').setValue(data[0].extendObjects.user_lcglzz);
                    mstform.getItem('user_lcglmb').setValue(data[0].extendObjects.user_lcssxmb);
                    BatchBindCombox([mstform.getItem('user_lcglzz')]);
                    BatchBindCombox([mstform.getItem('user_lcglmb')]);
                } else {
                    Ext.Msg.alert('提示', '项目信息没有管理组织和所属项目部');
                    return false;
                }
            }
        });

        var user_lcglmb = mstform.getItem('user_lcglmb').getValue();

        execServer('ssxmb_bmywdy', {
            'dept': user_lcglmb
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                } else {
                    Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                    return false;
                }
            }
        });

        execServer('ssxmb_zjm', {
            'dept': user_lcglmb
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                } else {
                    Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                    return false;
                }
            }
        });
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
        mstform.getItem('user_lcglmb').setOutFilter({
            parent_orgid: zz
        }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    });

    /*项目所属部选择后带出浪潮业务单元start*/
    mstform.getItem('user_lcglmb').addListener('helpselected', function () {
        var user_lcglmb = mstform.getItem('user_lcglmb').getValue();

        execServer('ssxmb_bmywdy', {
            'dept': user_lcglmb
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                } else {
                    Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                    return false;
                }
            }
        });

        execServer('ssxmb_zjm', {
            'dept': user_lcglmb
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    mstform.getItem('user_mnemcodeinaccdepart').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                } else {
                    Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                    return false;
                }
            }
        });

    });

    /*项目所属部选择后带出浪潮业务单元end*/
}

function beforeSaveEdit() {
    /*判断是否有必输项没有输入start*/
    return Ext.getCmp('pcm3_cnt_xhck_d').isValid();
    /*判断是否有必输项没有输入end*/
}

function getExtendData() {
    //后端自动生成phid
    var grid = Ext.getCmp('pcm3_cnt_xhck_d');
    var extendObj1 = grid.getChange(false);
    return {
        'pcm3_cnt_xhck_d': JSON.stringify(extendObj1)
    };
}
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

    var model = Ext.define('pcm3_cnt_wlmx_d2', {
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
            name: 'cllb_EXName',
            type: 'string',
            mapping: 'cllb_EXName'
        },
        {
            name: 'fyxm',
            type: 'double',
            mapping: 'fyxm'
        },
        {
            name: 'fyxm_EXName',
            type: 'double',
            mapping: 'fyxm_EXName'
        }, {
            name: 'xm',
            type: 'double',
            mapping: 'xm'
        },
        {
            name: 'xm_EXName',
            type: 'string',
            mapping: 'xm_EXName'
        }, {
            name: 'zygc',
            type: 'double',
            mapping: 'zygc'
        }, {
            name: 'zygc_EXName',
            type: 'string',
            mapping: 'zygc_EXName'
        }, {
            name: 'ssbk',
            type: 'double',
            mapping: 'ssbk'
        },
        {
            name: 'ssbk_EXName',
            type: 'string',
            mapping: 'ssbk_EXName'
        },
        {
            name: 'bm',
            type: 'string',
            mapping: 'bm'
        },
        {
            name: 'ckje',
            type: 'double',
            mapping: 'ckje'
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
    //TODO
    if (!Ext.isEmpty(busid)) {
        execServer('pcm3_cnt_wlmx_d2', {
            'mstphid': busid
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data.length != 0) {
                    store.loadData(data[0].extendObjects);
                    for (i = 0; i < store.getCount(); i++) {
                        store.data.items[i].phantom = false;
                    }
                }
            }
        });
    }
    var grid = Ext.create('Ext.ng.GridPanel', {
        title: '浪潮库存明细',
        id: 'pcm3_cnt_wlmx_d2',
        region: 'south',
        stateful: false,
        isInit: true,
        features: [{
            ftype: 'summary'
        }],
        stateId: 'pcm3_cnt_wlmx_d2', //所有单据不允许重复
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
                execServer('pcm3_cnt_wlmx_d2', {
                    'mstphid': busid
                }, function (res) {
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if (data.length != 0) {
                            store.loadData(data[0].extendObjects);
                            for (i = 0; i < store.getCount(); i++) {
                                store.data.items[i].phantom = false;
                            }
                        }
                    }
                });
                Ext.Msg.alert("提示", "刷新完毕!")
            }
        }
        ],
        columns: [Ext.create('Ext.grid.RowNumberer', {
            text: '序号',
            width: 45
        }), {
            header: Lang.pcm3_cnt_wlmx_d2_phid || '主键',
            dataIndex: 'phid',
            itemId: 'phid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_wlmx_d2_mstphid || '主表主键',
            dataIndex: 'mstphid',
            itemId: 'mstphid',
            width: 100,
            sortable: true,
            hidden: true
        }, {
            header: Lang.pcm3_cnt_wlmx_d2_cllb || '材料类别',
            dataIndex: 'cllb_EXName',
            itemId: 'cllb',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'u_mc',
                helpid: 'gs_lcwz',
                ORMMode: false,
                listeners: {
                }
            }
        }, {
            header: Lang.pcm3_cnt_wlmx_d2_fyxm || '费用项目',
            dataIndex: 'fyxm_EXName',
            itemId: 'fyxm',
            width: 200,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'gs_mc',
                helpid: 'gs_wzfld_fyxm',
                ORMMode: false,
                listeners: {
                }
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d2_xm || '项目',
            dataIndex: 'xm_EXName',
            itemId: 'xm',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'project_name',
                helpid: 'Ecc_project_table',
                ORMMode: false,
                listeners: {
                }
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d2_zygc || '专业工程',
            dataIndex: 'zygc_EXName',
            itemId: 'zygc',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'gs_mc',
                helpid: 'gszygc',
                ORMMode: false,
                listeners: {
                }
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d2_ssbk || '所属板块',
            dataIndex: 'ssbk_EXName',
            itemId: 'ssbk',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngRichHelp',
                valueField: 'phid',
                displayField: 'gs_mc',
                helpid: 'gsbk',
                ORMMode: false,
                listeners: {
                }
            }
        }, {
            header: Lang.pcm3_cnt_wlmx_d2_bm || '部门',
            dataIndex: 'bm',
            itemId: 'bm',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngText',
                allowBlank: true
            }
        }, {
            header: Lang.pcm3_cnt_wlmx_d2_ckje || '出库金额',
            dataIndex: 'ckje',
            itemId: 'ckje',
            width: 120,
            sortable: true,
            editor: {
                xtype: 'ngNumber',
                allowBlank: true
            }
        },
        {
            header: Lang.pcm3_cnt_wlmx_d2_remark || '备注',
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