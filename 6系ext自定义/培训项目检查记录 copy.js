function allReadyEdit() { //初始化
	var mstform = Ext.getCmp('p_form0000000090_m');
	var dgrid = Ext.getCmp('p_form0000000090_d1grid');
	var dstore = dgrid.store;

	//培训项目编码设为只读
	mstform.getItem('pxxmbh').userSetReadOnly(true);
	//培训类别设为只读
	mstform.getItem('pxlb').userSetReadOnly(true);
	//培训年度设置为必输
	mstform.getItem('pxnd').userSetMustInput(true);
	//培训名称设置为必输
	mstform.getItem('pxxmmc').userSetMustInput(true);

	
		mstform.getItem('pxnd').addListener('helpselected', function(obj) {
			mstform.getItem('pxxmmc').setValue('');
		});
		
	    mstform.getItem('pxxmmc').addListener('beforetriggerclick', function() {
			var ocode = mstform.getItem('ocode').getValue();
			var pxnd = mstform.getItem('pxnd').getValue();
			var pxlb = mstform.getItem('pxlb').getValue();
			console.log(ocode)
			console.log(pxnd)
			if(Ext.isEmpty(ocode) || Ext.isEmpty(pxnd)) {
				Ext.Msg.alert('提示', '请先选择培训年度和组织！');
				return false;
			} else if(Ext.isEmpty(pxlb)) {
				Ext.Msg.alert('提示', '请先选择培训类别');
				return false;
			} else if(pxlb == '01') {
				mstform.getItem('pxxmmc').setOutFilter({
					'p_form0000000084_m.ocode': ocode,
					'p_form0000000084_m.jhnd': pxnd,
					'p_form0000000084_m.pxlb': '01',
					'p_form0000000088_m.ischeck': 1,
					
				});
			}

		});

	

	if(otype == $Otype.ADD || otype == $Otype.EDIT || otype == $Otype.VIEW) { //帮助窗口结束事件
		mstform.getItem('pxxmmc').addListener('helpselected', function(obj) {
			var pxxmmc = mstform.getItem('pxxmmc').getValue();
			var pxlb = mstform.getItem('pxlb').getValue();
			if(pxlb == '01') {
				callServer('boq_s', [{
					'phid': pxxmmc
				}], function(res) {
					if(res.record[0]) {
						mstform.getItem('pxksrq').setValue(res.record[0].llzspxsjks);
						mstform.getItem('pxjsrq').setValue(res.record[0].llzspxsjjs);
					}
				});
			} else {
				callServer('boq_m', [{
					'phid': pxxmmc
				}], function(res) {
					if(res.record[0]) {
						mstform.getItem('pxksrq').setValue(res.record[0].pxkssj);
						mstform.getItem('pxjsrq').setValue(res.record[0].pxjssj);
						mstform.getItem('xmfzr').setValue(res.record[0].cname);
					}
				});
			}

			//带入表头信息
			callServer('select_MB_list', [{
					'phid': pxxmmc
				}],
				function(res) {
					for(var rskey in res.record[0]) {
						mstform.getItem(rskey).setValue(res.record[0][rskey]);
						mstform.getItem(rskey).setReadOnly(true);
						BatchBindCombox([mstform.getItem(rskey)]);
					}
				});

		});
	}

	if(otype == $Otype.ADD) {
		callServer('user_detail', [{}], function(res1) {
			var arr = new Array();
			for(i = 0; i < res1.count; i++) {
				arr.push({
					jcnrbm: res1.record[i].c_no,
					jcnr: res1.record[i].c_name
				});
			}
			dstore.insert(dstore.getCount(), arr);
		});
	}

}