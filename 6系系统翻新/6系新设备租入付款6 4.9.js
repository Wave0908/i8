$NG.AllReady(function (
	editPage,
	{ useAction, useValuesChange, useDataIndexChange, useUpdateRows, onBeforeTriggerClick, useUpdateRow, useClick, useBeforeClick, useBeforeOpen }
) {
	console.log("111");
	var mstform = $NG.getCmpApi("ProjBalM10");
	var Toolbar = $NG.getCmpApi("CntProjBalDetailToolBar");
	var dgrid = $NG.getCmpApi("ProjBalD10");
	console.log("$NG.getUser().userID", $NG.getUser().userID);

	//var dstore = dgrid.store;
	// useBeforeClick(() => { //帮助窗口打开前事件
	// 	console.log("useBeforeClick====");
	// 	mstform.getItem('user_kkxz').setValue();
	// 	// 移除未定义变量的引用
	// 	//mstform.getItem('user_ywlx').setClientSqlFilter("zd='业务类型' and djmc='发票报账单' and u_sfqy=1");
	// 	mstform.setConfig({
	// 		user_ywlx: {
	// 			ClientSqlFilter: { zd: '业务类型', gs_mc: '发票报账单', u_sfqy: 1 }
	// 		}
	// 	});
	// }, "ProjBalM10.user_ywlx");
	// mstform.getItem('user_ywlx').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
	// 	mstform.getItem('user_kkxz').setValue();
	// 	console.log("beforetriggerclick");
	// 	mstform.getItem('user_ywlx').setClientSqlFilter("zd='业务类型' and gs_mc='发票报账单' and u_sfqy=1");
	// });
	// mstform.setConfig({
	// 	user_ywlx: {
	// 		clientSqlFilter: { zd: '业务类型', gs_mc: '发票报账单', u_sfqy: 1 }
	// 	},
	// });
	useBeforeOpen((data) => {
		mstform.getItem('user_kkxz').setValue();
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.ProjBalM10.user_ywlx.setProps({
				clientSqlFilter: ("zd='业务类型' and djmc='发票报账单' and u_sfqy=1"),	//根据
				placeholder: ``
			});
		});
	}, 'gs_fpbzd_ywlx');
	// useAction("onBeforeTriggerClick")(({ args }) => {
	// 	console.log("onBeforeTriggerClick====");
	// 	mstform.getItem('user_kkxz').setValue();
	// 	// 移除未定义变量的引用
	// 	//mstform.getItem('user_ywlx').setClientSqlFilter("zd='业务类型' and djmc='发票报账单' and u_sfqy=1");
	// 	mstform.setConfig({
	// 		user_ywlx: {
	// 			ClientSqlFilter: { zd: '业务类型', gs_mc: '发票报账单', u_sfqy: 1 }
	// 		}
	// 	});
	// }, "ProjBalM10.user_ywlx");
	// useBeforeClick(() => { //帮助窗口打开前事件
	// 	var user_ywlx = mstform.getItem('user_ywlx').getValue();
	// 	console.log("=======");
	// 	if (user_ywlx == null || user_ywlx == '') {
	// 		$NG.alert('提示', '请先维护业务类型');
	// 		return false;
	// 	}
	// 	mstform.getItem('user_kkxz').setClientSqlFilter('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') ');
	// }, "ProjBalM10.user_kkxz");
	useBeforeOpen(({ args }) => {
		var user_ywlx = mstform.getItem('user_ywlx').getValue();
		console.log("=======user_ywlx:", user_ywlx);
		if (user_ywlx == null || user_ywlx == '') {
			mstform.getItem('user_kkxz').setValue('');
			$NG.alert('请先维护业务类型');
			return false;
		}
	}, 'htxx_kxxz');
	/*价税合同改变触发start*/
	// useValuesChange(({ args }) => {
	// 	var PhidCnt = mstform.getItem('PhidCnt').getValue();

	// 	$NG.execServer('gcfbht_01', {
	// 		'phid': PhidCnt
	// 	}, function (res) {
	// 		if (res.status != 'success') {
	// 			$NG.alert('提示', "sql有误");
	// 			return;
	// 		}
	// 		const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data;
	// 		console.log('data----------->', data)
	//         if (data.length == 1) {
	// 			var user_rate = data[0].extendObjects ? data[0].extendObjects.user_rate : data[0].user_rate;
	// 			mstform.getItem('user_amt_fc').setValue(mstform.getItem('AppAmtVatFc').getValue() / (1 + parseFloat(user_rate || 0)));
	// 			mstform.getItem('user_taxamt').setValue(mstform.getItem('AppAmtVatFc').getValue() - mstform.getItem('user_amt_fc').getValue())
	// 		}
	// 	});
	// }, "ProjBalM10.AppAmtVatFc");
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
					var user_rate = data[0].extendObjects ? data[0].extendObjects.user_rate : data[0].user_rate;
					mstform.getItem('user_amt_fc').setValue(mstform.getItem('AppAmtVatFc').getValue() / (1 + parseFloat(user_rate || 0)));
					mstform.getItem('user_taxamt').setValue((mstform.getItem('AppAmtVatFc').getValue() - mstform.getItem('user_amt_fc').getValue()))
				}
			}
		});
	}, "ProjBalD10");
	/*价税合同改变触发end*/
	console.log("$NG.getQueryValue('oType') == 'view':", $NG.getQueryValue('oType') == 'view');
	/*增加一个推送按钮只在单据审核的时候推送start*/
	if ($NG.getQueryValue('otype') == 'view') {
		Toolbar.insert({
			id: "push",
			text: "推送浪潮",
			iconCls: "icon-New"
		}, 8);
		//单据页面加载完
		//var phid = mstform.queryById("PhId").getValue();
		var AppStatus = mstform.getItem("AppStatus").getValue();
		var Creator = mstform.getItem("Creator").getValue();
		setTimeout(function () {
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
		}, 200);

		useAction('onClick')(() => {
			console.log("点击了推送按钮");
			var user_cwxtsfjs = mstform.getItem('user_cwxtsfjs').getValue();
			if (user_cwxtsfjs == '1') {
				$NG.alert('财务系统已存在，不可推送');
				return false;
			}
			var PhidCnt = mstform.getItem('PhidCnt').getValue();
			if (PhidCnt) {
				$NG.execServer('cxlczd', {
					'billno': PhidCnt,
				}, function (res) {
					if (res.count > 0) {
						var data = JSON.parse(res.data)
						var user_lcglzz = data[0].extendObjects.user_lcglzz;
						var user_lcssxmb = data[0].extendObjects.user_lcssxmb;
						var user_lcywdy = data[0].extendObjects.user_lcywdy;
						var user_lchsbmzjm = data[0].extendObjects.user_lchsbmzjm;
						if (user_lcglzz && user_lcssxmb && user_lcywdy && user_lchsbmzjm) {
							return true;
						} else {
							$NG.alert('该合同信息台账缺少浪潮相关字段，不可推送');
							return false;
						}
					} else {
						$NG.alert('该合同信息台账未查询到浪潮相关字段，不可推送');
						return false;
					}
				});
			}
			/*AJAX请求start*/
			console.log("$NG.getQueryValue('PhId'):", $NG.getQueryValue('PhId'));
			// TODO url地址不对 需要更新
			$NG.request
				.get({
					url: "http://172.20.65.5:30599/new_esey/lcApi/pushHtFk?phid=" + $NG.getQueryValue('PhId'),
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
	}

	/*增加一个推送按钮只在单据审核的时候推送end*/

	// useUpdateRow(({ args }) => {
	// 	console.log("args:", args);
	// 	console.log("args[0]:", args[0]);
	// 	if (args[0].AmtVatFc > args[0].user_fbjsje) {
	// 		$NG.alert('本次申请金额不能大于剩余结算金额');
	// 		console.log("dgrid:", dgrid);
	// 		return false;
	// 	}
	// }, "ProjBalD10");

});