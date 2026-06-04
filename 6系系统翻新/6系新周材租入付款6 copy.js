function AllReady() {

	var mstform = Ext.getCmp('CntProjBal11');
	var dgrid = Ext.getCmp('CntProjBalD11');
	var dstore = dgrid.store;
	var Toolbar = Ext.getCmp('toolbar');
	mstform.getItem('user_ywlx').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
		mstform.getItem('user_kkxz').setValue();
		mstform.getItem('user_ywlx').setClientSqlFilter("zd='业务类型' and djmc='发票报账单' and u_sfqy=1");
	});
	mstform.getItem('user_kkxz').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
		var user_ywlx = mstform.getItem('user_ywlx').getValue();
		if(Ext.isEmpty(user_ywlx)) {
			Ext.Msg.alert('提示', '请先维护业务类型');
			return false;
		}
		mstform.getItem('user_kkxz').setClientSqlFilter('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') ');
	});
	/*价税合同改变触发start*/
	mstform.getItem('AppAmtVatFc').addListener('change', function() {
		var PhidCnt = mstform.getItem('PhidCnt').getValue();

		execServer('gcfbht_01', {
			'phid': PhidCnt
		}, function(res) {
			if(res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});

			}
			if(res.data.length == 1) {
				var user_rate = res.data[0].user_rate
				mstform.getItem('user_amt_fc').setValue(mstform.getItem('AppAmtVatFc').getValue() / (1 + Ext.Number.from(user_rate)));
				mstform.getItem('user_taxamt').setValue(mstform.getItem('AppAmtVatFc').getValue() - mstform.getItem('user_amt_fc').getValue())
			}

		});

	});
	/*价税合同改变触发end*/

	/*增加一个推送按钮只在单据审核的时候推送start*/
	if(otype == $Otype.VIEW) {

		Toolbar.insert(8, {
			itemId: "push",
			text: "推送浪潮",
			width: this.itemWidth,
			iconCls: "icon-New"
		});
		//单据页面加载完
		mstform.on('dataready', function() {
			var phid = mstform.queryById("PhId").getValue();
			var chkflg = mstform.getItem("ChkFlg").getValue();
			var Creator = mstform.getItem("Creator").getValue();
			console.log(Toolbar);
			if(chkflg == '1') {
				console.log("我走到了吗");
				//Toolbar.get('applycheck').disable();
				/*setTimeout(function () {
				  Toolbar.get('applycheck').disable();
				}, 1000)*/

				var temp = 0;
				execServer('jsqxsq', {
					'a': $appinfo.userID
				}, function(res) {
					for(var i = 0; i < res.data.length; i++) {
						if(res.data[i].roleno == 'admin01') {
							temp = 1;
						}
					}
					if(temp == 1) {
						Toolbar.get('push').enable();
					} else {
						if(Creator == $appinfo.userID) {
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
	if(otype == $Otype.VIEW) {
		Toolbar.items.get('push').on('click', function() {
			var user_cwxtsfjs = mstform.getItem('user_cwxtsfjs').getValue();
			if(user_cwxtsfjs == '1') {
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
				url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/Pcm3CntProjbal/Insert",
				async: false, //同步请求
				success: function(response) {
					window.wait = false;
					var resdata = JSON.parse(response.text);
					var status = resdata["status"];
					var message = resdata["message"];
					if(status == "success") {
						Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {

						});
					} else {
						Ext.MessageBox.alert(Lang.Notes || '提示', message, function() {});
					}
				},
				failure: function(response, opts) {
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

	dgrid.addListener('edit', function(editor, e) {
		if(e.originalValue == e.value) {
			return;
		}
		if(e.field == 'AmtVatFc') {
			var record = e.record;
			console.log(record);
			if(record.data.AmtVatFc > record.data.user_fbjsje) {
				Ext.Msg.alert('提示', '本次申请金额不能大于剩余结算金额');
				record.set('AmtVatFc', 0)
				return false;
			}

		};
	});

}