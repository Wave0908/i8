$NG.AllReady(function (page,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
    var mstform = $NG.getCmpApi('PcmPay6');
    var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');
    var dgrid = $NG.getCmpApi('PcmPayD6');
 const { isChgCnt } = $NG.getQueryValue();
	if ($NG.getQueryValue('oType') == 'view') {
		console.log("dataready");
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		console.log('user_istbinspur:', user_istbinspur);
		console.log("Toolbar.getButtons():", Toolbar.getButtons());
		if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') { // 现在啥问题？？   现在user_istbinspur  =4   应该是不只读  但现在前端是只读的  
			Toolbar.getItem('applyForReview').setReadOnly(true);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
		} else {
			Toolbar.getItem('IMPPushTask').setReadOnly(true);
			Toolbar.getItem('applyForReview').setReadOnly(false);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: false }) }, 100);//以后只用这个么  还是setonly  ye 等会  这个问题我还在想哪里又设置了这个disabled，我在问别人，你等一下
		}

	} else {
		if (!isChgCnt == '1') {
			Toolbar.getItem('applyForReview').setReadOnly(true);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
		}
	}
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
            var user_cwxtsfjs = mstform.getItem('user_cwxtsfjs').getValue();
            var PhidCnt = mstform.getItem('PhidCnt').getValue();
            var bill_dt;
            if (!PhidCnt) {
                return false;
            }
            $NG.execServer('jsxxhqhtsj', {
                'pcmphid': PhidCnt
            }, function (res) {
                var data = JSON.parse(res.data);
                bill_dt = data[0].extendObjects.bill_dt
            });
            var new_bill_dt = getymd(bill_dt)
            console.log("new_bill_dt:", new_bill_dt);
            if (user_cwxtsfjs == '1' || new_bill_dt > '2023-01-12') {
                $NG.alert('财务系统是否存在选择是 或 合同制单日期大于2023-01-12不推送浪潮');
                return false;
            }
            /*AJAX请求start*/
            // TODO url地址不对 需要更新
            $NG.request
                .get({
                    url: "http://172.20.65.5:30599/new_esey/lcApi/pushHtJs?phid=" + $NG.getQueryValue('PhId'),
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
                    if (res.count > 0) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
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
                    }
                });
            } else {
                Toolbar.getItem('push').setReadOnly(true);
            }
        }, 200);
    }
    /*增加一个推送按钮只在单据审核的时候推送end*/

    //对业务类型过滤
    $NG.updateUI(function (updater, state) {
        updater.fieldSetForm.PcmPay6.user_ywlx.setProps({
            clientSqlFilter: ("zd = '业务类型' and djmc = '对下计价' "),	//根据
            placeholder: ``
        });
    });

    //是否签证 默认问时
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

    useBeforeClick(({
        args
    }) => {
        return new Promise((resolve) => {
            console.log('args:', args);
            var flag = 0;
            var PhidCnt = mstform.getItem('PhidCnt').getValue();
            var jse = 0; //结算额
            if (!PhidCnt) {
                $NG.alert("请先选择合同");
                resolve(false);
                return;
            }
            // 先获取合同额
            $NG.execServer('jszje', {
                'phid_cnt': PhidCnt
            }, function (res) {
                if (res.status == 'success' && res.count > 0) {
                    var data = JSON.parse(res.data);
                    if (data[0].extendObjects.app_amt_vat_fc) {
                        jse = data[0].extendObjects.app_amt_vat_fc;
                    } else {
                        jse = 0.00;
                    }
                    console.log('已结算额:', jse);

                    // 计算本次结算额
                    var a = dgrid.getRows();
                    var bqjse = 0;
                    for (i = 0; i < a.length; i++) {
                        bqjse += a[i].AppAmtVatFc;
                    }
                    console.log('本次结算额:', bqjse);

                    // 编辑状态下累加结算额
                    if ($NG.getQueryValue('otype') == 'edit' || $NG.getQueryValue('otype') == 'add') {
                        jse = Number(jse) + Number(bqjse);
                    }
                    console.log('总结算额:', jse);

                    $NG.execServer('htzjefw', {
                        'phid': PhidCnt
                    }, function (res) {
                        if (res.status == 'success' && res.count > 0) {
                            var data1 = JSON.parse(res.data);
                            htzjewbc = data1[0].extendObjects.amt_vat_fc_wbc;//合同额*1.05
                            htzjeybc = data1[0].extendObjects.amt_vat_fc_ybc;//合同额*1.1
                            console.log('合同额*1.05:', htzjewbc);
                            console.log('合同额*1.1:', htzjeybc);
                            //获取结算额
                            if (htzjewbc && htzjeybc) {
                                // 比较合同额和结算额
                                $NG.execServer('fbhtbcxy', {
                                    'phid_cnt': PhidCnt
                                }, function (res) {
                                    if (res.count > 0 && Number(jse) > Number(htzjeybc)) {
                                        flag = 1;
                                        $NG.alert("累计结算值不能超过合同额的110%");
                                        resolve(false);
                                        // return false;
                                    } else if (res.count == 0 && Number(jse) > Number(htzjeybc)) {
                                        flag = 1;
                                        $NG.alert("累计结算值不能超过合同额的110%");
                                        resolve(false);
                                        // return false;
                                    } else {
                                        resolve(true);
                                    }
                                });
                            } else {
                                resolve(true); // 如果获取合同额失败，默认允许保存
                            }
                        }
                    });
                } else {
                    resolve(true); // 如果获取结算额失败，默认允许保存
                }
            });
        });
    }, "CntPayMDetailToolBar.save");
});

function getymd(dateStr) {
    var d = new Date(dateStr);
    var resDate = d.getFullYear() + '-' + right(('00' + d.getMonth() + 1), 2) + '-' + right('00' + d.getDate(), 2);
    return resDate;
}

function right(mainStr, lngLen) {
    if (mainStr.length - lngLen >= 0 && mainStr.length >= 0 && mainStr.length - lngLen <= mainStr.length) {
        return mainStr.substring(mainStr.length - lngLen, mainStr.length);
    } else {
        return null;
    }
}