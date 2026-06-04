function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700732_m');
    var dgrid = Ext.getCmp('p_form0000700732_dgrid');
    
    if (!dgrid) {
        console.error('明细表组件未找到!');
        return;
    }
    mstform.getItem('u_gsmc').addListener('helpselected', function () {
                var gsmc = mstform.getItem('u_gsmc').getRawValue();
                //var pc  = mstform.getItem('pc').getRawValue();
                //修改标题
                mstform.getItem('title').setValue(gsmc +"BIM奖项信息填报");
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
    dgrid.addListener('edit', function(editor, e) {
        // 检查是否是u_dsmc字段被编辑
        console.log("e.field :",e.field);
        if (e.field === 'u_dsmc') {
            console.log('u_dsmc字段已编辑，新值:', e.value);
            
            // 获取对应值
            var targetValue = valueMappings[e.value];
            
            if (targetValue) {
                // 更新同一行的u_zbdw字段
                e.record.set('u_zbdw', targetValue);
                
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
                e.record.set('u_zbdw', '');
                
                try {
                    dgrid.getColumn('u_zbdw').getEditor().setDisabled(false);
                    console.log('已启用u_zbdw字段编辑');
                } catch (error) {
                    console.log('启用u_zbdw编辑失败:', error);
                }
                
                console.log('没有匹配的映射关系，清空u_zbdw字段');
            }
        }
    });
    //dgrid.setMustInputCol('asr_flg',true);
    console.log('明细表字段联动已初始化（多映射版）');
}





//修改，增加附件必填