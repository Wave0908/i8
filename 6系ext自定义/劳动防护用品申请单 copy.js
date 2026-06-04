function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700065_m');
    var dgrid = Ext.getCmp('p_form0000700065_dgrid');
    var dstore = dgrid.store;
    mstform.getItem('bill_dt').userSetReadOnly(false);

    //取员工编码
    dgrid.getColumn('empid_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empid = data[0].get('empid');
        callServer('ygbh', [{ 'a': empid }], function (res) {
            data[0].set('u_ygbh', res.record[0].cno);
        });

        var u_lwyp = data[0].get('u_lwyp');
        if (u_lwyp) {
            callServer('scslrq', [{ 'a': empid, 'b': u_lwyp }], function (res) {
                if (res.record[0] == undefined) {                    //判断取数状态
                    data[0].set('u_scsqrq', '');
                    return;
                }
                else if (res.record[0].check_dt !== undefined) {
                    data[0].set('u_scsqrq', res.record[0].check_dt);
                    var u_scsqrq = Date.parse(new Date(data[0].get('u_scsqrq')));
                    var bill_dt = Date.parse(new Date(mstform.getItem('bill_dt').getValue()));
                    data[0].set('u_jgyf', (bill_dt - u_scsqrq + 1) / (1000 * 60 * 60 * 24));
                    return;
                }
            });
        }
    });


    dgrid.getColumn('u_lwyp_name').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empid = data[0].get('empid');
        var u_lwyp = data[0].get('u_lwyp');
        if (u_lwyp && empid) {
            callServer('scslrq', [{ 'a': empid, 'b': u_lwyp }], function (res) {
                if (res.record[0] == undefined) {                    //判断取数状态
                    data[0].set('u_scsqrq', '');
                    return;
                }
                else if (res.record[0].check_dt !== undefined) {
                    data[0].set('u_scsqrq', res.record[0].check_dt);
                    var u_scsqrq = Date.parse(new Date(data[0].get('u_scsqrq')));
                    var bill_dt = Date.parse(new Date(mstform.getItem('bill_dt').getValue()));
                    data[0].set('u_jgyf', (bill_dt - u_scsqrq + 1) / (1000 * 60 * 60 * 24));
                    return;
                }
            });
        }
    });






























}