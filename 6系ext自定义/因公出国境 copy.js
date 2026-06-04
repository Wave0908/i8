function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000169_m');
    var dgrid = Ext.getCmp('p_form0000000169_dgrid');
    var dstore = dgrid.store;

    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) {
            return;
        } //判断原值与新值是否相同
        if (e.field == 'empid') {
            var record = e.record;
            var empid = record.data.empid;
            callServer('zdxz', [{
                'phid': empid
            }], function (res) {
                record.set("xb", res.record[0].xb);
                record.set("datetimecol_1", res.record[0].datetimecol_1);
                record.set("ddlbcol_1", res.record[0].ddlbcol_1);
                record.set("textcol_2", res.record[0].textcol_2);
                record.set("textcol_3", res.record[0].textcol_3);
                record.set("textcol_4", res.record[0].textcol_4);
                record.set("textcol_5", res.record[0].textcol_5);
                record.set("textcol_6", res.record[0].textcol_6);
                record.set("textcol_7", res.record[0].textcol_7);
                record.set("userhelp_1", res.record[0].userhelp_1);
                record.set("userhelp_1_name", res.record[0].userhelp_1_name);
                record.set("userhelp_2", res.record[0].userhelp_2);
                record.set("userhelp_2_name", res.record[0].userhelp_2_name);
            });
        };
    });

}