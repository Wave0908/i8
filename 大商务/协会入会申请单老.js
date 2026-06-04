function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000000023_m');
	mstform.getItem('hj').setValue(1);
	BatchBindCombox([mstform.getItem('hj')]);
	mstform.getItem('sheng').on('beforetriggerclick', function() {
		mstform.getItem('shi').setValue();
	});
	mstform.getItem('shi').on('beforetriggerclick', function() {
		if(mstform.getItem('sheng').getValue() == '') {
			Ext.Msg.alert('提示', '请先选择省份');
			return false;
		}
		mstform.getItem('shi').setOutFilter({
			pid: mstform.getItem('sheng').getValue()
		})
	});

	/*根据经办人 带出经办人手机号 start*/
	mstform.getItem('empid').addListener('helpselected', function() {
		var id = mstform.getItem('empid').getValue();
		callServer('hr', [{
			'id': id
		}], function(res) {
			if(res.record[0]) {
				mstform.getItem('lxfs').setValue(res.record[0].mobile1);
			} else {
				Ext.Msg.alert('提示', '经办人没有联系电话请输入');
				return false;
			}
		});
	});
	/*根据经办人 带出经办人手机号 end*/

}