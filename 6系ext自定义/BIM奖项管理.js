function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700732_m');
    var dgrid = Ext.getCmp('p_form0000700732_d');

    if (!dgrid) {
        console.error('明细表组件未找到!');
        return;
    }
    mstform.getItem('u_gsmc').addListener('helpselected', function () {
        var gsmc = mstform.getItem('u_gsmc').getRawValue();
        //var pc  = mstform.getItem('pc').getRawValue();
        //修改标题
        mstform.getItem('bill_name').setValue(gsmc + "BIM奖项信息填报");
    });
    // 定义u_dsmc到u_zbdw的映射关系
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
    // 监听单元格编辑事件
    dgrid.getColumn('u_dsmc_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        // dgrid.addListener('edit', function(editor, e) {
        // 检查是否是u_dsmc字段被编辑
        // 选择gs单位 带出 浪潮的数据
        var data = dgrid.getSelectionModel().getSelection();
        var u_dsmc = data[0].data.u_dsmc;
        console.log('u_dsmc字段已编辑，新值:', u_dsmc);
        // 获取对应值
        var targetValue = valueMappings[u_dsmc];
        if (targetValue) {
            // 更新同一行的u_zbdw字段
            data[0].set('u_zbdw', targetValue);
            // 禁用u_zbdw字段编辑
            try {
                dgrid.getColumn('u_zbdw').getEditor().setDisabled(true);
                console.log(`已禁用u_zbdw字段编辑，值已设为: ${targetValue}`);
            } catch (error) {
                console.log('禁用u_zbdw编辑失败:', error);
                // 备选方案：移除编辑器
                try {
                    dgrid.getColumn('u_zbdw').editor = null;
                    console.log('已移除u_zbdw编辑器');
                } catch (err) {
                    console.log('移除u_zbdw编辑器失败:', err);
                }
            }
        } else {
            // 如果没有匹配的映射，清空u_zbdw字段并启用编辑
            data[0].set('u_zbdw', null);

            try {
                dgrid.getColumn('u_zbdw').getEditor().setDisabled(false);
                console.log('已启用u_zbdw字段编辑');
            } catch (error) {
                console.log('启用u_zbdw编辑失败:', error);
            }

            console.log('没有匹配的映射关系，清空u_zbdw字段');
        }

    });
    //dgrid.setMustInputCol('asr_flg',true);
    console.log('明细表字段联动已初始化（多映射版）');
}





//修改，增加附件必填