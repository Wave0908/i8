function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700065_m');
    var dgrid = Ext.getCmp('p_form0000700065_d');
    //var dstore = dgrid.store;
    //mstform.getItem('bill_dt').userSetReadOnly(false);

    //取员工编码
    dgrid.getColumn('empid_EXName').getEditor().addListener('helpselected', function () {
        console.log("empid_EXName");
        var data = dgrid.getSelectionModel().getSelection();
        var empid = data[0].get('empid');
        console.log("empid:",empid);
        execServer('p_form0000700065_ygbh', { 'a': empid }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('u_ygbh', data1[0].extendObjects.bill_no);
            }

        });

        var u_lwyp = data[0].get('u_lwyp');
        if (u_lwyp) {
            execServer('p_form0000700065_scslrq', { 'a': empid, 'b': u_lwyp }, function (res) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    if (data1[0].extendObjects.check_dt == null) {                    //判断取数状态
                        data[0].set('u_scsqrq', '');
                        return;
                    }
                    else {
                        data[0].set('u_scsqrq', data1[0].extendObjects.check_dt);
                        var u_scsqrq = Date.parse(new Date(data[0].get('u_scsqrq')));
                        var bill_dt = Date.parse(new Date(mstform.getItem('bill_dt').getValue()));
                        data[0].set('u_jgyf', (bill_dt - u_scsqrq + 1) / (1000 * 60 * 60 * 24));
                        return;
                    }
                }
            });
        }
    });


    dgrid.getColumn('u_lwyp_EXName').getEditor().addListener('helpselected', function () {
        var data = dgrid.getSelectionModel().getSelection();
        var empid = data[0].get('empid');
        var u_lwyp = data[0].get('u_lwyp');
        if (u_lwyp && empid) {
            execServer('p_form0000700065_scslrq', { 'a': empid, 'b': u_lwyp }, function (res) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (res.count > 0) {
                    if (data1[0].extendObjects.check_dt == null) {                    //判断取数状态
                        data[0].set('u_scsqrq', '');
                        return;
                    }
                    else {
                        data[0].set('u_scsqrq', data1[0].extendObjects.check_dt);
                        var u_scsqrq = Date.parse(new Date(data[0].get('u_scsqrq')));
                        var bill_dt = Date.parse(new Date(mstform.getItem('bill_dt').getValue()));
                        data[0].set('u_jgyf', (bill_dt - u_scsqrq + 1) / (1000 * 60 * 60 * 24));
                        return;
                    }
                }
            });
        }
    });






























}