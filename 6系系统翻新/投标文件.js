function AllReady() {
    var mstform = Ext.getCmp('TendFile');
    console.log("ready");


    //单据新增触发条件


    if (otype == $Otype.ADD || otype == $Otype.EDIT) {

        mstform.getItem('PcNo').addListener('change', function (res) {
            var pc_no = mstform.getItem('PcNo').getValue();

            execServer('tbwj', {
                pc_no: pc_no
            }, function (res) {
                console.log(res);
            });

        })

        mstform.getItem('user_tbje').addListener('change', function (res) {
            var user_tbje = mstform.getItem('user_tbje').getValue();
            if (user_tbje > 100000) {
                mstform.getItem('user_tbje').setValue(0);
                Ext.Msg.alert('提示', '投标金额不能超过100000万元');
            }
        })
    }
}