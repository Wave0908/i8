function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000000169_m');
    var dgrid = Ext.getCmp('p_form0000000169_d');
    var dstore = dgrid.store;

    // // 保留原有的helpselected事件监听
    dgrid.getColumn('empid_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        console.log("==========");
        var data = dgrid.getSelectionModel().getSelection();
        console.log("data:",data);
        var empid = data[0].data.empid;
        execServer('p_form0000000169_zdxz', {
            'phid': empid
        }, function (res) {
            if (res.count > 0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (data1.length > 0) {
                    console.log("data1:", data1);
                    data[0].set('xb', data1[0].extendObjects.xb);
                    data[0].set('datetimecol_1', data1[0].extendObjects.datetimecol_1);
                    data[0].set('ddlbcol_1', data1[0].extendObjects.ddlbcol_1);
                    data[0].set('textcol_2', data1[0].extendObjects.textcol_2);
                    data[0].set('textcol_3', data1[0].extendObjects.textcol_3);
                    data[0].set('textcol_4', data1[0].extendObjects.textcol_4);
                    data[0].set('textcol_5', data1[0].extendObjects.textcol_5);
                    data[0].set('textcol_6', data1[0].extendObjects.textcol_6);
                    data[0].set('textcol_7', data1[0].extendObjects.textcol_7);
                    data[0].set('userhelp_1', data1[0].extendObjects.userhelp_1);
                    data[0].set('userhelp_1_EXName', data1[0].extendObjects.userhelp_1_name);
                    data[0].set('userhelp_2', data1[0].extendObjects.userhelp_2);
                    data[0].set('userhelp_2_EXName', data1[0].extendObjects.userhelp_2_name);
                }
            }
        });
    });

    // dgrid.addListener('edit', function (editor, e) {
    //     if (e.field == 'empid_EXName') {
    //         var record = e.record;
    //         console.log("record.get('empid'):",record.get('empid'));
    //         if (record.get('empid') != null && record.get('empid') != '') {
    //             console.log("record.get('empid'):",record.get('empid'));
    //             setTimeout(function(){
    //                 execServer('p_form0000000169_zdxz', {
    //                     'phid': record.get('empid')
    //                 }, function (res) {
    //                     if (res.count > 0) {
    //                         const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    //                         console.log("data:",data);
    //                         if (data.length > 0) {
    //                             record.set('xb', data[0].extendObjects.xb);
    //                         record.set('datetimecol_1', data[0].extendObjects.datetimecol_1);
    //                         record.set('ddlbcol_1', data[0].extendObjects.ddlbcol_1);
    //                         record.set('textcol_2', data[0].extendObjects.textcol_2);
    //                         record.set('textcol_3', data[0].extendObjects.textcol_3);
    //                         record.set('textcol_4', data[0].extendObjects.textcol_4);
    //                         record.set('textcol_5', data[0].extendObjects.textcol_5);
    //                         record.set('textcol_6', data[0].extendObjects.textcol_6);
    //                         record.set('textcol_7', data[0].extendObjects.textcol_7);
    //                         record.set('userhelp_1', data[0].extendObjects.userhelp_1);
    //                         record.set('userhelp_1_EXName', data[0].extendObjects.userhelp_1_name);
    //                         record.set('userhelp_2', data[0].extendObjects.userhelp_2);
    //                         record.set('userhelp_2_EXName', data[0].extendObjects.userhelp_2_name);
    //                     }
    //                 }
    //             });
    //         },200);
    //         }
    //     }
    // });
}