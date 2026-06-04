function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700186_m');
    var dgrid = Ext.getCmp('p_form0000700186_d');
    //增加按钮
    var Toolbar = Ext.getCmp('toolbar');
    var dstore = dgrid.store;
    //mstform.getItem('checkpsn').setVisible(false);
    //mstform.getItem('title').setVisible(false);
    mstform.getItem('u_djzt').userSetReadOnly(true);
    mstform.getItem('u_djzt').setValue('0');
    mstform.getItem('u_cqdtfymx').userSetReadOnly(true);
    mstform.getItem('u_lcywdy').userSetReadOnly(true);
    mstform.getItem('u_lchsbmzjm').userSetReadOnly(true);
    mstform.getItem('u_istbinspur').userSetReadOnly(true);
    mstform.getItem('u_tbinspurtime').userSetReadOnly(true);
    mstform.getItem('u_txje').userSetReadOnly(true);
    mstform.getItem('phid_org').userSetReadOnly(true);
    dgrid.setReadOnlyCol('u_lcywdy', true);
    dgrid.setReadOnlyCol('u_lchsbmzjm', true);



    if (otype == $Otype.VIEW) {
        execServer('lxcgtxbzb', {
            'phid': busid
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data);
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
                        var Creator = mstform.getItem("phid_fill_psn").getValue();
                        if (chkflg == '1') {
                            var temp = 0;
                            execServer('jsqxsq', {
                                'a': $appinfo.userID
                            }, function (res) {
                                if (res.count > 0) {
                                    var data1 = JSON.parse(res.data);
                                    for (var i = 0; i < res.count; i++) {
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
                            url: "http://172.20.65.5:30599/new_esey/lcApi/pushTXDLXCG?phid=" + busid,
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
                var data = JSON.parse(res.data);
                if (data.length == 1) {
                    if (data[0].extendObjects.user_lcywdy) {
                        mstform.getItem('u_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
                    } else {
                        Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                        mstform.getItem('u_lcywdy').setValue(null);
                        return false;
                    }
                } else {
                    Ext.Msg.alert('提示', '请联系财务共享中心，部门对照存在重复');
                    mstform.getItem('u_lcywdy').setValue(null);
                    return false;
                }
            } else {
                Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                mstform.getItem('u_lcywdy').setValue(null);
                return false;
            }
        });

        execServer('ssxmb_zjm', {
            'dept': u_lxcg_dept
        }, function (res) {
            if (res.count > 0) {
                var data = JSON.parse(res.data);
                if (data.length == 1) {
                    if (data[0].extendObjects.user_mnemcodeinaccdepart) {
                        mstform.getItem('u_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
                    } else {
                        Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                        mstform.getItem('u_lchsbmzjm').setValue(null);
                        return false;
                    }
                } else {
                    Ext.Msg.alert('提示', '请联系财务共享中心，部门对照存在重复');
                    mstform.getItem('u_lchsbmzjm').setValue(null);
                    return false;
                }
            } else {
                Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                mstform.getItem('u_lchsbmzjm').setValue(null);
                return false;
            }
        });

    });



    dgrid.getColumn('u_bm_EXName').getEditor().on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var ocode = mstform.getItem('phid_org').getValue();
        if (!ocode) {
            alert('请先选择单位名称');
            return false;
        } else {
            dgrid.getColumn('u_bm_EXName').getEditor().setOutFilter({
                parent_orgid: ocode
            });
        }
    });

    dgrid.getColumn('u_bm_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        // 选择gs单位 带出 浪潮的数据
        var data = dgrid.getSelectionModel().getSelection();
        var u_bm = data[0].get('u_bm');
        execServer('p_form0000700186_ngdept', {
            dept: u_bm
        }, function (res) {
            if (res.count > 0) {
                var data1 = JSON.parse(res.data);
                if(data1.length == 1){
                    if(data1[0].extendObjects.user_lcywdy){
                        data[0].set('u_lcywdy', data1[0].extendObjects.user_lcywdy)
                    }else{
                        Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                        data[0].set('u_lcywdy', null);
                        return false;
                    }
                }else{
                    Ext.Msg.alert('提示', '请联系财务共享中心，部门对照存在重复');
                    data[0].set('u_lcywdy', null);
                    return false;
                }
            }else{
                Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                data[0].set('u_lcywdy', null);
                return false;
            }
        });
        execServer('p_form0000700186_ngdeptlchsbm', {
            dept: u_bm
        }, function (res) {
            if (res.count > 0) {
                var data1 = JSON.parse(res.data);
                if(data1.length == 1){
                    if(data1[0].extendObjects.user_mnemcodeinaccdepart){
                        data[0].set('u_lchsbmzjm', data1[0].extendObjects.user_mnemcodeinaccdepart)
                    }else{
                        Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                        data[0].set('u_lchsbmzjm', null);
                        return false;
                    }
                }else{
                    Ext.Msg.alert('提示', '请联系财务共享中心，部门对照存在重复');
                    data[0].set('u_lchsbmzjm', null);
                    return false;
                }
            }else{
                Ext.Msg.alert('提示', '请联系财务共享中心，部门对照未做');
                data[0].set('u_lchsbmzjm', null);
                return false;
            }
        });
    });



    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) { return; }
        if (e.field == 'u_txje') {
            var record = e.record;
            var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
            var u_txje = 0; //出库金额
            Ext.Array.each(dstore.data.items, function (record) {
                u_txje += Ext.Number.from(record.get('u_txje'));
            })
            mstform.getItem('u_txje').setValue(u_txje);
        };
    });

}