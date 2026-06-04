function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700754_m');
    
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
}