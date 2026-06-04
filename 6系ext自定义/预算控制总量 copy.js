function allReadyEdit() { //页面编辑方法，固定写法
	//获取容器，固定写法
	var mstform = Ext.getCmp('p_form0000700456_m');
	//获取表体容器
	var dgrid = Ext.getCmp('p_form0000700456_dgrid');
	var Toolbar = Ext.getCmp('toolbar');
	var dstore = dgrid.store;
	console.log(Toolbar.items);
	dgrid.setReadOnlyCol('u_bghsl',true);
	dgrid.setReadOnlyCol('qty', true);
	dgrid.setReadOnlyCol('u_bcbgsl', true);
	dgrid.setReadOnlyCol('amt',true);
	dgrid.setReadOnlyCol('u_bcbghsje', true);
	dgrid.setReadOnlyCol('u_bghhsje', true);
	dgrid.setReadOnlyCol('u_jldw', true);
	dgrid.setReadOnlyCol('u_yskkzlwlkz_name', true);
	mstform.getItem('u_yskzdh').setVisible(false); 
	if (otype == $Otype.ADD) {
	mstform.on('dataready',function(){
	        mstform.getItem('pc').setValue(); 

	    });
	}
	mstform.getItem('u_yskzbglx').addListener("change",function(){
		mstform.getItem ('u_yskzbglx').userSetReadOnly(true);
   
		var u_yskzbglx  = mstform.getItem('u_yskzbglx').getValue();
		if(u_yskzbglx=='2'){
			dgrid.hideColumn('u_bghsl',false);
			dgrid.hideColumn('u_bcbgsl',false);
			dgrid.hideColumn('u_bcbghsje',false);
			dgrid.hideColumn('u_bghhsje',false);
			dgrid.setReadOnlyCol('u_bcbgsl', false);
			dgrid.setReadOnlyCol('u_bcbghsje', false);
			mstform.getItem('u_yskzdh').setVisible(true); 
			mstform.getItem('u_yskzdh').userSetMustInput(true);
		}else{
			dgrid.setReadOnlyCol('qty', false);
			dgrid.setReadOnlyCol('amt', false);
			dgrid.hideColumn('u_bghsl',true);
			dgrid.hideColumn('u_bcbgsl',true);
			dgrid.hideColumn('u_bcbghsje',true);
			dgrid.hideColumn('u_bghhsje',true);
			dgrid.setReadOnlyCol('u_bcbgsl',true);
			mstform.getItem('u_yskzdh').setValue(); 
			mstform.getItem('u_yskzdh').setVisible(false); 
			mstform.getItem('u_yskzdh').userSetMustInput(false);
		}
	});
	
	//明细表插入默认数据
	var arr1 = new Array();
	arr1.push({
	    u_yskkzlwlkz: '569000000001006',
		u_yskkzlwlkz_name: '01钢结构类',
		u_jldw: '吨',
	});
	arr1.push({
	    u_yskkzlwlkz: '569000000001007',
		u_yskkzlwlkz_name: '01螺线类',
		u_jldw: '吨',
	});
	arr1.push({
	    u_yskkzlwlkz: '569000000001008',
		u_yskkzlwlkz_name: '07混凝土类1',
		u_jldw: '立方米',
	});
	arr1.push({
	    u_yskkzlwlkz: '569000000001031',
		u_yskkzlwlkz_name: '07混凝土类2',
		u_jldw: '吨',
	});
	arr1.push({
	    u_yskkzlwlkz: '569000000001009',
		u_yskkzlwlkz_name: '26电缆类',
		u_jldw: '米',
	});
	
	dstore.insert(dstore.getCount(), arr1);
	
	
	//单据为查看时，弹窗提示

	if(otype == $Otype.VIEW){   
		///增加判断，存在后续单据，隐藏“申请去审”按钮
		setTimeout(function (){
			//在里面写要延迟后执行的东西
			var bill_no=mstform.getItem('bill_no').getValue();
			var bglx=mstform.getItem('u_yskzbglx').getValue();
			if(bglx==1){
				callServer('sfczbg_zc', [{ 'bill_no': bill_no}], function (res) {
			  if(res.count>0) {
				var bgd=res.record[0].bill_no
				Ext.Msg.alert('提示', '该预算控制单已存在变更记录['+bgd+']，已隐藏“申请去审”按钮，请去审删除对应单据后再操作' );
				Toolbar.get('applycheck').hide();
			  }
			  }); 
			} 
			if(bglx==2){
				var zc=mstform.getItem('u_yskzdh').getValue();
				callServer('sfczbg_bg', [{ 'zc': zc}], function (res) {
					if(res.count>0) {
						if(bill_no!=res.record[0].bill_no){
							var bgd=res.record[0].bill_no
							Ext.Msg.alert('提示', '该预算控制变更单不是最新记录，已隐藏“申请去审”按钮，请去审删除最新变更单['+bgd+']后再操作' );
							Toolbar.get('applycheck').hide();}		
					} 
						   });   
			          }
					},500);
            }

	mstform.getItem('pc').on('beforetriggerclick', function (obj) {
		if(Ext.isEmpty(mstform.getItem('u_yskzbglx').getValue())){
			Ext.Msg.alert('提示', '请先维护预算控制变更类型');
			return false;
		}
		if(mstform.getItem('u_yskzbglx').getValue()=='1'){
			mstform.getItem('pc').setClientSqlFilter(" project_table.phid  not in ( select pc from p_form0000700456_m where u_yskzbglx='1'  ) "); 
		}
		if(mstform.getItem('u_yskzbglx').getValue()=='2'){
			mstform.getItem('pc').setClientSqlFilter(" project_table.phid  not in ( select pc from p_form0000700456_m where u_yskzbglx='2' and  ischeck <> '1' ) "); 
		}
		 
	})
	
	
	
	mstform.getItem('pc').on('helpselected', function (obj) {
		mstform.getItem('u_yskzdh').setValue(); 
		var a=dgrid.getStore().getRange(0, dstore.getCount() - 1);
		for (var i = 0; i < a.length; i++) {
			a[i].set('qty', 0);
			a[i].set('u_bghsl', 0);
			a[i].set('u_bcbgsl', 0);
		}
	});
	
	mstform.getItem('u_yskzdh').on('beforetriggerclick', function (obj) {
		if(Ext.isEmpty(mstform.getItem('pc').getValue())){
			Ext.Msg.alert('提示', '请先维护工程项目');
			return false;
		}
		mstform.getItem('u_yskzdh').setClientSqlFilter(" phid  not in ( select u_yskzdh from p_form0000700456_m where u_yskzbglx='2' and  ischeck <> '1' ) and p_form0000700456_m.pc = ' "+mstform.getItem('pc').getValue()+"'");
		
	});
	
	
	mstform.getItem('u_yskzdh').on('helpselected', function (obj) {
		var u_yskzdh = mstform.getItem('u_yskzdh').getValue()
		callServer('yskzlmx', [{ 'phid': u_yskzdh}], function (res) {
			var a=dgrid.getStore().getRange(0, dstore.getCount() - 1);
			for (var i = 0; i < a.length; i++) {
				if(a[i].get('u_yskkzlwlkz')=='569000000001006'){
					for(var j=0;j<res.record.length;j++){
						if(res.record[j].u_yskkzlwlkz=='569000000001006'){
							a[i].set('qty', res.record[j].qty);
							a[i].set('amt', res.record[j].amt);
							a[i].set('u_bghsl', res.record[j].qty);
							a[i].set('u_bghhsje', res.record[j].amt);
						}
					}
					
				}
				if(a[i].get('u_yskkzlwlkz')=='569000000001007'){
					for(var j=0;j<res.record.length;j++){
						if(res.record[j].u_yskkzlwlkz=='569000000001007'){
							a[i].set('qty', res.record[j].qty);
							a[i].set('amt', res.record[j].amt);
							a[i].set('u_bghsl', res.record[j].qty);
							a[i].set('u_bghhsje', res.record[j].amt);
						}
					}
					
				}
				if(a[i].get('u_yskkzlwlkz')=='569000000001008'){
					for(var j=0;j<res.record.length;j++){
						if(res.record[j].u_yskkzlwlkz=='569000000001008'){
							a[i].set('qty', res.record[j].qty);
							a[i].set('amt', res.record[j].amt);
							a[i].set('u_bghsl', res.record[j].qty);
							a[i].set('u_bghhsje', res.record[j].amt);
						}
					}
					
				}
				if(a[i].get('u_yskkzlwlkz')=='569000000001031'){
					for(var j=0;j<res.record.length;j++){
						if(res.record[j].u_yskkzlwlkz=='569000000001031'){
							a[i].set('qty', res.record[j].qty);
							a[i].set('amt', res.record[j].amt);
							a[i].set('u_bghsl', res.record[j].qty);
							a[i].set('u_bghhsje', res.record[j].amt);
						}
					}
					
				}
				if(a[i].get('u_yskkzlwlkz')=='569000000001009'){
					for(var j=0;j<res.record.length;j++){
						if(res.record[j].u_yskkzlwlkz=='569000000001009'){
							a[i].set('qty', res.record[j].qty);
							a[i].set('amt', res.record[j].amt);
							a[i].set('u_bghsl', res.record[j].qty);
							a[i].set('u_bghhsje', res.record[j].amt);
						}
					}
					
				}
			}
		});
	
	});
	
	
	
	dgrid.addListener('edit', function(editor, e) {
		if(e.originalValue == e.value) {
			//判断原值与新值是否相同，如果相同则返回 *return 返回
			return;
		}
		if(e.field == 'u_bcbgsl') {
			var record = e.record; //当前行用对像record表示
			if(Ext.Number.from(record.get('u_bcbgsl'))<0){
				Ext.Msg.alert('提示', '变更数量不允许为负数');
				record.set('u_bcbgsl',0)
				return false; 
			}
			record.set('u_bghsl', Ext.Number.from(record.get('qty'), 0) + Ext.Number.from(record.get('u_bcbgsl'), 0));
			record.set('u_bghhsje', Ext.Number.from(record.get('amt'), 0) + Ext.Number.from(record.get('u_bcbghsje'), 0));
		}
		if(e.field == 'u_bcbghsje') {
			var record = e.record; //当前行用对像record表示
			if(Ext.Number.from(record.get('u_bcbgsl'))<0){
				Ext.Msg.alert('提示', '变更金额不允许为负数');
				record.set('u_bcbgsl',0)
				return false; 
			}
			record.set('u_bghhsje', Ext.Number.from(record.get('amt'), 0) + Ext.Number.from(record.get('u_bcbghsje'), 0));
		}
		
	});



    if(Toolbar.get('applycheck')){   
///增加去审判断，存在后续单据，不可去审删除
Toolbar.get('applycheck').on('click', function () {
    var bill_no=mstform.getItem('bill_no').getValue();
    var bglx=mstform.getItem('u_yskzbglx').getValue();
    var flag=0
    if(bglx==1){
        callServer('sfczbg_zc', [{ 'bill_no': bill_no}], function (res) {
      if(res.count>0) {
        var bgd=res.record[0].bill_no
        Ext.Msg.alert('提示', '该预算控制单已存在变更记录['+bgd+']，请去审删除后再操作' );
      }
      else{flag=1} 
      }); 
    } 
    if(bglx==2){
        var zc=mstform.getItem('u_yskzdh').getValue();
        callServer('sfczbg_bg', [{ 'zc': zc}], function (res) {
            if(res.count>0) {
                if(bill_no!=res.record[0].bill_no){
					var bgd=res.record[0].bill_no
                    Ext.Msg.alert('提示', '该预算控制变更单不是最新记录，请去审删除最新变更单['+bgd+']后再操作' );
                     }
					else{flag=1}
            } 
            else{flag=1} 
                   });   
    }
    if(flag == 0) {return false;}
    if(flag == 1) {return true;}

})
    }
}


//保存前检测
function beforeSaveEdit () {
    var mstform = Ext.getCmp('p_form0000700456_m');
	var dgrid = Ext.getCmp('p_form0000700456_dgrid');
	var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    var xm = mstform.getItem('pc').getValue();
    var lx = mstform.getItem('u_yskzbglx').getValue();
    var flag=0
    if(lx=='1'){
    callServer('pdzc', [{ 'pc': xm}], function (res) {
        if(res.count>0) {
        var kzzl=res.record[0].bill_no
		Ext.MessageBox.show({
			title:'提示',
			msg: '该项目已存在预算控制总量单据['+kzzl+']，请调整类型为变更',
			modal: false
		});
        flag=1}
		})  
		
		var a=dgrid.getStore().getRange(0, dstore.getCount() - 1); 
		
		for(i=0;i<a.length;i++){
			if(a[i].get('qty')>0 && a[i].get('amt')<=0){
				Ext.MessageBox.show({
					title:'提示',
					msg: '第'+i+'行原数量大于0原金额必须大于0',
					modal: false
				});
				flag=1
			}
		}
	 }
	 
	
	 
	 
	 
    if(flag == 1) {
		return false;
	}
	if(flag == 0) {
		return true;
	}
    }


