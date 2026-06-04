$NG.AllReady(function (
	page,
	{ useAction, useValuesChange, useDataIndexChange, useUpdateRow, useUpdateRows, useClick, useBeforeClick, useBeforeOpen }
) {
	var mstform = $NG.getCmpApi('PcmM5');
	var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
	var dgrid = $NG.getCmpApi('PcmD5');
	if ($NG.getQueryValue('oType') == 'view') {
		console.log("dataready");
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		if (user_istbinspur != '4' && user_istbinspur != null && user_istbinspur != '') {
			Toolbar.getItem('applyForReview').setReadOnly(true);
		} else {
			Toolbar.getItem('applyForReview').setReadOnly(false);
		}
	} else {
		Toolbar.getItem('applyForReview').setReadOnly(true);
	}
	if (mstform) {
		if ($NG.getQueryValue('otype') == "add") {
			//浪潮乙方设置为只读
			//mstform.getItem('user_lcyf').userSetReadOnly(true);
			mstform.getItem('user_cwxtsfcz').setValue('1');
			//mstform.getItem('PhidYsfl').userSetMustInput(false);
			//mstform.getItem('PhidYsfl').setVisible(false);
			mstform.getItem('PayOverPrecent').setValue('1.1');
			//mstform.getItem('PayOverPrecent').userSetReadOnly(true);
			//mstform.getItem('CntSumVatFc').userSetReadOnly(false);
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
	}, "PcmM5.Zfbl");
	/*根据支付比例带出同步初始比例end*/

	/*预付款比例调整*/
	useValuesChange(({
		args
	}) => {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc != '' && CntSumVatFc != 0) {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		}
		else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	}, "PcmM5.user_yfkje");
	/*含税金额调整start*/
	useValuesChange(({
		args
	}) => {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc != '' && CntSumVatFc != 0) {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		}
		else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	}, "PcmM5.CntSumVatFc");
	/*含税金额调整end*/
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
		if (user_cwxtsfcz == '2') {
			mstform.getItem('user_insconcode').setProps({
				required: false, //required是否必输
			});
		} else {
			mstform.getItem('user_insconcode').setProps({
				required: true, //required是否必输
			});
		}
	}, "PcmM5.user_cwxtsfcz");
	/*财务系统是否存在为是的时候必输，为否的时候不必输end*/


	/*浪潮返回标志为4申请取消审核可点击start*/
	//mstform.getItem('PayOverPrecent').userSetReadOnly(true);
	var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
	// if (user_istbinspur == '4') {
	// 	Toolbar.getItem('applyForReview').setReadOnly(false);
	// }
	// else if (mstform.getItem('user_insconid').getValue() != null) {
	// 	Toolbar.getItem('applyForReview').setReadOnly(false);
	// } else {
	// 	Toolbar.getItem('applyForReview').setReadOnly(true);
	// }



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
		}
	}, "PcmM5.user_cwxtsfcz");
	//如果 ；浪潮id字段有值在显示取消审核

	//  	if(user_istbinspur == '4') {
	// 			Toolbar.getComponent('applycheck').forceenable();
	// 		} 
	//          else  if (mstform.getItem('user_insconid').getValue().length > 0) { 

	//     Toolbar.getComponent('applycheck').forcedisable();
	//   }

	//如果 浪潮是否存在显示的是 浪潮名称、id、编号必填
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
	/*浪潮返回标志为4申请取消审核可点击end*/

	if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {
		//mstform.getItem('PayOverPrecent').userSetReadOnly(true);
		useValuesChange(({
			args
		}) => {
			var Billno = mstform.getItem('BillNo').getValue();
			var bill_no = Billno.replace(/\s*/g, "")
			mstform.getItem('BillNo').setValue(bill_no);

			$NG.execServer('htbhss', {
				'bill_no': bill_no
			}, function (res) {
				var htbh = data[0].extendObjects.ht
				if (htbh == 1) {
					$NG.alert("存在重复编码");
					flag = 1;
					return false;
				}
			})
		}, "PcmM5.BillNo");
	}

	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	useValuesChange(({
		args
	}) => {
		var PhidSenComp = mstform.getItem('PhidSenComp').getValue();
		if (PhidSenComp == null || PhidSenComp == '') {
			return;
		}
		$NG.execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function (res) {
			if (res.status != 'success') {
				$NG.alert("sql有误");
				return;
			}

			if (res.count == 1) {
				var data = JSON.parse(res.data);
				if (data[0].extendObjects.type == 'org') {
					//浪潮乙方设置为只读
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
	}, "PcmM5.PhidSenComp");
	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/

	useUpdateRow(({ args, table }) => {
		if (args[1].dataIndex == 'Qty') {
			var sl = Number(args[0].Qty);
			if (sl == 1) {
				$NG.alert('数量不能为1,请修改');
				return false;
			}
		}
	}, "PcmD5");

	/*输入浪潮合同编码带出浪潮合同IDstart*/
	useValuesChange(({
		args
	}) => {
		var user_insconcode = mstform.getItem('user_insconcode').getValue() ? "'" + mstform.getItem('user_insconcode').getValue() + "'" : mstform.getItem('user_insconcode').getValue();
		$NG.execServer('user_insconcode', {
			'user_insconcode': user_insconcode
		}, function (res) {
			if (res.count == 0) {
				mstform.getItem('user_insconid').setValue('');
				mstform.getItem('user_insconname').setValue('');
			} else {
				var data = JSON.parse(res.data);
				mstform.getItem('user_insconid').setValue(data[0].extendObjects.htnm);
				mstform.getItem('user_insconname').setValue(data[0].extendObjects.htmc);
			}
		});
	}, "PcmM5.user_insconcode");
	/*输入浪潮合同编码带出浪潮合同IDend*/


	/*管理组织选择后清空所属项目部start*/
	useValuesChange(({
		args
	}) => {
		var PhidPc = mstform.getItem('PhidPc').getValue()
		if (PhidPc == null || PhidPc == '') {
			return;
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
				mstform.getItem('user_lcssxmb').setValue(null);
				mstform.getItem('user_lcywdy').setValue(null);
				return false;
			}
		});

		setTimeout(() => {
			var lcssxmb = mstform.getItem('user_lcssxmb').getValue();
			if (lcssxmb != null || lcssxmb != '') {
				$NG.execServer('ssxmb_bmywdy', {
					'dept': lcssxmb
				}, function (res) {
					if (res.count > 0) {
						console.log('res=================>', res);
						var data = JSON.parse(res.data);
						if (data.length == 1) {
							if (data[0].extendObjects.user_lcywdy == null) {
								$NG.alert('请联系管理员处理，部门对照未做');
								mstform.getItem('user_lcywdy').setValue(null);
								return false;
							} else {
								mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
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
						'dept': lcssxmb
					}, function (res) {
						if (res.count > 0) {
							var data = JSON.parse(res.data);
							if (data.length == 1) {
								if (data[0].extendObjects.user_mnemcodeinaccdepart == null) {
									$NG.alert('请联系管理员处理，部门对照未做');
									mstform.getItem('user_lchsbmzjm').setValue(null);
									return false;
								} else {
									mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
								}
							} else {
								$NG.alert('请联系管理员处理，部门对照存在重复');
								mstform.getItem('user_lchsbmzjm').setValue(null);
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
	}, "PcmM5.PhidPc");
	/*管理组织选择后清空所属项目部end*/

	/*管理组织选择后清空所属项目部start*/
	useValuesChange(({
		args
	}) => {
		mstform.getItem('user_lcssxmb').setValue();
	}, 'PcmM5.user_lcglzz');
	/*管理组织选择后清空所属项目部end*/

	useBeforeOpen((data) => {
		var zz = mstform.getItem('user_lcglzz').getValue();
		if (zz == null || zz == '') {
			$NG.alert('请先选择管理组织');
			return false;
		}
		$NG.updateUI(function (updater, state) {
			updater.fieldSetForm.PcmM5.user_lcssxmb.setProps({
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
				$NG.alert('请先维护部门业务单元对照表');
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
	}, "PcmM5.user_lcssxmb");
	/*项目所属部选择后带出浪潮业务单元end*/

	//保存前检测
	useBeforeClick(({
		args
	}) => {
		var flag = 0;
		var user_insconcode = mstform.getItem('user_insconcode').getValue() ? "'" + mstform.getItem('user_insconcode').getValue() + "'" : mstform.getItem('user_insconcode').getValue();
		var pc = mstform.getItem('PhidPc').getValue();
		if (mstform.getItem('user_insconcode').getValue() != null && mstform.getItem('user_insconcode').getValue() != '') {
			/*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
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
					return false;
				} else {

				}
			});
			if ($NG.getQueryValue('otype') == 'edit') {
				setTimeout(() => {
					var bill_no = mstform.getItem('BillNo').getValue() ? "'" + mstform.getItem('BillNo').getValue() + "'" : mstform.getItem('BillNo').getValue();
					$NG.execServer('lchtbm_djbh', {
						'bill_no': bill_no
					}, function (res) {
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
				}, 200);
			}
			if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {
				setTimeout(() => {
					//判断编号是否存在合同
					var bill_no = mstform.getItem('BillNo').getValue();
					$NG.execServer('htbhss', {
						'bill_no': bill_no
					}, function (res) {
						var data = JSON.parse(res.data);
						var htbh = data[0].extendObjects.ht
						if (htbh == 1) {
							$NG.alert("存在重复编码");
							flag = 1;
							return false;
						}
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
					});
				}, 200);
			}
		}
		/*查看浪潮合同编码是否存在user_insconcode 该视图中end*/

		/*判断项目信息所属项目部和部门业务单元对照字段是否有值start*/
		if ($NG.getQueryValue('otype') == "add" || $NG.getQueryValue('otype') == "edit") {
			if (pc == null || pc == '') {
				$NG.alert("请维护项目信息");
				flag = 1;
				return false;
			}
			setTimeout(() => {
				$NG.execServer('xmxx_ssxmb_lcywdy', {
					'pc': pc
				}, function (res) {
					if (res.status != 'success') {
						$NG.alert("sql有误");
						flag = 1;
					} else if (res.count == 1) {
						var data = JSON.parse(res.data);
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
			}, 300);
		}
		/*判断项目信息所属项目部和部门业务单元对照字段是否有值end*/

		/*税率不能为0strat*/
		var rate = mstform.getItem("user_rate").getValue();
		if (rate == 0) {
			if (mstform.getItem("user_szlxpdbz").getValue() != '1') {
				$NG.confirm("税率是否为0?").then(function (btnId) {
					if (btnId) {
						mstform.getItem("user_szlxpdbz").setValue('1');
						flag = 1
						return false;
					} else {
						flag = 1
						mstform.getItem("user_szlxpdbz").setValue(null);
						return false;
					}
				});
			}
		}

		/*税率不能为0end*/

		if (flag == 1) {
			return false;
		}
		if (flag == 0) {
			return true;
		}
	}, "CntMDetailToolBar.save");
});