$NG.AllReady(function (
    page,
    { useAction, useValuesChange, useDataIndexChange, useBeforeClick, useUpdateRows, useClick, useBeforeOpen, useUpdateRow }
) {
    var mstform = $NG.getCmpApi('PcmPay5');
    var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');
    var dgrid = $NG.getCmpApi('PcmPayD5');

    /*增加一个推送按钮只在单据审核的时候推送start*/
    if ($NG.getQueryValue('otype') == "view") {
        Toolbar.insert({
            id: "push",
            text: "推送浪潮",
            iconCls: "icon-New"
        }, 8);
        useAction('onClick')(() => {
            var user_cwxtsfjs = mstform.getItem('user_cwxtsfjs').getValue();
            if (user_cwxtsfjs == '1') {
                $NG.alert('财务系统已存在，不可推送');
                return false;
            }
            /*AJAX请求start*/
            // TODO url地址不对 需要更新
            $NG.request
                .get({
                    url: "http://192.168.3.241:30599/new_esey/lcApi/pushHtJs?phid=" + $NG.getQueryValue('PhId'),
                    //data: { "phid": $NG.getQueryValue('PhId') },
                })
                .then((res) => {
                    var status = res.status;
                    var message = res.message;
                    if (status == "success") {
                        $NG.alert("推送成功")
                    } else {
                        $NG.alert(message)
                    }
                });
            /*AJAX请求end*/
        }, 'push');

        //单据页面加载完
        //var phid = mstform.queryById("PhId").getValue();
        var AppStatus = mstform.getItem("AppStatus").getValue();
        var Creator = mstform.getItem("Creator").getValue();
        setTimeout(() => {
            if (AppStatus == '1') {
                var temp = 0;
                $NG.execServer('jsqxsq', {
                    'a': $NG.getUser().userID
                }, function (res) {
                    var data = JSON.parse(res.data);
                    for (var i = 0; i < res.count; i++) {
                        if (data[i].extendObjects.roleno == 'admin01') {
                            temp = 1;
                        }
                    }
                    if (temp == 1) {
                        Toolbar.getItem('push').setReadOnly(false);
                    } else {
                        if (Creator == $NG.getUser().userID) {
                            Toolbar.getItem('push').setReadOnly(false);
                        } else {
                            Toolbar.getItem('push').setReadOnly(true);
                        }
                    }
                });
            } else {
                Toolbar.getItem('push').setReadOnly(true);
            }
        }, 200);
    }

    /*增加一个推送按钮只在单据审核的时候推送end*/

    $NG.updateUI(function (updater, state) {
        updater.fieldSetForm.PcmPay5.user_ywlx.setProps({
            clientSqlFilter: ("zd = '业务类型' and djmc = '对下计价' "),	//根据
            placeholder: ``
        });
    });

    /*子表的单位工程通用帮助选择前start*/
    useBeforeOpen((data) => {
        if (mstform.getItem('user_ywlx').getValue()) {
            var user_ywlx = mstform.getItem('user_ywlx').getValue();
            $NG.updateUI(function (updater, state) {
                updater.editGrid.PcmPayD5.user_kxxz.setProps({
                    clientSqlFilter: ('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') '),
                    placeholder: ``
                });
            });
            return true;
        } else {
            $NG.alert("请先选择业务类型");
            return false;
        }
    }, 'gs_dxjj_kxxz');
    /*子表的单位工程通用帮助选择前end*/
    useBeforeClick(({ args }) => {
        return new Promise((resolve) => {
            var flag = 0;
            var PhidCnt = mstform.getItem('PhidCnt').getValue();
            var htzjewbw = 0; //合同额+五百万
            var jse = 0; //结算额

            // 先获取合同额
            $NG.execServer('htzjewbw', {
                'phid': PhidCnt
            }, function (res) {
                var data = JSON.parse(res.data);
                if (res.status == 'success' && res.count > 0) {
                    htzjewbw = data[0].extendObjects.amt_vat_fc;
                    console.log('合同额+500万:', htzjewbw);

                    // 获取结算额
                    $NG.execServer('jszje', {
                        'phid_cnt': PhidCnt
                    }, function (res) {
                        var data = JSON.parse(res.data);
                        if (res.status == 'success' && res.count > 0) {
                            jse = data[0].extendObjects.app_amt_vat_fc;
                            console.log('已结算额:', jse);

                            // 计算本次结算额
                            var a = dgrid.getRows();
                            var bqjse = 0;
                            for (i = 0; i < a.length; i++) {
                                bqjse += a[i].AppAmtVatFc;
                            }
                            console.log('本次结算额:', bqjse);

                            // 编辑状态下累加结算额
                            if ($NG.getQueryValue('otype') == 'edit') {
                                jse = Number(jse) + Number(bqjse);
                            }
                            console.log('总结算额:', jse);

                            // 比较合同额和结算额
                            if (Number(htzjewbw) < Number(jse)) {
                                flag = 1;
                                $NG.alert("结算总额大于合同额+500万");
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        } else {
                            resolve(true); // 如果获取结算额失败，默认允许保存
                        }
                    });
                } else {
                    resolve(true); // 如果获取合同额失败，默认允许保存
                }
            });
        });
    }, "CntPayMDetailToolBar.save");
});