function allReadyEdit() {

    var mstform = Ext.getCmp('p_form0000000079_m');
    var dgrid = Ext.getCmp('p_form0000000079_d');
    var dstore = dgrid.store;

    var Toolbar = Ext.getCmp('toolbar');

    dgrid.getColumn('pm_ryzj_EXName').getEditor().addListener('beforetriggerclick', function () {
        var zjArray = []; //出库金额
        Ext.Array.each(dstore.data.items, function (record) {
            if (record.get('pm_ryzj') != '') {
                zjArray.push(record.get('pm_ryzj'))
            }
        })
        var zj = zjArray.join(',');
        if (zj) {
            dgrid.getColumn('pm_ryzj_EXName').getEditor().setClientSqlFilter("phid not in (" + zj + ")");
        }
    });

    dgrid.getColumn('pm_ryzj_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var row = dgrid.getSelectionModel().getSelection();
        var id = row[0].data.pm_ryzj;
        execServer('p_form0000000079_pmry', { 'b': id }, function (res) {
            if (res.count > 0) {    //判断是否为空
                var data = JSON.parse(res.data)
                console.log('data===============>', data)
                row[0].set('pm_rybm', data[0].extendObjects.bill_no);
                row[0].set('pm_rybm_EXName', data[0].extendObjects.bill_name);
                row[0].set('pm_rymc', data[0].extendObjects.bill_name);
                row[0].set('pm_zzbm', data[0].extendObjects.ocode);
                row[0].set('pm_zzmc', data[0].extendObjects.oname);
            }
        })
    });

    // if (Toolbar) {
    //     Toolbar.insert({
    //         id: 'clear',
    //         text: '清除',
    //         iconCls: 'icon-clear',
    //         handler: function () {
    //             var row = dgrid.getSelectionModel().getSelection();
    //             row[0].set('pm_ryzj', '');
    //             row[0].set('pm_ryzj_EXName', '');
    //             row[0].set('pm_rybm', '');
    //             row[0].set('pm_rybm_EXName', '');
    //             row[0].set('pm_rymc', '');
    //             row[0].set('pm_zzbm', '');
    //             row[0].set('pm_zzmc', '');
    //         }
    //     }, 1);
    // }
    Toolbar.get('u_clear').on('click', function () {
        var row = dgrid.getSelectionModel().getSelection();
        row[0].set('pm_ryzj', '');
        row[0].set('pm_ryzj_EXName', '');
        row[0].set('pm_rybm', '');
        row[0].set('pm_rybm_EXName', '');
        row[0].set('pm_rymc', '');
        row[0].set('pm_zzbm', '');
        row[0].set('pm_zzmc', '');
    });

}