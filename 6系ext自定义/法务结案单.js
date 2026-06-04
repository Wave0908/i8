function allReadyEdit() { //页面编辑方法，固定写法
    //获取容器，固定写法
    var mstform = Ext.getCmp('p_form0000700610_m');
    //获取工具栏容器
    var Toolbar = Ext.getCmp('toolbar');
    console.log("Toolbar:",Toolbar);
    //mstform.getItem('title').setVisible(false);
    // mstform.getItem('u_fjzs').addListener('change', function () {//被诉是否挂网
    //     var fjzs = mstform.getItem('u_fjzs').getValue();
    //     if (fjzs == '0') {
    //         Ext.Msg.alert('提示', '请上传附件！');
    //         mstform.getItem('u_fjzs').setValue();
    //     }
    // })
    Toolbar.get('save').on('click', function () {
        // 处理逻辑
        console.log("mstform.getItem('u_fjzs').getValue():", mstform.getItem('u_fjzs').getValue());
        if (mstform.getItem('u_fjzs').getValue() == '0' || mstform.getItem('u_fjzs').getValue() == '' || mstform.getItem('u_fjzs').getValue() == null) {
            Ext.Msg.alert('提示', '请上传附件！');
            mstform.getItem('u_fjzs').setValue();
            return ;
        }
    });

}
function attachReturnExt(key, value) {
    var mstform = Ext.getCmp('p_form0000700610_m');
    console.log("value:", value);
    if (key == 'closeNG3Container') {
        if (value == '') {
            mstform.getItem('u_fjzs').setValue();
        } else {
            mstform.getItem('u_fjzs').setValue(value.length);
        }
    } else {
        return;
    }
}


// function beforeSaveEdit() {
//     var mstform = Ext.getCmp('p_form0000700610_m');
//     console.log("mstform.getItem('u_fjzs').getValue():", mstform.getItem('u_fjzs').getValue());
//     if (mstform.getItem('u_fjzs').getValue() == '0' || mstform.getItem('u_fjzs').getValue() == '' || mstform.getItem('u_fjzs').getValue() == null) {
//         Ext.Msg.alert('提示', '请上传附件！');
//         mstform.getItem('u_fjzs').setValue();
//         return false;
//     }
// }
