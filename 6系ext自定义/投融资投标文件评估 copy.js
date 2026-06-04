function allReadyEdit() {
	//获取投标文件评估
	var mstform = Ext.getCmp('p_form0000600075_m');
	// //审核人设置为不可见
	// mstform.getItem('checkpsn').setVisible(false);
	// //标题设置为不可见
	// mstform.getItem('title').setVisible(false);
	// //录入人设置为不可见
	// mstform.getItem('fillpsn').setVisible(false);
	// //项目名称设置为必输
	// mstform.getItem('xmmc').userSetMustInput(true);
	// //投标时间设置为必输
	// mstform.getItem('tbsj').userSetMustInput(true);
	// //工程概况设置为必输
	// mstform.getItem('gcgk').userSetMustInput(true);
	// //是否投标设置为必输
	// mstform.getItem('sftb').userSetMustInput(true);
	// //利润率设置为必输
	// mstform.getItem('amt').userSetMustInput(true);
	// //投标金额设置为必输
	// mstform.getItem('tbje').userSetMustInput(true);
	// //弃标原因字段设置为隐藏
	 mstform.getItem('qbyy').setVisible(false);
	// //项目编码设置为只读
	// mstform.getItem('xmbm').userSetReadOnly(true);
	// //组织设置为只读
	// mstform.getItem('ocode').userSetReadOnly(true);
	/*是否投标start*/
		//当投标为是的时候 弃标原因隐藏  为否的时候弃标原因显示必输
		mstform.getItem('sftb').addListener('change', function() {
			var sftb = mstform.getItem('sftb').getValue();
			//2为否
			if(sftb == '2') {
				//弃标原因字段设置为显示
				mstform.getItem('qbyy').setVisible(true);
				//弃标原因字段设置为必输
				mstform.getItem('qbyy').userSetMustInput(true);
			} else {
				//其他情况
				//弃标原因字段设置为隐藏
				mstform.getItem('qbyy').setVisible(false);
				//弃标原因字段设置非必输
				mstform.getItem('qbyy').userSetMustInput(false);
			}

		});

		/*是否投标end*/
		
		/*项目名称字段通用帮助选择前触发 start*/
	//项目名称选择前触发

	mstform.getItem('xmmc').addListener('beforetriggerclick', function() {
		var pocode = mstform.getItem('phid_org').getValue();
	    mstform.getItem('xmmc').setClientSqlFilter("trz_tbwjpg.ocode="+pocode+" and trz_tbwjpg.phid not in(select pfm_75.xmmc from p_form0000600075_m pfm_75) ");
	});
	/*项目名称字段通用帮助选择前触发 end*/
	
	//项目名称字段帮助窗口选择后触发
	mstform.getItem('xmmc').addListener('helpselected', function() {
		var xmmcPhid = mstform.getItem('xmmc').getValue();
		execServer('p_form0000600075_xmmc', {
			'phid': xmmcPhid
		}, function(res) {
			if(res.count>0) {
				const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				mstform.getItem('xmbm').setValue(data1[0].extendObjects.xmbm);			
				mstform.getItem('xmmc').setValue(data1[0].extendObjects.xmmc);
				mstform.getItem('gcgk').setValue(data1[0].extendObjects.gcgk);
				//代码转名称
				BatchBindCombox([		
					mstform.getItem('xmmc'),
					mstform.getItem('gcgk')					
				]);
			}
		});

	});
	//项目名称字段通用帮助选择后触发end
	
	
}


//保存前检测
function beforeSaveEdit() {
	//获取投融资招标预审评估表
	var mstform = Ext.getCmp('p_form0000600075_m');
	var asr_flg = mstform.getItem('asr_flg').getValue();
	if(asr_flg == '1') {
		return true;
	} else {
		NGMsg.Info('请先上传附件');
		return false;
	}

}