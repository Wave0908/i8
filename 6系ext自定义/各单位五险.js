function allReadyEdit() {
	//初始化
	var mstform = Ext.getCmp('p_form0000000265_m');
	var dgrid = Ext.getCmp('p_form0000000265_dgrid');
	var dstore = dgrid.store;
	mstform.getItem('checkpsn').setVisible(false);
	mstform.getItem('ocode').setVisible(false);
	mstform.getItem('u_jfdw').userSetMustInput(true);
	

	if(otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.COPY) {
		dgrid.hideColumn('fz', true)
		callServer('jfxm', [{}], function(res) {
			if(res.status != 'ok') { //判断取数状态
				Ext.Msg.alert('提示', '服务端取数失败');
				return;
			} else if(res.record.length == 0) { //判断数组行数
				Ext.Msg.alert('提示', '服务器确实基础数据,请联系管理员');
				return;
			} else {

				dstore.removeAll(); //清除单据体内所有数据
				dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体                    
			}

		});

		mstform.getItem('sbyf').addListener('itemchanged', function() {
			var zz = mstform.getItem('ocode').getRawValue();
			var zz_name = mstform.getItem('ocode').rawValue;
			var cs = mstform.getItem('ocode').valueToRaw();
			console.log(zz, zz_name, cs)
			var nd = mstform.getItem('sbnd').getValue();
			if(Ext.isEmpty(nd)) {
				Ext.Msg.alert('提示', '请先输入申报年份！')
				mstform.getItem('sbyf').setValue('');
			} else {
				var yd = mstform.getItem('sbyf').getValue();
				mstform.getItem('title').setValue(zz + nd + '年' + yd + '月' + '五险二金申报核定表')
			}

		})
		mstform.getItem('byjsrs').addListener('change', function() {
			var syrs = mstform.getItem('symrs').getValue();
			var byrs = mstform.getItem('byzjrs').getValue();
			if(Ext.isEmpty(syrs) || Ext.isEmpty(byrs)) {
				Ext.Msg.alert('提示', '请先输入本月末人数、本月增加人数！');
				mstform.getItem('byjsrs').setValue('');
				return false;

			} else {
				var byjs = mstform.getItem('byjsrs').getValue();
				mstform.getItem('bymzgrs').setValue(syrs + byrs - byjs);
			}
		})
		dgrid.getColumn('jfdwsbs').getEditor().minValue = 0;
	}
}