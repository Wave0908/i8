function AllReady() {
    var mstform = Ext.getCmp('CntPayM5');
    var Toolbar = Ext.getCmp('toolbar');
    var dgrid = Ext.getCmp('CntPayDOld5');
    var dstore = dgrid.store;
    /*增加一个推送按钮只在单据审核的时候推送start*/
    if (otype == $Otype.VIEW) {
        Toolbar.insert(8, {
            itemId: "push",
            text: "推送浪潮",
            width: this.itemWidth,
            iconCls: "icon-New"
        });
        //单据页面加载完
        mstform.on('dataready', function () {
            var phid = mstform.queryById("PhId").getValue();
            var chkflg = mstform.getItem("ChkFlg").getValue();
            var Creator = mstform.getItem("Creator").getValue();
            console.log($appinfo.userID)
            console.log(Creator)
            if (chkflg == '1') {
                var temp = 0;
                execServer('jsqxsq', {
                    'a': $appinfo.userID
                }, function (res) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].roleno == 'admin01') {
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
                });

            } else {
                Toolbar.get('push').disable();
            }

        });
    }

    /*增加一个推送按钮只在单据审核的时候推送end*/

    /*根据推送按钮推送点击事件推送数据start*/
    if (otype == $Otype.VIEW) {
        Toolbar.items.get('push').on('click', function () {
            var user_cwxtsfjs = mstform.getItem('user_cwxtsfjs').getValue();
            if (user_cwxtsfjs == '1') {
                Ext.Msg.alert('提示', '财务系统已存在，不可推送');
                return false;
            }
            /*AJAX请求start*/
            Ext.Ajax.request({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                jsonData: {
                    "phid": mstform.queryById("PhId").getValue()
                },
                url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/CntmPay/Insert",
                async: false, //同步请求
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
            /*AJAX请求end*/

        });
    }
    /*根据推送按钮推送点击事件推送数据end*/
    mstform.getItem('user_ywlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
        mstform.getItem('user_ywlx').setOutFilter({
            zd: '业务类型',
            djmc: '对下计价'
        }) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
    });

    /*子表的单位工程通用帮助选择前start*/
    dgrid.getColumn('user_kxxz_name').getEditor().addListener('beforetriggerclick', function () {
        if (Ext.isEmpty(mstform.getItem('user_ywlx').getValue())) {
            Ext.Msg.alert('提示', "请先选择业务类型");
            return false;
        }
        var user_ywlx = mstform.getItem('user_ywlx').getValue();
        dgrid.getColumn('user_kxxz_name').getEditor().setClientSqlFilter('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') ');
    });
    /*子表的单位工程通用帮助选择前end*/

}



//保存前检测
function beforeSaveEdit() {

    var mstform = Ext.getCmp('CntPayM5');
    var Toolbar = Ext.getCmp('toolbar');
    var dgrid = Ext.getCmp('CntPayDOld5');
    var dstore = dgrid.store;
    var flag = 0;
    var PhidCnt = mstform.getItem('PhidCnt').getValue();
    var htzjewbw = 0; //合同额+五百万
    var jse = 0 //结算额

    execServer('htzjewbw', {
        'phid': PhidCnt
    }, function (res) {
        if (res.status == 'success') {
            if (!Ext.isEmpty(res.data[0])) {
                htzjewbw = res.data[0].amt_vat_fc
            }
        }
    });
    execServer('jszje', {
        'phid_cnt': PhidCnt
    }, function (res) {
        if (res.status == 'success') {
            if (!Ext.isEmpty(res.data[0])) {
                jse = res.data[0].app_amt_vat_fc
            }
        }
    });

    var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
    var bqjse = 0;
    for (i = 0; i < a.length; i++) {
        bqjse += a[i].get('AppAmtVatFc')
    }
    if (otype == $Otype.ADD) {
        jse = Number(jse) + Number(bqjse)
    }
    if (Number(htzjewbw) < Number(jse)) {
        flag = 1;
        Ext.MessageBox.show({
            title: '提示',
            msg: "结算总额大于合同额+500万",
            modal: false
        });
    }

    if (flag == 1) {
        return false;
    }
    if (flag == 0) {
        return true;
    }

}