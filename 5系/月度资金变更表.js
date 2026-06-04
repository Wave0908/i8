function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700753_m');
    var u_ydzjdj = mstform.getItem('u_ydzjdj') 
    var u_version = mstform.getItem('u_version') // 变更版本
    // 检查表单中是否存在这两个下拉框
    if (mstform.getItem('ddlbcol_1') && mstform.getItem('ddlbcol_2')) {
        // 获取ddlbcol_1的初始值
        var initialValue = mstform.getItem('ddlbcol_1').getValue();
        console.log("ddlbcol_1的初始值:", initialValue);
        console.log("ddlbcol_1:",mstform.getItem('ddlbcol_1'));
        console.log("ddlbcol_2:",mstform.getItem('ddlbcol_2'));
        
        // 根据初始值设置ddlbcol_2的显示状态
        if (initialValue == '2') {
            mstform.getItem('ddlbcol_2').show();
        } else {
            mstform.getItem('ddlbcol_2').hide();
            // 清空ddlbcol_2的值
            mstform.getItem('ddlbcol_2').setValue('');
        }
        
        // 监听ddlbcol_1下拉框的值变化
        mstform.getItem('ddlbcol_1').addListener('change', function() {
            var ddlbcol_1_value = mstform.getItem('ddlbcol_1').getValue();
            console.log("ddlbcol_1的值变化为:", ddlbcol_1_value);
            
            // 如果ddlbcol_1的值为2，则显示ddlbcol_2下拉框，否则隐藏
            if (ddlbcol_1_value == '2') {
                mstform.getItem('ddlbcol_2').show();
            } else {
                mstform.getItem('ddlbcol_2').hide();
                // 清空ddlbcol_2的值
                mstform.getItem('ddlbcol_2').setValue('');
            }
        });
    } else {
        console.error("未找到ddlbcol_1或ddlbcol_2字段");
    }

    var toolbar = Ext.getCmp('toolbar'); // 获取工具栏
    console.log('Toolbar================', toolbar)

    /**项目过滤 */
    u_ydzjdj.on('beforetriggerclick', function (eOp, ignoreBeforeEvent) {
        //帮助窗口打开前事件
        u_ydzjdj.setClientSqlFilter('phid not in ( select u_ydzjdj from p_form0000700753_m where ischeck = 0)');
    });

    /**版本变更设置为只读 */ 
    mstform.getItem('u_version').userSetReadOnly(true);

    /**测算表选择后填入新的版本变更 */
    mstform.getItem('u_ydzjdj').addListener('change', function () {
        console.log('u_ydzjdj.value===================>', u_ydzjdj.value);
        // 获取预算资金变更表的版本号
        execServer('hqydzjbgbb', { 'u_ydzjdj': u_ydzjdj.value }, function (res) {
            if (res.count == 0) {
                u_version.setValue(1.0);
            } else {
                var version = ++res.data[0].u_version;
                u_version.setValue(version);
            }
        });
    });

    /**如果不是最新版本变更单据  则不能取消审核进行修改 */
    toolbar.get('applycheck').on('click', function () {
        // 获取预算资金变更表的版本号
        execServer('hqydzjbgbb', { 'u_ydzjdj': u_ydzjdj.value }, function (res) {
            if (u_version.value != res.data[0].u_version) {
                Ext.MessageBox.confirm('提示','当前单据不是最新单据,请先删除最新单据', function (e) {
                    
                });
                return;
            }
        });
    });
}