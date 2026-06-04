//专业分包商考核评价
function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000700029_m');
	var dgrid = Ext.getCmp('p_form0000700029_dgrid');
	var Toolbar = Ext.getCmp('toolbar');
	var dstore = dgrid.store;

	if(otype == $Otype.ADD) {
		/*根据业务日期带出年份和月份start*/
		var bill_dt = mstform.getItem('bill_dt').getValue();
		var year = bill_dt.getFullYear();
		var month = bill_dt.getMonth() + 1;
		mstform.getItem('ddlbcol_1').setValue(year);
		mstform.getItem('userhelp_4').setValue(month);
		/*根据业务日期带出年份和月份end*/
	}
	/*业务日期选择后带出年份月份start*/
	mstform.getItem('bill_dt').addListener('change', function() {
		var bill_dt = mstform.getItem('bill_dt').getValue();
		if(!Ext.isEmpty(bill_dt)) {
			var year = bill_dt.getFullYear();
			var month = bill_dt.getMonth() + 1;
			mstform.getItem('ddlbcol_1').setValue(year);
			mstform.getItem('userhelp_4').setValue(month);
		}

	});
	/*业务日期选择后带出年份月份end*/

	//单据日期设置为不只读
	mstform.getItem('bill_dt').userSetReadOnly(false);
	//日期设置为不可见
	mstform.getItem('datetimecol_1').setVisible(false);
	mstform.getItem('ddlbcol_1').userSetReadOnly(true);
	mstform.getItem('userhelp_4').userSetReadOnly(true);
	mstform.getItem('checkpsn').setVisible(false);
	//评价类别为只读
	dgrid.setReadOnlyCol('pjlb', true);
	//评分标准为只读
	dgrid.setReadOnlyCol('pfbz', true);
	if(otype == $Otype.ADD) {
		mstform.getItem('pro_num').setValue(0);
		mstform.getItem('ins_num').setValue(0);
		mstform.getItem('safe_num').setValue(0);
		mstform.getItem('u_jyysfs').setValue(0);
		callServer('pjlb', [{}], function(res) {
			dstore.removeAll(); //清除单据体内所有数据
			dstore.insert(dstore.getCount(), res.record); //将服务端获取的数组内容插入到单据体
		});
	}

	//根据项目名称,带出表头信息

	mstform.getItem('pc').addListener('helpselected', function() {
		var pc = "'"+mstform.getItem('pc').getValue()+"'";
		//带入表头信息
		callServer('select_XMB_list', [{
				'pc': pc
			}],
			function(res) {
				for(var rskey in res.record[0]) {
					mstform.getItem(rskey).setValue(res.record[0][rskey]);
					mstform.getItem(rskey).setReadOnly(true);
					BatchBindCombox([mstform.getItem(rskey)]);
				}
			});
	});

	dgrid.addListener('edit', function(editor, e) {
		var record = e.record;
		if(e.originalValue == e.value) {
			return;
		}

		if(e.field == 'pf') {

			if(record.get('pf') > record.get('pro_num')) {
				Ext.Msg.alert('提示', '当前评分已经大于满分:' + Ext.Number.from(record.get('pro_num'), 0) + '请重新输入');
				record.set('pf', 0);
				return false;
			}
			var a = 0;
			var b = 0;
			var c = 0;
			var d = 0;
			Ext.Array.each(dstore.data.items, function(record) {
				if(record.get('pjlb') == '1') {
					a += Ext.Number.from(record.get('pf'), 0)
				}
				if(record.get('pjlb') == '2') {
					b += Ext.Number.from(record.get('pf'), 0)
				}
				if(record.get('pjlb') == '3') {
					c += Ext.Number.from(record.get('pf'), 0)
				}
				if(record.get('pjlb') == '4') {
					d += Ext.Number.from(record.get('pf'), 0)
				}

			});

			mstform.getItem('pro_num').setValue(a);
			mstform.getItem('ins_num').setValue(b);
			mstform.getItem('safe_num').setValue(c);
			mstform.getItem('u_jyysfs').setValue(d);
			mstform.getItem('pjzf').setValue(mstform.getItem('pro_num').getValue() + mstform.getItem('ins_num').getValue() +
				mstform.getItem('safe_num').getValue()+mstform.getItem('u_jyysfs').getValue());

		}
	});
}