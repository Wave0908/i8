$NG.AllReady(function (
    editPage,
    { useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
    var mstform = $NG.getCmpApi('PcmPay3');
    var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');


    const { isChgCnt } = $NG.getQueryValue();

    console.log("Toolbar.getItem('applyForReview'):", Toolbar.getItem('applyForReview'))
    if ($NG.getQueryValue('oType') == 'view') {
        console.log("dataready");
        var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
        console.log("Toolbar.getButtons():", Toolbar.getButtons());
        if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') { // 现在啥问题？？   现在user_istbinspur  =4   应该是不只读  但现在前端是只读的  
            Toolbar.getItem('applyForReview').setReadOnly(true);
        } else {
            Toolbar.getItem('IMPPushTask').setReadOnly(true);
            Toolbar.getItem('applyForReview').setReadOnly(false);   //这个按钮  获取不到
            setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: false }) }, 100);//以后只用这个么  还是setonly  ye 等会  这个问题我还在想哪里又设置了这个disabled，我在问别人，你等一下
        }

    } else {
        if (!isChgCnt == '1') {
            Toolbar.getItem('applyForReview').setReadOnly(true);
        }
    }
    /*增加一个推送按钮只在单据审核的时候推送start*/
    if ($NG.getQueryValue('oType') == 'view') {
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
                $NG.alert('财务系统是否存在选择是 或 合同制单日期大于2023-01-12');
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
        var AppStatus = mstform.getItem('ChkFlg').getValue();
        var Creator = mstform.getItem('Creator').getValue();
        setTimeout(() => {
            if (AppStatus == '1') {
                var temp = 0;
                execServer('jsqxsq', {
                    'a': $NG.getUser().userID
                }, function (res) {
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
    /*根据推送按钮推送点击事件推送数据end*/
    useBeforeOpen(() => {
        console.log("业务类型过滤=======");
        $NG.updateUI(function (updater, state) {
            updater.fieldSetForm.PcmPay3.user_ywlx.setProps({
                clientSqlFilter: ("zd ='业务类型' and gs_mc = '发票报账单' "),
                placeholder: ``
            });
        });
    }, 'gs_fpbzd_ywlx');
})