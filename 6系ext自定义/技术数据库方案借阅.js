function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700631_m');
    var dgrid = Ext.getCmp('p_form0000700631_d');
    var dstore = dgrid.store;
    //在明细表的u_fjmc列预设值
    dstore.insert(dstore.getCount(),
        [{
            u_fjmc: '评分要点截图'
        }, {
            u_fjmc: '招标文件规定目录截图'
        },
        {
            u_fjmc: '招标文件、图纸'
        },]);
    //根据选择的是投标类还是施工类显示对应的通用帮助
    mstform.getItem('u_sslsgzzsj').hide();
    mstform.getItem('u_sgljsfabh').hide();
    mstform.getItem('u_tbsg').addListener('change', function () {
        if (mstform.getItem('u_tbsg').getValue() == '1') {
            mstform.getItem('u_tblsgzzsj').show();
            mstform.getItem('u_jsfabh').show();
            mstform.getItem('u_tblsgzzsj').userSetMustInput(true);
            mstform.getItem('u_jsfabh').userSetMustInput(true);
            mstform.getItem('u_sslsgzzsj').userSetMustInput(false);
            mstform.getItem('u_sgljsfabh').userSetMustInput(false);
            mstform.getItem('u_sslsgzzsj').hide();
            mstform.getItem('u_sgljsfabh').hide();
        } else {
            mstform.getItem('u_tblsgzzsj').hide();
            mstform.getItem('u_tblsgzzsj').userSetMustInput(false);
            mstform.getItem('u_sslsgzzsj').show();
            mstform.getItem('u_sslsgzzsj').userSetMustInput(true);
            mstform.getItem('u_jsfabh').hide();
            mstform.getItem('u_jsfabh').userSetMustInput(false);
            mstform.getItem('u_sgljsfabh').show();
            mstform.getItem('u_sgljsfabh').userSetMustInput(true);
        }
    })


}