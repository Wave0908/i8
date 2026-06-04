function allReadyList() {
    var Toolbar = Ext.getCmp('toolbar');
    Toolbar.get('copy').hide();//隐藏
    Toolbar.get('edit').hide();//隐藏
    console.log(Toolbar);
}





function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700172_m');
    var dgrid = Ext.getCmp('p_form0000700172_d');
    var dstore = dgrid.store;
    var Toolbar = Ext.getCmp('toolbar');
    //组织设置为只读
    mstform.getItem('phid_org').userSetReadOnly(true);
    //项目信息设置为只读
    mstform.getItem('phid_pc').userSetReadOnly(true);
    //明细行采购合同物料编码为只读
    dgrid.setReadOnlyCol('u_cghtwlbm', true)
    //明细行采购合同物料名称为只读
    dgrid.setReadOnlyCol('u_cghtwlmc_name', true)
    //明细行采购合同剩余量为只读
    dgrid.setReadOnlyCol('u_qty', true)
    //明细采购计划编码为只读
    dgrid.setReadOnlyCol('u_cgjhbm', true)
    //明细项目需用计划编码为只读
    dgrid.setReadOnlyCol('u_xmxyjhbh', true)
    //明细项目需用计划名称为只读
    dgrid.setReadOnlyCol('u_xmxyjhmc_name', true)
    //明细采购计划数量为只读
    dgrid.setReadOnlyCol('u_cgjhsl', true)
    //明细采购计划名称为必填
    dgrid.setMustInputCol('u_cgjh_name', true)
    //明细采购计划物料名称为必填
    dgrid.setMustInputCol('u_cgjhwl_name', true)





    //终止合同选择前触发
    mstform.getItem('u_zzhtxx').addListener('beforetriggerclick', function (obj) {
        var ocode = mstform.getItem('ocode').getValue();


        mstform.getItem('u_zzhtxx').setClientSqlFilter("pcm.phid_ocode = " + ocode + " and pcm.phid not in (select u_zzhtxx from p_form0000700172_m where ischeck <> '1')");

    });






    //终止合同选择后触发
    mstform.getItem('u_zzhtxx').addListener('helpselected', function (obj) {

        mstform.getItem('pc').setValue(obj.data.phid_pc);
        BatchBindCombox([mstform.getItem('pc')]);

        var u_zzhtxx = mstform.getItem('u_zzhtxx').getValue();
        callServer('cghtzz', [{
            'phid': u_zzhtxx
        }], function (res) {
            dstore.removeAll();
            dstore.insert(dstore.getCount(), res.record);
        });

    })






    //采购计划选择前触发
    dgrid.getColumn('u_cgjh_name').getEditor().addListener('beforetriggerclick', function () {
        var pc = mstform.getItem('phid_pc').getValue();
        var data = dgrid.getSelectionModel().getSelection();
        dgrid.getColumn('u_cgjh_name').getEditor().setClientSqlFilter(" mpm.phid_pc= " + pc + " and mpd.phid_itemdata = " + data[0].get('u_cghtwlmc'));
    });






    //采购计划选择后触发
    dgrid.getColumn('u_cgjh_name').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid.getSelectionModel().getSelection();
        data[0].set('u_cgjhbm', obj.data.user_code);
    });





    //采购计划物料名称选择前触发
    dgrid.getColumn('u_cgjhwl_name').getEditor().addListener('beforetriggerclick', function () {

        var data = dgrid.getSelectionModel().getSelection();
        if (Ext.isEmpty(data[0].get('u_cgjh'))) {
            Ext.Msg.alert('提示', '请先选择采购计划名称');
            return false;
        }
        dgrid.getColumn('u_cgjhwl_name').getEditor().setClientSqlFilter(" mpm.phid= " + data[0].get('u_cgjh') + " and mpd.phid_itemdata = " + data[0].get('u_cghtwlmc'));
    });






    //采购计划物料名称选择后触发
    dgrid.getColumn('u_cgjhwl_name').getEditor().addListener('helpselected', function (obj) {
        console.log(obj);
        var data = dgrid.getSelectionModel().getSelection();
        data[0].set('u_xmxyjhbh', obj.data.user_code);
        data[0].set('u_xmxyjhmc', obj.data.pphid);
        data[0].set('u_xmxyjhmc_name', obj.data.title);
        data[0].set('u_cgjhsl', obj.data.qty);
    });






    //合同应回填数量不能大于采购计划可回填数量,不能大于合同剩余量，不能小于0
    dgrid.addListener('edit', function (editor, e) {
        if (e.originalValue == e.value) {
            return;
        }
        if (e.field == 'u_htl') { //监听qty、prc、numericcol_2字段变化
            var record = e.record;
            if (Ext.Number.from(record.get('u_htl'), 0) > Ext.Number.from(record.get('u_cgjhsl'), 0) || Ext.Number.from(record.get('u_htl'), 0) > Ext.Number.from(record.get('u_qty'), 0) || Ext.Number.from(record.get('u_htl'), 0) < 0) {
                record.set('u_htl', 0);
                Ext.Msg.alert('提示', '合同应回填数量不能大于采购计划可回填数量,不能大于合同剩余量，不能小于0');
                return false;
            }

        };

    });







}






