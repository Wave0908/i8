$NG.AllReady(function (
	page,
	{ useAction, useValuesChange, useDataIndexChange, useBeforeClick, useUpdateRows, useClick, useBeforeOpen, useUpdateRow }
) {
	var mstform = Ext.getCmp('PcmPay10');
	var Toolbar = $NG.getCmpApi("CntProjBalDetailToolBar");
	mstform.getItem("user_cwxtsfjs").setValue('1');

	/*根据推送按钮推送点击事件推送数据end*/
	/*业务类型过滤*/
	// useBeforeOpen(({
	// 	args
	// }) => {
	// 	$NG.updateUI(function (updater, state) {
	// 		updater.fieldSetForm.PcmM4.user_ywlx.setProps({
	// 			clientSqlFilter: ("zd = '业务类型' and djmc = '发票报账单'"),
	// 			placeholder: ``
	// 		});
	// 	});
	// 	return true;
	// }, "gs_fpbzd_ywlx");

});
