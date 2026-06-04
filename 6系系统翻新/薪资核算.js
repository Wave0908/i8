    function AllReady() {
        var dgrid = Ext.getCmp('hr3_pr_pay_data_det_id');
        var dstore = dgrid.store;

        dstore.on('load', function () {
            Ext.Array.each(dstore.data.items, function (rowdata) {
                var cno = rowdata.data.Cno;
                    execServer('getyglwgs', {
                        'cno': cno
                    }, function (res) {
                        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                        if(data.length!=0){
                            rowdata.set('user_lwpqdw',data[0].extendObjects.phid);
                            rowdata.set('user_lwpqdw_name',data[0].extendObjects.sendplace);
                        }
                    })
            })
        })

    }
