function AllReady() {
    var dgrid = Ext.getCmp('hr3_pr_pay_data_det_id');
    var dstore = dgrid.store;

    dstore.on('load', function () {
        Ext.Array.each(dstore.data.items, function (rowdata) {
            var cno = rowdata.get('CNo');
                execServer('getyglwgs', {
                    'cno': cno
                }, function (res) {
                    if(!Ext.isEmpty(res) && res.data[0]){
                        rowdata.set('user_lwpqdw',res.data[0].phid);
                        rowdata.set('user_lwpqdw_name',res.data[0].sendplace);
                    }
                })
        })
    })

}
