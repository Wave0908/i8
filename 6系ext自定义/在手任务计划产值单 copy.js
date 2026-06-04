function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700249_m');
    var grid = Ext.getCmp('p_form0000700249_dgrid');
    var dstore = grid.store;
    var dstore1 = mstform.store;

    // 初始化月份
    const months = Array.from({ length: 12 }, (_, i) => ({ textcol_1: (i + 1).toString() }));
    dstore.add(months);

    // 获取字段
    var pc = mstform.getItem('pc');
    var nfField = mstform.getItem('userhelp_2');

    // 监听年份
    pc.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        if (Ext.isEmpty(nfField.getValue())) {
            Ext.Msg.alert('提示', '请先选择年份');
            return false;
        }
        return true;
    });

    // 根据年份过滤项目
    nfField.addListener('itemchanged', function (obj) {
        var nf = nfField.getValue();
        if (!nf) {
            pc.setClientSqlFilter('1=0');
            return;
        }

        callServer('ndxmgl', [{ 'nf': nf }], function (res) {
            if (res.record && res.record.length > 0) {
                // 确保pc是纯数字
                const excludedPCs = res.record
                    .map(item => item.pc)
                    .filter(pc => /^\d+$/.test(pc)) // 确保是数字
                    .join(',');

                if (excludedPCs) {
                    pc.setClientSqlFilter(`phid not in (${excludedPCs})`);
                } else {
                    pc.setClientSqlFilter('1=1');//返回全部数据
                }
            } else {
                pc.setClientSqlFilter('1=1');
            }
        });
    });
}


