$NG.AllReady(function (
	editPage,
	{ useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
	var mstform = $NG.getCmpApi('PcmM7');
	var dgrid = $NG.getCmpApi('PcmD7');
	const { isChgCnt } = $NG.getQueryValue();
	/**页面是修改状态时，项目只读 */
	if ($NG.getQueryValue('oType') == 'edit') {
		mstform.getItem('PhidPc').setReadOnly(true);
		mstform.getItem('PhidPc').setProps({ disabled: true });
		//财务系统是否存在 为否 修改状态时默认让 浪潮合同编码 只读
		var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
		if (user_cwxtsfcz) {
			if (user_cwxtsfcz == '1') {
				mstform.getItem('user_insconcode').setReadOnly(false);
				mstform.getItem('user_insconcode').setProps({ disabled: false });
			} else {
				mstform.getItem('user_insconcode').setReadOnly(true);
				mstform.getItem('user_insconcode').setProps({ disabled: true });
			}
		}
	}
	console.log("dgrid:", dgrid);
	//菜单栏增加复制功能start
	var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
	var ListToolBar = $NG.getCmpApi('CntMToolbar');
	// console.log("Buttons:", Toolbar.getButtons());
	// console.log("ToolBar:", Toolbar);
	// console.log("isChgCnt:",isChgCnt);
	if (ListToolBar) {
		console.log("ListToolBar:", ListToolBar.getItem('applyForReview'));
		if (ListToolBar.getItem('applyForReview')) {
			ListToolBar.getItem('applyForReview').setReadOnly(true);
			setTimeout(() => { ListToolBar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
		}
	}
	if ($NG.getQueryValue('oType') == 'edit') {
		var PhidSenComp = mstform.getItem('PhidSupplyEnt').getValue();
		if (PhidSenComp) {
			$NG.execServer('contract_CorrUnit', {
				'phid': PhidSenComp
			}, function (res) {
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				console.log("res", res);
				console.log("data:", data);
				if (res.status != 'success') {
					$NG.alert("sql有误");
					return false;
				}

				if (data[0].extendObjects.type == 'org') {
					//浪潮甲方设置为只读
					mstform.getItem('user_lcyf').setReadOnly(false);
					mstform.getItem('user_lcyf').setProps({ disabled: false });

					$NG.updateUI((updater) => {
						updater.fieldSetForm.PcmM7.user_lcyf.setProps({ required: true })
					})
				} else {
					mstform.getItem('user_lcyf').setReadOnly(true);
					mstform.getItem('user_lcyf').setProps({ disabled: true });

					$NG.updateUI((updater) => {
						updater.fieldSetForm.PcmM7.user_lcyf.setProps({ required: false })
					})
				}


			});
		}
	}
	if ($NG.getQueryValue('oType') == 'view') {
		console.log("dataready");
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		console.log("user_istbinspur:", user_istbinspur);
		console.log("user_insconid:", mstform.getItem('user_insconid').getValue());
		if (mstform.getItem('user_insconid').getValue()) {
			Toolbar.getItem('applyForReview').setReadOnly(true);
			setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
		} else {
			if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') {
				Toolbar.getItem('applyForReview').setReadOnly(true);
				setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: true }) }, 100);
			} else {
				Toolbar.getItem('applyForReview').setReadOnly(false);
				setTimeout(() => { Toolbar.getItem('applyForReview').setProps({ disabled: false }) }, 100);
			}
		}
	} else {
		if (!isChgCnt == '1') {
			Toolbar.getItem('applyForReview').setReadOnly(true);
		}
	}

	/**页面是变更状态时，浪潮字段只读 */

	if (isChgCnt == '1') {
		mstform.getItem('user_lcssxmb').setReadOnly(true);
		mstform.getItem('user_lcssxmb').setProps({ disabled: true });
		mstform.getItem('user_lcglzz').setReadOnly(true);
		mstform.getItem('user_lcglzz').setProps({ disabled: true });
		mstform.getItem('user_lcywdy').setReadOnly(true);
		mstform.getItem('user_lcywdy').setProps({ disabled: true });
		mstform.getItem('user_lchsbmzjm').setReadOnly(true);
		mstform.getItem('user_lchsbmzjm').setProps({ disabled: true });

		mstform.getItem('BillNo').setReadOnly(true);
		mstform.getItem('BillNo').setProps({ disabled: true });
		mstform.getItem('BillName').setReadOnly(true);
		mstform.getItem('BillName').setProps({ disabled: true });
		mstform.getItem('user_htbm').setReadOnly(true);
		mstform.getItem('user_htbm').setProps({ disabled: true });
		mstform.getItem('CntType').setReadOnly(true);
		mstform.getItem('CntType').setProps({ disabled: true });
		mstform.getItem('CntOrgSumVatFc').setReadOnly(true);
		mstform.getItem('CntOrgSumVatFc').setProps({ disabled: true });
		mstform.getItem('Stat').setReadOnly(true);
		mstform.getItem('Stat').setProps({ disabled: true });
		mstform.getItem('CntSumVatFc').setReadOnly(true);
		mstform.getItem('CntSumVatFc').setProps({ disabled: true });
		mstform.getItem('PhidOrg_EXName').setReadOnly(true);
		mstform.getItem('PhidOrg_EXName').setProps({ disabled: true });
		mstform.getItem('AmtVat').setReadOnly(true);
		mstform.getItem('AmtVat').setProps({ disabled: true });
		mstform.getItem('user_ywfl').setReadOnly(true);
		mstform.getItem('user_ywfl').setProps({ disabled: true });
		mstform.getItem('user_bdwfl').setReadOnly(true);
		mstform.getItem('user_bdwfl').setProps({ disabled: true });
		mstform.getItem('user_yfkje').setReadOnly(true);
		mstform.getItem('user_yfkje').setProps({ disabled: true });//变更接口传null ，采购合同变更不可变更此内容
		mstform.getItem('user_yfkbl').setReadOnly(true);
		mstform.getItem('user_yfkbl').setProps({ disabled: true });//变更接口传null ，采购合同变更不可变更此内容
		mstform.getItem('ChineseAmtVatFc').setReadOnly(true);
		mstform.getItem('ChineseAmtVatFc').setProps({ disabled: true });
		mstform.getItem('user_insconid').setReadOnly(true);
		mstform.getItem('user_insconid').setProps({ disabled: true });
		mstform.getItem('user_insconname').setReadOnly(true);
		mstform.getItem('user_insconname').setProps({ disabled: true });
		mstform.getItem('user_tbinspurtime').setReadOnly(true);
		mstform.getItem('user_tbinspurtime').setProps({ disabled: true });
		mstform.getItem('user_istbinspur').setReadOnly(true);
		mstform.getItem('user_istbinspur').setProps({ disabled: true });
		mstform.getItem('user_tbinspurtime').setReadOnly(true);
		mstform.getItem('user_tbinspurtime').setProps({ disabled: true });
		mstform.getItem('user_cghtzjxz').setReadOnly(true);
		mstform.getItem('user_cghtzjxz').setProps({ disabled: true });

		mstform.getItem('PhidSupplyEnt').setReadOnly(true);
		mstform.getItem('PhidSupplyEnt').setProps({ disabled: true });
		mstform.getItem('PhidDept').setReadOnly(true);
		mstform.getItem('PhidDept').setProps({ disabled: true });
		mstform.getItem('PhidInvComp').setReadOnly(true);
		mstform.getItem('PhidInvComp').setProps({ disabled: true });
		mstform.getItem('PhidTickComp').setReadOnly(true);
		mstform.getItem('PhidTickComp').setProps({ disabled: true });

		mstform.getItem('user_sfjkcs').setReadOnly(true);
		mstform.getItem('user_sfjkcs').setProps({ disabled: true });
		mstform.getItem('user_zjsfhyy').setReadOnly(true);
		mstform.getItem('user_zjsfhyy').setProps({ disabled: true });
		mstform.getItem('user_htsxpd').setReadOnly(true);
		mstform.getItem('user_htsxpd').setProps({ disabled: true });
		mstform.getItem('user_htsx').setReadOnly(true);
		mstform.getItem('user_htsx').setProps({ disabled: true });
		mstform.getItem('user_fkfs').setReadOnly(true);
		mstform.getItem('user_fkfs').setProps({ disabled: true });
		mstform.getItem('user_sfcds').setReadOnly(true);
		mstform.getItem('user_sfcds').setProps({ disabled: true });
		//mstform.getItem('user_dscgfs').setReadOnly(true);
		mstform.getItem('user_rate').setReadOnly(true);
		mstform.getItem('user_rate').setProps({ disabled: true });
		mstform.getItem('Zfbl').setReadOnly(true);
		mstform.getItem('Zfbl').setProps({ disabled: true });

		//mstform.getItem('user_jjfs').setReadOnly(true); //2026-01-26 去掉
		mstform.getItem('user_gmhcgxspd').setReadOnly(true);
		mstform.getItem('user_gmhcgxspd').setProps({ disabled: true });
		mstform.getItem('user_sfgmh').setReadOnly(true);
		mstform.getItem('user_sfgmh').setProps({ disabled: true });
		mstform.getItem('user_cllx').setReadOnly(true);
		mstform.getItem('user_cllx').setProps({ disabled: true });
		//mstform.getItem('user_sfzxkj').setReadOnly(true);

		mstform.getItem('user_cwxtsfcz').setReadOnly(true);
		mstform.getItem('user_cwxtsfcz').setProps({ disabled: true });
		mstform.getItem('user_insconcode').setReadOnly(true);
		mstform.getItem('user_insconcode').setProps({ disabled: true });
		mstform.getItem('user_fplx').setReadOnly(true);
		mstform.getItem('user_tzhdfkbl').setReadOnly(true);
		mstform.getItem('user_tzhdfkbl').setProps({ disabled: true });
		mstform.getItem('user_nsrlx').setReadOnly(true);
		mstform.getItem('user_nsrlx').setProps({ disabled: true });
		mstform.getItem('user_jsje').setReadOnly(true);
		mstform.getItem('user_jsje').setProps({ disabled: true });
		mstform.getItem('user_fkje').setReadOnly(true);
		mstform.getItem('user_fkje').setProps({ disabled: true });
		mstform.getItem('user_fpje').setReadOnly(true);
		mstform.getItem('user_fpje').setProps({ disabled: true });
	}

	mstform.getItem('user_htzsl').setProps({
		hidden: true,
		required: false
	});
	console.log("PayOverPrecent:", mstform.getItem('PayOverPrecent').getProps());
	mstform.getItem('PayOverPrecent').setValue('1.1');

	useValuesChange(({ args, form }) => {
		if (mstform.getItem('user_cghtzjxz').getValue() == '4') {
			mstform.getItem('BillDt').setReadOnly(true);
			mstform.getItem('BillDt').setProps({ disabled: true });
		} else {
			mstform.getItem('BillDt').setReadOnly(false);
			mstform.getItem('BillDt').setProps({ disabled: false });
		}
	}, "PcmM7.user_cghtzjxz");

	//合同属性判断选择后触发
	useValuesChange(({ args, form }) => {
		if (mstform.getItem('user_htsxpd').getValue() == '569000000000989') {
			mstform.getItem('user_htsx').setValue('01');
		} else if (mstform.getItem('user_htsxpd').getValue() == '569000000000990' || mstform.getItem('user_htsxpd').getValue() == '569000000000991' || mstform.getItem('user_htsxpd').getValue() == '569000000000992') {
			mstform.getItem('user_htsx').setValue('02');
		} else if (mstform.getItem('user_htsxpd').getValue() == '569000000000993') {
			mstform.getItem('user_htsx').setValue('03');
		} else if (mstform.getItem('user_htsxpd').getValue() == '569000000000994' || mstform.getItem('user_htsxpd').getValue() == '569000000000995') {
			mstform.getItem('user_htsx').setValue('04');
		} else if (mstform.getItem('user_htsxpd').getValue() == '569000000000996') {
			mstform.getItem('user_htsx').setValue('05');
		} else if (mstform.getItem('user_htsxpd').getValue() == '569000000000997') {
			mstform.getItem('user_htsx').setValue('09');
		}
	}, "PcmM7.user_htsxpd");
	//规模化采购形式判断选择后触发
	useValuesChange(({ args, form }) => {
		if (mstform.getItem('user_gmhcgxspd').getValue() == '569000000001004') {
			mstform.getItem('user_sfgmh').setValue('2');
		} else {
			mstform.getItem('user_sfgmh').setValue('1');
		}

	}, "PcmM7.user_gmhcgxspd");
	useValuesChange(({ args, form }) => {
		var user_jjfs = mstform.getItem('user_jjfs').getValue();
		if (user_jjfs == 0) {
			//record.set('user_fdlx', Ext.Number.from(record˝.get('user_fdlx'), 3)); 
			//record.set(3, Ext.Number.from(record.get('user_fdlx'), 0));    
			//record.set("0", Ext.Number.from(record.get('user_fde'), 0));
			//record.set('user_fdlx', '3');
			//record.set('user_fde', 5);
			//dgrid.setProps('user_fdlx')
			$NG.updateUI(function (updater, state) {
				//console.log("pdater.form.PcmM7.user_fdlx:", updater.form.PcmM7.user_fdlx);
				console.log("updater.form:", updater);
				console.log("updater.grid.PcmD7.user_fdlx:", updater.grid.PcmD7.user_fdlx);
				updater.grid.PcmD7.user_fdlx.setProps({
					editor: {
						disabled: true, //required是否必输
					}
				});
				updater.grid.PcmD7.user_fde.setProps({
					editor: {
						disabled: true, //required是否必输
					}
				});
			});
		}
		else {
			$NG.updateUI(function (updater, state) {
				//console.log("pdater.form.PcmM7.user_fdlx:", updater.form.PcmM7.user_fdlx);
				console.log("updater.form:", updater);
				console.log("updater.grid.PcmD7.user_fdlx:", updater.grid.PcmD7.user_fdlx);
				updater.grid.PcmD7.user_fdlx.setProps({
					editor: {
						disabled: false, //required是否必输
					}
				});
				updater.grid.PcmD7.user_fde.setProps({
					editor: {
						disabled: false, //required是否必输
					}
				});
			});
			dgrid.getItem('user_fdlx').setProps({ required: true });
			dgrid.getItem('user_fde').setProps({ required: true });

		}


	}, "PcmM7.user_jjfs");
	//TODO 删除||以前的条件
	if ($NG.getQueryValue('oType') == 'view') {
		$NG.updateUI((updater) => {
			console.log("updater:", updater)
			updater.fieldSetForm.PcmM7.user_htzsl.setProps({ hidden: true })
		})
		var sum = 0;
		if ($NG.getQueryValue('PhId') || $NG.getQueryValue('id')) {
			$NG.execServer('cghtslhz', {
				'phid': $NG.getQueryValue('PhId') ? $NG.getQueryValue('PhId') : $NG.getQueryValue('id')
			}, function (res) {
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				console.log(res);
				console.log("data:", data);
				var sum = 0;
				if (data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						sum = sum + data[i].extendObjects.qty
					}
					mstform.getItem('user_htzsl').setValue(sum)
				}
			})
		}
	}
	//这里需要拿到明细表的工具栏来拿到增行按钮进行显示
	const schemeid = $NG.getQueryValue('schemeid')
	console.log("schemeid:", schemeid)

	if (schemeid == '5690000000000131') {//直接新增    替换掉原先的224191226002002
		mstform.getItem('user_cghtzjxz').setValue('1')
	} else if (schemeid == '569000000000022') {
		mstform.getItem('user_cghtzjxz').setValue('3')
	} else {
		$NG.getCmpApi('CntDToolbar').hideButton('addrow')
	}

	if ($NG.getQueryValue('otype') == 'add') {
		mstform.getItem('Zfbl').setValue('0');
	}
	if ($NG.getQueryValue('otype') == 'add' || $NG.getQueryValue('otype') == 'edit') {

		//mstform.getItem('user_sfcds').userSetMustInput(true);
		$NG.updateUI((updater) => {
			updater.fieldSetForm.PcmM7.user_sfcds.setProps({ required: true })
		})
		//业务来源是否赋值给采购形式
		var xxcgywlb = mstform.getItem('user_sfcds').getValue();

		//mstform.getItem('BillNo').addListener('itemchanged', function () {
		useValuesChange(({ args, form }) => {
			var Billno = mstform.getItem('BillNo').getValue();
			console.log("Billno:", Billno);
			var bill_no = Billno.replace(/\s*/g, "")
			console.log("bill_no:", bill_no);

			mstform.getItem('BillNo').setValue(bill_no);

			$NG.execServer('htbhss', {
				'bill_no': bill_no
			}, function (res) {
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				var htbh = data[0].extendObjects.ht
				if (htbh == 1) {
					// Ext.MessageBox.show({
					// 	title: '提示',
					// 	msg: "合同编号已存在",
					// 	modal: false
					// });
					$NG.alert("合同编号已存在");

					//flag = 1;
					return false;
				}
			})
		}, "PcmM7.BillNo");

	}

	//浪潮乙方设置为只读
	mstform.getItem('user_lcyf').setReadOnly(true);
	mstform.getItem('user_lcyf').setProps({ disabled: true });

	if ($NG.getQueryValue('otype') == 'add') {
		mstform.getItem('user_cwxtsfcz').setValue('1');
	}

	/*根据支付比例带出同步初始比例start*/
	useValuesChange(({ args, form }) => {
		var Zfbl = mstform.getItem('Zfbl').getValue();
		mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
		//mstform.getItem('user_zfbl').setValue(Zfbl);
	}, "PcmM7.Zfbl");

	/*根据支付比例带出同步初始比例end*/

	/*预付款比例调整*/
	useValuesChange(({ args, form }) => {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc != '') {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		} else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	}, "PcmM7.user_yfkje");
	useValuesChange(({ args, form }) => {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc != '') {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		} else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	}, "PcmM7.CntSumVatFc");

	/*浪潮返回标志为4申请取消审核可点击start*/
	/*隐藏三个分组start*/
	//目前在前端界面设计已隐藏，无需在js手动隐藏
	// document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
	// document.getElementsByTagName('fieldset')[2].style.visibility = 'hidden';
	// document.getElementsByTagName('fieldset')[4].style.visibility = 'hidden';
	/*隐藏三个分组end*/
	/*财务系统是否存在为是的时候必输，为否的时候不必输start*/


	useValuesChange(({ args, form }) => {
		var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
		if (user_cwxtsfcz == '1') {
			$NG.updateUI((updater) => {
				updater.fieldSetForm.PcmM7.user_insconcode.setProps({ required: true })
				updater.fieldSetForm.PcmM7.user_insconid.setProps({ required: true })
				updater.fieldSetForm.PcmM7.user_insconname.setProps({ required: true })
			})
			mstform.getItem('user_insconcode').setReadOnly(false);
			mstform.getItem('user_insconcode').setProps({ disabled: false });
		} else {
			$NG.updateUI((updater) => {
				updater.fieldSetForm.PcmM7.user_insconcode.setProps({ required: false })
				updater.fieldSetForm.PcmM7.user_insconid.setProps({ required: false })
				updater.fieldSetForm.PcmM7.user_insconname.setProps({ required: false })
			})
			mstform.getItem('user_insconcode').setReadOnly(true);
			mstform.getItem('user_insconcode').setProps({ disabled: true });
		}
	}, "PcmM7.user_cwxtsfcz");

	/*财务系统是否存在为是的时候必输，为否的时候不必输end*/
	// useValuesChange(({ args, form }) => {
	//     if (mstform.getItem('user_insconid').getValue()) {
	//         //Toolbar.getComponent('applycheck').forcedisable();
	//         Toolbar.getItem('applyForReview').setReadOnly(true);
	//     } else {
	//         //Toolbar.getComponent('applycheck').forceenable();
	//         Toolbar.getItem('applyForReview').setReadOnly(false);
	//     }
	// }, "PcmM7.user_insconid");
	if (mstform.getItem('user_cwxtsfcz').getValue() == '2') {
		$NG.updateUI((updater) => {
			updater.fieldSetForm.PcmM7.user_insconcode.setProps({ required: false })
			updater.fieldSetForm.PcmM7.user_insconid.setProps({ required: false })
			updater.fieldSetForm.PcmM7.user_insconname.setProps({ required: false })
		})
	} else {
		$NG.updateUI((updater) => {
			updater.fieldSetForm.PcmM7.user_insconcode.setProps({ required: true })
			updater.fieldSetForm.PcmM7.user_insconid.setProps({ required: true })
			updater.fieldSetForm.PcmM7.user_insconname.setProps({ required: true })
		})
	}


	var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
	//组织如果为鼎力服务公司

	if ($NG.getQueryValue('otype') == 'add' || $NG.getQueryValue('otype') == 'edit') {
		console.log("(mstform.getItem('PhidOrg').getValue():", (mstform.getItem('PhidOrg').getValue()));
		if (mstform.getItem('PhidOrg').getValue() == '324191209000063') {
			//mstform.getItem('PhidPc').setReadOnly(false);
			console.log("为鼎力公司=============================")
			$NG.updateUI((updater) => {
				updater.fieldSetForm.PcmM7.PhidPc.setProps({ readOnly: false }); // 二十二冶特殊处理，不可复用。风险已告知
			})
		}
	}
	// setTimeout(() => {
	//     if (user_istbinspur == '4') {
	//         Toolbar.getItem('applyForReview').setReadOnly(false);
	//     } else if (mstform.getItem('user_insconid').getValue()) {
	//         Toolbar.getItem('applyForReview').setReadOnly(false);
	//     } else {
	//         Toolbar.getItem('applyForReview').setReadOnly(true);
	//     }
	// }, 300);

	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	useValuesChange(({ args, form }) => {
		var PhidSenComp = mstform.getItem('PhidSupplyEnt').getValue();
		$NG.execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function (res) {
			const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
			console.log("res", res);
			console.log("data:", data);
			if (res.status != 'success') {
				$NG.alert("sql有误");
				return false;
			}

			if (data[0].extendObjects.type == 'org') {
				//浪潮甲方设置为只读
				mstform.getItem('user_lcyf').setReadOnly(false);
				mstform.getItem('user_lcyf').setProps({ disabled: false });

				$NG.updateUI((updater) => {
					updater.fieldSetForm.PcmM7.user_lcyf.setProps({ required: true })
				})
			} else {
				mstform.getItem('user_lcyf').setReadOnly(true);
				mstform.getItem('user_lcyf').setProps({ disabled: true });

				$NG.updateUI((updater) => {
					updater.fieldSetForm.PcmM7.user_lcyf.setProps({ required: false })
				})
			}


		});

	}, "PcmM7.PhidSupplyEnt");

	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/
	var kaobei = {
		id: "kaobei",
		text: "复制",
		iconCls: "icon-New"
	}
	Toolbar.insert(kaobei);

	useAction('onClick')(() => {
		//获取表体数据
		console.log("获取按钮数据");
		console.log("dgrid.getRows():", dgrid.getRows());
		var a = dgrid.getRows();
		var dzyhp = a[0].user_dzyhp;
		for (var i = 1; i < a.length; i++) {
			a[i]['user_dzyhp'] = dzyhp;
			a[i]['isNewOrModified'] = a[i]?.PhId ? 2 : 1; // 1新增；2修改；3；删除
		}
		console.log("*********************")
		console.log(dgrid.getRows())
		dgrid.updateRow(a);

		//var b = dgrid.getRows();
		// var fde = b[0].user_fde;
		//var fdjjyjwz = c[0].get(user_fdjjyjwz)
		//var fdlx = d[0].get(user_fdlx)
		// for (var i = 1; i < b.length; i++) {
		//     b[i]['user_fde'] = fde;
		//c[i].set('user_fdjjyjwz', fdjjyjwz);
		//d[i].set('user_fdlx', fdlx);
		// }
		//dgrid.updateRow(b);

		// var c = dgrid.getRows();
		// var fdjjyjwz = c[0].user_fdjjyjwz
		//var fdlx = d[0].get(user_fdlx)
		// for (var i = 1; i < c.length; i++) {
		//     c[i]['user_fdjjyjwz'] = fdjjyjwz;
		//d[i].set('user_fdlx', fdlx);
		// }
		//dgrid.updateRow(c);

		// var d = dgrid.getRows();
		// var fdlx = d[0].user_fdlx
		// for (var i = 1; i < d.length; i++) {
		//     d[i]['user_fdlx'] = fdlx;
		// }
		//dgrid.updateRow(d);
		console.log(dgrid)
		console.log(dgrid.getRows())
		dgrid.refreshView()
	}, 'kaobei');
	//菜单栏增加复制功能end

	/*根据甲方单位字段选择为鼎立公司的，收票单位就是结盟公司，甲方单位为其他公司 收票单位为集团公司start*/
	//	监听的不用管，组件卸载自动取消绑定
	//mstform.getItem('PhidCustomerEnt').events.change.listeners.pop();

	console.log("mstform.getItem('PhidCustomerEnt'):", mstform.getItem('PhidCustomerEnt'));
	useValuesChange(({ args, form }) => {
		if (mstform.getItem('PhidCustomerEnt').getValue() == '548191210000063') {
			mstform.setValues({
				PhidTickComp: {
					value: '548191210000063',
					label: '鼎立公司'
				}
			})
		} else {
			mstform.setValues({
				PhidTickComp: {
					value: '548191210000001',
					label: '集团公司'
				}
			})
		}
	}, "PcmM7.PhidCustomerEnt");
	/*根据甲方单位字段为鼎立公司的，收票单位就是鼎立公司，甲方单位为其他公司 收票单位为集团公司end*/
	// mstform.getItem('user_insconcode').addListener('itemchanged', function () {
	useValuesChange(({ args, form }) => {
		console.log("user_insconcode=========", mstform.getItem('user_insconcode').getValue());
		var user_insconcode = mstform.getItem('user_insconcode').getValue();
		if (user_insconcode) {
			$NG.execServer('user_insconcode', {
				'user_insconcode': user_insconcode
			}, function (res) {
				if (res.count > 0) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					if (data.length == 0) {
						mstform.getItem('user_insconid').setValue('');
						mstform.getItem('user_insconname').setValue('');
					} else {
						mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm);
						mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
					}
				}

			});
		}

	}, "PcmM7.user_insconcode");

	/*管理组织选择后清空所属项目部start*/
	useValuesChange(({ args, form }) => {
		var PhidPc = mstform.getItem('PhidPc').getValue()
		console.log("PhidPc:", PhidPc)
		$NG.execServer('xmxxdcglzssmb', {
			'phid': PhidPc
		}, function (res) {
			console.log("dwadasdsddsad");
			const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
			console.log("data:", data);
			if (res.count > 0) {
				mstform.setValues({
					user_lcglzz: {
						value: data[0].extendObjects.user_lcglzz,
						label: data[0].extendObjects.user_lcglzz_exname
					}
				})
				mstform.setValues({
					user_lcssxmb: {
						value: data[0].extendObjects.user_lcssxmb,
						label: data[0].extendObjects.user_lcssxmb_exname
					}
				})
			} else {
				$NG.alert('项目信息没有管理组织和所属项目部');
				return false;
			}
		});


		setTimeout(() => {
			var lcssxmb = mstform.getItem('user_lcssxmb').getValue();
			console.log("lcssxmb:", lcssxmb);
			if (lcssxmb != null && lcssxmb != '') {
				$NG.execServer('ssxmb_bmywdy', {
					'dept': lcssxmb
				}, function (res) {

					if (res.count > 0) {
						const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
						if (data.length == 1) {
							if (data[0].extendObjects.user_lcywdy != null) {
								mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
							} else {
								$NG.alert('请联系管理员处理，部门对照未做');
								return false;
							}
						} else {
							mstform.getItem('user_lcywdy').setValue(null);
							$NG.alert('请联系管理员处理，部门对照存在重复');
							return false;
						}
					} else {
						$NG.alert('请联系管理员处理，部门对照未做');
						mstform.getItem('user_lcywdy').setValue(null);
						return false;
					}
				});

				$NG.execServer('ssxmb_zjm', {
					'dept': lcssxmb
				}, function (res) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

					if (res.count > 0) {
						if (data.length == 1) {
							if (data[0].extendObjects.user_mnemcodeinaccdepart != null) {
								mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
							} else {
								$NG.alert('请联系管理员处理，部门对照未做');
								mstform.getItem('user_lchsbmzjm').setValue(null);
								return false;
							}
						} else {
							mstform.getItem('user_lchsbmzjm').setValue(null);
							$NG.alert('请联系管理员处理，部门对照存在重复');
							return false;
						}
					} else {
						$NG.alert('请联系管理员处理，部门对照未做');
						mstform.getItem('user_lchsbmzjm').setValue(null);
						return false;
					}
				});
			}
		}, 200);
		/*管理组织选择后清空所属项目部end*/
	}, "PcmM7.PhidPc");
	/*管理组织选择后清空所属项目部start*/
	useValuesChange(({ args, form }) => {
		mstform.getItem('user_lcssxmb').setValue();
	}, "PcmM7.user_lcglzz");
	/*管理组织选择后清空所属项目部end*/

	useBeforeOpen((data) => {
		var zz = mstform.getItem('user_lcglzz').getValue();
		if (zz) {
			$NG.updateUI(function (updater, state) {
				updater.fieldSetForm.PcmM7.user_lcssxmb.setProps({
					clientSqlFilter: ('parent_orgid = ' + zz),
					placeholder: ``
				});
			});
		}
		return true;
	}, 'pc_dept');




	/*项目所属部选择后带出浪潮业务单元start*/
	useValuesChange(({
		args
	}) => {
		var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
		if (!user_lcssxmb) {
			return;
		}
		$NG.execServer('ssxmb_bmywdy', {
			'dept': user_lcssxmb
		}, function (res) {
			if (res.count > 0) {
				var data = JSON.parse(res.data);
				if (data.length == 1) {
					mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
				} else {
					$NG.alert('请联系管理员处理，部门对照存在重复');
					mstform.getItem('user_lcywdy').setValue(null);
					return false;
				}
				if (data[0].extendObjects.user_lcywdy == null) {
					$NG.alert('请联系管理员处理，部门对照未做');
					mstform.getItem('user_lcywdy').setValue(null);
					return false;
				}

			} else {
				$NG.alert('请联系管理员处理，部门对照未做');
				mstform.getItem('user_lcywdy').setValue(null);
				return false;
			}
			$NG.execServer('ssxmb_zjm', {
				'dept': user_lcssxmb
			}, function (res) {
				if (res.count > 0) {
					var data = JSON.parse(res.data);
					if (data.length == 1) {
						if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
							$NG.alert('请联系管理员处理，部门对照未做');
							mstform.getItem('user_lchsbmzjm').setValue(null);
							return false;
						}
						mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
					} else {
						$NG.alert('请联系管理员处理，部门对照存在重复');
						mstform.getItem('user_lchsbmzjm').setValue(null);
					}
				} else {
					$NG.alert('请联系管理员处理，部门对照未做');
					mstform.getItem('user_lchsbmzjm').setValue(null);
					return false;
				}
			});
		});
	}, "PcmM7.user_lcssxmb");
	/*项目所属部选择后带出浪潮业务单元end*/
	// 是否执行框架是“是”的时候，执行框架需要是必填
	useValuesChange(({ args, form }) => {
		var user_sfzxkj = mstform.getItem('user_sfzxkj').getValue();
		$NG.updateUI((updater) => {
			updater.fieldSetForm.PcmM7.user_zxkj.setProps({
				required: user_sfzxkj == '1'
			});
			updater.fieldSetForm.PcmM7.user_user_zxkjdxybh.setProps({
				required: user_sfzxkj == '1'
			});
		});
	}, "PcmM7.user_sfzxkj");
	// 页面初始化加载数据
	setTimeout(() => {
		var user_sfzxkj_init = mstform.getItem('user_sfzxkj').getValue();
		$NG.updateUI((updater) => {
			updater.fieldSetForm.PcmM7.user_zxkj.setProps({
				required: user_sfzxkj_init == '1'
			});
			updater.fieldSetForm.PcmM7.user_user_zxkjdxybh.setProps({
				required: user_sfzxkj_init == '1'
			});
		});
	}, 500);
	// 添加保存前检测代码
	useBeforeClick(async () => {
		// console.log("???????????????????????????????/");
		// $NG.alert('无无无无无无无alert');
		// await $NG.alert('++++++++++++了alert');
		// console.log("1111111111111");
		// // alert('该浪潮合同编码在浪潮系统中不存在');
		// console.log("2222222222");
		var flag = 0;
		var user_insconcode = mstform.getItem('user_insconcode').getValue();
		var pc = mstform.getItem('PhidPc').getValue();

		if (user_insconcode) {
			/*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
			await $NG.execServer('user_insconcode', {
				'user_insconcode': user_insconcode
			}, function (res) {
				if (res.status != 'success') {
					alert('sql有误');
					flag = 1;
				}
				else if (res.count == 0) {
					alert('该浪潮合同编码在浪潮系统中不存在');
					flag = 1;
					return false;
				} else {

				}
			});
			if ($NG.getQueryValue('otype') == 'edit') {
				var bill_no = mstform.getItem('BillNo').getValue() ? "'" + mstform.getItem('BillNo').getValue() + "'" : mstform.getItem('BillNo').getValue();
				await $NG.execServer('lchtbm_djbh', {
					'bill_no': bill_no
				}, async function (res) {
					if (res.count > 0) {
						var data = JSON.parse(res.data)
						if (res.status != 'success') {
							alert('sql有误');
							flag = 1;
						} else if (data[0].extendObjects.user_insconcode == mstform.getItem('user_insconcode').getValue()) {
							console.log('1111111111111111111')
						} else {
							console.log('2222222222222222222')
							//检测该浪潮合同编码是否在新中大存在
							await $NG.execServer('lchtbm', {
								'user_insconcode': user_insconcode
							}, function (res) {
								console.log("lchtbm res:", res);
								if (res.status != 'success') {
									alert('sql有误');
									flag = 1;
								} else if (res.count == 0) { } else {
									alert('该浪潮合同编码在新中大中已存在');
									flag = 1;
								}
							});
						}
					}
				});
			}
			if ($NG.getQueryValue('otype') == 'add' || $NG.getQueryValue('otype') == 'edit') {
				//检测该浪潮合同编码是否在新中大存在
				console.log("user_insconcode:", user_insconcode);
				await $NG.execServer('lchtbm', {
					'user_insconcode': user_insconcode
				}, function (res) {
					console.log("641 res:", res);
					console.log("PhId:", $NG.getQueryValue('PhId'));
					//const PhId = $NG.getQueryValue('PhId');
					const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					//console.log("data1.extendObjects.phid:",data1.extendObjects.phid);
					console.log("BillNo:", mstform.getItem('BillNo').getValue());

					if (res.status != 'success') {
						alert('sql有误');
						flag = 1;
					} else if (res.count == 0) { }
					else if (data1[0].extendObjects.phid == $NG.getQueryValue('PhId')) {
						flag = 0;
					}
					else {
						alert('该浪潮合同编码在新中大中已存在');
						flag = 1;
					}
				});
			}
		}
		/*查看浪潮合同编码是否存在user_insconcode 该视图中end*/

		/*判断项目信息所属项目部和部门业务单元对照字段是否有值start*/
		if ($NG.getQueryValue('otype') == 'add') {
			var bill_no = mstform.getItem('BillNo').getValue();
			await $NG.execServer('htbhss', {
				'bill_no': bill_no
			}, async function (res) {
				if (res.count > 0) {
					var data = JSON.parse(res.data)
					var htbh = data[0].extendObjects.ht
					if (htbh == 1) {
						alert('存在重复编码');
						flag = 1;
						return false;
					}
				}
				await $NG.execServer('xmxx_ssxmb_lcywdy', {
					'pc': pc
				}, function (res) {
					if (res.status != 'success') {
						alert('sql有误');
						flag = 1;
					} else if (res.count > 0) {
						var data = JSON.parse(res.data)
						if (!data[0].extendObjects.user_pc_dept) {
							alert('合同所属项目信息没有维护所属项目部');
							flag = 1;
							return false;
						}
						if (!data[0].extendObjects.user_mnemcodeinaccdepart) {
							alert('合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码');
							flag = 1;
							return false;
						}
						if (!data[0].extendObjects.user_lcywdy) {
							alert('合同所属项目信息没有维护浪潮业务单元');
							flag = 1;
							return false;
						}
					}
				});
			});
		}
		/*判断项目信息所属项目部和部门业务单元对照字段是否有值end*/

		/*税率不能为0strat*/
		var rate = mstform.getItem("user_rate").getValue();
		if (rate == 0) {
			if (mstform.getItem("user_szlxpdbz").getValue() != '1') {
				await $NG.confirm('税率是否为0').then(res => {
					if (res) {
						flag = 1
						mstform.getItem("user_szlxpdbz").setValue('1');
					} else {
						flag = 1
						mstform.getItem("user_szlxpdbz").setValue(null);
					}
				})
			}
		}
		console.log("*******************")
		console.log(flag)
		/*税率不能为0end*/
		if (flag == 1) {
			return false;
		}
		if (flag == 0) {
			return true;
		}
	}, 'save');
});