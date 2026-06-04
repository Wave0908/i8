function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700621_m');
    var dgrid = Ext.getCmp('p_form0000700621_dgrid');
    var dstore = dgrid.store;
    dgrid.hideColumn('qty', true);
    dgrid.hideColumn('prc', true);
    dgrid.hideColumn('amt', true);
    //mstform.getItem('asr_flg').setVisible(false);

    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) { return; }                                        //判断原值与新值是否相同，如果相同则返回 *return 返回                                                                                 //监听qty、prc、numericcol_2字段变化事件结束 ｝
    });
    dgrid.getColumn('u_ddmd_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();//获取当前选中行
        var phid = data[0].get('u_ddmd');
        console.log(data[0].get('u_ddmd'));
        if (phid == '569000000002435') {
            console.log(data[0].get('u_xxsm'));
            data[0].set('u_xxsm', '通过XXX主流媒体（省部级以上媒体）发表了题为《XXX》的文章、报道或视频；');
            data[0].set('u_fjyq', '宣传稿件的链接或截图');
        } else if (phid == '569000000002436') {
            console.log(data[0].get('u_xxsm'));
            data[0].set('u_xxsm', '获得省部级以上奖项（詹天佑奖、鲁班奖、国优、绿色工地、省优等）；');
            data[0].set('u_fjyq', '奖项、证书、奖杯、奖牌等照片');
        } else if (phid == '569000000002437') {
            console.log(data[0].get('u_xxsm'));
            data[0].set('u_xxsm', '某单位XXX在XX协会举办的XX活动中上台发言；或我单位撰写的稿件在协会交流材料中进行汇编，务必说明是否起到了技术引领和市场开拓作用（可简要介绍拓展了客户多少个，收获了订单多少个，或拟对什么项目进行紧密跟踪等）。');
            data[0].set('u_fjyq', '协会活动上台发言照片、稿件及汇编页照片');
        } else if (phid == '569000000002438') {
            console.log(data[0].get('u_xxsm'));
            data[0].set('u_xxsm', '通过XX协会直接或间接接触XX项目业主，并签订XX合同XX万元，要求一年内获取订单。');
            data[0].set('u_fjyq', '上传合同签字盖章扫描件');
        } else if (phid == '569000000002439') {
            console.log(data[0].get('u_xxsm'));
            data[0].set('u_xxsm', '此部分原因自拟');
            data[0].set('u_fjyq', '/');
        }

    });
}