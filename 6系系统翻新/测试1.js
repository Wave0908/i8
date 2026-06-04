$NG.AllReady(function (
	editPage,
	{ useAction, useValuesChange, useDataIndexChange, useBeforeOpen, useUpdateRows, useClick, useBeforeClick }
) {
	var mstform = $NG.getCmpApi('PcmM7');
	var dgrid = $NG.getCmpApi('PcmD7');
	console.log("dgrid:", dgrid);
	console.log("dgrid.setColumnProps():", dgrid.setColumnProps());
	var Toolbar = $NG.getCmpApi('CntMDetailToolBar');
	console.log("Buttons:", Toolbar.getButtons());
	console.log("ToolBar:", Toolbar);
	Toolbar.setReadOnly('IMPSchemeInfo', true);
	Toolbar.setReadOnly('IMPPushTask', false);
});







