function AllReady() {
	var mstform = Ext.getCmp('CntM7');
	var dgrid = Ext.getCmp('CntD7');
	var dstore = dgrid.store;
	//菜单栏增加复制功能start
	var Toolbar = Ext.getCmp('toolbar');
	var ToolbarList = CommButtonView.toolbar;
	mstform.getItem('user_htzsl').setVisible(false);
	mstform.getItem('PayOverPrecent').setValue('1.1');
	mstform.getItem('PayOverPrecent').userSetReadOnly(true);
	mstform.on("dataready", function () {
		if (mstform.getItem('user_cghtzjxz').getValue() == '4') {
			mstform.getItem('BillDt').userSetReadOnly(true);
		} else {
			mstform.getItem('BillDt').userSetReadOnly(false);
		}
	});



	//合同属性判断选择后触发
	mstform.getItem('user_htsxpd').addListener('helpselected', function () {

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

	})

	//规模化采购形式判断选择后触发
	mstform.getItem('user_gmhcgxspd').addListener('helpselected', function () {

		if (mstform.getItem('user_gmhcgxspd').getValue() == '569000000001004') {
			mstform.getItem('user_sfgmh').setValue('2');
		} else {
			mstform.getItem('user_sfgmh').setValue('1');
		}
	})



	mstform.getItem('user_jjfs').addListener('change', function () {
		var user_jjfs = mstform.getItem('user_jjfs').getValue();
		if (user_jjfs == 0) {
			//record.set('user_fdlx', Ext.Number.from(record.get('user_fdlx'), 3)); 
			//record.set(3, Ext.Number.from(record.get('user_fdlx'), 0));    
			//record.set("0", Ext.Number.from(record.get('user_fde'), 0));
			//record.set('user_fdlx', '3');
			//record.set('user_fde', 5);
			dgrid.setReadOnlyCol('user_fdlx', true);
			dgrid.setReadOnlyCol('user_fde', true);
		}
		else {
			dgrid.setReadOnlyCol('user_fdlx', false);
			dgrid.setReadOnlyCol('user_fde', false);
			dgrid.setMustInputCol('user_fdlx', true);
			dgrid.setMustInputCol('user_fde', true);

		}

	});

	if (otype == $Otype.VIEW) {
		mstform.getItem('user_htzsl').setVisible(true);
		var sum = 0;
		mstform.on('dataready', function () {
			execServer('cghtslhz', {
				'phid': busid
			}, function (res) {
				console.log(res)
				var sum = 0;
				for (var i = 0; i < res.data.length; i++) {
					sum = sum + res.data[i].qty
				}
				mstform.getItem('user_htzsl').setValue(sum)

			})
		});

	}

	if (schemeid == '224191226002002') {
		mstform.getItem('user_cghtzjxz').setValue('1')
	} else if (schemeid == '569000000000022') {
		mstform.getItem('user_cghtzjxz').setValue('3')
	} else {
		Toolbar.get('addrow').setVisible();
	}

	// mstform.getItem('CntSumVatFc').userSetReadOnly(false);getValue();
	if (otype == $Otype.ADD) {

		mstform.getItem('user_sfcds').userSetMustInput(true);
		//业务来源是否赋值给采购形式
		var xxcgywlb = mstform.getItem('user_sfcds').getValue();
		mstform.getItem('Zfbl').setValue('0');
		mstform.getItem('BillNo').addListener('itemchanged', function () {
			var Billno = mstform.getItem('BillNo').getValue();

			var bill_no = Billno.replace(/\s*/g, "")

			mstform.getItem('BillNo').setValue(bill_no);

			execServer('htbhss', {
				'bill_no': bill_no
			}, function (res) {
				var htbh = res.data[0].ht
				if (htbh == 1) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同编号已存在",
						modal: false
					});
					flag = 1;
					return false;
				}
			})
		});

	}

	if (otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) {

		var Toolbar = Ext.getCmp('toolbar');
		//Toolbar.get('addrow').setVisible();
	}
	//浪潮乙方设置为只读
	mstform.getItem('user_lcyf').userSetReadOnly(true);
	mstform.getItem('user_cwxtsfcz').setValue('1');

	/*根据支付比例带出同步初始比例start*/
	mstform.getItem('Zfbl').addListener('itemchanged', function () {
		var Zfbl = mstform.getItem('Zfbl').getValue();
		mstform.getItem('user_tzhdfkbl').setValue(Zfbl);
		mstform.getItem('user_zfbl').setValue(Zfbl);
	});
	/*根据支付比例带出同步初始比例end*/

	/*预付款比例调整*/
	mstform.getItem('user_yfkje').addListener('itemchanged', function () {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc != '') {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		} else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	});
	/*含税金额调整*/
	mstform.getItem('CntSumVatFc').addListener('change', function () {
		var CntSumVatFc = mstform.getItem('CntSumVatFc').getValue();
		var yfkbl = mstform.getItem('user_yfkje').getValue();
		if (CntSumVatFc != '') {
			mstform.getItem('user_yfkbl').setValue(yfkbl / CntSumVatFc);
		} else {
			mstform.getItem('user_yfkbl').setValue('');
		}
	});
	/*浪潮返回标志为4申请取消审核可点击start*/
	/*隐藏三个分组start*/
	document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
	document.getElementsByTagName('fieldset')[2].style.visibility = 'hidden';
	document.getElementsByTagName('fieldset')[4].style.visibility = 'hidden';
	/*隐藏三个分组end*/
	/*财务系统是否存在为是的时候必输，为否的时候不必输start*/
	mstform.getItem('user_cwxtsfcz').addListener('change', function () {
		var user_cwxtsfcz = mstform.getItem('user_cwxtsfcz').getValue();
		if (user_cwxtsfcz == '1') {
			mstform.getItem('user_insconcode').userSetMustInput(true);
			mstform.getItem('user_insconid').userSetMustInput(true);
			mstform.getItem('user_insconname').userSetMustInput(true);
		} else {
			mstform.getItem('user_insconcode').userSetMustInput(false);
			mstform.getItem('user_insconid').userSetMustInput(false);
			mstform.getItem('user_insconname').userSetMustInput(false);
		}
	});
	/*财务系统是否存在为是的时候必输，为否的时候不必输end*/
	if (mstform.getItem('user_insconid').getValue().length > 0) {
		Toolbar.getComponent('applycheck').forcedisable();
	} else {
		Toolbar.getComponent('applycheck').forceenable();
	}

	if (mstform.getItem('user_cwxtsfcz').getValue() == '2') {

		mstform.getItem('user_insconcode').userSetMustInput(false);
		mstform.getItem('user_insconid').userSetMustInput(false);
		mstform.getItem('user_insconname').userSetMustInput(false);
	} else {
		mstform.getItem('user_insconcode').userSetMustInput(true);
		mstform.getItem('user_insconid').userSetMustInput(true);
		mstform.getItem('user_insconname').userSetMustInput(true);
	}

	mstform.on('dataready', function (e) {
		var Toolbar = Ext.getCmp('toolbar');
		mstform.getItem('PayOverPrecent').userSetReadOnly(false);
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		//组织如果为鼎力服务公司
		if (mstform.getItem('PhidOcode').getValue() == '324191209000063') {
			if (otype == $Otype.ADD || otype == $Otype.EDIT) {
				mstform.getItem('PhidPc').userSetReadOnly(false);
			}
		}
		if (user_istbinspur == '4') {
			Toolbar.getComponent('applycheck').forceenable();
		} else if (mstform.getItem('user_insconid').getValue().length > 0) {
			Toolbar.getComponent('applycheck').forceenable();
		} else {
			Toolbar.getComponent('applycheck').forcedisable();
		}

	});

	/*浪潮返回标志为4申请取消审核可点击end*/

	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	mstform.getItem('PhidSenComp').addListener('helpselected', function () {

		var PhidSenComp = mstform.getItem('PhidSenComp').getValue();
		execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function (res) {
			if (res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});

			}

			if (res.data.length == 1) {
				if (res.data[0].type == 'org') {
					//浪潮甲方设置为只读
					mstform.getItem('user_lcyf').userSetReadOnly(false);
					mstform.getItem('user_lcyf').userSetMustInput(true);
				} else {
					mstform.getItem('user_lcyf').userSetReadOnly(true);
					mstform.getItem('user_lcyf').userSetMustInput(false);
				}
			}

		});

	});

	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/

	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	mstform.getItem('PhidSenComp').addListener('change', function () {

		var PhidSenComp = mstform.getItem('PhidSenComp').getValue();
		execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function (res) {
			if (res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});

			}

			if (res.data.length == 1) {
				if (res.data[0].type == 'org') {
					//浪潮甲方设置为只读
					mstform.getItem('user_lcyf').userSetReadOnly(false);
					mstform.getItem('user_lcyf').userSetMustInput(true);
				} else {
					mstform.getItem('user_lcyf').userSetReadOnly(true);
					mstform.getItem('user_lcyf').userSetMustInput(false);
				}
			}

		});

	});

	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/

	Toolbar.insert(1, {
		itemId: "copy",
		text: "复制",
		width: this.itemWidth,
		iconCls: "icon-New"
	});

	Toolbar.items.get('copy').on('click', function () {
		//获取表体数据
		var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
		var dzyhp = a[0].get('user_dzyhp');
		for (var i = 1; i < a.length; i++) {
			a[i].set('user_dzyhp', dzyhp);
		}

		var b = dgrid.getStore().getRange(0, dstore.getCount() - 1);
		var fde = b[0].get('user_fde')
		//var fdjjyjwz = c[0].get(user_fdjjyjwz)
		//var fdlx = d[0].get(user_fdlx)
		for (var i = 1; i < b.length; i++) {
			b[i].set('user_fde', fde);
			//c[i].set('user_fdjjyjwz', fdjjyjwz);
			//d[i].set('user_fdlx', fdlx);
		}

		var c = dgrid.getStore().getRange(0, dstore.getCount() - 1);
		var fdjjyjwz = c[0].get('user_fdjjyjwz')
		//var fdlx = d[0].get(user_fdlx)
		for (var i = 1; i < c.length; i++) {
			c[i].set('user_fdjjyjwz', fdjjyjwz);
			//d[i].set('user_fdlx', fdlx);
		}

		var d = dgrid.getStore().getRange(0, dstore.getCount() - 1);
		var fdlx = d[0].get('user_fdlx')
		for (var i = 1; i < d.length; i++) {
			d[i].set('user_fdlx', fdlx);
		}
	});
	//菜单栏增加复制功能end

	/*根据甲方单位字段选择为鼎立公司的，收票单位就是鼎立公司，甲方单位为其他公司 收票单位为集团公司start*/

	mstform.getItem('PhidRecComp').events.change.listeners.pop();
	console.log("mstform.getItem('PhidRecComp').events:", mstform.getItem('PhidRecComp').events);
	console.log("mstform.getItem('PhidRecComp').events.change.listeners:", mstform.getItem('PhidRecComp').events.change.listeners);

	mstform.getItem('PhidRecComp').addListener('helpselected', function () {

		if (mstform.getItem('PhidRecComp').getValue() == '548191210000063') {
			mstform.getItem('InvoiceSen').setValue('548191210000063');

		} else {
			mstform.getItem('InvoiceSen').setValue('548191210000001');
		}
		BatchBindCombox([mstform.getItem('InvoiceSen')]);
	})
	/*根据甲方单位字段为鼎立公司的，收票单位就是鼎立公司，甲方单位为其他公司 收票单位为集团公司end*/
	/*输入浪潮合同编码带出浪潮合同ID*/
	mstform.getItem('user_insconcode').addListener('itemchanged', function () {
		var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
		execServer('user_insconcode', {
			'user_insconcode': user_insconcode
		}, function (res) {
			var data = res.data
			if (data.length == 0) {
				mstform.getItem('user_insconid').setValue('');
				mstform.getItem('user_insconname').setValue('');
			} else {
				mstform.getItem('user_insconid').setValue(res.data[0].htnm);
				mstform.getItem('user_insconname').setValue(res.data[0].htmc);
			}

		});

	});


	/*管理组织选择后清空所属项目部start*/
	mstform.getItem('PhidPc').addListener('helpselected', function () {
		var PhidPc = mstform.getItem('PhidPc').getValue()
		execServer('xmxxdcglzssmb', {
			'phid': PhidPc
		}, function (res) {
			if (res.data[0]) {
				mstform.getItem('user_lcglzz').setValue(res.data[0].user_lcglzz);
				mstform.getItem('user_lcssxmb').setValue(res.data[0].user_lcssxmb);
				BatchBindCombox([mstform.getItem('user_lcglzz')]);
				BatchBindCombox([mstform.getItem('user_lcssxmb')]);
			} else {
				Ext.Msg.alert('提示', '项目信息没有管理组织和所属项目部');
				return false;
			}
		});

		var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();

		execServer('ssxmb_bmywdy', {
			'dept': user_lcssxmb
		}, function (res) {
			if (res.data[0]) {
				mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
			} else {
				Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
				return false;
			}
		});

		execServer('ssxmb_zjm', {
			'dept': user_lcssxmb
		}, function (res) {
			if (res.data[0]) {
				mstform.getItem('user_lchsbmzjm').setValue(res.data[0].user_mnemCodeInAccDepart);
			} else {
				Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
				return false;
			}
		});
	});
	/*管理组织选择后清空所属项目部end*/

	/*管理组织选择后清空所属项目部start*/
	mstform.getItem('user_lcglzz').addListener('helpselected', function () {
		mstform.getItem('user_lcssxmb').setValue();
	});
	/*管理组织选择后清空所属项目部end*/

	mstform.getItem('user_lcssxmb').on('beforetriggerclick', function (eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
		var zz = mstform.getItem('user_lcglzz').getValue();
		mstform.getItem('user_lcssxmb').setOutFilter({
			parent_orgid: zz
		}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
	});

	/*项目所属部选择后带出浪潮业务单元start*/
	mstform.getItem('user_lcssxmb').addListener('helpselected', function () {
		var user_lcssxmb = mstform.getItem('user_lcssxmb').getValue();

		execServer('ssxmb_bmywdy', {
			'dept': user_lcssxmb
		}, function (res) {
			if (res.data[0]) {
				mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
			} else {
				Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
				return false;
			}
		});

		execServer('ssxmb_zjm', {
			'dept': user_lcssxmb
		}, function (res) {
			if (res.data[0]) {
				mstform.getItem('user_lchsbmzjm').setValue(res.data[0].user_mnemCodeInAccDepart);
			} else {
				Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
				return false;
			}
		});

	});

	/*项目所属部选择后带出浪潮业务单元end*/
}

//保存前检测
function beforeSaveEdit() {
	var mstform = Ext.getCmp('CntM7');
	var flag = 0;
	var user_insconcode = "'" + mstform.getItem('user_insconcode').getValue() + "'";
	var pc = mstform.getItem('PhidPc').getValue();
	if (!Ext.isEmpty(mstform.getItem('user_insconcode').getValue())) {
		/*查看浪潮合同编码是否存在user_insconcode 该视图中start*/
		execServer('user_insconcode', {
			'user_insconcode': user_insconcode
		}, function (res) {
			if (res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});
				flag = 1;
			} else if (res.data.length == 0) {
				Ext.MessageBox.show({
					title: '提示',
					msg: "该浪潮合同编码在浪潮系统中不存在",
					modal: false
				});
				flag = 1;
			} else {

			}
		});
		if (otype == $Otype.EDIT) {
			var bill_no = "'" + mstform.getItem('BillNo').getValue() + "'";
			execServer('lchtbm_djbh', {
				'bill_no': bill_no
			}, function (res) {
				if (res.status != 'success') {
					Ext.MessageBox.show({
						title: '提示',
						msg: "sql有误",
						modal: false
					});
					flag = 1;
				} else if (res.data[0].user_insconcode == mstform.getItem('user_insconcode').getValue()) {

				} else {
					//检测该浪潮合同编码是否在新中大存在
					execServer('lchtbm', {
						'user_insconcode': user_insconcode
					}, function (res) {
						if (res.status != 'success') {
							Ext.MessageBox.show({
								title: '提示',
								msg: "sql有误",
								modal: false
							});
							flag = 1;
						} else if (res.data.length == 0) { } else {
							Ext.MessageBox.show({
								title: '提示',
								msg: "该浪潮合同编码在新中大中已存在",
								modal: false
							});
							flag = 1;
						}
					});
				}
			});
		}
		if (otype == $Otype.ADD) {
			//检测该浪潮合同编码是否在新中大存在
			execServer('lchtbm', {
				'user_insconcode': user_insconcode
			}, function (res) {
				if (res.status != 'success') {
					Ext.MessageBox.show({
						title: '提示',
						msg: "sql有误",
						modal: false
					});
					flag = 1;
				} else if (res.data.length == 0) { } else {
					Ext.MessageBox.show({
						title: '提示',
						msg: "该浪潮合同编码在新中大中已存在",
						modal: false
					});
					flag = 1;
				}
			});
		}
	}
	/*查看浪潮合同编码是否存在user_insconcode 该视图中end*/

	/*判断项目信息所属项目部和部门业务单元对照字段是否有值start*/
	if (otype == $Otype.ADD) {
		var bill_no = mstform.getItem('BillNo').getValue();
		execServer('htbhss', {
			'bill_no': bill_no
		}, function (res) {
			var htbh = res.data[0].ht
			if (htbh == 1) {
				Ext.MessageBox.show({
					title: '提示',
					msg: "存在重复编码",
					modal: false
				});
				flag = 1;
				return false;
			}
		});
		execServer('xmxx_ssxmb_lcywdy', {
			'pc': pc
		}, function (res) {
			if (res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});
				flag = 1;
			} else if (res.data.length == 1) {
				console.log(res);
				if (Ext.isEmpty(res.data[0].user_pc_dept)) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同所属项目信息没有维护所属项目部",
						modal: false
					});
					flag = 1;
					return false;
				}
				if (Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同所属项目信息的所属项目部浪潮系统没有对应核算部门的助记码",
						modal: false
					});
					flag = 1;
					return false;
				}
				if (Ext.isEmpty(res.data[0].user_lcywdy)) {
					Ext.MessageBox.show({
						title: '提示',
						msg: "合同所属项目信息没有维护浪潮业务单元",
						modal: false
					});
					flag = 1;
					return false;
				}

			}
		});

	}
	/*判断项目信息所属项目部和部门业务单元对照字段是否有值end*/

	/*税率不能为0strat*/
	var rate = mstform.getItem("user_rate").getValue();
	if (rate == 0) {
		if (mstform.getItem("user_szlxpdbz").getValue() != '1') {
			Ext.MessageBox.confirm("提示", "税率是否为0", function (btnId) {
				if (btnId == "yes") {
					flag = 1
					mstform.getItem("user_szlxpdbz").setValue('1');
				} else if (btnId == "no") {
					flag = 1
					mstform.getItem("user_szlxpdbz").setValue(null);
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

}