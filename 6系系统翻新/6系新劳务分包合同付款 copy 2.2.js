$NG.AllReady(function (page,
	{ useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
	var mstform = $NG.getCmpApi('ProjBalM5');
	var dgrid = $NG.getCmpApi('ProjBalD5');
	var Toolbar = $NG.getCmpApi('CntProjBalDetailToolBar');

	useBeforeOpen((data) => {
		mstform.getItem('user_kkxz').setValue();
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.ProjBalM5.user_ywlx.setProps({
				clientSqlFilter: ("zd='业务类型' and djmc='发票报账单' and u_sfqy=1"),	//根据
				placeholder: ``
			});
		});
	}, 'gs_fpbzd_ywlx');

	useBeforeOpen((data) => {
		var user_ywlx = mstform.getItem('user_ywlx').getValue();
		if (!user_ywlx) {
			$NG.alert('请先维护业务类型');
			return false;
		}
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.ProjBalM5.user_kkxz.setProps({
				clientSqlFilter: ('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') '),	//根据
				placeholder: ``
			});
		});
	}, 'htxx_kxxz');

	useBeforeOpen((data) => {
		var user_ywlx = mstform.getItem('user_ywlx').getValue();
		if (!user_ywlx) {
			$NG.alert('请先维护gs业务类型');
			return false;
		}
		$NG.updateUI(function (updater, state) {
			console.log('updater:==================', updater);
			updater.editGrid.ProjBalD5.user_fyxm.setProps({
				clientSqlFilter: (" u_gsywlxnm in (select gs_nm from  p_form0000000257_d  where  phid =" + user_ywlx + ")"),	//根据
				placeholder: ``
			});
		});
	}, 'gsfpbzdmxbfyxm');

	/*价税合同改变触发start*/
	useValuesChange(({
		args
	}) => {
		var PhidCnt = mstform.getItem('PhidCnt').getValue();
		$NG.execServer('gcfbht_01', {
			'phid': PhidCnt
		}, function (res) {
			var res = JSON.parse(res.data);
			if (res.status != 'success') {
				$NG.alert("sql有误");
				return false;
			}
			if (res.count == 1) {
				var user_rate = data[0].extendObjects.user_rate
				mstform.getItem('user_amt_fc').setValue(mstform.getItem('AppAmtVatFc').getValue() / (1 + Number(user_rate)));
				mstform.getItem('user_taxamt').setValue(mstform.getItem('AppAmtVatFc').getValue() - mstform.getItem('user_amt_fc').getValue())
			}
		});
	}, "ProjBalM5.AppAmtVatFc");
	/*价税合同改变触发end*/

	/*增加一个推送按钮只在单据审核的时候推送start*/
	if ($NG.getQueryValue('otype') == 'view') {
        console.log("$NG.getQueryValue('PhId')", $NG.getQueryValue('PhId'))
		Toolbar.insert({
			id: "push",
			text: "推送浪潮",
			iconCls: "icon-New"
		}, 8);
		//单据页面加载完
		//var phid = mstform.queryById("PhId").getValue();
		var AppStatus = mstform.getItem("AppStatus").getValue();
		var Creator = mstform.getItem("Creator").getValue();
		if (AppStatus == '1') {
			//Toolbar.get('applycheck').disable();
			/*setTimeout(function () {
				Toolbar.get('applycheck').disable();
			}, 1000)*/
			var temp = 0;
			$NG.execServer('jsqxsq', {
				'a': $NG.getUser().userID
			}, function (res) {
				var res = JSON.parse(res.data);
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

	useUpdateRow(({ args }) => {
		if (args[0].AmtVatFc > args[0].user_fbjsje) {
			$NG.alert('本次申请金额不能大于剩余结算金额');
			return false;
		}
	}, "ProjBalD5");

});