function AllReady() {
	var mstform = Ext.getCmp('entpriseform');
	if(otype == $Otype.ADD) {
		mstform.getItem('CompNo').userSetReadOnly(true)
		
        mstform.getItem('PersonFlg').setValue(1);
      BatchBindCombox([mstform.getItem('PersonFlg')]);  
		mstform.getItem('CompName').addListener('change', function() {
			mstform.getItem('user_dwsx1').setValue(mstform.getItem('PersonFlg').getValue());
				execServer('gys_bm', {}, function(res) {
					var sum = res.data[0].流水号;
					mstform.getItem('CompNo').setValue(sum);
				});
		})
		mstform.queryById('GroupShareFlg').setValue("1");
		BatchBindCombox([mstform.getItem('GroupShareFlg')]);
      
      
      
	/*集团内部人员选择后带出往来单位名称start*/
      //有
	mstform.getItem('user_jtnbry').addListener('helpselected', function(obj) {
		mstform.getItem('CompName').setValue(obj.data.jobtitle);
	});
      /*集团内部人员选择后带出往来单位名称end*/
        
	}

	mstform.getItem('PersonFlg').addListener('change', function() {
		mstform.getItem('user_dwsx1').setValue(mstform.getItem('PersonFlg').getValue());
	}) 
}

function beforeSaveEdit() {
	//往来单位容器
	var mstform = Ext.getCmp('entpriseform');
	//账号帮助容器
	var dgrid = Ext.getCmp('UnitAccountGrid');
	var dstore = dgrid.store;
	var CompNo = mstform.getItem('CompNo').getValue();
	var CompName = "'"+mstform.getItem('CompName').getValue()+"'";
	//var dstore = dgrid.store;
	var flag = 1;

	/*判断员单位编号，单位名称 是否有空格start*/

	if(CompNo.indexOf(" ") != -1) {
		Ext.Msg.alert('提示', '单位编号有空格');
		return false;
		flag = 0;
	}

	/*判断单位编号，单位名称 是否有空格 end*/

	/*判断供应商信息是否重复start*/
	if(otype == $Otype.ADD) {
	execServer('supplier_repeat', {
		'compname': CompName
	}, function(res) {
		console.log(res);
		if(res.status != 'success') { //判断取数状态
			Ext.Msg.alert('提示', 'SQL有误');
			flag = 0;
			return false;
		} else if(res.count == 0) { //判断数组行数

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
  /*
	var a = dgrid.getStore().getRange(0, dstore.getCount() - 1);
	var entpriseform = mstform.getItem('GroupShareFlg').getValue('entpriseform')
	for(i = 0; i < a.length; i++) {
      
	    if(hasLettersAndNumbers(a[i].data.AccountName) && entpriseform=='1'){
			Ext.Msg.alert('提示', '结算信息--开户银行--开户行户名 第'+i+1+a[i].data.AccountName+'行应不含身份证号码，请核对。');
			return false;
			flag = 0;
		}
		if(a[i].data.AccountName.indexOf(" ") != -1) {
			Ext.Msg.alert('提示', '开户行户名有空格');
			return false;
			flag = 0;
		}

	}     
    */
	/*判断银行账号信息开户行账号，开户行户名是否有空格end*/
	
	
	
	
	if(flag == 1) {
		return true;
	} else {

		return false;
	}
}



function hasLettersAndNumbers(str) {
  // 使用正则表达式匹配字符串中是否包含字母和数字
  var regex = /[0-9]/;
  return regex.test(str);
}