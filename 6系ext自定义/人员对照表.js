function allReadyEdit() {

    var mstform = Ext.getCmp('p_form0000000079_m');

    var dgrid = Ext.getCmp('p_form0000000079_d');

    var dstore = dgrid.store;

    dgrid.addListener('edit', function (editor, e) {
        var ab = 0;
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'pm_ryzj') {
            var record = e.record;
            execServer('p_form0000000079_pmry',
                { 'b': record.get('pm_ryzj') }, function (res) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    if (res.count>0) {    //判断是否为空
                        record.set('pm_rybm', data[0].extendObjects.cno);
                        record.set('pm_rymc', data[0].extendObjects.cname);
                        record.set('pm_zzbm', data[0].extendObjects.ocode);
                        record.set('pm_zzmc', data[0].extendObjects.oname);
                    }
                })
        }


    })
}




