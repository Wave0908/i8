function allReadyEdit() 
{      
    var mstform = Ext.getCmp('p_form0000000251_m');      
    
    

    if (otype == $Otype.ADD) 
    {

        var jbr=mstform.getItem('fillpsn').getValue();    
        callServer('Getygxm', [{fphid:jbr}], function (res) 
        {  
            if(res.record[0])
            {  
                mstform.getItem('title').setValue($appinfo.username + '发起的项目资金付款审批流程');             
                mstform.getItem('deptid').setValue(res.record[0]['phid']);
                BatchBindCombox([mstform.getItem('deptid')]); 
                //alert(xm1);  
            } 
        })
        
    }
}