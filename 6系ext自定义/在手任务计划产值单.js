function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700249_m');
    var grid = Ext.getCmp('p_form0000700249_d');
    var dstore = grid.store;
    //var dstore1 = mstform.store;

    // 初始化月份
    const months = Array.from({ length: 12 }, (_, i) => ({ textcol_1: (i + 1).toString() }));
    dstore.add(months);

    // 获取字段
    var pc = mstform.getItem('phid_pc');
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
        console.log("nf:", nf);
        execServer('p_form0000700249_ndxmgl', { 'nf': nf }, function (res) {
            console.log("res:",res);
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                // 确保pc是纯数字
                console.log("data1:",data1);
                const excludedPCs = data1
                    .map(item => item.extendObjects.phid_pc)
                    .filter(pc => /^\d+$/.test(pc)) // 确保是数字
                    .join(',');
                console.log("excludedPCs:",excludedPCs);
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


