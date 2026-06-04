function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700591_m');
    var dgrid = Ext.getCmp('p_form0000700591_d');
    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'u_ndyysrmbz' || e.field == 'u_yysr' || e.field == 'u_zb1' || e.field == 'u_ndlrmbz' || e.field == 'u_lr' || e.field == 'u_zb') {
            var record = e.record;
            record.set('u_zb1', Ext.Number.from(record.get('u_yysr'), 0) / Ext.Number.from(record.get('u_ndyysrmbz'), 0));//营业收入占比
            record.set('u_zb', Ext.Number.from(record.get('u_lr'), 0) / Ext.Number.from(record.get('u_ndlrmbz'), 0));//利润占比
        };
    });
}