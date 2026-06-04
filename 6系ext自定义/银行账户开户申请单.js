function allReadyEdit() 
{      
    var mstform = Ext.getCmp('p_form0000600068_m');      
    
    

    if (otype == $Otype.ADD) 
    {

        var jbr=mstform.getItem('phid_fill_psn').getValue();  
        mstform.getItem('bill_name').setValue($appinfo.username + '发起的银行账户开户申请');           
        
    }

    mstform.getItem('gj').setValue(1);
    BatchBindCombox([mstform.getItem('gj')]);	
    mstform.getItem('sheng').on('beforetriggerclick', function () {
        mstform.getItem('shi').setValue();        
        if (mstform.getItem('gj').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择国家');
            return false;
        }
    });
    mstform.getItem('shi').on('beforetriggerclick', function () {        
        if (mstform.getItem('sheng').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择省份');
            return false;
        }
        mstform.getItem('shi').setOutFilter({
            pid: mstform.getItem('sheng').getValue()
        })
    });
    mstform.getItem('qx').on('beforetriggerclick', function () {        
        if (mstform.getItem('shi').getValue() == '') {
            Ext.Msg.alert('提示', '请先选择城市');
            return false;
        }
        mstform.getItem('qx').setOutFilter({
            pid: mstform.getItem('shi').getValue()
        })
    });

}