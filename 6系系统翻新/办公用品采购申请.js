function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700258_m');
    var dgrid = Ext.getCmp('p_form0000700258_d');
    console.log("dgrid:", dgrid);

    console.log("dgrid:", dgrid);


    dgrid.getColumn('u_mc_EXName').getEditor().addListener('helpselected', function () {
        var data1 = dgrid.getSelectionModel().getSelection();
        var name = "'" + data1[0].get('u_mc_EXName') + "'";
        console.log("name:", name);
        execServer("p_form0000700258_wpxx", {
            'name': name
        }, (res) => {
            console.log("res:", res);
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            console.log("data:", data);
            const targetData = data?.map(item => {
                return item.extendObjects;
            });
            if (data[0]) {
                // data[0].extendObjects.set('u_ggxh', data[0].extendObjects.stand);
                // data[0].extendObjects.set('u_dj', data[0].extendObjects.guideprice);
                // data[0].extendObjects.set('u_dw', data[0].extendObjects.msname);
                // console.log("dgrid.getColumn('u_ggxh'):",dgrid.getColumn('u_ggxh'));
                // console.log("dgrid.getColumn('u_ggxh').getEditor():",dgrid.getColumn('u_ggxh').getEditor());
                // dgrid.getColumn('u_ggxh').setValue(data[0].extendObjects.stand);
                // dgrid.getColumn('u_dj').setValue(data[0].extendObjects.guideprice);
                // dgrid.getColumn('u_dw').setValue(data[0].extendObjects.msname);
                // data[0].extendObjects.u_ggxh = data[0].extendObjects.stand;
                // data[0].extendObjects.u_dj = data[0].extendObjects.guideprice;
                // data[0].extendObjects.u_dw = data[0].extendObjects.msname;
                data1[0].set('u_ggxh', data[0].extendObjects.stand);
                data1[0].set('u_dj', data[0].extendObjects.guideprice);
                data1[0].set('u_dw', data[0].extendObjects.msname);
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





