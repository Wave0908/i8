//转正申请
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000115_m');
    var dgrid = Ext.getCmp('p_form0000000115_dgrid');
    mstform.getItem('bill_dt').userSetReadOnly(false);
    //选择员工，带入员工信息
    dgrid.getColumn('vendor_id_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var fbs_val = data[0].get('vendor_id');
        callServer('select_fbs', [{ 'fbs_val': fbs_val }], function (res1) {
            data[0].set('fr', res1.record[0].fddbr);
            data[0].set('tyshxy', res1.record[0].unisocialcredit);
            data[0].set('dsptbm', res1.record[0].bm);
        });
    });
}