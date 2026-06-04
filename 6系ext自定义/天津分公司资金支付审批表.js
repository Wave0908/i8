function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700173_m');

    /*工程项目字段通用帮助选择前触发 start*/
	//项目名称选择前触发
	mstform.getItem('u_pc').addListener('beforetriggerclick', function() {
		var pocode = mstform.getItem('phid_org').getValue();
		mstform.getItem('u_pc').setOutFilter({
			phid_org: pocode,
		});
	});
	/*工程项目字段通用帮助选择前触发 end*/

	/*项目名称字段选择前触发start*/
	mstform.getItem('u_pc').on('beforetriggerclick', function(eOp, ignoreBeforeEvent) {
		if(Ext.isEmpty(mstform.getItem('u_xmb').getValue())) {
			Ext.Msg.alert('提示', '请先选择项目部');
			return false;
		}
		var u_xmb = mstform.getItem('u_xmb').getValue();
		mstform.getItem('u_pc').setOutFilter({
			user_pc_dept: u_xmb,
		});
	});
	/*合同名称字段选择前触发end*/
    /*当更换工程项目的时候承揽合同名称置空start*/
    mstform.getItem('u_xmb').addListener('helpselected', function() {
        mstform.getItem('u_pc').setValue('');
    });
}
        
