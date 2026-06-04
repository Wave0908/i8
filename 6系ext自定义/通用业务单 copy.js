function allReadyEdit() {
    //获取通用业务单表头
    var mstform = Ext.getCmp('p_form0000700341_m');


    mstform.getItem('u_dbdj').on('beforetriggerclick', function (_eOp, _ignoreBeforeEvent) { //帮助窗口打开前事件
        var u_dbck = mstform.getItem('u_dbck').getValue();
        if (Ext.isEmpty(u_dbck)) {
            Ext.Msg.alert('提示', '请先维护调拨类型');
            return false;
        }

        if (u_dbck == '18') {
            mstform.getItem('u_dbdj').setClientSqlFilter(' phid_transno = ' + u_dbck + ' and phid not in (select u_dbdj from p_form0000700341_m)');
        }

        if (u_dbck == '17') {
            mstform.getItem('u_dbdj').setClientSqlFilter(' phid_transno = ' + u_dbck + ' and phid not in (select u_dbdj from p_form0000700341_m) and phid in ( select phid_relid from kcbbd )');
        }
    });

}