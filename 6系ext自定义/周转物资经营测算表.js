function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700358_m');
    console.log("mstform:", mstform);

    if (otype == $Otype.ADD) {
        var jbr = mstform.getItem('phid_fill_psn').getValue();
        execServer('p_form0000700358_Getygxm', { fphid: jbr }, function (res) {
            if (res.count > 0) {
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data:",data);
                if(data[0].extendObjects['phid']){
                    mstform.getItem('deptid').setValue(data[0].extendObjects['phid']);
                    BatchBindCombox([mstform.getItem('deptid')]);
                }
                //alert(xm1);  
            }
        })
    }

}





