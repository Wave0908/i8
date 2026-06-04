$NG.AllReady(function (
    editPage, {
        useAction,
        useValuesChange,
        useDataIndexChange,
        useBeforeClick,
        useUpdateRows,
        useClick,
        useBeforeOpen,
        useUpdateRow
    }
) {
    var mstform = $NG.getCmpApi('PcmPay5');
    var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');
    var dgridDesc = $NG.getCmpApi('PcmPayDesc5');
    var dgridReward = $NG.getCmpApi('PcmPayReward5');
    var dgrid = $NG.getCmpApi('PcmPayD5');
    var PhidCnt = mstform.getItem('PhidCnt').getValue();
    var PhidPc = mstform.getItem('PhidPc').getValue();
    console.log('PhidCnt:', PhidCnt);
    console.log('PhidPc:', PhidPc);
    if (PhidCnt && PhidPc) {
        $NG.updateUI(function (updater, state) {
            updater.fieldSetForm.PcmPay5.user_xxjdqr.setProps({
                clientSqlFilter: (`p_form_0000000068_m.phid_pc ='${PhidPc}' and p_form_0000000068_m.u_htbh = '${PhidCnt}' and p_form_0000000068_m.phid not in (select user_xxjdqr from pcm3_cnt_pay_m where user_xxjdqr is not null)`)
            });
        });
    }
    useValuesChange(({ args }) => {
        var PhidCnt = mstform.getItem('PhidCnt').getValue();
        var PhidPc = mstform.getItem('PhidPc').getValue();
        console.log('PhidCnt:', PhidCnt);
        console.log('PhidPc:', PhidPc);
        if (PhidCnt && PhidPc) {
            $NG.updateUI(function (updater, state) {
                updater.fieldSetForm.PcmPay5.user_xxjdqr.setProps({
                    clientSqlFilter: (`p_form_0000000068_m.phid_pc ='${PhidPc}' and p_form_0000000068_m.u_htbh = '${PhidCnt}' and p_form_0000000068_m.phid not in (select user_xxjdqr from pcm3_cnt_pay_m where user_xxjdqr is not null)`)
                });
            });
        }
    }, PcmPay5.PhidCnt);

    // if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {
    //     var PhidCnt = mstform.getItem('PhidCnt').getValue();
    //     useValuesChange(({ args }) => {
    //         var PhidCnt = mstform.getItem('PhidCnt').getValue();
    //         var PhidPc = mstform.getItem('PhidPc').getValue();
    //         console.log('PhidCnt:', PhidCnt);
    //         console.log('PhidPc:', PhidPc);
    //         if (PhidCnt && PhidPc) {
    //             $NG.updateUI(function (updater, state) {
    //                 updater.fieldSetForm.PcmPay5.user_xxjdqr.setProps({
    //                     clientSqlFilter: (`p_form_0000000068_m.phid_pc ='${PhidPc}' and p_form_0000000068_m.u_htbh = '${PhidCnt}'`)
    //                 });
    //             });
    //         }
    //     }, PcmPay5.PhidCnt);
    //     Toolbar.insert({
    //         id: "refer_desc",
    //         text: "引用扣款会签单",
    //         iconCls: "icon-New"
    //     }, 12)
    //     Toolbar.insert({
    //         id: "refer_reward",
    //         text: "引用奖励会签单",
    //         iconCls: "icon-New"
    //     }, 13)
    //     useAction('onClick')(() => {
    //         console.log('扣款!!!!!!!!!!!!!!!!!')
    //         var PhidCnt = mstform.getItem('PhidCnt').getValue();
    //         console.log('PhidCnt:', PhidCnt);
    //         $NG.external.openHelp({
    //             type: 'MultipleHelp',
    //             helpId: 'yyjchqd',
    //             clientSqlFilter: (`u_jclx = '02' and u_fbht ='${PhidCnt}'`),
    //             onChange: (selectedData) => {
    //                 //selectedData 是用户在帮助框中选择的数据行数组
    //                 console.log('选中的数据行:', selectedData);
    //                 if (selectedData && selectedData.length > 0) {
    //                     for (let i = 0; i < selectedData.length; i++) {
    //                         var djbm = selectedData[i].origin.bill_no;
    //                         $NG.execServer("yyjfkhqd", {
    //                             bill_no: djbm
    //                         }, function (res) {
    //                             if (res) {
    //                                 const data = JSON.parse(res.data);
    //                                 console.log(data);
    //                                 if (data && data.length > 0) {
    //                                     for (let j = 0; j < data.length; j++) {
    //                                         dgridDesc.addRows([{
    //                                             PhidItem: data[j].extendObjects.phiditem,
    //                                             PhidItem_EXName: data[j].extendObjects.phiditem_exname,
    //                                             AmtVatFc: data[j].extendObjects.amtvatfc_d,
    //                                             DesAttr: data[j].extendObjects.desattr,
    //                                             IsDeduct: data[j].extendObjects.isdeduct,
    //                                         },]);
    //                                     }
    //                                 }
    //                             }
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //     }, 'refer_desc')
    //     useAction('onClick')(() => {
    //         console.log('奖励!!!!!!!!!!!!!!!!!')
    //         var PhidCnt = mstform.getItem('PhidCnt').getValue();
    //         console.log('PhidCnt:', PhidCnt);
    //         $NG.external.openHelp({
    //             type: 'MultipleHelp',
    //             helpId: 'yyjchqd',
    //             clientSqlFilter: (`u_jclx = '01' and u_fbht ='${PhidCnt}'`),
    //             onChange: (selectedData) => {
    //                 //selectedData 是用户在帮助框中选择的数据行数组
    //                 console.log('选中的数据行:', selectedData);
    //                 if (selectedData && selectedData.length > 0) {
    //                     for (let i = 0; i < selectedData.length; i++) {
    //                         var djbm = selectedData[i].origin.bill_no;
    //                         $NG.execServer("yyjfkhqd", {
    //                             bill_no: djbm
    //                         }, function (res) {
    //                             if (res) {
    //                                 const data = JSON.parse(res.data);
    //                                 console.log(data);
    //                                 if (data && data.length > 0) {
    //                                     for (let j = 0; j < data.length; j++) {
    //                                         dgridReward.addRows([{
    //                                             PhidItem: data[j].extendObjects.phiditem,
    //                                             PhidItem_EXName: data[j].extendObjects.phiditem_exname,
    //                                             AmtVatFc: data[j].extendObjects.amtvatfc_d,
    //                                             DesAttr: data[j].extendObjects.desattr,
    //                                             IsDeduct: data[j].extendObjects.isdeduct,
    //                                         },]);
    //                                     }
    //                                 }
    //                             }
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //     }, 'refer_reward')
    // }


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
            clientSqlFilter: ("zd = '业务类型' and djmc = '对下计价' "), //根据
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
    useBeforeClick(({
        args
    }) => {
        return new Promise((resolve) => {
            console.log('args:', args);
            var flag = 0;
            var PhidCnt = mstform.getItem('PhidCnt').getValue();
            var htzjewbw = 0; //合同额+五百万
            var jse = 0; //结算额
            if (!PhidCnt) {
                $NG.alert("请先选择合同");
                resolve(false);
                return;
            }
            // 先获取合同额
            $NG.execServer('htzjewbw', {
                'phid': PhidCnt
            }, function (res) {
                var data = JSON.parse(res.data);
                if (res.status == 'success' && res.count > 0) {
                    htzjewbw = data[0].extendObjects.amt_vat_fc;
                    console.log('合同额+500万:', htzjewbw);

                    // 获取结算额
                    if (htzjewbw) {
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
                                var b = dgridDesc.getRows();
                                var bqjseDesc = 0;
                                for (i = 0; i < b.length; i++) {
                                    bqjseDesc += b[i].AmtVatFc;
                                }
                                console.log('本次扣款结算额:', bqjseDesc);

                                var c = dgridReward.getRows();
                                var bqjseReward = 0;
                                for (i = 0; i < c.length; i++) {
                                    bqjseReward += c[i].AmtVatFc;
                                }
                                console.log('本次奖励结算额:', bqjseReward);

                                // 编辑状态下累加结算额
                                if ($NG.getQueryValue('otype') == 'edit' || $NG.getQueryValue('otype') == 'add') {
                                    jse = Number(jse) + Number(bqjse) - Number(bqjseDesc) + Number(bqjseReward);
                                }
                                console.log('总结算额:', jse);

                                $NG.execServer('htzjefw', {
                                    'phid': PhidCnt
                                }, function (res) {
                                    if (res.status == 'success' && res.count > 0) {
                                        var data1 = JSON.parse(res.data);
                                        console.log('合同额data1:', data1);
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
                                                console.log('是否有补充res:', res);
                                                if (res.count > 0 && Number(jse) > Number(htzjeybc)) {
                                                    //flag = 1;
                                                    $NG.alert("累计结算值不能超过合同额的110%");
                                                    resolve(false);
                                                    //return false;
                                                } else if (res.count == 0 && Number(jse) > Number(htzjeybc)) {
                                                    //flag = 1;
                                                    $NG.alert("累计结算值不能超过合同额的110%");
                                                    resolve(false);
                                                    //return false;
                                                } else {
                                                    resolve(true);
                                                }
                                                // 比较合同额和结算额
                                                if (Number(htzjewbw) < Number(jse)) {
                                                    flag = 1;
                                                    $NG.alert("结算总额大于合同额+500万");
                                                    resolve(false);
                                                } else {
                                                    resolve(true);
                                                }
                                            });
                                        } else {
                                            resolve(true); // 如果获取合同额失败，默认允许保存
                                        }
                                    }
                                });

                                // 比较合同额和结算额
                                // if (Number(htzjewbw) < Number(jse)) {
                                //     flag = 1;
                                //     $NG.alert("结算总额大于合同额+500万");
                                //     resolve(false);
                                // } else {
                                //     resolve(true);
                                // }
                            } else {
                                resolve(true); // 如果获取结算额失败，默认允许保存
                            }
                        });
                    } else {
                        resolve(true); // 如果获取合同额失败，默认允许保存
                    }
                }
            });

        });
    }, "CntPayMDetailToolBar.save");
});