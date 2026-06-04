$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useBeforeOpen, useClick, useBeforeClick }
) {

    var mstform = $NG.getCmpApi('ProjBalM11');
    var dgrid = $NG.getCmpApi('ProjBalD11');
    var Toolbar = $NG.getCmpApi('CntProjBalDetailToolBar');

    useBeforeOpen(({ args }) => {
        $NG.updateUI(function (updater, state) {
            updater.fieldSetForm.ProjBalM11.user_ywlx.setProps({
                clientSqlFilter: ("zd = '业务类型' and djmc = '发票报账单'"),
                placeholder: ``
            });
        });
    }, 'gs_fpbzd_ywlx');

    useBeforeOpen(({ args }) => {
        var user_ywlx = mstform.getItem('user_ywlx').getValue();
        if (user_ywlx == null || user_ywlx == '') {
            mstform.getItem('user_kkxz').setValue('');
            $NG.alert('请先维护业务类型');
            return false;
        }
        $NG.updateUI(function (updater, state) {
            updater.fieldSetForm.ProjBalM11.user_kkxz.setProps({
                clientSqlFilter: ('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') '),
                placeholder: ``
            });
        });
    }, 'htxx_kxxz');
    /*价税合同改变触发start*/
    // useValuesChange(({ args }) => {
    //     var PhidCnt = mstform.getItem('PhidCnt').getValue();

    //     $NG.execServer('gcfbht_01', {
    //         'phid': PhidCnt
    //     }, function (res) {
    //         console.log('res---------', res)
    //         if (res.status != 'success') {
    //             $NG.alert('提示', "sql有误");
    //             return;
    //         }
    //         const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
    //         console.log('data------------->',data)
    //         if (data.length == 1) {
    //             var user_rate = data[0].extendObjects ? data[0].extendObjects.user_rate : data[0].user_rate;
    //             mstform.getItem('user_amt_fc').setValue(mstform.getItem('AppAmtVatFc').getValue() / (1 + parseFloat(user_rate || 0)));
    //             mstform.getItem('user_taxamt').setValue(mstform.getItem('AppAmtVatFc').getValue() - mstform.getItem('user_amt_fc').getValue())
    //         }
    //     });
    // }, "ProjBalM11.AppAmtVatFc");
    /*价税合同改变触发end*/

    /*增加一个推送按钮只在单据审核的时候推送start*/
    if ($NG.getQueryValue('oType') == 'view') {

        Toolbar.insert({
            id: "push",
            text: "推送浪潮",
            iconCls: "icon-New"
        }, 8);
        //单据页面加载完
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
                    url: "http://172.20.65.5:30599/new_esey/lcApi/pushHtFk?phid=" + $NG.getQueryValue('PhId'),
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

        var phid = mstform.queryById("PhId").getValue();
        var chkflg = mstform.getItem("AppStatus").getValue();
        console.log("chkflg:", chkflg);
        var Creator = mstform.getItem("Creator").getValue();
        if (chkflg == '1') {
            console.log("我走到了吗");
            //Toolbar.get('applycheck').disable();
            /*setTimeout(function () {
              Toolbar.get('applycheck').disable();
            }, 1000)*/

            var temp = 0;

            $NG.execServer('jsqxsq', {
                'a': $NG.getUser().userID
            }, function (res) {
                console.log("res:", res);
                if (res.status != 'success') {
                    $NG.alert('提示', "sql有误");
                    return;
                }
                const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].extendObjects ? data[i].extendObjects.roleno == 'admin01' : data[i].extendObjects.roleno == 'admin01') {
                        temp = 1;
                    }
                }
                if (temp == 1) {
                    Toolbar.getItem('IMPPushTask').setReadOnly(false);
                } else {
                    if (Creator == $NG.getUser().userID) {
                        Toolbar.getItem('IMPPushTask').setReadOnly(false);
                    } else {
                        Toolbar.getItem('IMPPushTask').setReadOnly(true);
                    }
                }
            });

        } else {
            Toolbar.getItem('IMPPushTask').setReadOnly(true);
        }

    }

    /*增加一个推送按钮只在单据审核的时候推送end*/


    useUpdateRow(({ args, table }) => {
        console.log("args:", args);
        console.log("args[0]:", args[0]);
        if (args[0].AmtVatFc > args[0].user_fbjsje) {
            args[0].AmtVatFc = 0;
            $NG.alert('本次申请金额不能大于剩余结算金额');
            return false;
        }
        var PhidCnt = mstform.getItem('PhidCnt').getValue();
        $NG.execServer('gcfbht_01', {
            'phid': PhidCnt
        }, function (res) {
            if (res.status != 'success') {
                $NG.alert('提示', "sql有误");
                return;
            }
            if (res.count > 0) {
                const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
                if (data.length == 1) {
                    user_rate = data[0].extendObjects ? data[0].extendObjects.user_rate : data[0].user_rate;
                    // 不含税金额
                    mstform.getItem('user_amt_fc').setValue(mstform.getItem('AppAmtVatFc').getValue() / (1 + parseFloat(user_rate || 0)));
                    // 税额
                    mstform.getItem('user_taxamt').setValue((mstform.getItem('AppAmtVatFc').getValue() - (mstform.getItem('AppAmtVatFc').getValue() / (1 + parseFloat(user_rate || 0)))))
                }
            }
        });
    }, "ProjBalD11");
})