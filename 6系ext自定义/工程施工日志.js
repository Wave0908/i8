function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000038_m');

    //--------------------------------------------------过滤项目信息筛选条件-----------------------------------------------------------------------
    mstform.getItem('phid_pc').addListener('beforetriggerclick', function () {
        mstform.getItem('phid_pc').setOutFilter({
            stat: 'sts', app_status: '1'
        });
        return true;
    });
    mstform.getItem('glzy').addListener('beforetriggerclick', function () {
        var pc = mstform.getItem('phid_pc').getValue(); //筛选依据的字段赋值给pc
        if (Ext.isEmpty(pc)) {
            Ext.Msg.alert('提示', '请先选择项目！');
            return false;
        }
        mstform.getItem('glzy').setOutFilter({ mstid: mstform.getItem('phid_pc').getValue() });
        return true;
    });
}