//转正申请
function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000115_m');
    var dgrid = Ext.getCmp('p_form0000000115_d');
    mstform.getItem('bill_dt').userSetReadOnly(false);
    //选择员工，带入员工信息
    dgrid.getColumn('vendor_id_EXName').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var fbs_val = data[0].get('vendor_id');
        execServer('p_form0000000115_select_fbs', { 'fbs_val': fbs_val }, function (res1) {
            if(res1.count > 0){
                const data1 = typeof res1.data === 'string' ? JSON.parse(res1.data) : res1.data;
                data[0].set('fr', data1[0].extendObjects.fddbr);
                data[0].set('tyshxy', data1[0].extendObjects.unisocialcredit);
                data[0].set('dsptbm', data1[0].extendObjects.bm);
            }
        });
    });
}