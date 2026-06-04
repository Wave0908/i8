//专业分包商考核评价
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000004_m');
    var dgrid = Ext.getCmp('p_form0000000004_d');
    var dstore = dgrid.store;
    dgrid.setMustInputCol('ms', true);
    dgrid.setReadOnlyCol('glmk', true);
    var pc = mstform.getItem('phid_pc'); //物理主键
    mstform.getItem('phid_pc').userSetMustInput(true);
    console.log("mstform.getItem('phid_pc'):", mstform.getItem('phid_pc'));
    mstform.getItem('bill_name').on('focus', function () {
        Ext.Msg.alert('提示', '选择项目之后之后自动生成！');
        return false;
    });
    // mstform.getItem('bill_name').addListener('focus', function () {
    //     // 处理逻辑
    //     Ext.Msg.alert('提示', '选择项目之后之后自动生成！');
    //     return false;
    // });
    //--数据初始化--//
    if (otype == $Otype.ADD) { }
    //根据项目名称,带出表头信息
    mstform.getItem('phid_pc').addListener('helpselected', function () {
        //带入表头信息
        var pc_val = pc.getValue()
        execServer('p_form0000000004_select_XMBM_list',
            {
                'pc': pc_val
            },
            function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    for (var rskey in data[0].extendObjects) {
                        mstform.getItem(rskey).setValue(data[0].extendObjects[rskey]);
                        mstform.getItem(rskey).setReadOnly(true);
                        BatchBindCombox([mstform.getItem(rskey)]);
                    }
                }

            });
        execServer('p_form0000000004_select_CS_list',
            {
                'pc': pc_val
            },
            function (res) {
                if (res.count > 0) {
                    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                    for (var rskey in data[0].extendObjects) {
                        mstform.getItem(rskey).setValue(data[0].extendObjects[rskey]);
                        mstform.getItem(rskey).setReadOnly(true);
                    }
                }

            });
        var pc_val = mstform.getItem('phid_pc').getRawValue();
        var bgcs_val = mstform.getItem('bgcs').getValue();
        //修改标题
        mstform.getItem('bill_name').setValue(pc_val + "第[" + bgcs_val + "]次月度报告");
    });
    execServer('p_form0000000004_select_GLMK_list', {}, function (res) {
        dstore.removeAll(); //清除单据体内所有数据
        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        for (var i = 0; i < data.length-1; i++) {
            dstore.insert(dstore.getCount(), data[i].extendObjects); //将服务端获取的数组内容插入到单据体
        }

    })
};