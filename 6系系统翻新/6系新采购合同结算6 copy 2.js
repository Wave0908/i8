$NG.AllReady(function (
	editPage,
	{ useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
	var mstform = $NG.getCmpApi('PcmPay7');
	console.log("mstform:", mstform);
	var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');
	console.log("Toolbar:",Toolbar);
	/*增加一个推送按钮只在单据审核的时候推送start*/
	console.log("$NG.getQueryValue('oType'):",$NG.getQueryValue('oType'));
	if ($NG.getQueryValue('oType') == 'view') {
		Toolbar.insert({
			id: "push",
			text: "推送浪潮",
			width: this.itemWidth,
			iconCls: "icon-New"
		}, 8);
		Toolbar.insert({
			id: "wk",
			text: "推送五矿",
			width: this.itemWidth,
			iconCls: "icon-New"
		}, 9);
		//单据页面加载完

		//var phid = $NG.getQueryValue('PhId');
		var chkflg = mstform.getItem("AppStatus").getValue();
		if (chkflg == '1') {
			var temp = 0;
			$NG.execServer('jsqxsq', {
				'a': $NG.getUser().userID
			}, function (res) {
				var data = JSON.parse(res.data);
				console.log("data:", data);
				if (data) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].extendObjects.roleno == 'admin01') {
							temp = 1;
						}
					}
					if (temp == 1) {
						Toolbar.getItem('push').setReadOnly(false);
						Toolbar.getItem('wk').setReadOnly(false);
					} else {
						Toolbar.getItem('push').setReadOnly(true);
						Toolbar.getItem('wk').setReadOnly(true);
					}
				}
			});

		} else {
			Toolbar.getItem('push').setReadOnly(true);
			Toolbar.getItem('wk').setReadOnly(true);
		}


	}

	/*增加一个推送按钮只在单据审核的时候推送end*/

	/*根据推送按钮推送点击事件推送数据start*/
	if ($NG.getQueryValue('oType') == 'view') {
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
			if (user_cwxtsfjs == '1' || new_bill_dt > '2023-01-12') {
				$NG.alert('财务系统是否存在选择是 或 合同制单日期大于2023-01-12');
				return false;
			}
			/*AJAX请求start*/
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

		useAction('onClick')(() => {
			$NG.request
				.get({
					url: "http://172.20.65.5:30599/new_esey/gyl/pushData/cg_cgjsd/" + $NG.getQueryValue('PhId'),
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

		}, 'wk');
	}
	/*根据推送按钮推送点击事件推送数据end*/




	/*业务类型过滤*/
	useBeforeOpen(() => {
		console.log("业务类型过滤=======");
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.PcmPay7.user_ywlx.setProps({
				clientSqlFilter: ("zd ='业务类型' and gs_mc = '发票报账单' "),
				placeholder: ``
			});
		});
	}, 'gs_fpbzd_ywlx');

})
