function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700629_m');
    var d1grid = Ext.getCmp('p_form0000700629_d1');
    var d2grid = Ext.getCmp('p_form0000700629_d2');
    console.log("我进来了.");

    d1grid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d1grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        console.log("userhelp_1:",userhelp_1);
        execServer('p_form0000700629_sjjg', {
            phid: userhelp_1
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('textcol_1', data1[0].extendObjects.jglx);//机构类型
                data[0].set('userhelp_2', data1[0].extendObjects.dwzj);//单位主键
                data[0].set('userhelp_2_EXName', data1[0].extendObjects.dwmc);//单位名称
                data[0].set('textcol_2', data1[0].extendObjects.lx);//类型
                data[0].set('textcol_3', data1[0].extendObjects.phid);//主键

            }
        });
    });

    d2grid.getColumn('userhelp_1_EXName').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d2grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        execServer('p_form0000700629_sjjg', {
            'phid': userhelp_1
        }, function (res) {
            if (res.count>0) {
                const data1 = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                data[0].set('textcol_1', data1[0].extendObjects.phid);//主键

            }
        });
    });
}