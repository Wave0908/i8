function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700182_m');
    var dgrid = Ext.getCmp('p_form0000700182_d');
    var dstore = dgrid.store;
    //mstform.getItem('checkpsn').setVisible(false);
    mstform.getItem('u_istbinspur').userSetReadOnly(true);
    mstform.getItem('u_tbinspurtime').userSetReadOnly(true);
    mstform.getItem('u_djzt').userSetReadOnly(true);
    mstform.getItem('u_djzt').setValue('0');
    mstform.getItem('u_lcywdy').userSetReadOnly(true);
    mstform.getItem('u_lchsbmzjm').userSetReadOnly(true);
    mstform.getItem('u_ywlx').setValue("224210730000001");
    mstform.getItem('u_ywlx').userSetReadOnly(true);
    mstform.getItem('u_rklb').setValue("0");
    mstform.getItem('u_rklb').userSetReadOnly(true);
    mstform.getItem('u_bhsje').userSetReadOnly(true);
    mstform.getItem('u_se').userSetReadOnly(true);
    mstform.getItem('u_cgjehj').userSetReadOnly(true);
    mstform.getItem('phid_org').userSetReadOnly(true);
    BatchBindCombox([mstform.getItem('u_ywlx')])
    //不含税单价设置为只读
    dgrid.setReadOnlyCol('u_bhsje', true);
    //增加按钮
    var Toolbar = Ext.getCmp('toolbar');

    /*增加一个推送按钮只在单据审核的时候推送start*/
    if (otype == $Otype.VIEW) {

        execServer('lxcgwzdyd', {
            'phid': busid
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                if (data[0].extendObjects.ischeck == '1') {
                    Toolbar.insert(18, {
                        itemId: "push",
                        text: "推送浪潮",
                        width: this.itemWidth,
                        iconCls: "icon-New"
                    });

                    //单据页面加载完
                    mstform.on('dataready', function () {
                        var chkflg = '1'; //mstform.getItem("ChkFlg").getValue();
                        //var chkflg = mstform.queryById('ChkFlg').getValue();
                        console.log("chkflg:", chkflg);
                        var Creator = mstform.getItem("phid_fill_psn").getValue();
                        if (chkflg == '1') {
                            var temp = 0;
                            execServer('jsqxsq', {
                                'a': $appinfo.userID
                            }, function (res) {
                                if (res.count > 0) {
                                    for (var i = 0; i < res.count; i++) {
                                        var data1 = JSON.parse(res.data)
                                        if (data1[i].extendObjects.roleno == 'admin01') {
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

                    Toolbar.items.get('push').on('click', function () {
                        /*AJAX请求start*/
                        Ext.Ajax.request({
                            method: 'get',
                            dataType: 'json',
                            contentType: 'application/json;charset=UTF-8',
                            url: "http://172.20.65.5:30599/new_esey/lcApi/pushWZDYDLXCG?phid=" + busid,
                            async: false, //同步请求
                            disableCaching: false, // 添加这行来阻止_dc参数
                            success: function (response) {
                                window.wait = false;
                                console.log("response:", response);
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
                                window.wait = false;
                                var resdata = JSON.parse(response.text);
                                var status = resdata["status"];
                                var message = resdata["message"];
                                Ext.MessageBox.alert(Lang.Notes || '提示', message);
                            }
                        });
                        /*AJAX请求end*/
                    });
                }
            }
        });
    }


    mstform.getItem('phid_pc').addListener('beforetriggerclick', function () {
        var ocode = mstform.getItem('phid_org').getValue();
        mstform.getItem('phid_pc').setClientSqlFilter('project_table.Cat_PhId=' + ocode);
    });





    mstform.getItem('u_ywlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        mstform.getItem('u_ywlx').setClientSqlFilter("zd='业务类型' and djmc='物资点验单'");
    });



    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) { return; }
        if (e.field == 'u_bhsje' || e.field == 'u_se' || e.field == 'u_jshj' || e.field == 'prc' || e.field == 'u_sl') {
            var record = e.record;
            var u_jshj = Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('u_cgsl'), 0)
            var u_bhsje = (Ext.Number.from(u_jshj, 0) / (1 + Ext.Number.from(record.get('u_sl'), 0))).toFixed(2)
            var u_se = u_jshj - u_bhsje
            if (Ext.Number.from(record.get('u_se'), 0) - u_se < 0.06 && Ext.Number.from(record.get('u_se'), 0) - u_se > 0 || u_se - Ext.Number.from(record.get('u_se'), 0) < 0.06 && u_se - Ext.Number.from(record.get('u_se'), 0) > 0) {
                record.set('u_bhsje', Ext.Number.from(record.get('u_jshj'), 0) - Ext.Number.from(record.get('u_se'), 0));
            } else {
                record.set('u_jshj', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('u_cgsl'), 0));
                record.set('u_bhsje', (Ext.Number.from(record.get('u_jshj'), 0) / (1 + Ext.Number.from(record.get('u_sl'), 0))).toFixed(2));
                record.set('u_se', Ext.Number.from(record.get('u_jshj'), 0) - Ext.Number.from(record.get('u_bhsje'), 0));
            }
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            var u_bhsje = 0; //不含税金额
            var u_se = 0; //税额
            var u_cgjehj = 0; //采购金额合计	
            Ext.Array.each(dstore.data.items, function (record) {
                u_bhsje += Ext.Number.from(record.get('u_bhsje'));
                u_se += Ext.Number.from(record.get('u_se'));
                u_cgjehj += Ext.Number.from(record.get('u_jshj'));
            })
            mstform.getItem('u_bhsje').setValue(u_bhsje);
            mstform.getItem('u_se').setValue(u_se);
            mstform.getItem('u_cgjehj').setValue(u_cgjehj);
        };
    });



    dgrid.getColumn('u_cllb_EXName').getEditor().addListener('beforetriggerclick', function () {
        dgrid.getColumn('u_cllb_EXName').getEditor().setClientSqlFilter(" u_nm  in ( select YWLBCLLBSET_CLID from cllbdzb where BZZXYWLB_LBMC='采购入库' group by YWLBCLLBSET_CLID ) ");
    });

    mstform.getItem('u_lxcg_dept').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        var zz = mstform.getItem('phid_org').getValue();
        mstform.getItem('u_lxcg_dept').setOutFilter({
            parent_orgid: zz
        }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    });

    mstform.getItem('u_lxcg_dept').addListener('helpselected', function () {
        var u_lxcg_dept = mstform.getItem('u_lxcg_dept').getValue();

        execServer('ssxmb_bmywdy', {
            'dept': u_lxcg_dept
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                if (data.length == 1) {
                    if (data[0].extendObjects.user_lcywdy) {
                        mstform.getItem('u_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                    } else {
                        Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                        return false;
                    }
                } else {
                    Ext.Msg.alert('提示', '请联系财务共享中心，部门对照存在重复');
                    return false;
                }
            } else {
                Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
                return false;
            }
        });

        execServer('ssxmb_zjm', {
            'dept': u_lxcg_dept
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data)
                if (data.length == 1) {
                    if(data[0].extendObjects.user_mnemcodeinaccdepart){
                        mstform.getItem('u_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    }else{
                        Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                        return false;
                    }
                } else {
                    Ext.Msg.alert('提示', '请联系财务共享中心，部门对照存在重复');
                    return false;
                }
            } else {
                Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                return false;
            }
        });

    });

}