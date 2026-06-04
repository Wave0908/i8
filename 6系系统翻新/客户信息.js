function AllReady() {
	var mstform = Ext.getCmp('entpriseform');
	var Toolbar = Ext.getCmp('toolbar');
	if (otype == $Otype.ADD) {
		mstform.queryById('NgShareSign').setValue("1");
		BatchBindCombox([mstform.getItem('NgShareSign')]);
		mstform.getItem('CompNo').userSetReadOnly(true)
		//改为保存前生成
		// mstform.getItem('CompName').addListener('change', function () {
		// 	execServer('gys_bm', {}, function (res) {
		// 		if (res.count > 0) {
		// 			var data = JSON.parse(res.data)
		// 			var sum = data[0].extendObjects.流水号;
		// 			mstform.getItem('CompNo').setValue(sum);
		// 		}
		// 	});
		// })
		Toolbar.items.get('save').on('click', async function () {
			await execServer('gys_bm', {}, function (res) {
				if (res.count > 0) {
					var data = JSON.parse(res.data)
					var sum = data[0].extendObjects.流水号;
					mstform.getItem('CompNo').setValue(sum);
				}
			});
		});
	}
}

function beforeSaveEdit() {
	//往来单位容器
	var mstform = Ext.getCmp('entpriseform');
	//账号帮助容器
	var dgrid = Ext.getCmp('UnitAccountGrid');
	var dstore = dgrid.store;
	var CompNo = mstform.getItem('CompNo').getValue();
	var rawCompName = mstform.getItem('CompName').getValue();
	var CompName = rawCompName ? "'" + rawCompName + "'" : rawCompName;
	var flag = 1;

	/*判断员单位编号，单位名称 是否有空格start*/
	if (CompNo.indexOf(" ") != -1) {
		Ext.Msg.alert('提示', '单位编号有空格');
		flag = 0;
		return false;
	}
	if (rawCompName && (rawCompName.trim() !== rawCompName)) {
		Ext.Msg.alert('提示', '单位名称前后有空格');
		flag = 0;
		return false;
	}
	/*判断单位编号，单位名称 是否有空格 end*/

	/*判断供应商信息是否重复start*/
	if (otype == $Otype.ADD) {
		execServer('supplier_repeat', {
			'compname': CompName
		}, function (res) {
			console.log(res);
			if (res.status != 'success') { //判断取数状态
				Ext.Msg.alert('提示', 'SQL有误');
				flag = 0;
				return false;
			} else if (res.count == 0) { //判断数组行数

			} else {
				Ext.Msg.alert('提示', '该名称已存在');
				flag = 0;
				return false;
			}
		});
	}
	/*判断供应商信息是否重复end*/

	/*判断银行账号信息开户行账号，开户行户名是否有空格start*/
	//获取表体的数据赋值给a
	var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
	for (i = 0; i < a.length; i++) {
		if (a[i].data.AccountName.indexOf(" ") != -1) {
			Ext.Msg.alert('提示', '开户行户名有空格');
			flag = 0;
			return false;
		}

	}
	/*判断银行账号信息开户行账号，开户行户名是否有空格end*/
	if (flag == 1) {
		return true;
	} else {
		return false;
	}
}