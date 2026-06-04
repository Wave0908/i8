function allReadyEdit() { //初始化
    var mstform = Ext.getCmp('p_form0000000233_m');
    var dgrid = Ext.getCmp('p_form0000000233_dgrid');
    var dstore = dgrid.store;
    

    if (otype == $Otype.ADD) 
    { 
        var arr0 = new Array();
        arr0[0]= "项目管理费";
        arr0[1]= "劳务（工程）分包款";
        arr0[2]= "机械租赁费";
        arr0[3]= "材料费用";
        arr0[4]= "其他费用";        

        var arr = new Array();
        for (i = 0; i < 5; i++) 
        {
            arr.push({
                xmfyfl: arr0[i]                
            });
        }
        dstore.insert(dstore.getCount(), arr);
                
     }

    //监听表体，表体更新则进行相关的操作
    dgrid.addListener('edit', function (editor, e) 
    {
        //判断原值与新值是否相同
        if (e.originalValue == e.value) 
        {
            return;
        }

        if (e.field == 'prc_1' || e.field == 'prc') 
        {
            var record = e.record;
            //alert(Ext.Number.from(record.get('prc'),0));
            //alert(Ext.Number.from(record.get('qty'),0));
            record.set('amt', Ext.Number.from(record.get('prc'),0) + Ext.Number.from(record.get('prc_1'),0));
        }

    })


}
