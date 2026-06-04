function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700165_m');
    mstform.getItem('checkpsn').hide();//隐藏
    mstform.getItem('fillpsn').hide();


    mstform.getItem('empid').addListener('helpselected', function (obj) {
        var fgldphid = mstform.getItem("empid").getValue();
        execServer('zyjk_getygxx', {
            'phid': fgldphid
        }, function (res) {
            if (!Ext.isEmpty(res) && res.data[0]) {
                mstform.getItem("u_dh").setValue(res.data[0].phone); //电话
            }
        });
    })
    mstform.getItem('u_shuxing').addListener('change', function () {
        var u_shuxing = mstform.getItem('u_shuxing').getValue();
        if (u_shuxing == '1') {//一次性办结
            mstform.getItem('u_qk').hide();
            mstform.getItem('datetimecol_1').hide();
            mstform.getItem('u_yjsj').hide();
            mstform.getItem('u_bqkz').hide();
            mstform.getItem('u_wtcs').hide();

            mstform.getItem('ddlbcol_1').show();//可见
            mstform.getItem('u_bjsj').show();
            mstform.getItem('u_yqbjsj').show();
            mstform.getItem('textcol_1').show();
            mstform.getItem('u_bq').show();

        } else if (u_shuxing == '2') {//持续性

            mstform.getItem('ddlbcol_1').hide();
            mstform.getItem('u_bjsj').hide();
            mstform.getItem('u_yqbjsj').hide();
            mstform.getItem('textcol_1').hide();
            mstform.getItem('u_bq').hide();

            mstform.getItem('u_qk').show();
            mstform.getItem('datetimecol_1').show();
            mstform.getItem('u_yjsj').show();
            mstform.getItem('u_bqkz').show();
            mstform.getItem('u_wtcs').show();
        }
    })
    //一次性办结事项 
    mstform.getItem('ddlbcol_1').addListener('change', function () {
        var ddlbcol_1 = mstform.getItem('ddlbcol_1').getValue();
        if (ddlbcol_1 == '1') {//是
            mstform.getItem('u_bjsj').userSetReadOnly(false);//办结时间
            mstform.getItem('u_bjsj').userSetMustInput(true);//办结时间
            mstform.getItem('u_yqbjsj').userSetReadOnly(true);
            mstform.getItem('textcol_1').userSetReadOnly(true);//只读
            //mstform.getItem('u_bq').userSetReadOnly(true);   
            mstform.getItem('u_yqbjsj').userSetMustInput(false);
            mstform.getItem('textcol_1').userSetMustInput(false);
            //mstform.getItem('u_bq').userSetMustInput(false); 
        } else if (ddlbcol_1 == '2') {//否
            mstform.getItem('u_bjsj').userSetMustInput(false);//办结时间
            mstform.getItem('u_bjsj').userSetReadOnly(true);//办结时间
            mstform.getItem('u_yqbjsj').userSetMustInput(true);
            mstform.getItem('textcol_1').userSetMustInput(true);
            //mstform.getItem('u_bq').userSetMustInput(true);   

            mstform.getItem('u_yqbjsj').userSetReadOnly(false);
            mstform.getItem('textcol_1').userSetReadOnly(false);
            //mstform.getItem('u_bq').userSetReadOnly(false);
        }
    })
    //持续性落实事项
    mstform.getItem('u_qk').addListener('change', function () {
        var u_qk = mstform.getItem('u_qk').getValue();
        if (u_qk == '1') {//是
            mstform.getItem('datetimecol_1').userSetReadOnly(false);
            mstform.getItem('datetimecol_1').userSetMustInput(true);//办结时间
            mstform.getItem('u_yjsj').userSetReadOnly(true);
            mstform.getItem('u_yjsj').userSetMustInput(false);

        } else if (u_qk == '2') {//否
            mstform.getItem('datetimecol_1').userSetMustInput(false);
            mstform.getItem('datetimecol_1').userSetReadOnly(true);
            mstform.getItem('u_yjsj').userSetMustInput(true);
            mstform.getItem('u_yjsj').userSetReadOnly(false);

        }
    })




}



