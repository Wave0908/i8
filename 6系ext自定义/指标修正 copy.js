function allReadyEdit() {
    //if(otype == $Otype.ADD || otype == $Otype.EDIT) {
    var mstform = Ext.getCmp('p_form0000700644_m');
    var dgrid = Ext.getCmp('p_form0000700644_dgrid');
    var d2grid = Ext.getCmp('p_form0000700644_d2grid');

    dgrid.getColumn('u_htmc_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();//获取当前选中行
        var phid = data[0].get('u_htmc');
        callServer('hte', [{ 'phid': phid }], function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
            data[0].set('u_htjk', Ext.Number.from(res.record[0].numericcol_1 / 10000));

        });
    });
    d2grid.getColumn('u_xmmc_name').getEditor().addListener('helpselected', function () {
        var data = d2grid.getSelectionModel().getSelection();//获取当前选中行
        var phid = data[0].get('u_xmmc');
        callServer('jze', [{ 'phid': phid }], function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
            data[0].set('u_xmbm', res.record[0].bill_no);
            data[0].set('u_hte', Ext.Number.from(res.record[0].yjhte));
            //data[0].set('u_sf',res.record[0].user_gcddsf);
            //data[0].set('u_shi',res.record[0].user_gcddcs);

        });
        //BatchBindCombox([d2grid.getColumn('u_sf'),d2grid.getColumn('u_shi')])
    });
}