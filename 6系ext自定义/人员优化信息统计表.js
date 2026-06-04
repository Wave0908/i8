function allReadyEdit() {
    //var mstform = Ext.getCmp('p_form0000700513_m');
    var dgrid = Ext.getCmp('p_form0000700513_d');
    var d1grid = Ext.getCmp('p_form0000700513_d1');
    // var dstore = dgrid.store;
    // var d1store = d1grid.store;
    // var Toolbar = Ext.getCmp('toolbar');

    //劳动制
    dgrid.getColumn('empid_EXName').getEditor().addListener('helpselected', function (obj) {
        var data = dgrid.getSelectionModel().getSelection();
        var ygphid = data[0].get('empid');
        execServer('getryxx_ryyh', {
            'phid': ygphid
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data1:",data1)
                data[0].set('textcol_2', data1[0].extendObjects.zz); //单位
                data[0].set('u_dw', data1[0].extendObjects.zznm); //单位
                data[0].set('u_dw_EXName', data1[0].extendObjects.zz);
                //BatchBindCombox([u_dw]);
                data[0].set('u_xb', data1[0].extendObjects.sex); //性别
                data[0].set('u_sfzh', data1[0].extendObjects.cardno); //身份证号
                data[0].set('u_cngzsj', data1[0].extendObjects.cdt); //参加工作时间
                //BatchBindCombox([dgrid.getColumn('u_dw')]);

                //BatchBindCombox([mstform.getItem('userhelp_1')]);
            }
        });
    });

    //派遣
    d1grid.getColumn('empid_EXName').getEditor().addListener('helpselected', function (obj) {
        var data = d1grid.getSelectionModel().getSelection();
        var ygphid = data[0].get('empid');
        execServer('getryxx_ryyh', {
            'phid': ygphid
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                console.log("data1:",data1)
                data[0].set('userhelp_1', data1[0].extendObjects.zznm); //单位
                data[0].set('userhelp_1_EXName', data1[0].extendObjects.zz); //单位
                data[0].set('u_xbs', data1[0].extendObjects.sex); //性别
                data[0].set('u_sfzh', data1[0].extendObjects.cardno); //身份证号
                data[0].set('u_cjgzsj', data1[0].extendObjects.cdt); //参加工作时间
                //BatchBindCombox([d1grid.getColumn('userhelp_1')]);
                // BatchBindCombox([mstform.getItem('userhelp_1')]);
            }
        });
    });
    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const options = { year: 'numeric', month: '2-digit' };
    //     const formatter = new Intl.DateTimeFormat('zh-CN', options);
    //     const parts = formatter.formatToParts(date);
    //
    //     let formatted = '';
    //     for (const part of parts) {
    //         if (part.type === 'year') {
    //             formatted += part.value + '年';
    //         } else if (part.type === 'month') {
    //             formatted += part.value + '月';
    //         }
    //     }
    //     return formatted;
    // }

}
