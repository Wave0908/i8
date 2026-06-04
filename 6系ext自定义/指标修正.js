function allReadyEdit() {
    //if(otype == $Otype.ADD || otype == $Otype.EDIT) {
    var mstform = Ext.getCmp('p_form0000700644_m');
    var dgrid = Ext.getCmp('p_form0000700644_d');
    var d2grid = Ext.getCmp('p_form0000700644_d2');

    dgrid.getColumn('u_htmc_EXName').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();//获取当前选中行
        var phid = data[0].get('u_htmc');
        execServer('p_form0000700644_hte', { 'phid': phid }, function (res) {
            //自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_htjk', Ext.Number.from(data1[0].extendObjects.numericcol_1 / 10000));
            }
        });
        var u_htmc = data[0].get('u_htmc');
        var u_htmc_EXName = data[0].get('u_htmc_EXName');
        console.log("u_htmc:",u_htmc);
        console.log("u_htmc_EXName:",u_htmc_EXName);
    });
    d2grid.getColumn('u_xmmc_EXName').getEditor().addListener('helpselected', function () {
        var data = d2grid.getSelectionModel().getSelection();//获取当前选中行
        var phid = data[0].get('u_xmmc');
        execServer('p_form0000700644_jze', { 'phid': phid }, function (res) {//自定义表单数据注册取值赋值，如：callServer('填表单体', [{ 'fxmid': fxmid, 'zzid': zzid }], function (res) {}//多参数逗号分隔
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_xmbm', data1[0].extendObjects.bill_no);
                data[0].set('u_hte', Ext.Number.from(data1[0].extendObjects.yjhte));
                //data[0].set('u_sf',res.record[0].user_gcddsf);
                //data[0].set('u_shi',res.record[0].user_gcddcs);
            }


        });
        //BatchBindCombox([d2grid.getColumn('u_sf'),d2grid.getColumn('u_shi')])
    });
}