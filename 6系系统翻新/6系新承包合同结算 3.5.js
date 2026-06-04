$NG.AllReady(function (page,
	{ useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
	var mstform = $NG.getCmpApi('PcmPay1');
	var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');

	const { isChgCnt } = $NG.getQueryValue();
	/*施工图预算wbs选择前触发start*/
	// useBeforeOpen((data) => {
	// 	var pc = mstform.getItem('PhidPc').getValue();
	// 	if (!pc) {
	// 		$NG.alert('请选择工程项目！！！');
	// 		return false;
	// 	} else {
	// 		$NG.updateUI(function (updater, state) {
	// 			updater.fieldSetForm.PcmPay1.user_wbs.setProps({
	// 				clientSqlFilter: ('pcid = ' + pc),
	// 				placeholder: ``
	// 			});
	// 		});
	// 		return true;
	// 	}
	// }, 'wbs_01');
	/*施工图预算wbs选择前触发end*/

	if ($NG.getQueryValue('oType') == 'view') {
		console.log("dataready");
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		console.log("Toolbar.getButtons():", Toolbar.getButtons());
		if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') { // 现在啥问题？？   现在user_istbinspur  =4   应该是不只读  但现在前端是只读的  
			Toolbar.getItem('applyForReview').setReadOnly(true);
		} else {
		  Toolbar.getItem('IMPPushTask').setReadOnly(true);      
			Toolbar.getItem('applyForReview').setReadOnly(false);   //这个按钮  获取不到
			setTimeout(() => {Toolbar.getItem('applyForReview').setProps({disabled:false})}, 100);//以后只用这个么  还是setonly  ye 等会  这个问题我还在想哪里又设置了这个disabled，我在问别人，你等一下
		}

	} else {
		if (!isChgCnt == '1') {
			Toolbar.getItem('applyForReview').setReadOnly(true);
		}
	}

	//选择合同带出收款比例
	useValuesChange(({
		args
	}) => {
		var PhidCnt = mstform.getItem("PhidCnt").getValue();
		if (!PhidCnt) {
			return false;
		}
		$NG.execServer('getzfbl', {
			'phid': PhidCnt
		}, function (res) {
			if (res.count > 0) {
				var data = JSON.parse(res.data)
				mstform.getItem("SumBl").setValue(data[0].extendObjects.zfbl);
			}
		});
	}, 'PcmPay1.PhidCnt');

	var PhidPc = mstform.getItem('PhidPc').getValue();
	if (PhidPc) {
		$NG.execServer('xmzt', {
			'phid': PhidPc
		}, function (res) {
			var data = JSON.parse(res.data)
			var stat = data[0].extendObjects.Stat
			if (stat == 'cpl') {
				mstform.getItem('user_sjsj').setProps({
					required: true, //required是否必输
					hidden: false
				});
				mstform.getItem('user_eghyjjs').setProps({
					required: true, //required是否必输
					hidden: false
				});
				mstform.getItem('user_wgjs').setProps({
					required: true, //required是否必输
					hidden: false
				});
			} else {
				mstform.getItem('user_sjsj').setProps({
					required: false, //required是否必输
					hidden: true
				});
				mstform.getItem('user_eghyjjs').setProps({
					required: false, //required是否必输
					hidden: true
				});
				mstform.getItem('user_wgjs').setProps({
					required: false, //required是否必输
					hidden: true
				});
			}
		})
	}

	useValuesChange(({ args }) => {
		var PhidPc = mstform.getItem("PhidPc").getValue();
		if (!PhidPc) {
			return false;
		}
		$NG.execServer('xmzt', {
			'phid': PhidPc
		}, function (res) {
			var data = JSON.parse(res.data);
			var stat = data[0].extendObjects.Stat
			if (stat == 'cpl') {
				mstform.getItem('user_sjsj').setProps({
					required: true, //required是否必输
					hidden: false
				});
				mstform.getItem('user_eghyjjs').setProps({
					required: true, //required是否必输
					hidden: false
				});
				mstform.getItem('user_wgjs').setProps({
					required: true, //required是否必输
					hidden: false
				});
			} else {
				mstform.getItem('user_sjsj').setProps({
					required: false, //required是否必输
					hidden: true
				});
				mstform.getItem('user_eghyjjs').setProps({
					required: false, //required是否必输
					hidden: true
				});
				mstform.getItem('user_wgjs').setProps({
					required: false, //required是否必输
					hidden: true
				});
			}
		})
	}, 'PcmPay1.PhidPc');

	/*增加一个推送按钮只在单据审核的时候推送start*/
	if ($NG.getQueryValue('otype') == "view") {
		Toolbar.insert({
			id: "push",
			text: "浪潮推送",
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
					console.log('res======================>', res);
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
		// var phid = mstform.queryById("PhId").getValue();
		var AppStatus = mstform.getItem("AppStatus").getValue();
		var Creator = mstform.getItem("Creator").getValue();
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
	}
	/*增加一个推送按钮只在单据审核的时候推送end*/

	/*业务单据过滤*/
	$NG.updateUI(function (updater, state) {
		updater.fieldSetForm.PcmPay1.user_ywlx.setProps({
			clientSqlFilter: ("zd = '业务类型' and djmc = '对上计价' "),
			placeholder: ``
		});
	});

	useBeforeClick(({
		args
	}) => {
		var cnt = mstform.getItem('PhidCnt').getValue()
		var pc = mstform.getItem('PhidPc').getValue()
		if ($NG.getQueryValue('otype') == "add") {
			var count = 0;
			$NG.execServer('sjcf', {
				'xmphid': pc,
				'htphid': cnt
			}, function (res) {
				if (res.count > 0) {
					var data = JSON.parse(res.data)
					count = data[0].extendObjects.count;
				}
			});
			if (count > 0) {
				$NG.alart("该项目合同存在流程未结束的单据，不能保存！");
				return false;
			}
			return true;
		}
		return true;
	}, "CntPayMDetailToolBar.save");

	/** 字段user_bqywgsr 疑似移除 */
	// if ($NG.getQueryValue('otype') == "edit") {
	// 	var mstform = Ext.getCmp('FinishCostFillM');
	// 	var bill_no_val = mstform.getItem('BillNo').getValue();
	// 	$NG.execServer('YWGCL', {
	// 		'bill_no': bill_no_val
	// 	}, function (res) {
	// 		mstform.getItem('user_bqywgsr').setValue(res.data[0].user_bqywgsr);
	// 	});
	// }
});