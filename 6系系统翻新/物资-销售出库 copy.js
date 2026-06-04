function AllReady() {
	//获取销售出库出库的id标识
	var mstform = Ext.getCmp('KC_OUTXXCK_Head');
	var Toolbar = CommButtonView.toolbar;

	Toolbar.insert(18, {
		itemId: "TS",
		text: "推送浪潮",
		width: this.itemWidth,
		iconCls: "iconfont iconcreate",
		handler: function() {
			var mstformlist = Ext.getCmp('KcBillheadList');
			//log

			var data = mstformlist.getSelectionModel().getSelection();
			if (Ext.isEmpty(data[0].data.ChkFlg) || data[0].data.ChkFlg == '0') {
				Ext.Msg.alert('提示', '当前单据未审核，审核后重新推送');
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
				url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/WZFLD/Insert",
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
	var Toolbar = Ext.getCmp('toolbar');
	var dgrid = Ext.getCmp('KC_OUTXXCK_Body');
	var tabPanel = Ext.getCmp('tabPanel');
	if (Ext.isEmpty(dgrid)) {
		return false;
	}
	var dstore = dgrid.store;
	if (otype == $Otype.ADD) {
		mstform.getItem('Tempflg').setValue(3)

	}



	Toolbar.insert(1, {
		itemId: "copy",
		text: "复制",
		width: this.itemWidth,
		iconCls: "icon-New"
	});

	Toolbar.items.get('copy').on('click', function() {
		//获取表体数据
		var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
		//费用项目字段
		var fyxm = a[0].get('user_fyxm');
		var fyxmname = a[0].get('user_fyxm_name');
		//使用部位字段
		//var sybw = a[0].get('user_sybw');
		//var sybwname = a[0].get('user_sybw_name');
		//材料类别字段
		var cllb = a[0].get('user_cllb');
		var cllbname = a[0].get('user_cllb_name');
		//专业工程字段
		var user_zygc = a[0].get('user_zygc');
		var user_zygcname = a[0].get('user_zygc_name');
		//所属板块字段
		var user_ssbk = a[0].get('user_ssbk');
		var user_ssbkname = a[0].get('user_ssbk_name');
		for (var i = 1; i < a.length; i++) {
			a[i].set('user_fyxm', fyxm);
			a[i].set('user_fyxm_name', fyxmname);
			//a[i].set('user_sybw', sybw);
			//a[i].set('user_sybw_name', sybwname);
			a[i].set('user_cllb', cllb);
			a[i].set('user_cllb_name', cllbname);
			a[i].set('user_zygc', user_zygc);
			a[i].set('user_zygc_name', user_zygcname);
			a[i].set('user_ssbk', user_ssbk);
			a[i].set('user_ssbk_name', user_ssbkname);
		}
	});
	dgrid.setReadOnlyCol('Tax', false);
	if (mstform != '' || mstform != 'undefined') {
		mstform.getItem('user_fjzs').setValue(1);
	}

	/*根据tab页添加往来明细表start*/

	/*这一整段是调差，增加TAB，其他代码在此段之外去写start*/
	//定义model
	var model = Ext.define('pcm3_cnt_xhck_d', {
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
				name: 'htmc',
				type: 'double',
				mapping: 'htmc'
			},
			{
				name: 'htmc_name',
				type: 'string',
				mapping: 'htmc_name'
			},
			{
				name: 'wldw',
				type: 'double',
				mapping: 'wldw'
			},
			{
				name: 'wldw_name',
				type: 'string',
				mapping: 'wldw_name'
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
				name: 'amt',
				type: 'double',
				mapping: 'amt'
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

		execServer('pcm3_cnt_xhck_d', {
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

	//插入往来明细表
	var grid = Ext.create('Ext.ng.GridPanel', {
		title: '往来明细',
		id: 'pcm3_cnt_xhck_d',
		region: 'south',
		stateful: false,
		isInit: true,
		features: [{
			ftype: 'summary'
		}],
		stateId: 'pcm3_cnt_xhck_d', //所有单据不允许重复
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
				header: Lang.pcm3_cnt_xhck_d_phid || '主键',
				dataIndex: 'phid',
				itemId: 'phid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_xhck_d_mstphid || '主表主键',
				dataIndex: 'mstphid',
				itemId: 'mstphid',
				width: 100,
				sortable: true,
				hidden: true
			},
			{
				header: Lang.pcm3_cnt_xhck_d_htmc || '合同名称',
				dataIndex: 'htmc_name',
				itemId: 'htmc',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'title',
					listFields: 'phid,bill_no,title',
					listHeadTexts: '代码,编码,名称',
					helpid: 'xhck_htmc',
					needBlankLine: true,
					isInGrid: true,
					ORMMode: false,
					emptyText: '',
					mustInput: false,
					listeners: {
						helpselected: function(obj) {
							var data = grid.getSelectionModel().getSelection();
							var oriValue = data[0].get('htmc');
							var rec = obj.data;
							if (rec.constructor == Array) {
								rec = obj.data[0].data;
							}
							data[0].set('htmc', rec.phid);
							data[0].set('htmc_name', rec.title);
						}
					}
				}
			},
			{
				header: Lang.pcm3_cnt_xhck_d_wldw || '往来单位',
				dataIndex: 'wldw_name',
				itemId: 'wldw',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'compname',
					listFields: 'phid,compno,compname',
					listHeadTexts: '代码,编码,名称',
					helpid: 'xhck_wldw',
					needBlankLine: true,
					isInGrid: true,
					ORMMode: false,
					emptyText: '',
					mustInput: false,
					listeners: {
						helpselected: function(obj) {
							var data = grid.getSelectionModel().getSelection();
							var oriValue = data[0].get('wldw');
							var rec = obj.data;
							if (rec.constructor == Array) {
								rec = obj.data[0].data;
							}
							data[0].set('wldw', rec.phid);
							data[0].set('wldw_name', rec.compname);
						}
					}
				}
			},
			{
				header: Lang.pcm3_cnt_xhck_d_kxxz || '款项性质',
				dataIndex: 'kxxz_name',
				itemId: 'kxxz',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'gs_nm',
					displayField: 'gs_mc',
					listFields: 'gs_nm,gs_mc',
					listHeadTexts: '代码,名称',
					helpid: 'xhck_kxxz',
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
							data[0].set('kxxz', rec.gs_nm);
							data[0].set('kxxz_name', rec.gs_mc);
						}
					}
				}
			},
			{
				header: Lang.pcm3_cnt_xhck_d_cgje || '金额',
				dataIndex: 'amt',
				itemId: 'amt',
				width: 100,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},
			{
				header: Lang.pcm3_cnt_xhck_d_remark || '备注',
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

	var dgrid1 = Ext.getCmp('pcm3_cnt_xhck_d');
	var dstore1 = dgrid1.store;
	if (otype == $Otype.VIEW) {
		grid.queryById('addrow').hide();
		grid.queryById('delrow').hide();
	}
	grid.queryById('addrow').on('click', function() {
		store.insert(store.getCount(), [{}]); //插入空直接写{}即可
	});

	grid.queryById('delrow').on('click', function() {
		var data = grid.getSelectionModel().getSelection();
		Ext.Array.each(data, function(record) {
			store.remove(record);
		});
	});

	/*这一整段是调差，增加TAB，其他代码在此段之外去写end*/

	/*根据tab页添加往来明细表end*/

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
	lckcmx();
	
	/*管理组织选择后清空所属项目部start*/
	mstform.getItem('PhidTrProj').addListener('helpselected', function() {
		var PhidTrProj = mstform.getItem('PhidTrProj').getValue()
		execServer('xmxxdcglzssmb', {
			'phid': PhidTrProj
		}, function(res) {
			if(res.data[0]) {
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
			if(res.data[0]) {
				mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
			} else {
				Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
				return false;
			}
		});
			
		execServer('ssxmb_zjm', {
			'dept': user_lcglmb
		}, function(res) {
			if(res.data[0]) {
				mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0].user_mnemCodeInAccDepart);
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
			if(res.data[0]) {
				mstform.getItem('user_lcywdy').setValue(res.data[0].user_lcywdy);
			} else {
				Ext.Msg.alert('提示', '请先维护部门业务单元对照表');
				return false;
			}
		});
	
		execServer('ssxmb_zjm', {
			'dept': user_lcglmb
		}, function(res) {
			if(res.data[0]) {
				mstform.getItem('user_mnemcodeinaccdepart').setValue(res.data[0].user_mnemCodeInAccDepart);
			} else {
				Ext.Msg.alert('提示', '浪潮核算部门的助记码没有和新中大部门编码保持一致');
				return false;
			}
		});
	
	});
	
	/*项目所属部选择后带出浪潮业务单元end*/
}

function beforeSaveEdit() {
	/*判断是否有必输项没有输入start*/
	return Ext.getCmp('pcm3_cnt_xhck_d').isValid();
	/*判断是否有必输项没有输入end*/
}

function getExtendData() {
	//后端自动生成phid
	var grid = Ext.getCmp('pcm3_cnt_xhck_d');
	var store = grid.store;
	var extendObj = {
		tablename: 'pcm3_cnt_xhck_d',
		data: grid.getChange(false)
	};
	return {
		'pcm3_cnt_xhck_d': JSON.stringify(extendObj)
	};
}



//浪潮库存明细
function lckcmx() {
	var tabPanel = Ext.getCmp('tabPanel');

	var model = Ext.define('pcm3_cnt_wlmx_d2', {
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
				name: 'fyxm',
				type: 'double',
				mapping: 'fyxm'
			},
			{
				name: 'fyxm_name',
				type: 'double',
				mapping: 'fyxm_name'
			}, {
				name: 'xm',
				type: 'double',
				mapping: 'xm'
			},
			{
				name: 'xm_name',
				type: 'string',
				mapping: 'xm_name'
			}, {
				name: 'zygc',
				type: 'double',
				mapping: 'zygc'
			}, {
				name: 'zygc_name',
				type: 'string',
				mapping: 'zygc_name'
			}, {
				name: 'ssbk',
				type: 'double',
				mapping: 'ssbk'
			},
			{
				name: 'ssbk_name',
				type: 'string',
				mapping: 'ssbk_name'
			},
			{
				name: 'bm',
				type: 'string',
				mapping: 'bm'
			},
			{
				name: 'ckje',
				type: 'double',
				mapping: 'ckje'
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
		execServer('pcm3_cnt_wlmx_d2', {
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
		id: 'pcm3_cnt_wlmx_d2',
		region: 'south',
		stateful: false,
		isInit: true,
		features: [{
			ftype: 'summary'
		}],
		stateId: 'pcm3_cnt_wlmx_d2', //所有单据不允许重复
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
				execServer('pcm3_cnt_wlmx_d2', {
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
				header: Lang.pcm3_cnt_wlmx_d2_phid || '主键',
				dataIndex: 'phid',
				itemId: 'phid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_wlmx_d2_mstphid || '主表主键',
				dataIndex: 'mstphid',
				itemId: 'mstphid',
				width: 100,
				sortable: true,
				hidden: true
			}, {
				header: Lang.pcm3_cnt_wlmx_d2_cllb || '材料类别',
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
			}, {
				header: Lang.pcm3_cnt_wlmx_d2_fyxm || '费用项目',
				dataIndex: 'fyxm_name',
				itemId: 'fyxm',
				width: 200,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'gs_mc',
					helpid: 'gs_wzfld_fyxm',
					ORMMode: false,
					listeners: {}
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d2_xm || '项目',
				dataIndex: 'xm_name',
				itemId: 'xm',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'project_name',
					helpid: 'Ecc_project_table',
					ORMMode: false,
					listeners: {}
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d2_zygc || '专业工程',
				dataIndex: 'zygc_name',
				itemId: 'zygc',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'gs_mc',
					helpid: 'gszygc',
					ORMMode: false,
					listeners: {}
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d2_ssbk || '所属板块',
				dataIndex: 'ssbk_name',
				itemId: 'ssbk',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngRichHelp',
					valueField: 'phid',
					displayField: 'gs_mc',
					helpid: 'gsbk',
					ORMMode: false,
					listeners: {}
				}
			}, {
				header: Lang.pcm3_cnt_wlmx_d2_bm || '部门',
				dataIndex: 'bm',
				itemId: 'bm',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngText',
					allowBlank: true
				}
			}, {
				header: Lang.pcm3_cnt_wlmx_d2_ckje || '出库金额',
				dataIndex: 'ckje',
				itemId: 'ckje',
				width: 120,
				sortable: true,
				editor: {
					xtype: 'ngNumber',
					allowBlank: true
				}
			},
			{
				header: Lang.pcm3_cnt_wlmx_d2_remark || '备注',
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