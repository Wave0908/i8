function allReadyEdit() {
	if(otype == $Otype.ADD || otype == $Otype.EDIT) {
		var mstform = Ext.getCmp('p_form0000000217_m');
		var dgrid = Ext.getCmp('p_form0000000217_dgrid');
		var dstore = dgrid.store;
		mstform.getItem('title').setValue('部门业务单元推送表');
		var zz = mstform.getItem('ocode').getValue();
		mstform.getItem('ocode').addListener('change', function() {
			zz = mstform.getItem('ocode').getValue();
		});
		//console.log(zz);
		//表体通用帮助过滤
		dgrid.getColumn('xzd_bmmc_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			//var cc=mstform.getItem('zclx').getValue();
			dgrid.getColumn('xzd_bmmc_name').getEditor().setOutFilter({
				parent_orgid: zz
			});
		})
		dgrid.addListener('edit', function(editor, e) { //监听单据体编辑状态，edit-编辑；add-增行；cellclick-点击
			if(e.originalValue == e.value) {
				return;
			}
			var da = dgrid.getSelectionModel().getSelection(); //获取当前选中行
			var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
			if(e.field == 'xzd_bmmc') { //监听qty、prc字段变化
				var record = e.record;
				var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行
				var xzd_bm = data[0].get('xzd_bmmc'); //获取当前选中行某个字段值
				var xzd_sjbm;
				//console.log(xzd_bm);
				//获取部门编码
				callServer('xzd_bm', [{
					'A': xzd_bm
				}], function(res) {
					//console.log(res.ocode);
					record.set('xzd_bmbm', res.record[0].ocode);
					//record.set('ywdybm',res.record[0].ocode)
					//console.log(res.record.length());
					xzd_sjbm = res.record[0].ocode;
				});
				//获取上级部门编码
				callServer('xzd_sjbm', [{
					'B': xzd_sjbm
				}], function(res) {
					//console.log(res.ocode);
					record.set('xzd_sjbm', res.record[0].parent_deptno);
				});

			};

			if(dstore.getCount() > 0) {
				mstform.getItem('ocode').userSetReadOnly(true);
			} else {
				mstform.getItem('ocode').userSetReadOnly(false);
			}

		});
		//浪潮业务单元编码填充
		dgrid.getColumn('lc_ywdy_name').getEditor().addListener('helpselected', function() {

			var data = dgrid.getSelectionModel().getSelection();
			var lc_ywdy = data[0].get('lc_ywdy'); //lc_ywdybm
			console.log(lc_ywdy);
			callServer('lc_ywdybm', [{
				'id': lc_ywdy
			}], function(res) {
				data[0].set('ywdybm', res.record[0].dwbh);
			});
		})
		//浪潮账套名称过滤
		dgrid.getColumn('lc_ztmc_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			callServer('xzd_bm', [{
				'A': zz
			}], function(res) {
				//console.log(res.record[0].ocode);
				//record.set('xzd_sjbm',res.record[0].parent_deptno);
				dgrid.getColumn('lc_ztmc_name').getEditor().setOutFilter({
					pm_zzbm: res.record[0].ocode
				});
			});
		})
		//浪潮业务单元过滤		
		dgrid.getColumn('lc_ywdy_name').getEditor().on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
			var data = dgrid.getSelectionModel().getSelection(); //获取当前选中行
			var yy = data[0].get('lc_ztmc'); //获取当前选中行某个字段值
			//console.log(yy);
			if(yy) {
				callServer('lc_ywdy', [{
					'C': yy
				}], function(res) {
					//console.log(res.record[0].ztbm);
					//record.set('xzd_sjbm',res.record[0].parent_deptno);
					dgrid.getColumn('lc_ywdy_name').getEditor().setOutFilter({
						sjjg: res.record[0].ztbm
					});
				});
			}

		})

		//引用新增组织数据
		var Toolbar = Ext.getCmp('toolbar');
		//console.log(Toolbar);
		Toolbar.insert(1, {
			itemId: "yy_xzbm",
			text: "引入新增部门",
			width: this.itemWidth,
			iconCls: "icon-AddRow "
		})
		Toolbar.items.get('yy_xzbm').on('click', function() {
			var zzbm;
			callServer('xzd_zzbm', [{
				'D': zz
			}], function(res) {
				zzbm = res.record[0].ocode;
				//console.log(res.record[0].ocode);
				//record.set('xzd_sjbm',res.record[0].parent_deptno);
				//dgrid.getColumn('lc_ywdy_name').getEditor().setOutFilter({sjjg:res.record[0].ztbm});
			});

			callServer('yy_xzbm', [{
				'E': zzbm
			}], function(res) {
				if(res.status != 'ok') { //判断取数状态
					Ext.Msg.alert('提示', '服务端取数失败');
					return;
				} else if(res.record.length == 0) { //判断数组行数
					Ext.Msg.alert('提示', '目前所属组织下没有新增部门需要引入');
					return;
				} else {
					mstform.getItem('ocode').userSetReadOnly(true);
					//dstore.removeAll(); //清除单据体内所有数据
					dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
				}
			});
		})

	}

	/*根据类型名称带出类型标志start*/

	dgrid.addListener('edit', function(editor, e) {
		if(e.originalValue == e.value) {
			return;
		}
		if(e.field == 'lxmc') { 
			var record = e.record;
			if(record.data.lxmc == '1') {
				record.set('lc_lxbz', 1);
			} else if(record.data.lxmc == '2') {
				record.set('lc_lxbz', 2);
			}

		};
	});
	/*根据类型名称带出类型标志end*/

}