function allReadyEdit() {
	//购置过滤    
	//获取容器
	var mstform = Ext.getCmp('p_form0000000019_m');
	var dgrid = Ext.getCmp('p_form0000000019_dgrid');
	var dgrid1 = Ext.getCmp('p_form0000000019_d1grid');
	var Toolbar = Ext.getCmp('toolbar');
	var Toolbar = Ext.getCmp('toolbar');
	var dstore = dgrid.store;
	dgrid.hideColumn('htbh', true);
	dgrid.hideColumn('zt', true);
	dgrid.hideColumn('gys', true);
	mstform.getItem('checkpsn').setVisible(false);
	mstform.getItem('htbh_m').setVisible(false);
	mstform.getItem('kxxx').setVisible(false);
	mstform.getItem('gzht').setVisible(false);
	mstform.getItem('lchsbm').setVisible(false);
	Toolbar.insert(1, {
		itemId: "push",
		text: "浪潮推送",
		width: this.itemWidth,
		iconCls: "icon-New"
	});
	Toolbar.items.get('push').on('click', function() {
		Ext.Ajax.request({
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json;charset=UTF-8',
			jsonData: {
				"phid": busid
			},
			url: location.protocol + "//" + location.host + "/MCC22ToFSSC/api/Assets/RZTZDTOZCXZ",
			async: false, //同步请求
			success: function(response) {
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
				myMask.hide();
				window.wait = false;
				var resdata = JSON.parse(response.text);
				var status = resdata["status"];
				var message = resdata["message"];
				Ext.MessageBox.alert(Lang.Notes || '提示', message);
			}
		});
	});
	dgrid1.getColumn('kxxz_name').getEditor(obj).addListener('helpselected', function() {
		var data = dgrid1.getSelectionModel().getSelection(); //获取当前选中行
		var kxxz = data[0].get('kxxz');
		if (kxxz == '224210323000006') {
			dgrid1.setMustInputCol('hsry_name', true);
		} else {
			dgrid1.setMustInputCol('hsry_name', false);
		}

	});

	if (otype == $Otype.ADD || otype == $Otype.EDIT || otype === 'copy') {
		mstform.getItem('lchsbm').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			var zz = mstform.getItem('ocode').getValue();
			mstform.getItem('lchsbm').setOutFilter({
				ocode: zz
			}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
		});
		//购置合同过滤
		mstform.getItem('gzht').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			var zz = mstform.getItem('ocode').getValue();
			mstform.getItem('gzht').setOutFilter({
				phid_ocode: zz
			}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
		});
		//使用部门根据申请单位过滤
		mstform.getItem('sybm').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			var zz = mstform.getItem('ocode').getValue();
			mstform.getItem('sybm').setOutFilter({
				parent_orgid: zz
			}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
		});
		//管理部门根据申请单位过滤
		mstform.getItem('glbm').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) { //帮助窗口打开前事件
			var zz = mstform.getItem('ocode').getValue();
			mstform.getItem('glbm').setOutFilter({
				parent_orgid: zz
			}) //PC对应通用帮助中的字段 pc_no、creator进行条件过滤
		});
		mstform.getItem('zclx').addListener('change', function() {
			var type = mstform.getItem('zclx').getValue();
			if (type == '2') {
				dgrid.hideColumn('pphid', true);
				dgrid.hideColumn('htbh', true);
				dgrid.hideColumn('sblb', true);
				dgrid.hideColumn('zclb', true);
				dgrid.hideColumn('zclyfs', false);
				dgrid.hideColumn('zzqlr', false);
				dgrid.hideColumn('mqqlr', false);
				dgrid.hideColumn('sjzyr', false);
				dgrid.hideColumn('zztdsyqr', false);
				dgrid.hideColumn('jzjg', false);
				dgrid.hideColumn('jglx', false);
				dgrid.hideColumn('jzmj', false);
				dgrid.hideColumn('zdmj', false);
				dgrid.hideColumn('tdyt', false);
				dgrid.hideColumn('fczbh', false);
				dgrid.hideColumn('cg', false);
				dgrid.hideColumn('zcs', false);
				dgrid.hideColumn('fcly', false);
				dgrid.hideColumn('tdzbh', false);
				dgrid.hideColumn('bdwzdjc', false);
				dgrid.hideColumn('xxzkdz', false);
				dgrid.hideColumn('org_id1', false);
				dgrid.hideColumn('bbh', true);
				dgrid.hideColumn('sccj', true);
				dgrid.hideColumn('ccrq', true);
				dgrid.hideColumn('ccbh', true);
				dgrid.hideColumn('cph', true);
				dgrid.hideColumn('fdjbh', true);
				dgrid.hideColumn('cjbh', true);
				dgrid.hideColumn('dl', true);
				dgrid.hideColumn('zl', true);
				dgrid.hideColumn('fdjpl', true);
				dgrid.hideColumn('nl', true);
				dgrid.hideColumn('ggxh', true);
				dgrid.hideColumn('prc', false);
				dgrid.hideColumn('bhsje', false);
				dgrid.hideColumn('sl', true);
				dgrid.hideColumn('se', true);
				dgrid.hideColumn('hsje', true);
				dgrid.hideColumn('zjnxn', false);
				dgrid.hideColumn('ftnxn', true);
				dgrid.hideColumn('zjqs', false);
				dgrid.hideColumn('czl', false);
				dgrid.hideColumn('jhcz', true);
				dgrid.hideColumn('cz', false);
				dgrid.hideColumn('jz', false);
				dgrid.hideColumn('yzje', true);
				dgrid.hideColumn('yfte', true);
				dgrid.hideColumn('qty', true);
				dgrid.hideColumn('ljzj', true);
				dgrid.hideColumn('szrq', false);
				dgrid.hideColumn('syzt', false);
				dgrid.setMustInputCol('sccj', false);
			} else if (type == '3') {
				dgrid.hideColumn('pphid', true);
				dgrid.hideColumn('sblb', true);
				dgrid.hideColumn('zclb', false);
				dgrid.hideColumn('zclyfs', false);
				dgrid.hideColumn('zzqlr', false);
				dgrid.hideColumn('mqqlr', true);
				dgrid.hideColumn('sjzyr', true);
				dgrid.hideColumn('zztdsyqr', true);
				dgrid.hideColumn('jzjg', true);
				dgrid.hideColumn('jglx', true);
				dgrid.hideColumn('jzmj', true);
				dgrid.hideColumn('zdmj', true);
				dgrid.hideColumn('tdyt', true);
				dgrid.hideColumn('fczbh', true);
				dgrid.hideColumn('cg', true);
				dgrid.hideColumn('zcs', true);
				dgrid.hideColumn('fcly', true);
				dgrid.hideColumn('tdzbh', true);
				dgrid.hideColumn('bdwzdjc', true);
				dgrid.hideColumn('xxzkdz', true);
				dgrid.hideColumn('org_id1', false);
				dgrid.hideColumn('bbh', true);
				dgrid.hideColumn('sccj', false);
				dgrid.hideColumn('ccrq', true);
				dgrid.hideColumn('ccbh', true);
				dgrid.hideColumn('cph', false);
				dgrid.hideColumn('fdjbh', false);
				dgrid.hideColumn('cjbh', false);
				dgrid.hideColumn('dl', false);
				dgrid.hideColumn('zl', false);
				dgrid.hideColumn('fdjpl', false);
				dgrid.hideColumn('nl', false);
				dgrid.hideColumn('ggxh', false);
				dgrid.hideColumn('prc', false);
				dgrid.hideColumn('bhsje', false);
				dgrid.hideColumn('sl', false);
				dgrid.hideColumn('se', false);
				dgrid.hideColumn('hsje', false);
				dgrid.hideColumn('zjnxn', false);
				dgrid.hideColumn('ftnxn', true);
				dgrid.hideColumn('zjqs', false);
				dgrid.hideColumn('czl', false);
				dgrid.hideColumn('jhcz', true);
				dgrid.hideColumn('cz', false);
				dgrid.hideColumn('jz', false);
				dgrid.hideColumn('yzje', false);
				dgrid.hideColumn('yfte', true);
				dgrid.hideColumn('qty', false);
				dgrid.hideColumn('ljzj', false);
				dgrid.hideColumn('szrq', false);
				dgrid.hideColumn('qyrq', false);
				dgrid.hideColumn('syzt', false);
				dgrid.hideColumn('amt', true);
				dgrid.hideColumn('bbamt', true);
				dgrid.setMustInputCol('qyrq', false); //org_id
				dgrid.setMustInputCol('sccj', true);
			} else if (type == '4') {
				//无形资产设置默认值
				dgrid.hideColumn('pphid', true);
				dgrid.hideColumn('amt', true);
				dgrid.hideColumn('deprate', true);
				dgrid.hideColumn('zjqs', true);
				dgrid.hideColumn('sblb', true);
				dgrid.hideColumn('zclb', true);
				dgrid.hideColumn('zclyfs', true);
				dgrid.hideColumn('zzqlr', true);
				dgrid.hideColumn('mqqlr', true);
				dgrid.hideColumn('sjzyr', true);
				dgrid.hideColumn('zztdsyqr', true);
				dgrid.hideColumn('jzjg', true);
				dgrid.hideColumn('jglx', true);
				dgrid.hideColumn('jzmj', true);
				dgrid.hideColumn('zdmj', true);
				dgrid.hideColumn('tdyt', true);
				dgrid.hideColumn('fczbh', true);
				dgrid.hideColumn('cg', true);
				dgrid.hideColumn('zcs', true);
				dgrid.hideColumn('fcly', true);
				dgrid.hideColumn('tdzbh', true);
				dgrid.hideColumn('bdwzdjc', true);
				dgrid.hideColumn('xxzkdz', true);
				dgrid.hideColumn('org_id1', false);
				dgrid.hideColumn('bbh', false);
				dgrid.hideColumn('sccj', false);
				dgrid.hideColumn('ccrq', true);
				dgrid.hideColumn('ccbh', true);
				dgrid.hideColumn('cph', true);
				dgrid.hideColumn('fdjbh', true);
				dgrid.hideColumn('cjbh', true);
				dgrid.hideColumn('dl', true);
				dgrid.hideColumn('zl', true);
				dgrid.hideColumn('fdjpl', true);
				dgrid.hideColumn('nl', true);
				dgrid.hideColumn('ggxh', true);
				dgrid.hideColumn('prc', false);
				dgrid.hideColumn('bhsje', false);
				dgrid.hideColumn('sl', false);
				dgrid.hideColumn('se', false);
				dgrid.hideColumn('hsje', false);
				dgrid.hideColumn('zjnxn', true);
				dgrid.hideColumn('ftnxn', false);
				dgrid.hideColumn('czl', false);
				dgrid.hideColumn('jhcz', true);
				dgrid.hideColumn('cz', true);
				dgrid.hideColumn('jz', true);
				dgrid.hideColumn('yzje', true);
				dgrid.hideColumn('yfte', false);
				dgrid.hideColumn('qty', true);
				dgrid.hideColumn('ljzj', true);
				dgrid.hideColumn('szrq', false);
				dgrid.hideColumn('qyrq', false);
				dgrid.hideColumn('syzt', false);
				dgrid.hideColumn('bbamt', true);
				dgrid.setMustInputCol('szrq', false);
				dgrid.setMustInputCol('sccj', false);
			} else if (type == '1') {
				dgrid.hideColumn('pphid', true);
				dgrid.hideColumn('zcbm', false);
				dgrid.hideColumn('sblb', true);
				dgrid.hideColumn('zclb', true);
				dgrid.hideColumn('zclyfs', true);
				dgrid.hideColumn('zzqlr', true);
				dgrid.hideColumn('mqqlr', true);
				dgrid.hideColumn('sjzyr', true);
				dgrid.hideColumn('zztdsyqr', true);
				dgrid.hideColumn('jzjg', true);
				dgrid.hideColumn('jglx', true);
				dgrid.hideColumn('jzmj', true);
				dgrid.hideColumn('zdmj', true);
				dgrid.hideColumn('tdyt', true);
				dgrid.hideColumn('fczbh', true);
				dgrid.hideColumn('cg', true);
				dgrid.hideColumn('zcs', true);
				dgrid.hideColumn('fcly', true);
				dgrid.hideColumn('tdzbh', true);
				dgrid.hideColumn('bdwzdjc', true);
				dgrid.hideColumn('xxzkdz', true);
				dgrid.hideColumn('org_id1', true);
				dgrid.hideColumn('bbh', true);
				dgrid.hideColumn('sccj', true);
				dgrid.hideColumn('ccrq', true);
				dgrid.hideColumn('ccbh', true);
				dgrid.hideColumn('cph', true);
				dgrid.hideColumn('fdjbh', true);
				dgrid.hideColumn('cjbh', true);
				dgrid.hideColumn('dl', true);
				dgrid.hideColumn('zl', true);
				dgrid.hideColumn('fdjpl', true);
				dgrid.hideColumn('nl', true);
				dgrid.hideColumn('ggxh', false);
				dgrid.hideColumn('bhsje', false);
				dgrid.hideColumn('sl', false);
				dgrid.hideColumn('se', false);
				dgrid.hideColumn('hsje', true);
				dgrid.hideColumn('zjnxn', false);
				dgrid.hideColumn('ftnxn', true);
				dgrid.hideColumn('zjqs', true);
				dgrid.hideColumn('czl', false);
				dgrid.hideColumn('jhcz', true);
				dgrid.hideColumn('cz', false);
				dgrid.hideColumn('jz', false);
				dgrid.hideColumn('yzje', false);
				dgrid.hideColumn('yfte', false);
				dgrid.hideColumn('qty', false);
				dgrid.hideColumn('ljzj', false);
				dgrid.hideColumn('szrq', false);
				dgrid.hideColumn('syzt', false);
				dgrid.hideColumn('prc', false);
				dgrid.hideColumn('amt', true);
				dgrid.setMustInputCol('szrq', false);
				dgrid.setMustInputCol('qyrq', false);
				dgrid.setMustInputCol('sccj', false);
			}
		});

		//增加“新增”按钮
		Toolbar.insert(1, {
			itemId: "myadd",
			text: "新增",
			width: this.itemWidth,
			iconCls: "add"
		});
		//点击‘myadd’按钮触发事件，通过新增按钮打开帮助窗口
		Toolbar.get('myadd').on('click', function() {
			//判断项目信息是否选择 
			if (Ext.isEmpty(Ext.getCmp('userhelp_1').getValue())) {
				//未选择提示：请先选择项目！
				Ext.Msg.alert('提示', '请先选购置单！');
				//已选择跳出if事件
				return false;
			};
			var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
			if (Ext.isEmpty(a.length >= 1)) {
				var help = Ext.create('Ext.ng.MultiRichHelp', {
					//代码列
					valueField: 'bill_no',
					//名称列   
					displayField: 'title',
					//获取帮助ID
					helpid: '资产购置明细',
					ORMMode: false,
					//过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
					outFilter: {
						'm_code': mstform.getItem('userhelp_1').getValue()
					},
					clientSqlFilter: 'rel_key1 not in ( ' + a[0].data.rel_key1 + ' )'
				});
			} else {
				var help = Ext.create('Ext.ng.MultiRichHelp', {
					//代码列
					valueField: 'bill_no',
					//名称列   
					displayField: 'title',
					//获取帮助ID
					helpid: '资产购置明细',
					ORMMode: false,
					//过滤条件，m_code为过滤字段，userhelp_1为过滤字段的值
					outFilter: {
						'm_code': mstform.getItem('userhelp_1').getValue()
					}

				});
			}
			help.showHelp();
			help.on('helpselected', function(obj) {
				console.log(obj.data);
				var arr = new Array();
				for (i = 0; i < obj.data.length; i++) {
					//赋值给单据体字段
					arr.push({
						zcmc: obj.data[i].data.c_name,
						ggxh: obj.data[i].data.ggxh,
						msunit: obj.data[i].data.msunit,
						msunit_name: obj.data[i].data.msname,
						qty: 0,
						qty_1: 1,
						prc: obj.data[i].data.prc,
						amt: obj.data[i].data.amt,
						remarks: obj.data[i].data.remarks,
						PPhid: obj.data[i].data.phid,
						rel_key1: obj.data[i].data.rel_key1
					});
				};
				dstore.insert(dstore.getCount(), arr);
			});
		});
		mstform.getItem('sybm').addListener('helpselected', function(obj) {
			mstform.getItem('use_dept').setValue(obj.data.OCode);
		});
		mstform.getItem('glbm').addListener('helpselected', function(obj) {
			mstform.getItem('mana_dep').setValue(obj.data.OCode);
		});

		mstform.getItem('userhelp_1').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {

			var ocode = mstform.getItem('ocode').getValue();
			var zclx = mstform.getItem('zclx').getValue();
			if (Ext.isEmpty(glbm) || Ext.isEmpty(ocode) || Ext.isEmpty(zclx)) {
				Ext.Msg.alert('提示', '请先选择管理部门、申请单位、资产类型！');
				return false;
			} else {
				//表头通用帮助过滤
				mstform.getItem('userhelp_1').setOutFilter({
					ocode: ocode,
					zclx: zclx
				});
			}
		});

		//监听表体，表体更新则进行相关的操作
		//设置当表体为新增时才计算
		if (otype == $Otype.ADD|| otype == $Otype.EDIT) {
			dgrid.addListener('edit', function(editor, e) {
				//判断原值与新值是否相同
				if (e.originalValue == e.value) {
					return;
				}
				//监听qty、prc,amt字段变化
				if (e.field == 'qty_1' || e.field == 'prc' || e.field == 'sl' || e.field ==
					'zjnxn' || e.field == 'czl' || e.field == 'ljzj') {
					var record = e.record;
					//无形资产
					if (mstform.getItem('zclx').getValue() == '4') {
						record.set('deprate', 0);
						record.set('yzje', 0);
						record.set('use1', 0);
						record.set('use2', 0);
					}
					if (mstform.getItem('zclx').getValue() !== '4') {
						record.set('czl', 0.05);
					}
					record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record
						.get('qty_1'), 0));
					record.set('bbamt', Ext.Number.from(record.get('amt'), 0));
					record.set('hsje', Ext.Number.from(record.get('amt'), 0));
					var aa = Ext.Number.toFixed(Ext.Number.from(record.get('amt'), 0) / (1 + Ext.Number
						.from(record.get('sl'))), 2);
					// 不含税金额=amt原币含税金额  /1+税率
					record.set('bhsje', Ext.Number.toFixed(Ext.Number.from(record.get('amt'), 0) / (1 +
						Ext.Number.from(record.get('sl'))), 2));
					//税额= 价税合计 -不含税金额
					record.set('se', Ext.Number.from(record.get('amt'), 0) - Ext.Number.toFixed(Ext
						.Number.from(record.get('amt'), 0) / (1 + Ext.Number.from(record.get(
							'sl'))), 2))
					record.set('zjqs', Ext.Number.from(record.get('zjnxn'), 0) * 12);
					//设置发票类型为必输
					mstform.getItem('fplx').userSetMustInput(true);
					//发票类型帮助窗口选择后触发
					mstform.getItem('fplx').addListener('helpselected', function() {
						//发票类型设置为只读
						mstform.getItem('fplx').userSetReadOnly(true);
					});
					//入账通知单原值字段，计算公式需要调整。
					//发票类型为增值税专用发票，原值等于不含税金额（含税金额-税额）
					//发票类型为增值税普通发票，原值等于含税金额
					if (mstform.getItem('fplx').getValue() == '224200805000001') {
						var bhsje = Ext.Number.from(record.get('bhsje'))
						record.set('yz_amt', Ext.Number.toFixed(bhsje, 2), 0);
					} else if (mstform.getItem('fplx').getValue() == '224200805000002' || mstform
						.getItem('fplx').getValue() == '224200805000003') {
						var hsje = Ext.Number.from(record.get('hsje'))
						record.set('yz_amt', Ext.Number.toFixed(hsje, 2), 0);
					}
					var cza = Ext.util.Format.round(record.get('yz_amt') * record.get('czl'), 2)
					record.set('cz', cza);
					record.set('jz', Ext.Number.from(record.get('yz_amt'), 0) - (Ext.Number.from(record
						.get('ljzj'), 0)));
					if (record.get('zjqs') != 0) {
						record.set('deprate', (1 - Ext.Number.from(record.get('czl'), 0)) / Ext.Number
							.from(record.get('zjqs'), 0));
						record.set('yfte', Ext.Number.from(record.get('yz_amt'), 0) / Ext.Number.from(
							record.get('ftnxn'), 0));
					}
					record.set('yzje', Ext.Number.from(record.get('deprate'), 0) * Ext.Number.from(
						record.get('yz_amt'), 0));
				}
			});
			//当子表的税额和不含税金额变化时 原值就等于不含税金额+税额 start
			dgrid.addListener('edit', function(editor, e) {
				//监听单据体字段编辑状态 *edit 为编辑事件（据体更新单据体本行字段）
				if (e.originalValue == e.value) {
					return;
				} //判断原值与新值是否相同，如果相同则返回 *return 返回    
				if (e.field == 'bhsje' || e.field == 'se') { //监听bhsje、se字段变化
					var record = e.record; //当前行用对像record表示
					record.set('yz_amt', Ext.Number.from(record.get('bhsje'), 0) + Ext.Number.from(
						record.get('se'), 0)); //计算yz_amt值，将yz_amt=bhsje+se  
				}; //监听qty、prc、numericcol_2字段变化事件结束 ｝
			});
			//当子表的税额和不含税金额变化时 原值就等于不含税金额+税额 end	
		}

		//根据设备类别过滤主类别
		dgrid.getColumn('zclb_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var cc = mstform.getItem('zclx').getValue();
			//console.log(cc);
			dgrid.getColumn('zclb_name').getEditor().setOutFilter({
				'sblx': cc
			});
		})
		//根据主类别过滤辅类别
		dgrid.getColumn('zcfl_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {

			var data = dgrid.getSelectionModel().getSelection();
			var dd = data[0].get('zclb');
			var fl;
			callServer('zcfl', [{
				'A': dd
			}], function(res) {

				fl = res.record[0].c_no
			});
			dgrid.getColumn('zcfl_name').getEditor().setOutFilter({
				'c_descript': fl
			});
		})
		//一建复制功能
		var Toolbar = Ext.getCmp('toolbar');
		Toolbar.insert(5, {
			itemId: "copy",
			text: "一键复制",
			width: this.itemWidth,
			iconCls: "icon-Copy"
		});
		Toolbar.items.get('copy').on('click', function() {
			var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
			//获取设备类型
			var lb = mstform.getItem('zclx').getValue();
			var pphid = a[0].get('pphid');
			var zcmc = a[0].get('zcmc');
			var ggxh = a[0].get('ggxh');
			var zl = a[0].get('zclb');
			var zl_name = a[0].get('zclb_name');
			var fl = a[0].get('zcfl');
			var fl_name = a[0].get('zcfl_name');
			var lyfs = a[0].get('zclyfs');
			var lyfs_name = a[0].get('zclyfs_name')
			var dwmc = a[0].get('org_id1');
			var dwmc_name = a[0].get('org_id1_name');
			var dw = a[0].get('msunit');
			var dw_name = a[0].get('msunit_name');
			var qty = a[0].get('qty'); //已用月数
			var sl = a[0].get('qty_1');
			var prc = a[0].get('prc');
			var amt = a[0].get('amt');
			var bz = a[0].get('remarks');
			var yz_amt = a[0].get('yz_amt');
			var szrq = a[0].get('szrq');
			var qyrq = a[0].get('qyrq');
			var syzt = a[0].get('syzt');
			var org_id = a[0].get('org_id');
			var org_id_name = a[0].get('org_id_name');
			for (j = 1; j < a.length; j++) {
				a[j].set('pphid', pphid);
				a[j].set('zcmc', zcmc);
				a[j].set('ggxh', ggxh);
				a[j].set('zclb', zl);
				a[j].set('zclb_name', zl_name);
				a[j].set('zcfl', fl);
				a[j].set('zcfl_name', fl_name);
				a[j].set('zclyfs', lyfs);
				a[j].set('zclyfs_name', lyfs_name);
				a[j].set('org_id1', dwmc);
				a[j].set('org_id1_name', dwmc_name);
				a[j].set('msunit', dw);
				a[j].set('msunit_name', dw_name);
				a[j].set('qty', qty);
				a[j].set('qty_1', sl);
				a[j].set('prc', prc);
				a[j].set('amt', amt);
				a[j].set('yz_amt', yz_amt);
				a[j].set('remarks', bz);
				a[j].set('szrq', szrq);
				a[j].set('qyrq', qyrq);
				a[j].set('syzt', syzt);
				a[j].set('org_id', org_id);
				a[j].set('org_id_name', org_id_name);
			}
			//临设类
			if (lb == '1') {
				var zclb = a[0].get('zclb')
				var zclb_name = a[0].get('zclb_name')
				var zclyfs = a[0].get('zclyfs')
				var zclyfs_name = a[0].get('zclyfs_name')
				var szrq = a[0].get('szrq')
				var qyrq = a[0].get('qyrq')
				var syzt = a[0].get('syzt')
				var org_id = a[0].get('org_id')
				var org_id_name = a[0].get('org_id_name')
				for (i = 1; i < a.length; i++) {
					a[i].set('zclb', zclb);
					a[i].set('zclb_name', zclb_name);
					a[i].set('zclyfs', zclyfs);
					a[i].set('zclyfs_name', zclyfs_name);
					a[i].set('szrq', szrq);
					a[i].set('qyrq', qyrq);
					a[i].set('syzt', syzt);
					a[i].set('org_id', org_id);
					a[i].set('org_id_name', org_id_name);
				}
			}
			//房产类
			if (lb == '2') {
				var zzqlr = a[0].get('zzqlr');
				var mqqlr = a[0].get('mqqlr');
				var gys = a[0].get('vendor_id');
				var gys_name = a[0].get('vendor_id_name');
				var sjzyr = a[0].get('sjzyr');
				var zztdsyqr = a[0].get('zztdsyqr');
				var cjbh = a[0].get('cjbh');
				var jzjg = a[0].get('jzjg');
				var jglx = a[0].get('jglx');
				var jzmj = a[0].get('jzmj');
				var zdmj = a[0].get('zdmj');
				var tdyt = a[0].get('tdyt');
				var fczbh = a[0].get('fczbh');
				var cg = a[0].get('cg');
				var zcs = a[0].get('zcs');
				var fcly = a[0].get('fcly');
				var tdzbh = a[0].get('tdzbh');
				var bdwzdjc = a[0].get('bdwzdjc');
				var xxzkdz = a[0].get('xxzkdz');
				var sl_tax = a[0].get('sl');
				var se = a[0].get('se');
				var hsje = a[0].get('hsje');
				var zjnxn = a[0].get('zjnxn');
				var zjqs = a[0].get('zjqs');
				var czl = a[0].get('czl');
				var cz = a[0].get('cz');
				var jz = a[0].get('jz');
				var yzje = a[0].get('yzje');
				var yyys = a[0].get('qty');
				var ljzj = a[0].get('ljzj');
				for (i = 1; i < a.length; i++) {
					a[i].set('zzqlr', zzqlr);
					a[i].set('mqqlr', mqqlr);
					a[i].set('vendor_id', gys);
					a[i].set('vendor_id_name', gys_name);
					a[i].set('sjzyr', sjzyr);
					a[i].set('zztdsyqr', zztdsyqr);
					a[i].set('cjbh', cjbh);
					a[i].set('jzjg', jzjg);
					a[i].set('jglx', jglx);
					a[i].set('jzmj', jzmj);
					a[i].set('zdmj', zdmj);
					a[i].set('tdyt', tdyt);
					a[i].set('fczbh', fczbh);
					a[i].set('cg', cg);
					a[i].set('zcs', zcs);
					a[i].set('fcly', fcly);
					a[i].set('tdzbh', tdzbh);
					a[i].set('bdwzdjc', bdwzdjc);
					a[i].set('xxzkdz', xxzkdz);
					a[i].set('sl', sl_tax);
					a[i].set('se', se);
					a[i].set('hsje', hsje);
					a[i].set('zjnxn', zjnxn);
					a[i].set('zjqs', zjqs);
					a[i].set('czl', czl);
					a[i].set('cz', cz);
					a[i].set('jz', jz);
					a[i].set('yzje', yzje);
					a[i].set('qty', yyys);
					a[i].set('ljzj', ljzj);
				}

			}
			//设备类
			if (lb == '3') {
				var zzqlr = a[0].get('zzqlr');
				var sccj = a[0].get('sccj');
				var gys = a[0].get('vendor_id');
				var gys_name = a[0].get('vendor_id_name');
				var cph = a[0].get('cph');
				var fdjbh = a[0].get('fdjbh');
				var cjbh = a[0].get('cjbh');
				var dl = a[0].get('dl');
				var zll = a[0].get('zl');
				var fdjpl = a[0].get('fdjpl');
				var nl = a[0].get('nl');
				var sl_tax = a[0].get('sl');
				var se = a[0].get('se');
				var hsje = a[0].get('hsje');
				var zjnxn = a[0].get('zjnxn');
				var zjqs = a[0].get('zjqs');
				var czl = a[0].get('czl');
				var cz = a[0].get('cz');
				var jz = a[0].get('jz');
				var yzje = a[0].get('yzje');
				var yyys = a[0].get('qty');
				var ljzj = a[0].get('ljzj');
				for (i = 1; i < a.length; i++) {
					a[i].set('zzqlr', zzqlr);
					a[i].set('sccj', sccj);
					a[i].set('vendor_id', gys);
					a[i].set('vendor_id_name', gys_name);
					a[i].set('cph', cph);
					a[i].set('fdjbh', fdjbh);
					a[i].set('cjbh', cjbh);
					a[i].set('dl', dl);
					a[i].set('zl', zll);
					a[i].set('fdjpl', fdjpl);
					a[i].set('nl', nl);
					a[i].set('sl', sl_tax);
					a[i].set('se', se);
					a[i].set('hsje', hsje);
					a[i].set('zjnxn', zjnxn);
					a[i].set('zjqs', zjqs);
					a[i].set('czl', czl);
					a[i].set('cz', cz);
					a[i].set('jz', jz);
					a[i].set('yzje', yzje);
					a[i].set('qty', yyys);
					a[i].set('ljzj', ljzj);
				}

			}
			//无形资产
			if (lb == '4') {
				var gys = a[0].get('vendor_id');
				var gys_name = a[0].get('vendor_id_name');
				var bbh = a[0].get('bbh');
				var sccj = a[0].get('sccj');
				var sl_tax = a[0].get('sl');
				var se = a[0].get('se');
				var hsje = a[0].get('hsje');
				//var zjnxn = a[0].get('zjnxn');
				var ftnxn = a[0].get('ftnxn');
				var zjqs = a[0].get('zjqs');
				var czl = a[0].get('czl');
				var cz = a[0].get('cz');
				var jz = a[0].get('jz');
				var yfte = a[0].get('yfte');
				var yyys = a[0].get('qty');
				var ljzj = a[0].get('ljzj');
				for (i = 1; i < a.length; i++) {
					a[i].set('vendor_id', gys);
					a[i].set('vendor_id_name', gys_name);
					a[i].set('bbh', bbh);
					a[i].set('sccj', sccj);
					a[i].set('sl', sl_tax);
					a[i].set('se', se);
					a[i].set('hsje', hsje);
					a[i].set('ftnxn', ftnxn);
					a[i].set('zjqs', zjqs);
					a[i].set('czl', czl);
					a[i].set('cz', cz);
					a[i].set('jz', jz);
					a[i].set('yfte', yfte);
					a[i].set('qty', yyys);
					a[i].set('ljzj', ljzj);
				}
			}
		})
	}
	/*检测入账通知单的资产编码是否重复start*/
	if (otype == $Otype.ADD || otype == $Otype.EDIT || otype === 'copy') {
		var arr = new Array();
		mstform.on('dataready', function() {
			var bill_no = mstform.getItem('bill_no').getValue();
			if (Ext.isEmpty(bill_no)) {
				bill_no = "'" + "1" + "'"
			} else {
				bill_no = "'" + bill_no + "'"
			}
			callServer('zcbm', [{
				'bill_no': bill_no
			}], function(res) {
				for (var i = 0; i < res.record.length; i++) {
					arr.push({
						zcbm: res.record[i].zcbm
					});
				}
			});

			dgrid.addListener('edit', function(editor, e) {
				if (e.originalValue == e.value) {
					return;
				} //判断原值与新值是否相同
				if (e.field == 'zcbm') { //监听qty、prc字段变化
					var record = e.record;
					var zcbm = record.data.zcbm
					console.log(zcbm);

					for (var i = 0; i < arr.length; i++) {
						if (arr[i].zcbm == zcbm) {
							console.log(zcbm);
							console.log(arr[i].zcbm);
							Ext.Msg.alert('提示', '该资产编码已存在');
							record.set('zcbm', null);
							return false; //跳出判断回到点击事件，
						}
					}

				};

			});
			//edit

		});

	}
	/*检测入账通知单的资产编码是否重复end*/

	/*资产类型为房产类和设备类 资产编码为不必输，其他类型为必输start*/
	if (otype == $Otype.ADD || otype == $Otype.EDIT || otype === 'copy') {
		mstform.getItem('zclx').addListener('change', function() {
			var zclx = mstform.getItem('zclx').getValue();
			if (zclx == 2 || zclx == 3 || zclx == 4) {
				dgrid.setMustInputCol('zcbm', false);
			}
			if (zclx == 1) {
				dgrid.setMustInputCol('zcbm', true);
			}
		});
	}
	/*资产类型为房产类和设备类 资产编码为不必输，其他类型为必输end*/
}

function attachReturnExt(key, value) {
	var mstform = Ext.getCmp('p_form0000000019_m');
	if (key == 'closeNG3Container') {
		if (value == '') {
			mstform.getItem('fj_num').setValue();
		} else {
			var res = Ext.decode(value);
			mstform.getItem('fj_num').setValue(res.length);
		}
	} else {
		return;
	}
}
//保存时反填
function getSaveDataEdit(type) {
	if (type == 'Save') {}
}

//保存前计算合计
function beforeSaveEdit() {
	var mstform = Ext.getCmp('p_form0000000019_m');
	var dgrid = Ext.getCmp('p_form0000000019_dgrid');
	var dstore = dgrid.store;
	var flag = 0;
	var date = new Date;
	var year = date.getFullYear();
	var zclx = mstform.getItem('zclx').getValue();
	/*资产类型为无形资产时自动生成资产编码start*/
	if (otype == $Otype.ADD) {
	if (zclx == '4') {
	var zclx1 = "'"+mstform.getItem('zclx').getValue()+"'";
	var year1 = "'"+date.getFullYear()+"'";
			callServer('mywxzc', [{
				'year': year1,
				'zclx': zclx1
			}], function(res) {
				if (!Ext.isEmpty(res)) {
					callServer('pt_ne_ass', [{
						'year': year1,
						'zclx': zclx1
					}], function(res) {
						if (res.record.length == 1) {
							var temp;
							var ser_number = res.record[0].ser_number.replace()
							ser_number = parseInt(ser_number);
							var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
							console.log(a);
							for (var i = 0; i < a.length; i++) {
								ser_number++;
								if (ser_number.toString().length == 1) {
									temp = '000' + ser_number.toString();
								} else if (ser_number.toString().length == 2) {
									temp = '00' + ser_number.toString();
								} else if (ser_number.toString().length == 3) {
									temp = '0' + ser_number.toString();
								} else if (ser_number.toString().length == 4) {
									temp = ser_number.toString();
								}
								temp = 'G2020600' + year.toString() + temp;
								a[i].set('zcbm', temp);
							}
						} else {
							flag = '1';
						}
					});
				}
			});





		}
	}
	/*资产类型为无形资产时自动生成资产编码end*/
	if (flag == 0) {
		return true;
	} else {
		return false;
	}
}