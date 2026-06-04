
function AllReady() {

    var mstform = Ext.getCmp('formVehicleLendMain');
    mstform.getItem('user_syqx').addListener('helpselected', function () {
        var phid = mstform.getItem('user_syqx').getValue();
        //var sql_cl = "select phid from fg_simple_data where c_type = 'clsyqx' and phid in (select pid from fg_simple_data where c_type = 'clsyqx')"
        var ctype = "clsyqx" + '';
        var arr = new Array();
        execServer('sfzdcsyqx', {
            'c_type': "'" + ctype + "'"
        }, function (res) {
            if (res) {
                var data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    if (data.length != 0) {
                        for (i = 0; i < data.length; i++) {
                            arr.push(data[i].extendObjects.phid)
                        }
                    }
                }
            }
        });
        if (arr.includes(phid)) {
            Ext.Msg.alert('提示', '请重新选择一项末级的使用情形');
            mstform.getItem('user_syqx').setValue('');
        }
    })

}

/*
could not execute query 
[ select phid from fg_simple_data where c_type = clsyqx and phid in (select pid from fg_simple_data where c_type = 'clsyqx') ] 
[SQL: select phid from fg_simple_data where c_type = clsyqx and phid in (select pid from fg_simple_data where c_type = 'clsyqx')] 列名 'clsyqx' 无效。

*/

