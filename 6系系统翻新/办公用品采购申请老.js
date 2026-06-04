function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700258_m');
    var dgrid = Ext.getCmp('p_form0000700258_dgrid');




    dgrid.getColumn('u_mc_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var name = "'" + data[0].get('u_mc_name') + "'";
        callServer('wpxx', [{
            'name': name
        }], function (res) {
            console.log(res);
            if (res.record[0]) {
                data[0].set('u_ggxh', res.record[0].stand);
                data[0].set('u_dj', res.record[0].guideprice);
                data[0].set('u_dw', res.record[0].msname);

            }

        });
    })
    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) { return; }
        if (e.field == 'u_sl') {
            var record = e.record;
            record.set('u_jexj', Ext.Number.from(record.get('u_dj'), 0) * Ext.Number.from(record.get('u_sl'), 0));
        };
    });
}





