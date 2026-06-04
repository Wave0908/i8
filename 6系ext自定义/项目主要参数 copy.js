function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700078_m');
    var Toolbar = Ext.getCmp('toolbar');
    mstform.getItem('bill_no').userSetReadOnly(true);
    // 点击项目名称 带出项目编号
    mstform.getItem('textcol_13').setVisible(false);
    mstform.getItem('textcol_14').setVisible(false);
    mstform.getItem('numericcol_1').setVisible(false);
    mstform.getItem('numericcol_2').setVisible(false);
    mstform.getItem('numericcol_3').setVisible(false);
    mstform.getItem('numericcol_4').setVisible(false);
    mstform.getItem('numericcol_5').setVisible(false);
    mstform.getItem('numericcol_6').setVisible(false);
    mstform.getItem('numericcol_7').setVisible(false);
    mstform.getItem('numericcol_8').setVisible(false);
    mstform.getItem('numericcol_9').setVisible(false);
    mstform.getItem('numericcol_10').setVisible(false);
    mstform.getItem('numericcol_11').setVisible(false);
    mstform.getItem('numericcol_12').setVisible(false);
    mstform.getItem('numericcol_13').setVisible(false);
    mstform.getItem('numericcol_14').setVisible(false);
    mstform.getItem('numericcol_15').setVisible(false);
    mstform.getItem('numericcol_17').setVisible(false);
    mstform.getItem('numericcol_18').setVisible(false);
    mstform.getItem('numericcol_19').setVisible(false);
	mstform.getItem('numericcol_20').setVisible(false);
	mstform.getItem('numericcol_21').setVisible(false);
	mstform.getItem('numericcol_22').setVisible(false);
	mstform.getItem('numericcol_23').setVisible(false);
	mstform.getItem('numericcol_24').setVisible(false);
	mstform.getItem('numericcol_25').setVisible(false);
    mstform.getItem('textcol_15').setVisible(false);
    mstform.getItem('textcol_16').setVisible(false);
    mstform.getItem('textcol_17').setVisible(false);
    mstform.on('dataready', function () {
        var dt = mstform.getItem('bill_dt').getValue();
        var pc = mstform.getItem('pc').getValue();


        // 对 项目类型进行判断

    })
    mstform.getItem('pc').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        var ocode = mstform.getItem('ocode').getValue();
        //帮助窗口打开前事件
        mstform.getItem('pc').setClientSqlFilter('project_table.virtual_flg=4' + 'and  project_table.Cat_PhId=' + ocode);              /*PC对应通用帮助拼接SQL语句条件过滤 
         ocode                                                                                                 *arr的用法可能不对，这里是SQL语句的拼接 arr数组无法In识别*/
    });
    mstform.getItem('pc').addListener('helpselected', function (e) {

        mstform.getItem('u_xhh').setValue(e.data.PcNo);
        
        var pc = e.data.PhId
        callServer('xm', [{ 'pc': pc }], function (res) {
            console.log(res);
            var record = res.record[0].pc
            if (record != 0) {
                Ext.MessageBox.confirm('提示', '项目已存在主要参数', function (e) {
                    mstform.getItem('pc').setValue('')
                   // headData()
                })
                return true;
            } else {
                var dt = mstform.getItem('bill_dt').getValue();
                var pc = mstform.getItem('pc').getValue();
                // 对 项目类型进行判断
                callServer('xmmc', [{ 'pc': pc }], function (res) {
                    var projectname = res.record[0].projectname
                    mstform.getItem('title').setValue(forDate(dt) + projectname);
                });
            }
        });
        mstform.getItem('u_zycs').setValue(e.data.PhIdType);
        BatchBindCombox([mstform.getItem('u_zycs')]);
    });

    mstform.getItem('u_zycs').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        //帮助窗口打开前事件
        mstform.getItem('u_zycs').setClientSqlFilter('grade = 1');
    });
    mstform.getItem('u_zycs').addListener('change', function (e) {
        var zycs = mstform.getItem('u_zycs').getValue();
        chlx(zycs)
        //headData()
    });
    if (otype == $Otype.ADD) {
        var pc = mstform.getItem('pc').getValue();
        if (pc != '') {
            callServer('xm', [{ 'pc': pc }], function (res) {
                
                var record = res.record[0].pc
                if (record != 0) {
                    Ext.MessageBox.confirm('提示', '项目已存在主要参数', function (e) {
                        mstform.getItem('pc').setValue('')
                        headData()
                    })
                    return true;
                }

            });
        }
    }
    function chlx(e) {
        if (e == '974191216000024') {
            // 电力工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('装机容量·万kw');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('送电线路长度·km');
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
			mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '224220303000006') {
            //通讯工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('线路长度·km');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('基站座数·座');
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000038') {
            //其他工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('建筑面积·㎡');
            mstform.getItem('numericcol_2').setVisible(false);
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
            mstform.getItem('numericcol_20').setVisible(false);
			mstform.getItem('numericcol_21').setVisible(false);
			mstform.getItem('numericcol_22').setVisible(false);
			mstform.getItem('numericcol_23').setVisible(false);
			mstform.getItem('numericcol_24').setVisible(false);
			mstform.getItem('numericcol_25').setVisible(true);
			mstform.getItem('numericcol_25').setFieldLabel('最大基坑深度·m');
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '600191202000003') {
            //房屋建筑工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('建筑面积·㎡');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('建筑最大高度·m');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('最大基坑深度·m');
            mstform.getItem('numericcol_4').setVisible(true);
            mstform.getItem('numericcol_4').setFieldLabel('>100m建筑栋数·栋');
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000032') {
            //钢结构工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('工程量·吨');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('高度·m');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('最大跨度·m');
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('结构类型');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000030') {
            //石油化工工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('生产能力·万吨/年');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('输送量·吨(m3)/年');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('储存量·万m3');
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000029') {
            //机电工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('线路长度·km');
            mstform.getItem('numericcol_2').setVisible(false);
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000025') {
            //矿山工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('年产量·万吨');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('露天矿·万吨');
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
			mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000020') {
            //公路工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('主线里程·km');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('特大桥数量·座');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('最长特大桥多孔跨径总长·m');
            mstform.getItem('numericcol_4').setVisible(true);
            mstform.getItem('numericcol_4').setFieldLabel('最长特大桥单孔跨径·m');
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(true);
            mstform.getItem('numericcol_15').setFieldLabel('桥隧占比');
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(true);
	    mstform.getItem('numericcol_20').setFieldLabel('特长隧道数量·座');
	    mstform.getItem('numericcol_21').setVisible(true);
	    mstform.getItem('numericcol_21').setFieldLabel('最长特长隧道长度·m');
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(false);
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
			
        } else if (e == '974191216000027') {
            //民航工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('跑道长度·m');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('航道楼建筑面积·㎡');
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('航站楼结构类型');
            mstform.getItem('textcol_16').setVisible(true);
            mstform.getItem('textcol_16').setFieldLabel('跑道级别');
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000023') {
            //水利水电工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('大坝坝高·m');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('库容·万m3');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('电站装机容量·kw');
            mstform.getItem('numericcol_4').setFieldLabel('拦河闸流量·m3/s');
            mstform.getItem('numericcol_4').setVisible(true);
            mstform.getItem('numericcol_5').setVisible(true);
            mstform.getItem('numericcol_5').setFieldLabel('灌溉、排水泵站装机功率·kw');
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
			mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
            
        } else if (e == '974191216000022') {
            //港口与航道工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('设计停靠能力·吨');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('航道长度·km');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('航道工程·吨级');
            mstform.getItem('numericcol_4').setVisible(true);
            mstform.getItem('numericcol_4').setFieldLabel('船闸工程·吨级');
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(false);
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000028') {
            //市政公用工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('主线长度·km');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('桥梁跨度·m');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('管廊长度·km');
            mstform.getItem('numericcol_4').setVisible(true);
            mstform.getItem('numericcol_4').setFieldLabel('污水处理能力·万吨/日');
            mstform.getItem('numericcol_5').setVisible(true);
            mstform.getItem('numericcol_5').setFieldLabel('给水能力·万吨/日');
            mstform.getItem('numericcol_6').setVisible(true);
            mstform.getItem('numericcol_6').setFieldLabel('隧道断面面积·㎡');
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(true);
            mstform.getItem('numericcol_15').setFieldLabel('桥隧占比');
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('其他');
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(true);
		mstform.getItem('numericcol_22').setFieldLabel('管沟线路长度·km');
		mstform.getItem('numericcol_23').setVisible(true);
		mstform.getItem('numericcol_23').setFieldLabel('管线长度·km');
		mstform.getItem('numericcol_24').setVisible(true);
		mstform.getItem('numericcol_24').setFieldLabel('电力电缆长度·km');
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000021') {
            //铁路工程	km	桥隧占比	

            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('正线长度·km');
            mstform.getItem('numericcol_2').setVisible(false);
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(true);
            mstform.getItem('numericcol_15').setFieldLabel('桥隧占比');
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
            mstform.getItem('textcol_15').setVisible(false);
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else if (e == '974191216000026') {
            //冶金工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('原料场跨度·m');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('烧结机面积·㎡');
            mstform.getItem('numericcol_3').setVisible(true);
            mstform.getItem('numericcol_3').setFieldLabel('烧结机台数·台');
            mstform.getItem('numericcol_4').setVisible(true);
            mstform.getItem('numericcol_4').setFieldLabel('焦炉炭化室高度·m');
            mstform.getItem('numericcol_5').setVisible(true);
            mstform.getItem('numericcol_5').setFieldLabel('焦炉座数·座');
            mstform.getItem('numericcol_6').setVisible(true);
            mstform.getItem('numericcol_6').setFieldLabel('炼铁高炉容积·m3');
            mstform.getItem('numericcol_7').setVisible(true);
            mstform.getItem('numericcol_7').setFieldLabel('炼铁高炉座数·座');
            mstform.getItem('numericcol_8').setVisible(true);
            mstform.getItem('numericcol_8').setFieldLabel('炼钢转炉容量·吨');
            mstform.getItem('numericcol_9').setVisible(true);
            mstform.getItem('numericcol_9').setFieldLabel('炼钢转炉座数·座');
            mstform.getItem('numericcol_10').setVisible(true);
            mstform.getItem('numericcol_10').setFieldLabel('炼钢电炉容量·吨');
            mstform.getItem('numericcol_11').setVisible(true);
            mstform.getItem('numericcol_11').setFieldLabel('炼钢电炉座数·座');
            mstform.getItem('numericcol_12').setVisible(true);
            mstform.getItem('numericcol_12').setFieldLabel('轧钢生产线条数·条');
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_13').setFieldLabel(false);
            mstform.getItem('numericcol_14').setVisible(true);
            mstform.getItem('numericcol_14').setFieldLabel('原料场座数·座');
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('textcol_15').setVisible(true);
            mstform.getItem('textcol_15').setFieldLabel('球团炉型');
            mstform.getItem('textcol_16').setVisible(true);
            mstform.getItem('textcol_16').setFieldLabel('球团炉型规格');
            mstform.getItem('textcol_17').setVisible(true);
            mstform.getItem('textcol_17').setFieldLabel('轧钢产品规格');
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_18').setVisible(true);
            mstform.getItem('textcol_18').setFieldLabel('其他');
            
        } else if (e == '974191216000031') {
            //装饰装修工程
            mstform.getItem('numericcol_1').setVisible(true);
            mstform.getItem('numericcol_1').setFieldLabel('建筑面积(内装)·㎡');
            mstform.getItem('numericcol_2').setVisible(true);
            mstform.getItem('numericcol_2').setFieldLabel('幕墙面积·㎡');
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(false);
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        } else {
            mstform.getItem('numericcol_1').setVisible(false);
            mstform.getItem('numericcol_2').setVisible(false);
            mstform.getItem('numericcol_3').setVisible(false);
            mstform.getItem('numericcol_4').setVisible(false);
            mstform.getItem('numericcol_5').setVisible(false);
            mstform.getItem('numericcol_6').setVisible(false);
            mstform.getItem('numericcol_7').setVisible(false);
            mstform.getItem('numericcol_8').setVisible(false);
            mstform.getItem('numericcol_9').setVisible(false);
            mstform.getItem('numericcol_10').setVisible(false);
            mstform.getItem('numericcol_11').setVisible(false);
            mstform.getItem('numericcol_12').setVisible(false);
            mstform.getItem('numericcol_13').setVisible(false);
            mstform.getItem('numericcol_14').setVisible(false);
            mstform.getItem('numericcol_15').setVisible(false);
            mstform.getItem('numericcol_17').setVisible(false);
            mstform.getItem('numericcol_18').setVisible(false);
            mstform.getItem('numericcol_19').setVisible(false);
	    mstform.getItem('numericcol_20').setVisible(false);
	    mstform.getItem('numericcol_21').setVisible(false);
		mstform.getItem('numericcol_22').setVisible(false);
		mstform.getItem('numericcol_23').setVisible(false);
		mstform.getItem('numericcol_24').setVisible(false);
		mstform.getItem('numericcol_25').setVisible(false);
            mstform.getItem('textcol_15').setVisible(false);
            mstform.getItem('textcol_16').setVisible(false);
            mstform.getItem('textcol_17').setVisible(false);
            mstform.getItem('textcol_18').setVisible(false);
        }
    }
    function headData() {
        mstform.getItem('numericcol_1').setValue('')
        mstform.getItem('numericcol_2').setValue('')
        mstform.getItem('numericcol_3').setValue('')
        mstform.getItem('numericcol_4').setValue('')
        mstform.getItem('numericcol_5').setValue('')
        mstform.getItem('numericcol_6').setValue('')
        mstform.getItem('numericcol_7').setValue('')
        mstform.getItem('numericcol_8').setValue('')
        mstform.getItem('numericcol_9').setValue('')
        mstform.getItem('numericcol_10').setValue('')
        mstform.getItem('numericcol_11').setValue('')
        mstform.getItem('numericcol_12').setValue('')
        mstform.getItem('numericcol_13').setValue('')
        mstform.getItem('numericcol_14').setValue('')
        mstform.getItem('numericcol_15').setValue('')
        mstform.getItem('textcol_15').setValue('')
        mstform.getItem('textcol_16').setValue('')
        mstform.getItem('textcol_17').setValue('')
        mstform.getItem('textcol_18').setValue('')
        mstform.getItem('numericcol_17').setValue('')
        mstform.getItem('numericcol_18').setValue('')
        mstform.getItem('numericcol_19').setValue('')
	mstform.getItem('numericcol_20').setVisible('');
	mstform.getItem('numericcol_21').setVisible('');
	mstform.getItem('numericcol_22').setVisible('');
	mstform.getItem('numericcol_23').setVisible('');
	mstform.getItem('numericcol_24').setVisible('');
	mstform.getItem('numericcol_25').setVisible('');

    }
    function forDate(d) {
        var date = new Date(d);
        var YY = date.getFullYear();
        var MM = (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1) :
            date.getMonth() + 1);

        return YY + MM.toString()
    }

}

