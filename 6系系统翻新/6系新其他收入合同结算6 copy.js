function AllReady() {
	var mstform = Ext.getCmp('CntPayM3');
	var Toolbar = Ext.getCmp('toolbar');
//	/*增加一个推送按钮只在单据审核的时候推送start*/
//	if(otype == $Otype.VIEW) {
//		Toolbar.insert(8, {
//			itemId: "push",
//			text: "推送",
//			width: this.itemWidth,
//			iconCls: "icon-New"
//		});
//		//单据页面加载完
//		mstform.on('dataready', function() {
//			var phid = mstform.queryById("PhId").getValue();
//			var chkflg = mstform.getItem("ChkFlg").getValue();
//			if(chkflg == '1') {
//				var temp = 0;
//				execServer('jsqxsq', {
//					'a': $appinfo.userID
//				}, function(res) {
//					for(var i = 0; i < res.data.length; i++) {
//						if(res.data[i].roleno == 'admin01') {
//							temp = 1;
//						}
//					}
//					if(temp == 1) {
//						Toolbar.get('push').enable();
//					} else {
//						Toolbar.get('push').disable();
//					}
//				});
//
//			} else {
//				Toolbar.get('push').disable();
//			}
//
//		});
//	}
//
//	/*增加一个推送按钮只在单据审核的时候推送end*/
//
//	/*根据推送按钮推送点击事件推送数据start*/
//	if(otype == $Otype.VIEW) {
//		Toolbar.items.get('push').on('click', function() {
//			var user_cwxtsfjs = mstform.getItem('user_cwxtsfjs').getValue();
//			if(user_cwxtsfjs == '1') {
//				Ext.Msg.alert('提示', '财务系统已存在，不可推送');
//				return false;
//			}
//
//			/*AJAX请求start*/
//			Ext.Ajax.request({
//				type: 'POST',
//				dataType: 'json',
//				contentType: 'application/json;charset=UTF-8',
//				jsonData: {
//					"phid": mstform.queryById("PhId").getValue()
//				},
//				url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/CntmPay/Insert",
//				async: false, //同步请求
//				success: function(response) {
//					window.wait = false;
//					var resdata = JSON.parse(response.text);
//					var status = resdata["status"];
//					var message = resdata["message"];
//					if(status == "success") {
//						Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {
//
//						});
//					} else {
//						Ext.MessageBox.alert(Lang.Notes || '提示', message, function() {});
//					}
//				},
//				failure: function(response, opts) {
//					myMask.hide();
//					window.wait = false;
//					var resdata = JSON.parse(response.text);
//					var status = resdata["status"];
//					var message = resdata["message"];
//					Ext.MessageBox.alert(Lang.Notes || '提示', message);
//				}
//			});
//			/*AJAX请求end*/
//
//		});
//	}
//	/*根据推送按钮推送点击事件推送数据end*/
	mstform.getItem('user_ywlx').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
		mstform.getItem('user_ywlx').setOutFilter({
			zd: '业务类型',
			djmc: '发票报账单'
		})
	});
}