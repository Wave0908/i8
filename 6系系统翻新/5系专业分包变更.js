function AllReady() {
	var mstform = Ext.getCmp('CntChangeM4');
	var Toolbar = Ext.getCmp('toolbar');
	var dgrid = Ext.getCmp('CntChangeD4');
	var dstore = dgrid.store;
	//浪潮乙方设置为只读
	mstform.getItem('user_lcyf').userSetReadOnly(true);

	/*隐藏三个分组start*/
	document.getElementsByTagName('fieldset')[1].style.visibility = 'hidden';
	document.getElementsByTagName('fieldset')[3].style.visibility = 'hidden';
	/*隐藏三个分组end*/

	/*浪潮返回标志为4申请取消审核可点击start*/

	mstform.on('dataready', function(e) {
		var Toolbar = Ext.getCmp('toolbar');
		var user_istbinspur = mstform.getItem('user_istbinspur').getValue();
		if(user_istbinspur == '4') {
			Toolbar.getComponent('applycheck').forceenable();
		} else {
			Toolbar.getComponent('applycheck').forcedisable();
		}

	});
	/*浪潮返回标志为4申请取消审核可点击end*/
	

	/*乙方单位为组织的时候浪潮甲方为必输切不只读start*/
	mstform.getItem('SenCompName').addListener('change', function() {

		var PhidSenComp = mstform.getItem('SenCompName').getValue();
		execServer('contract_CorrUnit', {
			'phid': PhidSenComp
		}, function(res) {
			if(res.status != 'success') {
				Ext.MessageBox.show({
					title: '提示',
					msg: "sql有误",
					modal: false
				});

			}

			if(res.data.length == 1) {
				if(res.data[0].type == 'org') {
					//浪潮乙方设置为只读
					mstform.getItem('user_lcyf').userSetReadOnly(false);
					mstform.getItem('user_lcyf').userSetMustInput(true);
				} else {
					mstform.getItem('user_lcyf').userSetReadOnly(true);
					mstform.getItem('user_lcyf').userSetMustInput(false);
				}
			}

		});

	});

	/*乙方单位为组织的时候浪潮甲方为必输切不只读end*/

	/*判断明细表的编码是否重复start*/

	dgrid.addListener('edit', function(editor, e) { //监听单据体字段编辑状态 *edit 为编辑事件（据体汇总更新表头字段）
		if(e.originalValue == e.value) {
			return;
		} //判断原值与新值是否相同，如果相同则返回
		var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
		if(e.field == 'ItemNo') {

			var record = e.record;
			var bm = record.data.ItemNo
			var b = 0;
			for(var i = 0; i < a.length; i++) {

				if(bm == a[i].get("ItemNo")) {
					b++
				}

			}
			if(b > 1) {
				Ext.Msg.alert('提示', '该资产编码已存在');
				record.set('ItemNo', null);
				return false;

			}
		};
	});
	/*判断明细表的编码是否重复end*/

}

//保存前检测

function beforeSaveEdit () {
    var mstform = Ext.getCmp('CntChangeM4');
    var Toolbar = Ext.getCmp('toolbar');
    var bgh = Ext.Number.from(mstform.getItem('RestPriceAvt').getValue(), 0)
    var yht = Ext.Number.from(mstform.getItem('CntSumAmtOld').getValue(), 0)
	var bg=bgh-yht
    if(bg>yht*0.1){
    Ext.Msg.alert('提示', '本次变更价税合计['+bg+']，已超出原合同的10%，请检查后重试！' );
    Toolbar.enable();        
	return false;   
	 }
	{return true}
    }
 
    
    
    
    
