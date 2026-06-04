$NG.AllReady(function (editPage, { useValuesChange, useAction, useBeforeClick, useBeforeOpen, useDataIndexChange, useUpdateRows }) {
	var mstform = $NG.getCmpApi('PcmPay4');
	//var dgrid3 = Ext.getCmp('CntPayDOld4');
	var Toolbar = $NG.getCmpApi('CntPayMDetailToolBar');
	var dgrid = $NG.getCmpApi('PcmPayD4');
	var dgridDesc = $NG.getCmpApi('PcmPayDesc4');
	var dgridReward = $NG.getCmpApi('PcmPayReward4');
	var PhidCnt = mstform.getItem('PhidCnt').getValue();
	var PhidPc = mstform.getItem('PhidPc').getValue();
	console.log('PhidCnt:', PhidCnt);
	console.log('PhidPc:', PhidPc);
	const { isChgCnt } = $NG.getQueryValue();
	if ($NG.getQueryValue('oType') == 'view') {
		console.log("dataready");
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		console.log('user_istbinspur:', user_istbinspur);
		console.log("Toolbar.getButtons():", Toolbar.getButtons());
		if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') { // 现在啥问题？？   现在user_istbinspur  =4   应该是不只读  但现在前端是只读的  
			Toolbar.getItem('applyForReview').setReadOnly(true);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
		} else {
			Toolbar.getItem('IMPPushTask').setReadOnly(true);
			Toolbar.getItem('applyForReview').setReadOnly(false);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: false }) }, 100);//以后只用这个么  还是setonly  ye 等会  这个问题我还在想哪里又设置了这个disabled，我在问别人，你等一下
		}

	} else {
		if (!isChgCnt == '1') {
			Toolbar.getItem('applyForReview').setReadOnly(true);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
		}
	}
	if (PhidCnt && PhidPc) {
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.PcmPay4.user_xxjdqr.setProps({
				clientSqlFilter: (`p_form_0000000068_m.phid_pc ='${PhidPc}' and p_form_0000000068_m.u_htbh = '${PhidCnt}' and p_form_0000000068_m.phid not in (select user_xxjdqr from pcm3_cnt_pay_m where user_xxjdqr is not null)`)
			});
		});
	}
	useValuesChange(({ args }) => {
		var PhidCnt = mstform.getItem('PhidCnt').getValue();
		var PhidPc = mstform.getItem('PhidPc').getValue();
		console.log('PhidCnt:', PhidCnt);
		console.log('PhidPc:', PhidPc);
		if (PhidCnt && PhidPc) {
			$NG.updateUI(function (updater, state) {
				updater.fieldSetForm.PcmPay4.user_xxjdqr.setProps({
					clientSqlFilter: (`p_form_0000000068_m.phid_pc ='${PhidPc}' and p_form_0000000068_m.u_htbh = '${PhidCnt}' and p_form_0000000068_m.phid not in (select user_xxjdqr from pcm3_cnt_pay_m where user_xxjdqr is not null)`)
				});
			});
		}
	}, PcmPay4.PhidCnt);

	// if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {

	//     Toolbar.insert({
	//         id: "refer_desc",
	//         text: "引用扣款会签单",
	//         iconCls: "icon-New"
	//     }, 11)
	//     Toolbar.insert({
	//         id: "refer_reward",
	//         text: "引用奖励会签单",
	//         iconCls: "icon-New"
	//     }, 12)
	//     useAction('onClick')(() => {
	//         console.log('扣款!!!!!!!!!!!!!!!!!')
	//         var PhidCnt = mstform.getItem('PhidCnt').getValue();
	//         console.log('PhidCnt:', PhidCnt);
	//         $NG.external.openHelp({
	//             type: 'MultipleHelp',
	//             helpId: 'yyjchqd',
	//             clientSqlFilter: (`u_jclx = '02' and u_fbht ='${PhidCnt}'`),
	//             onChange: (selectedData) => {
	//                 //selectedData 是用户在帮助框中选择的数据行数组
	//                 console.log('选中的数据行:', selectedData);
	//                 if (selectedData && selectedData.length > 0) {
	//                     for (let i = 0; i < selectedData.length; i++) {
	//                         var djbm = selectedData[i].origin.bill_no;
	//                         $NG.execServer("yyjfkhqd", {
	//                             bill_no: djbm
	//                         }, function (res) {
	//                             if (res) {
	//                                 const data = JSON.parse(res.data);
	//                                 console.log(data);
	//                                 if (data && data.length > 0) {
	//                                     for (let j = 0; j < data.length; j++) {
	//                                         dgridDesc.addRows([{
	//                                             PhidItem: data[j].extendObjects.phiditem,
	//                                             PhidItem_EXName: data[j].extendObjects.phiditem_exname,
	//                                             AmtVatFc: data[j].extendObjects.amtvatfc_d,
	//                                             DesAttr: data[j].extendObjects.desattr,
	//                                             IsDeduct: data[j].extendObjects.isdeduct,
	//                                         },]);
	//                                     }
	//                                 }
	//                             }
	//                         });
	//                     }
	//                 }
	//             }
	//         });
	//     }, 'refer_desc')
	//     useAction('onClick')(() => {
	//         console.log('奖励!!!!!!!!!!!!!!!!!')
	//         var PhidCnt = mstform.getItem('PhidCnt').getValue();
	//         console.log('PhidCnt:', PhidCnt);
	//         $NG.external.openHelp({
	//             type: 'MultipleHelp',
	//             helpId: 'yyjchqd',
	//             clientSqlFilter: (`u_jclx = '01' and u_fbht ='${PhidCnt}'`),
	//             onChange: (selectedData) => {
	//                 //selectedData 是用户在帮助框中选择的数据行数组
	//                 console.log('选中的数据行:', selectedData);
	//                 if (selectedData && selectedData.length > 0) {
	//                     for (let i = 0; i < selectedData.length; i++) {
	//                         var djbm = selectedData[i].origin.bill_no;
	//                         $NG.execServer("yyjfkhqd", {
	//                             bill_no: djbm
	//                         }, function (res) {
	//                             if (res) {
	//                                 const data = JSON.parse(res.data);
	//                                 console.log(data);
	//                                 if (data && data.length > 0) {
	//                                     for (let j = 0; j < data.length; j++) {
	//                                         dgridReward.addRows([{
	//                                             PhidItem: data[j].extendObjects.phiditem,
	//                                             PhidItem_EXName: data[j].extendObjects.phiditem_exname,
	//                                             AmtVatFc: data[j].extendObjects.amtvatfc_d,
	//                                             DesAttr: data[j].extendObjects.desattr,
	//                                             IsDeduct: data[j].extendObjects.isdeduct,
	//                                         },]);
	//                                     }
	//                                 }
	//                             }
	//                         });
	//                     }
	//                 }
	//             }
	//         });
	//     }, 'refer_reward')
	// }

	useBeforeClick(({
		args
	}) => {
		return new Promise((resolve) => {
			console.log('args:', args);
			var flag = 0;
			var PhidCnt = mstform.getItem('PhidCnt').getValue();
			var jse = 0; //结算额
			if (!PhidCnt) {
				$NG.alert("请先选择合同");
				resolve(false);
				return;
			}
			// 先获取合同额
			$NG.execServer('jszje', {
				'phid_cnt': PhidCnt
			}, function (res) {
				if (res.status == 'success' && res.count > 0) {
					var data = JSON.parse(res.data);
					if (data[0].extendObjects.app_amt_vat_fc) {
						jse = data[0].extendObjects.app_amt_vat_fc;
					} else {
						jse = 0.00;
					}
					console.log('已结算额:', jse);

					// 计算本次结算额
					var a = dgrid.getRows();
					var bqjse = 0;
					for (i = 0; i < a.length; i++) {
						bqjse += a[i].AppAmtVatFc;
					}
					console.log('本次结算额:', bqjse);

					// 编辑状态下累加结算额
					if ($NG.getQueryValue('otype') == 'edit' || $NG.getQueryValue('otype') == 'add') {
						jse = Number(jse) + Number(bqjse);
					}
					console.log('总结算额:', jse);

					$NG.execServer('htzjefw', {
						'phid': PhidCnt
					}, function (res) {
						if (res.status == 'success' && res.count > 0) {
							var data1 = JSON.parse(res.data);
							htzjewbc = data1[0].extendObjects.amt_vat_fc_wbc;//合同额*1.05
							htzjeybc = data1[0].extendObjects.amt_vat_fc_ybc;//合同额*1.1
							console.log('合同额*1.05:', htzjewbc);
							console.log('合同额*1.1:', htzjeybc);
							//获取结算额
							if (htzjewbc && htzjeybc) {
								// 比较合同额和结算额
								$NG.execServer('fbhtbcxy', {
									'phid_cnt': PhidCnt
								}, function (res) {
									if (res.count > 0 && Number(jse) > Number(htzjeybc)) {
										flag = 1;
										$NG.alert("累计结算值不能超过合同额的110%");
										resolve(false);
										// return false;
									} else if (res.count == 0 && Number(jse) > Number(htzjeybc)) {
										flag = 1;
										$NG.alert("累计结算值不能超过合同额的110%");
										resolve(false);
										// return false;
									} else {
										resolve(true);
									}
								});
							} else {
								resolve(true); // 如果获取合同额失败，默认允许保存
							}
						}
					});
				} else {
					resolve(true); // 如果获取结算额失败，默认允许保存
				}
			});
		});
	}, "CntPayMDetailToolBar.save");

	var kcje = 0;
	var jlje = 0;

	/*增加一个推送按钮只在单据审核的时候推送start*/
	if ($NG.getQueryValue('otype') == "view") {
		Toolbar.insert({
			id: "push",
			text: "推送浪潮",
			iconCls: "icon-New"
		}, 8);
		//单据页面加载完
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

		var AppStatus = mstform.getItem("AppStatus").getValue();
		var Creator = mstform.getItem("Creator").getValue();
		setTimeout(() => {
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
	}
	/*增加一个推送按钮只在单据审核的时候推送end*/

	useValuesChange(({ args }) => {
		//TODO
		var amt = 0;
		var zfbl = 1;

		if (zfbl != (0, 1)) {
			zfbl = mstform.getItem('user_zfbl').getValue();
		}
		amt = Number(mstform.getItem('AppAmtVatFc').getValue()) || 0;
		zfbl = Number(mstform.getItem('user_zfbl').getValue()) || 0;
		mstform.getItem('user_bqyfkje').setValue(amt * zfbl - kcje + jlje);
	}, "PcmPay4.AppAmtVatFc");

	useValuesChange(({ args }) => {
		var zfbl = (0, 1);
		if (zfbl != (0, 1)) {
			zfbl = mstform.getItem('user_zfbl').getValue();
		}
		var amt = 0;
		amt = Number(mstform.getItem('AppAmtVatFc').getValue()) || 0;
		zfbl = Number(mstform.getItem('user_zfbl').getValue()) || 0;
		mstform.getItem('user_bqyfkje').setValue(amt * zfbl - kcje + jlje);
	}, "PcmPay4.user_zfbl");

	// tabPanel.on('tabchange', function (tabchange, newCard, oldCard, eOpts) {

	// 	if (newCard.id == 'cntpayDesctab') {
	// 		//扣款信息
	// 		var dgrid1 = Ext.getCmp('CntPayDesc4');
	// 		var dstore1 = dgrid1.store;
	// 		// var kcje = 0;
	// 		// var jlje = 0;
	// 		var amt = 0;
	// 		var zfbl = (0, 1);
	// 		if (zfbl != (0, 1)) {
	// 			zfbl = mstform.getItem('user_zfbl').getValue();
	// 		}
	// 		//表体编辑触发
	// 		dgrid1.addListener('edit', function (editor, e) {
	// 			debugger;
	// 			console.log('e======================>', e);
	// 			if (e.originalValue == e.value) {
	// 				return;
	// 			}
	// 			if (e.field == 'AmtVatFc') {
	// 				var record = e.record;
	// 				var a = 0;
	// 				for (i = 0; i < dstore1.getCount(); i++) {
	// 					a = a + Ext.Number.from(dstore1.getAt(i).get('AmtVatFc'), 0)
	// 				}
	// 				kcje = a;
	// 				amt = Ext.Number.from(mstform.getItem('AppAmtVatFc').getValue(), 0);
	// 				zfbl = Ext.Number.from(mstform.getItem('user_zfbl').getValue(), 0);
	// 				mstform.getItem('user_bqyfkje').setValue(amt * zfbl - kcje + jlje);
	// 			};
	// 		});

	// 		dstore1.on('datachanged', function (dstore1) {

	// 			var a = 0;
	// 			for (i = 0; i < dstore1.getCount(); i++) {
	// 				a = a + Ext.Number.from(dstore1.getAt(i).get('AmtVatFc'), 0)
	// 			}
	// 			kcje = a;
	// 			amt = Ext.Number.from(mstform.getItem('AppAmtVatFc').getValue(), 0);
	// 			zfbl = Ext.Number.from(mstform.getItem('user_zfbl').getValue(), 0);
	// 			mstform.getItem('user_bqyfkje').setValue(amt * zfbl - kcje + jlje);

	// 		});

	// 		//奖励信息
	// 		var dgrid2 = Ext.getCmp('CntPayReward4');
	// 		var dstore2 = dgrid2.store;
	// 		//表体编辑触发
	// 		dgrid2.addListener('edit', function (editor, e) {
	// 			if (e.originalValue == e.value) {
	// 				return;
	// 			}
	// 			if (e.field == 'AmtVatFc') {
	// 				var record = e.record;
	// 				var b = 0;
	// 				for (i = 0; i < dstore2.getCount(); i++) {
	// 					b = b + Ext.Number.from(dstore2.getAt(i).get('AmtVatFc'), 0)
	// 				}
	// 				jlje = b;
	// 				amt = Ext.Number.from(mstform.getItem('AppAmtVatFc').getValue(), 0);
	// 				zfbl = Ext.Number.from(mstform.getItem('user_zfbl').getValue(), 0);
	// 				mstform.getItem('user_bqyfkje').setValue(amt * zfbl - kcje + jlje);

	// 			};
	// 		});
	// 		dstore2.on('datachanged', function (dstore2) {
	// 			var b = 0;
	// 			for (i = 0; i < dstore2.getCount(); i++) {
	// 				b = b + Ext.Number.from(dstore2.getAt(i).get('AmtVatFc'), 0)
	// 			}
	// 			jlje = b;
	// 			amt = Ext.Number.from(mstform.getItem('AppAmtVatFc').getValue(), 0);
	// 			zfbl = Ext.Number.from(mstform.getItem('user_zfbl').getValue(), 0);
	// 			mstform.getItem('user_bqyfkje').setValue(amt * zfbl - kcje + jlje);

	// 		});

	// 	}
	// });

	//对业务类型过滤
	$NG.updateUI(function (updater, state) {
		updater.fieldSetForm.PcmPay4.user_ywlx.setProps({
			clientSqlFilter: ("zd = '业务类型' and djmc = '对下计价' "),	//根据
			placeholder: ``
		});
	});

	if (mstform) {
		//是否签证 默认问时
		mstform.getItem('user_sfqr').setValue('1');
	}
	/*子表的单位工程通用帮助选择前start*/
	// dgrid3.getColumn('user_kxxz_name').getEditor().addListener('beforetriggerclick', function () {
	// 	if (Ext.isEmpty(mstform.getItem('user_ywlx').getValue())) {
	// 		Ext.Msg.alert('提示', "请先选择业务类型");
	// 		return false;
	// 	}
	// 	var user_ywlx = mstform.getItem('user_ywlx').getValue();
	// 	dgrid3.getColumn('user_kxxz_name').getEditor().setClientSqlFilter('u_gsywlxnm = (select gs_nm from p_form0000000257_d where phid=' + user_ywlx + ') ');
	// });
	/*子表的单位工程通用帮助选择前end*/

}, function () {
	console.log('list Ready');
});


//保存前检测  2024年12月9号预算部杨晓珺要求去掉500万限制
/*function beforeSaveEdit() {
	
	var mstform = Ext.getCmp('CntPayM4');
	var tabPanel = Ext.getCmp('tabPanel');
	var dgrid = Ext.getCmp('CntPayDOld4');
	var dstore = dgrid.store;
	var Toolbar = Ext.getCmp('toolbar');
	var flag = 0;
	var PhidCnt = mstform.getItem('PhidCnt').getValue();
	var htzjewbw = 0; //合同额+五百万
	var jse =0 //结算额
	
	execServer('htzjewbw', {
		'phid': PhidCnt
	}, function(res) {
		if(res.status == 'success') {
			if(!Ext.isEmpty(res.data[0])){
				htzjewbw = res.data[0].amt_vat_fc
			}
		} 
	});
	execServer('jszje', {
		'phid_cnt': PhidCnt
	}, function(res) {
		if(res.status == 'success') {
			if(!Ext.isEmpty(res.data[0])){
				jse = res.data[0].app_amt_vat_fc
			}
		} 
	});
	
	var a=dgrid.getStore().getRange(0, dstore.getCount() - 1); 
	var bqjse=0;
	for(i=0;i<a.length;i++){
		bqjse += a[i].get('AppAmtVatFc')
	}
	if (otype == $Otype.ADD){
	jse = Number(jse) + Number(bqjse)
	}
		//console.log("合同额+500w："+htzjewbw)
		//console.log("结算额："+jse)
	if(Number(htzjewbw) < Number(jse) ){
		flag=1;
		Ext.MessageBox.show({
			title: '提示',
			msg: "结算总额大于合同额+500万",
			modal: false
		});
	}
	
	if(flag == 1) {
		return false;
	}
	if(flag == 0) {
		return true;
	}
	
}*/