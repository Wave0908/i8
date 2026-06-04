$NG.AllReady(function (
	editPage,
	{ useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
	var mstform = $NG.getCmpApi('PcmM7');
	var dgrid = $NG.getCmpApi('PcmD7');
	console.log("dgrid:", dgrid);
	var dstore = dgrid.store;
	//菜单栏增加复制功能start
	var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
	console.log("Buttons:", Toolbar.getButtons());
	console.log("ToolBar:", Toolbar)
	mstform.getItem('user_htzsl').setProps({
		hidden: true,
		required: false
	});
	console.log("PayOverPrecent:", mstform.getItem('PayOverPrecent').getProps());
	mstform.getItem('PayOverPrecent').setValue('1.1');

	useValuesChange(({ args, form }) => {
		if (mstform.getItem('user_cghtzjxz').getValue() == '4') {
			mstform.getItem('BillDt').setReadOnly(true);
		} else {
			mstform.getItem('BillDt').setReadOnly(false);
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
	if (schemeid == '224191226002002') {
		mstform.getItem('user_cghtzjxz').setValue('1')
	} else if (schemeid == '569000000000022') {
		mstform.getItem('user_cghtzjxz').setValue('3')
	} else {
		$NG.getCmpApi('CntDToolbar').hideButton('addrow')
	}
	if ($NG.getQueryValue('otype') == 'add') {

		//mstform.getItem('user_sfcds').userSetMustInput(true);
		$NG.updateUI((updater) => {
			updater.fieldSetForm.PcmM7.user_sfcds.setProps({ required: true })
		})
		//业务来源是否赋值给采购形式
		var xxcgywlb = mstform.getItem('user_sfcds').getValue();
		mstform.getItem('Zfbl').setValue('0');
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
	mstform.getItem('user_cwxtsfcz').setValue('1');

	/*根据支付比例带出同步初始比例start*/
	useValuesChange(({ args, form }) => {
		var Zfbl = mstform.getItem('Zfbl').getValue();
		mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
		mstform.getItem('user_zfbl').setValue(Zfbl);
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
		} else {
			$NG.updateUI((updater) => {
				updater.fieldSetForm.PcmM7.user_insconcode.setProps({ required: false })
				updater.fieldSetForm.PcmM7.user_insconid.setProps({ required: false })
				updater.fieldSetForm.PcmM7.user_insconname.setProps({ required: false })
			})
		}
	}, "PcmM7.user_cwxtsfcz");

	/*财务系统是否存在为是的时候必输，为否的时候不必输end*/
	useValuesChange(({ args, form }) => {
		if (mstform.getItem('user_insconid').getValue()) {
			//Toolbar.getComponent('applycheck').forcedisable();
			Toolbar.getItem('applyForReview').setReadOnly(true);
		} else {
			//Toolbar.getComponent('applycheck').forceenable();
			Toolbar.getItem('applyForReview').setReadOnly(false);
		}
	}, "PcmM7.user_insconid");
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
	if (mstform.getItem('PhidOrg').getValue() == '324191209000063') {
		if ($NG.getQueryValue('otype') == 'add' || $NG.getQueryValue('otype') == 'edit') {
			mstform.getItem('PhidPc').setReadOnly(false);
		}
	}
	setTimeout(() => {
		if (user_istbinspur == '4') {
			Toolbar.getItem('applyForReview').setReadOnly(false);
		} else if (mstform.getItem('user_insconid').getValue()) {
			Toolbar.getItem('applyForReview').setReadOnly(false);
		} else {
			Toolbar.getItem('applyForReview').setReadOnly(true);
		}
	}, 300);

	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	useValuesChange(({ args, form }) => {
		var PhidSenComp = mstform.getItem('PhidCustomerEnt').getValue();
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
				$NG.updateUI((updater) => {
					updater.fieldSetForm.PcmM7.user_lcyf.setProps({ required: true })
				})
			} else {
				mstform.getItem('user_lcyf').setReadOnly(true);
				$NG.updateUI((updater) => {
					updater.fieldSetForm.PcmM7.user_lcyf.setProps({ required: false })
				})
			}


		});

	}, "PcmM7.PhidCustomerEnt");

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
		}

		var b = dgrid.getRows();
		var fde = b[0].user_fde;
		//var fdjjyjwz = c[0].get(user_fdjjyjwz)
		//var fdlx = d[0].get(user_fdlx)
		for (var i = 1; i < b.length; i++) {
			b[i]['user_fde'] = fde;
			//c[i].set('user_fdjjyjwz', fdjjyjwz);
			//d[i].set('user_fdlx', fdlx);
		}

		var c = dgrid.getRows();
		var fdjjyjwz = c[0].user_fdjjyjwz
		//var fdlx = d[0].get(user_fdlx)
		for (var i = 1; i < c.length; i++) {
			c[i]['user_fdjjyjwz'] = fdjjyjwz;
			//d[i].set('user_fdlx', fdlx);
		}

		var d = dgrid.getRows();
		var fdlx = d[0].user_fdlx
		for (var i = 1; i < d.length; i++) {
			d[i]['user_fdlx'] = fdlx;
		}
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
			if (lcssxmb != null || lcssxmb != '') {
				$NG.execServer('ssxmb_bmywdy', {
					'dept': lcssxmb
				}, function (res) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					if (res.count > 0) {
						mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
					} else {
						$NG.alert('请先维护部门业务单元对照表');
						return false;
					}
				});

				$NG.execServer('ssxmb_zjm', {
					'dept': lcssxmb
				}, function (res) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log("data[0].extendObjects:", data[0].extendObjects);
					if (res.count > 0) {
						mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
					} else {
						$NG.alert('浪潮核算部门的助记码没有和新中大部门编码保持一致');
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
	useValuesChange(({ args, form }) => {
		var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();
		if (user_lcssxmb) {
			$NG.execServer('ssxmb_bmywdy', {
				'dept': user_lcssxmb
			}, function (res) {
				const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				if (data) {
					mstform.getItem('user_lcywdy').setValue(data[0].extendObjects.user_lcywdy);
				} else {
					$NG.alert('请先维护部门业务单元对照表');
					return false;
				}
				$NG.execServer('ssxmb_zjm', {
					'dept': user_lcssxmb
				}, function (res) {
					const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					console.log("data:", data);
					if (data) {
						console.log("data[0].extendObjects:", data[0].extendObjects);
						mstform.getItem('user_lchsbmzjm').setValue(data[0].extendObjects.user_mnemcodeinaccdepart);
					} else {
						$NG.alert('浪潮核算部门的助记码没有和新中大部门编码保持一致');
						return false;
					}

				});
			});
		}


	}, 'PcmM7.user_lcssxmb');

	// 添加保存前检测代码
	useBeforeClick(() => {
		return new Promise((resolve) => {
			var mstform = $NG.getCmpApi("PcmM7");
			var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
			var pc = mstform.getItem('PhidPc').getValue();
			var checkPromises = [];

			// 检查浪潮合同编码
			if (mstform.getItem('user_insconcode').getValue()) {
				// 检查浪潮合同编码是否存在
				const checkInsconcode = new Promise((resolveCheck, rejectCheck) => {
					$NG.execServer('user_insconcode', {
						'user_insconcode': user_insconcode
					}, function (res) {
						const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
						if (data) {
							if (res.status != 'success') {
								$NG.alert('sql有误');
								rejectCheck('sql有误');
							} else if (data.length == 0) {
								$NG.alert('该浪潮合同编码在浪潮系统中不存在');
								rejectCheck('该浪潮合同编码在浪潮系统中不存在');
							} else {
								resolveCheck();
							}
						} else {
							resolveCheck();
						}
					});
				});
				checkPromises.push(checkInsconcode);

				// 编辑模式下的检查
				if ($NG.getQueryValue('oType') == 'edit') {
					var bill_no = "'" + mstform.getItem('BillNo').getValue() + "'";
					const checkEdit = new Promise((resolveCheck, rejectCheck) => {
						$NG.execServer('lchtbm_djbh', {
							'bill_no': bill_no
						}, function (res) {
							const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
							if (res.status != 'success') {
								$NG.alert('sql有误');
								rejectCheck('sql有误');
							} else if (data[0].extendObjects.user_insconcode == mstform.getItem('user_insconcode').getValue()) {
								resolveCheck();
							} else {
								// 检测该浪潮合同编码是否在新中大存在
								$NG.execServer('lchtbm', {
									'user_insconcode': user_insconcode
								}, function (res) {
									const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
									if (res.status != 'success') {
										$NG.alert('sql有误');
										rejectCheck('sql有误');
									} else if (!data || data.length == 0) {
										resolveCheck();
									} else {
										$NG.alert('该浪潮合同编码在新中大中已存在');
										rejectCheck('该浪潮合同编码在新中大中已存在');
									}
								});
							}
						});
					});
					checkPromises.push(checkEdit);
				}

				// 添加模式下的检查
				if ($NG.getQueryValue('oType') == 'add') {
					const checkAdd = new Promise((resolveCheck, rejectCheck) => {
						$NG.execServer('lchtbm', {
							'user_insconcode': user_insconcode
						}, function (res) {
							const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
							if (res.status != 'success') {
								$NG.alert('sql有误');
								rejectCheck('sql有误');
							} else if (!data || data.length == 0) {
								resolveCheck();
							} else {
								$NG.alert('该浪潮合同编码在新中大中已存在');
								rejectCheck('该浪潮合同编码在新中大中已存在');
							}
						});
					});
					checkPromises.push(checkAdd);
				}
			}

			// 编辑模式下检查重复编码和项目信息
			if ($NG.getQueryValue('oType') == 'edit') {
				// 检查重复编码
				const checkDuplicate = new Promise((resolveCheck, rejectCheck) => {
					$NG.execServer('htbhss', {
						'bill_no': mstform.getItem('BillNo').getValue()
					}, function (res) {
						const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
						if (data && data[0] && data[0].extendObjects && data[0].extendObjects.ht == 1) {
							$NG.alert('存在重复编码');
							rejectCheck('存在重复编码');
						} else {
							resolveCheck();
						}
					});
				});
				checkPromises.push(checkDuplicate);

				// 检查项目信息
				const checkProject = new Promise((resolveCheck, rejectCheck) => {
					$NG.execServer('xmxx_ssxmb_lcywdy', {
						'pc': pc
					}, function (res) {
						const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
						if (res.status != 'success') {
							$NG.alert('sql有误');
							rejectCheck('sql有误');
						} else if (data.length == 1) {
							if (!data[0].extendObjects.user_pc_dept) {
								$NG.alert('合同所属项目信息没有维护所属项目部');
								rejectCheck('合同所属项目信息没有维护所属项目部');
							} else if (!data[0].extendObjects.user_mnemcodeinaccdepart) {
								$NG.alert('合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码');
								rejectCheck('合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码');
							} else if (!data[0].extendObjects.user_lcywdy) {
								$NG.alert('合同所属项目信息没有维护浪潮业务单元');
								rejectCheck('合同所属项目信息没有维护浪潮业务单元');
							} else {
								resolveCheck();
							}
						} else {
							resolveCheck();
						}
					});
				});
				checkPromises.push(checkProject);
			}

			// 检查税率
			var rate = mstform.getItem("user_rate").getValue();
			if (rate == 0 && mstform.getItem("user_szlxpdbz").getValue() != '1') {
				const checkRate = new Promise((resolveCheck, rejectCheck) => {
					$NG.confirm('税率是否为0').then(res => {
						if (res) {
							mstform.getItem("user_szlxpdbz").setValue('1');
							rejectCheck('税率为0，需要确认');
						} else {
							mstform.getItem("user_szlxpdbz").setValue(null);
							rejectCheck('税率为0，用户取消');
						}
					});
				});
				checkPromises.push(checkRate);
			}

			// 如果没有检查项，则允许保存
			if (checkPromises.length === 0) {
				resolve(true);
				return;
			}

			// 执行所有检查
			Promise.all(checkPromises.map(p => p.catch(e => e)))
				.then(results => {
					// 检查是否有任何检查失败
					const hasError = results.some(result => typeof result === 'string');
					if (hasError) {
						resolve(false); // 有错误，不允许保存
					} else {
						resolve(true); // 所有检查通过，允许保存
					}
				});
		});
	}, 'save');

});







