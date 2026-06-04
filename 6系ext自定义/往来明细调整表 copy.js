function allReadyEdit() { //页面编辑方法，固定写法
	//获取容器，固定写法
	var mstform = Ext.getCmp('p_form0000700500_m');
	//获取表体容器
	var dgrid = Ext.getCmp('p_form0000700500_dgrid');
    var dgrid1 = Ext.getCmp('p_form0000700500_d1grid');
	var Toolbar = Ext.getCmp('toolbar');
    var tabPanel = Ext.getCmp('tabPanel');
	var dstore = dgrid.store;
    var dstore1 = dgrid1.store;
	if (otype == $Otype.ADD) {
	var ywlx=mstform.getItem('u_ywlx').getValue()
	if(ywlx=='')
	{
	//隐藏变更后往来明细列
	dgrid.hideColumn('u_kxxz',true);
	dgrid.hideColumn('u_kxxz_name',true);
	dgrid.hideColumn('amt',true);
	dgrid.hideColumn('u_yfkhxje',true);
	dgrid.hideColumn('u_yfkhxhje',true);
	dgrid.hideColumn('u_htmc',true);
	dgrid.hideColumn('u_htmc_name',true);
	dgrid.hideColumn('u_wldw',true);
	dgrid.hideColumn('u_wldw_name',true);
	dgrid.hideColumn('u_kxxz_2',true);
	dgrid.hideColumn('u_kxxz_2_name',true);
	dgrid.hideColumn('u_je',true);

	//隐藏原往来明细列
	dgrid1.hideColumn('u_kxxz_old',true);
	dgrid1.hideColumn('u_kxxz_old_name',true);
	dgrid1.hideColumn('amt',true);
	dgrid1.hideColumn('u_yfkhxje_old',true);
	dgrid1.hideColumn('u_yfkhxhje_old',true);
	dgrid1.hideColumn('u_htmc_old',true);
	dgrid1.hideColumn('u_htmc_old_name',true);
	dgrid1.hideColumn('u_wldw_old',true);
	dgrid1.hideColumn('u_wldw_old_name',true);
	dgrid1.hideColumn('u_kxxz2_old',true);
	dgrid1.hideColumn('u_kxxz2_old_name',true);
	dgrid1.hideColumn('u_je_old',true);
    }
	if(ywlx=='1'||ywlx=='10'||ywlx=='17'||ywlx=='2'){
	dgrid1.hideColumn('u_kxxz_old',true);
	dgrid1.hideColumn('u_kxxz_old_name',false);
	dgrid1.hideColumn('amt',false);
	dgrid1.hideColumn('u_yfkhxje_old',false);
	dgrid1.hideColumn('u_yfkhxhje_old',false);
	dgrid1.hideColumn('u_htmc_old',true);
	dgrid1.hideColumn('u_htmc_old_name',true);
	dgrid1.hideColumn('u_wldw_old',true);
	dgrid1.hideColumn('u_wldw_old_name',true);
	dgrid1.hideColumn('u_kxxz2_old',true);
	dgrid1.hideColumn('u_kxxz2_old_name',true);
	dgrid1.hideColumn('u_je_old',true);

	dgrid.hideColumn('u_kxxz',true);
	dgrid.hideColumn('u_kxxz_name',false);
	dgrid.hideColumn('amt',false);
	dgrid.hideColumn('u_yfkhxje',false);
	dgrid.hideColumn('u_yfkhxhje',false);
	dgrid.hideColumn('u_htmc',true);
	dgrid.hideColumn('u_htmc_name',true);
	dgrid.hideColumn('u_wldw',true);
	dgrid.hideColumn('u_wldw_name',true);
	dgrid.hideColumn('u_kxxz_2',true);
	dgrid.hideColumn('u_kxxz_2_name',true);
	dgrid.hideColumn('u_je',true);

	}
	if(ywlx!='1'&&ywlx!='10'&&ywlx!='17'&&ywlx!='2'&&ywlx!=''){
    //隐藏变更后往来明细列
	dgrid.hideColumn('u_kxxz',true);
	dgrid.hideColumn('u_kxxz_name',true);
	dgrid.hideColumn('amt',true);
	dgrid.hideColumn('u_yfkhxje',true);
	dgrid.hideColumn('u_yfkhxhje',true);
	dgrid.hideColumn('u_htmc',true);
	dgrid.hideColumn('u_htmc_name',false);
	dgrid.hideColumn('u_wldw',true);
	dgrid.hideColumn('u_wldw_name',false);
	dgrid.hideColumn('u_kxxz_2',true);
	dgrid.hideColumn('u_kxxz_2_name',false);
	dgrid.hideColumn('u_je',false);

//隐藏原往来明细列
	dgrid1.hideColumn('u_kxxz_old',true);
	dgrid1.hideColumn('u_kxxz_old_name',true);
	dgrid1.hideColumn('amt',true);
	dgrid1.hideColumn('u_yfkhxje_old',true);
	dgrid1.hideColumn('u_yfkhxhje_old',true);
	dgrid1.hideColumn('u_htmc_old',true);
	dgrid1.hideColumn('u_htmc_old_name',false);
	dgrid1.hideColumn('u_wldw_old',true);
	dgrid1.hideColumn('u_wldw_old_name',false);
	dgrid1.hideColumn('u_kxxz2_old',true);
	dgrid1.hideColumn('u_kxxz2_old_name',false);
	dgrid1.hideColumn('u_je_old',false);
	}
	}

	if (otype == $Otype.EDIT ){	
		mstform.getItem ('ocode').userSetReadOnly(true);
		mstform.getItem ('pc').userSetReadOnly(true);
		mstform.getItem ('u_chzt').userSetReadOnly(true);
			
	}
	

	
//选择采购入库触发
mstform.getItem('u_crkdj').on('beforetriggerclick', function (obj) {
    var xm=mstform.getItem('pc').getValue()
	var ch=mstform.getItem('u_chzt').getValue()
	var ywlx=mstform.getItem('u_ywlx').getValue()
    if(Ext.isEmpty(mstform.getItem('pc').getValue())){
        Ext.Msg.alert('提示', '请先维护工程项目');
        return false;
    }
	if(Ext.isEmpty(mstform.getItem('u_chzt').getValue())){
        Ext.Msg.alert('提示', '请先选择冲红状态');
        return false;
    }
	if(Ext.isEmpty(mstform.getItem('u_ywlx').getValue())){
        Ext.Msg.alert('提示', '请先选择业务类型');
        return false;
    }
    mstform.getItem('u_crkdj').setOutFilter({ phid_pc:xm,wrioffflg:ch,phid_transno:ywlx});
    
});

//带出入库单据中的往来明细
mstform.getItem('u_crkdj').on('helpselected', function (obj) {
    var crkdj = mstform.getItem('u_crkdj').getValue()
	mstform.getItem ('pc').userSetReadOnly(true); 
	mstform.getItem ('ocode').userSetReadOnly(true); 
	mstform.getItem ('u_chzt').userSetReadOnly(true);
	mstform.getItem ('u_ywlx').userSetReadOnly(true);
	callServer('ywlx', [{'crk': crkdj}], function (res){ 
		if(res.count>0){
		  mstform.getItem('u_jshj').setValue(res.record[0].tax_amount);
		  mstform.getItem('u_ywlx').setValue(res.record[0].phid_transno);
		  BatchBindCombox([mstform.getItem('u_ywlx')]);  
		}
	});

	var ywlx = mstform.getItem('u_ywlx').getValue()
	if(ywlx=='1'||ywlx=='10'||ywlx=='17'||ywlx=='2'){
		callServer('wlmx1', [{ 'crk': crkdj}], function (res1) {
			dgrid1.hideColumn('u_kxxz_old',true);
			dgrid1.hideColumn('u_kxxz_old_name',false);
	        dgrid1.hideColumn('amt',false);
	        dgrid1.hideColumn('u_yfkhxje_old',false);
	        dgrid1.hideColumn('u_yfkhxhje_old',false);
			dgrid1.hideColumn('u_htmc_old',true);
	        dgrid1.hideColumn('u_htmc_old_name',true);
	        dgrid1.hideColumn('u_wldw_old',true);
	        dgrid1.hideColumn('u_wldw_old_name',true);
	        dgrid1.hideColumn('u_kxxz2_old',true);
	        dgrid1.hideColumn('u_kxxz2_old_name',true);
	        dgrid1.hideColumn('u_je_old',true);

			dgrid.hideColumn('u_kxxz',true);
			dgrid.hideColumn('u_kxxz_name',false);
	        dgrid.hideColumn('amt',false);
	        dgrid.hideColumn('u_yfkhxje',false);
	        dgrid.hideColumn('u_yfkhxhje',false);
			dgrid.hideColumn('u_htmc',true);
	        dgrid.hideColumn('u_htmc_name',true);
	        dgrid.hideColumn('u_wldw',true);
	        dgrid.hideColumn('u_wldw_name',true);
	        dgrid.hideColumn('u_kxxz_2',true);
	        dgrid.hideColumn('u_kxxz_2_name',true);
	        dgrid.hideColumn('u_je',true);

			dstore.removeAll();          //清空表体
			dstore1.removeAll();          //清空表体
		
		//带出原往来明细
		var arr = new Array();
		 for (i = 0; i < res1.count ; i++) {                        
		 arr.push({
			textcol_2:res1.record[i].phid,
			u_kxxz_old:res1.record[i].kxxz,
			u_kxxz_old_name:res1.record[i].kxxz_name,
			amt:res1.record[i].cgje,
			u_yfkhxje_old:res1.record[i].yfkhxje,
			u_yfkhxhje_old:res1.record[i].yfkhxhje,
			remarks:res1.record[i].remark,
		 });    
				   } 
		dstore1.insert(dstore1.getCount(),arr);

		//填入变更后往来明细		   
		var arr1 = new Array();
		for (i = 0; i < res1.count ; i++) {                        
		arr1.push({
		    textcol_2:res1.record[i].phid,
			u_kxxz:res1.record[i].kxxz,
			u_kxxz_name:res1.record[i].kxxz_name,
			amt:res1.record[i].cgje,
			u_yfkhxje:res1.record[i].yfkhxje,
			u_yfkhxhje:res1.record[i].yfkhxhje,
			remarks:res1.record[i].remark,
			u_ymx:'1'
				   });    
							 } 		   
		 dstore.insert(dstore1.getCount(),arr1); 
				   
				}); 
	}

	else{callServer('wlmx2', [{ 'crk': crkdj}], function (res1) { 
		//隐藏变更后往来明细列
	    dgrid.hideColumn('u_kxxz',true);
	    dgrid.hideColumn('u_kxxz_name',true);
	    dgrid.hideColumn('amt',true);
	    dgrid.hideColumn('u_yfkhxje',true);
	    dgrid.hideColumn('u_yfkhxhje',true);
	    dgrid.hideColumn('u_htmc',true);
	    dgrid.hideColumn('u_htmc_name',false);
	    dgrid.hideColumn('u_wldw',true);
	    dgrid.hideColumn('u_wldw_name',false);
	    dgrid.hideColumn('u_kxxz_2',true);
	    dgrid.hideColumn('u_kxxz_2_name',false);
	    dgrid.hideColumn('u_je',false);

	//隐藏原往来明细列
	    dgrid1.hideColumn('u_kxxz_old',true);
	    dgrid1.hideColumn('u_kxxz_old_name',true);
	    dgrid1.hideColumn('amt',true);
	    dgrid1.hideColumn('u_yfkhxje_old',true);
	    dgrid1.hideColumn('u_yfkhxhje_old',true);
	    dgrid1.hideColumn('u_htmc_old',true);
	    dgrid1.hideColumn('u_htmc_old_name',false);
	    dgrid1.hideColumn('u_wldw_old',true);
	    dgrid1.hideColumn('u_wldw_old_name',false);
	    dgrid1.hideColumn('u_kxxz2_old',true);
	    dgrid1.hideColumn('u_kxxz2_old_name',false);
	    dgrid1.hideColumn('u_je_old',false);
		
		
		dstore1.removeAll();          //清空表体
		dstore.removeAll();          //清空表体

	//带出原往来明细	
	var arr = new Array();
	 for (i = 0; i < res1.count ; i++) {                        
	 arr.push({
		textcol_2:res1.record[i].phid,
		u_htmc_old:res1.record[i].htmc,
		u_htmc_old_name:res1.record[i].htmc_name,
		u_wldw_old:res1.record[i].wldw,
		u_wldw_old_name:res1.record[i].wldw_name,
		u_kxxz2_old:res1.record[i].kxxz,
		u_kxxz2_old_name:res1.record[i].kxxz_name,
		u_je_old:res1.record[i].amt,
		remarks:res1.record[i].remark,
	 });    
			   }
	dstore1.insert(dstore1.getCount(),arr);

	var arr1 = new Array();
	 for (i = 0; i < res1.count ; i++) {                        
	 arr1.push({
		textcol_2:res1.record[i].phid,
		u_htmc:res1.record[i].htmc,
		u_htmc_name:res1.record[i].htmc_name,
		u_wldw:res1.record[i].wldw,
		u_wldw_name:res1.record[i].wldw_name,
		u_kxxz_2:res1.record[i].kxxz,
		u_kxxz_2_name:res1.record[i].kxxz_name,
		u_je:res1.record[i].amt,
		remarks:res1.record[i].remark,
		u_ymx:'1'
	 });    
				}            		 
	 
	 dstore.insert(dstore1.getCount(),arr1);
			   
			}); }
    

});


tabPanel.on('tabchange', function (tabchange, newCard, oldCard, eOpts) {
    //切换页面为“原往来明细”，隐藏按钮
  if (newCard.id == 'p_form0000700500_d1grid') {
    var Toolbar = Ext.getCmp('toolbar');
    Toolbar.get("addrow").hide();
    Toolbar.get("insertrow").hide();
    Toolbar.get("deleterow").hide();   
   };

if (newCard.id == 'p_form0000700500_dgrid'){
    var Toolbar = Ext.getCmp('toolbar');
    Toolbar.get("addrow").show ();
    Toolbar.get("insertrow").show ();
    Toolbar.get("deleterow").show (); 
}
})



//增行自动生成phid
Toolbar.get('addrow').on('click',function(){  
    var sl=dstore.getCount()-1
    callServer('phid', [{} ], function (res1) {                                                                        
   dstore.getAt(sl).set('textcol_2',res1.record[0].phid )});
   dstore.getAt(sl).set('u_ymx','0' )


        
});





}



