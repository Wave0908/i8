//以下代码不要写在任何函数中

Ext.Ajax.on('requestcomplete', function(self, response, options) {

	if ('/PMS/PMM/KcBill/WriteDownSave' !== options.url) return;

	let resp = Ext.JSON.decode(response.responseText);

	if (resp.Status !== 'success' || !Array.isArray(resp.KeyCodes) || resp.KeyCodes.length === 0) return;

	let ids = resp.KeyCodes; //冲减生成的所与单据的主键集合

	console.log(ids);

	//执行功能扩展
execServer('kcwritedown', {
			'ids': ids.join(',')
		}, function(res) {
  console.log(res);
		});
});
function AllReady() {
	var mstform = Ext.getCmp('KC_INKCGRK_Head');
	var Toolbar = CommButtonView.toolbar;
	

	if (!Ext.isEmpty(Toolbar)) {
		Toolbar.insert(18, {
			itemId: "TS",
			text: "推送浪潮",
			width: this.itemWidth,
			iconCls: "iconfont iconcreate",
			handler: function() {
				var mstformlist = Ext.getCmp('KcBillheadList');
				var data = mstformlist.getSelectionModel().getSelection();
				if (Ext.isEmpty(data[0].data.ChkFlg) || data[0].data.ChkFlg == '0') {
					Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
					return false;
				}
				if (data[0].data.Tempflg == '3') {
					Ext.Msg.alert('提示', '采购入库只推送结存暂估，和暂估冲减单，不推送实价单');
					return false;
				}
				//if(!Ext.isEmpty(data[0].data.user_istbinspur) || data[0].data.user_istbinspur == '1') {
				//	Ext.Msg.alert('提示', '当前单据已推送浪潮系统，请在浪潮系统中删除后,在重新推送');
				//	return false;
				//	}

				var loadMarsk = new Ext.LoadMask(document.body, {
					msg: '正在调用接口...',
					removeMask: true
				});

				Ext.Ajax.request({
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json;charset=UTF-8',
					jsonData: {
						"phid": data[0].data.PhId
					},
					url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/WZDYD/Insert",
					async: false, //同步请求
					success: function(response) {
						loadMarsk.hide();
						window.wait = false;
						var resdata = JSON.parse(response.text);
						var status = resdata["status"];
						var message = resdata["message"];
						if (status == "success") {
							Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {

							});
						} else {
							Ext.MessageBox.alert(Lang.Notes || '提示', message, function() {});
						}
					},
					failure: function(response, opts) {
						loadMarsk.hide();
						window.wait = false;
						var resdata = JSON.parse(response.text);
						var status = resdata["status"];
						var message = resdata["message"];
						Ext.MessageBox.alert(Lang.Notes || '提示', message);
					}
				});
				mstformlist.store.reload();
				console.log(data);
			}
		});
	}
	
	if (!Ext.isEmpty(Toolbar)) {
		Toolbar.insert(19, {
			itemId: "WK",
			text: "推送五矿",
			width: this.itemWidth,
			iconCls: "iconfont iconcreate",
			handler: function() {
				var mstformlist = Ext.getCmp('KcBillheadList');
				var data = mstformlist.getSelectionModel().getSelection();
				if (Ext.isEmpty(data[0].data.ChkFlg) || data[0].data.ChkFlg == '0') {
					Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
					return false;
				}
				if (data[0].data.Wrioffflg == '3') {
					var loadMarsk = new Ext.LoadMask(document.body, {
						msg: '正在调用接口...',
						removeMask: true
					});
						
					Ext.Ajax.request({
						url: "http://192.168.3.72:19082/esey/gyl/pushData/cg_thd/"+data[0].data.PhId,
						method: 'GET',
						async: false, //同步请求
						success: function(response) {
							var result = Ext.decode(response.responseText);
							var message = result["message"];
							if (message == "调用成功") {
								Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {
							
								});
							} else {
								Ext.MessageBox.alert(Lang.Notes || '提示', message, function() {});
							}
							
						},
						failure: function(response){
							console.error("请求失败")
						}
						
					});
				}else{
					Ext.Ajax.request({
						url: "http://192.168.3.72:19082/esey/gyl/pushData/cg_rkd/"+data[0].data.PhId,
						method: 'GET',
						async: false, //同步请求
						success: function(response) {
							var result = Ext.decode(response.responseText);
							var message = result["message"];
							if (message == "调用成功") {
								Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {
								});
							} else {
								Ext.MessageBox.alert(Lang.Notes || '提示', message, function() {});
							}
						},
						failure: function(response){
							console.error("请求失败")
						}
						
					});
				}
				
				//if(!Ext.isEmpty(data[0].data.user_istbinspur) || data[0].data.user_istbinspur == '1') {
				//	Ext.Msg.alert('提示', '当前单据已推送浪潮系统，请在浪潮系统中删除后,在重新推送');
				//	return false;
				//	}
	
				
				
			}
		});
	}
	
	
	var dgrid = Ext.getCmp('KC_INKCGRK_Body');
	if (Ext.isEmpty(dgrid)) {
		return false;
	}
	var dstore = dgrid.store;
	//获取table页
	var tabPanel = Ext.getCmp('tabPanel');
	mstform.getItem('KCtype').setValue(0);
	mstform.getItem('KCtype').setVisible(false);

    mstform.getItem('Billno').addListener('change', function() {
    	if(Ext.getCmp('toolbar'))Ext.getCmp('toolbar').get('addrow').setVisible(false);
    })
    
    
    mstform.getItem('PhidContractno').addListener('helpselected', function() {
    	var PhidContractno = mstform.getItem('PhidContractno').getValue();
    
    	execServer('jtyght', {
    		'id': PhidContractno
    	}, function(res) {
    		if (res.data[0]) {
    			if (res.data[0].user_cghtzjxz == '3') {
    				Ext.getCmp('toolbar').get('addrow').setVisible(true);
    			} else {
    				Ext.getCmp('toolbar').get('addrow').setVisible(false);
    			}
    		} else {
    			Ext.getCmp('toolbar').get('addrow').setVisible(false);
    		}
    
    	});
    
    })
	/*根据不含税金额明细汇总给主表 和发票税额总额start*/
	if (otype == $Otype.ADD || otype == $Otype.EDIT) {
	
		// Ext.getCmp('toolbar').get('addrow').on('click',function(){
		// 	var PhidContractno  = mstform.getItem('PhidContractno').getValue();
		// 	if(!PhidContractno){
		// 		Ext.Msg.alert('提示', '请选择合同编码');
		// 		return false;
		// 	}
		// });


		mstform.getItem('user_fjzs').setValue(1);

		if (schemeid == '221019015002') {
			mstform.getItem('user_sfjchtrk').setValue('1');
		} else {
			mstform.getItem('user_sfjchtrk').setValue('2');
		}
		dstore.on('datachanged', function(dstore, eOpts) {
			setTimeout(function() {
				var arr = dgrid.getStore().getRange(0, dstore.getCount() - 1);
				var a = 0;
				var b = 0;
				for (i = 0; i < dstore.getCount(); i++) {
					var record = dstore.data.items[i];
					a += Ext.Number.from(record.get('Mony').toFixed(2), 0);
					b += Ext.Number.from(record.get('Tax').toFixed(2), 0);
				}
				mstform.getItem('user_bhsje_amt').setValue(a);
				mstform.getItem('user_fpse_amt').setValue(b);
			}, 1)
		})

		dgrid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
			if (e.originalValue == e.value) {
				return;
			} //判断原值与新值是否相同
			if (e.field == 'Mony' || e.field == 'Tax') { //监听qty、prc字段变化
				var arr = dgrid.getStore().getRange(0, dstore.getCount() - 1);
				var a = 0;
				var b = 0;
				for (i = 0; i < dstore.getCount(); i++) {
					var record = dstore.data.items[i];
					a += Ext.Number.from(record.get('Mony').toFixed(2), 0);
					b += Ext.Number.from(record.get('Tax').toFixed(2), 0);
				}
				mstform.getItem('user_bhsje_amt').setValue(a);
				mstform.getItem('user_fpse_amt').setValue(b);
			};
		});

	}
	/*根据不含税金额明细汇总给主表 和发票税额总额end*/
	if (mstform != '' || mstform != 'undefined') {
		mstform.getItem('user_fjzs').setValue(1);

	}
	/*这一整段是调差，增加TAB，其他代码在此段之外去写start*/
	//定义model
	var model = Ext.define('pcm3_cnt_wlmx_d', {
		extend: 'Ext.data.Model',
		fields: [{
				name: 'phid',
				type: 'string',
				mapping: 'phid'
			},
			{
				name: 'mstphid',
				type: 'string',
				mapping: 'mstphid'
			},
			{
				name: 'kxxz',
				type: 'double',
				mapping: 'kxxz'
			},
			{
				name: 'kxxz_name',
				type: 'string',
				mapping: 'kxxz_name'
			},
			{
				name: 'cgje',
				type: 'double',
				mapping: 'cgje'
			},
			{
				name: 'yfkhxje',
				type: 'double',
				mapping: 'yfkhxje'
			},
			{
				name: 'yfkhxhje',
				type: 'double',
				mapping: 'yfkhxhje'
			},
			{
				name: 'remark',
				type: 'string',
				mapping: 'remark'
			}
		]
	});
	//定义store
	var store = Ext.create('Ext.ng.JsonStore', {
		model: model
	});

	if (otype != $Otype.ADD) {
		//获取主表的phid
		var mstphid = busid;

		execServer('pcm3_cnt_wlmx_d', {
			'mstphid': mstphid
		}, function(res) {
			if (!Ext.isEmpty(res.data)) {
				store.loadData(res.data);
				for (i = 0; i < store.getCount(); i++) {
					store.data.items[i].phantom = false;
				}
			}

		});
	}
	/*这一整段是调差，增加TAB，其他代码在此段之外去写end*/

	/*插入往来明细表start*/
	var grid = Ext.create('Ext.ng.GridPanel', {
		title: '往来明细',
		id: 'pcm3_cnt_wlmx_d',
		region: 'south',
		stateful: false,
		isInit: true,
		features: [{
			ftype: 'summary'
		}],
		stateId: 'pcm3_cnt_wlmx_d', //所有单据不允许重复
		store: store,
		buskey: 'phid', //对应的业务表主键属性
		otype: otype,
		columnLines: true,
		tbar: [{
				xtype: 'button',
				itemId: 'addrow',
				text: '增行',
				iconCls: "icon-AddRow"
			},
			{
				xtype: 'button',
				itemId: 'delrow',
				text: '删行',
				iconCls: "icon-DeleteRow"
			}
		],
		columns: [Ext.create('Ext.grid.RowNumberer', {
				text: '序号',
				width: 45
			}), {
				header: Lang.pcm3_cnt_wlmx_d_phid || '主键',
				dataIndex: 'phid',
				itemId: 'phid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_wlmx_d_mstphid || '主表主键',
				dataIndex: 'mstphid',
				itemId: 'mstphid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_wlmx_d_kxxz || '款项性质',
				dataIndex: 'kxxz_name',
				itemId: 'kxxz',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'gs_mc',
					listFields: 'phid,gs_mc',
					listHeadTexts: '代码,名称',
					helpid: 'cgrk_kxxz',
					needBlankLine: true,
					isInGrid: true,
					ORMMode: false,
					emptyText: '',
					mustInput: false,
					listeners: {
						helpselected: function(obj) {
							var data = grid.getSelectionModel().getSelection();
							var oriValue = data[0].get('kxxz');
							var rec = obj.data;
							if (rec.constructor == Array) {
								rec = obj.data[0].data;
							}
							data[0].set('kxxz', rec.phid);
							data[0].set('kxxz_name', rec.gs_mc);
						}
					}
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d_cgje || '采购金额',
				dataIndex: 'cgje',
				itemId: 'cgje',
				width: 100,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d_yfkhxje || '预付款核销金额',
				dataIndex: 'yfkhxje',
				itemId: 'yfkhxje',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d_yfkhxhje || '预付款核销后金额',
				dataIndex: 'yfkhxhje',
				itemId: 'yfkhxhje',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},

			{
				header: Lang.pcm3_cnt_wlmx_d_remark || '备注',
				dataIndex: 'remark',
				itemId: 'remark',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngText',
					allowBlank: true
				}
			}
		],
		plugins: [
			Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 1
			})
		]
	});
	//根据tab页添加grid
	tabPanel.add(grid);

	var dgrid1 = Ext.getCmp('pcm3_cnt_wlmx_d');
	var dstore1 = dgrid1.store;
	if (otype == $Otype.VIEW) {
		grid.queryById('addrow').hide();
		grid.queryById('delrow').hide();
	}
	grid.queryById('addrow').on('click', function() {
		store.insert(store.getCount(), [[,,,,0,0,0,]]); //插入空直接写{}即可
	});

	grid.queryById('delrow').on('click', function() {
		var data = grid.getSelectionModel().getSelection();
		Ext.Array.each(data, function(record) {
			store.remove(record);
		});
	});

	/*插入往来明细表end*/

	//单据编号设置为只读
	mstform.getItem('user_djbh').userSetReadOnly(true);
	//单据编号设置为必输
	mstform.getItem('user_djbh').userSetMustInput(true);
	if (dgrid) {} else {
		var dgrid = Ext.getCmp('KC_INKCGRK_Body');
	}
	var dstore = dgrid.store;

	/*采购入库 价格类型为实价 发票号必填 价格类型为暂估，发票类型非必填start*/
	if (mstform.getItem('Tempflg').getValue() == '3') {
		mstform.getItem('Invoiceno').userSetMustInput(true);
		mstform.getItem('user_bhsje_amt').userSetMustInput(true);
		mstform.getItem('user_fpse_amt').userSetMustInput(true);
	} else {
		mstform.getItem('Invoiceno').userSetMustInput(false);
		mstform.getItem('user_bhsje_amt').userSetMustInput(false);
		mstform.getItem('user_fpse_amt').userSetMustInput(false);
	}
	mstform.getItem('Tempflg').addListener('helpselected', function() {
		if (mstform.getItem('Tempflg').getValue() == '3') {
			mstform.getItem('Invoiceno').userSetMustInput(true);
			mstform.getItem('user_bhsje_amt').userSetMustInput(true);
			mstform.getItem('user_fpse_amt').userSetMustInput(true);
		} else {
			mstform.getItem('Invoiceno').userSetMustInput(false);
			mstform.getItem('user_bhsje_amt').userSetMustInput(false);
			mstform.getItem('user_fpse_amt').userSetMustInput(false);
		}
	});

	/*采购入库 价格类型为实价 发票号必填 价格类型为暂估，发票类型非必填end*/

	/* 	dgrid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
			if (e.originalValue == e.value) {
				return;
			} //判断原值与新值是否相同
			if (e.field == 'Qty') {
				var ht = mstform.getItem('PhidContractno').getValue();
				var record = e.record;
				var a = 0;
				var b = 0;
				var c = 0;
				Ext.Array.each(dstore.data.items, function(record) {
					a += Ext.Number.from(record.get('TaxMony'), 0)
				});
				execServer('Wz_cgrkkk', {
					'A': ht
				}, function(res) {
					if (res.data[0]) {
						b = res.data[0].amt_count; //累计入库价

					} else {
						b = 0; //累计入库价

					}
				});
				execServer('Wz_cgrkk', {
					'A': ht
				}, function(res) {
					c = res.data[0].cnt_sum_vat
				});
				var flag = c * 1.1 - b;
				flag = Ext.Number.from(flag, 0);
				var d = Ext.Number.from(b, 0) + Ext.Number.from(a, 0);
				var abc = c * 1.1;

				if (d > abc) {

					Ext.Msg.alert('超出警告！', '当前合同还可录入价税合计总计：' + flag + '元')

					record.set('Qty', 0); //计算amt值           
				}

			};
		}); */

	//菜单栏增加复制功能
	var Toolbar = Ext.getCmp('toolbar');
	if (!Ext.isEmpty(Toolbar)) {

		Toolbar.insert(1, {
			itemId: "copy",
			text: "复制",
			width: this.itemWidth,
			iconCls: "icon-New"
		});

		Toolbar.items.get('copy').on('click', function() {

			//获取表体数据
			var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
			var dzyhp = a[0].get('user_dzyhp');
			var user_cllb = a[0].get('user_cllb');
			var user_cllb_name = a[0].get('user_cllb_name');
			var sfzp = a[0].get('user_sfzp');
			var wg = a[0].get('user_wgzljy');
			var mp = a[0].get('user_mpjy');
			var zz = a[0].get('user_zljymc');
			var ys = a[0].get('user_zljyys');
			var cfdd = a[0].get('user_cfdd');

			for (var i = 1; i < a.length; i++) {
				a[i].set('user_wgzljy', wg);
				a[i].set('user_mpjy', mp);
				a[i].set('user_zljymc', zz);
				a[i].set('user_zljyys', ys);
				a[i].set('user_dzyhp', dzyhp);
				a[i].set('user_sfzp', sfzp);
				a[i].set('user_cfdd', cfdd);
				a[i].set('user_cllb', user_cllb);
				a[i].set('user_cllb_name', user_cllb_name);
			}
		});
	}
	/*存放地点根据是否低值易耗品为是的存放地点必输 不是 不必输start*/
	dstore.addListener('add', function(store, records, index, eOpts) {

		var a = dgrid.getStore().getRange(0, dstore.getCount() - 1); //获取表体的数据		
		var dzyhp = a[0].get('user_dzyhp');
		if (dzyhp == '1') {
			//存放地点设置为必输
			dgrid.setMustInputCol('user_cfdd', true);
		} else if (dzyhp == '2') {
			//存放地点设置为非必输
			dgrid.setMustInputCol('user_cfdd', false);
		}

	});

	/*存放地点根据是否低值易耗品为是的存放地点必输 不是 不必输end*/

	/*采购入库单据编码根据项目名称自动生成start*/

	mstform.getItem('Billno').addListener('change', function() {
		var bill_no = mstform.getItem('Billno').getValue();
		var newbill_no = bill_no.substr(-12);
		mstform.getItem('user_djbh').setValue(newbill_no);
	});


	/*采购入库单据编码根据项目名称自动生成end*/

	/*入库类型字段选择前触发隐藏甲供start*/
	mstform.getItem('user_rklb').addListener('beforetriggerclick', function() {
		mstform.getItem('user_rklb').setClientSqlFilter("fg_simple_data.phid <>  '224191231000034' ");
	});

	/*入库类型字段选择前触发隐藏甲供end*/

	// mstform.getItem('PhidTrProj').addListener('helpselected', function(obj) {
	// 	var pc = mstform.getItem('PhidTrProj').getValue()
	// 	mstform.getItem('user_lcywdy').setValue(null);
	// 	mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
	// 	execServer('gjxmxx_dcssxmb', {
	// 		'phid': pc
	// 	}, function(res) {
	// 		if (!Ext.isEmpty(res.data[0].user_pc_dept)) {
	// 			execServer('ssxmb_bmywdy', {
	// 				'dept': res.data[0].user_pc_dept
	// 			}, function(res) {
	// 				if (!Ext.isEmpty(res.data[0].user_lcywdy)) {
	// 					mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
	// 				} else {
	// 					Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
	// 					return false;
	// 				}
	// 			});

	// 			execServer('ssxmb_zjm', {
	// 				'dept': res.data[0].user_pc_dept
	// 			}, function(res) {
	// 				if (!Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
	// 					mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0]
	// 						.user_mnemCodeInAccDepart);
	// 				} else {
	// 					Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
	// 					return false;
	// 				}
	// 			});

	// 		} else {
	// 			Ext.Msg.alert('提示', '项目信息所属项目部不存在');
	// 			return false;
	// 		}
	// 	});

	// });


	/*管理组织选择后清空所属项目部start*/
	mstform.getItem('PhidTrProj').addListener('helpselected', function() {
		var PhidTrProj = mstform.getItem('PhidTrProj').getValue()
		execServer('xmxxdcglzssmb', {
			'phid': PhidTrProj
		}, function(res) {
			if (res.data[0]) {
				mstform.getItem('user_lcglzz').setValue(res.data[0].user_lcglzz);
				mstform.getItem('user_lcglmb').setValue(res.data[0].user_lcssxmb);
				BatchBindCombox([mstform.getItem('user_lcglzz')]);
				BatchBindCombox([mstform.getItem('user_lcglmb')]);
			} else {
				Ext.Msg.alert('提示', '项目信息没有管理组织和所属项目部');
				return false;
			}
		});

		var user_lcglmb = mstform.getItem('user_lcglmb').getValue();

		execServer('ssxmb_bmywdy', {
			'dept': user_lcglmb
		}, function(res) {
			if (res.data[0]) {
				mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
			} else {
				Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
				return false;
			}
		});

		execServer('ssxmb_zjm', {
			'dept': user_lcglmb
		}, function(res) {
			if (res.data[0]) {
				mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0]
					.user_mnemCodeInAccDepart);
			} else {
				Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
				return false;
			}
		});
	});
	/*管理组织选择后清空所属项目部end*/

	/*管理组织选择后清空所属项目部start*/
	mstform.getItem('user_lcglzz').addListener('helpselected', function() {
		mstform.getItem('user_lcglmb').setValue();
		mstform.getItem('user_lcywdy').setValue();
		mstform.getItem('user_mnemcodeinaccdepart').setValue();
	});
	/*管理组织选择后清空所属项目部end*/

	mstform.getItem('user_lcglmb').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
		var zz = mstform.getItem('user_lcglzz').getValue();
		mstform.getItem('user_lcglmb').setOutFilter({
			parent_orgid: zz
		}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
	});

	/*项目所属部选择后带出浪潮业务单元start*/
	mstform.getItem('user_lcglmb').addListener('helpselected', function() {
		var user_lcglmb = mstform.getItem('user_lcglmb').getValue();

		execServer('ssxmb_bmywdy', {
			'dept': user_lcglmb
		}, function(res) {
			if (res.data[0]) {
				mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
			} else {
				Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
				return false;
			}
		});

		execServer('ssxmb_zjm', {
			'dept': user_lcglmb
		}, function(res) {
			if (res.data[0]) {
				mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0]
					.user_mnemCodeInAccDepart);
			} else {
				Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
				return false;
			}
		});

	});

	/*项目所属部选择后带出浪潮业务单元end*/



	var pc = mstform.getItem('PhidTrProj').getValue()
	if (!Ext.isEmpty(pc)) {
		mstform.getItem('user_lcywdy').setValue(null);
		mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
		execServer('gjxmxx_dcssxmb', {
			'phid': pc
		}, function(res) {
			if (!Ext.isEmpty(res.data[0].user_pc_dept)) {
				execServer('ssxmb_bmywdy', {
					'dept': res.data[0].user_pc_dept
				}, function(res) {
					if (!Ext.isEmpty(res.data[0].user_lcywdy)) {
						mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
					} else {
						Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
						return false;
					}
				});

				execServer('ssxmb_zjm', {
					'dept': res.data[0].user_pc_dept
				}, function(res) {
					if (!Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
						mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0]
							.user_mnemCodeInAccDepart);
					} else {
						Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
						return false;
					}
				});

			} else {
				Ext.Msg.alert('提示', '项目信息所属项目部不存在');
				return false;
			}
		});
	}

	mstform.getItem('user_wllb').addListener('helpselected', function() { //帮助窗口打开前事件
		dstore.removeAll(); //清除单据体内所有数据

	});

	mstform.getItem('user_ywlx').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
		mstform.getItem('user_ywlx').setClientSqlFilter(" zd='业务类型' and djmc='物资点验单' ");

	});

	dgrid.getColumn('user_cllb_name').getEditor().addListener('beforetriggerclick', function() {
		dgrid.getColumn('user_cllb_name').getEditor().setClientSqlFilter(
			" u_nm  in ( select YWLBCLLBSET_CLID from cllbdzb where BZZXYWLB_LBMC='采购入库' group by YWLBCLLBSET_CLID ) "
		);
	});

	lckcmx();

	function AllReady() {
		var mstform = Ext.getCmp('KC_INKCGRK_Head');
		console.log(Ext.getCmp('kcbillpanel'))



		var Toolbar = CommButtonView.toolbar;
		if (!Ext.isEmpty(Toolbar)) {
			Toolbar.insert(18, {
				itemId: "TS",
				text: "推送浪潮",
				width: this.itemWidth,
				iconCls: "iconfont iconcreate",
				handler: function() {
					var mstformlist = Ext.getCmp('KcBillheadList');
					//
					var data = mstformlist.getSelectionModel().getSelection();
					if (Ext.isEmpty(data[0].data.ChkFlg) || data[0].data.ChkFlg == '0') {
						Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
						return false;
					}
					if (data[0].data.Tempflg == '3') {
						Ext.Msg.alert('提示', '采购入库只推送结存暂估，和暂估冲减单，不推送实价单');
						return false;
					}
					//if(!Ext.isEmpty(data[0].data.user_istbinspur) || data[0].data.user_istbinspur == '1') {
					//	Ext.Msg.alert('提示', '当前单据已推送浪潮系统，请在浪潮系统中删除后,在重新推送');
					//	return false;
					//	}

					var loadMarsk = new Ext.LoadMask(document.body, {
						msg: '正在调用接口...',
						removeMask: true
					});

					Ext.Ajax.request({
						type: 'POST',
						dataType: 'json',
						contentType: 'application/json;charset=UTF-8',
						jsonData: {
							"phid": data[0].data.PhId
						},
						url: location.protocol + "//" + location.host +
							"/MCC22ToFSSC/api/WZDYD/Insert",
						async: false, //同步请求
						success: function(response) {
							loadMarsk.hide();
							window.wait = false;
							var resdata = JSON.parse(response.text);
							var status = resdata["status"];
							var message = resdata["message"];
							if (status == "success") {
								Ext.MessageBox.alert(Lang.Notes || '提示', "推送成功.", function() {

								});
							} else {
								Ext.MessageBox.alert(Lang.Notes || '提示', message,
									function() {});
							}
						},
						failure: function(response, opts) {
							loadMarsk.hide();
							window.wait = false;
							var resdata = JSON.parse(response.text);
							var status = resdata["status"];
							var message = resdata["message"];
							Ext.MessageBox.alert(Lang.Notes || '提示', message);
						}
					});
					mstformlist.store.reload();
					console.log(data);
				}
			});
		}
		var dgrid = Ext.getCmp('KC_INKCGRK_Body');
		if (Ext.isEmpty(dgrid)) {
			return false;
		}
		var dstore = dgrid.store;
		//获取table页
		var tabPanel = Ext.getCmp('tabPanel');
		mstform.getItem('KCtype').setValue(0);
		mstform.getItem('KCtype').setVisible(false);

		/*根据不含税金额明细汇总给主表 和发票税额总额start*/
		if (otype == $Otype.ADD || otype == $Otype.EDIT) {
			mstform.getItem('user_fjzs').setValue(1);

			if (schemeid == '221019015002') {
				mstform.getItem('user_sfjchtrk').setValue('1');
			} else {
				mstform.getItem('user_sfjchtrk').setValue('2');
			}
			dstore.on('datachanged', function(dstore, eOpts) {
				setTimeout(function() {
					var arr = dgrid.getStore().getRange(0, dstore.getCount() - 1);
					var a = 0;
					var b = 0;
					for (i = 0; i < dstore.getCount(); i++) {
						var record = dstore.data.items[i];
						a += Ext.Number.from(record.get('Mony').toFixed(2), 0);
						b += Ext.Number.from(record.get('Tax').toFixed(2), 0);
					}
					mstform.getItem('user_bhsje_amt').setValue(a);
					mstform.getItem('user_fpse_amt').setValue(b);
				}, 1)
			})

			dgrid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
				if (e.originalValue == e.value) {
					return;
				} //判断原值与新值是否相同
				if (e.field == 'Mony' || e.field == 'Tax') { //监听qty、prc字段变化
					var arr = dgrid.getStore().getRange(0, dstore.getCount() - 1);
					var a = 0;
					var b = 0;
					for (i = 0; i < dstore.getCount(); i++) {
						var record = dstore.data.items[i];
						a += Ext.Number.from(record.get('Mony').toFixed(2), 0);
						b += Ext.Number.from(record.get('Tax').toFixed(2), 0);
					}
					mstform.getItem('user_bhsje_amt').setValue(a);
					mstform.getItem('user_fpse_amt').setValue(b);
				};
			});

		}
		/*根据不含税金额明细汇总给主表 和发票税额总额end*/
		if (mstform != '' || mstform != 'undefined') {
			mstform.getItem('user_fjzs').setValue(1);

		}
		/*这一整段是调差，增加TAB，其他代码在此段之外去写start*/
		//定义model
		var model = Ext.define('pcm3_cnt_wlmx_d', {
			extend: 'Ext.data.Model',
			fields: [{
					name: 'phid',
					type: 'string',
					mapping: 'phid'
				},
				{
					name: 'mstphid',
					type: 'string',
					mapping: 'mstphid'
				},
				{
					name: 'kxxz',
					type: 'double',
					mapping: 'kxxz'
				},
				{
					name: 'kxxz_name',
					type: 'string',
					mapping: 'kxxz_name'
				},
				{
					name: 'cgje',
					type: 'double',
					mapping: 'cgje'
				},
				{
					name: 'yfkhxje',
					type: 'double',
					mapping: 'yfkhxje'
				},
				{
					name: 'yfkhxhje',
					type: 'double',
					mapping: 'yfkhxhje'
				},
				{
					name: 'remark',
					type: 'string',
					mapping: 'remark'
				}
			]
		});
		//定义store
		var store = Ext.create('Ext.ng.JsonStore', {
			model: model
		});

		if (otype != $Otype.ADD) {
			//获取主表的phid
			var mstphid = busid;

			execServer('pcm3_cnt_wlmx_d', {
				'mstphid': mstphid
			}, function(res) {
				console.log(res.data);
				if (!Ext.isEmpty(res.data)) {
					store.loadData(res.data);
					for (i = 0; i < store.getCount(); i++) {
						store.data.items[i].phantom = false;
					}
				}

			});
		}
		/*这一整段是调差，增加TAB，其他代码在此段之外去写end*/

		/*插入往来明细表start*/
		var grid = Ext.create('Ext.ng.GridPanel', {
			title: '往来明细',
			id: 'pcm3_cnt_wlmx_d',
			region: 'south',
			stateful: false,
			isInit: true,
			features: [{
				ftype: 'summary'
			}],
			stateId: 'pcm3_cnt_wlmx_d', //所有单据不允许重复
			store: store,
			buskey: 'phid', //对应的业务表主键属性
			otype: otype,
			columnLines: true,
			tbar: [{
					xtype: 'button',
					itemId: 'addrow',
					text: '增行',
					iconCls: "icon-AddRow"
				},
				{
					xtype: 'button',
					itemId: 'delrow',
					text: '删行',
					iconCls: "icon-DeleteRow"
				}
			],
			columns: [Ext.create('Ext.grid.RowNumberer', {
					text: '序号',
					width: 45
				}), {
					header: Lang.pcm3_cnt_wlmx_d_phid || '主键',
					dataIndex: 'phid',
					itemId: 'phid',
					width: 100,
					sortable: true,
					hidden: true
				}, {
					header: Lang.pcm3_cnt_wlmx_d_mstphid || '主表主键',
					dataIndex: 'mstphid',
					itemId: 'mstphid',
					width: 100,
					sortable: true,
					hidden: true
				}, {
					header: Lang.pcm3_cnt_wlmx_d_kxxz || '款项性质',
					dataIndex: 'kxxz_name',
					itemId: 'kxxz',
					width: 200,
					sortable: true,
					editor: {
						xtype: 'ngRichHelp',
						valueField: 'phid',
						displayField: 'gs_mc',
						listFields: 'phid,gs_mc',
						listHeadTexts: '代码,名称',
						helpid: 'cgrk_kxxz',
						needBlankLine: true,
						isInGrid: true,
						ORMMode: false,
						emptyText: '',
						mustInput: false,
						listeners: {
							helpselected: function(obj) {
								var data = grid.getSelectionModel().getSelection();
								var oriValue = data[0].get('kxxz');
								var rec = obj.data;
								if (rec.constructor == Array) {
									rec = obj.data[0].data;
								}
								data[0].set('kxxz', rec.phid);
								data[0].set('kxxz_name', rec.gs_mc);
							}
						}
					}
				},
				{
					header: Lang.pcm3_cnt_wlmx_d_cgje || '采购金额',
					dataIndex: 'cgje',
					itemId: 'cgje',
					width: 100,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					},
					value:0
				},
				{
					header: Lang.pcm3_cnt_wlmx_d_yfkhxje || '预付款核销金额',
					dataIndex: 'yfkhxje',
					itemId: 'yfkhxje',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					},
					value:0
				},
				{
					header: Lang.pcm3_cnt_wlmx_d_yfkhxhje || '预付款核销后金额',
					dataIndex: 'yfkhxhje',
					itemId: 'yfkhxhje',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					},
					value:0
				},

				{
					header: Lang.pcm3_cnt_wlmx_d_remark || '备注',
					dataIndex: 'remark',
					itemId: 'remark',
					width: 200,
					sortable: true,
					editor: {
						xtype: 'ngText',
						allowBlank: true
					}
				}
			],
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			]
		});
		//根据tab页添加grid
		tabPanel.add(grid);

		var dgrid1 = Ext.getCmp('pcm3_cnt_wlmx_d');
		var dstore1 = dgrid1.store;
		if (otype == $Otype.VIEW) {
			grid.queryById('addrow').hide();
			grid.queryById('delrow').hide();
		}
		grid.queryById('addrow').on('click', function() {
			store.insert(store.getCount(), [[,,,,0,0,0,]]); //插入空直接写{}即可
		});

		grid.queryById('delrow').on('click', function() {
			var data = grid.getSelectionModel().getSelection();
			Ext.Array.each(data, function(record) {
				store.remove(record);
			});
		});

		/*插入往来明细表end*/

		//单据编号设置为只读
		mstform.getItem('user_djbh').userSetReadOnly(true);
		//单据编号设置为必输
		mstform.getItem('user_djbh').userSetMustInput(true);
		if (dgrid) {} else {
			var dgrid = Ext.getCmp('KC_INKCGRK_Body');
		}
		var dstore = dgrid.store;

		/*采购入库 价格类型为实价 发票号必填 价格类型为暂估，发票类型非必填start*/
		if (mstform.getItem('Tempflg').getValue() == '3') {
			mstform.getItem('Invoiceno').userSetMustInput(true);
			mstform.getItem('user_bhsje_amt').userSetMustInput(true);
			mstform.getItem('user_fpse_amt').userSetMustInput(true);
		} else {
			mstform.getItem('Invoiceno').userSetMustInput(false);
			mstform.getItem('user_bhsje_amt').userSetMustInput(false);
			mstform.getItem('user_fpse_amt').userSetMustInput(false);
		}
		mstform.getItem('Tempflg').addListener('helpselected', function() {
			if (mstform.getItem('Tempflg').getValue() == '3') {
				mstform.getItem('Invoiceno').userSetMustInput(true);
				mstform.getItem('user_bhsje_amt').userSetMustInput(true);
				mstform.getItem('user_fpse_amt').userSetMustInput(true);
			} else {
				mstform.getItem('Invoiceno').userSetMustInput(false);
				mstform.getItem('user_bhsje_amt').userSetMustInput(false);
				mstform.getItem('user_fpse_amt').userSetMustInput(false);
			}
		});

		/*采购入库 价格类型为实价 发票号必填 价格类型为暂估，发票类型非必填end*/

		dgrid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
			if (e.originalValue == e.value) {
				return;
			} //判断原值与新值是否相同
			if (e.field == 'Qty') {
				var ht = mstform.getItem('PhidContractno').getValue();
				var record = e.record;
				var a = 0;
				var b = 0;
				var c = 0;
				Ext.Array.each(dstore.data.items, function(record) {
					a += Ext.Number.from(record.get('TaxMony'), 0)
				});
				execServer('Wz_cgrkkk', {
					'A': ht
				}, function(res) {
					if (res.data[0]) {
						b = res.data[0].amt_count; //累计入库价

					} else {
						b = 0; //累计入库价

					}
				});
				execServer('Wz_cgrkk', {
					'A': ht
				}, function(res) {
					c = res.data[0].cnt_sum_vat
				});
				var flag = c * 1.1 - b;
				flag = Ext.Number.from(flag, 0);
				var d = Ext.Number.from(b, 0) + Ext.Number.from(a, 0);
				var abc = c * 1.1;

				if (d > abc) {

					Ext.Msg.alert('超出警告！', '当前合同还可录入价税合计总计：' + flag + '元')

					record.set('Qty', 0); //计算amt值           
				}

			};
		});

		//菜单栏增加复制功能
		var Toolbar = Ext.getCmp('toolbar');
		if (!Ext.isEmpty(Toolbar)) {

			Toolbar.insert(1, {
				itemId: "copy",
				text: "复制",
				width: this.itemWidth,
				iconCls: "icon-New"
			});

			Toolbar.items.get('copy').on('click', function() {

				//获取表体数据
				var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
				var dzyhp = a[0].get('user_dzyhp');
				var user_cllb = a[0].get('user_cllb');
				var user_cllb_name = a[0].get('user_cllb_name');
				var sfzp = a[0].get('user_sfzp');
				var wg = a[0].get('user_wgzljy');
				var mp = a[0].get('user_mpjy');
				var zz = a[0].get('user_zljymc');
				var ys = a[0].get('user_zljyys');
				var cfdd = a[0].get('user_cfdd');

				for (var i = 1; i < a.length; i++) {
					a[i].set('user_wgzljy', wg);
					a[i].set('user_mpjy', mp);
					a[i].set('user_zljymc', zz);
					a[i].set('user_zljyys', ys);
					a[i].set('user_dzyhp', dzyhp);
					a[i].set('user_sfzp', sfzp);
					a[i].set('user_cfdd', cfdd);
					a[i].set('user_cllb', user_cllb);
					a[i].set('user_cllb_name', user_cllb_name);
				}
			});
		}
		/*存放地点根据是否低值易耗品为是的存放地点必输 不是 不必输start*/
		dstore.addListener('add', function(store, records, index, eOpts) {

			var a = dgrid.getStore().getRange(0, dstore.getCount() - 1); //获取表体的数据		
			var dzyhp = a[0].get('user_dzyhp');
			if (dzyhp == '1') {
				//存放地点设置为必输
				dgrid.setMustInputCol('user_cfdd', true);
			} else if (dzyhp == '2') {
				//存放地点设置为非必输
				dgrid.setMustInputCol('user_cfdd', false);
			}

		});

		/*存放地点根据是否低值易耗品为是的存放地点必输 不是 不必输end*/

		/*采购入库单据编码根据项目名称自动生成start*/

		mstform.getItem('Billno').addListener('change', function() {
			var bill_no = mstform.getItem('Billno').getValue();
			var newbill_no = bill_no.substr(-12);
			mstform.getItem('user_djbh').setValue(newbill_no);
		});

		/*采购入库单据编码根据项目名称自动生成end*/

		/*入库类型字段选择前触发隐藏甲供start*/
		mstform.getItem('user_rklb').addListener('beforetriggerclick', function() {
			mstform.getItem('user_rklb').setClientSqlFilter("fg_simple_data.phid <>  '224191231000034' ");
		});

		/*入库类型字段选择前触发隐藏甲供end*/

		mstform.getItem('PhidTrProj').addListener('helpselected', function(obj) {
			var pc = mstform.getItem('PhidTrProj').getValue()
			mstform.getItem('user_lcywdy').setValue(null);
			mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
			execServer('gjxmxx_dcssxmb', {
				'phid': pc
			}, function(res) {
				if (!Ext.isEmpty(res.data[0].user_pc_dept)) {
					execServer('ssxmb_bmywdy', {
						'dept': res.data[0].user_pc_dept
					}, function(res) {
						if (!Ext.isEmpty(res.data[0].user_lcywdy)) {
							mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
						} else {
							Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
							return false;
						}
					});

					execServer('ssxmb_zjm', {
						'dept': res.data[0].user_pc_dept
					}, function(res) {
						if (!Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
							mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0]
								.user_mnemCodeInAccDepart);
						} else {
							Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
							return false;
						}
					});

				} else {
					Ext.Msg.alert('提示', '项目信息所属项目部不存在');
					return false;
				}
			});

		});

		var pc = mstform.getItem('PhidTrProj').getValue()
		if (!Ext.isEmpty(pc)) {
			mstform.getItem('user_lcywdy').setValue(null);
			mstform.getItem('user_mnemcodeinaccdepart').setValue(null);
			execServer('gjxmxx_dcssxmb', {
				'phid': pc
			}, function(res) {
				if (!Ext.isEmpty(res.data[0].user_pc_dept)) {
					execServer('ssxmb_bmywdy', {
						'dept': res.data[0].user_pc_dept
					}, function(res) {
						if (!Ext.isEmpty(res.data[0].user_lcywdy)) {
							mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
						} else {
							Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
							return false;
						}
					});

					execServer('ssxmb_zjm', {
						'dept': res.data[0].user_pc_dept
					}, function(res) {
						if (!Ext.isEmpty(res.data[0].user_mnemCodeInAccDepart)) {
							mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0]
								.user_mnemCodeInAccDepart);
						} else {
							Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
							return false;
						}
					});

				} else {
					Ext.Msg.alert('提示', '项目信息所属项目部不存在');
					return false;
				}
			});
		}


		mstform.getItem('user_ywlx').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			mstform.getItem('user_ywlx').setClientSqlFilter(" zd='业务类型' and djmc='物资点验单' ");

		});

		dgrid.getColumn('user_cllb_name').getEditor().addListener('beforetriggerclick', function() {
			dgrid.getColumn('user_cllb_name').getEditor().setClientSqlFilter(
				" u_nm  in ( select YWLBCLLBSET_CLID from cllbdzb where BZZXYWLB_LBMC='采购入库' group by YWLBCLLBSET_CLID ) "
			);
		});




		lckcmx();

	}

	function beforeSaveEdit() {
		/*判断是否有必输项没有输入start*/
		return Ext.getCmp('pcm3_cnt_wlmx_d').isValid();
		/*判断是否有必输项没有输入end*/
	}

	function getExtendData() {
		//后端自动生成phid
		var grid = Ext.getCmp('pcm3_cnt_wlmx_d');
		var store = grid.store;
		var extendObj = {
			tablename: 'pcm3_cnt_wlmx_d',
			data: grid.getChange(false)
		};
		return {
			'pcm3_cnt_wlmx_d': JSON.stringify(extendObj)
		};
	}

	//浪潮库存明细
	function lckcmx() {
		var tabPanel = Ext.getCmp('tabPanel');

		var model = Ext.define('pcm3_cnt_wlmx_d1', {
			extend: 'Ext.data.Model',
			fields: [{
					name: 'phid',
					type: 'string',
					mapping: 'phid'
				},
				{
					name: 'mstphid',
					type: 'string',
					mapping: 'mstphid'
				},
				{
					name: 'cllb',
					type: 'double',
					mapping: 'cllb'
				},
				{
					name: 'cllb_name',
					type: 'string',
					mapping: 'cllb_name'
				},
				{
					name: 'cgsl',
					type: 'double',
					mapping: 'cgsl'
				},
				{
					name: 'jldw',
					type: 'double',
					mapping: 'jldw'
				}, {
					name: 'jldw_name',
					type: 'string',
					mapping: 'jldw_name'
				},
				{
					name: 'bhsje',
					type: 'double',
					mapping: 'bhsje'
				}, {
					name: 'shuilv',
					type: 'double',
					mapping: 'shuilv'
				}, {
					name: 'se',
					type: 'double',
					mapping: 'se'
				}, {
					name: 'jshj',
					type: 'double',
					mapping: 'jshj'
				},
				{
					name: 'sfzp',
					type: 'string',
					mapping: 'sfzp'
				},
				{
					name: 'remark',
					type: 'string',
					mapping: 'remark'
				}
			]
		});
		//定义store
		var store = Ext.create('Ext.ng.JsonStore', {
			model: model
		});

		if (!Ext.isEmpty(busid)) {
			execServer('pcm3_cnt_wlmx_d1', {
				'mstphid': busid
			}, function(res) {
				if (!Ext.isEmpty(res.data)) {
					store.loadData(res.data);
					for (i = 0; i < store.getCount(); i++) {
						store.data.items[i].phantom = false;
					}
				}
			});
		}
		var grid = Ext.create('Ext.ng.GridPanel', {
			title: '浪潮库存明细',
			id: 'pcm3_cnt_lckcmx_d1',
			region: 'south',
			stateful: false,
			isInit: true,
			features: [{
				ftype: 'summary'
			}],
			stateId: 'pcm3_cnt_wlmx_d1', //所有单据不允许重复
			store: store,
			buskey: 'phid', //对应的业务表主键属性
			otype: otype,
			columnLines: true,
			tbar: [{
				xtype: 'button',
				itemId: 'addrow',
				text: '刷新',
				iconCls: "icon-AddRow",
				handler: function() {
					execServer('pcm3_cnt_wlmx_d1', {
						'mstphid': busid
					}, function(res) {
						if (!Ext.isEmpty(res.data)) {
							store.loadData(res.data);
							for (i = 0; i < store.getCount(); i++) {
								store.data.items[i].phantom = false;
							}
						}
					});
					Ext.Msg.alert("提示", "刷新完毕!")
				}
			}],
			columns: [Ext.create('Ext.grid.RowNumberer', {
					text: '序号',
					width: 45
				}), {
					header: Lang.pcm3_cnt_wlmx_d1_phid || '主键',
					dataIndex: 'phid',
					itemId: 'phid',
					width: 100,
					sortable: true,
					hidden: true
				}, {
					header: Lang.pcm3_cnt_wlmx_d1_mstphid || '主表主键',
					dataIndex: 'mstphid',
					itemId: 'mstphid',
					width: 100,
					sortable: true,
					hidden: true
				}, {
					header: Lang.pcm3_cnt_wlmx_d1_cllb || '材料类别',
					dataIndex: 'cllb_name',
					itemId: 'cllb',
					width: 200,
					sortable: true,
					editor: {
						xtype: 'ngRichHelp',
						valueField: 'phid',
						displayField: 'u_mc',
						helpid: 'gs_lcwz',
						ORMMode: false,
						listeners: {}
					}
				},
				{
					header: Lang.pcm3_cnt_wlmx_d1_cgje || '采购数量',
					dataIndex: 'cgsl',
					itemId: 'cgsl',
					width: 100,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					}
				}, {
					header: Lang.pcm3_cnt_wlmx_d1_jldw || '计量单位',
					dataIndex: 'jldw_name',
					itemId: 'jldw',
					width: 200,
					sortable: true,
					editor: {
						xtype: 'ngRichHelp',
						valueField: 'phid',
						displayField: 'msname',
						helpid: 'epm_msunit',
						ORMMode: false,
						listeners: {}
					}
				},
				{
					header: Lang.pcm3_cnt_wlmx_d1_bhsje || '不含税金额',
					dataIndex: 'bhsje',
					itemId: 'bhsje',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					}
				},
				{
					header: Lang.pcm3_cnt_wlmx_d1_shuilv || '税率',
					dataIndex: 'shuilv',
					itemId: 'shuilv',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					}
				},
				{
					header: Lang.pcm3_cnt_wlmx_d1_se || '税额',
					dataIndex: 'se',
					itemId: 'se',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					}
				}, {
					header: Lang.pcm3_cnt_wlmx_d1_jshj || '采购金额（价税合计）',
					dataIndex: 'jshj',
					itemId: 'jshj',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngNumber',
						allowBlank: true
					}
				}, {
					header: Lang.pcm3_cnt_wlmx_d1_sfzp || '是否专票',
					dataIndex: 'sfzp',
					itemId: 'sfzp',
					width: 120,
					sortable: true,
					editor: {
						xtype: 'ngComboBox',
						valueField: 'code',
						displayField: 'name',
						queryMode: 'local',
						data: [{
							code: '1',
							name: '是'
						}, {
							code: '0',
							name: '否'
						}],
						allowBlank: true
					},
					renderer: function(code) {
						var data = [{
							code: '1',
							name: '是'
						}, {
							code: '0',
							name: '否'
						}];
						Ext.each(data, function(rec) {
							if (rec['code'] == code) {
								code = rec['name'];
								return false;
							}
						});
						return code;
					}
				},
				{
					header: Lang.pcm3_cnt_wlmx_d1_remark || '备注',
					dataIndex: 'remark',
					itemId: 'remark',
					width: 200,
					sortable: true,
					editor: {
						xtype: 'ngText',
						allowBlank: true
					}
				}
			],
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			]
		});
		//根据tab页添加grid
		tabPanel.add(grid);





	}

	if(Toolbar)Toolbar.get('addrow').setVisible(true);


}

function beforeSaveEdit() {
	/*判断是否有必输项没有输入start*/
	return Ext.getCmp('pcm3_cnt_wlmx_d').isValid();
	/*判断是否有必输项没有输入end*/
}

function getExtendData() {
	//后端自动生成phid
	var grid = Ext.getCmp('pcm3_cnt_wlmx_d');
	var store = grid.store;
	var extendObj = {
		tablename: 'pcm3_cnt_wlmx_d',
		data: grid.getChange(false)
	};
	return {
		'pcm3_cnt_wlmx_d': JSON.stringify(extendObj)
	};
}

//浪潮库存明细
function lckcmx() {
	var tabPanel = Ext.getCmp('tabPanel');

	var model = Ext.define('pcm3_cnt_wlmx_d1', {
		extend: 'Ext.data.Model',
		fields: [{
				name: 'phid',
				type: 'string',
				mapping: 'phid'
			},
			{
				name: 'mstphid',
				type: 'string',
				mapping: 'mstphid'
			},
			{
				name: 'cllb',
				type: 'double',
				mapping: 'cllb'
			},
			{
				name: 'cllb_name',
				type: 'string',
				mapping: 'cllb_name'
			},
			{
				name: 'cgsl',
				type: 'double',
				mapping: 'cgsl'
			},
			{
				name: 'jldw',
				type: 'double',
				mapping: 'jldw'
			}, {
				name: 'jldw_name',
				type: 'string',
				mapping: 'jldw_name'
			},
			{
				name: 'bhsje',
				type: 'double',
				mapping: 'bhsje'
			}, {
				name: 'shuilv',
				type: 'double',
				mapping: 'shuilv'
			}, {
				name: 'se',
				type: 'double',
				mapping: 'se'
			}, {
				name: 'jshj',
				type: 'double',
				mapping: 'jshj'
			},
			{
				name: 'sfzp',
				type: 'string',
				mapping: 'sfzp'
			},
			{
				name: 'remark',
				type: 'string',
				mapping: 'remark'
			}
		]
	});
	//定义store
	var store = Ext.create('Ext.ng.JsonStore', {
		model: model
	});

	if (!Ext.isEmpty(busid)) {
		execServer('pcm3_cnt_wlmx_d1', {
			'mstphid': busid
		}, function(res) {
			if (!Ext.isEmpty(res.data)) {
				store.loadData(res.data);
				for (i = 0; i < store.getCount(); i++) {
					store.data.items[i].phantom = false;
				}
			}
		});
	}
	var grid = Ext.create('Ext.ng.GridPanel', {
		title: '浪潮库存明细',
		id: 'pcm3_cnt_lckcmx_d1',
		region: 'south',
		stateful: false,
		isInit: true,
		features: [{
			ftype: 'summary'
		}],
		stateId: 'pcm3_cnt_wlmx_d1', //所有单据不允许重复
		store: store,
		buskey: 'phid', //对应的业务表主键属性
		otype: otype,
		columnLines: true,
		tbar: [{
			xtype: 'button',
			itemId: 'addrow',
			text: '刷新',
			iconCls: "icon-AddRow",
			handler: function() {
				execServer('pcm3_cnt_wlmx_d1', {
					'mstphid': busid
				}, function(res) {
					if (!Ext.isEmpty(res.data)) {
						store.loadData(res.data);
						for (i = 0; i < store.getCount(); i++) {
							store.data.items[i].phantom = false;
						}
					}
				});
				Ext.Msg.alert("提示", "刷新完毕!")
			}
		}],
		columns: [Ext.create('Ext.grid.RowNumberer', {
				text: '序号',
				width: 45
			}), {
				header: Lang.pcm3_cnt_wlmx_d1_phid || '主键',
				dataIndex: 'phid',
				itemId: 'phid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_wlmx_d1_mstphid || '主表主键',
				dataIndex: 'mstphid',
				itemId: 'mstphid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_wlmx_d1_cllb || '材料类别',
				dataIndex: 'cllb_name',
				itemId: 'cllb',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'u_mc',
					helpid: 'gs_lcwz',
					ORMMode: false,
					listeners: {}
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d1_cgje || '采购数量',
				dataIndex: 'cgsl',
				itemId: 'cgsl',
				width: 100,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			}, {
				header: Lang.pcm3_cnt_wlmx_d1_jldw || '计量单位',
				dataIndex: 'jldw_name',
				itemId: 'jldw',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'msname',
					helpid: 'epm_msunit',
					ORMMode: false,
					listeners: {}
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d1_bhsje || '不含税金额',
				dataIndex: 'bhsje',
				itemId: 'bhsje',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d1_shuilv || '税率',
				dataIndex: 'shuilv',
				itemId: 'shuilv',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d1_se || '税额',
				dataIndex: 'se',
				itemId: 'se',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			}, {
				header: Lang.pcm3_cnt_wlmx_d1_jshj || '采购金额（价税合计）',
				dataIndex: 'jshj',
				itemId: 'jshj',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			}, {
				header: Lang.pcm3_cnt_wlmx_d1_sfzp || '是否专票',
				dataIndex: 'sfzp',
				itemId: 'sfzp',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngComboBox',
					valueField: 'code',
					displayField: 'name',
					queryMode: 'local',
					data: [{
						code: '1',
						name: '是'
					}, {
						code: '0',
						name: '否'
					}],
					allowBlank: true
				},
				renderer: function(code) {
					var data = [{
						code: '1',
						name: '是'
					}, {
						code: '0',
						name: '否'
					}];
					Ext.each(data, function(rec) {
						if (rec['code'] == code) {
							code = rec['name'];
							return false;
						}
					});
					return code;
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d1_remark || '备注',
				dataIndex: 'remark',
				itemId: 'remark',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngText',
					allowBlank: true
				}
			}
		],
		plugins: [
			Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 1
			})
		]
	});
	//根据tab页添加grid
	tabPanel.add(grid);






}

function beforeAddRowDeal(records) {
	Ext.Array.forEach(records, function(record) {
		record.TaxMony = GcNumRound(record.TaxMony, 2);
		record.Tax = GcNumRound(record.Tax, 2);
		record.Mony = record.TaxMony - record.Tax;
	});
}

