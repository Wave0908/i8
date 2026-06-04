function trade_AllReady() {
	var mstform = Ext.getCmp('PurOrderM');
	var dgrid = Ext.getCmp('PurOrderD');
	var Toolbar = Ext.getCmp('toolbar');
	console.log('Toolbar------------->', Toolbar);
	var dstore = dgrid.store;

	//Ext.getCmp('CntPayDOutOld7').setGridReadOnly(false);

	if (otype == 'add' || otype == 'edit') {
		var user_xsht = mstform.getItem('user_xsht');
		user_xsht.on('helpselected', function (eOp, ignoreBeforeEvent) {
			var PhidPc = mstform.getItem('PhidPc').getValue();
			if (!PhidPc) {
				Ext.Msg.alert('提示', '请先选择工程项目!');
				mstform.getItem('user_xsht').setValue();
				return false;
			}
		});

		mstform.getItem('PhidPc').on('helpselected', function (obj) {
			if (mstform.getItem('PhidPc').getValue()) {
				var user_xsht = mstform.getItem('user_xsht');
				var PhidPc = mstform.getItem('PhidPc').getValue();
				user_xsht.setOutFilter({
					phid_pc: PhidPc
				})
				user_xsht.setOutFilter({
					phid_pc: PhidPc
				})
			}
		});

		mstform.getItem('user_cght').on('helpselected', function (obj) {
			var user_cght = mstform.getItem('user_cght').getValue();
			if (dstore.getCount() > 0) {
				// 获取采购合同金额
				execServer('hqcghtje', { 'phid': user_cght }, function (res) {
					console.log('res------------->', res);
					console.log('res.count------------->', res.count);
					if (res.count > 0) {
						for (i = 0; i < dstore.getCount(); i++) {
							for (j = 0; j < res.count; j++) {
								if (dstore.getAt(i).get('PhidItemid') == res.data[j].phid_item) {
									dstore.getAt(i).set('user_cghsdj', res.data[j].prc_vat_fc);
									dstore.getAt(i).set('user_cghsje', res.data[j].amt_vat);
									dstore.getAt(i).set('user_cghtsl', res.data[j].user_cghtsl);
								}
							}
						}
					}
				});

				// 获取采购合同供应商
				execServer('hqcghtgys', { 'phid': user_cght }, function (res) {
					if (res.count > 0) {
						var gys = res.data[0].phid_vendor_bridgeid
						mstform.getItem('PhidVendorBridgeid').setValue(gys);
						BatchBindCombox([mstform.getItem('PhidVendorBridgeid')]);
					}
				});
			} else {
				Ext.Msg.alert('提示', '请先引用表体数据，再选择采购合同!');
				mstform.getItem('user_cght').setValue();
				return false;
			}
		});

		// 自动汇总剩余量函数
		var autoChange = function () {
			Ext.Array.each(dstore.data.items, function (record) {
				var sum = 0;
				console.log("record------------->", record);
				var ddsl = Ext.Number.from(record.data.user_ddsl, 0);
				var cghsdj = Ext.Number.from(record.data.user_cghsdj, 0);
				sum = ddsl * cghsdj;
				console.log("总额:", sum);
				record.set('user_cghsje', sum);
			});

		};

		// 监听 update: 任何字段被修改（无论是用户手动编辑，还是代码 record.set()）都会触发
		dstore.on('update', autoChange);
		// 监听 datachanged: 任何行的增加、删除、重新加载都会触发
		dstore.on('datachanged', autoChange);
	}

	if (otype == 'view') {
		dgrid.setGridReadOnly(false);
		dgrid.setReadOnlyCol('user_hwzt', true);

		Toolbar.insert(1, {
			itemId: "bcbg",
			text: "保存变更",
			width: this.itemWidth,
			iconCls: "icon-New"
		});

		Toolbar.items.get('bcbg').on('click', function () {
			// 保存变更货物状态
			if (dstore.getCount() > 0) {
				// 获取采购合同金额
				for (i = 0; i < dstore.getCount(); i++) {
					var hwzt = dstore.getAt(i).get('user_hwzt')
					var dphid = dstore.getAt(i).data.PhId;
					execServer('savebghwzt', { 'phid': dphid, 'hwzt': hwzt }, function (res) {

					});
				}
			}
		});

		// 获取当前用户角色
		var userid = $appinfo.userID;
		execServer('hqyhjs', { 'phid': userid }, function (res) {
			if (res.count > 0) {
				var role = res.data[0].roleno;
				if (role == 'jfjs') { // 黄色甲方角色不能看
					mstform.getItem('user_cght').setVisible(true);
					dgrid.hideColumn('user_cghtsl', true);
					dgrid.hideColumn('user_ddsl', true);
					dgrid.hideColumn('user_sjdhsl', true);
					dgrid.hideColumn('user_cghsdj', true);
					dgrid.hideColumn('user_cghsje', true);
				} else if (role == 'gysjs') { // 绿色供应商角色不能看
					mstform.getItem('user_xsht').setVisible(true);
					mstform.getItem('user_khmc').setVisible(true);
					dgrid.hideColumn('user_xshtsl', true);
					dgrid.hideColumn('Qty', true);
					dgrid.hideColumn('TaxprcFc', true);
					dgrid.hideColumn('TaxamtFc', true);
				}
			}
		});
	}

}