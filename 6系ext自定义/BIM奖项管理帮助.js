function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700732_m');
    var dgrid = Ext.getCmp('p_form0000700732_d');
    if (!dgrid) {
        console.error('明细表组件未找到!');
        return; 
    }
    mstform.getItem('u_gsmc').addListener('helpselected', function () {
        var gsmc = mstform.getItem('u_gsmc').getRawValue();
        //修改标题
        mstform.getItem('bill_name').setValue(gsmc + "BIM奖项信息填报");
    });
    var valueMappings = {
        '569000000002753': '河北省建筑业协会',
        '569000000002754': '工业与信息化部人才交流中心',
        '569000000002755': '中国图学学会',
        '569000000002756': '中国勘察设计协会',
        '569000000002757': '全国智标委',
        '569000000002758': '中国建筑学会',
        '569000000002759': '中国建筑业协会',
        '569000000002760': '中国施工企业协会',
        '569000000002761': '中国市政工程协会',
        '569000000002751': '中国冶金建设协会',
        '569000000002752': '中冶集团'
    };
    console.log("valueMappings:", valueMappings);
    dgrid.getColumn('u_dsmc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        // 选择gs单位 带出 浪潮的数据
        var data = dgrid.getSelectionModel().getSelection();
        var u_dsmc = data[0].data.u_dsmc;
        console.log('u_dsmc字段已编辑，新值:', u_dsmc);
        // 获取对应值
        var targetValue = valueMappings[u_dsmc];
        if (targetValue) {
            data[0].set('u_zbdw_EXName', targetValue);
            data[0].set('u_zbdw', u_dsmc);
            // 禁用u_zbdw字段编辑
            dgrid.getColumn('u_zbdw_EXName').getEditor().setDisabled(true);
            console.log('已禁用u_zbdw字段编辑');
        } else {
            data[0].set('u_zbdw_EXName', '');
            data[0].set('u_zbdw', '');
            // 启用u_zbdw字段编辑
            dgrid.getColumn('u_zbdw').getEditor().setDisabled(false);
            console.log('已启用u_zbdw字段编辑');
        }
    });
    console.log('明细表字段联动已初始化（多映射版）');
}

