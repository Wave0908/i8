$NG.AllReady(function (page,
	{ useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
	var mstform = $NG.getCmpApi('PcmM6');
	var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
	var dgrid = $NG.getCmpApi('PcmD6');
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
	// //浪潮甲方设置为只读
	// mstform.getItem('user_lcjf').userSetReadOnly(true);
	// //浪潮乙方设置为只读
	// mstform.getItem('user_lcyf').userSetReadOnly(true);
	//mstform.getItem('CntSumVatFc').userSetReadOnly(false);
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
	/**页面是变更状态时，浪潮字段只读 */

	if (isChgCnt == '1') {
		mstform.getItem('user_istbinspur').setReadOnly(true);
		mstform.getItem('user_istbinspur').setProps({ disabled: true });

		mstform.getItem('user_lcglzz').setReadOnly(true);
		mstform.getItem('user_lcglzz').setProps({ disabled: true });

		mstform.getItem('user_lcssxmb').setReadOnly(true);

		mstform.getItem('user_lcywdy').setReadOnly(true);
		mstform.getItem('user_lcywdy').setProps({ disabled: true });
		mstform.getItem('user_lchsbmzjm').setReadOnly(true);
		mstform.getItem('user_lchsbmzjm').setProps({ disabled: true });

		mstform.getItem('user_insconcode').setReadOnly(true);
		mstform.getItem('user_insconcode').setProps({ disabled: true });

		mstform.getItem('BillNo').setReadOnly(true);
		mstform.getItem('BillNo').setProps({ disabled: true });
		mstform.getItem('BillName').setReadOnly(true);
		mstform.getItem('BillName').setProps({ disabled: true });
		mstform.getItem('CntType').setReadOnly(true);
		mstform.getItem('CntType').setProps({ disabled: true });
		mstform.getItem('PhidPc').setReadOnly(true);
		mstform.getItem('PhidPc').setProps({ disabled: true });
		mstform.getItem('CntSumVatFc').setReadOnly(true);
		mstform.getItem('CntSumVatFc').setProps({ disabled: true });
		mstform.getItem('Stat').setReadOnly(true);
		mstform.getItem('Stat').setProps({ disabled: true });
		mstform.getItem('PhidPm').setReadOnly(true);
		mstform.getItem('PhidPm').setProps({ disabled: true });
		mstform.getItem('PhidInvComp').setReadOnly(true);
		mstform.getItem('PhidInvComp').setProps({ disabled: true });
		mstform.getItem('PhidTickComp').setReadOnly(true);
		mstform.getItem('PhidTickComp').setProps({ disabled: true });
		mstform.getItem('user_yfkje').setReadOnly(true);
		mstform.getItem('user_yfkje').setProps({ disabled: true });
		mstform.getItem('user_yfkbl').setReadOnly(true);
		mstform.getItem('user_yfkbl').setProps({ disabled: true });
		mstform.getItem('CntOrgSumVatFc').setReadOnly(true);
		mstform.getItem('CntOrgSumVatFc').setProps({ disabled: true });
		mstform.getItem('ChineseAmtVatFc').setReadOnly(true);
		mstform.getItem('ChineseAmtVatFc').setProps({ disabled: true });
		mstform.getItem('Zfbl').setReadOnly(true);
		mstform.getItem('Zfbl').setProps({ disabled: true });
		mstform.getItem('LogicControlPercent').setReadOnly(true);
		mstform.getItem('LogicControlPercent').setProps({ disabled: true });
		mstform.getItem('PhidYsfl').setReadOnly(true);
		mstform.getItem('PhidYsfl').setProps({ disabled: true });

		mstform.getItem('user_cwxtsfcz').setReadOnly(true);
		mstform.getItem('user_cwxtsfcz').setProps({ disabled: true });
		mstform.getItem('user_insconid').setReadOnly(true);
		mstform.getItem('user_insconid').setProps({ disabled: true });
		mstform.getItem('user_insconname').setReadOnly(true);
		mstform.getItem('user_insconname').setProps({ disabled: true });
		mstform.getItem('user_tbinspurtime').setReadOnly(true);
		mstform.getItem('user_tbinspurtime').setProps({ disabled: true });
		mstform.getItem('user_fplx').setReadOnly(true);
		mstform.getItem('user_fplx').setProps({ disabled: true });
		mstform.getItem('user_nsrlx').setReadOnly(true);
		mstform.getItem('user_nsrlx').setProps({ disabled: true });
		mstform.getItem('user_tzhdfkbl').setReadOnly(true);
		mstform.getItem('user_tzhdfkbl').setProps({ disabled: true });
		mstform.getItem('user_jsje').setReadOnly(true);
		mstform.getItem('user_jsje').setProps({ disabled: true });
		mstform.getItem('user_fkje').setReadOnly(true);
		mstform.getItem('user_fkje').setProps({ disabled: true });
		mstform.getItem('user_fpje').setReadOnly(true);
		mstform.getItem('user_fpje').setProps({ disabled: true });
		mstform.getItem('user_rate').setReadOnly(true);
		mstform.getItem('user_rate').setProps({ disabled: true });
	}

	if (mstform) {
		if ($NG.getQueryValue('otype') == "add") {
			mstform.getItem('user_cwxtsfcz').setValue('1');
			mstform.getItem('LogicControlPercent').setValue(1.1);
			mstform.getItem('PhidPc').setReadOnly(false);
			mstform.getItem('PhidPc').setProps({ disabled: false });
		}
	}

	/*根据支付比例带出同步初始比例start*/
	useValuesChange(({
		args
	}) => {
		// 获取 支付比例 的值
		var Zfbl = mstform.getItem('Zfbl').getValue();
		// 将 支付比例 的值填到 同步初始比例
		mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
	}, "PcmM6.Zfbl");
	/*根据支付比例带出同步初始比例end*/

	/*隐藏三个分组start*/
	// document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
	// document.getElementsByTagName('fieldset')[2].style.visibility = 'hidden';
	// document.getElementsByTagName('fieldset')[4].style.visibility = 'hidden';
	/*隐藏三个分组end*/

	/*财务系统是否存在为是的时候必输，为否的时候不必输start*/
	useValuesChange(({
		args
	}) => {
		var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
		if (user_cwxtsfcz == '1') {
			mstform.getItem('user_insconcode').setProps({
				required: true, //required是否必输
			});
			mstform.getItem('user_insconid').setProps({
				required: true, //required是否必输
			});
			mstform.getItem('user_insconname').setProps({
				required: true, //required是否必输
			});
			mstform.getItem('user_insconcode').setReadOnly(false);
			mstform.getItem('user_insconcode').setProps({ disabled: false });
		} else {
			mstform.getItem('user_insconcode').setProps({
				required: false, //required是否必输
			});
			mstform.getItem('user_insconid').setProps({
				required: false, //required是否必输
			});
			mstform.getItem('user_insconname').setProps({
				required: false, //required是否必输
			});
			mstform.getItem('user_insconcode').setReadOnly(true);
			mstform.getItem('user_insconcode').setProps({ disabled: true });
		}
	}, "PcmM6.user_cwxtsfcz");


	/*财务系统是否存在为是的时候必输，为否的时候不必输end*/
	if (mstform.getItem('user_cwxtsfcz').getValue() == '2') {
		mstform.getItem('user_insconcode').setProps({
			required: false, //required是否必输
		});
		mstform.getItem('user_insconid').setProps({
			required: false, //required是否必输
		});
		mstform.getItem('user_insconname').setProps({
			required: false, //required是否必输
		});
	} else {
		mstform.getItem('user_insconcode').setProps({
			required: true, //required是否必输
		});
		mstform.getItem('user_insconid').setProps({
			required: true, //required是否必输
		});
		mstform.getItem('user_insconname').setProps({
			required: true, //required是否必输
		});
	}
	/*浪潮返回标志为4申请取消审核可点击start*/
	// if (mstform) {
	// 	var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
	// 	if (user_istbinspur == '4') {
	// 		Toolbar.getItem('applyForReview').setReadOnly(false);
	// 	}
	// 	else if (mstform.getItem('user_insconid').getValue()) {
	// 		Toolbar.getItem('applyForReview').setReadOnly(false);
	// 	} else {
	// 		Toolbar.getItem('applyForReview').setReadOnly(true);
	// 	}
	// }
	/*浪潮返回标志为4申请取消审核可点击end*/


	/*预付款金额调整*/
	useValuesChange(({
		args
	}) => {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc && yfkbl) {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		} else if (yfkbl == 0) {
			mstform.getItem('user_yfkbl').setValue(0);
		} else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	}, "PcmM6.user_yfkje");
	/*含税金额调整*/
	useValuesChange(({
		args
	}) => {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc && yfkbl) {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		} else if (yfkbl == 0) {
			mstform.getItem('user_yfkbl').setValue(0);
		} else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	}, "PcmM6.CntSumVatFc");
	/*甲方单位为组织的时候浪潮甲方为必输切不只读start*/
	useValuesChange(({
		args
	}) => {
		var PhidRecComp = mstform.getItem('PhidRecComp').getValue();
		$NG.execServer('contract_CorrUnit', {
			'phid': PhidRecComp
		}, function (res) {
			if (res.status != 'success') {
				$NG.alert('sql有误');
				return false;
			}
			if (res.count == 1) {
				var data = JSON.parse(res.data)
				if (data[0].extendObjects.type == 'org') {
					//浪潮甲方设置为只读
					mstform.getItem('user_lcjf').setReadOnly(false);
					mstform.getItem('user_lcjf').setProps({
						required: true, //required是否必输
					});
				} else {
					mstform.getItem('user_lcjf').setReadOnly(true);
					mstform.getItem('user_lcjf').setProps({
						required: false, //required是否必输
					});
				}
			}
		});
	}, "PcmM6.PhidRecComp");

	/*甲方单位为组织的时候浪潮甲方为必输切不只读end*/
	if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit" || $NG.getQueryValue('otype') == "view") {
		useValuesChange(({
			args
		}) => {
			var Billno = mstform.getItem('BillNo').getValue();
			if (!Billno) {
				return false;
			}
			var bill_no = Billno.replace(/\s*/g, "")
			mstform.getItem('BillNo').setValue(bill_no);
			$NG.execServer('htbhss', {
				'bill_no': bill_no
			}, function (res) {
				var data = JSON.parse(res.data)
				var htbh = data[0].extendObjects.ht
				if (htbh == 1) {
					$NG.alert("合同编号已存在");
					return false;
				}
			})
		}, "PcmM6.BillNo");
	}
	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	useValuesChange(({
		args
	}) => {
		var PhidSenComp = mstform.getItem('PhidSenComp').getValue();
		if (!PhidSenComp) {
			return false;
		}
		$NG.execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function (res) {
			if (res.status != 'success') {
				$NG.alert("sql有误");
				return false;
			}
			if (res.count == 1) {
				var data = JSON.parse(res.data)
				if (data[0].extendObjects.type == 'org') {
					//浪潮甲方设置为只读
					mstform.getItem('user_lcyf').setReadOnly(false);
					mstform.getItem('user_lcyf').setProps({
						required: true, //required是否必输
					});
				} else {
					mstform.getItem('user_lcyf').setReadOnly(true);
					mstform.getItem('user_lcyf').setProps({
						required: false, //required是否必输
					});
				}
			}
		});
	}, "PcmM6.PhidSenComp");
	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/
	useUpdateRow(({ args }) => {
		if (args[1].dataIndex == 'Qty') {
			var sl = Number(args[0].Qty);
			if (sl == 1) {
				$NG.alert('数量不能为1,请修改');
				return false;
			}
		}
	}, "PcmD6");
	/*输入浪潮合同编码带出浪潮合同ID*/
	useValuesChange(({
		args
	}) => {
		var user_insconcode = mstform.getItem('user_insconcode').getValue();
		if (user_insconcode) {
			$NG.execServer('user_insconcode', {
				'user_insconcode': user_insconcode
			}, function (res) {
				if (res.count == 0) {
					mstform.getItem('user_insconid').setValue('');
					mstform.getItem('user_insconname').setValue('');
				} else {
					var data = JSON.parse(res.data)
					mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm);
					mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
				}
			});
		}
	}, "PcmM6.user_insconcode");
	/*管理组织选择后清空所属项目部start*/
	useValuesChange(({
		args
	}) => {
		var PhidPc = mstform.getItem('PhidPc').getValue()
		if (!PhidPc) {
			return false;
		}
		$NG.execServer('xmxxdcglzssmb', {
			'phid': PhidPc
		}, function (res) {
			if (res.count > 0) {
				var data = JSON.parse(res.data);
				var user_lcglzz = data[0].extendObjects.user_lcglzz;
				var user_lcglzz_exname = data[0].extendObjects.user_lcglzz_exname;
				var user_lcssxmb = data[0].extendObjects.user_lcssxmb;
				var user_lcssxmb_exname = data[0].extendObjects.user_lcssxmb_exname;
				mstform.setValues({
					user_lcglzz: {
						value: user_lcglzz,
						label: user_lcglzz_exname
					},
					user_lcssxmb: {
						value: user_lcssxmb,
						label: user_lcssxmb_exname
					}
				});
			} else {
				$NG.alert('项目信息没有管理组织和所属项目部');
				return false;
			}
		});
		setTimeout(() => {
			var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
			if (user_lcssxmb) {
				$NG.execServer('ssxmb_bmywdy', {
					'dept': user_lcssxmb
				}, function (res) {
					if (res.count > 0) {
						var data = JSON.parse(res.data)
						if (data.length == 1) {
							if (data[0].extendObjects.user_lcywdy != null && data[0].extendObjects.user_lcywdy != '') {
								mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
							} else {
								$NG.alert('请联系管理员处理，部门对照未做');
								mstform.getItem('user_lcywdy').setValue(null);
								return false;
							}
						} else {
							$NG.alert('请联系管理员处理，部门对照存在重复');
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
							var data = JSON.parse(res.data)
							if (data.length == 1) {
								if (data[0].extendObjects.user_mnemcodeinaccdepart != null && data[0].extendObjects.user_mnemcodeinaccdepart != '') {
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
				});
			}
		}, 200);
	}, "PcmM6.PhidPc");
	/*管理组织选择后清空所属项目部end*/

	/*管理组织选择后清空所属项目部start*/
	useValuesChange(({
		args
	}) => {
		mstform.getItem('user_lcssxmb').setValue();
	}, "PcmM6.user_lcglzz");
	/*管理组织选择后清空所属项目部end*/

	useBeforeOpen((data) => {
		var zz = mstform.getItem('user_lcglzz').getValue();
		if (!zz) {
			$NG.alert('请先选择管理组织');
			return false;
		}
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.PcmM6.user_lcssxmb.setProps({
				clientSqlFilter: ('parent_orgid = ' + zz),
				placeholder: ``
			});
		});
		return true;
	}, 'pc_dept');
	/*项目所属部选择后带出浪潮业务单元start*/
	useValuesChange(({
		args
	}) => {
		var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
		if (!user_lcssxmb) {
			return false;
		}
		$NG.execServer('ssxmb_bmywdy', {
			'dept': user_lcssxmb
		}, function (res) {
			if (res.count > 0) {
				var data = JSON.parse(res.data)
				if (data.length == 1) {
					if (data[0].extendObjects.user_lcywdy != null || data[0].extendObjects.user_lcywdy != '') {
						mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
					} else {
						mstform.getItem('user_lcywdy').setValue(null);
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
			$NG.execServer('ssxmb_zjm', {
				'dept': user_lcssxmb
			}, function (res) {
				if (res.count > 0) {
					var data = JSON.parse(res.data)
					if (data.length == 1) {
						if (data[0].extendObjects.user_mnemcodeinaccdepart != null || data[0].extendObjects.user_mnemcodeinaccdepart != '') {
							mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
						} else {
							mstform.getItem('user_lchsbmzjm').setValue(null);
							$NG.alert('请联系管理员处理，部门对照未做');
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
		});
	}, "PcmM6.user_lcssxmb");
	/*项目所属部选择后带出浪潮业务单元end*/

	//保存前检测

	useBeforeClick(({
		args
	}) => {
		var flag = 0;
		var user_insconcode = mstform.getItem('user_insconcode').getValue();
		var pc = mstform.getItem('PhidPc').getValue();
		/*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
		if (user_insconcode) {
			$NG.execServer('user_insconcode', {
				'user_insconcode': user_insconcode
			}, function (res) {
				if (res.status != 'success') {
					$NG.alert("sql有误");
					flag = 1;
					return false;
				} else if (res.count == 0) {
					$NG.alert("该浪潮合同编码在浪潮系统中不存在");
					flag = 1;
				} else { }
			});
		}
		if ($NG.getQueryValue('otype') == "edit") {
			var bill_no = mstform.getItem('BillNo').getValue() ? "'" + mstform.getItem('BillNo').getValue() + "'" : mstform.getItem('BillNo').getValue();
			if (bill_no) {
				$NG.execServer('lchtbm_djbh', {
					'bill_no': bill_no
				}, function (res) {
					var data = JSON.parse(res.data)
					if (res.status != 'success') {
						$NG.alert("sql有误");
						flag = 1;
						return false;
					} else if (data[0].extendObjects.user_insconcode == mstform.getItem('user_insconcode').getValue()) {

					} else {
						//检测该浪潮合同编码是否在新中大存在
						$NG.execServer('lchtbm', {
							'user_insconcode': user_insconcode
						}, function (res) {
							if (res.status != 'success') {
								$NG.alert("sql有误");
								flag = 1;
								return false;
							} else if (res.count == 0) { } else {
								$NG.alert("该浪潮合同编码在新中大中已存在");
								flag = 1;
								return false;
							}
						});
					}
				});
			}
		}
		if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {
			var bill_no = mstform.getItem('BillNo').getValue();
			/*判断项目信息所属项目部和部门业务单元对照字段是否有值start*/
			if (pc) {
				$NG.execServer('xmxx_ssxmb_lcywdy', {
					'pc': pc
				}, function (res) {
					if (res.status != 'success') {
						$NG.alert("sql有误");
						flag = 1;
						return false;
					} else if (res.count == 1) {
						var data = JSON.parse(res.data)
						if (!data[0].extendObjects.user_pc_dept) {
							$NG.alert("合同所属项目信息没有维护所属项目部");
							flag = 1;
							return false;
						}
						if (!data[0].extendObjects.user_mnemcodeinaccdepart) {
							$NG.alert("合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码");
							flag = 1;
							return false;
						}
						if (!data[0].extendObjects.user_lcywdy) {
							$NG.alert("合同所属项目信息没有维护浪潮业务单元");
							flag = 1;
							return false;
						}
					}
				});
			}
			/*判断项目信息所属项目部和部门业务单元对照字段是否有值end*/

			if (bill_no) {
				$NG.execServer('htbhss', {
					'bill_no': bill_no
				}, function (res) {
					if (res.count > 0) {
						var data = JSON.parse(res.data);
						var htbh = data[0].extendObjects.ht
						if ($NG.getQueryValue('otype') == "add") {
							if (htbh == 1) {
								$NG.alert("存在重复编码");
								flag = 1;
								return false;
							}
						}
					}
					if (user_insconcode) {
						//检测该浪潮合同编码是否在新中大存在
						console.log('user_insconcode============>', user_insconcode)
						$NG.execServer('lchtbm', {
							'user_insconcode': user_insconcode
						}, function (res) {
							if (res.status != 'success') {
								$NG.alert("sql有误");
								flag = 1;
								return false;
							} else if (res.count == 0) { } else {
								$NG.alert("该浪潮合同编码在新中大中已存在");
								flag = 1;
								return false;
							}
						});
					}
				});
			}
		}
		/*查看浪潮合同编码是否存在user_insconcode 该视图中end*/

		/*税率不能为0strat*/
		// var rate = mstform.getItem("user_rate").getValue();
		// if (rate) {
		// 	if (mstform.getItem("user_szlxpdbz").getValue() != '1') {
		// 		$NG.confirm('税率是否为0').then(res => {
		// 			if (res) {
		// 				flag = 1
		// 				mstform.getItem("user_szlxpdbz").setValue('1');
		// 			} else {
		// 				flag = 1
		// 				mstform.getItem("user_szlxpdbz").setValue(null);
		// 			}
		// 		})
		// 	}
		// }
		/*税率不能为0end*/

		if (flag == 1) {
			return false;
		} else if (flag == 0) {
			return true;
		}

	}, "save");
});