function allReadyEdit() {
	var mstform = Ext.getCmp('p_form0000600073_m');
	//组织设置为只读
	// mstform.getItem('ocode').userSetReadOnly(true);
	// //项目编码设置为只读
	// mstform.getItem('xmbm').userSetReadOnly(true);
	// //项目类型设置为只读
	// mstform.getItem('xmlx').userSetReadOnly(true);
	// //项目名称字段设置为必输项
	// mstform.getItem('xmmc').userSetMustInput(true);
	// //投标截止日期字段设置为必输项
	// mstform.getItem('tbjzrq').userSetMustInput(true);
	// //会议时间字段设置为必输项
	// mstform.getItem('hysj').userSetMustInput(true);
	// //招标方式字段设置为必输项
	// mstform.getItem('zbfs').userSetMustInput(true);
	// //工程概况字段设置为必输项
	// mstform.getItem('gcgk').userSetMustInput(true);
	/*项目名称字段通用帮助选择前触发 start*/
	//项目名称选择前触发

	mstform.getItem('xmmc').addListener('beforetriggerclick', function() {
		var pocode = mstform.getItem('phid_org').getValue();
		mstform.getItem('xmmc').setClientSqlFilter("trz_bqhy.ocode="+pocode+" and trz_bqhy.phid not in(select pfm_73.xmmc from p_form0000600073_m pfm_73) ");
	});
	/*项目名称字段通用帮助选择前触发 end*/

	//项目名称字段通用帮助选择后触发start

	//项目名称字段帮助窗口选择后触发
	mstform.getItem('xmmc').addListener('helpselected', function() {
		var xmmcPhid = mstform.getItem('xmmc').getValue();
		execServer('p_form0000600073_xmmc', {
			'phid': xmmcPhid
		}, function(res) {
			if(res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
				mstform.getItem('xmbm').setValue(data1[0].extendObjects.xmbm);
				mstform.getItem('xmlx').setValue(data1[0].extendObjects.xmlx);
				mstform.getItem('xmmc').setValue(data1[0].extendObjects.xmmc);
				mstform.getItem('tbjzrq').setValue(data1[0].extendObjects.tbjzrq);
				mstform.getItem('yzmc').setValue(data1[0].extendObjects.yzmc);
				mstform.getItem('zbfs').setValue(data1[0].extendObjects.zbfs);
				//代码转名称
				BatchBindCombox([
					mstform.getItem('xmlx'),
					mstform.getItem('xmmc'),
					mstform.getItem('yzmc'),
					mstform.getItem('zbfs')
				]);
			}
		});

	});
	//项目名称字段通用帮助选择后触发end

}
//保存前检测
function beforeSaveEdit() {
	//获取投融资招标预审评估表
	var mstform = Ext.getCmp('p_form0000600073_m');
	var asr_flg = mstform.getItem('asr_flag').getValue();
	if(asr_flg == '1') {
		return true;
	} else {
		NGMsg.Info('请先上传附件');
		return false;
	}

}