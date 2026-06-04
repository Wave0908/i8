function allReadyEdit() {
    var mstform = Ext.getCmp('p_form0000700629_m');
    var d1grid = Ext.getCmp('p_form0000700629_d1grid');
    var d2grid = Ext.getCmp('p_form0000700629_d2grid');

    d1grid.getColumn('userhelp_1_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d1grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        callServer('sjjg', [{
            phid: userhelp_1
        }], function (res) {
            if (res.record[0]) {
                data[0].set('textcol_1', res.record[0].jglx);//机构类型
                data[0].set('userhelp_2', res.record[0].dwzj);//单位主键
                data[0].set('userhelp_2_name', res.record[0].dwmc);//单位名称
                data[0].set('textcol_2', res.record[0].lx);//类型
                data[0].set('textcol_3', res.record[0].phid);//主键

            }
        });
    });

    d2grid.getColumn('userhelp_1_name').getEditor().on('helpselected', function (eOp, ignoreBeforeEvent) {
        var data = d2grid.getSelectionModel().getSelection();
        var userhelp_1 = data[0].get('userhelp_1');
        callServer('sjjg', [{
            phid: userhelp_1
        }], function (res) {
            if (res.record[0]) {
                data[0].set('textcol_1', res.record[0].phid);//主键

            }
        });
    });
}