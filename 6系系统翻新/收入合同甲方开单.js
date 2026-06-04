function AllReady() {
	var mstform = Ext.getCmp('CntPayM1');
	var Toolbar = Ext.getCmp('toolbar');
	/*施工图预算wbs选择前触发start*/
	mstform.getItem('user_wbs').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
		var pc = mstform.getItem('PhidPc').getValue();
		if(!pc) {
			NGMsg.Error('请选择工程项目！！！');
			return false;
		} else {
			mstform.getItem('user_wbs').setClientSqlFilter('pcid = ' + pc);
		}
	});

	//选择合同带出收款比例
	mstform.getItem('PhidCnt').addListener('helpselected', function(obj) {
		var PhidCnt = mstform.getItem("PhidCnt").getValue();
		execServer('getzfbl', {
			'phid': PhidCnt
		}, function(res) {
			if(!Ext.isEmpty(res) && res.data[0]) {
				mstform.getItem("SumBl").setValue(res.data[0].zfbl);
			}
		});
	})
	var PhidPc = mstform.getItem("PhidPc").getValue();
	if(PhidPc != '' && PhidPc != null && PhidPc != '0') {
		execServer('xmzt', {
			'phid': PhidPc
		}, function(re) {
			var stat = re.data[0].Stat

			if(stat == 'cpl') {
				mstform.getItem('user_sjsj').setVisible(true);
				mstform.getItem('user_sjsj').userSetMustInput(true);
				mstform.getItem('user_eghyjjs').setVisible(true);
				mstform.getItem('user_eghyjjs').userSetMustInput(true);
				mstform.getItem('user_wgjs').setVisible(true);
				mstform.getItem('user_wgjs').userSetMustInput(true);

			} else {
				mstform.getItem('user_sjsj').setVisible(false);
				mstform.getItem('user_sjsj').userSetMustInput(false);
				mstform.getItem('user_eghyjjs').setVisible(false);
				mstform.getItem('user_eghyjjs').userSetMustInput(false);
				mstform.getItem('user_wgjs').setVisible(false);
				mstform.getItem('user_wgjs').userSetMustInput(false);

			}
		})
	}

	/*施工图预算wbs选择前触发end*/
	mstform.getItem('PhidPc').addListener('change', function(res) {

		var PhidPc = mstform.getItem("PhidPc").getValue();

		execServer('xmzt', {
			'phid': res.value
		}, function(re) {
			var stat = re.data[0].Stat

			if(stat == 'cpl') {
				mstform.getItem('user_sjsj').setVisible(true);
				mstform.getItem('user_sjsj').userSetMustInput(true);
				mstform.getItem('user_eghyjjs').setVisible(true);
				mstform.getItem('user_eghyjjs').userSetMustInput(true);
				mstform.getItem('user_wgjs').setVisible(true);
				mstform.getItem('user_wgjs').userSetMustInput(true);

			} else {
				mstform.getItem('user_sjsj').setVisible(false);
				mstform.getItem('user_sjsj').userSetMustInput(false);
				mstform.getItem('user_eghyjjs').setVisible(false);
				mstform.getItem('user_eghyjjs').userSetMustInput(false);
				mstform.getItem('user_wgjs').setVisible(false);
				mstform.getItem('user_wgjs').userSetMustInput(false);

			}
		})

	})

	/*增加一个推送按钮只在单据审核的时候推送start*/
	if(otype == $Otype.VIEW) {

		Toolbar.insert(8, {
			itemId: "push",
			text: "浪潮推送",
			width: this.itemWidth,
			iconCls: "icon-New"
		});
		//单据页面加载完
		mstform.on('dataready', function() {
			var phid = mstform.queryById("PhId").getValue();
			console.log("phid:",phid);
			var chkflg = mstform.getItem("ChkFlg").getValue();
			var Creator = mstform.getItem("Creator").getValue();
			console.log(Toolbar);
			if(chkflg == '1') {
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
				url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/CntmPay/Insert",
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
	/*业务单据过滤*/
	mstform.getItem('user_ywlx').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
		mstform.getItem('user_ywlx').setOutFilter({
			zd: '业务类型',
			djmc: '对上计价'
		})
	});
}

function getSaveDataEdit(type) {
	if(type == 'Verify') {
		var mstform = Ext.getCmp('FinishCostFillM');
		var bill_no_val = mstform.getItem('BillNo').getValue();
		execServer('YWGCL', {
			'bill_no': bill_no_val
		}, function(res) {
			mstform.getItem('user_bqywgsr').setValue(res.data[0].user_bqywgsr);
		});
	}
}

function beforeSaveEdit() {
	var mstform = Ext.getCmp('CntPayM1');
	var cnt = mstform.getItem('PhidCnt').getValue()
	var pc = mstform.getItem('PhidPc').getValue()
	console.log($Otype.VIEW);
	console.log(otype);
	if(otype == $Otype.ADD) {
		var count = 0;
		execServer('sjcf', {
			'xmphid': pc,
			'htphid': cnt
		}, function(res) {
			if(!Ext.isEmpty(res) && res.data[0]) {
				count = res.data[0].count;
			}
		});
		if(count > 0) {
			NGMsg.Error("该项目合同存在流程未结束的单据，不能保存！");
			return false;
		}

		return true;
	}
	return true;

}