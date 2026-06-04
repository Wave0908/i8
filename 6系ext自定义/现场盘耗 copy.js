function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000091_m');
 mstform.getItem('iscost').setValue('0');

var dgrid = Ext.getCmp('p_form0000000091_dgrid');
    var dstore = dgrid.store;
dgrid.setReadOnlyCol('spec',true);
dgrid.setReadOnlyCol('c_name',true);
dgrid.setReadOnlyCol('msunit',true);
 var is_flg=0;

//选择项目仓库清空
mstform.getItem('pc').addListener('helpselected', function (){ 
 mstform.getItem('xmck').setValue()  })
//根据项目选择仓库
    mstform.getItem('xmck').on('beforetriggerclick',function(eOp,ignoreBeforeEvent){
      if( mstform.getItem('pc').getValue()==''){
          Ext.Msg.alert('提示', '请先选择组织'); 
          return false;
          }
         mstform.getItem('xmck').setOutFilter({pc:mstform.getItem('pc').getValue()});
         });


mstform.getItem('yf').on('beforetriggerclick',function(eOp,ignoreBeforeEvent){

      if( mstform.getItem('nd').getValue()=='')
         {
          Ext.Msg.alert('提示', '请先选择年度'); 
          return false;
          }
        
      if( mstform.getItem('xmck').getValue()=='')
          {
          Ext.Msg.alert('提示', '请先选择项目仓库'); 
          return false;
          }
         });

    
//选择月份
mstform.getItem('cbsid').addListener('helpselected', function() {
        Ext.Array.each(dstore.data.items, function(record) {                  
        record.set('cbsid',mstform.getItem('cbsid').getValue());
        record.set('cbsid_name',mstform.getItem('cbsid').getRawValue());
        });
        });
mstform.getItem('yf').addListener('helpselected', function (){ 
   callServer('czts', [{ 'pc': mstform.getItem('pc').getValue(),'ck': mstform.getItem('xmck').getValue() ,'nd': mstform.getItem('nd').getValue() ,'yf': mstform.getItem('yf').getValue()  }], function (res) {
       
           is_flg=res.record[0].sl;
         
          });
       if(is_flg>0){
          dstore.removeAll(); 
       Ext.Msg.alert('提示', '该仓库本月份已经做过报耗单'); 
      mstform.getItem('yf').setValue('') ;
      return;

         }
 execServer('mxsj',{ 'pc': mstform.getItem('pc').getValue(),'ck': mstform.getItem('xmck').getValue()  },      
                    function (res) {	
                                var arr = new Array();                      
                           for (i = 0; i <  res.data.length ; i++) { 
							   if(res.data[i].cksl>0){
								  arr.push({
								  phid_itemdata:res.data[i].phid_itemid,
								  itemid: res.data[i].phid_itemid,
								  c_name: res.data[i].name,
								  spec:res.data[i].spec,
								  msunit_name:res.data[i].msname,
								  wbscode:res.data[i].phid_wbs,
								  wbscode_name:res.data[i].description,
								  cbsid:res.data[i].phid_cbs,
								  cbsid_name:res.data[i].cbs_name,
								  ph:res.data[i].batchno,
								  numericcol_3:res.data[i].sqsl,
								  cksl:res.data[i].cksl,
								  prc:res.data[i].prc,
								  qmsys:Ext.Number.from(res.data[i].cksl,0)+Ext.Number.from(res.data[i].sqsl,0),
								  qty:Ext.Number.from(res.data[i].cksl,0)+Ext.Number.from(res.data[i].sqsl,0),
								  amt:(Ext.Number.from(res.data[i].sqsl,0)+Ext.Number.from(res.data[i].cksl,0))*Ext.Number.from(res.data[i].prc,0),
								  sygjje:(Ext.Number.from(res.data[i].sqsl,0)+Ext.Number.from(res.data[i].cksl,0))*Ext.Number.from(res.data[i].prc,0)        
								                }); 
							   }        				
		    }
                     dstore.removeAll(); 
                     dstore.insert(dstore.getCount(),arr);                           
    });
});
   dgrid.addListener('edit', function (editor, e) {  //监听单据体编辑状态

		if (e.originalValue == e.value) { //判断原值与新值是否相同
            return;
            }
        if (e.field == 'numericcol_2') { //监听qty、prc、numericcol_2字段变化
            var record = e.record;        
	    record.set('qty', Ext.Number.from(record.get('qmsys'), 0)-Ext.Number.from(record.get('numericcol_2'), 0));  //计算numericcol_1值         
            record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));  //计算amt值
             record.set('sygjje', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0)); 
            if(record.get('numericcol_2')>record.get('qmsys')){
              Ext.Msg.alert('提示', '盘点数量不能大于应存数量');
           record.set('numericcol_2', 0); 
           record.set('qty', Ext.Number.from(record.get('qmsys'), 0)-Ext.Number.from(record.get('numericcol_2'), 0));  //计算numericcol_1值
            record.set('amt', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));  //计算amt值
             record.set('sygjje', Ext.Number.from(record.get('prc'), 0) * Ext.Number.from(record.get('qty'), 0));
             return;  }

        } 
       });
 dgrid.getColumn('numericcol_2').getEditor().minValue=0;
 

}



     


