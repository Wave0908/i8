function allReadyEdit() {
    //物资点验单主表
    var mstform = Ext.getCmp('p_form0000700076_m');
    //材料明细表
    var dgrid = Ext.getCmp('p_form0000700076_d');
    var dstore = dgrid.store;
    //往来明细表
    var dgrid1 = Ext.getCmp('p_form0000700076_d1');
    var dstore1 = dgrid1.store;
    //组织设置为只读
    mstform.getItem('phid_org').userSetReadOnly(true);
    mstform.getItem('bill_dt').userSetReadOnly(false);
    mstform.getItem('u_htmc').userSetReadOnly(true);
    mstform.getItem('u_jzfs').userSetReadOnly(true);
    mstform.getItem('u_lcywdy').userSetReadOnly(true);
    mstform.getItem('u_lchsbmzjm').userSetReadOnly(true);
    mstform.getItem('u_htzje').userSetReadOnly(true);
    mstform.getItem('u_bhsje').userSetReadOnly(true);
    mstform.getItem('u_se').userSetReadOnly(true);
    mstform.getItem('u_cgjehj').userSetReadOnly(true);
    mstform.getItem('u_xhck').setVisible(false);
    mstform.getItem('u_xhck').userSetMustInput(false);
    //标题隐藏
    mstform.getItem('bill_name').setVisible(false)
    //录入人隐藏
    mstform.getItem('phid_app').setVisible(false)
    mstform.getItem('u_ywlx').setVisible(false);
    mstform.getItem('u_ywlx').userSetMustInput(false);
    mstform.getItem('u_yflxmc').setVisible(false);

    //增加按钮
    var Toolbar = Ext.getCmp('toolbar');
    console.log("Toolbar:", Toolbar);

    /*增加一个推送按钮只在单据审核的时候推送start*/
    if (otype == $Otype.VIEW) {

        execServer('wzdydshbz', {
            'phid': busid
        }, function (res) {
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log(data);
            if (res.count > 0) {
                // Toolbar.insert(18, {
                // 	itemId: "push",
                // 	text: "推送浪潮",
                // 	width: this.itemWidth,
                // 	iconCls: "icon-New",
                // 	handler: function () {
                // 		Ext.Ajax.request({
                // 			type: 'get',
                // 			dataType: 'json',
                // 			contentType: 'application/json;charset=UTF-8',
                // 			url: "http://192.168.3.241:30599/new_esey/lcApi/pushRkxx?phid=" + busid,
                // 			async: false, //同步请求
                // 			disableCaching: false, // 添加这行来阻止_dc参数
                // 			success: function (response) {
                // 				window.wait = false;
                // 				var resdata = JSON.parse(response.text);
                // 				var status = resdata["status"];
                // 				var message = resdata["message"];
                // 				if (status == "success") {
                // 					Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.",
                // 						function () {

                // 						});
                // 				} else {
                // 					Ext.MessageBox.alert(Lang.Notes || '提示', message,
                // 						function () { });
                // 				}
                // 			},
                // 			failure: function (response, opts) {
                // 				myMask.hide();
                // 				window.wait = false;
                // 				var resdata = JSON.parse(response.text);
                // 				var status = resdata["status"];
                // 				var message = resdata["message"];
                // 				Ext.MessageBox.alert(Lang.Notes || '提示', message);
                // 			}
                // 		});
                // 		/*AJAX请求end*/
                // 	}
                // });

                Toolbar.insert(18, {
                    itemId: "push",
                    text: "推送浪潮",
                    width: this.itemWidth,
                    iconCls: "iconfont iconcreate",
                    handler: function () {
                        // var mstformlist = Ext.getCmp('KcBillheadList');
                        // //log
                        // console.log(Ext.getCmp('KcBillheadList'));
                        // TODO 等待前端代码修改审核标志
                        // var data = mstformlist.getSelectionModel().getSelection();
                        // if (Ext.isEmpty(data[0].data.ChkFlg) || data[0].data.ChkFlg == '0') {
                        // 	Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
                        // 	return false;
                        // }
                        //if(!Ext.isEmpty(data[0].data.user_istbinspur) || data[0].data.user_istbinspur == '1') {
                        //		Ext.Msg.alert('提示', '当前单据已推送浪潮系统，请在浪潮系统中删除后,在重新推送');
                        //		return false;
                        //	}
                        var loadMarsk = new Ext.LoadMask(document.body, {
                            msg: '正在调用接口...',
                            removeMask: true
                        });

                        Ext.Ajax.request({
                            method: 'GET',
                            dataType: 'json',
                            contentType: 'application/json;charset=UTF-8',
                            url: "http://172.20.65.5:30599/new_esey/lcApi/pushWZDYDorFPBZD?phid=" + busid,
                            async: false, //同步请求
                            disableCaching: false, // 添加这行来阻止_dc参数
                            success: function (response) {
                                loadMarsk.hide();
                                window.wait = false;
                                var resdata = JSON.parse(response.text);
                                console.log("resdata:", resdata);
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
                        //mstformlist.store.reload();
                        console.log(data);
                    }
                });

                //单据页面加载完
                mstform.on('dataready', function () {
                    var chkflg = '1'; //mstform.getItem("ChkFlg").getValue();
                    var Creator = mstform.getItem("phid_fill_psn").getValue();
                    if (chkflg == '1') {
                        var temp = 0;
                        var userID = $appinfo.userID;
                        execServer('jsqxsq', {
                            'a': userID
                        }, function (res) {
                            if (res.count > 0) {
                                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].extendObjects.roleno == 'admin01') {
                                        temp = 1;
                                    }
                                }
                                if (temp == 1) {
                                    Toolbar.get('push').enable();
                                } else {
                                    if (Creator == $appinfo.userID) {
                                        Toolbar.get('push').enable();
                                    } else {
                                        Toolbar.get('push').disable();
                                    }

                                }
                            }
                        });
                    } else {
                        Toolbar.get('push').disable();
                    }
                });
            }
        });

    }

    /*增加一个推送按钮只在单据审核的时候推送end*/
    if (mstform != '' || mstform != 'undefined') {
        mstform.getItem('u_fjzs').setValue(1);

    }
    //添加重新汇总字段
    Toolbar.insert(3, {
        itemId: "summary",
        text: "重新汇总",
        width: this.itemWidth,
        iconCls: "icon-ArrowSwitch"
    });

    Toolbar.items.get('summary').on('click', function () { //点击按钮检测事件
        debugger;
        var u_cgrkdjbh = mstform.getItem('u_cgrkdjbh').getValue();
        var u_kclx = mstform.getItem('u_kclx').getValue();
        console.log(u_cgrkdjbh)
        console.log(u_kclx)
        if (u_cgrkdjbh && u_kclx) {
            execServer('p_form0000700076_clmxb', {
                'phid': u_cgrkdjbh,
                'type': u_kclx
            }, function (res) {
                dstore.removeAll();
                console.log("res:", res);
                if (res.count > 0) {
                    const data = JSON.parse(res.data);
                    var arr = [];
                    for (let index = 0; index < res.count; index++) {
                        arr.push({
                            u_cllb: data[index].extendObjects.u_cllb,
                            u_cllb_EXName: data[index].extendObjects.u_cllb_name,
                            u_jldw: data[index].extendObjects.u_jldw,
                            u_jldw_EXName: data[index].extendObjects.u_jldw_name,
                            u_sl: data[index].extendObjects.u_sl,
                            u_cgsl: data[index].extendObjects.u_cgsl,
                            u_bhsje: data[index].extendObjects.u_bhsje,
                            u_se: data[index].extendObjects.u_se,
                            u_jshj: data[index].extendObjects.u_jshj
                        });
                    }
                    dstore.insert(dstore.getCount(), arr);
                    var u_bhsje = 0; //不含税金额
                    var u_se = 0; //税额
                    var u_cgjehj = 0; //采购金额合计
                    Ext.Array.each(dstore.data.items, function (record) {
                        u_bhsje += Ext.Number.from(record.get('u_bhsje'));
                        u_se += Ext.Number.from(record.get('u_se'));
                        u_cgjehj += Ext.Number.from(record.get('u_jshj'));
                    })
                }
                mstform.getItem('u_bhsje').setValue(u_bhsje);
                mstform.getItem('u_se').setValue(u_se);
                mstform.getItem('u_cgjehj').setValue(u_cgjehj);
            });
        } else {
            Ext.Msg.alert('提示!', '请输入库存类型和采购入库单据编号!');
            return false;
        }
    });

    mstform.getItem('phid_pc').addListener('beforetriggerclick', function () {
        var ocode = mstform.getItem('phid_org').getValue();
        mstform.getItem('phid_pc').setClientSqlFilter('project_table.Cat_PhId=' + ocode);
    });

    mstform.getItem('phid_pc').addListener('helpselected', function (obj) {
        var pc = mstform.getItem('phid_pc').getValue();
        console.log("pc:", pc);
        execServer(
            'p_form0000700076_pc_imposetype', {
            'pc': pc,
        },
            function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    mstform.getItem('u_jzfs').setValue(data[0].extendObjects.imposetype);
                    mstform.getItem('u_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    mstform.getItem('u_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                }
            }
        );
    });

    var pc = mstform.getItem('phid_pc').getValue();
    if (!Ext.isEmpty(pc)) {
        execServer(
            'p_form0000700076_pc_imposetype', {
            'pc': pc,
        },
            function (res) {
                if (res.count > 0) {
                    const data = JSON.parse(res.data);
                    mstform.getItem('u_jzfs').setValue(data[0].extendObjects.imposetype);
                    mstform.getItem('u_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    mstform.getItem('u_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                }
            }
        );
    }

    mstform.getItem('u_htbh').addListener('beforetriggerclick', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        if (Ext.isEmpty(pc)) {
            Ext.Msg.alert('提示', '请先选择工程项目');
            return false;
        }
        mstform.getItem('u_htbh').setClientSqlFilter('pcm3_cnt_m.phid_pc=' + pc +
            '  and cnt_type in (3,224200106000017,224200715000001)');

    });

    mstform.getItem('u_htbh').addListener('helpselected', function (obj) {
        console.log('obj==================>', obj)
        //mstform.getItem('u_htmc').setValue(obj.data.bill_name);
        mstform.getItem('u_htmc').setValue(obj.code);
        mstform.getItem('u_htzje').setValue(obj.data.cnt_sum_fc);
        BatchBindCombox([mstform.getItem('u_htmc')]);
    });

    mstform.getItem('u_fpbzd').addListener('beforetriggerclick', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        var u_htbh = mstform.getItem('u_htbh').getValue();

        var u_rklb = mstform.getItem('u_rklb').getValue();
        var u_kclx = mstform.getItem('u_kclx').getValue();

        if (Ext.isEmpty(pc)) {
            Ext.Msg.alert('提示', '请先选择工程项目');
            return false;
        }
        if (Ext.isEmpty(u_htbh)) {
            Ext.Msg.alert('提示', '请先选择合同编码');
            return false;
        }
        if (Ext.isEmpty(u_kclx)) {
            Ext.Msg.alert('提示', '请先选择库存类型');
            return false;
        }
        if (Ext.isEmpty(u_rklb)) {
            Ext.Msg.alert('提示', '请先选择入库类型');
            return false;
        }
        mstform.getItem('u_fpbzd').setClientSqlFilter('phid_contractno = ' + u_htbh + ' and phid_pc= ' + pc +
            " and wrioffflg='" + u_rklb + "' and  user_kclx=" + u_kclx);
    });


    mstform.getItem('u_cgrkdjbh').addListener('beforetriggerclick', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        var u_htbh = mstform.getItem('u_htbh').getValue();
        var u_fpbzd = mstform.getItem('u_fpbzd').getValue();
        var u_rklb = mstform.getItem('u_rklb').getValue();
        var u_kclx = mstform.getItem('u_kclx').getValue();

        var temp = '';
        if (!Ext.isEmpty(pc)) {
            execServer(
                'p_form0000700076_cgrkbhg', {
                'pc': pc
            },
                function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (data) {
                        temp = data[0].extendObjects.u_cgrkdjbh;
                    }
                }
            );
        }

        console.log(temp);
        if (u_rklb == '0') {
            if (Ext.isEmpty(u_fpbzd)) {
                Ext.Msg.alert('提示', '请先选择发票号');
                return false;
            }
            if (!Ext.isEmpty(temp)) {
                mstform.getItem('u_cgrkdjbh').setClientSqlFilter("invoiceno = '" + u_fpbzd + "' and wrioffflg = '" +
                    u_rklb + "' and tempflg = '3' and  user_kclx=" + u_kclx + " and phid not in (" + temp + ")");
            } else {
                mstform.getItem('u_cgrkdjbh').setClientSqlFilter("invoiceno = '" + u_fpbzd + "' and wrioffflg = '" +
                    u_rklb + "' and tempflg = '3' and  user_kclx=" + u_kclx);
            }

        }
        if (u_rklb == '2') {

            if (!Ext.isEmpty(temp)) {
                mstform.getItem('u_cgrkdjbh').setClientSqlFilter(
                    "tempflg = '2' and phid_transno ='1' and phid_tr_proj=" + pc + " and phid_contractno=" +
                    u_htbh +
                    " and case when bill_no not in (select bill_no from kc_billhead group by bill_no having  count(bill_no)>2) then '2' else wrioffflg end ='2' and  user_kclx=" +
                    u_kclx + " and phid not in (" + temp + ")")

            } else {
                mstform.getItem('u_cgrkdjbh').setClientSqlFilter(
                    "tempflg = '2' and phid_transno ='1' and phid_tr_proj=" + pc + " and phid_contractno=" +
                    u_htbh +
                    " and case when bill_no not in (select bill_no from kc_billhead group by bill_no having  count(bill_no)>2) then '2' else wrioffflg end ='2' and  user_kclx=" +
                    u_kclx)

            }

        }
        if (u_rklb == '3') {
            if (!Ext.isEmpty(temp)) {
                mstform.getItem('u_cgrkdjbh').setClientSqlFilter(
                    "wrioffflg = '3' and phid_transno ='1' and phid_tr_proj=" + pc + " and phid_contractno=" +
                    u_htbh + " and  user_kclx=" + u_kclx + " and phid not in (" + temp + ")");
            } else {
                mstform.getItem('u_cgrkdjbh').setClientSqlFilter(
                    "wrioffflg = '3' and phid_transno ='1' and phid_tr_proj=" + pc + " and phid_contractno=" +
                    u_htbh + " and  user_kclx=" + u_kclx);
            }

        }

    });

    //业务类型
    mstform.getItem('u_kclx').addListener('change', function () {
        var kclx = mstform.getItem('u_kclx').getValue();
        if (kclx == 1) {
            mstform.getItem('u_ywlx').setVisible(true);
            mstform.getItem('u_ywlx').userSetMustInput(true);
            mstform.getItem('u_yflxmc').setVisible(true);
            mstform.getItem('u_yflxmc').userSetMustInput(false);
            mstform.getItem('u_xhck').setVisible(true);
            mstform.getItem('u_xhck').userSetMustInput(true);
            mstform.getItem('u_zygc').setVisible(true);
            mstform.getItem('u_zygc').userSetMustInput(true);
            mstform.getItem('u_ssbk').setVisible(true);
            mstform.getItem('u_ssbk').userSetMustInput(true);
            dgrid.setMustInputCol('u_fyxm_EXName', true);
        } else {
            mstform.getItem('u_yflxmc').setVisible(false);
            mstform.getItem('u_yflxmc').userSetMustInput(false);
            mstform.getItem('u_ywlx').setVisible(true);
            mstform.getItem('u_ywlx').userSetMustInput(true);
            mstform.getItem('u_xhck').setVisible(false);
            mstform.getItem('u_xhck').userSetMustInput(false);
            mstform.getItem('u_zygc').setVisible(false);
            mstform.getItem('u_zygc').userSetMustInput(false);
            mstform.getItem('u_ssbk').setVisible(false);
            mstform.getItem('u_ssbk').userSetMustInput(false);
            dgrid.setMustInputCol('u_fyxm_EXName', false);
        }

    });

    mstform.getItem('u_ywlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        mstform.getItem('u_xhck').setValue();
        if (mstform.getItem('u_kclx').getValue() == '1') {
            mstform.getItem('u_ywlx').setClientSqlFilter("zd='业务类型' and djmc='发票报账单' and u_sfqy=1");
        } else {
            mstform.getItem('u_ywlx').setClientSqlFilter("zd='业务类型' and djmc='物资点验单'");

        }
    });

    mstform.getItem('u_xhck').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        var user_ywlx = mstform.getItem('u_ywlx').getValue();
        if (Ext.isEmpty(user_ywlx)) {
            Ext.Msg.alert('提示', '请先维护业务类型');
            return false;
        }
        mstform.getItem('u_xhck').setClientSqlFilter(
            'u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') ');
    });


    console.log("dgrid:", dgrid);
    dgrid.getColumn('u_fyxm_EXName').getEditor().addListener('beforetriggerclick', function () {
        var u_ywlx = mstform.getItem('u_ywlx').getValue();

        var u_ywlxl = "'" + u_ywlx + "'" //20230914 改
        console.log(u_ywlxl);
        if (Ext.isEmpty(u_ywlx)) {
            Ext.Msg.alert('提示', '请先维护gs业务类型');
            return false;
        }
        dgrid.getColumn('u_fyxm_EXName').getEditor().setClientSqlFilter(
            " u_gsywlxnm in (select gs_nm from  p_form0000000257_d  where  phid = " + u_ywlxl + ")");
    });


    Toolbar.insert(1, {
        itemId: "copy",
        text: "复制",
        width: this.itemWidth,
        iconCls: "icon-New"
    });

    Toolbar.items.get('copy').on('click', function () {

        //获取表体数据
        var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
        var u_sfzp = a[0].get('u_sfzp');
        for (var i = 1; i < a.length; i++) {
            a[i].set('u_sfzp', u_sfzp);
        }
    });

    /*管理组织选择后清空所属项目部start*/
    mstform.getItem('u_lcglzz').addListener('helpselected', function () {
        mstform.getItem('u_lcglbm').setValue();
        mstform.getItem('u_lcywdy').setValue();
        mstform.getItem('u_lchsbmzjm').setValue();
    });
    /*管理组织选择后清空所属项目部end*/


    mstform.getItem('u_lcglbm').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        var zz = mstform.getItem('u_lcglzz').getValue();
        if (zz) {
            mstform.getItem('u_lcglbm').setOutFilter({
                parent_orgid: zz
            }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
        } else {
            Ext.Msg.alert('提示', '浪潮管理组织未选择');
            return false;
        }
    });


    /*项目所属部选择后带出浪潮业务单元start*/
    mstform.getItem('u_lcglbm').addListener('helpselected', function () {
        var u_lcglbm = mstform.getItem('u_lcglbm').getValue();

        execServer('ssxmb_bmywdy', {
            'dept': u_lcglbm
        }, function (res) {
            if (res.count == 1) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data[0].extendObjects.user_lcywdy) {
                    mstform.getItem('u_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                } else {
                    Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                    return false;
                }
            } else if (res.count > 1) {
                mstform.getItem('u_lcywdy').setValue();
                Ext.Msg.alert('提示', '请联系管理员处理，部门对照存在重复');
                return false;
            } else {
                mstform.getItem('u_lcywdy').setValue();
                Ext.Msg.alert('提示', '请联系管理员处理，部门对照未做');
                return false;
            }
        });

        execServer('ssxmb_zjm', {
            'dept': u_lcglbm
        }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                mstform.getItem('u_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
            } else {
                mstform.getItem('u_lchsbmzjm').setValue();
                Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
                return false;
            }
        });

    });

    /*项目所属部选择后带出浪潮业务单元end*/

}

function beforeSaveEdit() {
    var dgrid1 = Ext.getCmp('p_form0000700076_d1');
    var dstore1 = dgrid1.store;
    var Toolbar = Ext.getCmp('toolbar');
    var a = dgrid1.getStore().getRange(0, dstore1.getCount() - 1);

    if (a <= 0) {
        Ext.Msg.alert('提示!', '往来明细没有数据!无法保存!');
        Toolbar.enable();
        return false;
    }
    return true;
}
