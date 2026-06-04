function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700613_m');
    mstform.getItem('u_dqgclrlykylrldbl').setValue(0); 
    console.log(mstform.getItem('u_kyyjgclrl').getValue())
    mstform.getItem('u_dqsjgclrl').addListener('change', function(obj) {
        if (mstform.getItem('u_kyyjgclrl').getValue() != 0) {
            console.log(mstform.getItem('u_kyyjgclrl').getValue())
            mstform.getItem('u_dqgclrlykylrldbl').setValue(mstform.getItem('u_dqsjgclrl').getValue() / mstform.getItem('u_kyyjgclrl').getValue());
        }else {
            mstform.getItem('u_dqgclrlykylrldbl').setValue(0); 
            Ext.Msg.alert('进else了',"值"+mstform.getItem('u_kyyjgclrl').getValue());
        }
        
    });
    mstform.getItem('u_yjhsgckje').addListener('change', function(obj) {
        var u_yjhsgckje = mstform.getItem('u_yjhsgckje').getValue(); // 已回收工程款
        var u_yhsgckje = mstform.getItem('u_yhsgckje').getValue();         // 应回收工程款
         if (u_yhsgckje != 0) {
            mstform.getItem('u_gchksl').setValue(u_yjhsgckje / u_yhsgckje);
        }else {
            mstform.getItem('u_gchksl').setValue(null); 
            console.error('应回收工程款为零，无法计算工程款回收率');
        } 
        
    });
}
