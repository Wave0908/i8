function allReadyEdit(){
   
  var mstform = Ext.getCmp('p_form0000000079_m');
     
var dgrid = Ext.getCmp('p_form0000000079_dgrid');
    
 var dstore = dgrid.store;

  dgrid.addListener('edit', function (editor, e) { 
  var ab=0;
       if (e.originalValue == e.value) { 
            return;
        }


   if (e.field == 'pm_ryzj') { 
            var record = e.record;
            callServer('pmry',[{'b':record.get('pm_ryzj')}],function(res){   
              if(res.record[0]){    //判断是否为空
                  record.set('pm_rybm',res.record[0].cno);   
                  record.set('pm_rymc',res.record[0].cname);    
                  record.set('pm_zzbm',res.record[0].ocode);  
                  record.set('pm_zzmc',res.record[0].oname);     				  
               }
                 })
                             }							 
				   

})
}




